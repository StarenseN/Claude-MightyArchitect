---
name: architect-review
description: Launches Architect Agent in Mode C for full architectural analysis, coherence verification, and strategic decision-making
---

# Architect Review Command

Launches the Architect Agent in **Mode C** (comprehensive analysis) to:
- Verify core/ file completeness
- Consolidate architectural patterns from recent task logs
- Analyze and document strategic decisions
- Check cross-file coherence
- Update memory-index.md

## When to Use

- After completing major features (3+ task logs)
- When you suspect core/ files are outdated
- Before making architectural decisions
- Periodically (e.g., weekly) to maintain memory health

## What It Does

The Architect Agent executes three phases:

**Phase A (Observe):** Read task logs (7 days), consolidate patterns → systemPatterns.md

**Phase B (Decide - PRIORITY):** Analyze trends, identify decisions → knowledge/decisions.md

**Phase C (Verify):** Check coherence, repair issues → memory-index.md

## Implementation

**Step 1: Verify memory structure exists**

```bash
ls .claude/memory/core/
```

If this fails, the project hasn't initialized MightyArchitect yet. Run a session to trigger SessionStart hook.

**Step 2: Gather context for agent**

Read current memory-index.md to provide as context:

```bash
cat .claude/memory/memory-index.md
```

List recent task logs for duplicate detection:

```bash
ls -lt .claude/memory/tasks/ | head -10
```

**Step 3: Launch Architect Agent (Mode C)**

Use the Task tool with subagent_type "architect":

```
Task tool:
  subagent_type: "architect"
  description: "Full architectural analysis and coherence check"
  model: "sonnet"
  prompt: "
You are in Mode C (manual full analysis via /architect-review).

Execute comprehensive architectural review with three phases:

**Phase A - Observe Patterns:**
- Read all task logs from .claude/memory/tasks/ (last 7 days)
- Consolidate architectural patterns from task implementations
- Update .claude/memory/core/systemPatterns.md (consolidate, don't just append)

**Phase B - Strategic Decisions (PRIORITY):**
- Analyze architectural trends from task logs
- Identify strategic decision points (architecture, technology, trade-offs)
- Document in .claude/memory/knowledge/decisions.md with full rationale
- THIS IS YOUR PRIMARY VALUE - think strategically

**Phase C - Verify Coherence:**
- Check .claude/memory/core/ completeness:
  - If files missing: Create from templates
  - If files empty: Alert user to complete them
- Cross-check coherence:
  - Do task logs mention tech not in techContext.md?
  - Do patterns in code match systemPatterns.md?
  - Is progress.md aligned with completed task logs?
- Update .claude/memory/memory-index.md with health status

Provide detailed report (2000 words) with:
- Files health status
- Patterns detected (with occurrence counts)
- Strategic decisions identified
- Coherence issues found
- Tactical recommendations

Duration: 5-10 minutes. Be thorough.
  "
```

**Step 4: Display agent results**

The agent will return its comprehensive report. Display it to the user.

## Example Output

After running `/architect-review`, you should see:

```markdown
# Architectural Review Report

## Files Health
- core/: 5/6 complete (productContext.md empty)
- tasks/: 12 logs analyzed (average quality: Sufficient)

## Patterns Detected (Phase A)
- **Middleware Pattern** (8 occurrences): Authentication, logging, error handling
- **Service Layer Pattern** (5 occurrences): Business logic separation
- **Repository Pattern** (3 occurrences): Data access abstraction

## Strategic Decisions (Phase B)
### Decision: Adopt Layered Architecture
- **Context:** Growing codebase needed better separation of concerns
- **Decision:** Implement 3-tier architecture (Controllers → Services → Repositories)
- **Rationale:** Improves testability, reduces coupling, standard pattern
- **Consequences:** ✅ Better testing, ❌ More files to manage

## Coherence Issues (Phase C)
- ⚠️ techContext.md doesn't mention Redis (referenced in 3 task logs)
- ⚠️ progress.md not updated since 2025-11-10 (5 features completed)

## Recommendations
1. Complete productContext.md to establish business context
2. Update techContext.md with Redis, JWT library versions
3. Consider documenting error handling strategy (mentioned in 4 logs)
```

## Error Handling

**If memory structure missing:**
```
Error: .claude/memory/core/ not found.
This project hasn't initialized MightyArchitect.

Solution: Start a Claude session to trigger SessionStart hook,
or run: mkdir -p .claude/memory/core/
```

**If agent fails:**
```
Agent execution failed: [error message]

Common causes:
- Files locked (close editors)
- Permissions issue (check file access)
- Malformed markdown in existing files

Try running again, or check error logs.
```

## Related Commands

- `/memory-status` - Quick view of memory health (no agent)
- `/forensic` - Generate evolution.md from git history
- `/bootstrap` - Initialize memory for legacy projects