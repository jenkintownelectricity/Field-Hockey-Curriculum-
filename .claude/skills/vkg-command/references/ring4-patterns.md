# Ring 4 Interpretation Patterns and Phrase Guidance

Ring 4 is a formal interpretation layer. It is post-decision and post-execution
only. This file provides canonical patterns and approved phrasing for Ring 4
outputs.

---

## Ring 4 Required Fields

Every Ring 4 block MUST contain these fields:

```
Authority:      [Issuing authority]
Mission:        [One sentence — what was governed]
Validation:
  Ring 1 — [PASS | FAIL]
  Ring 2 — [PASS | FAIL]
  Ring 3 — [PASS | FAIL]
Execution:      [Bounded statement of what completed]
Interpretation: [Human-readable explanation]
```

---

## Approved Interpretation Phrases

### Successful Completion

```
The outcome remained within the declared mission, passed all validation
gates, and did not exceed the declared capability bounds. No NO-TOUCH
boundary was crossed. The governed operation is complete and auditable.
```

```
All Ring 2 checklist items passed. Execution stayed within TOUCH-ALLOWED
boundaries. The governed output conforms to the declared mission scope.
```

```
The commanded operation completed within declared constraints. All three
rings validated successfully. The output is bounded, deterministic, and
traceable to the issuing authority.
```

### Partial Completion (with HALT)

```
Execution halted at Ring 2 validation. Item [N] failed: [description].
The governed operation did not complete. Corrective action is required
before re-execution.
```

```
A NO-TOUCH boundary would have been crossed to complete the mission.
Execution halted per FAIL_CLOSED semantics. The boundary violation has
been reported. No unauthorized action was taken.
```

### Governance Trace Format

```
Governance Trace:
- Authority: [name]
- Command ID: [L0-CMD-...]
- Date: [YYYY-MM-DD]
- Risk Class: [RC1|RC2|RC3]
- Ring 1: PASS — Mission bounded and scoped
- Ring 2: PASS — All [N] checklist items verified
- Ring 3: PASS — Execution within TOUCH-ALLOWED; no NO-TOUCH crossed
- Ring 4: Interpretation generated — post-execution record only
```

---

## Ring 4 Scope Rules

### Ring 4 DOES

- Explain what governed outcome occurred
- State what governance path was followed
- Record what constraints were enforced
- Produce a bounded, human-readable explanation

### Ring 4 DOES NOT

- Authorize actions
- Change execution state
- Expose hidden chain-of-thought or private reasoning
- Add scope not declared in Ring 1
- Grant implicit authority
- Make decisions about future actions
- Speculate about outcomes

---

## Anti-Patterns (DO NOT USE in Ring 4)

```
# Authorization language (FORBIDDEN)
"Ring 4 approves the output..."
"This interpretation grants permission to..."
"Based on Ring 4, the next step should be..."

# Chain-of-thought language (FORBIDDEN)
"My reasoning for this interpretation is..."
"I considered several approaches and..."
"The thinking behind this outcome..."

# Speculative language (FORBIDDEN)
"This might indicate..."
"The outcome could suggest..."
"It is likely that..."
"This probably means..."

# Scope expansion (FORBIDDEN)
"Additionally, it would be beneficial to..."
"A future improvement could include..."
"This also implies that..."
```

---

## When Ring 4 Is Required

Include Ring 4 whenever the command or task involves:

1. Auditability or traceability requirements
2. Governance trace generation
3. Explanation of a governed outcome
4. System-level understanding for operators or reviewers
5. Compliance record generation
6. VKGL04R commands (always required)

Ring 4 may be omitted ONLY when:

- The command is VKGL03R tier
- No auditability requirement exists
- The task is purely mechanical with no interpretation needed
