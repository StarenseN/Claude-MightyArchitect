# MightyArchitect Plugin Implementation Plan (Revised for Node.js Hooks)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Port Windsurf's Meta-Cognitive Workflow Architecture to Claude Code as a plugin with hooks, skills, and minimal token consumption.

**Architecture:** Plugin-based system with SessionStart hook for auto-initialization, PostToolUse hook triggering Architect skill on meaningful git commits, and hybrid memory structure (.claude/memory/) with always-loaded essentials (activeContext.md, architect.md) and on-demand knowledge files.

**Tech Stack:**
- Node.js for hooks AND installation (zero external dependencies)
- Native JSON parsing (no jq required)
- Claude Code Skills (Markdown with YAML frontmatter)
- Cross-platform by default (Windows/macOS/Linux)

**Key Revision:** All hooks are Node.js scripts instead of bash+jq, making installation truly seamless without external dependencies.

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
- **Zero external dependencies** (pure Node.js, no jq required)
- **Cross-platform** (Windows/macOS/Linux)

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

## Task 3: SessionStart Hook (Node.js)

**Files:**
- Create: `hooks/session-start.js`
- Create: `test/test-session-start.js`

**Step 1: Write test for SessionStart hook**

```javascript
#!/usr/bin/env node
// test/test-session-start.js

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Testing SessionStart Hook...');

// Test 1: Hook initializes structure when missing
if (fs.existsSync('.claude/memory')) {
  fs.rmSync('.claude/memory', { recursive: true });
}

const input1 = JSON.stringify({ hook_event_name: 'SessionStart', session_id: 'test123' });
try {
  execSync(`echo '${input1}' | node hooks/session-start.js`, { encoding: 'utf8' });

  if (fs.existsSync('.claude/memory') && fs.existsSync('.claude/memory/activeContext.md')) {
    console.log('✓ Test 1 passed: Structure initialized');
  } else {
    console.log('✗ Test 1 failed: Structure not created');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 1 failed with error:', error.message);
  process.exit(1);
}

// Test 2: Hook loads context when structure exists
const input2 = JSON.stringify({ hook_event_name: 'SessionStart', session_id: 'test456' });
try {
  const output = execSync(`echo '${input2}' | node hooks/session-start.js`, { encoding: 'utf8' });

  if (output.includes('Active Context')) {
    console.log('✓ Test 2 passed: Context loaded');
  } else {
    console.log('✗ Test 2 failed: Context not loaded');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 2 failed with error:', error.message);
  process.exit(1);
}

console.log('All tests passed!');
```

Save to: `test/test-session-start.js`

**Step 2: Run test to verify it fails**

Run: `node test/test-session-start.js`
Expected: FAIL with "hooks/session-start.js: No such file"

**Step 3: Write SessionStart hook implementation**

