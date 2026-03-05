# CLAUDE CODE DIRECTIVE — Field Hockey SaaS (iOS/Android Ready) + FieldHockeyKernel™

Repo: https://github.com/jenkintownelectricity/Field-Hockey-Curriculum-.git

## 0) Non-Negotiable Goal
Build a standalone SaaS that lets a parent/coach run a complete beginner field hockey program from home with minimal facility rentals.

The system must be:
- Mobile-first web app (PWA)
- iPhone + Android ready using Capacitor wrappers (Capacitor-ready; see Mobile scope below)
- Data-first: a FieldHockeyKernel™ + taxonomy is the foundation; UI is built on top of that data model

### Seed content (authoritative)
Parse and ingest ALL seed documents located at:
- /seed/curriculum/
  - coaching_workbook.docx
  - field_diagrams_playbook.docx
  - youtube_drill_scripts.docx
  - pocket_practice_cards.docx

Extraction requirements:
- Convert seed docs into kernel entities (Drill/Lesson/Program/Diagram/Storyboard/Script).
- Do NOT treat seed docs as static downloads; they must be structured into the database and become the source for exports.
- CRITICAL: DO NOT INVENT DRILLS. If a drill is not explicitly present in the seed docs, it must not be created. Only derive/transform what exists in the docs.

---

## 1) Product Scope (MVP → V1)
### MVP Must Include
A) Curriculum runner (Practice Mode)
- Choose program (2-day camp, 6-week plan)
- Run a session with timers, drill-by-drill checklist, hydration prompts
- “At-home mode” variations (small space, no goals, household cones)

B) Content exports (generated from kernel)
- Printable coaching workbook (PDF)
- Playbook diagrams (SVG) + PDF export
- Pocket practice cards (printable)
- YouTube-ready drill scripts (teleprompter format + shot list)

C) FieldHockeyKernel™ (foundation layer)
- Strong taxonomy & metadata
- Query/filter/search by: age, skill, space required, surface type, equipment, time, intensity, learning goal, emotion/engagement strategy, coaching style
- Versioned kernel schema (v0.1.0) with migration strategy

### V1 Nice-to-have (ONLY after MVP acceptance tests pass)
- Coach accounts + saved programs + progress tracking
- Payments/subscriptions (Stripe)
- “Virtual training” mode: guided audio prompts + timer + drill check-ins
- Multi-language support

---

## 2) Architectural Decisions (Do not deviate unless blocked)
### Stack
- Web app: Next.js (App Router) + TypeScript + Tailwind
- DB: Postgres (Prisma ORM)
- Auth: NextAuth (or Clerk if needed)
- File generation:
  - PDF: server-side rendering (React PDF OR Playwright print-to-PDF)
  - SVG diagrams: generated from kernel diagram DSL → SVG
- Search:
  - Postgres full-text (optional pgvector later, but MVP can skip)
- Mobile:
  - PWA first (offline-friendly)
  - Capacitor wrappers to ship as iOS/Android apps

### Hosting
- MVP: Vercel for Next.js + Neon/Supabase Postgres
- Background jobs: simple queue (BullMQ/Upstash QStash) for PDF/SVG batch generation

---

## 3) The FieldHockeyKernel™ — The Foundation
### 3.1 Core Principle
Everything the UI shows must come from kernel entities.
No hard-coded drills in the UI. The UI reads kernel data and renders experiences.

### 3.2 Kernel Entities (Minimum Required)
Implement these entities (Prisma models + JSON export format):

1) Surface
- id, name, category (hardwood, polyurethane, sport tiles, turf)
- friction_estimate, ball_behavior_notes
- footwear_guidance
- safety_notes
- materials: [Material]

2) Material
- id, name, type (polyurethane, maple, polypropylene, composite, leather, rubber, foam)
- properties: durability, grip, bounce, abrasion, wet_behavior
- usage_context

3) Equipment
- id, name, category (stick, ball, cones, goals, pinnies)
- size ranges (e.g. stick sizes), safety notes
- required_for_drills

