import { createClient } from "@supabase/supabase-js";

function inferSupabaseUrlFromDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return undefined;
  }

  try {
    const parsed = new URL(databaseUrl);

    if (!parsed.hostname.endsWith(".supabase.co")) {
      return undefined;
    }

    return `https://${parsed.hostname}`;
  } catch {
    return undefined;
  }
}

function requireEnv(name: "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set before using the Supabase admin client.`);
  }

  return value;
}

function getSupabaseUrl() {
  const value = process.env.SUPABASE_URL ?? inferSupabaseUrlFromDatabaseUrl();

  if (!value) {
    throw new Error(
      "SUPABASE_URL must be set before using the Supabase admin client.",
    );
  }

  return value;
}

export function getSupabaseAdminClient() {
  return createClient(getSupabaseUrl(), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
