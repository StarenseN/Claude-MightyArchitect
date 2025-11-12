#!/usr/bin/env node
// test/test-todowrite-hook.js
// Test TodoWrite PreToolUse hook logic

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MEMORY_DIR = '.claude/memory';
const TASKS_DIR = path.join(MEMORY_DIR, 'tasks');
const HOOK_PATH = 'hooks/pre-tool-use-todowrite.js';

console.log('🧪 Testing TodoWrite Hook Logic\n');

// Setup test environment
function setupTestEnv() {
  console.log('📦 Setting up test environment...');

  // Create memory structure
  if (!fs.existsSync(TASKS_DIR)) {
    fs.mkdirSync(TASKS_DIR, { recursive: true });
  }

  // Clean previous test files
  const testFiles = fs.readdirSync(TASKS_DIR).filter(f => f.includes('test-'));
  testFiles.forEach(f => fs.unlinkSync(path.join(TASKS_DIR, f)));

  console.log('✓ Test environment ready\n');
}

// Test 1: Single todo completion
function testSingleTodo() {
  console.log('Test 1: Single Todo Completion');
  console.log('─'.repeat(50));

  const prevState = [];
  const newState = [
    {
      content: "Fix login bug",
      status: "completed",
      activeForm: "Fixing login bug"
    }
  ];

  const hookInput = {
    tool_name: "TodoWrite",
    tool_input: { todos: newState }
  };

  console.log('Input:', JSON.stringify(newState, null, 2));

  // Simulate hook execution
  try {
    // Write JSON to temp file (Windows echo doesn't handle JSON properly)
    const tempFile = path.join(MEMORY_DIR, '.test-input.json');
    fs.writeFileSync(tempFile, JSON.stringify(hookInput));

    const result = execSync(`type "${tempFile}" | node "${HOOK_PATH}" 2>&1`, {
      encoding: 'utf8'
    });

    fs.unlinkSync(tempFile);

    console.log('Hook output:', result || '(silent success)');

    // Check if task log was created
    const taskFiles = fs.readdirSync(TASKS_DIR).filter(f => f.includes('fix-login-bug'));

    if (taskFiles.length > 0) {
      console.log('✅ PASS: Task log created:', taskFiles[0]);

      const content = fs.readFileSync(path.join(TASKS_DIR, taskFiles[0]), 'utf8');
      console.log('\nTask log preview:');
      console.log(content.split('\n').slice(0, 15).join('\n'));
      console.log('...\n');
    } else {
      console.log('❌ FAIL: No task log created');
    }
  } catch (error) {
    console.log('⚠️  Hook execution error:', error.message);
    console.log('stderr:', error.stderr?.toString());
  }

  console.log('');
}

// Test 2: Thematic batch completion
function testThematicBatch() {
  console.log('Test 2: Thematic Batch Completion');
  console.log('─'.repeat(50));

  const prevState = [
    {
      content: "Create user model with password hashing",
      status: "in_progress",
      activeForm: "Creating user model"
    },
    {
      content: "Add JWT token generation",
      status: "pending",
      activeForm: "Adding JWT token generation"
    },
    {
      content: "Implement auth middleware",
      status: "pending",
      activeForm: "Implementing auth middleware"
    }
  ];

  const newState = [
    {
      content: "Create user model with password hashing",
      status: "completed",
      activeForm: "Creating user model"
    },
    {
      content: "Add JWT token generation",
      status: "completed",
      activeForm: "Adding JWT token generation"
    },
    {
      content: "Implement auth middleware",
      status: "completed",
      activeForm: "Implementing auth middleware"
    }
  ];

  // Save previous state
  fs.writeFileSync(
    path.join(MEMORY_DIR, '.todo-state.json'),
    JSON.stringify(prevState, null, 2)
  );

  const hookInput = {
    tool_name: "TodoWrite",
    tool_input: { todos: newState }
  };

  console.log('Previous state: 3 todos (1 in_progress, 2 pending)');
  console.log('New state: 3 todos (all completed)');
  console.log('Expected: 1 task log for theme "JWT Authentication"\n');

  try {
    // Write JSON to temp file (Windows echo doesn't handle JSON properly)
    const tempFile = path.join(MEMORY_DIR, '.test-input.json');
    fs.writeFileSync(tempFile, JSON.stringify(hookInput));

    const result = execSync(`type "${tempFile}" | node "${HOOK_PATH}" 2>&1`, {
      encoding: 'utf8'
    });

    fs.unlinkSync(tempFile);

    console.log('Hook output:', result || '(silent success)');

    // Check if task log was created
    const taskFiles = fs.readdirSync(TASKS_DIR).filter(f =>
      f.includes('user-model') ||
      f.includes('jwt') ||
      f.includes('auth')
    );

    if (taskFiles.length > 0) {
      console.log('✅ PASS: Task log created:', taskFiles[0]);

      const content = fs.readFileSync(path.join(TASKS_DIR, taskFiles[0]), 'utf8');

      // Check if it's a thematic batch (should have 3 todos)
      const todoCount = (content.match(/- \[x\]/g) || []).length;
      if (todoCount === 3) {
        console.log('✅ PASS: Contains all 3 todos (thematic batch)');
      } else {
        console.log(`⚠️  WARNING: Expected 3 todos, found ${todoCount}`);
      }

      console.log('\nTask log preview:');
      console.log(content.split('\n').slice(0, 20).join('\n'));
      console.log('...\n');
    } else {
      console.log('❌ FAIL: No task log created');
    }
  } catch (error) {
    console.log('⚠️  Hook execution error:', error.message);
    console.log('stderr:', error.stderr?.toString());
  }

  console.log('');
}