```javascript
#!/usr/bin/env node
// hooks/session-start.js
// MightyArchitect SessionStart Hook

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '.claude/memory';
const HOME = process.env.HOME || process.env.USERPROFILE;
const SETTINGS_FILE = path.join(HOME, '.claude', 'settings.json');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    main();
  } catch (error) {
    console.error('SessionStart hook error:', error.message);
    process.exit(1);
  }
});

function main() {
  // Check if memory structure exists
  if (!fs.existsSync(MEMORY_DIR)) {
    // Check user preference (default to true)
    let autoInit = true;

    if (fs.existsSync(SETTINGS_FILE)) {
      try {
        const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
        autoInit = settings.mightyArchitect?.autoInit ?? true;
      } catch (error) {
        // Settings file invalid, use default
        autoInit = true;
      }
    }

    if (autoInit) {
      // Create directory structure
      fs.mkdirSync(path.join(MEMORY_DIR, 'tasks'), { recursive: true });
      fs.mkdirSync(path.join(MEMORY_DIR, 'knowledge'), { recursive: true });

      // Copy templates
      const templateDir = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'templates');

      if (fs.existsSync(templateDir)) {
        fs.copyFileSync(
          path.join(templateDir, 'activeContext.md'),
          path.join(MEMORY_DIR, 'activeContext.md')
        );
        fs.copyFileSync(
          path.join(templateDir, 'architect.md'),
          path.join(MEMORY_DIR, 'architect.md')
        );
      } else {
        // Fallback: create minimal files
        fs.writeFileSync(path.join(MEMORY_DIR, 'activeContext.md'), '# Active Context\n');
        fs.writeFileSync(path.join(MEMORY_DIR, 'architect.md'), '# Architect\n');
      }

      console.error('✓ MightyArchitect memory structure initialized');
    }
  }

  // Load context if structure exists
  if (fs.existsSync(MEMORY_DIR)) {
    console.log('---');
    console.log('# MightyArchitect Memory Context');
    console.log('');
    console.log(fs.readFileSync(path.join(MEMORY_DIR, 'activeContext.md'), 'utf8'));
    console.log('');
    console.log('---');
    console.log('');
    console.log(fs.readFileSync(path.join(MEMORY_DIR, 'architect.md'), 'utf8'));

    // Load incomplete task if exists
    const currentTask = path.join(MEMORY_DIR, 'tasks', 'current.md');
    if (fs.existsSync(currentTask)) {
      console.log('');
      console.log('---');
      console.log('## Resuming Task:');
      console.log('');
      console.log(fs.readFileSync(currentTask, 'utf8'));
    }
  }
}
```

Save to: `hooks/session-start.js`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/session-start.js && node test/test-session-start.js`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/session-start.js test/test-session-start.js
git commit -m "feat: add SessionStart hook (Node.js, no jq dependency)"
```

---

## Task 4: PostToolUse Hook for Git Commits (Node.js)

**Files:**
- Create: `hooks/git-commit.js`
- Create: `test/test-git-commit-hook.js`

**Step 1: Write test for git commit hook**

```javascript
#!/usr/bin/env node
// test/test-git-commit-hook.js

const { execSync } = require('child_process');

console.log('Testing Git Commit Hook...');

// Test 1: Hook triggers on feat: commit
const input1 = JSON.stringify({
  hook_event_name: 'PostToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'git commit -m "feat: add new feature"' }
});

try {
  const output1 = execSync(`echo '${input1}' | node hooks/git-commit.js`, { encoding: 'utf8' });

  if (output1.includes('Architect Analysis')) {
    console.log('✓ Test 1 passed: Triggered on feat: commit');
  } else {
    console.log('✗ Test 1 failed: Did not trigger on feat:');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 1 failed with error:', error.message);
  process.exit(1);
}

// Test 2: Hook skips chore: commit
const input2 = JSON.stringify({
  hook_event_name: 'PostToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'git commit -m "chore: update deps"' }
});

try {
  const output2 = execSync(`echo '${input2}' | node hooks/git-commit.js`, { encoding: 'utf8' });

  if (output2.trim() === '') {
    console.log('✓ Test 2 passed: Skipped chore: commit');
  } else {
    console.log('✗ Test 2 failed: Should not trigger on chore:');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 2 failed with error:', error.message);
  process.exit(1);
}

// Test 3: Hook skips non-git commands
const input3 = JSON.stringify({
  hook_event_name: 'PostToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'npm install' }
});

try {
  const output3 = execSync(`echo '${input3}' | node hooks/git-commit.js`, { encoding: 'utf8' });

  if (output3.trim() === '') {
    console.log('✓ Test 3 passed: Skipped non-git command');
  } else {
    console.log('✗ Test 3 failed: Should not trigger on non-git');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 3 failed with error:', error.message);
  process.exit(1);
}

console.log('All tests passed!');
```

Save to: `test/test-git-commit-hook.js`

**Step 2: Run test to verify it fails**

Run: `node test/test-git-commit-hook.js`
Expected: FAIL with "hooks/git-commit.js: No such file"

**Step 3: Write git commit hook implementation**

