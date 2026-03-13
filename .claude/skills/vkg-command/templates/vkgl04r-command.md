# VKG Command Template (VKGL04R — High-Rigor)

Use this template for high-rigor governance commands (RC3 default).
Ring 4 is REQUIRED. Minimum 15 Ring 2 items. Narrow Ring 3 scope.
Replace all bracketed placeholders with actual values.
Delete this instruction block before use.

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L0 — GOVERNANCE CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authority:      [Issuing authority name]
Document ID:    [L0-CMD-<DOMAIN>-VKGL04R-<SEQ>]
Date:           [YYYY-MM-DD]
Command Format: ValidKernel Command Protocol v0.1
Risk Class:     RC3
Scope:          [One sentence — exactly what this command covers]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 1 — MISSION DIRECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Objective**
[Measurable, bounded statement of what will be produced]

**Required Outcomes**
1. [First deliverable]
2. [Second deliverable]
3. [Third deliverable]
4. [Fourth deliverable]

**Constraints**
- [What must be true of all outputs]
- [Additional constraint]
- [Additional constraint]

**Non-goals**
- [What is explicitly NOT authorized]
- [Additional non-goal]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 2 — DETERMINISTIC COMMIT GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Minimum 15 independently testable items required for VKGL04R.

[ ] [Specific, testable condition 1]
[ ] [Specific, testable condition 2]
[ ] [Specific, testable condition 3]
[ ] [Specific, testable condition 4]
[ ] [Specific, testable condition 5]
[ ] [Specific, testable condition 6]
[ ] [Specific, testable condition 7]
[ ] [Specific, testable condition 8]
[ ] [Specific, testable condition 9]
[ ] [Specific, testable condition 10]
[ ] [Specific, testable condition 11]
[ ] [Specific, testable condition 12]
[ ] [Specific, testable condition 13]
[ ] [Specific, testable condition 14]
[ ] [Specific, testable condition 15]

Gate Rule:
If ANY checklist item fails → HALT. Report failing item, affected file,
and corrective action required. FAIL_CLOSED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 3 — CAPABILITY BOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOUCH-ALLOWED (narrowly scoped — no broad wildcards)
- [Specific path or action 1]
- [Specific path or action 2]
- [Specific path or action 3]

NO-TOUCH
- [Specific forbidden path or action 1]
- [Specific forbidden path or action 2]
- [Specific forbidden path or action 3]

ENFORCEMENT MODE
FAIL_CLOSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 4 — INTERPRETATION LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Governance Trace

Authority
[Issuing authority name]

Mission
[One sentence — what was governed]

Validation
Ring 1 — [PASS | FAIL]
Ring 2 — [PASS | FAIL]
Ring 3 — [PASS | FAIL]

Execution
[Bounded statement of what completed]

Interpretation
[Human-readable explanation — what occurred, what was enforced,
what the outcome means in governance terms. No authorization language.
No chain-of-thought. No speculation.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