// Test 3: Partial theme completion (should NOT create log yet)
function testPartialTheme() {
  console.log('Test 3: Partial Theme Completion');
  console.log('─'.repeat(50));

  const prevState = [
    {
      content: "Task 1: Create database schema",
      status: "pending",
      activeForm: "Creating database schema"
    },
    {
      content: "Task 2: Add migrations",
      status: "pending",
      activeForm: "Adding migrations"
    },
    {
      content: "Task 3: Write tests",
      status: "pending",
      activeForm: "Writing tests"
    }
  ];

  const newState = [
    {
      content: "Task 1: Create database schema",
      status: "completed",
      activeForm: "Creating database schema"
    },
    {
      content: "Task 2: Add migrations",
      status: "in_progress",
      activeForm: "Adding migrations"
    },
    {
      content: "Task 3: Write tests",
      status: "pending",
      activeForm: "Writing tests"
    }
  ];

  // Save previous state
  fs.writeFileSync(
    path.join(MEMORY_DIR, '.todo-state.json'),
    JSON.stringify(prevState, null, 2)
  );

  const hookInput = {
    tool_name: "TodoWrite",
    tool_input: { todos: newState }
  };

  console.log('Previous state: 3 todos (all pending)');
  console.log('New state: 1 completed, 1 in_progress, 1 pending');
  console.log('Expected: NO task log yet (theme incomplete)\n');

  try {
    const beforeCount = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md')).length;

    // Write JSON to temp file (Windows echo doesn't handle JSON properly)
    const tempFile = path.join(MEMORY_DIR, '.test-input.json');
    fs.writeFileSync(tempFile, JSON.stringify(hookInput));

    const result = execSync(`type "${tempFile}" | node "${HOOK_PATH}" 2>&1`, {
      encoding: 'utf8'
    });

    fs.unlinkSync(tempFile);

    console.log('Hook output:', result || '(silent success)');

    const afterCount = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md')).length;

    if (afterCount === beforeCount) {
      console.log('✅ PASS: No task log created (theme incomplete)');
    } else {
      console.log('❌ FAIL: Task log created prematurely');
    }
  } catch (error) {
    console.log('⚠️  Hook execution error:', error.message);
  }

  console.log('');
}

// Test 4: Pattern detection
function testPatternDetection() {
  console.log('Test 4: Pattern Detection');
  console.log('─'.repeat(50));

  const testCases = [
    {
      content: "Fix login bug",
      expected: "single",
      reason: "No task prefix, standalone work"
    },
    {
      content: "Task 1: Create user model",
      expected: "theme",
      reason: "Has 'Task X:' prefix, part of plan"
    },
    {
      content: "Implementing JWT authentication system",
      expected: "theme",
      reason: "Action verb prefix, likely part of feature"
    },
    {
      content: "Update README documentation",
      expected: "single",
      reason: "Standalone documentation task"
    }
  ];

  console.log('Testing pattern classification:\n');

  testCases.forEach((tc, i) => {
    console.log(`Case ${i + 1}: "${tc.content}"`);
    console.log(`  Expected: ${tc.expected}`);
    console.log(`  Reason: ${tc.reason}`);

    // Simple pattern matching (mirrors hook logic)
    const isPlanTask = /^(Task|Step)\s+\d+:/i.test(tc.content) ||
                       /^(Implementing|Creating|Adding|Fixing|Updating)/i.test(tc.content);

    const detected = isPlanTask ? "theme" : "single";

    if (detected === tc.expected) {
      console.log(`  ✅ PASS: Detected as ${detected}\n`);
    } else {
      console.log(`  ❌ FAIL: Detected as ${detected}\n`);
    }
  });
}

// Main test runner
function runTests() {
  console.log('═'.repeat(60));
  console.log('  MightyArchitect TodoWrite Hook Test Suite');
  console.log('═'.repeat(60));
  console.log('');

  setupTestEnv();

  // Check if hook exists
  if (!fs.existsSync(HOOK_PATH)) {
    console.error(`❌ Hook not found: ${HOOK_PATH}`);
    console.error('Please run from project root directory.');
    process.exit(1);
  }

  try {
    testPatternDetection();
    testSingleTodo();
    testThematicBatch();
    testPartialTheme();

    console.log('═'.repeat(60));
    console.log('✨ Test suite completed!');
    console.log('═'.repeat(60));
    console.log('');
    console.log('Next steps:');
    console.log('1. Review task logs in .claude/memory/tasks/');
    console.log('2. Register hook: /register-todowrite-hook');
    console.log('3. Test in real workflow by completing todos');
    console.log('');

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runTests();
