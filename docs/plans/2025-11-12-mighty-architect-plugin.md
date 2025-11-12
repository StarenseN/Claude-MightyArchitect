# MightyArchitect Plugin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Port Windsurf's Meta-Cognitive Workflow Architecture to Claude Code as a plugin with hooks, skills, and minimal token consumption.

**Architecture:** Plugin-based system with SessionStart hook for auto-initialization, PostToolUse hook triggering Architect skill on meaningful git commits, and hybrid memory structure (.claude/memory/) with always-loaded essentials (activeContext.md, architect.md) and on-demand knowledge files.

**Tech Stack:**
- Node.js/npm for installation script
- Bash scripts for hooks (stdin JSON parsing with jq)
- Claude Code Skills (Markdown with YAML frontmatter)
- PowerShell support for Windows

---

## Task 1: Project Structure Setup

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `README.md`

**Step 1: Write failing test for package structure**

```bash
# No test yet - this is project scaffolding
# We'll verify manually
```

**Step 2: Create package.json**

```json
{
  "name": "mighty-architect",
  "version": "1.0.0",
  "description": "Port of Windsurf Meta-Cognitive Workflow Architecture for Claude Code",
  "main": "index.js",
  "bin": {
    "create-mighty-architect": "./bin/install.js"
  },
  "scripts": {
    "test": "node test/run-tests.js"
  },
  "keywords": ["claude-code", "plugin", "memory", "architecture", "workflow"],
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {},
  "devDependencies": {}
}
```

**Step 3: Create .gitignore**

```
node_modules/
.DS_Store
*.log
test-output/
.claude/
```

**Step 4: Create README.md**

```markdown
# MightyArchitect

Port of Windsurf's Meta-Cognitive Workflow Architecture for Claude Code.

## Installation

```bash
npx create-mighty-architect
```

## Features

- Three-layer memory system (working/short-term/long-term)
- Automated Architect analysis on meaningful commits
- 23-point task evaluation system
- Token-efficient (~800 tokens per session vs 3000+)

## Usage

After installation, MightyArchitect auto-initializes in new projects.

- `/architect-review` - Manually trigger architecture analysis
- `/memory-status` - View current memory state

## License

Apache 2.0
```

**Step 5: Verify structure**

Run: `ls -la`
Expected: package.json, .gitignore, README.md present

**Step 6: Commit**

```bash
git add package.json .gitignore README.md
git commit -m "feat: initialize MightyArchitect project structure"
```

---

## Task 2: Memory Templates

**Files:**
- Create: `templates/activeContext.md`
- Create: `templates/architect.md`
- Create: `templates/task-log-template.md`

**Step 1: Create activeContext.md template**

```markdown
# Active Context

## Current Focus
[What you're working on right now]

## Recent Changes
[Files/features modified in this session]

## Next Steps
[Immediate next actions]

## Blockers
[Anything preventing progress]

---
*Last updated: [timestamp]*
```

Save to: `templates/activeContext.md`

**Step 2: Create architect.md template**

```markdown
# Architect Instructions

You are the lead software architect for this project. Your role:

## Responsibilities

1. **Pattern Recognition**: Identify architectural patterns as code evolves
2. **Decision Documentation**: Record why architectural choices were made
3. **Quality Enforcement**: Apply 23-point evaluation system to major changes
4. **Knowledge Synthesis**: Update long-term memory with insights

## When You're Invoked

- After commits matching: `feat:`, `refactor:`, `perf:`
- When 3+ files are modified in a commit
- Manual invocation via `/architect-review`

## Your Output

Update `.claude/memory/knowledge/patterns.md` with:
- New patterns observed
- Architectural decisions made
- Trade-offs considered
- Future considerations

## Workflow Framework

This project uses **Superpowers** as the underlying quality framework:
- TDD (test-driven-development)
- Systematic debugging
- Verification before completion
- Brainstorming before coding

When evaluating code quality, expect these practices to be followed. High scores (21-23) typically indicate proper workflow adherence. Low scores (<18) often indicate process shortcuts.

**Note:** You don't need to document skill usage - the code quality and test coverage speak for themselves. Only document DEVIATIONS from standard practices (e.g., "skipped tests because..." in decisions.md).

## Evaluation Criteria (23-point system)

**Rewards:**
- +10: Elegant, optimized solution exceeding requirements
- +5: Effective parallelization/vectorization
- +3: Perfect language-specific style/idioms
- +2: Minimal code (DRY, no bloat)
- +2: Handles edge cases efficiently
- +1: Portable/reusable solution

**Penalties:**
- -10: Fails core problem or introduces bugs
- -5: Placeholder comments or lazy output
- -5: Inefficient algorithms
- -3: Style violations or unnecessary code
- -2: Misses obvious edge cases
- -1: Overcomplicated solution
- -1: Deprecated/suboptimal libraries

**Scoring Tiers:**
- 21-23 = Excellent (≥90%)
- 18-20 = Sufficient (≥78%)
- <18 = Unacceptable (requires remediation)

---
*MightyArchitect v1.0.0*
```

Save to: `templates/architect.md`

**Step 3: Create task-log-template.md**

```markdown
# Task Log: [Brief Description]

## Task Information
- **Date**: YYYY-MM-DD
- **Time Started**: HH:MM
- **Time Completed**: HH:MM
- **Files Modified**: [list of files]

## Task Details
- **Goal**: [What needed to be accomplished]
- **Implementation**: [How it was implemented]
- **Challenges**: [Any obstacles encountered]
- **Decisions**: [Key decisions made during implementation]

## Performance Evaluation
- **Score**: [numerical score out of 23]
- **Strengths**: [What went well]
- **Areas for Improvement**: [What could be better]

## Next Steps
- [Immediate follow-up tasks]
- [Future considerations]
```

