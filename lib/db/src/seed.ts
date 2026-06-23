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
import {
  machinesTable,
  toolsTable,
  servicesTable,
  galleryTable,
} from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set before running the seed script.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(galleryTable);
  await db.delete(toolsTable);
  await db.delete(servicesTable);
  await db.delete(machinesTable);
  console.log("Cleared existing data.");

  // Machines
  await db.insert(machinesTable).values([
    {
      name: "Haas VF-2SS Super Speed",
      category: "Vertical Machining Center",
      description:
        "High-speed vertical machining center with a 12,000 RPM spindle, ideal for aluminum and light alloy parts. Features a 30+1 side-mount tool changer and 30\" x 16\" table.",
      specifications:
        'Travel: 30"x16"x20" | Spindle: 12,000 RPM | Tool Capacity: 30+1 | CNC: Haas NGC',
      imageUrl:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
      featured: true,
    },
    {
      name: "Mazak INTEGREX i-200S",
      category: "Multi-Tasking Machine",
      description:
        "Multi-tasking machine combining turning and 5-axis milling in a single setup. Equipped with a second spindle for complete part machining without re-fixturing.",
      specifications:
        "Max Turning Dia: 660mm | Bar Capacity: 102mm | Milling Spindle: 12,000 RPM | Axes: 5",
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      featured: true,
    },
    {
      name: "DMG MORI DMU 50",
      category: "5-Axis Machining Center",
      description:
        "Universal 5-axis machining center with a swivel rotary table for highly complex parts in a single clamping. Perfect for aerospace and medical components.",
      specifications:
        "Travel: 500x450x400mm | Spindle: 18,000 RPM | Table: 630mm dia | Axes: 5",
      imageUrl:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
      featured: false,
    },
    {
      name: "Doosan Lynx 2100",
      category: "CNC Turning Center",
      description:
        "High-performance 2-axis turning center with a rigid box guideway structure. Features a direct-drive spindle motor and 12-station turret for fast cycle times.",
      specifications:
        "Max Swing: 420mm | Bar Capacity: 65mm | Spindle: 4,500 RPM | Turret: 12 Station",
      imageUrl:
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
      featured: false,
    },
    {
      name: "FANUC Robocut α-CiC",
      category: "Wire EDM",
      description:
        "High-precision wire EDM machine capable of cutting complex shapes with ±0.001mm accuracy. Equipped with FANUC AI contour control for superior surface finish.",
      specifications:
        "Work Area: 600x400x215mm | Wire Dia: 0.1–0.3mm | Accuracy: ±0.001mm | Surface Finish: Ra 0.05μm",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      featured: true,
    },
  ]);
  console.log("Machines seeded.");

  // Tools
  await db.insert(toolsTable).values([
    {
      name: "Carbide End Mill Set (10-Piece)",
      category: "End Mills",
      description:
        "Premium solid carbide end mill set for high-speed cutting of steel, stainless, and aluminum. TiAlN coated for extended tool life and heat resistance.",
      specifications:
        "Sizes: 2mm–20mm | Coating: TiAlN | Flutes: 4 | Material: Carbide | Helix: 35°",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      name: "Indexable Face Mill 80mm",
      category: "Face Mill",
      description:
        "Heavy-duty indexable face milling cutter with 6 carbide inserts for high-productivity face milling operations on machining centers.",
      specifications:
        "Diameter: 80mm | Insert Count: 6 | Depth of Cut: 5mm | Shank: BT40/CAT40/SK40 | Insert: SEET",
      imageUrl:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    },
    {
      name: "CNC Turning Insert Set",
      category: "Turning Inserts",
      description:
        "Complete set of CNMG indexable turning inserts for CNC lathes. Multi-layer CVD coating for superior wear resistance and productivity.",
      specifications:
        "Grade: CNMG 120408 | Coating: CVD Multi-layer | Box of 10 | Chipbreaker: Medium | ISO: P/M/K",
      imageUrl:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    },
    {
      name: "Boring Bar Set",
      category: "Boring Tools",
      description:
        "Anti-vibration boring bar set for internal diameter machining. Carbide shank provides excellent rigidity in deep boring operations.",
      specifications:
        "Shank Diameter: 16–32mm | Max Boring Depth: 4xD | Insert: CCMT | Overhang: Up to 10xD",
      imageUrl:
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    },
    {
      name: "Drill Bit Set HSS-Co",
      category: "Drills",
      description:
        "Professional cobalt HSS drill bit set for drilling hardened steel, stainless steel, and cast iron. Split-point tip for accurate positioning.",
      specifications:
        "Sizes: 1mm–13mm (25 pcs) | Material: M35 HSS-Co | Point Angle: 135° | Shank: Cylindrical",
      imageUrl:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80",
    },
    {
      name: "Collet Chuck Set BT40",
      category: "Tool Holders",
      description:
        "High-precision BT40 collet chuck set for CNC machining centers. ER32 collet system provides excellent clamping force and minimal runout.",
      specifications:
        "Taper: BT40 | Collet Type: ER32 | Runout: <0.003mm | Collet Range: 2–20mm | Balance: G2.5",
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    },
  ]);
  console.log("Tools seeded.");

  // Services
  await db.insert(servicesTable).values([
    {
      title: "CNC Machining",
      icon: "cog",
      description:
        "Precision CNC milling, turning, and multi-axis machining for complex components in steel, aluminum, titanium, and plastics.",
      details:
        "Tolerances to ±0.005mm | Materials: Steel, Al, Ti, Inconel | Batch sizes: 1–10,000 | Lead time: 3–7 days",
    },
    {
      title: "Machine Repair & Maintenance",
      icon: "wrench",
      description:
        "On-site and workshop repair services for all major CNC brands. Preventive maintenance contracts available to minimize downtime.",
      details:
        "Brands: Haas, Mazak, DMG, Fanuc, Siemens | Response time: 24h | Spare parts stocked | Annual contracts",
    },
    {
      title: "Tooling Supply",
      icon: "tool",
      description:
        "Complete range of cutting tools, tool holders, and workholding solutions from leading brands. Expert application support included.",
      details:
        "Brands: Sandvik, Kennametal, Iscar, Walter | Same-day dispatch | Technical support | Custom specials",
    },
    {
      title: "CAD/CAM Programming",
      icon: "monitor",
      description:
        "Expert CAD/CAM programming for 3-axis to 5-axis CNC machining using Mastercam, Fusion 360, and NX. DXF/STEP/IGES files accepted.",
      details:
        "Software: Mastercam, Fusion 360, NX | Formats: STEP, IGES, DXF, STL | Delivery: 24–48h | Online collaboration",
    },
  ]);
  console.log("Services seeded.");

  // Gallery
  await db.insert(galleryTable).values([
    {
      title: "5-Axis Aerospace Component",
      category: "Machining",
      imageUrl:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    },
    {
      title: "CNC Turning Precision Parts",
      category: "Turning",
      imageUrl:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    },
    {
      title: "Wire EDM Fine Detail Work",
      category: "EDM",
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    },
    {
      title: "High-Speed Milling Operation",
      category: "Machining",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      title: "Tool Room Measurement",
      category: "Quality",
      imageUrl:
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    },
    {
      title: "Vertical Machining Center Floor",
      category: "Workshop",
      imageUrl:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80",
    },
    {
      title: "Stainless Steel Hydraulic Block",
      category: "Machining",
      imageUrl:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    },
    {
      title: "Custom Fixture & Workholding",
      category: "Workshop",
      imageUrl:
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    },
    {
      title: "Carbide Insert Face Milling",
      category: "Machining",
      imageUrl:
        "https://images.unsplash.com/photo-1590959651373-a281d069e5c1?w=800&q=80",
    },
  ]);
  console.log("Gallery seeded.");

  await pool.end();
  console.log("\nDatabase seeded successfully!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  pool.end();
  process.exit(1);
});
