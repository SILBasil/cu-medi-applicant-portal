import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon } from '@neondatabase/serverless';

type Bindings = {
  DATABASE_URL: string;
  ASSETS?: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// Helper to serve index.html for SPA routes
const serveIndex = async (c: any) => {
  if (c.env?.ASSETS) {
    const url = new URL('/index.html', c.req.url);
    return c.env.ASSETS.fetch(new Request(url.toString(), c.req.raw));
  }
  return c.text('Not found', 404);
};

app.get('/interested', serveIndex);
app.get('/openhouse', serveIndex);
app.get('/survey', serveIndex);
app.get('/portal', serveIndex);

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
      bachelor_degree: appRecord.s1_bachelor_degree
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
        email, name, nationality, country, university,
        stage1_completed, stage1_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        s1_bachelor_degree, s1_apply_intent, s1_req_readiness,
        s1_heard_from, s1_heard_other, s1_suggestion_process, s1_suggestion_openhouse, s1_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.country || ''}, ${body.university || ''},
        true, CURRENT_TIMESTAMP,
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_content || ''}, ${body.landing_page || ''},
        ${body.bachelor_degree || ''}, ${body.apply_intent || ''}, ${JSON.stringify(body.req_readiness || {})},
        ${JSON.stringify(body.heard_from || [])}, ${body.heard_other || ''}, ${body.suggestion_process || ''}, ${body.suggestion_openhouse || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
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
        s2_recipient_group, s2_education_level, s2_year_of_study, s2_apply_intent,
        s2_attend_mode, s2_session_choice, s2_comments, s2_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.phone || ''}, ${body.university || ''}, ${body.major || ''},
        true, CURRENT_TIMESTAMP,
        ${body.recipient_group || ''}, ${body.education_level || ''}, ${body.year_of_study || ''}, ${body.apply_intent || ''},
        ${body.attend_mode || ''}, ${body.session_choice || ''}, ${body.comments || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        nationality = COALESCE(NULLIF(EXCLUDED.nationality, ''), applicants.nationality),
        phone = COALESCE(NULLIF(EXCLUDED.phone, ''), applicants.phone),
        university = COALESCE(NULLIF(EXCLUDED.university, ''), applicants.university),
        major = COALESCE(NULLIF(EXCLUDED.major, ''), applicants.major),
        stage2_completed = true,
        stage2_completed_at = COALESCE(applicants.stage2_completed_at, CURRENT_TIMESTAMP),
        s2_recipient_group = EXCLUDED.s2_recipient_group,
        s2_education_level = EXCLUDED.s2_education_level,
        s2_year_of_study = EXCLUDED.s2_year_of_study,
        s2_apply_intent = EXCLUDED.s2_apply_intent,
        s2_attend_mode = EXCLUDED.s2_attend_mode,
        s2_session_choice = EXCLUDED.s2_session_choice,
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
        s3_applied_status, s3_gender, s3_age, s3_region,
        s3_schools_rank, s3_destination_rank, s3_future_location, s3_postgrad_plan,
        s3_decision_factors_30, s3_first_choice, s3_why_cumedi, s3_consent_pdpa,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''},
        true, CURRENT_TIMESTAMP,
        ${body.applied_status || ''}, ${body.gender || ''}, ${body.age ? parseInt(body.age) : null}, ${body.region || ''},
        ${JSON.stringify(body.schools_rank || {})}, ${JSON.stringify(body.destination_rank || {})}, ${body.future_location || ''}, ${body.postgrad_plan || ''},
        ${JSON.stringify(body.decision_factors_30 || {})}, ${body.first_choice || ''}, ${body.why_cumedi || ''}, ${body.consent_pdpa !== false},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        stage3_completed = true,
        stage3_completed_at = COALESCE(applicants.stage3_completed_at, CURRENT_TIMESTAMP),
        s3_applied_status = EXCLUDED.s3_applied_status,
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

// 5. Admin Stats & Summary (from single table)
app.get('/api/stats', async (c) => {
  const sql = getDb(c);
  try {
    const totalApplicants = await sql`SELECT COUNT(*) as count FROM applicants;`;
    const stage1Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage1_completed = true;`;
    const stage2Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage2_completed = true;`;
    const stage3Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage3_completed = true;`;
    const recent = await sql`
      SELECT id, email, name, phone, stage1_completed, stage2_completed, stage3_completed, updated_at 
      FROM applicants 
      ORDER BY updated_at DESC 
      LIMIT 10;
    `;

    return c.json({
      total: parseInt(totalApplicants[0].count),
      stage1_count: parseInt(stage1Count[0].count),
      stage2_count: parseInt(stage2Count[0].count),
      stage3_count: parseInt(stage3Count[0].count),
      recent
    });
  } catch (err: any) {
    return c.json({ error: 'Failed to get stats', details: err.message }, 500);
  }
});

export default app;
