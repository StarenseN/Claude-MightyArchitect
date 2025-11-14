#!/usr/bin/env node
// test/test-session-start.js - Fixed version

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Testing SessionStart Hook...');

// Clean up
if (fs.existsSync('.claude/memory')) {
  fs.rmSync('.claude/memory', { recursive: true });
}

// Test 1: Hook initializes structure when missing (with autoInit=true)
console.log('Test 1: Hook initializes structure...');

// Create JSON input file
const input1 = { hook_event_name: 'SessionStart', session_id: 'test123' };
fs.writeFileSync('.test-input.json', JSON.stringify(input1));

// Create temp HOME with autoInit=true settings
const tempHome = path.resolve('.test-home');
if (fs.existsSync(tempHome)) {
  fs.rmSync(tempHome, { recursive: true });
}
fs.mkdirSync(path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'templates'), { recursive: true });
fs.writeFileSync(
  path.join(tempHome, '.claude', 'settings.json'),
  JSON.stringify({ mightyArchitect: { autoInit: true } }, null, 2)
);

// Copy templates to temp HOME
const sourceTemplates = path.resolve('templates');
const destTemplates = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'templates');
if (fs.existsSync(sourceTemplates)) {
  fs.readdirSync(sourceTemplates).forEach(file => {
    fs.copyFileSync(
      path.join(sourceTemplates, file),
      path.join(destTemplates, file)
    );
  });
}

// Copy agents to temp HOME for v2.0
const sourceAgents = path.resolve('agents');
const destAgents = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'agents');
fs.mkdirSync(destAgents, { recursive: true });
if (fs.existsSync(sourceAgents)) {
  fs.readdirSync(sourceAgents).forEach(file => {
    fs.copyFileSync(
      path.join(sourceAgents, file),
      path.join(destAgents, file)
    );
  });
}

try {
  // Run hook with temp HOME
  const isWindows = process.platform === 'win32';
  const catCmd = isWindows ? 'type' : 'cat';
  execSync(`${catCmd} .test-input.json | node hooks/session-start.js`, {
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: tempHome,
      USERPROFILE: tempHome
    }
  });

  // Check for v2.0 structure
  if (fs.existsSync('.claude/memory') &&
      fs.existsSync('.claude/memory/core/activeContext.md') &&
      fs.existsSync('.claude/memory/memory-index.md')) {
    console.log('✓ Test 1 passed: v2.0 structure initialized');
  } else {
    console.log('✗ Test 1 failed: Structure not created');
    console.log('  .claude/memory exists:', fs.existsSync('.claude/memory'));
    console.log('  core/activeContext.md exists:', fs.existsSync('.claude/memory/core/activeContext.md'));
    console.log('  memory-index.md exists:', fs.existsSync('.claude/memory/memory-index.md'));
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 1 failed with error:', error.message);
  process.exit(1);
} finally {
  // Cleanup
  if (fs.existsSync('.test-input.json')) fs.unlinkSync('.test-input.json');
  if (fs.existsSync(tempHome)) fs.rmSync(tempHome, { recursive: true });
}

// Test 2: Hook loads context when structure exists
console.log('Test 2: Hook loads context...');

const input2 = { hook_event_name: 'SessionStart', session_id: 'test456' };
fs.writeFileSync('.test-input.json', JSON.stringify(input2));

try {
  const isWindows = process.platform === 'win32';
  const catCmd = isWindows ? 'type' : 'cat';
  const output = execSync(`${catCmd} .test-input.json | node hooks/session-start.js`, { encoding: 'utf8' });

  if (output.includes('Active Context') || output.includes('MightyArchitect Memory Context')) {
    console.log('✓ Test 2 passed: Context loaded');
  } else {
    console.log('✗ Test 2 failed: Context not loaded');
    console.log('Output:', output);
    process.exit(1);
  }
} catch (error) {
  console.log('✗ Test 2 failed with error:', error.message);
  process.exit(1);
} finally {
  if (fs.existsSync('.test-input.json')) fs.unlinkSync('.test-input.json');
}

console.log('All tests passed!');
