# Approved Ring 2 Checklist Phrasing Patterns

Every Ring 2 checklist item MUST be independently testable with a binary YES/NO
answer. This file provides approved phrasing patterns. Use these as templates
when constructing Ring 2 items.

---

## File Existence Patterns

```
[ ] File <path> exists in the repository
[ ] Directory <path> exists and is non-empty
[ ] File <path> contains non-zero content
```

## Content Presence Patterns

```
[ ] File <path> contains the string "<exact string>"
[ ] Section "<section name>" is present in <path>
[ ] Field "<field name>" is declared in <path>
[ ] All required fields are present in L0 block of <path>
```

## Structural Patterns

```
[ ] <path> follows the canonical VKG command structure (L0, Ring 1, Ring 2, Ring 3)
[ ] Ring 2 in <path> contains only checklist items (no prose summaries)
[ ] Ring 3 in <path> contains both TOUCH-ALLOWED and NO-TOUCH blocks
[ ] ENFORCEMENT MODE is declared as FAIL_CLOSED in <path>
```

## Validation Patterns

```
[ ] All Ring 2 checklist items in <path> are independently testable
[ ] No Ring 2 item in <path> contains vague language ("looks good", "seems complete")
[ ] All Ring 2 items use declarative present tense
[ ] No Ring 2 item is a restatement of another item in the same checklist
```

## Boundary Patterns

```
[ ] TOUCH-ALLOWED in <path> lists only explicitly permitted paths and actions
[ ] NO-TOUCH in <path> lists explicitly forbidden paths and actions
[ ] No broad wildcards appear in TOUCH-ALLOWED of <path>
```

## Count Patterns

```
[ ] Ring 2 in <path> contains at least <N> independently testable items
[ ] <path> contains exactly <N> required outcome items in Ring 1
```

## Governance Patterns

```
[ ] Risk Class is declared as <RC1|RC2|RC3> in L0 block of <path>
[ ] Document ID follows format L0-CMD-<DOMAIN>-<SEQ> in <path>
[ ] Scope is a single sentence in L0 block of <path>
```

## Ring 4 Patterns

```
[ ] Ring 4 is present in <path>
[ ] Ring 4 contains Authority, Mission, Validation, Execution, and Interpretation fields
[ ] Ring 4 does not contain authorization language or execution directives
[ ] Governance Trace is present in Ring 4 of <path>
```

## Negative Patterns (Absence Checks)

```
[ ] No speculative language ("might", "could", "probably") appears in <path>
[ ] No undocumented rings (Ring 0, Ring 5) appear in <path>
[ ] No placeholder text ("TODO", "TBD", "stub") appears in <path>
[ ] No marketing or persuasive language appears in Ring 1 of <path>
```

---

## Anti-Patterns (DO NOT USE)

The following are NOT valid Ring 2 items:

```
[ ] The command looks good                    # Vague — not testable
[ ] Everything seems complete                 # Vague — not testable
[ ] The structure is mostly correct            # "Mostly" is not binary
[ ] Ring 2 has been reviewed                   # Process, not condition
[ ] Output should be acceptable                # "Should" is speculative
[ ] The document appears well-formed           # "Appears" is not deterministic
```
