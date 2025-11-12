#!/usr/bin/env node
// test/run-tests.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running all MightyArchitect tests...\n');

let failed = 0;
let passed = 0;

// Find all test files
const testFiles = fs.readdirSync(__dirname)
  .filter(file => file.startsWith('test-') && file.endsWith('.js'))
  .concat(['integration-test.js']);

// Run each test
for (const testFile of testFiles) {
  const testPath = path.join(__dirname, testFile);
  console.log(`Running ${testFile}...`);

  try {
    execSync(`node "${testPath}"`, { stdio: 'inherit' });
    console.log(`✓ ${testFile} passed\n`);
    passed++;
  } catch (error) {
    console.log(`✗ ${testFile} failed\n`);
    failed++;
  }
}

// Summary
console.log('='.repeat(50));
console.log(`Tests run: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('✨ All tests passed!');
  process.exit(0);
} else {
  console.log(`❌ ${failed} test(s) failed`);
  process.exit(1);
}
