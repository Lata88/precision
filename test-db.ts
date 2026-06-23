import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");
    await client.connect();
    const result = await client.query("SELECT version()");
    console.log("✅ Connection successful!");
    console.log("PostgreSQL version:", result.rows[0].version.split(" ")[1]);
    await client.end();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    process.exit(1);
  }
}

testConnection();