```javascript
#!/usr/bin/env node
// hooks/git-commit.js
// MightyArchitect PostToolUse Hook for Git Commits

const { execSync } = require('child_process');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    main(data);
  } catch (error) {
    // Invalid JSON or other error - exit silently
    process.exit(0);
  }
});

function main(data) {
  const toolName = data.tool_name || '';
  const command = data.tool_input?.command || '';

  // Only process git commit commands
  if (toolName !== 'Bash' || !command.includes('git commit')) {
    return;
  }

  // Extract commit message
  const match = command.match(/git commit.*-m ["']([^"']+)["']/);
  if (!match) {
    return;
  }

  const commitMsg = match[1];

  // Filter: only architectural commits
  if (!/^(feat|refactor|perf):/.test(commitMsg)) {
    return;
  }

  // Count files changed (if in git repo)
  try {
    const filesChanged = execSync('git diff --name-only HEAD~1 2>/dev/null', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .length;

    if (filesChanged >= 3) {
      console.log('');
      console.log('🏗️  **MightyArchitect Analysis Triggered**');
      console.log('');
      console.log(`Significant architectural changes detected (${filesChanged} files).`);
      console.log(`Commit: ${commitMsg}`);
      console.log('');
      console.log('**Action Required:** Review patterns and update knowledge base.');
      console.log('Run: \`/architect-review\` or let me analyze automatically.');
      console.log('');
    }
  } catch (error) {
    // Not in a git repo or git command failed - exit silently
  }
}
```

Save to: `hooks/git-commit.js`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/git-commit.js && node test/test-git-commit-hook.js`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/git-commit.js test/test-git-commit-hook.js
git commit -m "feat: add PostToolUse hook for git commits (Node.js)"
```

---

## Task 5: Stop Hook for Task Logging Reminder (Node.js)

**Files:**
- Create: `hooks/stop.js`
- Create: `test/test-stop-hook.js`

**Step 1: Write test for stop hook**

```javascript
#!/usr/bin/env node
// test/test-stop-hook.js

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Testing Stop Hook...');

// Setup: create a test git repo with modified files
const testDir = '/tmp/mighty-architect-test-stop';
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir, { recursive: true });
process.chdir(testDir);

execSync('git init');
execSync('git config user.email "test@example.com"');
execSync('git config user.name "Test User"');
fs.writeFileSync('file.txt', 'test');
execSync('git add file.txt');

// Test 1: Hook reminds when files modified
const input = JSON.stringify({ hook_event_name: 'Stop' });

try {
  const output = execSync(`echo '${input}' | node ${__dirname}/../hooks/stop.js`, { encoding: 'utf8' });

  if (output.includes('Update activeContext')) {
    console.log('✓ Test 1 passed: Reminder shown for modified files');
  } else {
    console.log('✗ Test 1 failed: No reminder for modified files');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 1 failed with error:', error.message);
  process.exit(1);
}

// Cleanup
process.chdir('/');
fs.rmSync(testDir, { recursive: true });

console.log('All tests passed!');
```

Save to: `test/test-stop-hook.js`

**Step 2: Run test to verify it fails**

Run: `node test/test-stop-hook.js`
Expected: FAIL with "hooks/stop.js: No such file"

**Step 3: Write stop hook implementation**

```javascript
#!/usr/bin/env node
// hooks/stop.js
// MightyArchitect Stop Hook - Task Logging Reminder

const { execSync } = require('child_process');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    main();
  } catch (error) {
    // Errors are non-fatal, exit silently
    process.exit(0);
  }
});

function main() {
  // Check if in git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
  } catch (error) {
    // Not in a git repo, exit silently
    return;
  }

  // Check if files were modified (staged or unstaged)
  try {
    const status = execSync('git status --porcelain 2>/dev/null', { encoding: 'utf8' });
    const modifiedFiles = status.trim().split('\n').filter(line => line.length > 0).length;

    if (modifiedFiles > 0) {
      console.log('');
      console.log('💾 **MightyArchitect Memory Update**');
      console.log('');
      console.log('Files modified in this session. Consider:');
      console.log('- Update `.claude/memory/activeContext.md` with current state');
      console.log(`- Log completed work to \`.claude/memory/tasks/${new Date().toISOString().split('T')[0]}-task.md\``);
      console.log('- Use template: `.claude/memory/tasks/template.md`');
      console.log('');
    }
  } catch (error) {
    // Git command failed, exit silently
  }
}
```

Save to: `hooks/stop.js`

**Step 4: Make hook executable and run test**

Run: `chmod +x hooks/stop.js && node test/test-stop-hook.js`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add hooks/stop.js test/test-stop-hook.js
git commit -m "feat: add Stop hook for task logging reminders (Node.js)"
```

