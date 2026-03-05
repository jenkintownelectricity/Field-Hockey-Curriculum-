\# CLAUDE CODE DIRECTIVE — Field Hockey SaaS (iOS/Android Ready) + FieldHockeyKernel™



Repo: https://github.com/jenkintownelectricity/Field-Hockey-Curriculum-.git



\## 0) Non-Negotiable Goal

Build a standalone SaaS that lets a parent/coach run a complete beginner field hockey program from home with minimal facility rentals.



The system must be:

\- Mobile-first web app (PWA)

\- iPhone + Android ready using Capacitor wrappers

\- Data-first: a FieldHockeyKernel™ + taxonomy is the foundation; UI is built on top of that data model



Seed content:

\- Ingest the existing 2-day beginner camp plan and turn it into structured kernel entities and user-facing curriculum.

&nbsp; (Source: “Beginner Skills Camp — Ages 12 — 2-Day Program • 2 Hours Per Day” doc) 



\## 1) Product Scope (MVP → V1)

\### MVP Must Include

A) Curriculum runner (Practice Mode)

\- Choose program (2-day camp, 6-week plan)

\- Run a session with timers, drill-by-drill checklist, hydration prompts

\- “At-home mode” variations (small space, no goals, household cones)



B) Content exports (generated from kernel)

\- Printable coaching workbook (PDF)

\- Playbook diagrams (SVG) + PDF export

\- Pocket practice cards (printable)

\- YouTube-ready drill scripts (teleprompter format + shot list)



C) FieldHockeyKernel™ (foundation layer)

\- Strong taxonomy \& metadata

\- Query/filter/search by: age, skill, space required, surface type, equipment, time, intensity, learning goal, emotion/engagement strategy, coaching style

\- Versioned kernel schema (v0.1.0) with migration strategy



\### V1 Nice-to-have

\- Coach accounts + saved programs + progress tracking

\- Payments/subscriptions (Stripe)

\- “Virtual training” mode: guided audio prompts + timer + drill check-ins

\- Multi-language support



\## 2) Architectural Decisions (Do not deviate unless blocked)

\### Stack

\- Web app: Next.js (App Router) + TypeScript + Tailwind

\- DB: Postgres (Prisma ORM)

\- Auth: NextAuth (or Clerk if needed)

\- File generation:

&nbsp; - PDF: server-side rendering (React PDF or Playwright print-to-PDF)

&nbsp; - SVG diagrams: generated from kernel diagram DSL → SVG

\- Search:

&nbsp; - Postgres full-text + optional embeddings (pgvector) for semantic drill search

\- Mobile:

&nbsp; - PWA first (offline-friendly)

&nbsp; - Capacitor wrappers to ship as iOS/Android apps



\### Hosting

\- MVP: Vercel for Next.js + Neon/Supabase Postgres

\- Background jobs: simple queue (BullMQ/Upstash QStash) for PDF/SVG batch generation



\## 3) The FieldHockeyKernel™ — The Foundation

\### 3.1 Core Principle

Everything the UI shows must come from kernel entities.

No hard-coded drills in the UI. The UI reads kernel data and renders experiences.



\### 3.2 Kernel Entities (Minimum Required)

Implement these entities (Prisma models + JSON export format):



1\) Surface

\- id, name, category (hardwood, polyurethane, sport tiles, turf)

\- friction\_estimate, ball\_behavior\_notes

\- footwear\_guidance

\- safety\_notes

\- materials: \[Material]



2\) Material

\- id, name, type (polyurethane, maple, polypropylene, composite, leather, rubber, foam)

\- properties: durability, grip, bounce, abrasion, wet\_behavior

\- usage\_context



3\) Equipment

\- id, name, category (stick, ball, cones, goals, pinnies)

\- size ranges (e.g. stick sizes), safety notes

\- required\_for\_drills



4\) Skill

\- id, name (grip, stance, dribble, push\_pass, trap, shoot, defend)

\- prerequisites: \[Skill]

\- coaching\_cues

\- common\_mistakes



5\) Drill

\- id, name

\- goals: \[Skill]

\- duration\_default

\- setup: space\_required, player\_count\_min/max

\- equipment: \[Equipment]

\- steps (structured)

\- coaching\_points

\- common\_mistakes

\- safety\_notes

\- at\_home\_variants (structured)

\- surface\_compatibility: \[Surface]

\- intensity (1–5)

\- learning\_mode tags (demo, repetition, game, challenge)



6\) Diagram

\- id, drill\_id

\- diagram\_dsl (your own mini language)

\- render\_svg() output

\- printable\_layout\_metadata (page size, margins)



7\) Storyboard

\- id, drill\_id

\- frames\[]: {frame\_no, scene, camera, overlay\_text, coach\_voiceover, movement}



8\) Lesson (Session Block)

\- id, title

\- timeline\_blocks\[] referencing drills + durations

\- hydration\_breaks

\- coaching\_notes



9\) Program

\- id, title (2-day camp, 6-week development)

