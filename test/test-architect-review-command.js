#!/usr/bin/env node
// test/test-architect-review-command.js
// Test /architect-review command structure

const fs = require('fs');
const path = require('path');

console.log('Testing /architect-review command...');

const commandPath = path.join(__dirname, '..', 'commands', 'architect-review.md');

// Test 1: File exists
if (!fs.existsSync(commandPath)) {
  console.error('✗ Test 1 failed: architect-review.md does not exist');
  process.exit(1);
}
console.log('✓ Test 1 passed: architect-review.md exists');

const content = fs.readFileSync(commandPath, 'utf8');

// Test 2: Has YAML frontmatter with name
if (!content.includes('name: architect-review')) {
  console.error('✗ Test 2 failed: Missing name field');
  process.exit(1);
}
console.log('✓ Test 2 passed: Has name field');

// Test 3: References architect agent
if (!content.includes('architect') || !content.includes('Mode C')) {
  console.error('✗ Test 3 failed: Does not reference Architect Agent Mode C');
  process.exit(1);
}
console.log('✓ Test 3 passed: References Architect Agent Mode C');

// Test 4: Uses Task tool
if (!content.includes('Task tool') || !content.includes('subagent_type')) {
  console.error('✗ Test 4 failed: Does not use Task tool correctly');
  process.exit(1);
}
console.log('✓ Test 4 passed: Uses Task tool invocation');

// Test 5: Mentions all three phases
if (!content.includes('Phase A') || !content.includes('Phase B') || !content.includes('Phase C')) {
  console.error('✗ Test 5 failed: Missing phase documentation');
  process.exit(1);
}
console.log('✓ Test 5 passed: Documents all three phases');

console.log('\nAll command tests passed!');
process.exit(0);