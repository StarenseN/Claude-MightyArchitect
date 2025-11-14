#!/usr/bin/env node
// test/integration-test-v2-new-project.js
// Test v2.0 initialization for new projects

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

console.log('Testing v2.0 Initialization for New Project...');

const testDir = path.join(os.tmpdir(), 'mighty-v2-new-' + Date.now());
const originalDir = process.cwd();

// Clean up if exists
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir, { recursive: true });

try {
  process.chdir(testDir);

  // Initialize git repo
  execSync('git init', { stdio: 'pipe' });
  execSync('git config user.email "test@example.com"', { stdio: 'pipe' });
  execSync('git config user.name "Test User"', { stdio: 'pipe' });

  // Copy hook to test location
  fs.mkdirSync('.claude', { recursive: true });
  fs.copyFileSync(
    path.join(originalDir, 'hooks', 'session-start.js'),
    path.join(testDir, 'session-start.js')
  );

  // Copy templates (simulating plugin installation)
  const tempHome = testDir;
  const templateDir = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'templates');
  const agentDir = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'agents');
  fs.mkdirSync(templateDir, { recursive: true });
  fs.mkdirSync(agentDir, { recursive: true });

  // Copy all templates
  const sourceTemplates = path.join(originalDir, 'templates');
  fs.readdirSync(sourceTemplates).forEach(file => {
    fs.copyFileSync(
      path.join(sourceTemplates, file),
      path.join(templateDir, file)
    );
  });

  // Copy agents
  const sourceAgents = path.join(originalDir, 'agents');
  fs.readdirSync(sourceAgents).forEach(file => {
    if (file.endsWith('.md')) {
      fs.copyFileSync(
        path.join(sourceAgents, file),
        path.join(agentDir, file)
      );
    }
  });

  // Test 1: SessionStart creates v2.0 structure
  console.log('Test 1: v2.0 structure initialization...');

  const hookInput = JSON.stringify({ hook_event_name: 'SessionStart', session_id: 'test-v2' });
  const isWindows = process.platform === 'win32';
  const catCmd = isWindows ? 'type' : 'cat';

  // Create input file
  fs.writeFileSync('.test-input.json', hookInput);

  // Run session-start hook
  execSync(`${catCmd} .test-input.json | node session-start.js`, {
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: tempHome,
      USERPROFILE: tempHome
    },
    stdio: 'pipe'
  });

  // Verify v2.0 structure
  const checks = [
    { path: '.claude/memory/.version', desc: 'version file' },
    { path: '.claude/memory/core/activeContext.md', desc: 'core/activeContext.md' },
    { path: '.claude/memory/core/projectbrief.md', desc: 'core/projectbrief.md' },
    { path: '.claude/memory/core/productContext.md', desc: 'core/productContext.md' },
    { path: '.claude/memory/core/systemPatterns.md', desc: 'core/systemPatterns.md' },
    { path: '.claude/memory/core/techContext.md', desc: 'core/techContext.md' },
    { path: '.claude/memory/core/progress.md', desc: 'core/progress.md' },
    { path: '.claude/memory/knowledge/decisions.md', desc: 'knowledge/decisions.md' },
    { path: '.claude/memory/knowledge/evolution.md', desc: 'knowledge/evolution.md' },
    { path: '.claude/memory/tasks', desc: 'tasks directory' },
    { path: '.claude/memory/plans', desc: 'plans directory' },
    { path: '.claude/memory/errors', desc: 'errors directory' },
    { path: '.claude/memory/memory-index.md', desc: 'memory-index.md' }
  ];

  let allExist = true;
  for (const check of checks) {
    if (!fs.existsSync(check.path)) {
      console.log(`  ✗ Missing: ${check.desc}`);
      allExist = false;
    } else {
      console.log(`  ✓ Created: ${check.desc}`);
    }
  }

  if (!allExist) {
    throw new Error('v2.0 structure incomplete');
  }

  // Test 2: Check version file content
  console.log('\nTest 2: Version tracking...');
  const versionContent = fs.readFileSync('.claude/memory/.version', 'utf8').trim();
  if (versionContent === 'v2.0') {
    console.log('  ✓ Version file contains "v2.0"');
  } else {
    throw new Error(`Version file contains "${versionContent}" instead of "v2.0"`);
  }

  // Test 3: Run session-start again, should load existing structure
  console.log('\nTest 3: Loading existing v2.0 structure...');
  const output = execSync(`${catCmd} .test-input.json | node session-start.js`, {
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: tempHome,
      USERPROFILE: tempHome
    }
  });

  if (output.includes('MightyArchitect Memory Context (v2.0)')) {
    console.log('  ✓ Loads v2.0 context correctly');
  } else {
    throw new Error('Failed to load v2.0 context');
  }

  if (output.includes('Active Context') && output.includes('System Patterns')) {
    console.log('  ✓ Selective loading working (activeContext + systemPatterns)');
  } else {
    throw new Error('Selective loading not working correctly');
  }

  console.log('\n✅ All v2.0 initialization tests passed!');

} catch (error) {
  console.error('\n✗ Test failed:', error.message);
  process.exit(1);
} finally {
  process.chdir(originalDir);
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  if (fs.existsSync('.test-input.json')) {
    fs.unlinkSync('.test-input.json');
  }
}