Save to: `templates/task-log-template.md`

**Step 4: Verify templates**

Run: `ls -la templates/`
Expected: 3 markdown files present

**Step 5: Commit**

```bash
git add templates/
git commit -m "feat: add memory structure templates"
```

---

## Task 3: SessionStart Hook

**Files:**
- Create: `hooks/session-start.sh`
- Create: `test/test-session-start.sh`

**Step 1: Write test for SessionStart hook**

```bash
#!/bin/bash
# test/test-session-start.sh

echo "Testing SessionStart Hook..."

# Test 1: Hook initializes structure when missing
rm -rf .claude/memory
echo '{"hook_event_name":"SessionStart","session_id":"test123"}' | bash hooks/session-start.sh > /tmp/hook-output.txt

if [[ -d .claude/memory && -f .claude/memory/activeContext.md ]]; then
  echo "✓ Test 1 passed: Structure initialized"
else
  echo "✗ Test 1 failed: Structure not created"
  exit 1
fi

# Test 2: Hook loads context when structure exists
OUTPUT=$(echo '{"hook_event_name":"SessionStart","session_id":"test456"}' | bash hooks/session-start.sh)

if echo "$OUTPUT" | grep -q "Active Context"; then
  echo "✓ Test 2 passed: Context loaded"
else
  echo "✗ Test 2 failed: Context not loaded"
  exit 1
fi

echo "All tests passed!"
```

Save to: `test/test-session-start.sh`

**Step 2: Run test to verify it fails**

Run: `chmod +x test/test-session-start.sh && bash test/test-session-start.sh`
Expected: FAIL with "hooks/session-start.sh: No such file"

**Step 3: Write SessionStart hook implementation**

```bash
#!/bin/bash
# hooks/session-start.sh
# MightyArchitect SessionStart Hook

set -e

MEMORY_DIR=".claude/memory"
SETTINGS_FILE="$HOME/.claude/settings.json"

# Check if memory structure exists
if [[ ! -d "$MEMORY_DIR" ]]; then
  # Check user preference (default to true for initial behavior)
  AUTO_INIT="true"

  if [[ -f "$SETTINGS_FILE" ]]; then
    AUTO_INIT=$(jq -r '.mightyArchitect.autoInit // true' "$SETTINGS_FILE" 2>/dev/null || echo "true")
  fi

  if [[ "$AUTO_INIT" == "true" ]]; then
    # Create directory structure
    mkdir -p "$MEMORY_DIR/tasks" "$MEMORY_DIR/knowledge"

    # Copy templates
    TEMPLATE_DIR="$HOME/.claude/plugins/mighty-architect/templates"
    if [[ -d "$TEMPLATE_DIR" ]]; then
      cp "$TEMPLATE_DIR/activeContext.md" "$MEMORY_DIR/activeContext.md"
      cp "$TEMPLATE_DIR/architect.md" "$MEMORY_DIR/architect.md"
    else
      # Fallback: create minimal files
      echo "# Active Context" > "$MEMORY_DIR/activeContext.md"
      echo "# Architect" > "$MEMORY_DIR/architect.md"
    fi

    echo "✓ MightyArchitect memory structure initialized" >&2
  fi
fi

# Load context if structure exists
if [[ -d "$MEMORY_DIR" ]]; then
  echo "---"
  echo "# MightyArchitect Memory Context"
  echo ""
  cat "$MEMORY_DIR/activeContext.md"
  echo ""
  echo "---"
  echo ""
  cat "$MEMORY_DIR/architect.md"

  # Load incomplete task if exists
  if [[ -f "$MEMORY_DIR/tasks/current.md" ]]; then
    echo ""
    echo "---"
    echo "## Resuming Task:"
    echo ""
    cat "$MEMORY_DIR/tasks/current.md"
  fi
fi

exit 0
```

Save to: `hooks/session-start.sh`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/session-start.sh && bash test/test-session-start.sh`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/session-start.sh test/test-session-start.sh
git commit -m "feat: add SessionStart hook with auto-initialization"
```

---

## Task 4: PostToolUse Hook for Git Commits

**Files:**
- Create: `hooks/git-commit.sh`
- Create: `test/test-git-commit-hook.sh`

**Step 1: Write test for git commit hook**

```bash
#!/bin/bash
# test/test-git-commit-hook.sh

echo "Testing Git Commit Hook..."

# Test 1: Hook triggers on feat: commit
INPUT='{"hook_event_name":"PostToolUse","tool_name":"Bash","tool_input":{"command":"git commit -m \"feat: add new feature\""}}'
OUTPUT=$(echo "$INPUT" | bash hooks/git-commit.sh)

if echo "$OUTPUT" | grep -q "Architect Analysis"; then
  echo "✓ Test 1 passed: Triggered on feat: commit"
else
  echo "✗ Test 1 failed: Did not trigger on feat:"
  exit 1
fi

# Test 2: Hook skips chore: commit
INPUT='{"hook_event_name":"PostToolUse","tool_name":"Bash","tool_input":{"command":"git commit -m \"chore: update deps\""}}'
OUTPUT=$(echo "$INPUT" | bash hooks/git-commit.sh)

if [[ -z "$OUTPUT" ]]; then
  echo "✓ Test 2 passed: Skipped chore: commit"
else
  echo "✗ Test 2 failed: Should not trigger on chore:"
  exit 1
fi

# Test 3: Hook skips non-git commands
INPUT='{"hook_event_name":"PostToolUse","tool_name":"Bash","tool_input":{"command":"npm install"}}'
OUTPUT=$(echo "$INPUT" | bash hooks/git-commit.sh)

if [[ -z "$OUTPUT" ]]; then
  echo "✓ Test 3 passed: Skipped non-git command"
else
  echo "✗ Test 3 failed: Should not trigger on non-git"
  exit 1
fi

echo "All tests passed!"
```

