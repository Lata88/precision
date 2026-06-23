import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set before running the test script.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");
    // Simple query to test connection
    const result = await db.execute("SELECT 1 as test");
    console.log("✅ Connection successful!");
    console.log("Test query result:", result.rows[0]);
    await pool.end();
  } catch (error) {
    console.error("❌ Connection failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testConnection();