4) Skill
- id, name (grip, stance, dribble, push_pass, trap, shoot, defend)
- prerequisites: [Skill]
- coaching_cues
- common_mistakes

5) Drill
- id, name
- goals: [Skill]
- duration_default
- setup: space_required, player_count_min/max
- equipment: [Equipment]
- steps (structured)
- coaching_points
- common_mistakes
- safety_notes
- at_home_variants (structured)
- surface_compatibility: [Surface]
- intensity (1–5)
- learning_mode tags (demo, repetition, game, challenge)

6) Diagram
- id, drill_id
- diagram_dsl (your own mini language)
- render_svg() output
- printable_layout_metadata (page size, margins)

7) Storyboard
- id, drill_id
- frames[]: {frame_no, scene, camera, overlay_text, coach_voiceover, movement}

8) Lesson (Session Block)
- id, title
- timeline_blocks[] referencing drills + durations
- hydration_breaks
- coaching_notes

9) Program
- id, title (2-day camp, 6-week development)
- schedule (weeks/days)
- sessions[] (Lesson)

10) Emotion & Pedagogy (YES—bake it in)
Add taxonomy fields that capture:
- emotions targeted (confidence, curiosity, calm-focus, resilience, joy, belonging)
- coaching tone (playful, calm, energetic)
- reinforcement strategy (praise-effort, praise-technique, challenge-reward)
- common emotional blockers (frustration, embarrassment, fear_of_mistakes)
- interventions (micro-wins, partner-support, reset-breath, simplify-step)

Implement as:
- EmotionTag model + many-to-many linking to Drill/Lesson/Program
- PedagogyTag model + many-to-many

### 3.3 Taxonomy “Down to the DNA”
Build a controlled vocabulary / ontology in `/kernel/taxonomy/`:
- surfaces.yml
- materials.yml
- skills.yml
- emotions.yml
- pedagogy.yml
- environments.yml (home, driveway, gym, turf, small-space)
- constraints.yml (no-goals, no-cones, no-ball, 2-people-only)

These files are the source of truth, loaded into DB via seed scripts.

### 3.4 Versioning & Governance
Create:
- `/kernel/schema/version.ts` (v0.1.0)
- migration notes
- strict validation with Zod:
  - kernel JSON must validate before import
- fail-closed semantics:
  - if drill lacks required safety notes OR at-home variant → block publishing and block exports

---

## 4) Kernel-First Content Pipeline (Automated)
Implement a pipeline that:
1) Imports seed content (2-day camp) into structured Drill/Lesson/Program rows
2) Expands into:
   - 6-week curriculum (2 sessions/week)
   - at-home equivalents for every drill
   - YouTube scripts for every drill
   - diagrams + storyboards

### Deliverables generated from kernel
A) Workbook PDF
- Cover page
- Table of contents
- Session-by-session print pages
- Coaching cues and checklists

B) Diagram Playbook
- SVG for each drill diagram
- Combined PDF export

C) YouTube Script Pack
For each drill:
- title
- 5–7 second hook
- voiceover script
- shot list (wide, close-up, overhead)
- on-screen text cues
- CTA
Export formats: Markdown + Teleprompter TXT

D) Pocket Cards
- 10–20 cards
- printable 3x5 layout
- includes mini diagram + cues

---

## 5) App Features (Build on Kernel)
### Pages
- Home (choose program mode: 2-day, 6-week, at-home)
- Program Viewer (weeks/sessions)
- Session Runner (“Practice Mode”)
  - step-by-step drills
  - timer
  - hydration prompts
  - quick coaching cues
- Drill Library
  - filter by: space, surface, equipment, skill, time, emotion, intensity
- Exports Center
  - generate workbook PDF
  - generate playbook PDF
  - download scripts pack
  - print pocket cards
- Admin (MVP)
  - manage kernel entities
  - import/export kernel JSON
  - publish/unpublish

### Offline-first (PWA)
- Cache last opened program & session
- Allow running a session without internet

---