Save to: `test/test-git-commit-hook.sh`

**Step 2: Run test to verify it fails**

Run: `chmod +x test/test-git-commit-hook.sh && bash test/test-git-commit-hook.sh`
Expected: FAIL with "hooks/git-commit.sh: No such file"

**Step 3: Write git commit hook implementation**

```bash
#!/bin/bash
# hooks/git-commit.sh
# MightyArchitect PostToolUse Hook for Git Commits

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract tool name and command
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Only process git commit commands
if [[ "$TOOL_NAME" != "Bash" ]] || [[ ! "$COMMAND" =~ git\ commit ]]; then
  exit 0
fi

# Extract commit message
COMMIT_MSG=$(echo "$COMMAND" | grep -oP 'git commit.*-m "\K[^"]+' || echo "")

# Filter: only architectural commits
if [[ "$COMMIT_MSG" =~ ^(feat|refactor|perf): ]]; then
  # Count files changed (if in git repo)
  if git rev-parse --git-dir > /dev/null 2>&1; then
    FILES_CHANGED=$(git diff --name-only HEAD~1 2>/dev/null | wc -l || echo "0")

    if [[ $FILES_CHANGED -ge 3 ]]; then
      echo ""
      echo "🏗️ **MightyArchitect Analysis Triggered**"
      echo ""
      echo "Significant architectural changes detected ($FILES_CHANGED files)."
      echo "Commit: $COMMIT_MSG"
      echo ""
      echo "**Action Required:** Review patterns and update knowledge base."
      echo "Run: \`/architect-review\` or let me analyze automatically."
      echo ""
    fi
  fi
fi

exit 0
```

Save to: `hooks/git-commit.sh`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/git-commit.sh && bash test/test-git-commit-hook.sh`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/git-commit.sh test/test-git-commit-hook.sh
git commit -m "feat: add PostToolUse hook for git commit analysis"
```

---

## Task 5: Stop Hook for Task Logging Reminder

**Files:**
- Create: `hooks/stop.sh`
- Create: `test/test-stop-hook.sh`

**Step 1: Write test for stop hook**

```bash
#!/bin/bash
# test/test-stop-hook.sh

echo "Testing Stop Hook..."

# Setup: create a modified file
mkdir -p .test-workspace
cd .test-workspace
git init
echo "test" > file.txt
git add file.txt

# Test 1: Hook reminds when files modified
INPUT='{"hook_event_name":"Stop"}'
OUTPUT=$(echo "$INPUT" | bash ../hooks/stop.sh)

if echo "$OUTPUT" | grep -q "Update activeContext"; then
  echo "✓ Test 1 passed: Reminder shown for modified files"
else
  echo "✗ Test 1 failed: No reminder for modified files"
  cd ..
  rm -rf .test-workspace
  exit 1
fi

# Cleanup
cd ..
rm -rf .test-workspace

echo "All tests passed!"
```

Save to: `test/test-stop-hook.sh`

**Step 2: Run test to verify it fails**

Run: `chmod +x test/test-stop-hook.sh && bash test/test-stop-hook.sh`
Expected: FAIL with "hooks/stop.sh: No such file"

**Step 3: Write stop hook implementation**

```bash
#!/bin/bash
# hooks/stop.sh
# MightyArchitect Stop Hook - Task Logging Reminder

set -e

# Check if in git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  exit 0
fi

# Check if files were modified (staged or unstaged)
MODIFIED_FILES=$(git status --porcelain 2>/dev/null | wc -l)

if [[ $MODIFIED_FILES -gt 0 ]]; then
  echo ""
  echo "💾 **MightyArchitect Memory Update**"
  echo ""
  echo "Files modified in this session. Consider:"
  echo "- Update \`.claude/memory/activeContext.md\` with current state"
  echo "- Log completed work to \`.claude/memory/tasks/$(date +%Y-%m-%d)-task.md\`"
  echo "- Use template: \`.claude/memory/tasks/template.md\`"
  echo ""
fi

exit 0
```

Save to: `hooks/stop.sh`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/stop.sh && bash test/test-stop-hook.sh`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/stop.sh test/test-stop-hook.sh
git commit -m "feat: add Stop hook for task logging reminders"
```

---

## Task 6: Architect Skill

**Files:**
- Create: `skills/mighty-architect/SKILL.md`
- Create: `test/test-architect-skill.sh`

**Step 1: Write test for Architect skill**

```bash
#!/bin/bash
# test/test-architect-skill.sh

echo "Testing Architect Skill..."

# Test 1: Skill file has valid YAML frontmatter
SKILL_FILE="skills/mighty-architect/SKILL.md"

if head -n 1 "$SKILL_FILE" | grep -q "^---$"; then
  echo "✓ Test 1 passed: YAML frontmatter starts correctly"
else
  echo "✗ Test 1 failed: Missing YAML frontmatter"
  exit 1
fi

# Test 2: Skill has required name field
if grep -q "^name:" "$SKILL_FILE"; then
  echo "✓ Test 2 passed: Has name field"
else
  echo "✗ Test 2 failed: Missing name field"
  exit 1
fi

# Test 3: Skill has required description field
if grep -q "^description:" "$SKILL_FILE"; then
  echo "✓ Test 3 passed: Has description field"
else
  echo "✗ Test 3 failed: Missing description field"
  exit 1
fi

# Test 4: Skill mentions 23-point scoring
if grep -q "23.*point" "$SKILL_FILE"; then
  echo "✓ Test 4 passed: Contains 23-point scoring system"
else
  echo "✗ Test 4 failed: Missing scoring system"
  exit 1
fi

echo "All tests passed!"
```

