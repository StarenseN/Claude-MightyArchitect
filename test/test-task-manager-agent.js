#!/usr/bin/env node
// test/test-task-manager-agent.js

const fs = require('fs');
const path = require('path');

console.log('Testing Task Manager Agent...');

const agentFile = path.join(process.cwd(), 'agents', 'task-manager.md');

// Test 1: Agent file exists
if (!fs.existsSync(agentFile)) {
  console.log('✗ Test 1 failed: task-manager.md does not exist');
  process.exit(1);
}
console.log('✓ Test 1 passed: task-manager.md exists');

const content = fs.readFileSync(agentFile, 'utf8');
const lines = content.split('\n').map(line => line.trim());

// Test 2: Agent has valid YAML frontmatter
if (lines[0] !== '---') {
  console.log('✗ Test 2 failed: Missing YAML frontmatter start');
  console.log('  First line:', JSON.stringify(lines[0]));
  process.exit(1);
}
console.log('✓ Test 2 passed: YAML frontmatter starts correctly');

// Test 3: Agent has required name field
if (!content.match(/^name:\s+task-manager/m)) {
  console.log('✗ Test 3 failed: Missing or incorrect name field');
  process.exit(1);
}
console.log('✓ Test 3 passed: Has name field');

// Test 4: Agent has required description field
if (!content.match(/^description:/m)) {
  console.log('✗ Test 4 failed: Missing description field');
  process.exit(1);
}
console.log('✓ Test 4 passed: Has description field');

// Test 5: Agent has model specified
if (!content.match(/^model:\s+sonnet/m)) {
  console.log('✗ Test 5 failed: Missing or incorrect model field');
  process.exit(1);
}
console.log('✓ Test 5 passed: Has model field');

// Test 6: Agent mentions semantic analysis
if (!content.includes('semantic')) {
  console.log('✗ Test 6 failed: Missing semantic analysis concept');
  process.exit(1);
}
console.log('✓ Test 6 passed: Contains semantic analysis');

// Test 7: Agent mentions 23-point scoring
if (!content.includes('23-point')) {
  console.log('✗ Test 7 failed: Missing 23-point scoring system');
  process.exit(1);
}
console.log('✓ Test 7 passed: Contains 23-point scoring system');

console.log('All agent tests passed!');
