#!/usr/bin/env node
// test/test-analyze-todos-command.js

const fs = require('fs');
const path = require('path');

console.log('Testing /analyze-todos command...');

const commandFile = path.join(process.cwd(), 'commands', 'analyze-todos.md');

// Test 1: Command file exists
if (!fs.existsSync(commandFile)) {
  console.log('✗ Test 1 failed: analyze-todos.md does not exist');
  process.exit(1);
}
console.log('✓ Test 1 passed: analyze-todos.md exists');

const content = fs.readFileSync(commandFile, 'utf8');

// Test 2: Command mentions task-manager agent
if (!content.includes('task-manager')) {
  console.log('✗ Test 2 failed: Command does not reference task-manager agent');
  process.exit(1);
}
console.log('✓ Test 2 passed: References task-manager agent');

// Test 3: Command uses Task tool
if (!content.includes('Task tool') && !content.includes('subagent')) {
  console.log('✗ Test 3 failed: Command does not use Task tool or subagent');
  process.exit(1);
}
console.log('✓ Test 3 passed: Uses Task tool invocation');

// Test 4: Command reads activeContext.md
if (!content.includes('activeContext.md')) {
  console.log('✗ Test 4 failed: Command does not read activeContext.md');
  process.exit(1);
}
console.log('✓ Test 4 passed: Reads activeContext.md');

console.log('All command tests passed!');
