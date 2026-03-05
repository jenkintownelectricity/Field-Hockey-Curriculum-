# Claude Build Memory

## Principles
- Kernel-first. No hardcoded drills in UI.
- Incremental commits + frequent pushes (browser-local risk).
- One-shot build: no placeholders, everything working.

## Current State (v1.0)
- 12 drills across 8 skill categories
- 12 sessions in a 6-week U10 program
- 1 complete program: U10 Foundations
- 7 pages: Dashboard, Drills, Programs, Sessions, Diagrams, Scripts, Pocket Cards
- SVG diagrams for 9 drills
- YouTube scripts for 4 drills
- PDF generators: session plans, program workbooks, pocket cards
- PWA ready, Capacitor config for iOS/Android
- Kernel validator: 0 errors, 0 warnings

## To Extend
- Add drills: edit seed/curriculum/drills.json
- Add sessions: edit seed/curriculum/sessions.json
- Add programs: edit seed/curriculum/programs.json
- Add diagrams: edit app/src/lib/diagram-generator.tsx drillDiagrams map
- Run validator: node kernel/validators/validate.js