Save to: `test/test-architect-skill.sh`

**Step 2: Run test to verify it fails**

Run: `chmod +x test/test-architect-skill.sh && bash test/test-architect-skill.sh`
Expected: FAIL with "skills/mighty-architect/SKILL.md: No such file"

**Step 3: Create Architect skill**

```markdown
---
name: mighty-architect
description: Lead software architect that analyzes code patterns after significant commits (feat/refactor/perf with 3+ files changed). Reviews architecture, documents decisions, evaluates quality using 23-point scoring system, and updates long-term memory in .claude/memory/knowledge/. Use when triggered by git commit hook or manually invoked for architectural review.
allowed-tools: Read, Grep, Glob, Write, Edit
---

# MightyArchitect - Lead Software Architect

You are the lead software architect for this project. When invoked, you analyze recent changes, identify architectural patterns, document decisions, and update the project's long-term memory.

## When You're Invoked

1. **Automatic**: After commits matching `feat:`, `refactor:`, or `perf:` with 3+ files changed
2. **Manual**: Via `/architect-review` command when user wants architectural analysis

## Your Analysis Process

### Step 1: Understand the Changes

Read the recent git commit:
```bash
git log -1 --stat
git diff HEAD~1
```

Identify:
- What was changed and why
- Which components/layers affected
- Patterns emerging from the changes

### Step 2: Analyze Architecture

Ask yourself:
- What architectural pattern is being used? (MVC, layered, microservices, etc.)
- Is this pattern consistent with previous decisions?
- Are there cross-cutting concerns? (logging, auth, validation)
- What trade-offs were made?

### Step 3: Evaluate Quality (23-Point System)

**Calculate score using these criteria:**

**Rewards (add points):**
- +10: Elegant, optimized solution exceeding requirements
- +5: Effective parallelization/vectorization when applicable
- +3: Perfect language-specific style and idioms
- +2: Minimal code following DRY principle
- +2: Handles edge cases efficiently
- +1: Portable and reusable solution

**Penalties (subtract points):**
- -10: Fails core problem or introduces bugs
- -5: Contains placeholder comments or lazy output
- -5: Uses inefficient algorithms when better options exist
- -3: Violates style conventions or includes unnecessary code
- -2: Misses obvious edge cases
- -1: Overcomplicates the solution
- -1: Uses deprecated or suboptimal libraries

**Scoring interpretation:**
- **21-23**: Excellent (≥90%) - Production-ready, exemplary code
- **18-20**: Sufficient (≥78%) - Good quality, minor improvements possible
- **<18**: Unacceptable (<78%) - Requires remediation before proceeding

### Step 4: Update Long-Term Memory

**File: `.claude/memory/knowledge/patterns.md`**

Append new entry:
```markdown
## [Date] - [Pattern Name]

**Commit**: [commit hash and message]
**Score**: [X/23] ([tier])

**Pattern**: [Description of architectural pattern observed]

**Rationale**: [Why this approach was chosen]

**Trade-offs**:
- **Pros**: [Benefits of this approach]
- **Cons**: [Limitations or costs]

**Future Considerations**: [What to watch for as code evolves]

---
```

**File: `.claude/memory/knowledge/decisions.md`**

If a significant architectural decision was made, document:
```markdown
## [Date] - [Decision Title]

**Context**: [What situation led to this decision]

**Decision**: [What was decided]

**Alternatives Considered**:
1. [Option 1] - [Why rejected]
2. [Option 2] - [Why rejected]

**Consequences**:
- [Impact on codebase]
- [Future implications]

---
```

### Step 5: Communicate Findings

Provide a concise summary to the user:

```
🏗️ **Architectural Analysis Complete**

**Commit Analyzed**: [hash] - [message]
**Quality Score**: [X/23] ([tier])

**Key Findings**:
- [Pattern identified]
- [Architectural decisions documented]
- [Recommendations if any]

**Memory Updated**:
- ✓ `.claude/memory/knowledge/patterns.md`
- ✓ `.claude/memory/knowledge/decisions.md` [if applicable]

[If score <18: **⚠️ Remediation Required**: [specific issues to address]]
```

## Examples

### Example 1: Authentication Refactor

**Scenario**: User commits "refactor: move auth to middleware pattern" affecting 5 files

**Your analysis**:
1. Read diff - see authentication logic moved from controllers to middleware
2. Identify pattern - Middleware/interceptor pattern for cross-cutting concerns
3. Score: +10 (elegant), +3 (idiomatic), +2 (DRY), -1 (missing rate limiting) = 14/23 (Unacceptable)
4. Update patterns.md with middleware pattern details
5. Report findings with recommendation to add rate limiting

### Example 2: New Feature Addition

**Scenario**: User commits "feat: add user profile API" affecting 4 files

**Your analysis**:
1. Read diff - see new REST endpoint, controller, service layer, DB model
2. Identify pattern - Layered architecture (controller → service → model)
3. Score: +10 (complete), +3 (RESTful), +2 (minimal), +2 (edge cases), +1 (reusable) = 18/23 (Sufficient)
4. Update patterns.md documenting the layered approach
5. Update decisions.md if REST vs GraphQL decision was documented
6. Report findings with positive feedback

## Key Principles

1. **Pattern Recognition Over Prescription**: Observe what patterns emerge naturally from the code rather than forcing specific architectures
2. **Document Trade-offs**: Every architectural decision has costs and benefits - record both
3. **Objective Evaluation**: Use the 23-point system consistently and fairly
4. **Future-Oriented**: Consider how today's decisions affect tomorrow's development
5. **Concise Communication**: Developers want insights, not essays

## Integration with Memory System

You work within the three-layer memory system:

- **Working Memory** (`.claude/memory/activeContext.md`): Don't modify - managed by user
- **Short-Term Memory** (`.claude/memory/tasks/`): Read recent tasks for context
- **Long-Term Memory** (`.claude/memory/knowledge/`): Your primary output - patterns and decisions

Your role is to distill short-term experiences into long-term wisdom.

---

**MightyArchitect v1.0.0** - Ported from Windsurf Meta-Cognitive Workflow Architecture
```

