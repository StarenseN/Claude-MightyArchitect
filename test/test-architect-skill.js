#!/usr/bin/env node
// test/test-architect-skill.js

const fs = require('fs');
const path = require('path');

console.log('Testing Architect Skill...');

const skillFile = path.join(process.cwd(), 'skills', 'mighty-architect', 'SKILL.md');

// Test 1: Skill file exists
if (!fs.existsSync(skillFile)) {
  console.log('✗ Test 1 failed: SKILL.md does not exist');
  process.exit(1);
}
console.log('✓ Test 1 passed: SKILL.md exists');

const content = fs.readFileSync(skillFile, 'utf8');
const lines = content.split('\n');

// Test 2: Skill has valid YAML frontmatter
if (lines[0] !== '---') {
  console.log('✗ Test 2 failed: Missing YAML frontmatter start');
  process.exit(1);
}
console.log('✓ Test 2 passed: YAML frontmatter starts correctly');

// Test 3: Skill has required name field
if (!content.match(/^name:\s+mighty-architect/m)) {
  console.log('✗ Test 3 failed: Missing or incorrect name field');
  process.exit(1);
}
console.log('✓ Test 3 passed: Has name field');

// Test 4: Skill has required description field
if (!content.match(/^description:/m)) {
  console.log('✗ Test 4 failed: Missing description field');
  process.exit(1);
}
console.log('✓ Test 4 passed: Has description field');

// Test 5: Skill mentions 23-point scoring
if (!content.includes('23-point')) {
  console.log('✗ Test 5 failed: Missing 23-point scoring system');
  process.exit(1);
}
console.log('✓ Test 5 passed: Contains 23-point scoring system');

// Test 6: Skill has allowed-tools specified
if (!content.match(/^allowed-tools:/m)) {
  console.log('✗ Test 6 failed: Missing allowed-tools field');
  process.exit(1);
}
console.log('✓ Test 6 passed: Has allowed-tools field');

console.log('All tests passed!');
