# VKG Command Template (VKGL03R)

Use this template for standard governance commands (RC1 or RC2).
Replace all bracketed placeholders with actual values.
Delete this instruction block before use.

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L0 — GOVERNANCE CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authority:      [Issuing authority name]
Document ID:    [L0-CMD-<DOMAIN>-<SEQ>]
Date:           [YYYY-MM-DD]
Command Format: ValidKernel Command Protocol v0.1
Risk Class:     [RC1 | RC2]
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

**Constraints**
- [What must be true of all outputs]
- [Additional constraint]

**Non-goals**
- [What is explicitly NOT authorized]
- [Additional non-goal]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 2 — DETERMINISTIC COMMIT GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] [Specific, testable condition — declarative present tense]
[ ] [Specific, testable condition — declarative present tense]
[ ] [Specific, testable condition — declarative present tense]
[ ] [Specific, testable condition — declarative present tense]
[ ] [Specific, testable condition — declarative present tense]

Gate Rule:
If ANY checklist item fails → HALT. Report failing item, affected file,
and corrective action required. FAIL_CLOSED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 3 — CAPABILITY BOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOUCH-ALLOWED
- [Paths, content types, actions, services explicitly permitted]
- [Additional allowed item]

NO-TOUCH
- [Paths, systems, actions explicitly forbidden]
- [Additional forbidden item]

ENFORCEMENT MODE
FAIL_CLOSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Optional: Add Ring 4 below if auditability is required.
See templates/vkgl04r-command.md for the Ring 4 template.