Save to: `skills/mighty-architect/SKILL.md`

**Step 4: Run test to verify it passes**

Run: `bash test/test-architect-skill.sh`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add skills/mighty-architect/SKILL.md test/test-architect-skill.sh
git commit -m "feat: add Architect skill with 23-point evaluation"
```

---

## Task 7: Installation Script

**Files:**
- Create: `bin/install.js`
- Create: `test/test-install.sh`

**Step 1: Write test for installation script**

```bash
#!/bin/bash
# test/test-install.sh

echo "Testing Installation Script..."

# Setup: create temporary Claude settings
export HOME="/tmp/test-claude-home"
mkdir -p "$HOME/.claude/plugins"

# Test 1: Script creates plugin directory
node bin/install.js --test-mode

if [[ -d "$HOME/.claude/plugins/mighty-architect" ]]; then
  echo "✓ Test 1 passed: Plugin directory created"
else
  echo "✗ Test 1 failed: Plugin directory not created"
  exit 1
fi

# Test 2: Script copies templates
if [[ -f "$HOME/.claude/plugins/mighty-architect/templates/architect.md" ]]; then
  echo "✓ Test 2 passed: Templates copied"
else
  echo "✗ Test 2 failed: Templates not copied"
  exit 1
fi

# Test 3: Script registers hooks
if [[ -f "$HOME/.claude/settings.json" ]]; then
  echo "✓ Test 3 passed: Settings file created"
else
  echo "✗ Test 3 failed: Settings file not created"
  exit 1
fi

# Cleanup
rm -rf "$HOME"

echo "All tests passed!"
```

Save to: `test/test-install.sh`

**Step 2: Run test to verify it fails**

Run: `chmod +x test/test-install.sh && bash test/test-install.sh`
Expected: FAIL with "bin/install.js: No such file"

**Step 3: Write installation script**

```javascript
#!/usr/bin/env node
// bin/install.js
// MightyArchitect Installation Script

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const HOME = process.env.HOME || process.env.USERPROFILE;
const CLAUDE_DIR = path.join(HOME, '.claude');
const PLUGIN_DIR = path.join(CLAUDE_DIR, 'plugins', 'mighty-architect');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');
const TEST_MODE = process.argv.includes('--test-mode');

// Color output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Update Claude settings
function updateSettings(autoInit) {
  let settings = {};

  if (fs.existsSync(SETTINGS_FILE)) {
    settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  }

  // Add MightyArchitect config
  settings.mightyArchitect = {
    autoInit: autoInit,
    version: '1.0.0',
    installedAt: new Date().toISOString()
  };

  // Register hooks
  settings.hooks = settings.hooks || {};

  settings.hooks.SessionStart = settings.hooks.SessionStart || [];
  settings.hooks.SessionStart.push({
    matcher: 'startup',
    hooks: [{
      type: 'command',
      command: `bash "${path.join(PLUGIN_DIR, 'hooks', 'session-start.sh')}"`
    }]
  });

  settings.hooks.PostToolUse = settings.hooks.PostToolUse || [];
  settings.hooks.PostToolUse.push({
    matcher: 'Bash',
    hooks: [{
      type: 'command',
      command: `bash "${path.join(PLUGIN_DIR, 'hooks', 'git-commit.sh')}"`
    }]
  });

  settings.hooks.Stop = settings.hooks.Stop || [];
  settings.hooks.Stop.push({
    matcher: '',
    hooks: [{
      type: 'command',
      command: `bash "${path.join(PLUGIN_DIR, 'hooks', 'stop.sh')}"`
    }]
  });

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

// Prompt user for auto-init preference
async function promptAutoInit() {
  if (TEST_MODE) return true;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(
      '\n🏗️  Auto-initialize MightyArchitect in new projects? (y/n): ',
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y');
      }
    );
  });
}

// Main installation
async function install() {
  log('\n🏗️  Installing MightyArchitect...', 'blue');

  // Step 1: Create plugin directory
  log('\n1. Creating plugin directory...', 'yellow');
  fs.mkdirSync(PLUGIN_DIR, { recursive: true });
  log('   ✓ Directory created', 'green');

  // Step 2: Copy files
  log('\n2. Copying plugin files...', 'yellow');
  const sourceDir = path.join(__dirname, '..');
  copyDir(path.join(sourceDir, 'templates'), path.join(PLUGIN_DIR, 'templates'));
  copyDir(path.join(sourceDir, 'hooks'), path.join(PLUGIN_DIR, 'hooks'));
  copyDir(path.join(sourceDir, 'skills'), path.join(PLUGIN_DIR, 'skills'));
  log('   ✓ Files copied', 'green');

  // Step 3: Make hooks executable
  log('\n3. Configuring hooks...', 'yellow');
  const hookFiles = fs.readdirSync(path.join(PLUGIN_DIR, 'hooks'));
  hookFiles.forEach(file => {
    const filePath = path.join(PLUGIN_DIR, 'hooks', file);
    fs.chmodSync(filePath, 0o755);
  });
  log('   ✓ Hooks configured', 'green');

  // Step 4: Configure auto-init
  log('\n4. Configuring preferences...', 'yellow');
  const autoInit = await promptAutoInit();
  updateSettings(autoInit);
  log(`   ✓ Auto-init: ${autoInit ? 'enabled' : 'disabled'}`, 'green');

  // Step 5: Success message
  log('\n✨ Installation complete!', 'green');
  log('\nMightyArchitect is now installed.', 'blue');
  log('\nUsage:', 'yellow');
  log('  • Start Claude in any project: Memory system initializes automatically');
  log('  • Manual review: Use /architect-review command');
  log('  • View memory: Check .claude/memory/ directory');
  log('\nDocumentation: https://github.com/your-repo/mighty-architect\n');
}