## 6) Repository Structure (Create This)
/  
  app/                      # Next.js app router
  components/
  lib/
  prisma/
    schema.prisma
    seed.ts
  kernel/
    schema/
    taxonomy/
    exports/
    validators/
    generators/
      diagrams/             # DSL → SVG
      pdf/                  # workbook + playbook generation
      scripts/              # YouTube + teleprompter outputs
      storyboards/
  capacitor/
  docs/
    ARCHITECTURE.md
    KERNEL_SPEC.md
    TAXONOMY_GUIDE.md
    RUNBOOK.md
  .github/workflows/
  .claude/
    DIRECTIVE.md            # this file
    MEMORY.md

---

## 7) Execution Plan (Claude must follow)
Phase 1 — Kernel Foundation
- Implement Prisma schema for kernel entities
- Implement taxonomy YAML + seed scripts
- Implement kernel JSON import/export
- Implement validation + fail-closed publishing checks

Phase 2 — Generators
- Diagram DSL + SVG renderer
- Storyboard generator (structured frames)
- YouTube script generator
- PDF exports (workbook + playbook + pocket cards)

Phase 3 — App UX
- Build Program viewer + Session Runner
- Drill library with filters
- Exports center + job queue

Phase 4 — Mobile Packaging
- Setup Capacitor
- Ensure safe-area, responsive UI, offline caching

---

## 8) Definition of Done (Hard Acceptance Tests)
- Can run the 2-day camp entirely from the app (timers + drill steps)
- Every drill has:
  - safety notes
  - at-home variant
  - surface compatibility
  - at least one emotion/pedagogy tag
- Exports work:
  - workbook PDF downloads
  - playbook PDF downloads (from SVG diagrams)
  - scripts pack downloads (MD + TXT)
  - pocket cards printable layout
- Mobile readiness:
  - PWA installable
  - Capacitor build steps documented and functional

### 8.1 Testing requirement (minimum)
- Add Playwright smoke tests that:
  1) load home page
  2) open a program
  3) start practice mode
  4) generate at least one export (scripts pack OR workbook)
- Add `pnpm test` and ensure it passes.

---

## 9) Claude Operating Rules
- Write production-quality TypeScript.
- Prefer small, testable modules.
- Document everything in `/docs`.
- Never hard-code curriculum into UI; always pull from kernel.
- If any required kernel data is missing, block publishing and output a clear error.

---

## 10) ONE-SHOT BUILD RULES (CRITICAL)
This is a ONE-SHOT command execution.
Claude must complete the entire build in a single run such that the repo boots, runs, and ships with all core features working.

### 10.1 Zero Placeholders Policy
- No TODOs, no “stub”, no “later”, no fake endpoints.
- No placeholder UI text like “Coming soon”.
- No dead links or disabled buttons unless explicitly labeled as “future” and hidden behind a feature flag OFF by default.
- If a feature is included in the UI, it must fully work end-to-end.

### 10.2 Full Working System Requirement
After build, the following must all function without manual intervention:
- `pnpm install` (or `npm install`) succeeds
- `pnpm dev` runs the full web app
- DB migrations run cleanly
- Seed data loads cleanly
- Export generation works:
  - Workbook PDF export
  - Playbook PDF export (from SVG diagrams)
  - Pocket cards print/export
  - YouTube scripts pack export (MD + TXT)
- Practice Mode works with timers, drill steps, hydration prompts
- Drill Library filters work (skill, surface, equipment, time, intensity, emotion/pedagogy tags)
- Kernel import/export works and validates

### 10.3 Test Data Coverage (Minimum)
Seed at least ONE valid record for EVERY kernel entity type:
- Surface (>= 3)
- Material (>= 6)
- Equipment (>= 8)
- Skill (>= 6)
- Drill (>= 10)  (If seed docs contain fewer, seed EXACTLY the doc count; do not invent)
- Diagram (>= 1 per drill)
- Storyboard (>= 1 per major drill)  (If seed docs contain fewer, generate storyboards ONLY for drills in docs)
- Lesson (>= 4)
- Program (>= 2: 2-day camp + 6-week program)
- EmotionTag (>= 8)
- PedagogyTag (>= 8)

