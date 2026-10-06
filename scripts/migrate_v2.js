import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_N0ErUm5Bnxko@ep-hidden-truth-b37brfql-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(databaseUrl);

async function runMigration() {
  console.log('Running migration...');
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s1_info_wanted JSONB;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s1_info_other TEXT;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s1_interest_reason TEXT;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s2_heard_from JSONB;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s2_heard_other TEXT;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s3_intake_round TEXT;`;
  await sql`ALTER TABLE applicants ADD COLUMN IF NOT EXISTS s3_roadshow_want TEXT;`;
  console.log('Migration successful: All columns ensured.');
  const cols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'applicants'
    ORDER BY ordinal_position;
  `;
  console.log('Applicants columns:', cols.map(c => c.column_name).join(', '));
}

runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
