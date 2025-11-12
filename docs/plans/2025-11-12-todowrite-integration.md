# TodoWrite-Based Task Logging Integration

## Overview

**Architecture**: Automatic task log creation using PreToolUse TodoWrite hooks with flexible granularity.

**Key Insight**: Instead of arbitrary batch sizes (3 tasks), use Claude's native TodoWrite system to detect completions with smart granularity:
- **1 todo completed** = 1 task log (standalone work)
- **1 theme completed** (N related todos) = 1 task log (planned work)

**Credit**: Solution validated via [GitHub Issue #6975](https://github.com/anthropics/claude-code/issues/6975) documenting undocumented TodoWrite PreToolUse matcher.

---

## Design Rationale

### Problem with Original Approach

The initial plan proposed batching tasks by 3 arbitrarily:
- Batch 1: Tasks 1-3 → 1 task log
- Batch 2: Tasks 4-6 → 1 task log

**Issues identified**:
1. Arbitrary batching (why 3?)
2. Batches can be heterogeneous/non-cohesive
3. Doesn't align with how developers naturally work
4. Ignores Claude's native TodoWrite system

### TodoWrite-Centric Solution

**Flexible Granularity**:
```
1 completed todo (standalone) = 1 task log
OR
1 completed theme (3-5 related todos) = 1 task log
```

**Smart Detection**:
- Analyzes todo content patterns
- Detects if part of a plan: `"Task 1: Create model"`, `"Implement JWT auth"`, etc.
- Groups related todos into themes
- Waits for theme completion before creating log

**Examples**:

**Scenario 1: Standalone Todo**
```
User: "Fix the login bug"
Claude: [Creates todo] "Fix login bug"
Claude: [Completes todo, marks as completed]
→ Hook triggers → Creates: .claude/memory/tasks/2025-11-12-fix-login-bug.md
```

**Scenario 2: Thematic Batch (Plan Execution)**
```
User: "Implement JWT authentication"
Claude: [Creates todos]
  1. "Create user model with password hashing"
  2. "Add JWT token generation"
  3. "Implement auth middleware"

Claude: [Completes all 3, marks as completed]
→ Hook detects theme complete → Creates: .claude/memory/tasks/2025-11-12-jwt-authentication.md
```

---

## Implementation

### Components

1. **PreToolUse TodoWrite Hook** (`hooks/pre-tool-use-todowrite.js`)
   - Intercepts TodoWrite operations
   - Detects completed todos
   - Analyzes completion patterns (single vs theme)
   - Auto-creates task logs

2. **State Tracking** (`.claude/memory/.todo-state.json`)
   - Tracks previous todo states
   - Detects transitions to "completed"
   - Enables theme detection

3. **Registration Command** (`/register-todowrite-hook`)
   - Adds hook to `~/.claude/settings.json`
   - Makes hook executable
   - Provides test instructions

### Hook Logic Flow

```
TodoWrite called (todos array updated)
  ↓
PreToolUse hook intercepts
  ↓
Compare with previous state (.todo-state.json)
  ↓
Detect newly completed todos
  ↓
Analyze pattern:
  ├─ Single todo? → Create task log immediately
  ├─ Part of theme? → Check if theme complete
  │   ├─ Theme complete? → Create task log for theme
  │   └─ Theme partial? → Wait for more completions
  └─ Unknown? → Skip
  ↓
Update state file
  ↓
Continue with TodoWrite operation
```

### Pattern Detection Algorithm

**Single Todo Detection**:
- No "Task X:" or "Step X:" prefix
- No action verb prefix (Implementing, Creating, Adding, etc.)
- Standalone work (bug fix, exploration, etc.)

**Theme Detection**:
- Todos with similar prefixes: "Task 1:", "Task 2:", etc.
- Todos with common subject: "JWT", "user model", etc.
- Word overlap threshold: ≥3 words OR ≥50% of theme name

**Theme Completion**:
- All related todos have status="completed"
- No pending todos in same theme

---

## Integration with Superpowers

### Before (Plan-Based Batching)

```bash
/superpowers:write-plan
/execute-plan-with-logs docs/plans/feature.md

# Batches by 3:
# Batch 1: Tasks 1-3 → task log
# Batch 2: Tasks 4-6 → task log
# (Arbitrary grouping)
```

### After (TodoWrite-Based)

```bash
/superpowers:write-plan
/superpowers:execute-plan docs/plans/feature.md

# Claude creates todos from plan
# Hook automatically detects thematic completions
# Creates task logs when themes complete
# No manual intervention needed
```

**Benefits**:
1. Natural workflow (no forced batching)
2. Semantic grouping (themes, not numbers)
3. Works with existing Superpowers workflow
4. Automatic documentation

---

## Usage Examples

### Example 1: Bug Fix (Single Todo)

```
User: "The pagination component is broken, fix it"

Claude:
[Creates todo] "Fix pagination component rendering bug"
[Investigates, implements fix]
[Marks todo completed]

→ Hook creates: .claude/memory/tasks/2025-11-12-fix-pagination-bug.md
```

**Task Log Content**:
```markdown
# Task Log: Fix pagination component rendering bug

## Task Information
- **Date**: 2025-11-12
- **Time Started**: 14:23
- **Time Completed**: 14:45
- **Type**: Single Todo
- **Files Modified**:
  - src/components/Pagination.tsx
  - src/components/Pagination.test.tsx

## Task Details
- **Goal**: Fix pagination component rendering bug

### Todos Completed
- [x] Fix pagination component rendering bug

## Performance Evaluation
- **Score**: [To be filled]/23

---
*Auto-generated by MightyArchitect TodoWrite hook*
```

### Example 2: Feature Implementation (Thematic Batch)

```
User: "/superpowers:execute-plan docs/plans/2025-11-12-user-auth.md"

Plan contains:
- Task 1: Create User model with password hashing
- Task 2: Add JWT token generation middleware
- Task 3: Implement authentication endpoints
- Task 4: Write integration tests
- Task 5: Update API documentation

Claude:
[Creates 5 todos from plan]
[Executes tasks 1-3 as a cohesive theme: "User Authentication Core"]
[Marks 3 todos completed]

→ Hook detects theme "User Authentication Core" complete
→ Creates: .claude/memory/tasks/2025-11-12-user-authentication-core.md

[Later: Executes tasks 4-5 as theme: "Testing & Documentation"]
[Marks 2 todos completed]

→ Hook creates: .claude/memory/tasks/2025-11-12-testing-documentation.md
```

**Task Log Content (Theme)**:
```markdown
# Task Log: User Authentication Core

## Task Information
- **Date**: 2025-11-12
- **Time Started**: 10:15
- **Time Completed**: 12:30
- **Type**: Thematic Batch
- **Files Modified**:
  - src/models/User.ts
  - src/middleware/jwt.ts
  - src/routes/auth.ts
  - prisma/schema.prisma

## Task Details
- **Goal**: Complete theme: User Authentication Core

### Implementation
Thematic batch completion:
- Create User model with password hashing
- Add JWT token generation middleware
- Implement authentication endpoints

### Todos Completed
- [x] Create User model with password hashing
- [x] Add JWT token generation middleware
- [x] Implement authentication endpoints

## Performance Evaluation
- **Score**: [To be filled]/23

---
*Auto-generated by MightyArchitect TodoWrite hook*
```

---

## Installation

### 1. Enable Hook

```bash
/register-todowrite-hook
```

This registers the PreToolUse TodoWrite hook in `~/.claude/settings.json`.

### 2. Verify Registration

```bash
cat ~/.claude/settings.json | jq '.hooks.PreToolUse[] | select(.matcher == "TodoWrite")'
```

Should show:
```json
{
  "matcher": "TodoWrite",
  "hooks": [
    {
      "type": "command",
      "command": "/path/to/hooks/pre-tool-use-todowrite.js"
    }
  ]
}
```

### 3. Test

```
Create a todo: "Test automatic task logging"
Mark it complete
Check: ls -la .claude/memory/tasks/
```

---

## Configuration

### Hook Behavior Settings

Edit `hooks/pre-tool-use-todowrite.js` to customize:

**Theme Detection Sensitivity**:
```javascript
// Line 107: Word overlap threshold
const overlap = themeWords.filter(w => contentWords.includes(w)).length;
return overlap >= Math.min(3, themeWords.length / 2);  // Adjust threshold
```

**Single vs Theme Classification**:
```javascript
// Line 86: Pattern matching
const isPlanTask = /^(Task|Step)\s+\d+:/i.test(todo.content) ||
                   /^(Implementing|Creating|Adding|Fixing|Updating)/i.test(todo.content);
```

**Task Log Template**:
Modify the template in `createTaskLog()` function (line 174).

---

## Comparison: Old vs New

### Old Approach (Plan-Based Batching)

**Pros**:
- Works with Superpowers execute-plan
- Creates checkpoints every 3 tasks

**Cons**:
- Arbitrary batching (why 3?)
- Heterogeneous batches
- Requires wrapper command (`/execute-plan-with-logs`)
- Manual intervention between batches
- Doesn't work for standalone todos

### New Approach (TodoWrite-Based)

**Pros**:
- **Flexible granularity**: 1 todo OR 1 theme
- **Semantic grouping**: Themes, not numbers
- **Automatic**: No manual commands needed
- **Universal**: Works for all todos (standalone + planned)
- **Native integration**: Uses Claude's TodoWrite directly

**Cons**:
- Requires PreToolUse hook setup
- Theme detection heuristic (can be refined)
- Undocumented feature (TodoWrite matcher)

---

## Future Enhancements

### 1. Enhanced Theme Detection

**Current**: Simple word overlap
**Future**: Use LLM to classify semantic similarity

```javascript
// Call Claude API to analyze todo relationships
const isRelated = await analyzeTodoSimilarity(todo1, todo2);
```

### 2. Interactive Theme Naming

**Current**: Auto-infer theme name
**Future**: Prompt user to confirm/rename theme

```javascript
// After detecting theme
console.error(`Theme detected: "${themeName}". Confirm? (y/n)`);
```

### 3. Task Log Enrichment

**Current**: Basic template with files modified
**Future**: Include git commit messages, test results, performance metrics

### 4. Integration with Architect Review

**Current**: Manual `/architect-review` trigger
**Future**: Auto-trigger architect review on task log creation

---

## Technical Notes

### TodoWrite Hook Access (via GitHub Issue #6975)

PreToolUse hooks receive TodoWrite data as JSON via stdin:

```json
{
  "tool_name": "TodoWrite",
  "tool_input": {
    "todos": [
      {
        "content": "Task description",
        "status": "completed",
        "activeForm": "Task description in progress"
      }
    ]
  }
}
```

**Key Fields**:
- `content`: Todo text
- `status`: `"pending" | "in_progress" | "completed"`
- `activeForm`: Present continuous form for UI

### State Management

The hook maintains `.claude/memory/.todo-state.json`:

```json
[
  {
    "content": "Fix login bug",
    "status": "completed",
    "activeForm": "Fixing login bug"
  }
]
```

This enables detecting transitions: `pending → in_progress → completed`.

### Hook Execution Model

1. User marks todo complete (Ctrl+T)
2. Claude calls TodoWrite tool
3. PreToolUse hook intercepts BEFORE TodoWrite executes
4. Hook reads stdin (JSON payload)
5. Hook processes, creates task log
6. Hook exits (status 0)
7. TodoWrite continues execution

**Important**: Hook must exit quickly (<100ms) to avoid blocking UI.

---

## Migration Guide

### From Manual Task Logs

**Before**:
```bash
# Manually create task logs
/task-start "Feature Name"
# Do work
/task-complete
```

**After**:
```bash
# Just work naturally with todos
# Task logs created automatically when todos complete
```

### From Plan-Based Batching

**Before**:
```bash
/execute-plan-with-logs docs/plans/feature.md
# Forced batches of 3 tasks
```

**After**:
```bash
/superpowers:execute-plan docs/plans/feature.md
# Natural thematic grouping, automatic task logs
```

---

## Success Metrics

- ✅ Automatic task log creation on todo completion
- ✅ Flexible granularity (1 todo OR 1 theme)
- ✅ Smart theme detection
- ✅ Works with Superpowers execute-plan
- ✅ Works for standalone todos
- ✅ No manual intervention required
- ✅ Maintains `.claude/memory/tasks/` history

---

**Estimated Implementation Time**: 2 hours
**Status**: ✅ Implemented
**Next**: Testing and refinement
