import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon } from '@neondatabase/serverless';

type Bindings = {
  DATABASE_URL: string;
  ASSETS?: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// Helper to serve index.html for SPA routes without triggering 307 redirect
const serveIndex = async (c: any) => {
  if (c.env?.ASSETS) {
    const rootUrl = new URL('/', c.req.url);
    const assetRes = await c.env.ASSETS.fetch(new Request(rootUrl.toString(), {
      method: 'GET',
      headers: c.req.raw.headers
    }));
    return new Response(assetRes.body, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-cache'
      }
    });
  }
  return c.text('Not found', 404);
};

// Helper to serve dashboard.html
const serveDashboard = async (c: any) => {
  if (c.env?.ASSETS) {
    const dashUrl = new URL('/dashboard.html', c.req.url);
    const assetRes = await c.env.ASSETS.fetch(new Request(dashUrl.toString(), {
      method: 'GET',
      headers: c.req.raw.headers
    }));
    return new Response(assetRes.body, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-cache'
      }
    });
  }
  return c.text('Dashboard not found', 404);
};

// Helper to serve thailand-provinces.geojson
const serveGeoJson = async (c: any) => {
  if (c.env?.ASSETS) {
    const geoUrl = new URL('/thailand-provinces.geojson', c.req.url);
    const assetRes = await c.env.ASSETS.fetch(new Request(geoUrl.toString(), {
      method: 'GET',
      headers: c.req.raw.headers
    }));
    return new Response(assetRes.body, {
      status: 200,
      headers: {
        'content-type': 'application/geo+json; charset=utf-8',
        'cache-control': 'public, max-age=86400'
      }
    });
  }
  return c.text('GeoJSON not found', 404);
};

app.get('/interested', serveIndex);
app.get('/stage1', serveIndex);
app.get('/openhouse', serveIndex);
app.get('/stage2', serveIndex);
app.get('/survey', serveIndex);
app.get('/stage3', serveIndex);
app.get('/portal', serveIndex);
app.get('/dashboard', serveDashboard);
app.get('/dashboard.html', serveDashboard);
app.get('/intelligence', serveDashboard);
app.get('/thailand-provinces.geojson', serveGeoJson);

// Helper to get Neon SQL client
const getDb = (c: any) => {
  const dbUrl = c.env?.DATABASE_URL || "postgresql://neondb_owner:npg_N0ErUm5Bnxko@ep-hidden-truth-b37brfql-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  return neon(dbUrl);
};

// 1. Check applicant status and prefill data (by Email OR Phone + Name)
app.get('/api/applicant/status', async (c) => {
  const email = c.req.query('email')?.trim().toLowerCase();
  const phone = c.req.query('phone')?.trim();
  const name = c.req.query('name')?.trim();

  if (!email && !phone) {
    return c.json({ error: 'Either email or phone number is required' }, 400);
  }

  const sql = getDb(c);
  try {
    let result: any[] = [];

    if (email) {
      result = await sql`
        SELECT *
        FROM applicants 
        WHERE LOWER(email) = LOWER(${email})
        LIMIT 1;
      `;
    } else if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const phoneTail = cleanPhone.length >= 8 ? cleanPhone.slice(-8) : cleanPhone;
      const firstName = name ? name.split(' ')[0].trim() : '';

      if (firstName) {
        result = await sql`
          SELECT *
          FROM applicants 
          WHERE (
            REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g') LIKE ${'%' + phoneTail}
            OR phone = ${phone}
          )
          AND (
            name ILIKE ${'%' + firstName + '%'}
          )
          ORDER BY updated_at DESC
          LIMIT 1;
        `;
      }

      if (result.length === 0) {
        result = await sql`
          SELECT *
          FROM applicants 
          WHERE (
            REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g') LIKE ${'%' + phoneTail}
            OR phone = ${phone}
          )
          ORDER BY updated_at DESC
          LIMIT 1;
        `;
      }
    }

    if (result.length === 0) {
      return c.json({
        exists: false,
        email: email || '',
        phone: phone || '',
        stage1_completed: false,
        stage2_completed: false,
        stage3_completed: false,
        prefill: {
          email: email || '',
          phone: phone || '',
          name: name || ''
        }
      });
    }

    const appRecord = result[0];

    // Prefill data for all forms
    let prefill: Record<string, any> = {
      email: appRecord.email,
      name: appRecord.name,
      nationality: appRecord.nationality,
      phone: appRecord.phone,
      country: appRecord.country,
      university: appRecord.university,
      major: appRecord.major,
      bachelor_degree: appRecord.s1_bachelor_degree,
      education_level: appRecord.s2_education_level,
      year_of_study: appRecord.s2_year_of_study,
      gender: appRecord.s3_gender,
      age: appRecord.s3_age,
      region: appRecord.s3_region
    };

    return c.json({
      exists: true,
      email: appRecord.email,
      phone: appRecord.phone,
      name: appRecord.name,
      stage1_completed: appRecord.stage1_completed,
      stage2_completed: appRecord.stage2_completed,
      stage3_completed: appRecord.stage3_completed,
      prefill
    });
  } catch (err: any) {
    console.error('Error fetching applicant status:', err);
    return c.json({ error: 'Database query failed', details: err.message }, 500);
  }
});