\- schedule (weeks/days)

\- sessions\[] (Lesson)



10\) Emotion \& Pedagogy (YES—bake it in)

Add taxonomy fields that capture:

\- emotions targeted (confidence, curiosity, calm-focus, resilience, joy, belonging)

\- coaching tone (playful, calm, energetic)

\- reinforcement strategy (praise-effort, praise-technique, challenge-reward)

\- common emotional blockers (frustration, embarrassment, fear\_of\_mistakes)

\- interventions (micro-wins, partner-support, reset-breath, simplify-step)



Implement as:

\- EmotionTag model + many-to-many linking to Drill/Lesson/Program

\- PedagogyTag model + many-to-many



\### 3.3 Taxonomy “Down to the DNA”

Build a controlled vocabulary / ontology file in `/kernel/taxonomy/`:

\- surfaces.yml

\- materials.yml

\- skills.yml

\- emotions.yml

\- pedagogy.yml

\- environments.yml (home, driveway, gym, turf, small-space)

\- constraints.yml (no-goals, no-cones, no-ball, 2-people-only)



These files are the source of truth, loaded into DB via seed scripts.



\### 3.4 Versioning \& Governance

Create:

\- `/kernel/schema/version.ts` (v0.1.0)

\- migration notes

\- strict validation with Zod:

&nbsp; - kernel JSON must validate before import

\- “fail-closed” semantics:

&nbsp; - if drill lacks required safety notes or at-home variant → block publishing



\## 4) Kernel-First Content Pipeline (Automated)

Implement a pipeline that:

1\) Imports seed content (2-day camp) into structured Drill/Lesson/Program rows

2\) Expands into:

&nbsp;  - 6-week curriculum (2 sessions/week)

&nbsp;  - at-home equivalents for every drill

&nbsp;  - YouTube scripts for every drill

&nbsp;  - diagrams + storyboards



\### Deliverables generated from kernel

A) Workbook PDF

\- Cover page

\- Table of contents

\- Session-by-session print pages

\- Coaching cues and checklists



B) Diagram Playbook

\- SVG for each drill diagram

\- Combined PDF export



C) YouTube Script Pack

For each drill:

\- title

\- 5–7 second hook

\- voiceover script

\- shot list (wide, close-up, overhead)

\- on-screen text cues

\- CTA

Export formats: Markdown + Teleprompter TXT



D) Pocket Cards

\- 10–20 cards

\- printable 3x5 layout

\- includes mini diagram + cues



\## 5) App Features (Build on Kernel)

\### Pages

\- Home (choose program mode: 2-day, 6-week, at-home)

\- Program Viewer (weeks/sessions)

\- Session Runner (“Practice Mode”)

&nbsp; - step-by-step drills

&nbsp; - timer

&nbsp; - hydration prompts

&nbsp; - quick coaching cues

\- Drill Library

&nbsp; - filter by: space, surface, equipment, skill, time, emotion, intensity

\- Exports Center

&nbsp; - generate workbook PDF

&nbsp; - generate playbook PDF

&nbsp; - download scripts pack

&nbsp; - print pocket cards

\- Admin (MVP)

&nbsp; - manage kernel entities

&nbsp; - import/export kernel JSON

&nbsp; - publish/unpublish



\### Offline-first (PWA)

\- Cache last opened program \& session

\- Allow running a session without internet



\## 6) Repository Structure (Create This)

/

&nbsp; app/                      # Next.js app router

&nbsp; components/

&nbsp; lib/

&nbsp; prisma/

&nbsp;   schema.prisma

&nbsp;   seed.ts

&nbsp; kernel/

&nbsp;   schema/

&nbsp;   taxonomy/

&nbsp;   exports/

&nbsp;   validators/

&nbsp;   generators/

&nbsp;     diagrams/             # DSL → SVG

&nbsp;     pdf/                  # workbook + playbook generation

&nbsp;     scripts/              # YouTube + teleprompter outputs

&nbsp;     storyboards/

&nbsp; capacitor/

&nbsp; docs/

&nbsp;   ARCHITECTURE.md

&nbsp;   KERNEL\_SPEC.md

&nbsp;   TAXONOMY\_GUIDE.md

&nbsp;   RUNBOOK.md

&nbsp; .github/workflows/

&nbsp; .claude/

&nbsp;   DIRECTIVE.md            # this file



\## 7) Execution Plan (Claude must follow)

Phase 1 — Kernel Foundation

\- Implement Prisma schema for kernel entities

\- Implement taxonomy YAML + seed scripts

\- Implement kernel JSON import/export

\- Implement validation + fail-closed publishing checks



Phase 2 — Generators

\- Diagram DSL + SVG renderer

\- Storyboard generator (structured frames)

\- YouTube script generator

\- PDF exports (workbook + playbook + pocket cards)



Phase 3 — App UX

\- Build Program viewer + Session Runner

\- Drill library with filters

\- Exports center + job queue



Phase 4 — Mobile Packaging