Each seeded drill MUST include:
- safety notes
- at-home variant
- surface compatibility
- equipment list
- emotion + pedagogy tags
- diagram DSL that successfully renders to SVG

### 10.4 Button & Flow Verification (No Broken UX)
Before finalizing, Claude must click-through verify:
- Every primary navigation link
- Every “Generate/Download” export button
- Session Runner start/pause/next drill buttons
- Filters in Drill Library
- Admin publish/unpublish and validation errors
If any route, button, or export fails, FIX IT before proceeding.

### 10.5 Token Discipline (IMPORTANT)
Claude must optimize for minimal token usage:
- Do not generate massive prose inside code comments.
- Use short, structured seed data rather than giant narrative strings.
- Generate exports (PDF/SVG/scripts/storyboards) deterministically from kernel templates.
- Avoid reprinting large files in chat output.
- Prefer “small increments”: implement, test, commit—repeat.

### 10.6 Incremental Build + Frequent Commits (Browser Safety)
Claude’s repo is browser-local and can be lost. Therefore:
- Work in small increments.
- Commit locally after each meaningful milestone.
- Push to GitHub frequently to avoid data loss.

Required commit pattern (Conventional Commits):
- `feat(kernel): ...`
- `feat(exports): ...`
- `feat(app): ...`
- `fix: ...`
- `chore: ...`

Push cadence:
- Push at least every 2–3 commits OR every 30–45 minutes of work, whichever comes first.

### 10.7 Build Verification Checklist (Final Gate)
Claude must not declare completion until ALL are true:
- App runs locally with no console errors
- DB seeded with required coverage
- Exports generated successfully (PDF/SVG/scripts)
- Practice Mode works end-to-end for 1 full session
- All buttons tested and working
- Docs updated:
  - `/docs/RUNBOOK.md` includes exact steps to run, migrate, seed, build, export, wrap with Capacitor

### 10.8 Mobile scope for one-shot build
- Must be “Capacitor-ready”: project builds locally and generates iOS/Android platform folders.
- Must include documented commands in /docs/RUNBOOK.md for:
  - `npx cap add ios` / `npx cap add android`
  - `npx cap sync`
  - opening in Xcode / Android Studio
- App Store submission, certificates, and signing are OUT OF SCOPE.

### 10.9 Local development requirement (one-shot reliability)
Provide a zero-config local DB option:
- Option A (preferred): Docker Compose Postgres included (`docker-compose.yml`) + one command to start
- Option B: SQLite for local dev + Postgres for production (documented switch)
RUNBOOK must allow a brand-new machine to run:
- install deps → migrate → seed → start app

### 10.10 No external API dependency requirement
- All exports must generate offline from kernel data.
- No paid APIs, no OpenAI calls, no external diagram services.
- Use deterministic templates and local rendering only.

### 10.11 Scope guardrail
- MVP features listed are required.
- Nice-to-have features must be implemented ONLY if MVP is complete AND all acceptance tests pass.
- If time/complexity conflicts with one-shot stability, prioritize reliability over extra features.

END ONE-SHOT RULES
END DIRECTIVE

---

## 11) Foundation Data Layer Starter Files (generate & commit on day one)
In this one-shot build, also generate the FieldHockeyKernel™ starter files:
- taxonomy YAMLs in `/kernel/taxonomy/` (surfaces, materials, skills, emotions, pedagogy, environments, constraints)
- Prisma schema in `/prisma/schema.prisma` implementing the kernel entities
- `/prisma/seed.ts` that loads taxonomy + seed docs-derived drills/programs
- diagram DSL spec in `/kernel/generators/diagrams/DSL_SPEC.md`
- validators in `/kernel/validators/` using Zod; fail-closed publishing checks
- import/export JSON format with versioning (v0.1.0) in `/kernel/schema/version.ts`

Commit these as the repo’s foundation data layer before building UI.