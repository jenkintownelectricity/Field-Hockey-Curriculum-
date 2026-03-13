# ValidKernel Governance (VKG) Command Skill

Governance
VK-3R-2026-001 + VK-3R-2026-001-H1 + VKG-SKILL-003

Default_behavior
FAIL_CLOSED

Version
1.0.0

Issued_by
Armand Lefebvre, L0 — Lefebvre Design Solutions LLC

---

This skill governs all VKG command generation, hardening, and verification.
Every command produced under this skill MUST follow the canonical VKG structure
exactly. No structural invention, ring collapse, or undocumented extension is
permitted.

## Canonical VKG Command Structure

Every VKG command MUST contain these sections in this order:

```
L0 — GOVERNANCE CONTEXT
Ring 1 — MISSION DIRECTIVE
Ring 2 — DETERMINISTIC COMMIT GATE
Ring 3 — CAPABILITY BOUND
Ring 4 — INTERPRETATION LAYER  (required when task involves explanation,
                                 auditability, governance trace, or governed
                                 outcome explanation — see Ring 4 rules below)
```

Supporting sections (NON-GOAL, EXECUTION NOTES, CONSTRAINTS) may be added
between Ring 3 and Ring 4, or appended after Ring 3 when Ring 4 is omitted.

---

## Section Definitions

### L0 — GOVERNANCE CONTEXT

The L0 block establishes issuing authority, document identity, date, risk
class, and scope.

Required fields:

```
Authority:     [Issuing authority name — e.g., Portable Authority — Lefebvre Design Solutions LLC]
Document ID:   [Command ID — format: L0-CMD-<DOMAIN>-<SERIES>-<SEQ>]
Date:          [YYYY-MM-DD]
Command Format: ValidKernel Command Protocol v0.1
Risk Class:    [RC1 | RC2 | RC3]
Scope:         [One sentence — exactly what this command covers]
```

Risk Classes:

- **RC1** — Low impact. Internal tooling, documentation, non-production.
- **RC2** — Moderate impact. Skill creation, governance documentation, staged work.
- **RC3** — High impact. Production systems, authority changes, enforcement infrastructure.

### Ring 1 — Mission Directive

Ring 1 defines the bounded mission: what will be produced, what constraints
apply, and what is out of scope.

Required subsections:

- **Objective** — Measurable, bounded statement of what will be produced.
- **Required Outcomes** — Enumerated list of deliverables (numbered).
- **Constraints** — What must be true of all outputs.
- **Non-goals** — What is explicitly NOT authorized by this command.

Rules:

- No persuasive or marketing language.
- No expansion beyond stated mission.
- No assumptions about unstated scope.
- If mission is ambiguous: FAIL_CLOSED — ask for clarification.

### Ring 2 — Deterministic Commit Gate

Ring 2 is a hard validation checklist. Every item must be independently
testable with a binary YES/NO answer. NO prose summaries allowed in place of
checklist items.

Required format:

```
[ ] [specific, testable condition]
[ ] [specific, testable condition]
...
```

**Gate Rule**

If any checklist item fails:

**HALT.**

Report the failing item, affected file, and corrective action required.

Completion may only be declared when all items pass.

Checklist rules:

- Every item must be independently verifiable.
- No item may be a restatement of another item.
- No item may contain vague language ("looks good", "seems complete").
- Items must use declarative present tense: "X exists", "Y is present", "Z passes".
- FAIL_CLOSED is the only valid response to a failing item.

### Ring 3 — Capability Bound

Ring 3 defines exactly what is and is not allowed in execution.

Required blocks (both MUST be present):

**TOUCH-ALLOWED**

```
[paths, content types, actions, services explicitly permitted]
```

**NO-TOUCH**

```
[paths, systems, actions explicitly forbidden]
```

**ENFORCEMENT MODE**

```
FAIL_CLOSED
```

Rules:

- Anything NOT listed in TOUCH-ALLOWED is NO-TOUCH by default.
- TOUCH-ALLOWED is a positive allowlist — not a suggestion.
- ENFORCEMENT MODE must be declared. FAIL_CLOSED is the default.
- If a task requires crossing the NO-TOUCH boundary: HALT. Report. Do not proceed.

### Ring 4 — Interpretation Layer

Ring 4 is a formal interpretation layer. It is post-decision and post-execution only.

**Ring 4 does NOT:**

- Authorize actions
- Change execution state
- Expose hidden chain-of-thought or private reasoning
- Add scope not declared in Ring 1
- Grant implicit authority

**Ring 4 DOES:**

- Explain what governed outcome occurred
- State what governance path was followed
- Record what constraints were enforced
- Produce a bounded, human-readable explanation for the user or operator

**When Ring 4 is required:** Include Ring 4 whenever the command or task involves:

- Auditability or traceability requirements
- Governance trace generation
- Explanation of a governed outcome
- System-level understanding for operators or reviewers
- Compliance record generation

Ring 4 may be surfaced as:

- Interpretation Layer
- Interpretation Record
- Governance Trace

