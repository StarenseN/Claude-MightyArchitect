#!/usr/bin/env node
// test/test-install.js

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log('Testing Installation Script...');

// Setup: create temporary Claude home (cross-platform)
const testHome = path.join(os.tmpdir(), 'test-claude-home-' + Date.now());
if (fs.existsSync(testHome)) {
  fs.rmSync(testHome, { recursive: true });
}
fs.mkdirSync(path.join(testHome, '.claude', 'plugins'), { recursive: true });

// Set HOME environment for test
const originalHome = process.env.HOME || process.env.USERPROFILE;
process.env.HOME = testHome;
process.env.USERPROFILE = testHome;

try {
  // Test 1: Script creates plugin directory
  console.log('Test 1: Script creates plugin directory...');
  execSync('node bin/install.js --test-mode', { stdio: 'inherit' });

  if (fs.existsSync(path.join(testHome, '.claude', 'plugins', 'mighty-architect'))) {
    console.log('✓ Test 1 passed: Plugin directory created');
  } else {
    console.log('✗ Test 1 failed: Plugin directory not created');
    process.exit(1);
  }

  // Test 2: Script copies templates
  console.log('Test 2: Script copies templates...');
  if (fs.existsSync(path.join(testHome, '.claude', 'plugins', 'mighty-architect', 'templates', 'architect.md'))) {
    console.log('✓ Test 2 passed: Templates copied');
  } else {
    console.log('✗ Test 2 failed: Templates not copied');
    process.exit(1);
  }

  // Test 3: Script registers hooks with .js extension
  console.log('Test 3: Script registers Node.js hooks...');
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

  // Test 4: Script installs commands to global directory
  console.log('Test 4: Script installs commands globally...');
  const commandsDir = path.join(testHome, '.claude', 'commands');
  const forensicCmd = path.join(commandsDir, 'forensic.md');
  const bootstrapCmd = path.join(commandsDir, 'bootstrap.md');
  const architectCmd = path.join(commandsDir, 'architect-review.md');

  if (fs.existsSync(commandsDir) && fs.existsSync(forensicCmd) && fs.existsSync(bootstrapCmd) && fs.existsSync(architectCmd)) {
    console.log('✓ Test 4 passed: Commands installed to ~/.claude/commands/');
  } else {
    console.log('✗ Test 4 failed: Commands not in global directory');
    console.log('  Commands dir exists:', fs.existsSync(commandsDir));
    console.log('  forensic.md exists:', fs.existsSync(forensicCmd));
    console.log('  bootstrap.md exists:', fs.existsSync(bootstrapCmd));
    console.log('  architect-review.md exists:', fs.existsSync(architectCmd));
    process.exit(1);
  }

  console.log('All tests passed!');
} catch (error) {
  console.log('✗ Test failed with error:', error.message);
  process.exit(1);
} finally {
  // Restore original HOME
  process.env.HOME = originalHome;
  process.env.USERPROFILE = originalHome;

  // Cleanup
  if (fs.existsSync(testHome)) {
    fs.rmSync(testHome, { recursive: true });
  }
}
