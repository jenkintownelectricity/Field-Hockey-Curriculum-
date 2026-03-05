Kernel-first: UI must never hardcode drills. Everything renders from kernel entities.

ONE-SHOT build: no placeholders, no stubs, no TODOs. Everything works end-to-end after build.

Seed data required: at least 1 valid record per entity; at least 10 drills with diagrams and at-home variants.

Token discipline: keep outputs compact; generate deterministically from templates; avoid verbose comments.

Incremental commits + frequent pushes (browser-local repo risk). Build in small slices and push often.

All buttons/flows must be tested (click-through) and exports must generate successfully.