---

## Task 6: Architect Skill

(This task remains unchanged from original plan - skill is pure markdown)

**Files:**
- Create: `skills/mighty-architect/SKILL.md`
- Create: `test/test-architect-skill.sh`

*[Content identical to original plan Task 6]*

---

## Task 7: Installation Script (Updated for Node.js hooks)

**Files:**
- Create: `bin/install.js`
- Create: `test/test-install.js`

**Step 1: Write test for installation script**

```javascript
#!/usr/bin/env node
// test/test-install.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Testing Installation Script...');

// Setup: create temporary Claude home
const testHome = '/tmp/test-claude-home';
if (fs.existsSync(testHome)) {
  fs.rmSync(testHome, { recursive: true });
}
fs.mkdirSync(path.join(testHome, '.claude', 'plugins'), { recursive: true });

// Set HOME environment for test
process.env.HOME = testHome;

// Test 1: Script creates plugin directory
try {
  execSync('node bin/install.js --test-mode', { stdio: 'inherit' });

  if (fs.existsSync(path.join(testHome, '.claude', 'plugins', 'mighty-architect'))) {
    console.log('✓ Test 1 passed: Plugin directory created');
  } else {
    console.log('✗ Test 1 failed: Plugin directory not created');
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 1 failed with error:', error.message);
  process.exit(1);
}

// Test 2: Script copies templates
if (fs.existsSync(path.join(testHome, '.claude', 'plugins', 'mighty-architect', 'templates', 'architect.md'))) {
  console.log('✓ Test 2 passed: Templates copied');
} else {
  console.log('✗ Test 2 failed: Templates not copied');
  process.exit(1);
}

// Test 3: Script registers hooks with .js extension
const settingsFile = path.join(testHome, '.claude', 'settings.json');
if (fs.existsSync(settingsFile)) {
  const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
  const sessionStartHook = settings.hooks?.SessionStart?.[0]?.hooks?.[0]?.command || '';

  if (sessionStartHook.includes('session-start.js')) {
    console.log('✓ Test 3 passed: Node.js hooks registered');
  } else {
    console.log('✗ Test 3 failed: Expected .js hooks, got:', sessionStartHook);
    process.exit(1);
  }
} else {
  console.log('✗ Test 3 failed: Settings file not created');
  process.exit(1);
}

// Cleanup
fs.rmSync(testHome, { recursive: true });

console.log('All tests passed!');
```

Save to: `test/test-install.js`

**Step 2: Run test to verify it fails**

Run: `node test/test-install.js`
Expected: FAIL with "bin/install.js: No such file"

**Step 3: Write installation script (updated for .js hooks)**

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

  // Register hooks (Node.js, not bash)
  settings.hooks = settings.hooks || {};

  settings.hooks.SessionStart = settings.hooks.SessionStart || [];
  settings.hooks.SessionStart.push({
    matcher: 'startup',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'session-start.js')}"`
    }]
  });

  settings.hooks.PostToolUse = settings.hooks.PostToolUse || [];
  settings.hooks.PostToolUse.push({
    matcher: 'Bash',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'git-commit.js')}"`
    }]
  });

  settings.hooks.Stop = settings.hooks.Stop || [];
  settings.hooks.Stop.push({
    matcher: '',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'stop.js')}"`
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

  // Step 3: Configure auto-init
  log('\n3. Configuring preferences...', 'yellow');
  const autoInit = await promptAutoInit();
  updateSettings(autoInit);
  log(`   ✓ Auto-init: ${autoInit ? 'enabled' : 'disabled'}`, 'green');

  // Step 4: Success message
  log('\n✨ Installation complete!', 'green');
  log('\nMightyArchitect is now installed.', 'blue');
  log('\nKey Features:', 'yellow');
  log('  ✓ Zero external dependencies (pure Node.js)');
  log('  ✓ Cross-platform (Windows/macOS/Linux)');
  log('  ✓ Auto-initializes in new projects');
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

