# MightyArchitect v2.0: Windsurf Structure Integration - Design Document

**Date:** 2025-11-14
**Status:** Design Complete - Ready for Implementation
**Design Session:** Brainstorming with superpowers:brainstorming skill

---

## Executive Summary

MightyArchitect v2.0 refactors the memory structure to align with Windsurf's proven Meta-Cognitive Workflow Architecture while preserving MightyArchitect innovations (Agent SDK, Task Manager, pure Node.js). This creates a hybrid system combining Windsurf's comprehensive memory organization with MightyArchitect's automation and cross-platform capabilities.

**Key Changes:**
- Adopt Windsurf's 6-file `core/` structure (projectbrief, productContext, systemPatterns, techContext, activeContext, progress)
- Separate Task Manager (scores tasks) from Architect Agent (ensures coherence)
- Architect becomes Agent SDK with two modes: A (auto observation) and C (manual full analysis)
- Maintain token efficiency: 800-1000 tokens at SessionStart (vs Windsurf's 3000+)

---

## 1. Architecture Overview

### Three-Actor System

**1. Task Manager Agent** (existing - `agents/task-manager.md`)
- Manual invocation via `/analyze-todos`
- Semantic analysis of completed todos
- Creates `tasks/YYYYMMDD-HHMMSS-theme.md` with 23-point scoring
- **Domain:** Micro-level quality (individual tasks, "what was done")
- **Writes:** tasks/, core/activeContext.md, core/progress.md
- **Never touches:** systemPatterns.md, decisions.md, evolution.md

**2. Architect Agent** (new - `agents/architect.md`)
- **Mode A (Auto):** Git hook after architectural commits (feat/refactor/perf + 3+ files)
  - Quick observation (60s, ~5000 tokens)
  - Detects patterns, alerts on issues
  - Appends to core/systemPatterns.md
- **Mode C (Manual):** `/architect-review` command
  - Full analysis (5-10min, ~15000 tokens)
  - Phase A: Observe patterns
  - Phase B: Strategic decisions (PRIORITY)
  - Phase C: Verify coherence, repair issues
- **Domain:** Macro-level coherence (architecture, "how system evolved")
- **Writes:** core/systemPatterns.md, knowledge/decisions.md, memory-index.md

**3. LLM/Claude** (daily work)
- Reads selective core/ at SessionStart (activeContext + systemPatterns + memory-index)
- Writes code, creates plans, logs errors
- Delegates scoring to Task Manager, coherence to Architect
- **Domain:** Feature implementation

### Separation of Concerns

- **Task Manager = Micro:** Quality of individual tasks (scoring 23-points)
- **Architect = Macro:** Patterns, strategic decisions, cross-file coherence
- **LLM = Execution:** Daily coding, coordination

---

## 2. File Structure

### Target Structure

```
.claude/memory/
├── core/                           [Windsurf standard - SessionStart loads selectively]
│   ├── projectbrief.md            [NEW - Project overview]
│   ├── productContext.md          [NEW - User needs, business context]
│   ├── systemPatterns.md          [NEW - Architectural patterns (renamed from knowledge/patterns.md)]
│   ├── techContext.md             [NEW - Tech stack, dependencies]
│   ├── activeContext.md           [EXISTS - Current focus, managed by LLM]
│   └── progress.md                [NEW - Roadmap, feature progress]
│
├── knowledge/                      [MightyArchitect extension - On-demand]
│   ├── decisions.md               [EXISTS - Strategic decisions + rationale]
│   └── evolution.md               [EXISTS - Git history timeline via /forensic]
│
├── tasks/                          [Task Manager - On-demand]
│   └── YYYYMMDD-HHMMSS-theme.md  [Auto-created via /analyze-todos]
│
├── plans/                          [NEW - Implementation plans]
│   └── YYYYMMDD-feature-plan.md  [Created manually or via Superpowers]
│
├── errors/                         [NEW - Error logs]
│   └── error_YYYYMMDD_type.md    [Optional for debugging]
│
├── memory-index.md                 [NEW - Health status, managed by Architect]
└── architect.md                    [EXISTS - Architect Agent instructions, refactored]
```

### File Ownership

| File | Created By | Updated By | Loaded at SessionStart | Owner |
|------|------------|------------|------------------------|-------|
| core/projectbrief.md | User | Architect (Mode C) | No (on-demand) | User/Architect |
| core/productContext.md | User | Architect (Mode C) | No | User/Architect |
| core/systemPatterns.md | SessionStart | Architect (Mode A/C) | **Yes** | Architect |
| core/techContext.md | User | Architect (Mode C) | No | User/Architect |
| core/activeContext.md | SessionStart | LLM + Task Manager | **Yes** | LLM |
| core/progress.md | SessionStart | Task Manager + LLM | No | LLM/Task Manager |
| knowledge/decisions.md | SessionStart | Architect (Mode C) | No | Architect |
| knowledge/evolution.md | /forensic | /forensic | No | Architect |
| tasks/*.md | Task Manager | Never (immutable) | No | Task Manager |
| plans/*.md | LLM | LLM | No | LLM |
| errors/*.md | LLM | LLM | No | LLM |
| memory-index.md | Architect | Architect (Mode C) | **Yes** | Architect |
| architect.md | Installation | Manual | No (agent reads) | Architect Agent |

### SessionStart Loading Strategy

**Loaded (800-1000 tokens):**
- `core/activeContext.md` (~200 tokens - current focus)
- `core/systemPatterns.md` (~400 tokens - architecture)
- `memory-index.md` (~200 tokens - health status)

**Available on-demand:** All other files accessible via Read tool

---

## 3. Agent Behaviors

### Task Manager Agent (Existing)

**Invocation:** Manual via `/analyze-todos`

**Workflow:**
1. User completes todos (TodoWrite marks `status: completed`)
2. User invokes `/analyze-todos`
3. Command reads activeContext.md + recent task logs
4. Launches Task Manager Agent via Task tool
5. Agent analyzes semantically: domain, theme, coherence, completeness
6. If theme complete → Creates `tasks/YYYYMMDD-HHMMSS-theme.md`
7. Scores with 23-point system (brutal honesty)
8. Updates core/activeContext.md and core/progress.md

**Inputs:** Completed todos, activeContext.md, recent task logs

**Outputs:** tasks/*.md (with score), updated activeContext.md, updated progress.md

**Domain:** Micro-level task quality

---

### Architect Agent (New)

#### Mode A: Automatic Observation (Quick)

**Trigger:** Hook `git-commit.js` after architectural commit
- Commit types: `feat:`, `refactor:`, `perf:`
- Files changed: ≥3

**Workflow:**
1. Hook detects architectural commit
2. Launches Architect Agent with Mode A prompt
3. Agent reads: git diff, corresponding task log (if exists)
4. Detects architectural pattern
5. Quick health check: core/ files exist? empty?
6. Appends pattern to core/systemPatterns.md
7. Outputs warnings if issues detected (doesn't repair)

**Duration:** ~60s, ~5000 tokens

**Output:**
```
✓ Pattern: JWT Middleware
⚠️ Warning: productContext.md empty - run /architect-review
```

#### Mode C: Full Analysis (Comprehensive)

**Trigger:** Manual via `/architect-review`

**Workflow:**
1. User invokes `/architect-review`
2. Command launches Architect Agent with Mode C prompt
3. Agent executes three phases:

**Phase A (Observe Patterns):**
- Read all task logs (last 7 days)
- Consolidate patterns from tasks + code
- Update core/systemPatterns.md

**Phase B (Strategic Decisions - PRIORITY):**
- Analyze architectural trends
- Identify decision points
- Document in knowledge/decisions.md with rationale

**Phase C (Verify Coherence):**
- Check core/ completeness (create templates if missing)
- Cross-check alignment: tasks ↔ patterns ↔ decisions ↔ code
- Detect drifts (e.g., code mentions Redis but absent from techContext.md)
- Update memory-index.md

4. Generates detailed report (2000 words)

**Duration:** ~5-10min, ~15000 tokens

**Output:**
```markdown
# Architectural Review Report

## Files Health
- core/: 5/6 complete (productContext.md empty)
- tasks/: 12 logs, avg score 19.2/23

## Patterns Detected (Phase A)
- Middleware Pattern (8 occurrences)
- Service Layer (5 occurrences)

## Strategic Decisions (Phase B - PRIORITY)
- Decision: Adopt layered architecture
  Rationale: [...]
  Impact: [...]

## Coherence Issues (Phase C)
- Warning: tasks/ mention Redis, absent from techContext.md
- Warning: progress.md not updated (3 features completed)

## Recommendations
- Complete core/productContext.md
- Update techContext.md with Redis
- Consider: [strategic recommendation]
```

---

### Mode A vs Mode C Comparison

| Aspect | Mode A (Auto) | Mode C (Manual) |
|--------|--------------|-----------------|
| **Trigger** | Hook git-commit (auto) | `/architect-review` (user) |
| **Scope** | Current commit only | All task logs (7 days) |
| **core/ verification** | Quick check (alert) | Complete (repair) |
| **Patterns** | Append new pattern | Consolidate all patterns |
| **Decisions** | ❌ Doesn't touch | ✅ Analyzes + documents |
| **Coherence** | Quick check (warn) | Deep analysis (repair) |
| **memory-index.md** | ❌ Doesn't update | ✅ Updates |
| **Duration** | ~60s | ~5-10min |
| **Tokens** | ~5000 | ~15000 |
| **Output** | Console message | 2000-word report |

---

## 4. Technical Implementation

### Hook: session-start.js (Refactored)

**Current:**
```javascript
SessionStart → Load:
  - activeContext.md
  - architect.md
```

**New:**
```javascript
SessionStart → Detect structure version:

if (exists('.claude/memory/core/')) {
  // v2.0 structure
  loadV2Structure();
} else if (exists('.claude/memory/activeContext.md')) {
  // v1.x structure → auto-migrate
  console.log('🔄 Migrating to v2.0...');
  migrateToV2();
  loadV2Structure();
} else {
  // New project → init v2.0
  initializeV2Structure();
}

function loadV2Structure() {
  console.log(read('core/activeContext.md'));
  console.log(read('core/systemPatterns.md'));
  console.log(read('memory-index.md'));
}

function migrateToV2() {
  // 1. Create core/
  mkdir('core/');

  // 2. Move activeContext.md → core/
  rename('activeContext.md', 'core/activeContext.md');

  // 3. Rename knowledge/patterns.md → core/systemPatterns.md
  rename('knowledge/patterns.md', 'core/systemPatterns.md');

  // 4. Create missing files from templates
  copyTemplate('projectbrief.md');
  copyTemplate('productContext.md');
  copyTemplate('techContext.md');
  copyTemplate('progress.md');

  // 5. Create directories
  mkdir('plans/', 'errors/');

  // 6. Create memory-index.md
  createInitialMemoryIndex();

  console.log('✅ Migration complete');
}
```

---

### Hook: git-commit.js (Refactored for Agent)

**Current:**
```javascript
// Inline analysis (JavaScript code)
if (isArchitecturalCommit) {
  const pattern = extractPattern(files);
  updateKnowledgeBase(pattern);
}
```

**New:**
```javascript
// Launch Architect Agent Mode A
if (commitMsg.match(/^(feat|refactor|perf):/) && filesChanged >= 3) {
  console.log('🏗️  Launching Architect Agent (Mode A)...');

  const agentPrompt = `
You are in Mode A (automatic observation after commit).

Commit: ${commitHash} - ${commitMsg}
Files changed: ${filesChanged}

Task:
1. Read git diff for this commit
2. Read corresponding task log in tasks/ (if exists)
3. Detect architectural pattern
4. Quick check core/ health (files exist? empty?)
5. Append pattern to core/systemPatterns.md
6. If issues detected, output WARNING

Duration: 60s max, be concise.
  `.trim();

  launchArchitectAgent('mode-a', agentPrompt, {
    commitHash,
    commitMsg,
    filesChanged
  });
}

function launchArchitectAgent(mode, prompt, context) {
  // Similar to Task Manager invocation in /analyze-todos
  // Use Task tool with subagent_type: "architect"
  // Pass prompt + context
  // Capture and display output
}
```

---

### Command: /architect-review (New)

**File:** `commands/architect-review.md`

**Structure:**
```markdown
---
name: architect-review
description: Launches Architect Agent in Mode C for full architectural analysis
---

# Architect Review Command

## Implementation

**Step 1:** Check memory structure
```bash
ls .claude/memory/core/
```

**Step 2:** Gather context
- Read memory-index.md (current health)
- List recent task logs: `ls tasks/ | tail -10`

**Step 3:** Launch Architect Agent (Mode C)

Use Task tool:
```
Task tool:
  subagent_type: "architect"
  description: "Full architectural analysis"
  prompt: "
You are in Mode C (manual full analysis).

Execute phases:
- Phase A: Observe patterns (read task logs 7 days)
- Phase B: Strategic decisions (PRIORITY)
- Phase C: Verify coherence + repair

Provide detailed report (2000 words).
  "
```

**Step 4:** Display agent output to user
```

---

### Agent: architect.md (New File)

**File:** `agents/architect.md`

**Structure:**
```markdown
---
name: architect
description: Safe Guardian ensuring architectural coherence across MightyArchitect memory system
model: sonnet
---

You are the Architect Agent for MightyArchitect.

## Role: Safe Guardian

Maintain coherence across:
- core/ (6 files)
- knowledge/ (decisions, evolution)
- tasks/ (Task Manager logs)

## Two Modes

### Mode A: Quick Observation (60s)
- Detect pattern from git diff
- Append to core/systemPatterns.md
- Alert if issues (don't repair)

### Mode C: Full Analysis (5-10min)
- Phase A: Observe patterns
- Phase B: Strategic decisions (PRIORITY)
- Phase C: Verify coherence + repair

## Phase B Priority: Strategic Decisions

PRIMARY role: Identify and document strategic architectural decisions.

Document in knowledge/decisions.md:
- Context (why this matters)
- Decision (what was chosen)
- Rationale (why this choice)
- Consequences (trade-offs)

## Responsibilities

DO:
- Maintain core/systemPatterns.md
- Maintain knowledge/decisions.md
- Maintain memory-index.md
- Verify core/ completeness (Mode C)
- Create templates for missing files
- Detect coherence issues

DO NOT:
- Score tasks (Task Manager's job)
- Touch tasks/*.md (immutable)
- Touch core/activeContext.md (LLM's domain)

## Output Formats

### Mode A:
```
✓ Pattern: [name]
⚠️ Warning: [issue]
```

### Mode C:
```markdown
# Architectural Review Report
[2000-word detailed analysis]
```

## memory-index.md Format

```markdown
# Memory Index

Last verification: YYYY-MM-DD HH:MM (Mode C)

## Core Files Status
- projectbrief.md: ✅ Complete / ⚠️ Empty / ❌ Missing
- productContext.md: [status]
- ...

## Knowledge Files Status
- decisions.md: [status]
- evolution.md: [status]

## Task Logs Summary
- Total: X files
- Average score: Y/23
- Last 7 days: Z tasks

## Overall Health
[Brief coherence summary]
```
```

---

### Refactored architect.md (Instructions)

**Changes:**
- **REMOVE:** 23-point scoring system (belongs to Task Manager)
- **ADD:** Reference to Task Manager for scoring
- **UPDATE:** Focus on Safe Guardian role
- **CLARIFY:** Phase A/B/C responsibilities
- **DOCUMENT:** Windsurf integration philosophy

---

### Task Manager Integration

**Modifications to `agents/task-manager.md`:**
- Update file paths: `core/activeContext.md` (not root activeContext.md)
- Add: Update `core/progress.md` with feature progress

**Modifications to `commands/analyze-todos.md`:**
- Read from `.claude/memory/core/activeContext.md`
- Provide correct path to agent

---

## 5. Migration Plan

### Phase 1: Preparation (No Breaking Changes)

**Objective:** Create new structure without breaking existing

**Tasks:**
1. Create templates in `~/.claude/plugins/mighty-architect/templates/`:
   - projectbrief.md, productContext.md, systemPatterns.md
   - techContext.md, progress.md, memory-index.md

2. Create `agents/architect.md`
   - Inspired by agents/task-manager.md
   - Document Mode A/C behaviors

3. Create `commands/architect-review.md`
   - Similar to analyze-todos.md
   - Launches Architect Agent Mode C

4. Create tests:
   - `test/test-architect-agent.js`
   - `test/test-architect-review-command.js`

**Validation:**
- New files created
- Tests pass
- Existing structure intact

---

### Phase 2: Migration Structure (Breaking Change)

**Objective:** Migrate .claude/memory/ to new structure

**Tasks:**
1. Refactor `hooks/session-start.js`:
   - Detect old vs new structure
   - Auto-migrate if old structure found
   - Initialize v2.0 for new projects

2. Implement `migrateToV2()`:
   - Create core/ directory
   - Move activeContext.md → core/
   - Rename knowledge/patterns.md → core/systemPatterns.md
   - Create missing files from templates
   - Create plans/, errors/ directories
   - Create initial memory-index.md
   - Backup old structure to `.claude/memory.backup/`

3. Refactor `architect.md`:
   - Remove 23-point scoring
   - Add Task Manager reference
   - Strengthen Safe Guardian role

**Validation:**
- Auto-migration works
- Old structure backed up
- SessionStart loads new structure

---

### Phase 3: Refactor Git Hook (Agent Mode A)

**Objective:** git-commit hook launches Architect Agent

**Tasks:**
1. Refactor `hooks/git-commit.js`:
   - Replace inline analysis with agent invocation
   - Implement `launchArchitectAgent()`
   - Pass Mode A prompt

2. Test Mode A:
   - Make feat: commit with 3+ files
   - Verify agent detects pattern
   - Verify systemPatterns.md updated
   - Verify warnings displayed

**Validation:**
- Architectural commits trigger Mode A
- Patterns detected and logged
- Warnings displayed for issues

---

### Phase 4: Task Manager Integration

**Objective:** Task Manager uses new structure

**Tasks:**
1. Update `agents/task-manager.md`:
   - Change paths to core/activeContext.md
   - Add core/progress.md update instructions

2. Update `commands/analyze-todos.md`:
   - Read from core/activeContext.md
   - Provide correct paths to agent

**Validation:**
- /analyze-todos works with new structure
- Task logs created in tasks/
- core/ files updated correctly

---

### Phase 5: Tests & Documentation

**Objective:** Complete testing and documentation

**Tasks:**
1. Automated tests:
   - All existing tests pass
   - New architect tests pass
   - Migration tests pass

2. Manual tests:
   - New project: v2.0 init
   - Existing project: auto-migration
   - /analyze-todos → Task Manager works
   - feat: commit → Architect Mode A works
   - /architect-review → Architect Mode C works

3. Documentation:
   - README.md: Update structure
   - USAGE.md: Architect workflows
   - CHANGELOG.md: Version 2.0 features

**Validation:**
- 100% tests passing
- Documentation complete
- Ready for release

---

### Branch Strategy

**Recommended:** Single feature branch
```
main
  └─ feature/windsurf-structure-v2
       (all phases here)
```

Rationale: Changes are interdependent, easier to coordinate in single branch

---

### Rollback Plan

**Before release:** Feature branch can be abandoned

**After release:**
- Backup created automatically: `.claude/memory.backup/`
- Provide `/rollback-v2` command to restore old structure
- Document downgrade: reinstall v1.x

---

### Effort Estimation

| Phase | Complexity | Duration |
|-------|-----------|----------|
| Phase 1: Preparation | Medium | 2-3 hours |
| Phase 2: Migration | High | 3-4 hours |
| Phase 3: Git Hook | Medium | 2 hours |
| Phase 4: Task Manager | Low | 1 hour |
| Phase 5: Tests & Docs | Medium | 2-3 hours |
| **TOTAL** | | **10-13 hours** |

---

## 6. Success Criteria

### Functional Requirements

✅ **Structure Alignment:**
- core/ contains 6 Windsurf-standard files
- knowledge/ preserved for MightyArchitect extensions
- tasks/, plans/, errors/ operational

✅ **Agent Behaviors:**
- Task Manager scores tasks (23-points)
- Architect Mode A auto-observes after commits
- Architect Mode C provides full analysis on-demand

✅ **Token Efficiency:**
- SessionStart loads ≤1000 tokens
- 73% reduction vs Windsurf maintained

✅ **Migration:**
- Existing projects auto-migrate seamlessly
- New projects initialize v2.0 structure
- Backup created before migration

✅ **Compatibility:**
- All existing hooks work
- All existing commands work
- Pure Node.js maintained (no new dependencies)

### Non-Functional Requirements

✅ **Maintainability:**
- Clear separation: Task Manager vs Architect
- Agent SDK for both (consistent pattern)
- Template-based file creation

✅ **Usability:**
- Auto-migration (zero user intervention)
- Clear error messages
- Documentation complete

✅ **Performance:**
- Mode A completes in <60s
- Mode C completes in <10min
- SessionStart remains fast

---

## 7. Open Questions & Future Enhancements

### Addressed During Design
- ✅ Nomenclature: YYYYMMDD-HHMMSS (Task Manager format kept)
- ✅ Architect scope: Safe Guardian, not scorer
- ✅ knowledge/ vs core/: Hybrid approach (both kept)
- ✅ memory-index.md: Simple status list (lightweight)
- ✅ SessionStart loading: Selective (activeContext + systemPatterns + index)

### Future Enhancements (Post-v2.0)
- Memory compaction strategy (when systemPatterns.md >50 entries)
- Archival of old task logs (>30 days → tasks/archive/)
- Enhanced coherence checking (deeper semantic analysis)
- Integration with Superpowers Execute-Plan workflow
- Analytics dashboard (patterns over time, quality trends)

---

## 8. References

- Windsurf Meta-Cognitive Workflow Architecture: [User-provided documentation]
- MightyArchitect v1.x: Current implementation
- Task Manager Implementation: `docs/plans/2025-11-12-smart-task-manager-implementation-complete.md`
- Agent SDK Documentation: https://docs.claude.com/en/docs/agent-sdk/overview

---

**Design Status:** ✅ Complete and Validated
**Next Step:** Create implementation plan with superpowers:writing-plans
**Estimated Implementation:** 10-13 hours across 5 phases