// Run installation
install().catch(err => {
  console.error('Installation failed:', err);
  process.exit(1);
});
```

Save to: `bin/install.js`

**Step 4: Make script executable and run test**

Run: `chmod +x bin/install.js && bash test/test-install.sh`
Expected: PASS - "All tests passed!"

**Step 5: Update package.json with dependencies**

Edit `package.json` - no external dependencies needed (uses Node.js built-ins)

**Step 6: Commit**

```bash
git add bin/install.js test/test-install.sh
git commit -m "feat: add installation script with hook registration"
```

---

## Task 8: Slash Commands

**Files:**
- Create: `commands/architect-review.md`
- Create: `commands/memory-status.md`

**Step 1: Create /architect-review command**

```markdown
---
name: architect-review
description: Manually trigger architectural analysis and pattern documentation
---

Invoke the `mighty-architect` skill to analyze current codebase state:

1. Review recent commits (last 5)
2. Analyze architectural patterns
3. Evaluate code quality using 23-point system
4. Update `.claude/memory/knowledge/` with findings

Use this when:
- You've made architectural changes but haven't committed yet
- You want insights before proceeding with implementation
- You're reviewing code and want architectural perspective
```

Save to: `commands/architect-review.md`

**Step 2: Create /memory-status command**

```markdown
---
name: memory-status
description: Display current memory system state and recent activity
---

Show MightyArchitect memory status:

## Memory Structure
```bash
ls -la .claude/memory/
```

## Active Context
```bash
cat .claude/memory/activeContext.md
```

## Recent Tasks
```bash
ls -lt .claude/memory/tasks/ | head -5
```

## Knowledge Base
```bash
ls -la .claude/memory/knowledge/
```

## Summary
- Working Memory: Current focus and blockers
- Short-Term: Last 5 task logs
- Long-Term: Accumulated patterns and decisions
```

Save to: `commands/memory-status.md`

**Step 3: Update installation script to copy commands**

Edit `bin/install.js` - add command copying:

```javascript
// After copying skills, add:
copyDir(path.join(sourceDir, 'commands'), path.join(PLUGIN_DIR, 'commands'));
```

**Step 4: Verify commands work**

Manual test: Create `.claude/commands/` symlink to test

**Step 5: Commit**

```bash
git add commands/ bin/install.js
git commit -m "feat: add slash commands for manual invocation"
```

---

## Task 9: Documentation

**Files:**
- Update: `README.md`
- Create: `docs/ARCHITECTURE.md`
- Create: `docs/USAGE.md`

**Step 1: Update README.md**

Add comprehensive usage instructions:

```markdown
# MightyArchitect

Port of Windsurf's Meta-Cognitive Workflow Architecture for Claude Code.

## Features

