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
