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
  console.log("✅ Loaded environment from", envPath);
} catch (e) {
  console.error("❌ Could not load .env file:", e);
}