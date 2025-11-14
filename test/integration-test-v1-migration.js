#!/usr/bin/env node
// test/integration-test-v1-migration.js
// Test v1 to v2 migration

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

console.log('Testing v1 to v2 Migration...');

const testDir = path.join(os.tmpdir(), 'mighty-v1-migrate-' + Date.now());
const originalDir = process.cwd();

// Clean up if exists
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir, { recursive: true });

try {
  process.chdir(testDir);

  // Create v1.x structure
  console.log('Creating v1.x structure...');
  const v1MemoryDir = '.claude/memory';
  fs.mkdirSync(path.join(v1MemoryDir, 'knowledge'), { recursive: true });
  fs.mkdirSync(path.join(v1MemoryDir, 'tasks'), { recursive: true });

  // Create v1 files with real content
  fs.writeFileSync(
    path.join(v1MemoryDir, 'activeContext.md'),
    '# Active Context\n\n## Current Focus\nMigrating to v2.0 structure\n\n## Recent Changes\n- Testing migration\n'
  );

  fs.writeFileSync(
    path.join(v1MemoryDir, 'architect.md'),
    '# Architect\n\nOld v1 architect file with scoring\n\n## 23-Point System\nThis should be removed\n'
  );

  fs.writeFileSync(
    path.join(v1MemoryDir, 'knowledge', 'patterns.md'),
    '# Architectural Patterns\n\n## Pattern: Old Pattern\nThis is from v1\n'
  );

  fs.writeFileSync(
    path.join(v1MemoryDir, 'knowledge', 'decisions.md'),
    '# Decisions\n\n## Decision: Use v1 structure\nMade in v1 era\n'
  );

  fs.writeFileSync(
    path.join(v1MemoryDir, 'knowledge', 'evolution.md'),
    '# Evolution\n\nProject started with v1\n'
  );

  // Create existing task log
  fs.writeFileSync(
    path.join(v1MemoryDir, 'tasks', '20251101-120000-old-task.md'),
    '# Task: Old Task\n\nThis task was from v1 era\n'
  );

  // Copy hook and setup environment
  fs.copyFileSync(
    path.join(originalDir, 'hooks', 'session-start.js'),
    path.join(testDir, 'session-start.js')
  );

  // Setup templates for migration
  const tempHome = testDir;
  const templateDir = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'templates');
  const agentDir = path.join(tempHome, '.claude', 'plugins', 'mighty-architect', 'agents');
  fs.mkdirSync(templateDir, { recursive: true });
  fs.mkdirSync(agentDir, { recursive: true });

  // Copy templates
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

  // Test 1: Migration triggers on v1 detection
  console.log('\nTest 1: Auto-migration from v1 to v2...');

  const hookInput = JSON.stringify({ hook_event_name: 'SessionStart', session_id: 'test-migrate' });
  const isWindows = process.platform === 'win32';
  const catCmd = isWindows ? 'type' : 'cat';

  fs.writeFileSync('.test-input.json', hookInput);

  const output = execSync(`${catCmd} .test-input.json | node session-start.js 2>&1`, {
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: tempHome,
      USERPROFILE: tempHome
    }
  });

  if (!output.includes('Migrating MightyArchitect to v2.0 structure')) {
    throw new Error('Migration did not trigger');
  }
  console.log('  ✓ Migration triggered');

  // Test 2: Backup created
  console.log('\nTest 2: Backup verification...');
  if (!fs.existsSync('.claude/memory.backup-v1')) {
    throw new Error('Backup not created');
  }

  // Verify backup contents
  const backupChecks = [
    { path: '.claude/memory.backup-v1/activeContext.md', desc: 'activeContext backup' },
    { path: '.claude/memory.backup-v1/architect.md', desc: 'architect backup' },
    { path: '.claude/memory.backup-v1/knowledge/patterns.md', desc: 'patterns backup' },
    { path: '.claude/memory.backup-v1/knowledge/decisions.md', desc: 'decisions backup' },
    { path: '.claude/memory.backup-v1/tasks/20251101-120000-old-task.md', desc: 'task log backup' }
  ];

  for (const check of backupChecks) {
    if (!fs.existsSync(check.path)) {
      throw new Error(`Backup missing: ${check.desc}`);
    }
    console.log(`  ✓ Backed up: ${check.desc}`);
  }

  // Test 3: v2 structure created
  console.log('\nTest 3: v2 structure verification...');
  const v2Checks = [
    { path: '.claude/memory/.version', desc: 'version file' },
    { path: '.claude/memory/core/activeContext.md', desc: 'moved activeContext' },
    { path: '.claude/memory/core/systemPatterns.md', desc: 'renamed patterns' },
    { path: '.claude/memory/core/projectbrief.md', desc: 'new projectbrief' },
    { path: '.claude/memory/core/productContext.md', desc: 'new productContext' },
    { path: '.claude/memory/core/techContext.md', desc: 'new techContext' },
    { path: '.claude/memory/core/progress.md', desc: 'new progress' },
    { path: '.claude/memory/knowledge/decisions.md', desc: 'preserved decisions' },
    { path: '.claude/memory/knowledge/evolution.md', desc: 'preserved evolution' },
    { path: '.claude/memory/tasks/20251101-120000-old-task.md', desc: 'preserved task log' },
    { path: '.claude/memory/plans', desc: 'new plans directory' },
    { path: '.claude/memory/errors', desc: 'new errors directory' },
    { path: '.claude/memory/memory-index.md', desc: 'new memory-index' }
  ];

  for (const check of v2Checks) {
    if (!fs.existsSync(check.path)) {
      throw new Error(`v2 structure missing: ${check.desc}`);
    }
    console.log(`  ✓ Created/Moved: ${check.desc}`);
  }

  // Test 4: Data preservation
  console.log('\nTest 4: Data preservation...');

  // Check activeContext was moved with content preserved
  const movedActiveContent = fs.readFileSync('.claude/memory/core/activeContext.md', 'utf8');
  if (!movedActiveContent.includes('Migrating to v2.0 structure')) {
    throw new Error('activeContext content not preserved');
  }
  console.log('  ✓ activeContext content preserved');

  // Check patterns renamed to systemPatterns
  const systemPatternsContent = fs.readFileSync('.claude/memory/core/systemPatterns.md', 'utf8');
  if (!systemPatternsContent.includes('Old Pattern')) {
    throw new Error('patterns not renamed correctly');
  }
  console.log('  ✓ patterns.md → systemPatterns.md preserved');

  // Check decisions preserved
  const decisionsContent = fs.readFileSync('.claude/memory/knowledge/decisions.md', 'utf8');
  if (!decisionsContent.includes('Use v1 structure')) {
    throw new Error('decisions content not preserved');
  }
  console.log('  ✓ decisions.md content preserved');

  // Check old architect.md replaced with new agent version
  if (fs.existsSync('.claude/memory/architect.md')) {
    const newArchitectContent = fs.readFileSync('.claude/memory/architect.md', 'utf8');
    // New architect should be agent instructions, not have old v1 scoring
    if (newArchitectContent.includes('23-Point System')) {
      throw new Error('Old architect.md content not replaced');
    }
    if (!newArchitectContent.includes('Mode A') || !newArchitectContent.includes('Mode C')) {
      throw new Error('New architect.md not installed correctly');
    }
    console.log('  ✓ Old architect.md replaced with v2.0 agent version');
  } else {
    // architect.md might be missing if agent not found, that's OK
    console.log('  ✓ architect.md handled correctly');
  }

  // Test 5: Version file content
  console.log('\nTest 5: Version tracking...');
  const versionContent = fs.readFileSync('.claude/memory/.version', 'utf8').trim();
  if (versionContent !== 'v2.0') {
    throw new Error(`Version file contains "${versionContent}" instead of "v2.0"`);
  }
  console.log('  ✓ Version file created with "v2.0"');

  // Test 6: No re-migration on second run
  console.log('\nTest 6: Preventing re-migration...');
  const output2 = execSync(`${catCmd} .test-input.json | node session-start.js 2>&1`, {
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: tempHome,
      USERPROFILE: tempHome
    }
  });

  if (output2.includes('Migrating MightyArchitect')) {
    throw new Error('Migration triggered again (should not happen)');
  }

  if (!output2.includes('MightyArchitect Memory Context (v2.0)')) {
    throw new Error('v2 context not loaded');
  }
  console.log('  ✓ No re-migration, loads v2 directly');

  console.log('\n✅ All v1 to v2 migration tests passed!');

} catch (error) {
  console.error('\n✗ Test failed:', error.message);
  // Log structure for debugging
  console.error('\nCurrent structure:');
  execSync('ls -la .claude/memory/', { stdio: 'inherit' });
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