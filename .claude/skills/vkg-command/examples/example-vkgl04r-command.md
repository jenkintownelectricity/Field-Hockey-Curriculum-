# Example: Canonical VKGL04R Command (High-Rigor)

This is a complete example of a high-rigor VKG command (VKGL04R tier).

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L0 — GOVERNANCE CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authority:      Portable Authority — Lefebvre Design Solutions LLC
Document ID:    L0-CMD-AUDIT-VKGL04R-001
Date:           2026-03-08
Command Format: ValidKernel Command Protocol v0.1
Risk Class:     RC3
Scope:          Audit all VKG command files in the repository for structural compliance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 1 — MISSION DIRECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Objective**
Verify that every VKG command file in the repository follows the canonical
VKG structure. Produce a compliance report listing each file, its tier
(VKGL03R or VKGL04R), and PASS/FAIL status per ring.

**Required Outcomes**
1. Every VKG command file in the repository is identified and listed.
2. Each file is classified as VKGL03R or VKGL04R based on Document ID and structure.
3. Each file is validated against the canonical structure for its tier.
4. A compliance report is produced with per-file, per-ring PASS/FAIL status.
5. Any structural drift is flagged with the specific violation description.

**Constraints**
- The audit reads files only; it does not modify any file.
- Classification uses Document ID format and structural markers only.
- Compliance is binary (PASS/FAIL) per ring, per file.
- No partial credit or "mostly compliant" assessments.

**Non-goals**
- Modifying or hardening any command file during the audit.
- Evaluating the semantic correctness of mission directives.
- Auditing non-VKG files in the repository.
- Creating new VKG commands.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 2 — DETERMINISTIC COMMIT GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] All VKG command files in the repository are enumerated
[ ] Each file is classified as VKGL03R or VKGL04R
[ ] Each file contains an L0 block with Authority field
[ ] Each file contains an L0 block with Document ID field
[ ] Each file contains an L0 block with Date field
[ ] Each file contains an L0 block with Risk Class field
[ ] Each file contains an L0 block with Scope field
[ ] Each file contains a Ring 1 block with Objective subsection
[ ] Each file contains a Ring 1 block with Required Outcomes subsection
[ ] Each file contains a Ring 1 block with Constraints subsection
[ ] Each file contains a Ring 1 block with Non-goals subsection
[ ] Each file contains a Ring 2 block with checklist items in [ ] format
[ ] No Ring 2 block contains prose summaries in place of checklist items
[ ] Each file contains a Ring 3 block with TOUCH-ALLOWED section
[ ] Each file contains a Ring 3 block with NO-TOUCH section
[ ] Each file contains a Ring 3 block with ENFORCEMENT MODE declared
[ ] Each VKGL04R file contains a Ring 4 block
[ ] Each VKGL04R file has a Ring 2 checklist with at least 15 items
[ ] Compliance report is produced with per-file, per-ring PASS/FAIL status
[ ] All structural drift instances are flagged with specific violation descriptions

Gate Rule:
If ANY checklist item fails → HALT. Report failing item, affected file,
and corrective action required. FAIL_CLOSED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 3 — CAPABILITY BOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOUCH-ALLOWED
- Read access to .claude/skills/vkg-command/ directory
- Read access to any file matching VKG command structure in the repository
- Creating a compliance report output (text/markdown)

NO-TOUCH
- Writing or modifying any VKG command file
- Writing or modifying any application source code
- Writing or modifying database schema files
- Writing or modifying kernel data files
- Writing or modifying environment or configuration files
- Executing any repository scripts or commands
- Network access or external API calls

ENFORCEMENT MODE
FAIL_CLOSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RING 4 — INTERPRETATION LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Governance Trace

Authority
Portable Authority — Lefebvre Design Solutions LLC

Mission
Audit all VKG command files for canonical structural compliance.

Validation
Ring 1 — PASS
Ring 2 — PASS
Ring 3 — PASS

Execution
All VKG command files were enumerated, classified by tier, and validated
against the canonical structure. A compliance report was produced with
per-file, per-ring PASS/FAIL status. No files were modified during the audit.

Interpretation
The audit operation remained within the declared read-only scope. All VKG
command files were validated against the canonical structure defined in
VKG-SKILL-003. Structural compliance was assessed deterministically using
binary PASS/FAIL criteria per ring, per file. No NO-TOUCH boundary was
crossed. The audit is complete and the compliance report is auditable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
