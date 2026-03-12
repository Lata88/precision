# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a full CNC Machine Tools & Services company website.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Carousel**: Embla Carousel

## Project: CNC Machine Tools & Services

A full professional website for a CNC manufacturing company with 7 pages + admin panel.

### Pages
- **Home** - Hero slider, featured services, CTAs
- **About** - Company info, mission, vision
- **CNC Machines** - Product listing from database with category filters
- **Machine Tools** - Tools/accessories grid
- **Services** - Maintenance, repair, calibration, preventive maintenance
- **Gallery** - Photo gallery with category filters
- **Contact** - Contact form, map, WhatsApp button
- **Admin** - Admin panel for managing machines, tools, gallery

### Design
- Dark navy blue (#0a1628) + steel gray + amber accent
- Sticky navigation, mobile responsive
- Floating WhatsApp button
- Smooth animations via Framer Motion

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── cnc-website/        # React + Vite frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
│       └── src/schema/
│           ├── machines.ts
│           ├── tools.ts
│           ├── services.ts
│           ├── gallery.ts
│           └── contacts.ts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## API Endpoints

All under `/api`:
- `GET/POST /machines` - CNC machines
- `DELETE /machines/:id`
- `GET/POST /tools` - Machine tools
- `DELETE /tools/:id`
- `GET/POST /services` - Services
- `GET/POST /gallery` - Gallery images
- `DELETE /gallery/:id`
- `POST /contact` - Contact form submission
- `GET /contact` - List submissions (admin)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