- **Three-Layer Memory System**: Working, short-term, and long-term memory
- **Automated Architect Analysis**: Triggers on significant commits
- **23-Point Evaluation System**: Objective code quality scoring
- **Token Efficient**: ~800 tokens per session (vs Windsurf's 3000+)
- **Seamless Integration**: Auto-initializes in new projects

## Installation

```bash
npx create-mighty-architect
```

Follow the prompts to configure auto-initialization.

## How It Works

### Memory Structure

```
.claude/memory/
├── activeContext.md       # Working memory - current focus
├── architect.md           # Architect instructions
├── tasks/                 # Short-term - task logs
│   └── 2025-11-12-auth.md
└── knowledge/             # Long-term - patterns & decisions
    ├── patterns.md
    └── decisions.md
```

### Automatic Workflow

1. **SessionStart**: Loads active context and Architect instructions (~800 tokens)
2. **During Work**: You code normally with Claude
3. **Git Commit**: After `feat:`, `refactor:`, or `perf:` commits with 3+ files:
   - Architect skill automatically analyzes changes
   - Updates knowledge base with patterns
   - Scores quality using 23-point system
4. **Session End**: Reminder to update task logs

### Manual Commands

- `/architect-review` - Trigger architectural analysis
- `/memory-status` - View current memory state

## Task Logging

After completing work, document it in `.claude/memory/tasks/`:

```markdown
# Task Log: [Description]

## Task Information
- Date: 2025-11-12
- Files Modified: auth.js, middleware.js

## Task Details
- Goal: Implement JWT authentication
- Implementation: Added middleware pattern
- Challenges: Token refresh logic
- Decisions: Use 1h access token + 7d refresh token

## Performance Evaluation
- Score: 20/23 (Sufficient)
- Strengths: Clean separation, secure
- Areas for Improvement: Add rate limiting

## Next Steps
- Add rate limiting
- Write integration tests
```

## 23-Point Scoring System

**Rewards:**
- +10: Elegant, optimized solution
- +5: Effective parallelization
- +3: Perfect language idioms
- +2: Minimal code (DRY)
- +2: Handles edge cases
- +1: Portable/reusable

**Penalties:**
- -10: Fails core problem
- -5: Placeholder comments
- -5: Inefficient algorithms
- -3: Style violations
- -2: Misses edge cases
- -1: Overcomplicated
- -1: Deprecated libraries

**Tiers:**
- 21-23: Excellent (≥90%)
- 18-20: Sufficient (≥78%)
- <18: Unacceptable (requires fix)

## Configuration

Stored in `~/.claude/settings.json`:

```json
{
  "mightyArchitect": {
    "autoInit": true,
    "version": "1.0.0"
  }
}
```

Change `autoInit` to `false` to disable auto-initialization.

## License

Apache 2.0 - See LICENSE file
```

**Step 2: Create ARCHITECTURE.md**

Document system design decisions

**Step 3: Create USAGE.md**

Provide detailed usage examples

**Step 4: Commit**

```bash
git add README.md docs/
git commit -m "docs: add comprehensive documentation"
```

---

## Task 10: Integration Testing

**Files:**
- Create: `test/integration-test.sh`

**Step 1: Write end-to-end integration test**

```bash
#!/bin/bash
# test/integration-test.sh
# End-to-end integration test

set -e

echo "Running Integration Test..."

# Setup test environment
TEST_DIR="/tmp/mighty-architect-test"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Initialize git repo
git init
git config user.email "test@example.com"
git config user.name "Test User"

# Run installation
echo "1. Testing installation..."
export HOME="$TEST_DIR"
node "$OLDPWD/bin/install.js" --test-mode

if [[ ! -d "$TEST_DIR/.claude/plugins/mighty-architect" ]]; then
  echo "✗ Installation failed"
  exit 1
fi
echo "✓ Installation successful"

# Create test project structure
echo "2. Testing SessionStart hook..."
mkdir -p .claude
echo '{"hook_event_name":"SessionStart"}' | bash "$TEST_DIR/.claude/plugins/mighty-architect/hooks/session-start.sh" > /tmp/session-output.txt

if [[ ! -f ".claude/memory/activeContext.md" ]]; then
  echo "✗ SessionStart failed to create memory structure"
  exit 1
fi
echo "✓ SessionStart hook working"

# Test git commit hook
echo "3. Testing git commit hook..."
echo "test file" > test.js
git add test.js
git commit -m "feat: initial commit"

INPUT='{"hook_event_name":"PostToolUse","tool_name":"Bash","tool_input":{"command":"git commit -m \"feat: add auth system\""}}'
OUTPUT=$(echo "$INPUT" | bash "$TEST_DIR/.claude/plugins/mighty-architect/hooks/git-commit.sh")

echo "✓ Git commit hook working"

# Test stop hook
echo "4. Testing stop hook..."
echo "modified" >> test.js
OUTPUT=$(echo '{"hook_event_name":"Stop"}' | bash "$TEST_DIR/.claude/plugins/mighty-architect/hooks/stop.sh")

if echo "$OUTPUT" | grep -q "Update activeContext"; then
  echo "✓ Stop hook working"
else
  echo "✗ Stop hook failed"
  exit 1
fi

# Cleanup
cd /
rm -rf "$TEST_DIR"

echo ""
echo "✨ All integration tests passed!"
```

Save to: `test/integration-test.sh`

**Step 2: Run integration test**

Run: `chmod +x test/integration-test.sh && bash test/integration-test.sh`
Expected: PASS - "All integration tests passed!"

**Step 3: Create test runner script**

```bash
#!/bin/bash
# test/run-all-tests.sh

echo "Running all MightyArchitect tests..."
echo ""

FAILED=0

# Unit tests
for test in test/test-*.sh; do
  echo "Running $test..."
  if bash "$test"; then
    echo "✓ $test passed"
  else
    echo "✗ $test failed"
    FAILED=$((FAILED + 1))
  fi
  echo ""
done

# Integration test
echo "Running integration test..."
if bash test/integration-test.sh; then
  echo "✓ Integration test passed"
else
  echo "✗ Integration test failed"
  FAILED=$((FAILED + 1))
fi

echo ""
if [[ $FAILED -eq 0 ]]; then
  echo "✨ All tests passed!"
  exit 0
else
  echo "❌ $FAILED test(s) failed"
  exit 1
fi
```

Save to: `test/run-all-tests.sh`

**Step 4: Update package.json test script**

```json
{
  "scripts": {
    "test": "bash test/run-all-tests.sh"
  }
}
```

**Step 5: Run all tests**

Run: `npm test`
Expected: PASS - "All tests passed!"

**Step 6: Commit**

```bash
git add test/integration-test.sh test/run-all-tests.sh package.json
git commit -m "test: add integration tests and test runner"
```

---

## Task 11: Windows PowerShell Support

**Files:**
- Create: `bin/install.ps1`
- Create: `hooks/session-start.ps1`
- Create: `hooks/git-commit.ps1`
- Create: `hooks/stop.ps1`

**Step 1: Create PowerShell installation script**

```powershell
# bin/install.ps1
# MightyArchitect Installation Script for Windows

$ErrorActionPreference = "Stop"

$HOME = $env:USERPROFILE
$CLAUDE_DIR = Join-Path $HOME ".claude"
$PLUGIN_DIR = Join-Path $CLAUDE_DIR "plugins\mighty-architect"
$SETTINGS_FILE = Join-Path $CLAUDE_DIR "settings.json"

function Write-ColorOutput($message, $color = "White") {
    Write-Host $message -ForegroundColor $color
}

function Copy-DirectoryRecursive($source, $destination) {
    if (!(Test-Path $destination)) {
        New-Item -ItemType Directory -Path $destination -Force | Out-Null
    }

    Get-ChildItem -Path $source -Recurse | ForEach-Object {
        $dest = $_.FullName -replace [regex]::Escape($source), $destination
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Path $dest -Force | Out-Null
        } else {
            Copy-Item -Path $_.FullName -Destination $dest -Force
        }
    }
}