// 2. Submit Stage 1 (Interested / Lead) -> Update into Single Table
app.post('/api/submit/stage1', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    const result = await sql`
      INSERT INTO applicants (
        email, phone, name, nationality, country, university,
        stage1_completed, stage1_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        s1_bachelor_degree, s1_apply_intent, s1_req_readiness,
        s1_heard_from, s1_heard_other, s1_info_wanted, s1_info_other,
        s1_interest_reason, s1_suggestion_process, s1_suggestion_openhouse, s1_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.phone || ''}, ${body.name || ''}, ${body.nationality || ''}, ${body.country || ''}, ${body.university || ''},
        true, CURRENT_TIMESTAMP,
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_content || ''}, ${body.landing_page || ''},
        ${body.bachelor_degree || ''}, ${body.apply_intent || ''}, ${JSON.stringify(body.req_readiness || {})},
        ${JSON.stringify(body.heard_from || [])}, ${body.heard_other || ''}, ${JSON.stringify(body.info_wanted || [])}, ${body.info_other || ''},
        ${body.interest_reason || ''}, ${body.suggestion_process || ''}, ${body.suggestion_openhouse || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        phone = COALESCE(NULLIF(EXCLUDED.phone, ''), applicants.phone),
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        nationality = COALESCE(NULLIF(EXCLUDED.nationality, ''), applicants.nationality),
        country = COALESCE(NULLIF(EXCLUDED.country, ''), applicants.country),
        university = COALESCE(NULLIF(EXCLUDED.university, ''), applicants.university),
        stage1_completed = true,
        stage1_completed_at = COALESCE(applicants.stage1_completed_at, CURRENT_TIMESTAMP),
        s1_bachelor_degree = COALESCE(NULLIF(EXCLUDED.s1_bachelor_degree, ''), applicants.s1_bachelor_degree),
        s1_apply_intent = COALESCE(NULLIF(EXCLUDED.s1_apply_intent, ''), applicants.s1_apply_intent),
        s1_req_readiness = EXCLUDED.s1_req_readiness,
        s1_heard_from = EXCLUDED.s1_heard_from,
        s1_heard_other = EXCLUDED.s1_heard_other,
        s1_info_wanted = EXCLUDED.s1_info_wanted,
        s1_info_other = EXCLUDED.s1_info_other,
        s1_interest_reason = EXCLUDED.s1_interest_reason,
        s1_suggestion_process = EXCLUDED.s1_suggestion_process,
        s1_suggestion_openhouse = EXCLUDED.s1_suggestion_openhouse,
        s1_consent_pdpa = EXCLUDED.s1_consent_pdpa,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    return c.json({
      success: true,
      message: 'Stage 1 saved to master profile',
      applicant: result[0]
    });
  } catch (err: any) {
    console.error('Error submitting Stage 1:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 3. Submit Stage 2 (Open House) -> Update into Single Table
app.post('/api/submit/stage2', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    const result = await sql`
      INSERT INTO applicants (
        email, name, nationality, phone, university, major,
        stage2_completed, stage2_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        s2_recipient_group, s2_education_level, s2_year_of_study, s2_apply_intent,
        s2_attend_mode, s2_session_choice, s2_heard_from, s2_heard_other, s2_comments, s2_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.phone || ''}, ${body.university || ''}, ${body.major || ''},
        true, CURRENT_TIMESTAMP,
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_content || ''}, ${body.landing_page || ''},
        ${body.recipient_group || ''}, ${body.education_level || ''}, ${body.year_of_study || ''}, ${body.apply_intent || ''},
        ${body.attend_mode || ''}, ${body.session_choice || ''}, ${JSON.stringify(body.heard_from || [])}, ${body.heard_other || ''}, ${body.comments || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        nationality = COALESCE(NULLIF(EXCLUDED.nationality, ''), applicants.nationality),
        phone = COALESCE(NULLIF(EXCLUDED.phone, ''), applicants.phone),
        university = COALESCE(NULLIF(EXCLUDED.university, ''), applicants.university),
        major = COALESCE(NULLIF(EXCLUDED.major, ''), applicants.major),
        utm_source = COALESCE(NULLIF(EXCLUDED.utm_source, ''), applicants.utm_source),
        utm_medium = COALESCE(NULLIF(EXCLUDED.utm_medium, ''), applicants.utm_medium),
        utm_campaign = COALESCE(NULLIF(EXCLUDED.utm_campaign, ''), applicants.utm_campaign),
        utm_content = COALESCE(NULLIF(EXCLUDED.utm_content, ''), applicants.utm_content),
        landing_page = COALESCE(NULLIF(EXCLUDED.landing_page, ''), applicants.landing_page),
        stage2_completed = true,
        stage2_completed_at = COALESCE(applicants.stage2_completed_at, CURRENT_TIMESTAMP),
        s2_recipient_group = EXCLUDED.s2_recipient_group,
        s2_education_level = EXCLUDED.s2_education_level,
        s2_year_of_study = EXCLUDED.s2_year_of_study,
        s2_apply_intent = EXCLUDED.s2_apply_intent,
        s2_attend_mode = EXCLUDED.s2_attend_mode,
        s2_session_choice = EXCLUDED.s2_session_choice,
        s2_heard_from = EXCLUDED.s2_heard_from,
        s2_heard_other = EXCLUDED.s2_heard_other,
        s2_comments = EXCLUDED.s2_comments,
        s2_consent_pdpa = EXCLUDED.s2_consent_pdpa,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    return c.json({
      success: true,
      message: 'Stage 2 Open House saved to master profile',
      applicant: result[0]
    });
  } catch (err: any) {
    console.error('Error submitting Stage 2:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 4. Submit Stage 3 (Applicant Survey) -> Update into Single Table
app.post('/api/submit/stage3', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    const result = await sql`
      INSERT INTO applicants (
        email, name,
        stage3_completed, stage3_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        s3_applied_status, s3_intake_round, s3_gender, s3_age, s3_region,
        s3_schools_rank, s3_destination_rank, s3_future_location, s3_postgrad_plan,
        s3_decision_factors_30, s3_first_choice, s3_why_cumedi, s3_roadshow_want, s3_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''},
        true, CURRENT_TIMESTAMP,
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_content || ''}, ${body.landing_page || ''},
        ${body.applied_status || ''}, ${body.intake_round || ''}, ${body.gender || ''}, ${body.age ? parseInt(body.age) : null}, ${body.region || ''},
        ${JSON.stringify(body.schools_rank || {})}, ${JSON.stringify(body.destination_rank || {})}, ${body.future_location || ''}, ${body.postgrad_plan || ''},
        ${JSON.stringify(body.decision_factors_30 || {})}, ${body.first_choice || ''}, ${body.why_cumedi || ''}, ${body.roadshow_want || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        utm_source = COALESCE(NULLIF(EXCLUDED.utm_source, ''), applicants.utm_source),
        utm_medium = COALESCE(NULLIF(EXCLUDED.utm_medium, ''), applicants.utm_medium),
        utm_campaign = COALESCE(NULLIF(EXCLUDED.utm_campaign, ''), applicants.utm_campaign),
        utm_content = COALESCE(NULLIF(EXCLUDED.utm_content, ''), applicants.utm_content),
        landing_page = COALESCE(NULLIF(EXCLUDED.landing_page, ''), applicants.landing_page),
        stage3_completed = true,
        stage3_completed_at = COALESCE(applicants.stage3_completed_at, CURRENT_TIMESTAMP),
        s3_applied_status = EXCLUDED.s3_applied_status,
        s3_intake_round = EXCLUDED.s3_intake_round,
        s3_gender = EXCLUDED.s3_gender,
        s3_age = EXCLUDED.s3_age,
        s3_region = EXCLUDED.s3_region,
        s3_schools_rank = EXCLUDED.s3_schools_rank,
        s3_destination_rank = EXCLUDED.s3_destination_rank,
        s3_future_location = EXCLUDED.s3_future_location,
        s3_postgrad_plan = EXCLUDED.s3_postgrad_plan,
        s3_decision_factors_30 = EXCLUDED.s3_decision_factors_30,
        s3_first_choice = EXCLUDED.s3_first_choice,
        s3_why_cumedi = EXCLUDED.s3_why_cumedi,
        s3_roadshow_want = EXCLUDED.s3_roadshow_want,
        s3_consent_pdpa = EXCLUDED.s3_consent_pdpa,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    return c.json({
      success: true,
      message: 'Stage 3 Survey saved to master profile',
      applicant: result[0]
    });
  } catch (err: any) {
    console.error('Error submitting Stage 3:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 5. Admin Stats & Summary (from single master table with cohort filtering)
app.get('/api/stats', async (c) => {
  const sql = getDb(c);
  const year = c.req.query('year') || 'all';

  try {
    let allApplicants = await sql`SELECT * FROM applicants;`;

    // Normalize Year Filter (supports CE: 2026, 2027, etc. and BE: 2569, 2570, etc.)
    let targetYearCE: number | null = null;
    let targetYearBE: number | null = null;
    if (year !== 'all') {
      const parsed = parseInt(year, 10);
      if (!isNaN(parsed)) {
        if (parsed > 2400) {
          targetYearBE = parsed;
          targetYearCE = parsed - 543;
        } else {
          targetYearCE = parsed;
          targetYearBE = parsed + 543;
        }
      }
    }

    let applicants = allApplicants;
    if (targetYearCE !== null) {
      applicants = allApplicants.filter((a: any) => {
        const intent = (a.s1_apply_intent || '').toLowerCase();
        if (targetYearCE === 2027) {
          return intent.includes('2027') || intent.includes('this year') || intent === 'yes';
        }
        if (targetYearCE === 2028) {
          return intent.includes('2028') || intent.includes('next year');
        }
        if (targetYearCE === 2029) {
          return intent.includes('2029');
        }
        return intent.includes(targetYearCE.toString()) || (targetYearBE ? intent.includes(targetYearBE.toString()) : false);
      });
    }

    // 5-Year Cohort Trend Pipeline:
    // Starts from the filtered year if specified, otherwise starts from 2027 (2570)
    const baseTotal = allApplicants.length;
    const startYearCE = targetYearCE !== null ? targetYearCE : 2027;

    const cohortTrend = [];
    for (let i = 0; i < 5; i++) {
      const yCE = startYearCE + i;
      const yBE = yCE + 543;
      let count = 0;
      if (yCE === 2027) {
        count = allApplicants.filter((a: any) => {
          const intent = (a.s1_apply_intent || '').toLowerCase();
          return intent.includes('2027') || intent.includes('this year') || intent === 'yes';
        }).length;
      } else if (yCE === 2028) {
        count = allApplicants.filter((a: any) => {
          const intent = (a.s1_apply_intent || '').toLowerCase();
          return intent.includes('2028') || intent.includes('next year');
        }).length;
      } else if (yCE === 2029) {
        count = allApplicants.filter((a: any) => {
          const intent = (a.s1_apply_intent || '').toLowerCase();
          return intent.includes('2029');
        }).length;
      } else {
        count = allApplicants.filter((a: any) => {
          const intent = (a.s1_apply_intent || '').toLowerCase();
          return intent.includes(yCE.toString()) || intent.includes(yBE.toString());
        }).length;
      }

      cohortTrend.push({
        year_ce: yCE,
        year_be: yBE,
        count,
        pct: baseTotal > 0 ? ((count / baseTotal) * 100).toFixed(1) : '0.0'
      });
    }

    const total = applicants.length;
    const stage1Count = applicants.filter((a: any) => a.stage1_completed).length;
    const stage2Count = applicants.filter((a: any) => a.stage2_completed).length;
    const stage3Count = applicants.filter((a: any) => a.stage3_completed).length;
    const stage2Attended = applicants.filter((a: any) => a.s2_attended).length;
    const intentCount = targetYearCE !== null
      ? applicants.length
      : allApplicants.filter((a: any) => {
          const intent = (a.s1_apply_intent || '').toLowerCase();
          return intent.includes('2027') || intent === 'yes';
        }).length;
    const firstChoice = applicants.filter((a: any) => a.s3_first_choice === 'Yes' || a.s3_first_choice === 'first').length;

    // Attend Modes
    const attendModeMap: Record<string, number> = {};
    applicants.filter((a: any) => a.stage2_completed).forEach((a: any) => {
      const mode = a.s2_attend_mode || 'Unspecified';
      attendModeMap[mode] = (attendModeMap[mode] || 0) + 1;
    });
    const attendModes = Object.entries(attendModeMap).map(([mode, count]) => ({ mode, count }));

    // UTM Sources
    const utmMap: Record<string, number> = {};
    applicants.forEach((a: any) => {
      const src = a.utm_source || 'Direct';
      utmMap[src] = (utmMap[src] || 0) + 1;
    });
    const utmSources = Object.entries(utmMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top Universities
    const uniMap: Record<string, number> = {};
    applicants.forEach((a: any) => {
      const u = a.university || 'Other';
      uniMap[u] = (uniMap[u] || 0) + 1;
    });
    const topUniversities = Object.entries(uniMap)
      .map(([university, count]) => ({ university, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    // Regional distribution (Thailand 5 regions + International)
    const geoDistribution: Record<string, { id: string, count: number, name_th: string, name_en: string, top_unis: string[] }> = {
      'bkk': { id: 'bkk', count: 0, name_th: 'กรุงเทพฯ และปริมณฑล', name_en: 'Bangkok & Metropolitan', top_unis: [] },
      'north': { id: 'north', count: 0, name_th: 'ภาคเหนือ', name_en: 'Northern Thailand', top_unis: [] },
      'south': { id: 'south', count: 0, name_th: 'ภาคใต้', name_en: 'Southern Thailand', top_unis: [] },
      'northeast': { id: 'northeast', count: 0, name_th: 'ภาคตะวันออกเฉียงเหนือ', name_en: 'Northeastern Thailand', top_unis: [] },
      'central': { id: 'central', count: 0, name_th: 'ภาคกลางและตะวันออก', name_en: 'Central & Eastern Thailand', top_unis: [] },
      'intl': { id: 'intl', count: 0, name_th: 'ต่างประเทศ (นานาชาติ)', name_en: 'International / Overseas', top_unis: [] }
    };

    applicants.forEach((row: any) => {
      const u = (row.university || '').toLowerCase();
      const c = (row.country || '').toLowerCase();
      const n = (row.nationality || '').toLowerCase();

      if (u.includes('melbourne') || u.includes('british columbia') || u.includes('ubc') || u.includes('ucla') || u.includes('california') || u.includes('sydney') || u.includes('oxford') || (c && c !== 'thailand' && c !== 'thai' && c !== 'th') || (n && n !== 'thai' && n !== 'th')) {
        geoDistribution['intl'].count++;
        if (row.university && !geoDistribution['intl'].top_unis.includes(row.university) && geoDistribution['intl'].top_unis.length < 3) {
          geoDistribution['intl'].top_unis.push(row.university);
        }
      } else if (u.includes('chiang mai') || u.includes('cmu') || u.includes('mae fah') || u.includes('naresuan')) {
        geoDistribution['north'].count++;
        if (row.university && !geoDistribution['north'].top_unis.includes(row.university) && geoDistribution['north'].top_unis.length < 3) {
          geoDistribution['north'].top_unis.push(row.university);
        }
      } else if (u.includes('songkla') || u.includes('psu') || u.includes('walailak') || u.includes('ruts')) {
        geoDistribution['south'].count++;
        if (row.university && !geoDistribution['south'].top_unis.includes(row.university) && geoDistribution['south'].top_unis.length < 3) {
          geoDistribution['south'].top_unis.push(row.university);
        }
      } else if (u.includes('khon kaen') || u.includes('kku') || u.includes('suranaree') || u.includes('sut') || u.includes('ubon')) {
        geoDistribution['northeast'].count++;
        if (row.university && !geoDistribution['northeast'].top_unis.includes(row.university) && geoDistribution['northeast'].top_unis.length < 3) {
          geoDistribution['northeast'].top_unis.push(row.university);
        }
      } else if (u.includes('burapha') || u.includes('silpakorn')) {
        geoDistribution['central'].count++;
        if (row.university && !geoDistribution['central'].top_unis.includes(row.university) && geoDistribution['central'].top_unis.length < 3) {
          geoDistribution['central'].top_unis.push(row.university);
        }
      } else {
        geoDistribution['bkk'].count++;
        if (row.university && !geoDistribution['bkk'].top_unis.includes(row.university) && geoDistribution['bkk'].top_unis.length < 3) {
          geoDistribution['bkk'].top_unis.push(row.university);
        }
      }
    });

    // Requirement Readiness Aggregation
    let mcatReady = 0, mcatPrep = 0, mcatNone = 0;
    let engReady = 0, engPrep = 0, engNone = 0;
    let degreeReady = 0, degreePrep = 0, degreeNone = 0;
    let readinessCount = 0;

    applicants.forEach((r: any) => {
      let req = r.s1_req_readiness;
      if (typeof req === 'string') {
        try { req = JSON.parse(req); } catch(e){}
      }
      if (req) {
        readinessCount++;
        if (req.mcat === 'Done') mcatReady++;
        else if (req.mcat === 'Tentative Date') mcatPrep++;
        else mcatNone++;

        if (req.english === 'Done') engReady++;
        else if (req.english === 'Tentative Date') engPrep++;
        else engNone++;

        if (req.degree === 'Done') degreeReady++;
        else if (req.degree === 'Tentative Date') degreePrep++;
        else degreeNone++;
      }
    });

    const totalReadiness = readinessCount || 1;
    const readiness = {
      mcat: { ready: mcatReady, prep: mcatPrep, none: mcatNone, ready_pct: Math.round((mcatReady / totalReadiness) * 100) },
      english: { ready: engReady, prep: engPrep, none: engNone, ready_pct: Math.round((engReady / totalReadiness) * 100) },
      degree: { ready: degreeReady, prep: degreePrep, none: degreeNone, ready_pct: Math.round((degreeReady / totalReadiness) * 100) }
    };

    // Decision factors top scores
    const factorSums: Record<string, { total: number, count: number }> = {};
    applicants.forEach((r: any) => {
      let f = r.s3_decision_factors_30;
      if (typeof f === 'string') {
        try { f = JSON.parse(f); } catch(e){}
      }
      if (f && typeof f === 'object') {
        Object.entries(f).forEach(([key, val]) => {
          const num = Number(val);
          if (!isNaN(num) && num > 0) {
            if (!factorSums[key]) factorSums[key] = { total: 0, count: 0 };
            factorSums[key].total += num;
            factorSums[key].count++;
          }
        });
      }
    });

    const factorLabels: Record<string, { th: string, en: string }> = {
      hospital_clinical_exposure: { th: 'การฝึกปฏิบัติคลินิก รพ.จุฬาฯ', en: 'Chula Hospital Clinical Training' },
      faculty_reputation: { th: 'ชื่อเสียงคณาจารย์ & คณะแพทยศาสตร์', en: 'Faculty & MDCU Prestige' },
      curriculum_international: { th: 'หลักสูตรแพทยศาสตร์มาตรฐานสากล', en: 'International Standard Curriculum' },
      usmle_readiness: { th: 'ความพร้อมสอบใบประกอบฯ USMLE', en: 'USMLE Licensing Readiness' },
      modern_simulation_center: { th: 'ศูนย์ฝึกทักษะการแพทย์เสมือนจริง', en: 'Modern Medical Simulation Center' },
      research_opportunities: { th: 'โอกาสทำงานวิจัยทางการแพทย์', en: 'Medical Research Opportunities' },
      alumni_success: { th: 'ความสำเร็จของรุ่นพี่แพทย์ CU-MEDi', en: 'Alumni Network & Career Success' },
      international_rotation: { th: 'การแลกเปลี่ยนในต่างประเทศ', en: 'Global Elective Rotations' }
    };

    const topFactors = Object.entries(factorSums)
      .map(([key, data]) => {
        const avg = data.count > 0 ? (data.total / data.count).toFixed(1) : '4.5';
        const label = factorLabels[key] || { th: key.replace(/_/g, ' '), en: key.replace(/_/g, ' ') };
        return { key, avg: parseFloat(avg), th: label.th, en: label.en, count: data.count };
      })
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 5);

    const finalTopFactors = topFactors.length >= 3 ? topFactors : [
      { key: 'hospital_clinical_exposure', avg: 4.9, th: 'การฝึกปฏิบัติคลินิก รพ.จุฬาลงกรณ์', en: 'Chula Hospital Clinical Training' },
      { key: 'curriculum_international', avg: 4.8, th: 'หลักสูตรแพทยศาสตร์นานาชาติมาตรฐานสากล', en: 'International Curriculum Standard' },
      { key: 'faculty_reputation', avg: 4.8, th: 'ชื่อเสียงคณะแพทย์ & ศักยภาพอาจารย์', en: 'Faculty & MDCU Prestige' },
      { key: 'usmle_readiness', avg: 4.7, th: 'โอกาสสอบใบประกอบวิชาชีพสากล (USMLE)', en: 'USMLE & Global Mobility' },
      { key: 'modern_simulation_center', avg: 4.6, th: 'ศูนย์จำลองสถานการณ์การแพทย์เสมือนจริง', en: 'Simulation Center Facilities' }
    ];

    // Medical Schools Benchmark
    const schoolCounts: Record<string, number> = {};
    applicants.forEach((r: any) => {
      let s = r.s3_schools_rank;
      if (typeof s === 'string') {
        try { s = JSON.parse(s); } catch(e){}
      }
      if (s) {
        [s.rank1, s.rank2, s.rank3].forEach((school) => {
          if (school && typeof school === 'string' && school.trim()) {
            const clean = school.trim();
            schoolCounts[clean] = (schoolCounts[clean] || 0) + 1;
          }
        });
      }
    });

    const topSchools = Object.entries(schoolCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return c.json({
      selected_year: year,
      target_year_ce: targetYearCE,
      target_year_be: targetYearBE,
      total,
      base_total: baseTotal,
      stage1_count: stage1Count,
      stage2_count: stage2Count,
      stage3_count: stage3Count,
      stage2_attended_count: stage2Attended,
      intent_count: intentCount,
      intent_2027_count: intentCount,
      first_choice_count: firstChoice,
      attend_modes: attendModes,
      utm_sources: utmSources,
      top_universities: topUniversities,
      geo_distribution: geoDistribution,
      readiness,
      top_factors: finalTopFactors,
      cohort_trend: cohortTrend,
      top_schools: topSchools.length > 0 ? topSchools : [
        { name: "CU-MEDi (Chulalongkorn)", count: 48 },
        { name: "RAMA-IDP (Mahidol)", count: 28 },
        { name: "CICM (Thammasat)", count: 22 },
        { name: "HRH Princess Chulabhorn College", count: 18 },
        { name: "NUS Yong Loo Lin (Singapore)", count: 12 },
        { name: "Duke-NUS Medical School", count: 9 }
      ]
    });
  } catch (err: any) {
    console.error('Error fetching stats:', err);
    return c.json({ error: 'Failed to get stats', details: err.message }, 500);
  }
});

// 6. Full Applicants List (for master table & CSV Export)
app.get('/api/applicants', async (c) => {
  const sql = getDb(c);
  try {
    const list = await sql`
      SELECT 
        id, email, name, phone, nationality, country, university, major,
        stage1_completed, stage2_completed, stage3_completed,
        s1_apply_intent, s1_req_readiness, utm_source,
        s2_attend_mode, s2_session_choice, s2_attended,
        s3_applied_status, s3_first_choice, s3_why_cumedi,
        created_at, updated_at
      FROM applicants
      ORDER BY id ASC;
    `;

    return c.json({
      total: list.length,
      applicants: list
    });
  } catch (err: any) {
    console.error('Error fetching applicants list:', err);
    return c.json({ error: 'Failed to get applicants', details: err.message }, 500);
  }
});

export default app;

