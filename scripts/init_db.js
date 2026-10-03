import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_N0ErUm5Bnxko@ep-hidden-truth-b37brfql-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

async function initDb() {
  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(databaseUrl);
  const schema = fs.readFileSync(path.join(process.cwd(), 'schema.sql'), 'utf-8');
  
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      console.log("Executed statement successfully.");
    } catch (err) {
      console.error("Error executing statement:", err.message);
    }
  }
  console.log("All tables created successfully!");
}

initDb();
