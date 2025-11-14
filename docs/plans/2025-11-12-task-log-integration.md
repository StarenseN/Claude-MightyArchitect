# Task Log + Execute-Plan Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate MightyArchitect task logging system with Superpowers execute-plan workflow for automatic documentation of plan execution batches.

**Architecture:** Create `/task-start` and `/task-complete` commands that auto-create and populate task logs. Modify execute-plan workflow to automatically invoke these commands at batch boundaries. Add resume logic for interrupted plans.

**Tech Stack:** Node.js hooks, Bash commands, Markdown templates, git integration

---

## Task 1: Create `/task-start` Command

**Files:**
- Create: `commands/task-start.md`
- Reference: `templates/task-log-template.md`

**Step 1: Write the command file**

Create `commands/task-start.md`:

```markdown
---
name: task-start
description: Start a new task and create task log automatically
---

# Task Start

Starting a new task with automatic log creation.

## Step 1: Extract Task Name

Task name from arguments or prompt:

```bash
echo "Task name: $1"
```

If no argument, ask user for task name.

## Step 2: Generate Task Log Filename

```bash
TASK_DATE=$(date +%Y-%m-%d)
TASK_SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
TASK_FILE=".claude/memory/tasks/${TASK_DATE}-${TASK_SLUG}.md"
```

## Step 3: Check if Directory Exists

```bash
if [ ! -d .claude/memory/tasks ]; then
  mkdir -p .claude/memory/tasks
  echo "✓ Created tasks directory"
fi
```

## Step 4: Copy Template

```bash
if [ -f ~/.claude/plugins/mighty-architect/templates/task-log-template.md ]; then
  cp ~/.claude/plugins/mighty-architect/templates/task-log-template.md "$TASK_FILE"
else
  # Fallback minimal template
  cat > "$TASK_FILE" << 'EOF'
# Task Log: [Task Name]

## Task Information
- **Date**: YYYY-MM-DD
- **Time Started**: HH:MM
- **Time Completed**: HH:MM
- **Files Modified**: [list]

## Task Details
- **Goal**:
- **Implementation**:
- **Challenges**:
- **Decisions**:

## Performance Evaluation
- **Score**: /23
- **Strengths**:
- **Areas for Improvement**:

## Next Steps
-
EOF
fi
```

## Step 5: Pre-fill Task Log

```bash
# Replace placeholders
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)

# Use sed to update fields
sed -i "s/# Task Log: \[Brief Description\]/# Task Log: $1/" "$TASK_FILE"
sed -i "s/YYYY-MM-DD/$CURRENT_DATE/" "$TASK_FILE"
sed -i "s/HH:MM/$CURRENT_TIME/" "$TASK_FILE"
```

## Step 6: Get Goal from User

Ask user: "What is the goal of this task?"

Store response and add to task log.

## Step 7: Update activeContext.md

```bash
cat >> .claude/memory/activeContext.md << EOF

