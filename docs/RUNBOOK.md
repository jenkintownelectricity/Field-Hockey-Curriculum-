# RUNBOOK — FieldHockeyKernel™ Dev

## Prereqs
- Node 20+
- Docker Desktop

## Local DB (Postgres)
1) Copy `.env.example` → `.env` and keep DATABASE_URL as-is.
2) Start DB:
   - `npm run db:up`

## Install
- `npm install`

## Migrate + Seed taxonomy
- `npm run db:push`
- `npm run prisma:generate`
- `npm run db:seed`

## Kernel derived JSON validation
Claude will generate:
- `seed/curriculum/drills.derived.json`
- `seed/curriculum/lessons.derived.json`
- `seed/curriculum/programs.derived.json`

Validate:
- `npm run kernel:validate`

## Next
Once the app exists:
- `cd app && npm run dev`