\- Setup Capacitor

\- Build + run iOS/Android wrappers

\- Ensure safe-area, responsive UI, offline caching



\## 8) Definition of Done (Hard Acceptance Tests)

\- Can run the 2-day camp entirely from the app (timers + drill steps)

\- Every drill has:

&nbsp; - safety notes

&nbsp; - at-home variant

&nbsp; - surface compatibility

&nbsp; - at least one emotion/pedagogy tag

\- Exports work:

&nbsp; - workbook PDF downloads

&nbsp; - playbook PDF downloads (from SVG diagrams)

&nbsp; - scripts pack downloads (MD + TXT)

&nbsp; - pocket cards printable layout

\- Mobile readiness:

&nbsp; - PWA installable

&nbsp; - Capacitor build steps documented and functional



\## 9) Claude Operating Rules

\- Write production-quality TypeScript.

\- Prefer small, testable modules.

\- Document everything in `/docs`.

\- Never hard-code curriculum into UI; always pull from kernel.

\- If any required kernel data is missing, block publishing and output a clear error.
## 10) ONE-SHOT BUILD RULES (CRITICAL)



This is a ONE-SHOT command execution.

Claude must complete the entire build in a single run such that the repo boots, runs, and ships with all core features working.



\### 10.1 Zero Placeholders Policy

\- No TODOs, no “stub”, no “later”, no fake endpoints.

\- No placeholder UI text like “Coming soon”.

\- No dead links or disabled buttons unless explicitly labeled as “future” and hidden behind a feature flag OFF by default.

\- If a feature is included in the UI, it must fully work end-to-end.



\### 10.2 Full Working System Requirement

After build, the following must all function without manual intervention:

\- `pnpm install` (or `npm install`) succeeds

\- `pnpm dev` runs the full web app

\- DB migrations run cleanly

\- Seed data loads cleanly

\- Export generation works:

&nbsp; - Workbook PDF export

&nbsp; - Playbook PDF export (from SVG diagrams)

&nbsp; - Pocket cards print/export

&nbsp; - YouTube scripts pack export (MD + TXT)

\- Practice Mode works with timers, drill steps, hydration prompts

\- Drill Library filters work (skill, surface, equipment, time, intensity, emotion/pedagogy tags)

\- Kernel import/export works and validates



\### 10.3 Test Data Coverage (Minimum)

Seed at least ONE valid record for EVERY kernel entity type:

\- Surface (>= 3)

\- Material (>= 6)

\- Equipment (>= 8)

\- Skill (>= 6)

\- Drill (>= 10)

\- Diagram (>= 10, one per drill)

\- Storyboard (>= 6, one per major drill)

\- Lesson (>= 4)

\- Program (>= 2: 2-day camp + 6-week program)

\- EmotionTag (>= 8)

\- PedagogyTag (>= 8)



Each seeded drill MUST include:

\- safety notes

\- at-home variant

\- surface compatibility

\- equipment list

\- emotion + pedagogy tags

\- diagram DSL that successfully renders to SVG



\### 10.4 Button \& Flow Verification (No Broken UX)

Before finalizing, Claude must click-through verify:

\- Every primary navigation link

\- Every “Generate/Download” export button

\- Session Runner start/pause/next drill buttons

\- Filters in Drill Library

\- Admin publish/unpublish and validation errors



If any route, button, or export fails, FIX IT before proceeding.



\### 10.5 Token Discipline (IMPORTANT)

Claude must optimize for minimal token usage:

\- Do not generate massive prose inside code comments.

\- Use short, structured seed data rather than giant narrative strings.

\- Generate exports (PDF/SVG/scripts) deterministically from kernel templates.

\- Avoid reprinting large files in chat output.

\- Prefer “small increments”: implement, test, commit—repeat.



\### 10.6 Incremental Build + Frequent Commits (Browser Safety)

Claude’s repo is browser-local and can be lost.

Therefore:

\- Work in small increments.

\- Commit locally after each meaningful milestone (e.g., kernel schema done, seed data done, diagram renderer done, exports done, core pages done).

\- Push to GitHub frequently (after each milestone) to avoid data loss.



Required commit pattern:

\- Conventional commits style:

&nbsp; - `feat(kernel): ...`

&nbsp; - `feat(exports): ...`

&nbsp; - `feat(app): ...`

&nbsp; - `fix: ...`

&nbsp; - `chore: ...`

\- Each commit message must describe the working slice added.



\### 10.7 Build Verification Checklist (Final Gate)

Claude must not declare completion until ALL are true:

\- App runs locally with no console errors

\- DB seeded with required coverage

\- Exports generated successfully (PDF/SVG/scripts)

\- Practice Mode works end-to-end for 1 full session

\- All buttons tested and working

\- Docs updated:

&nbsp; - `/docs/RUNBOOK.md` includes exact steps to run, migrate, seed, build, export, wrap with Capacitor



END ONE-SHOT RULES



END DIRECTIVE

