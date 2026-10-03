import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon } from '@neondatabase/serverless';

type Bindings = {
  DATABASE_URL: string;
  ASSETS?: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// Helper to get Neon SQL client
const getDb = (c: any) => {
  const dbUrl = c.env?.DATABASE_URL || "postgresql://neondb_owner:npg_N0ErUm5Bnxko@ep-hidden-truth-b37brfql-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  return neon(dbUrl);
};

// 1. Check applicant status and prefill data
app.get('/api/applicant/status', async (c) => {
  const email = c.req.query('email')?.trim().toLowerCase();
  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    const result = await sql`
      SELECT id, email, name, nationality, phone, 
             stage1_completed, stage2_completed, stage3_completed,
             created_at
      FROM applicants 
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1;
    `;

    if (result.length === 0) {
      return c.json({
        exists: false,
        email,
        stage1_completed: false,
        stage2_completed: false,
        stage3_completed: false,
        prefill: {}
      });
    }

    const appRecord = result[0];

    // Fetch latest known prefill data
    let prefill: Record<string, any> = {
      email: appRecord.email,
      name: appRecord.name,
      nationality: appRecord.nationality,
      phone: appRecord.phone
    };

    return c.json({
      exists: true,
      email: appRecord.email,
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

// 2. Submit Stage 1 (Interested / Lead)
app.post('/api/submit/stage1', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    // 1. Upsert into applicants table
    const applicantResult = await sql`
      INSERT INTO applicants (
        email, name, nationality, 
        stage1_completed, stage1_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''}, ${body.nationality || ''},
        true, CURRENT_TIMESTAMP,
        ${body.utm_source || ''}, ${body.utm_medium || ''}, ${body.utm_campaign || ''}, ${body.utm_content || ''}, ${body.landing_page || ''},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        nationality = COALESCE(NULLIF(EXCLUDED.nationality, ''), applicants.nationality),
        stage1_completed = true,
        stage1_completed_at = COALESCE(applicants.stage1_completed_at, CURRENT_TIMESTAMP),
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, name, stage1_completed, stage2_completed, stage3_completed;
    `;

    const applicant = applicantResult[0];

    // 2. Insert into form1_interested record
    await sql`
      INSERT INTO form1_interested (
        applicant_id, email, name, nationality, country,
        bachelor_degree, university, apply_intent,
        req_readiness, heard_from, heard_other,
        suggestion_process, suggestion_openhouse, consent_pdpa,
        utm_data
      ) VALUES (
        ${applicant.id}, ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.country || ''},
        ${body.bachelor_degree || ''}, ${body.university || ''}, ${body.apply_intent || ''},
        ${JSON.stringify(body.req_readiness || {})}, ${JSON.stringify(body.heard_from || [])}, ${body.heard_other || ''},
        ${body.suggestion_process || ''}, ${body.suggestion_openhouse || ''}, ${body.consent_pdpa !== false},
        ${JSON.stringify(body.utm_data || {})}
      );
    `;

    return c.json({
      success: true,
      message: 'Stage 1 application submitted successfully',
      applicant
    });
  } catch (err: any) {
    console.error('Error submitting Stage 1:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 3. Submit Stage 2 (Open House)
app.post('/api/submit/stage2', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    // 1. Upsert into applicants table
    const applicantResult = await sql`
      INSERT INTO applicants (
        email, name, nationality, phone,
        stage2_completed, stage2_completed_at,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.phone || ''},
        true, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        nationality = COALESCE(NULLIF(EXCLUDED.nationality, ''), applicants.nationality),
        phone = COALESCE(NULLIF(EXCLUDED.phone, ''), applicants.phone),
        stage2_completed = true,
        stage2_completed_at = COALESCE(applicants.stage2_completed_at, CURRENT_TIMESTAMP),
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, name, stage1_completed, stage2_completed, stage3_completed;
    `;

    const applicant = applicantResult[0];

    // 2. Insert into form2_openhouse
    await sql`
      INSERT INTO form2_openhouse (
        applicant_id, email, name, nationality, phone,
        recipient_group, education_level, year_of_study, university, major,
        apply_intent, heard_from, attend_mode, session_choice,
        comments, consent_pdpa, utm_data
      ) VALUES (
        ${applicant.id}, ${email}, ${body.name || ''}, ${body.nationality || ''}, ${body.phone || ''},
        ${body.recipient_group || ''}, ${body.education_level || ''}, ${body.year_of_study || ''}, ${body.university || ''}, ${body.major || ''},
        ${body.apply_intent || ''}, ${JSON.stringify(body.heard_from || [])}, ${body.attend_mode || ''}, ${body.session_choice || ''},
        ${body.comments || ''}, ${body.consent_pdpa !== false}, ${JSON.stringify(body.utm_data || {})}
      );
    `;

    return c.json({
      success: true,
      message: 'Stage 2 Open House registration submitted successfully',
      applicant
    });
  } catch (err: any) {
    console.error('Error submitting Stage 2:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 4. Submit Stage 3 (Applicant Survey)
app.post('/api/submit/stage3', async (c) => {
  const body = await c.req.json();
  const email = body.email?.trim().toLowerCase();

  if (!email) {
    return c.json({ error: 'Email is required' }, 400);
  }

  const sql = getDb(c);
  try {
    // 1. Upsert into applicants table
    const applicantResult = await sql`
      INSERT INTO applicants (
        email, name,
        stage3_completed, stage3_completed_at,
        updated_at
      ) VALUES (
        ${email}, ${body.name || ''},
        true, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(NULLIF(EXCLUDED.name, ''), applicants.name),
        stage3_completed = true,
        stage3_completed_at = COALESCE(applicants.stage3_completed_at, CURRENT_TIMESTAMP),
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, name, stage1_completed, stage2_completed, stage3_completed;
    `;

    const applicant = applicantResult[0];

    // 2. Insert into form3_survey
    await sql`
      INSERT INTO form3_survey (
        applicant_id, email, name, applied_status, req_readiness,
        gender, age, education_level, major, university, region,
        schools_rank, destination_rank, future_location, postgrad_plan,
        decision_factors_30, first_choice, why_cumedi, consent_pdpa,
        utm_data
      ) VALUES (
        ${applicant.id}, ${email}, ${body.name || ''}, ${body.applied_status || ''}, ${JSON.stringify(body.req_readiness || {})},
        ${body.gender || ''}, ${body.age ? parseInt(body.age) : null}, ${body.education_level || ''}, ${body.major || ''}, ${body.university || ''}, ${body.region || ''},
        ${JSON.stringify(body.schools_rank || {})}, ${JSON.stringify(body.destination_rank || {})}, ${body.future_location || ''}, ${body.postgrad_plan || ''},
        ${JSON.stringify(body.decision_factors_30 || {})}, ${body.first_choice || ''}, ${body.why_cumedi || ''}, ${body.consent_pdpa !== false},
        ${JSON.stringify(body.utm_data || {})}
      );
    `;

    return c.json({
      success: true,
      message: 'Stage 3 Applicant Survey submitted successfully',
      applicant
    });
  } catch (err: any) {
    console.error('Error submitting Stage 3:', err);
    return c.json({ error: 'Failed to submit form', details: err.message }, 500);
  }
});

// 5. Admin Stats & Summary
app.get('/api/stats', async (c) => {
  const sql = getDb(c);
  try {
    const totalApplicants = await sql`SELECT COUNT(*) as count FROM applicants;`;
    const stage1Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage1_completed = true;`;
    const stage2Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage2_completed = true;`;
    const stage3Count = await sql`SELECT COUNT(*) as count FROM applicants WHERE stage3_completed = true;`;
    const recent = await sql`
      SELECT email, name, stage1_completed, stage2_completed, stage3_completed, updated_at 
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
