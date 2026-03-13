# Example: Canonical VKGL03R Command

This is a complete example of a standard VKG command (VKGL03R tier).

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L0 — GOVERNANCE CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authority:      Portable Authority — Lefebvre Design Solutions LLC
Document ID:    L0-CMD-SKILL-003
Date:           2026-03-08
Command Format: ValidKernel Command Protocol v0.1
Risk Class:     RC2
Scope:          Create and validate a VKG command skill definition file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 1 — MISSION DIRECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Objective**
Produce a SKILL.md file that defines the VKG Command Skill, including
canonical structure, section definitions, hardening rules, anti-drift
rules, and formatting requirements.

**Required Outcomes**
1. SKILL.md file exists at the designated skill path.
2. SKILL.md contains all canonical VKG sections (L0, Ring 1–4 definitions).
3. Supporting reference files exist (terminology, checklist phrases, Ring 4 patterns).
4. Template files exist for VKGL03R and VKGL04R commands.
5. Example files exist for VKGL03R, VKGL04R, and Ring 4 outputs.

**Constraints**
- All outputs use canonical VKG terminology only.
- No structural invention beyond the declared VKG format.
- No speculative language in any output.
- FAIL_CLOSED is the default enforcement mode.

**Non-goals**
- Modifying existing repository application code.
- Creating runtime enforcement tooling.
- Defining new governance frameworks beyond VKG.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 2 — DETERMINISTIC COMMIT GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] File SKILL.md exists at the skill directory root
[ ] SKILL.md contains L0 governance header with all required fields
[ ] SKILL.md contains Ring 1 definition with Objective, Required Outcomes, Constraints, Non-goals
[ ] SKILL.md contains Ring 2 definition with checklist format requirements
[ ] SKILL.md contains Ring 3 definition with TOUCH-ALLOWED, NO-TOUCH, ENFORCEMENT MODE
[ ] SKILL.md contains Ring 4 definition with required fields listed
[ ] SKILL.md contains VKGL03R and VKGL04R tier descriptions
[ ] SKILL.md contains Command Hardening Rules section
[ ] SKILL.md contains Anti-Drift Rules section
[ ] File references/terminology.md exists and defines all canonical terms
[ ] File references/checklist-phrases.md exists with approved Ring 2 patterns
[ ] File references/ring4-patterns.md exists with Ring 4 phrase guidance
[ ] File templates/vkg-command.md exists as a blank VKGL03R template
[ ] File templates/vkgl04r-command.md exists as a blank VKGL04R template

Gate Rule:
If ANY checklist item fails → HALT. Report failing item, affected file,
and corrective action required. FAIL_CLOSED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 3 — CAPABILITY BOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOUCH-ALLOWED
- .claude/skills/vkg-command/ (all files within this directory)
- Markdown files (.md) within the skill directory
- Creating new files within the skill directory

NO-TOUCH
- Application source code (app/, lib/, components/)
- Database schema (prisma/)
- Kernel data files (kernel/)
- Environment files (.env, .env.example)
- Package configuration (package.json, package-lock.json)
- Git configuration (.git/)

ENFORCEMENT MODE
FAIL_CLOSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
