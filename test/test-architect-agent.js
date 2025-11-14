#!/usr/bin/env node
// test/test-architect-agent.js
// Test Architect Agent structure and requirements

const fs = require('fs');
const path = require('path');

console.log('Testing Architect Agent...');

const agentPath = path.join(__dirname, '..', 'agents', 'architect.md');

// Test 1: File exists
if (!fs.existsSync(agentPath)) {
  console.error('✗ Test 1 failed: architect.md does not exist');
  process.exit(1);
}
console.log('✓ Test 1 passed: architect.md exists');

const content = fs.readFileSync(agentPath, 'utf8');

// Test 2: Has YAML frontmatter (handle both Unix and Windows line endings)
if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
  console.error('✗ Test 2 failed: YAML frontmatter does not start correctly');
  process.exit(1);
}
console.log('✓ Test 2 passed: YAML frontmatter starts correctly');

// Test 3: Has required fields in frontmatter
const requiredFields = ['name: architect', 'description:', 'model: sonnet'];
for (const field of requiredFields) {
  if (!content.includes(field)) {
    console.error(`✗ Test 3 failed: Missing required field: ${field}`);
    process.exit(1);
  }
}
console.log('✓ Test 3 passed: All required fields present');

// Test 4: Documents Mode A
if (!content.includes('Mode A') || !content.includes('Quick Observation')) {
  console.error('✗ Test 4 failed: Mode A not documented');
  process.exit(1);
}
console.log('✓ Test 4 passed: Mode A documented');

// Test 5: Documents Mode C
if (!content.includes('Mode C') || !content.includes('Full Analysis')) {
  console.error('✗ Test 5 failed: Mode C not documented');
  process.exit(1);
}
console.log('✓ Test 5 passed: Mode C documented');

// Test 6: Documents Phase B priority
if (!content.includes('Phase B') || !content.includes('Strategic Decisions')) {
  console.error('✗ Test 6 failed: Phase B not documented or not prioritized');
  process.exit(1);
}
console.log('✓ Test 6 passed: Phase B priority documented');

// Test 7: Separates from Task Manager
if (!content.includes('Task Manager') || !content.includes('DO NOT')) {
  console.error('✗ Test 7 failed: Separation from Task Manager not clear');
  process.exit(1);
}
console.log('✓ Test 7 passed: Separation from Task Manager documented');

// Test 8: Does NOT contain 23-point scoring
if (content.includes('23-point') || content.includes('+10:') || content.includes('-10:')) {
  console.error('✗ Test 8 failed: Contains 23-point scoring (belongs to Task Manager)');
  process.exit(1);
}
console.log('✓ Test 8 passed: No 23-point scoring (correctly delegated to Task Manager)');

console.log('\nAll agent tests passed!');
process.exit(0);