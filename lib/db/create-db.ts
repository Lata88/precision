import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "lata@123",
  database: "postgres", // connect to default database
});

async function createDatabase() {
  try {
    await client.connect();
    await client.query("CREATE DATABASE cncdb");
    console.log("Database cncdb created successfully");
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.end();
  }
}

createDatabase();