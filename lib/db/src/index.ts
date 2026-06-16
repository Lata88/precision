import { readFileSync, existsSync } from "fs";
import path from "path";

// Find workspace root by looking for pnpm-workspace.yaml
function findWorkspaceRoot(): string {
  let current = process.cwd();
  while (current !== path.dirname(current)) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    current = path.dirname(current);
  }
  return process.cwd();
}

const workspaceRoot = findWorkspaceRoot();
const envPath = path.join(workspaceRoot, ".env");

try {
  const envContent = readFileSync(envPath, "utf-8");
  const lines = envContent.split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && !key.startsWith("#")) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
} catch (e) {
  console.warn("Could not load .env file:", e);
}

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export * from "./schema";