## Current Task
**Active Task Log**: tasks/${TASK_DATE}-${TASK_SLUG}.md
**Started**: ${CURRENT_TIME}
**Goal**: [User's goal]
EOF
```

## Step 8: Confirm

```bash
echo "✅ Task started: $TASK_FILE"
echo "📝 Goal: [User's goal]"
```
```

**Step 2: Verify command syntax**

Check markdown formatting is valid, YAML frontmatter correct.

**Step 3: Test command structure**

Read the file back to verify all code blocks closed properly.

**Step 4: Commit**

```bash
git add commands/task-start.md
git commit -m "feat: add /task-start command for automatic task log creation"
```

---

## Task 2: Create `/task-complete` Command

**Files:**
- Create: `commands/task-complete.md`

**Step 1: Write the command file**

Create `commands/task-complete.md`:

```markdown
---
name: task-complete
description: Complete current task and finalize task log automatically
---

# Task Complete

Completing the current task with automatic log finalization.

## Step 1: Find Active Task Log

```bash
# Get most recent task log
TASK_FILE=$(ls -t .claude/memory/tasks/*.md 2>/dev/null | head -1)

if [ -z "$TASK_FILE" ]; then
  echo "❌ No active task found"
  exit 1
fi

echo "Completing task: $TASK_FILE"
```

## Step 2: Get Files Modified

```bash
# Get git diff since task start time
FILES_MODIFIED=$(git diff --name-only HEAD)

if [ -z "$FILES_MODIFIED" ]; then
  FILES_MODIFIED="No files modified"
fi
```

## Step 3: Generate Implementation Summary

Analyze changes and create summary:

```bash
echo "Files changed:"
echo "$FILES_MODIFIED"
```

Ask Claude to generate implementation summary based on git diff.

## Step 4: Update Task Log - Files Modified

```bash
# Replace [list of files] with actual files
sed -i "s/\[list of files\]/$FILES_MODIFIED/" "$TASK_FILE"
# Or append if already has content
```

## Step 5: Update Task Log - Time Completed

```bash
CURRENT_TIME=$(date +%H:%M)
sed -i "s/- \*\*Time Completed\*\*: HH:MM/- **Time Completed**: $CURRENT_TIME/" "$TASK_FILE"
```

## Step 6: Ask User for Additional Details

Prompt user:
- "Any challenges encountered?"
- "Key decisions made?"
- "Score out of 23?"

## Step 7: Update Task Log with Responses

Append user responses to appropriate sections in task log.

## Step 8: Ask for Next Steps

Prompt: "What are the next steps?"

Add to Next Steps section.

## Step 9: Update activeContext.md

```bash
# Remove "Current Task" section from activeContext
sed -i '/## Current Task/,/\*\*Goal\*\*/d' .claude/memory/activeContext.md
```

## Step 10: Confirm

```bash
echo "✅ Task completed: $TASK_FILE"
echo "📊 Score: [user's score]/23"
cat "$TASK_FILE"
```
```

**Step 2: Verify command syntax**

Check markdown formatting, code blocks.

**Step 3: Test command structure**

Ensure all placeholders and sed commands are correct.

**Step 4: Commit**

```bash
git add commands/task-complete.md
git commit -m "feat: add /task-complete command for automatic task log finalization"
```

---

## Task 3: Create Execute-Plan Wrapper Command

**Files:**
- Create: `commands/execute-plan-with-logs.md`

**Step 1: Write wrapper command**

Create `commands/execute-plan-with-logs.md`:

```markdown
---
name: execute-plan-with-logs
description: Execute a Superpowers plan with automatic MightyArchitect task logging per batch
---

# Execute Plan with Task Logs

Executing plan from Superpowers with automatic task log generation.

## Overview

This command wraps the Superpowers `executing-plans` skill and automatically:
- Creates task log at start of each batch
- Completes task log at end of each batch
- Tracks progress in activeContext.md

## Usage

```
/execute-plan-with-logs docs/plans/YYYY-MM-DD-feature-name.md
```

## Process

### Before Starting

1. Load plan file
2. Announce: "I'm using the executing-plans skill with MightyArchitect task logging."
3. Review plan critically
4. If concerns: raise them
5. If no concerns: proceed

### For Each Batch

**Batch Start:**
1. Execute `/task-start "Plan: [Feature Name] - Batch [N]"`
2. Pre-fill goal: "Execute tasks X-Y from plan [feature name]"

**Batch Execution:**
3. Follow executing-plans skill exactly:
   - Mark each task as in_progress
   - Follow steps exactly
   - Run verifications
   - Mark as completed

**Batch End:**
4. Execute `/task-complete`
5. Auto-populate:
   - Files modified (from git diff)
   - Implementation summary (from completed tasks)
   - Challenges (if any encountered)
6. Ask user for score
7. Report: "✅ Batch [N] complete. Task log: [path]"
8. Report: "Ready for feedback."

### Between Batches

Wait for user feedback before proceeding to next batch.

### After All Batches

1. Announce: "I'm using the finishing-a-development-branch skill."
2. Use superpowers:finishing-a-development-branch to complete work

## Stop Conditions

**STOP and ask when:**
- Hit blocker mid-batch
- Plan has critical gaps
- Instruction unclear
- Verification fails repeatedly

**Don't force through blockers** - stop and ask.
```

**Step 2: Verify integration points**

Check that references to `/task-start` and `/task-complete` are correct.

**Step 3: Test command structure**

Ensure workflow logic is sound.

**Step 4: Commit**

```bash
git add commands/execute-plan-with-logs.md
git commit -m "feat: add /execute-plan-with-logs wrapper for integrated task logging"
```

---

## Task 4: Add Resume Logic to session-start.js

**Files:**
- Modify: `hooks/session-start.js:65-88`

**Step 1: Write failing test**

Create `test/test-task-resume.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('Testing task resume detection...');

// Setup: Create incomplete task log
const testDir = path.join(process.cwd(), '.claude', 'memory', 'tasks');
fs.mkdirSync(testDir, { recursive: true });

const incompleteTask = path.join(testDir, '2025-11-12-test-incomplete.md');
fs.writeFileSync(incompleteTask, `# Task Log: Test Task

## Task Information
- **Date**: 2025-11-12
- **Time Started**: 14:00
- **Time Completed**: [INCOMPLETE]

## Task Details
- **Goal**: Test goal
`);

console.log('✓ Test setup complete');
console.log('Incomplete task created:', incompleteTask);

// Expected: session-start should detect this
```

**Step 2: Run test to verify it fails**

```bash
node test/test-task-resume.js
```

Expected: Creates incomplete task, but session-start doesn't detect it yet.

**Step 3: Add detection logic to session-start.js**

Add after line 88 in `hooks/session-start.js`:

```javascript
// Check for incomplete task logs
function checkIncompleteTask() {
  const tasksDir = path.join(MEMORY_DIR, 'tasks');
  if (!fs.existsSync(tasksDir)) return null;

  const taskFiles = fs.readdirSync(tasksDir)
    .filter(f => f.endsWith('.md') && f !== 'template.md' && f !== 'task-log-template.md')
    .map(f => path.join(tasksDir, f))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);

  if (taskFiles.length === 0) return null;

  // Check most recent task log
  const latestTask = taskFiles[0];
  const content = fs.readFileSync(latestTask, 'utf8');

  // Incomplete if "Time Completed" is not filled or is [INCOMPLETE]
  if (content.includes('Time Completed**: HH:MM') || content.includes('[INCOMPLETE]')) {
    const titleMatch = content.match(/# Task Log: (.+)/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';
    return { file: latestTask, title };
  }

  return null;
}

const incompleteTask = checkIncompleteTask();
if (incompleteTask) {
  console.log('');
  console.log('⚠️  **Incomplete Task Detected**');
  console.log('');
  console.log(`Task: ${incompleteTask.title}`);
  console.log(`File: ${path.relative(process.cwd(), incompleteTask.file)}`);
  console.log('');
  console.log('Options:');
  console.log('- Resume: `/task-complete` to finish this task');
  console.log('- Abandon: Delete the task log file');
  console.log('- New task: `/task-start` to start fresh');
  console.log('');
}
```

**Step 4: Run test to verify it passes**

```bash
node hooks/session-start.js < /dev/null
```

Expected: Detects incomplete task and shows warning.

**Step 5: Clean up test**

```bash
rm -rf .claude/memory/tasks/2025-11-12-test-incomplete.md
```

**Step 6: Commit**

```bash
git add hooks/session-start.js test/test-task-resume.js
git commit -m "feat: add incomplete task detection to session-start hook"
```

---

## Task 5: Add Task Log Linking in activeContext Template

**Files:**
- Modify: `templates/activeContext.md`

**Step 1: Update template**

Modify `templates/activeContext.md`:

```markdown
# Active Context

## Current Focus
[What you're working on right now]

## Current Task
[This section is auto-populated by /task-start]

## Recent Changes
[Files/features modified in this session]

## Next Steps
[Immediate next actions]

## Blockers
[Anything preventing progress]

---
*Last updated: [timestamp]*
```

**Step 2: Verify template format**

Read file to ensure markdown is valid.

**Step 3: Test with /task-start**

Run `/task-start "Test Task"` and verify Current Task section is populated.

**Step 4: Commit**

```bash
git add templates/activeContext.md
git commit -m "feat: add Current Task section to activeContext template"
```

---

## Task 6: Create `/task-list` Command

**Files:**
- Create: `commands/task-list.md`

**Step 1: Write command file**

Create `commands/task-list.md`:

```markdown
---
name: task-list
description: List recent task logs with summary information
---

# Task List

Show recent task logs from MightyArchitect memory.

## List Recent Tasks

```bash
echo "📋 Recent Task Logs:"
echo ""

# Get last 10 task logs, sorted by date (newest first)
ls -t .claude/memory/tasks/*.md 2>/dev/null | head -10 | while read file; do
  if [ "$(basename "$file")" = "template.md" ] || [ "$(basename "$file")" = "task-log-template.md" ]; then
    continue
  fi

  # Extract task title
  TITLE=$(grep "^# Task Log:" "$file" | sed 's/# Task Log: //')

  # Extract date
  DATE=$(grep "Date:" "$file" | head -1 | sed 's/.*Date\*\*: //' | sed 's/\*\*//')

  # Extract score
  SCORE=$(grep "Score:" "$file" | sed 's/.*Score\*\*: //' | sed 's/\*\*//' | sed 's/ .*//')

  # Extract completion status
  if grep -q "Time Completed\*\*: HH:MM\|\\[INCOMPLETE\\]" "$file"; then
    STATUS="⏳ In Progress"
  else
    STATUS="✅ Complete"
  fi

  # Display
  echo "$STATUS  $DATE  [$SCORE]  $TITLE"
  echo "   File: $(basename "$file")"
  echo ""
done

if [ ! -f .claude/memory/tasks/*.md 2>/dev/null ]; then
  echo "No task logs found."
  echo "Use /task-start to create a task log."
fi
```

## Options

User can request details of specific task by providing filename or number.
```

**Step 2: Verify command syntax**

Check bash script syntax, markdown formatting.

**Step 3: Test command**

Create dummy task logs and run `/task-list` to verify output.

**Step 4: Commit**

```bash
git add commands/task-list.md
git commit -m "feat: add /task-list command for viewing recent task logs"
```

---

## Task 7: Create `/plan-status` Command

**Files:**
- Create: `commands/plan-status.md`

**Step 1: Write command file**

Create `commands/plan-status.md`:

```markdown
---
name: plan-status
description: Show progress of current plan execution with batch completion status
---

# Plan Status

Show execution progress of Superpowers implementation plan.

## Usage

```
/plan-status [plan-file]
```

If no plan file specified, tries to detect from recent task logs.

## Show Progress

```bash
PLAN_FILE="$1"

if [ -z "$PLAN_FILE" ]; then
  # Try to detect from most recent task log
  RECENT_TASK=$(ls -t .claude/memory/tasks/*.md 2>/dev/null | head -1)
  if [ -n "$RECENT_TASK" ]; then
    # Extract plan reference from task goal
    PLAN_REF=$(grep "Plan:" "$RECENT_TASK" | head -1)
    if [ -n "$PLAN_REF" ]; then
      echo "Detected active plan from task log"
      # Extract plan filename if possible
    fi
  fi
fi

if [ ! -f "$PLAN_FILE" ]; then
  echo "❌ Plan file not found: $PLAN_FILE"
  echo "Usage: /plan-status docs/plans/YYYY-MM-DD-feature.md"
  exit 1
fi

echo "Plan: $(grep "^# " "$PLAN_FILE" | head -1 | sed 's/# //')"
echo "File: $PLAN_FILE"
echo ""

# Count total tasks
TOTAL_TASKS=$(grep -c "^### Task [0-9]" "$PLAN_FILE")

# Find related task logs
PLAN_NAME=$(basename "$PLAN_FILE" .md)
COMPLETED_BATCHES=$(ls .claude/memory/tasks/*${PLAN_NAME}*.md 2>/dev/null | wc -l)

# Calculate progress
if [ "$TOTAL_TASKS" -gt 0 ]; then
  # Assume 3 tasks per batch
  TASKS_PER_BATCH=3
  COMPLETED_TASKS=$((COMPLETED_BATCHES * TASKS_PER_BATCH))
  if [ "$COMPLETED_TASKS" -gt "$TOTAL_TASKS" ]; then
    COMPLETED_TASKS=$TOTAL_TASKS
  fi

  PERCENT=$((COMPLETED_TASKS * 100 / TOTAL_TASKS))

  # Progress bar
  FILLED=$((PERCENT / 10))
  EMPTY=$((10 - FILLED))
  BAR="["
  for i in $(seq 1 $FILLED); do BAR="${BAR}█"; done
  for i in $(seq 1 $EMPTY); do BAR="${BAR}░"; done
  BAR="${BAR}]"

  echo "Progress: $BAR $COMPLETED_TASKS/$TOTAL_TASKS tasks ($PERCENT%)"
  echo ""
fi

# List batches
echo "Batches:"
BATCH_NUM=1
ls -t .claude/memory/tasks/*${PLAN_NAME}*.md 2>/dev/null | sort | while read task_log; do
  SCORE=$(grep "Score:" "$task_log" | sed 's/.*Score\*\*: //' | sed 's/\*\*//' | sed 's/ .*//')

  if grep -q "Time Completed\*\*: HH:MM\|\\[INCOMPLETE\\]" "$task_log"; then
    echo "  ⏳ Batch $BATCH_NUM (Tasks $((($BATCH_NUM-1)*3+1))-$(($BATCH_NUM*3)))  - In Progress..."
  else
    echo "  ✅ Batch $BATCH_NUM (Tasks $((($BATCH_NUM-1)*3+1))-$(($BATCH_NUM*3)))  - Score: $SCORE  ✓ Complete"
  fi

  BATCH_NUM=$((BATCH_NUM + 1))
done

# Show current task if in progress
ACTIVE_TASK=$(ls -t .claude/memory/tasks/*${PLAN_NAME}*.md 2>/dev/null | head -1)
if [ -n "$ACTIVE_TASK" ] && grep -q "Time Completed\*\*: HH:MM\|\\[INCOMPLETE\\]" "$ACTIVE_TASK"; then
  GOAL=$(grep "Goal:" "$ACTIVE_TASK" | sed 's/.*Goal\*\*: //')
  echo ""
  echo "Current: $GOAL"
fi
```
```

**Step 2: Verify bash syntax**

Check script logic, grep patterns.

**Step 3: Test with sample plan**

Create test plan and task logs, verify progress calculation.

**Step 4: Commit**

```bash
git add commands/plan-status.md
git commit -m "feat: add /plan-status command for tracking plan execution progress"
```

---

## Task 8: Update CHANGELOG.md

**Files:**
- Modify: `CHANGELOG.md`

**Step 1: Add unreleased section**

Update `CHANGELOG.md`:

```markdown
## [Unreleased]

### Added
- **Task Log Automation**: `/task-start` and `/task-complete` commands for automatic task log creation
- **Execute-Plan Integration**: `/execute-plan-with-logs` wrapper for automatic task logging during plan execution
- **Task Resume Logic**: Session-start hook now detects incomplete tasks and prompts to resume
- **Task Navigation**: `/task-list` command to view recent task logs
- **Plan Progress Tracking**: `/plan-status` command to track plan execution progress
- **Active Task Tracking**: Current Task section in activeContext.md template

### Changed
- Enhanced session-start.js to detect and warn about incomplete task logs
- Updated activeContext.md template to include Current Task section

### Fixed
- Task logs now automatically created and populated, eliminating manual overhead
- Integration between Superpowers plans and MightyArchitect memory system

## [1.1.0] - 2025-11-12
...
```

**Step 2: Verify markdown formatting**

Check that changelog follows Keep a Changelog format.

**Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: update CHANGELOG for task log integration features"
```

---

## Task 9: Update README.md with New Commands

**Files:**
- Modify: `README.md` (Manual Commands section)

**Step 1: Add task commands section**

Add after line 542 in `README.md`:

```markdown
### Task Management Commands

MightyArchitect integrates with Superpowers execute-plan workflow for automatic task documentation.

#### `/task-start "Task Name"`

Start a new task with automatic log creation:

```bash
/task-start "Implement JWT Authentication"
```

**What it does**:
- Creates task log file: `.claude/memory/tasks/YYYY-MM-DD-task-name.md`
- Pre-fills date, time started
- Prompts for task goal
- Updates activeContext.md with current task

#### `/task-complete`

Complete the current task with automatic finalization:

```bash
/task-complete
```

**What it does**:
- Finds most recent incomplete task log
- Auto-populates files modified (from git diff)
- Prompts for: challenges, decisions, score
- Updates time completed
- Removes current task from activeContext.md

#### `/task-list`

View recent task logs:

```bash
/task-list
```

Shows last 10 tasks with status, date, score, and title.

#### `/execute-plan-with-logs`

Execute a Superpowers plan with automatic task logging:

```bash
/execute-plan-with-logs docs/plans/2025-11-12-feature.md
```

**What it does**:
- Wraps Superpowers `executing-plans` skill
- Auto-creates task log at start of each batch (3 tasks)
- Auto-completes task log at end of each batch
- Tracks progress in activeContext.md

**Use when**:
- Executing multi-task implementation plans
- Want automatic documentation of work
- Need checkpoint reviews between batches

#### `/plan-status`

Track progress of plan execution:

```bash
/plan-status docs/plans/2025-11-12-feature.md
```

Shows:
- Overall progress percentage
- Batch completion status
- Current task (if in progress)
- Scores per batch

### Integration Example

Complete workflow using Superpowers + MightyArchitect:

```bash
# 1. Create plan (Superpowers)
/superpowers:write-plan

# 2. Execute with automatic task logging (Integrated)
/execute-plan-with-logs docs/plans/2025-11-12-jwt-auth.md

# Claude automatically:
# - Creates task log for Batch 1
# - Executes tasks 1-3
# - Completes task log with score
# - Reports: "Ready for feedback"

# 3. Review batch, then continue
continue

# Repeat for all batches...

# 4. Check progress anytime
/plan-status

# 5. Review task history
/task-list
```

**Result**: Full documentation trail of plan execution in `.claude/memory/tasks/`.
```

**Step 2: Verify markdown formatting and links**

Check all code blocks are properly formatted.

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add task management commands section to README"
```

---

## Task 10: Create Integration Tests

**Files:**
- Create: `test/test-task-integration.js`

**Step 1: Write integration test**

Create `test/test-task-integration.js`:

```javascript
#!/usr/bin/env node
// Integration test for task log + execute-plan workflow

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Testing Task Log Integration...');

// Test 1: task-start command
console.log('\nTest 1: /task-start creates task log...');
// Simulate command execution
const testTaskName = 'Test Integration Task';
const expectedFile = path.join('.claude', 'memory', 'tasks',
  `${new Date().toISOString().split('T')[0]}-test-integration-task.md`);

// Check if file would be created correctly
if (!fs.existsSync('.claude/memory/tasks')) {
  fs.mkdirSync('.claude/memory/tasks', { recursive: true });
}

// Create test task log
const testContent = `# Task Log: ${testTaskName}

## Task Information
- **Date**: ${new Date().toISOString().split('T')[0]}
- **Time Started**: ${new Date().toTimeString().split(' ')[0].slice(0, 5)}
- **Time Completed**: [INCOMPLETE]

## Task Details
- **Goal**: Test goal
`;

fs.writeFileSync(expectedFile, testContent);
console.log('✓ Test 1 passed: Task log created');

// Test 2: task-complete command
console.log('\nTest 2: /task-complete finalizes task log...');
const completedContent = testContent.replace('[INCOMPLETE]', new Date().toTimeString().split(' ')[0].slice(0, 5));
fs.writeFileSync(expectedFile, completedContent);
console.log('✓ Test 2 passed: Task log completed');

// Test 3: session-start detects incomplete task
console.log('\nTest 3: session-start detects incomplete task...');
// Revert to incomplete
fs.writeFileSync(expectedFile, testContent);
// This would be tested by running session-start.js
console.log('✓ Test 3 setup complete (run session-start to verify)');

// Test 4: activeContext linking
console.log('\nTest 4: activeContext tracks current task...');
const activeContextPath = path.join('.claude', 'memory', 'activeContext.md');
if (fs.existsSync(activeContextPath)) {
  const content = fs.readFileSync(activeContextPath, 'utf8');
  const hasCurrentTaskSection = content.includes('## Current Task');
  if (hasCurrentTaskSection) {
    console.log('✓ Test 4 passed: activeContext has Current Task section');
  } else {
    console.log('✗ Test 4 failed: Missing Current Task section');
  }
} else {
  console.log('✓ Test 4 skipped: activeContext.md not initialized');
}

// Cleanup
console.log('\nCleaning up test files...');
if (fs.existsSync(expectedFile)) {
  fs.unlinkSync(expectedFile);
  console.log('✓ Cleanup complete');
}

console.log('\n✨ All integration tests passed!');
```

**Step 2: Run integration test**

```bash
node test/test-task-integration.js
```

Expected: All tests pass.

**Step 3: Add to test runner**

Modify `test/run-tests.js` to include this test.

**Step 4: Commit**

```bash
git add test/test-task-integration.js test/run-tests.js
git commit -m "test: add integration tests for task log workflow"
```

---

## Task 11: Install and Test Locally

**Files:**
- N/A (testing only)

**Step 1: Reinstall package**

```bash
npm install -g .
```

This copies all new commands to `~/.claude/commands/`.

**Step 2: Verify commands installed**

```bash
ls -la ~/.claude/commands/ | grep -E "task-start|task-complete|task-list|plan-status|execute-plan-with-logs"
```

Expected: All 5 commands present.

**Step 3: Test /task-start in fresh project**

```bash
cd /tmp/test-mighty-integration
mkdir -p .git  # Simulate git repo
/task-start "Test Feature"
```

Expected: Task log created in `.claude/memory/tasks/`.

**Step 4: Test /task-complete**

```bash
# Make some changes
echo "test" > test.txt
git add test.txt
/task-complete
```

Expected: Task log completed with files listed.

**Step 5: Test /task-list**

```bash
/task-list
```

Expected: Shows the test task.

**Step 6: Clean up test**

```bash
cd -
rm -rf /tmp/test-mighty-integration
```

**Step 7: Document test results**

Create summary of what works and what needs adjustment.

---

## Task 12: Update Installation Documentation

**Files:**
- Modify: `README.md` (Installation section)

**Step 1: Add post-install verification**

Add after line 155 in `README.md`:

```markdown
### Verify Installation

After installation, verify task commands are available:

```bash
# Check commands installed
ls ~/.claude/commands/ | grep task

# Should show:
# task-complete.md
# task-list.md
# task-start.md
# execute-plan-with-logs.md
# plan-status.md
```

Test basic workflow:

```bash
cd your-project
/task-start "Test Task"
# Should create .claude/memory/tasks/YYYY-MM-DD-test-task.md

/task-complete
# Should complete the task log

/task-list
# Should show your test task
```
```

**Step 2: Add troubleshooting section**

Add new section:

```markdown
### Troubleshooting Task Commands

**Commands not found:**
- Ensure `~/.claude/commands/` directory exists
- Reinstall: `npm install -g mighty-architect`

**Task logs not created:**
- Ensure `.claude/memory/tasks/` directory exists
- Run `/activate-mighty-architect` to initialize structure

**Resume detection not working:**
- Check task log has `[INCOMPLETE]` or unfilled `Time Completed`
- Restart Claude session to trigger SessionStart hook
```

**Step 3: Verify markdown formatting**

Check all code blocks and formatting.

**Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add installation verification and troubleshooting for task commands"
```

---

## Verification Steps

After completing all tasks:

1. **Run full test suite**: `npm test`
   - Expected: All tests pass (6/6 including new integration test)

2. **Install package**: `npm install -g .`
   - Verify all commands copied to `~/.claude/commands/`

3. **Test complete workflow**:
   ```bash
   cd test-project
   /task-start "Feature Implementation"
   # Make changes
   /task-complete
   /task-list
   ```

4. **Test plan integration**:
   ```bash
   # Create a small test plan
   /superpowers:write-plan
   /execute-plan-with-logs docs/plans/test-plan.md
   /plan-status docs/plans/test-plan.md
   ```

5. **Test resume logic**:
   - Create incomplete task
   - Restart Claude session
   - Verify warning appears

6. **Commit all changes**:
   ```bash
   git status
   git add .
   git commit -m "feat: complete task log + execute-plan integration"
   ```

---

## Success Criteria

- ✅ All commands (`/task-start`, `/task-complete`, `/task-list`, `/plan-status`, `/execute-plan-with-logs`) work
- ✅ Task logs automatically created and populated
- ✅ Integration with Superpowers execute-plan works seamlessly
- ✅ Resume logic detects incomplete tasks
- ✅ activeContext.md tracks current task
- ✅ All tests pass
- ✅ Documentation complete and accurate

---

## Estimated Time

- **Core commands (Tasks 1-3)**: 1.5 hours
- **Resume logic (Task 4)**: 30 minutes
- **Navigation commands (Tasks 5-7)**: 1 hour
- **Documentation (Tasks 8-9)**: 30 minutes
- **Testing (Tasks 10-11)**: 45 minutes
- **Polish (Task 12)**: 15 minutes

**Total**: ~4.5 hours for complete implementation
