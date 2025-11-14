# Architectural Patterns

This file documents architectural patterns observed in this project.

## How Patterns Are Detected

Patterns are automatically detected and documented by:
- **Architect Agent Mode A:** After architectural commits (feat/refactor/perf)
- **Architect Agent Mode C:** Via `/architect-review` command (consolidation)

You can also manually document patterns here.

## Pattern Template

```markdown
## Pattern: [Pattern Name]

**First Observed:** YYYY-MM-DD (Commit: abc123)

**Description:**
[Brief description of the pattern and when it's used]

**Location:**
- Files: `src/path/to/files/*.js`
- Directories: `src/components/auth/`

**Why Used:**
- Reason 1: [Benefit]
- Reason 2: [Benefit]

**Trade-offs:**
- ✅ Advantages: [List]
- ❌ Disadvantages: [List]

**Examples:**
```code
// Example usage
```
```

---

## Detected Patterns

<!-- Patterns will be documented below as they're discovered by Architect Agent -->
