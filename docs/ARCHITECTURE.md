# MightyArchitect Architecture

## Overview

MightyArchitect is a port of Windsurf's Meta-Cognitive Workflow Architecture, optimized for Claude Code with dramatic token efficiency improvements (~800 tokens vs 3000+).

## Design Principles

### 1. Zero External Dependencies
- **Decision**: Use pure Node.js (no bash, no jq, no external tools)
- **Rationale**: Seamless cross-platform installation without dependency management
- **Trade-offs**: Slightly more verbose code vs perfect portability

### 2. Token Efficiency
- **Goal**: Minimize context consumption while maintaining functionality
- **Approach**: Three-layer memory system with selective loading
- **Result**: ~800 tokens per session (73% reduction from Windsurf)

### 3. Automated Intelligence
- **Philosophy**: The system should work without requiring user intervention
- **Implementation**: Hook-based automation with smart filtering
- **Balance**: Automation for common cases, manual control when needed

## System Architecture

### Three-Layer Memory System

```
┌─────────────────────────────────────────────────────────────┐
│                     WORKING MEMORY                          │
│                   activeContext.md                          │
│         (Current focus, blockers, next steps)               │
│                      ~200 tokens                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Always loaded on SessionStart
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    SHORT-TERM MEMORY                        │
│                      tasks/*.md                             │
│         (Recent task logs, 5-7 day retention)               │
│                  Loaded on-demand                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Distilled by Architect
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    LONG-TERM MEMORY                         │
│              knowledge/patterns.md                          │
│              knowledge/decisions.md                         │
│         (Architectural patterns, key decisions)             │
│                      ~600 tokens                            │
│                Always loaded (architect.md)                 │
└─────────────────────────────────────────────────────────────┘
```

### Hook System

**SessionStart Hook** (`hooks/session-start.js`)
- Triggers: On every Claude Code session start
- Actions:
  1. Check if `.claude/memory/` exists
  2. If not, check user preference for auto-init
  3. Create memory structure if needed
  4. Load activeContext.md and architect.md into context
- Token Cost: ~800 tokens

**PostToolUse Hook** (`hooks/git-commit.js`)
- Triggers: After every Bash tool execution
- Filter Logic:
  ```javascript
  if (command.includes('git commit') &&
      commitMsg.match(/^(feat|refactor|perf):/) &&
      filesChanged >= 3) {
    // Trigger Architect analysis
  }
  ```
- Actions: Notify user to run `/architect-review` or auto-analyze
- Token Cost: 0 (just notification)

**Stop Hook** (`hooks/stop.js`)
- Triggers: When Claude Code session ends
- Actions: Check if files were modified, remind to update task logs
- Token Cost: 0 (just reminder)

### Skill System

**mighty-architect Skill** (`skills/mighty-architect/SKILL.md`)
- Invocation: Triggered by git commit hook or `/architect-review` command
- Process:
  1. Read recent git diff
  2. Analyze architectural patterns
  3. Score using 23-point system
  4. Update knowledge base (patterns.md, decisions.md)
  5. Report findings to user
- Tools: Read, Grep, Glob, Write, Edit

### Command System

**`/architect-review`** (`commands/architect-review.md`)
- Purpose: Manual architectural analysis
- Use cases:
  - Pre-commit review
  - Refactoring planning
  - Code review assistance

**`/memory-status`** (`commands/memory-status.md`)
- Purpose: Inspect current memory state
- Shows: Memory structure, active context, recent tasks, knowledge base

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User commits code                        │
│           (feat/refactor/perf, 3+ files)                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    PostToolUse Hook detects
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Architect Skill invoked                    │
│         1. git log -1 --stat, git diff HEAD~1               │
│         2. Pattern analysis                                 │
│         3. 23-point scoring                                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
                  Write to long-term memory
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              knowledge/patterns.md updated                  │
│              knowledge/decisions.md updated                 │
│         (Loaded on every SessionStart via architect.md)     │
└─────────────────────────────────────────────────────────────┘
                              ↓
                Next session automatically benefits
```

## Technical Decisions

### Why Node.js Hooks Instead of Bash?

**Original Plan**: Bash hooks with `jq` for JSON parsing

**Problem Identified**:
- `jq` requires separate installation
- Not seamless on Windows
- Violates "zero dependencies" goal

**Solution**: Pure Node.js hooks
- Native `JSON.parse()` for stdin
- `process.stdin.on('data')` for hook input
- `execSync()` for git commands
- Cross-platform compatible

**Code Comparison**:
```javascript
// ❌ Bash + jq (requires jq installation)
#!/bin/bash
data=$(cat)
tool_name=$(echo "$data" | jq -r '.tool_name')

// ✅ Node.js (zero dependencies)
#!/usr/bin/env node
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(inputData);
  const toolName = data.tool_name;
});
```

### Why Hybrid Memory Structure?

**Alternatives Considered**:
1. **Fully Flat**: All files in `.claude/memory/` root
   - Pro: Simple
   - Con: Doesn't scale, cluttered
2. **Fully Nested**: Deep folder hierarchy
   - Pro: Organized
   - Con: Complex, harder to navigate
3. **Hybrid** (chosen): Flat for frequent, nested for archives
   - Pro: Best of both - simple for daily use, scalable for growth
   - Con: Requires discipline to maintain

### Why 23-Point Scoring?

Ported directly from Windsurf's system which balances:
- Objective criteria (not subjective)
- Granular enough for nuance (not just pass/fail)
- Memorable thresholds (90%, 78%)

## Installation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│           User runs: npx create-mighty-architect            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    bin/install.js                           │
│         1. Create ~/.claude/plugins/mighty-architect/       │
│         2. Copy templates, hooks, skills, commands          │
│         3. Update ~/.claude/settings.json with hooks        │
│         4. Prompt for auto-init preference                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              ~/.claude/settings.json                        │
│   {                                                         │
│     "hooks": {                                              │
│       "SessionStart": [{                                    │
│         "command": "node path/to/session-start.js"          │
│       }]                                                    │
│     },                                                      │
│     "mightyArchitect": {                                    │
│       "autoInit": true,                                     │
│       "version": "1.0.0"                                    │
│     }                                                       │
│   }                                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
              System ready for all projects
```

## Token Budget Analysis

**Target**: <1000 tokens per session
**Achieved**: ~800 tokens per session

Breakdown:
- `activeContext.md`: ~200 tokens (user-managed, minimal)
- `architect.md`: ~600 tokens (includes 23-point rubric, instructions)
- Hook overhead: 0 tokens (hooks don't load into context)
- Task logs: 0 tokens (loaded on-demand only)

**Comparison to Windsurf**:
- Windsurf: ~3000 tokens (loads full repo.md + workflow instructions)
- MightyArchitect: ~800 tokens (selective loading)
- Reduction: 73%

## Future Considerations

### Potential Enhancements
1. **Memory Compression**: Automatic archival of old task logs
2. **Pattern Search**: Grep-based pattern lookup from past decisions
3. **Multi-Project Memory**: Shared knowledge across projects
4. **Quality Trends**: Track 23-point scores over time

### Scalability
- Current design supports projects with 100+ commits
- Knowledge base grows linearly with architectural decisions (~10-20 per project)
- Short-term memory automatically forgotten after 5-7 days
- Long-term memory manually curated (human decides what's important)

## Testing Strategy

All components follow TDD (Test-Driven Development):
1. Write test first (RED)
2. Implement to pass test (GREEN)
3. Commit

Tests use Node.js `spawn()` for stdin/stdout handling, ensuring cross-platform compatibility.

## License

Apache 2.0