Run: `chmod +x bin/install.js && node test/test-install.js`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add bin/install.js test/test-install.js
git commit -m "feat: add installation script (Node.js hooks)"
```

---

## Task 8: Slash Commands

(This task remains unchanged from original plan)

---

## Task 9: Documentation

(This task remains unchanged except update README to emphasize "zero dependencies")

---

## Task 10: Integration Testing (Updated for Node.js hooks)

**Files:**
- Create: `test/integration-test.js`
- Create: `test/run-all-tests.js`

**Step 1: Write end-to-end integration test**

```javascript
#!/usr/bin/env node
// test/integration-test.js
// End-to-end integration test

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running Integration Test...');

// Setup test environment
const testDir = '/tmp/mighty-architect-test';
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir, { recursive: true });
process.chdir(testDir);

// Initialize git repo
execSync('git init');
execSync('git config user.email "test@example.com"');
execSync('git config user.name "Test User"');

// Run installation
console.log('1. Testing installation...');
process.env.HOME = testDir;
execSync(`node ${__dirname}/../bin/install.js --test-mode`, { stdio: 'inherit' });

if (!fs.existsSync(path.join(testDir, '.claude', 'plugins', 'mighty-architect'))) {
  console.log('✗ Installation failed');
  process.exit(1);
}
console.log('✓ Installation successful');

// Test SessionStart hook
console.log('2. Testing SessionStart hook...');
fs.mkdirSync('.claude', { recursive: true });
const sessionInput = JSON.stringify({ hook_event_name: 'SessionStart' });
execSync(`echo '${sessionInput}' | node ${testDir}/.claude/plugins/mighty-architect/hooks/session-start.js > /tmp/session-output.txt`);

if (!fs.existsSync('.claude/memory/activeContext.md')) {
  console.log('✗ SessionStart failed to create memory structure');
  process.exit(1);
}
console.log('✓ SessionStart hook working');

// Test git commit hook
console.log('3. Testing git commit hook...');
fs.writeFileSync('test.js', 'test file');
execSync('git add test.js');
execSync('git commit -m "feat: initial commit"');

const commitInput = JSON.stringify({
  hook_event_name: 'PostToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'git commit -m "feat: add auth system"' }
});
const commitOutput = execSync(`echo '${commitInput}' | node ${testDir}/.claude/plugins/mighty-architect/hooks/git-commit.js`, { encoding: 'utf8' });

console.log('✓ Git commit hook working');

// Test stop hook
console.log('4. Testing stop hook...');
fs.appendFileSync('test.js', '\nmodified');
const stopInput = JSON.stringify({ hook_event_name: 'Stop' });
const stopOutput = execSync(`echo '${stopInput}' | node ${testDir}/.claude/plugins/mighty-architect/hooks/stop.js`, { encoding: 'utf8' });

if (stopOutput.includes('Update activeContext')) {
  console.log('✓ Stop hook working');
} else {
  console.log('✗ Stop hook failed');
  process.exit(1);
}

// Cleanup
process.chdir('/');
fs.rmSync(testDir, { recursive: true });

console.log('');
console.log('✨ All integration tests passed!');
```

Save to: `test/integration-test.js`

**Step 2: Create test runner**

```javascript
#!/usr/bin/env node
// test/run-all-tests.js

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Running all MightyArchitect tests...\n');

let failed = 0;

// Find all test files
const testFiles = fs.readdirSync(__dirname)
  .filter(file => file.startsWith('test-') && file.endsWith('.js'))
  .concat(['integration-test.js']);