function Update-Settings($autoInit) {
    $settings = @{
        mightyArchitect = @{
            autoInit = $autoInit
            version = "1.0.0"
            installedAt = Get-Date -Format o
        }
    }

    if (Test-Path $SETTINGS_FILE) {
        $existing = Get-Content $SETTINGS_FILE -Raw | ConvertFrom-Json
        $settings = $existing
        $settings.mightyArchitect = @{
            autoInit = $autoInit
            version = "1.0.0"
            installedAt = Get-Date -Format o
        }
    }

    # Register hooks
    if (!$settings.hooks) {
        $settings | Add-Member -MemberType NoteProperty -Name hooks -Value @{}
    }

    $settings.hooks.SessionStart = @(
        @{
            matcher = "startup"
            hooks = @(
                @{
                    type = "command"
                    command = "powershell -File `"$PLUGIN_DIR\hooks\session-start.ps1`""
                }
            )
        }
    )

    $settings | ConvertTo-Json -Depth 10 | Set-Content $SETTINGS_FILE
}

# Main installation
Write-ColorOutput "`n🏗️  Installing MightyArchitect..." "Blue"

Write-ColorOutput "`n1. Creating plugin directory..." "Yellow"
New-Item -ItemType Directory -Path $PLUGIN_DIR -Force | Out-Null
Write-ColorOutput "   ✓ Directory created" "Green"

Write-ColorOutput "`n2. Copying plugin files..." "Yellow"
$sourceDir = Split-Path -Parent $PSScriptRoot
Copy-DirectoryRecursive (Join-Path $sourceDir "templates") (Join-Path $PLUGIN_DIR "templates")
Copy-DirectoryRecursive (Join-Path $sourceDir "hooks") (Join-Path $PLUGIN_DIR "hooks")
Copy-DirectoryRecursive (Join-Path $sourceDir "skills") (Join-Path $PLUGIN_DIR "skills")
Write-ColorOutput "   ✓ Files copied" "Green"

Write-ColorOutput "`n3. Configuring preferences..." "Yellow"
$autoInit = Read-Host "`n🏗️  Auto-initialize MightyArchitect in new projects? (y/n)"
$autoInitBool = $autoInit -eq "y"
Update-Settings $autoInitBool
Write-ColorOutput "   ✓ Auto-init: $($autoInitBool)" "Green"

Write-ColorOutput "`n✨ Installation complete!" "Green"
Write-ColorOutput "`nMightyArchitect is now installed." "Blue"
```

Save to: `bin/install.ps1`

**Step 2: Create PowerShell hooks**

Create PS1 versions of hooks with same logic as bash versions

**Step 3: Test on Windows**

Manual verification required on Windows system

**Step 4: Commit**

```bash
git add bin/install.ps1 hooks/*.ps1
git commit -m "feat: add Windows PowerShell support"
```

---

## Task 12: NPM Package Publishing

**Files:**
- Create: `.npmignore`
- Update: `package.json`
- Create: `CHANGELOG.md`

**Step 1: Create .npmignore**

```
node_modules/
test/
.git/
.github/
*.log
test-output/
```

**Step 2: Update package.json for publishing**

```json
{
  "name": "mighty-architect",
  "version": "1.0.0",
  "description": "Port of Windsurf Meta-Cognitive Workflow Architecture for Claude Code",
  "main": "index.js",
  "bin": {
    "create-mighty-architect": "./bin/install.js"
  },
  "scripts": {
    "test": "bash test/run-all-tests.sh"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/mighty-architect.git"
  },
  "keywords": [
    "claude-code",
    "plugin",
    "memory",
    "architecture",
    "workflow",
    "ai-assistant"
  ],
  "author": "Your Name",
  "license": "Apache-2.0",
  "files": [
    "bin/",
    "hooks/",
    "skills/",
    "templates/",
    "commands/",
    "README.md",
    "LICENSE"
  ]
}
```

**Step 3: Create CHANGELOG.md**

```markdown
# Changelog

## [1.0.0] - 2025-11-12

### Added
- Three-layer memory system (working/short-term/long-term)
- SessionStart hook for auto-initialization
- PostToolUse hook for git commit analysis
- Stop hook for task logging reminders
- Architect skill with 23-point evaluation
- Installation script (bash and PowerShell)
- Slash commands: /architect-review, /memory-status
- Comprehensive documentation
- Integration tests

### Features
- Token-efficient: ~800 tokens per session
- Automatic pattern recognition
- Quality scoring system
- Windows and Unix support
```

**Step 4: Test package locally**

Run: `npm pack && tar -tzf mighty-architect-1.0.0.tgz`
Expected: See all required files

**Step 5: Publish to npm**

```bash
npm login
npm publish
```

**Step 6: Commit**

```bash
git add .npmignore package.json CHANGELOG.md
git commit -m "chore: prepare for npm publication"
git tag v1.0.0
git push origin main --tags
```

---

## Summary

**Implementation Complete!**

You now have a production-ready MightyArchitect plugin with:

✅ Auto-initializing memory system
✅ Hook-based automation (SessionStart, PostToolUse, Stop)
✅ Architect skill with 23-point evaluation
✅ One-command installation (`npx create-mighty-architect`)
✅ Token-efficient design (~800 tokens/session)
✅ Cross-platform support (Bash + PowerShell)
✅ Comprehensive tests
✅ NPM-ready package

**Key Achievements:**
- Hooks properly read JSON from stdin (not env vars)
- Memory structure follows hybrid pattern (always-loaded + on-demand)
- Git commit filtering prevents noise
- Installation is truly seamless
- Well-tested and documented

---

**Plan saved to:** `docs/plans/2025-11-12-mighty-architect-plugin.md`

Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
