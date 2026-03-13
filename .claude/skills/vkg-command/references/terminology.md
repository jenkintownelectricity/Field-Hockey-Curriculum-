# VKG Canonical Terminology

This file defines the canonical terms used in ValidKernel Governance (VKG) commands.
These terms MUST NOT be renamed, aliased, or replaced in any VKG command output.

---

## Structural Terms

| Term | Definition |
|------|-----------|
| **L0** | The governance context block. Establishes authority, document ID, date, risk class, and scope. Always the first section of a VKG command. |
| **Ring 1** | Mission Directive. Defines the bounded mission, required outcomes, constraints, and non-goals. |
| **Ring 2** | Deterministic Commit Gate. A hard validation checklist of independently testable items. Binary YES/NO only. |
| **Ring 3** | Capability Bound. Defines TOUCH-ALLOWED and NO-TOUCH boundaries with ENFORCEMENT MODE. |
| **Ring 4** | Interpretation Layer. Post-decision, post-execution. Explains governed outcomes. Never authorizes or executes. |

## Governance Terms

| Term | Definition |
|------|-----------|
| **FAIL_CLOSED** | Default enforcement behavior. If a condition is not met, execution halts. No fallback, no soft failure. |
| **HALT** | Immediate stop of execution. Triggered by a failing Ring 2 item or a NO-TOUCH boundary crossing. |
| **TOUCH-ALLOWED** | Positive allowlist in Ring 3. Only items listed here are permitted. Everything else is NO-TOUCH by default. |
| **NO-TOUCH** | Explicit deny list in Ring 3. Items listed here are forbidden even if they appear related to TOUCH-ALLOWED. |
| **ENFORCEMENT MODE** | Declaration in Ring 3 of how boundary violations are handled. FAIL_CLOSED is the only standard value. |

## Risk Classes

| Term | Definition |
|------|-----------|
| **RC1** | Low impact. Internal tooling, documentation, non-production changes. |
| **RC2** | Moderate impact. Skill creation, governance documentation, staged work. |
| **RC3** | High impact. Production systems, authority changes, enforcement infrastructure. |

## Command Tiers

| Term | Definition |
|------|-----------|
| **VKGL03R** | Standard Governance Command. Full L0/Ring 1/Ring 2/Ring 3. Ring 4 optional. RC1 or RC2. |
| **VKGL04R** | High-Rigor Governance Command. Full L0/Ring 1/Ring 2/Ring 3/Ring 4 (required). RC3 default. Minimum 15 Ring 2 items. Narrow Ring 3 scope. |

## Ring 4 Terms

| Term | Definition |
|------|-----------|
| **Governance Trace** | A Ring 4 record of what governance path was followed and what outcome occurred. |
| **Interpretation Record** | Alternate name for a Ring 4 output block. |
| **Interpretation Layer** | The canonical name for Ring 4 itself. |

## Document ID Format

| Component | Description |
|-----------|-------------|
| **L0-CMD** | Prefix indicating an L0-issued command. |
| **DOMAIN** | The governance domain (e.g., VKG, SKILL, BUILD, AUDIT). |
| **TYPE** | Optional tier marker (e.g., VKGL04R for high-rigor commands). |
| **SEQ** | Sequential number within the domain (e.g., 001, 002). |

Full format: `L0-CMD-<DOMAIN>-<TYPE>-<SEQ>` or `L0-CMD-<DOMAIN>-<SEQ>`

## Prohibited Terms

The following terms are NOT part of VKG and MUST NOT be used:

- Ring 0, Ring 5, Ring 6 (no such constructs exist)
- "Soft fail", "best effort", "try to" (violates FAIL_CLOSED semantics)
- "Chain-of-thought" as a Ring 4 synonym (Ring 4 is not private reasoning)
- "Authorization layer" as a Ring 4 synonym (Ring 4 does not authorize)