Required Ring 4 fields:

```
Authority:    [Issuing authority]
Mission:      [One sentence — what was governed]
Validation:
  Ring 1 — [PASS | FAIL]
  Ring 2 — [PASS | FAIL]
  Ring 3 — [PASS | FAIL]
Execution:    [Bounded statement of what completed]
Interpretation: [Human-readable explanation — what occurred, what was
                 enforced, what the outcome means in governance terms]
```

---

## VKGL03R vs VKGL04R — Command Tiers

### VKGL03R — Standard Governance Command

Use for: routine governance operations, documentation, skill creation, staged
tooling, non-production changes.

Characteristics:

- Full L0 / Ring 1 / Ring 2 / Ring 3 structure
- Ring 4 optional (include when auditability is required)
- Risk Class RC1 or RC2

### VKGL04R — High-Rigor Governance Command

Use for: audit operations, enforcement verification, governance-critical
repository changes, system-wide governance operations, authority table
modifications, production enforcement infrastructure.

Characteristics:

- Full L0 / Ring 1 / Ring 2 / Ring 3 / Ring 4 structure (Ring 4 REQUIRED)
- Risk Class RC3 unless explicitly justified otherwise
- Ring 2 checklist must be more granular (minimum 15 independently testable items)
- Ring 3 TOUCH-ALLOWED must be narrowly scoped (no broad wildcards)
- Document ID format: L0-CMD-<DOMAIN>-VKGL04R-<SEQ>
- Governance Trace in Ring 4 REQUIRED

---

## Command Hardening Rules

When asked to harden a VKG command, apply ALL of the following:

1. **Eliminate ambiguity** — Replace vague language with exact, auditable phrasing.
2. **Eliminate loopholes** — Identify and close implicit permissions not in Ring 3.
3. **Tighten Ring 2 items** — Ensure every checklist item is independently testable.
4. **Preserve FAIL_CLOSED semantics** — No softening of gate rules.
5. **Preserve canonical terminology** — Do not rename rings, layers, or standard fields.
6. **Preserve exact wording when required** — If a section says to preserve wording, copy exactly.
7. **Distinguish decision from interpretation** — Ring 4 explains. It does not decide.
8. **Remove speculative language** — No "might", "could", "probably", "should consider".

---

## Anti-Drift Rules

Claude MUST NOT, under any circumstances:

- Invent new rings (Ring 5, Ring 0, etc. are not VKG constructs)
- Collapse Ring 2 into prose — Checklists are required; prose summaries are forbidden
- Weaken Ring 3 boundaries — Broad wildcards or implicit permissions are violations
- Omit Ring 4 when the task requires interpretation — Auditability tasks require Ring 4
- Confuse Ring 4 with execution control — Ring 4 never authorizes or executes
- Confuse Ring 4 with chain-of-thought — Ring 4 is a bounded governance record, not private reasoning
- Change canonical runtime flow wording when preservation is required
- Replace deterministic checklist items with summary language
- Add undocumented SKILL.md format extensions — Only the standard skill format is valid

If drift is detected in an existing command: flag it explicitly before hardening.

---

## Formatting Rules

Command format:

- Section headers use `━━━` separator lines above and below
- Section names are ALL CAPS
- Checklist items use `[ ]` brackets
- Subsections under Ring 1 use bold labels: **Objective**, **Constraints**
- Ring 3 blocks use plain uppercase labels: TOUCH-ALLOWED, NO-TOUCH, ENFORCEMENT MODE
- Ring 4 blocks use plain uppercase labels: Authority, Mission, Validation, Execution, Interpretation

Document ID format: `L0-CMD-<DOMAIN>-<TYPE>-<SEQ>`

Examples:

- `L0-CMD-VKG-003`
- `L0-CMD-SKILL-VKGL04R-001`
- `L0-CMD-BUILD-002`

---

## Supporting Files

This skill includes the following supporting files. Read them when needed:

- `references/terminology.md` — Canonical VKG term definitions
- `references/checklist-phrases.md` — Approved Ring 2 checklist phrasing patterns
- `references/ring4-patterns.md` — Ring 4 interpretation examples and phrase guidance
- `templates/vkg-command.md` — Blank VKG command template
- `templates/vkgl04r-command.md` — Blank VKGL04R command template
- `examples/example-vkg-command.md` — Canonical VKGL03R example
- `examples/example-vkgl04r-command.md` — Canonical VKGL04R example
- `examples/example-ring4.md` — Canonical Ring 4 interpretation examples

---

## FAIL_CLOSED Triggers

HALT immediately and report if any of the following occur:

- Request lacks a clear, bounded mission scope
- Task would require crossing a NO-TOUCH boundary
- Any Ring 2 checklist item fails
- Ring 4 is required but would expose private reasoning rather than governed outcome
- Speculative content would be required to complete the task
- Canonical terminology would need to be renamed or restructured

HALT format:

```
FAIL_CLOSED
Trigger: [which condition above]
Reason:  [specific description]
Required: [what must be clarified or granted before proceeding]
```