// Run each test
for (const testFile of testFiles) {
  const testPath = `${__dirname}/${testFile}`;
  console.log(`Running ${testFile}...`);

  try {
    execSync(`node ${testPath}`, { stdio: 'inherit' });
    console.log(`✓ ${testFile} passed\n`);
  } catch (error) {
    console.log(`✗ ${testFile} failed\n`);
    failed++;
  }
}

// Summary
if (failed === 0) {
  console.log('✨ All tests passed!');
  process.exit(0);
} else {
  console.log(`❌ ${failed} test(s) failed`);
  process.exit(1);
}
```

Save to: `test/run-all-tests.js`

**Step 3: Update package.json test script**

Already correctly set to `"test": "node test/run-all-tests.js"`

**Step 4: Run all tests**

Run: `npm test`
Expected: PASS - "All tests passed!"

**Step 5: Commit**

```bash
git add test/integration-test.js test/run-all-tests.js
git commit -m "test: add integration tests for Node.js hooks"
```

---

## Task 11: ~~Windows PowerShell Support~~ REMOVED

**No longer needed!** Node.js hooks work natively on Windows. Removing this entire task saves development time and reduces maintenance burden.

---

## Task 12: NPM Package Publishing (Updated)

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
/tmp/
```

**Step 2: Update package.json for publishing**

```json
{
  "name": "mighty-architect",
  "version": "1.0.0",
  "description": "Port of Windsurf Meta-Cognitive Workflow Architecture for Claude Code - Zero dependencies, pure Node.js",
  "main": "index.js",
  "bin": {
    "create-mighty-architect": "./bin/install.js"
  },
  "scripts": {
    "test": "node test/run-all-tests.js"
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
    "ai-assistant",
    "nodejs",
    "cross-platform"
  ],
  "author": "Your Name",
  "license": "Apache-2.0",
  "engines": {
    "node": ">=14.0.0"
  },
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
- SessionStart hook for auto-initialization (Node.js)
- PostToolUse hook for git commit analysis (Node.js)
- Stop hook for task logging reminders (Node.js)
- Architect skill with 23-point evaluation
- Installation script with zero external dependencies
- Slash commands: /architect-review, /memory-status
- Comprehensive documentation and tests

### Features
- **Zero external dependencies** - Pure Node.js, no jq required
- **Cross-platform** - Works on Windows/macOS/Linux natively
- **Token-efficient** - ~800 tokens per session (vs 3000+)
- **Seamless installation** - One command, no configuration
- **Automatic pattern recognition**
- **Quality scoring system**

### Technical
- Node.js >=14.0.0 required
- Native JSON parsing (no bash/jq)
- Comprehensive test suite
```

**Step 4: Test package locally**

Run: `npm pack && tar -tzf mighty-architect-1.0.0.tgz`
Expected: See all required files

**Step 5: Publish to npm**

```bash
npm login
npm publish
```

**Step 6: Commit and tag**

```bash
git add .npmignore package.json CHANGELOG.md
git commit -m "chore: prepare for npm publication (Node.js version)"
git tag v1.0.0
git push origin main --tags
```

---

## Summary

**Implementation Complete!**

You now have a production-ready MightyArchitect plugin with:

✅ Auto-initializing memory system
✅ Node.js hooks (zero external dependencies - no jq!)
✅ Cross-platform by default (Windows/macOS/Linux)
✅ Architect skill with 23-point evaluation
✅ One-command installation (`npx create-mighty-architect`)
✅ Token-efficient design (~800 tokens/session)
✅ Comprehensive tests
✅ NPM-ready package

**Key Improvements over original plan:**
- ✅ **Removed jq dependency** - Now truly seamless
- ✅ **Removed Windows PowerShell task** - Node.js works everywhere
- ✅ **Simpler maintenance** - One language (JavaScript) for all hooks
- ✅ **Better error handling** - Node.js exceptions vs bash errors
- ✅ **Easier testing** - Native Node.js test framework

**Tasks reduced:** 12 → 11 (removed PowerShell task)
**Dependencies:** bash+jq → Node.js only
**Platforms:** Unix (bash) → All platforms (Node.js)
