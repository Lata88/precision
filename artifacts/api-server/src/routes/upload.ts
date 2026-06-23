import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
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

import { Router, type IRouter, type Request, type Response } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router: IRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

// Lazy-loaded Supabase client
let supabase: ReturnType<typeof createClient> | null = null;

function shouldUseLocalStorage() {
  return process.env.SUPABASE_UPLOADS_ENABLED === "false";
}

function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
    }

    supabase = createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabase;
}

interface UploadRequest extends Request {
  file?: Express.Multer.File;
  body: {
    bucket?: string;
  };
}

router.post("/", upload.single("file"), async (req: UploadRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const bucket = req.body.bucket || "gallery";
    const fileName = `${Date.now()}-${req.file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")}`;
    const filePath = `${bucket}/${fileName}`;

    const saveLocally = () => {
      const uploadDir = path.join(workspaceRoot, "artifacts", "cnc-website", "public", "uploads", bucket);
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      const localFilePath = path.join(uploadDir, fileName);
      writeFileSync(localFilePath, req.file!.buffer);

      const basePath = process.env.BASE_PATH || "/";
      const relativeUrl = path.join(basePath, "uploads", bucket, fileName).replace(/\\/g, "/");

      res.json({
        url: relativeUrl,
        path: filePath,
        fileName,
        fullPath: `local/${filePath}`,
      });
    };

    if (shouldUseLocalStorage()) {
      saveLocally();
      return;
    }

    // Try uploading to Supabase first, then fall back to local storage for dev/offline use.
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(filePath);

      res.json({
        url: publicUrl,
        path: filePath,
        fileName,
        fullPath: data.path,
      });
      return;
    } catch (supabaseError) {
      const message = supabaseError instanceof Error ? supabaseError.message : "unknown error";
      console.warn(`Supabase upload unavailable (${message}); saved image to local storage.`);
      saveLocally();
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed" });
  }
});

export default router;
