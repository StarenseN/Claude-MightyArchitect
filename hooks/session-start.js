#!/usr/bin/env node
// hooks/session-start.js
// MightyArchitect SessionStart Hook

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '.claude/memory';
const HOME = process.env.HOME || process.env.USERPROFILE;
const SETTINGS_FILE = path.join(HOME, '.claude', 'settings.json');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    main();
  } catch (error) {
    console.error('SessionStart hook error:', error.message);
    process.exit(1);
  }
});

function detectStructureVersion() {
  // Check for v2.0 structure (core/ directory)
  if (fs.existsSync(path.join(MEMORY_DIR, 'core'))) {
    return 'v2';
  }

  // Check for v1.x structure (activeContext.md at root)
  if (fs.existsSync(path.join(MEMORY_DIR, 'activeContext.md'))) {
    return 'v1';
  }

  // New project (no structure)
  return 'new';
}

function main() {
  const version = detectStructureVersion();

  if (version === 'v2') {
    // v2.0 structure exists
    loadV2Structure();
  } else if (version === 'v1') {
    // v1.x structure → auto-migrate
    console.error('🔄 Migrating MightyArchitect to v2.0 structure...');
    migrateToV2();
    loadV2Structure();
  } else {
    // New project → initialize v2.0
    initializeV2Structure();
  }
}

function loadV2Structure() {
  // Load selective core/ files (~800-1000 tokens)
  const activeContextPath = path.join(MEMORY_DIR, 'core', 'activeContext.md');
  const systemPatternsPath = path.join(MEMORY_DIR, 'core', 'systemPatterns.md');
  const memoryIndexPath = path.join(MEMORY_DIR, 'memory-index.md');

  console.log('---');
  console.log('# MightyArchitect Memory Context (v2.0)');
  console.log('');

  // Load activeContext.md (current focus)
  if (fs.existsSync(activeContextPath)) {
    console.log('## Active Context');
    console.log('');
    console.log(fs.readFileSync(activeContextPath, 'utf8'));
    console.log('');
  }

  // Load systemPatterns.md (architecture)
  if (fs.existsSync(systemPatternsPath)) {
    console.log('---');
    console.log('## System Patterns');
    console.log('');
    console.log(fs.readFileSync(systemPatternsPath, 'utf8'));
    console.log('');
  }

  // Load memory-index.md (health status)
  if (fs.existsSync(memoryIndexPath)) {
    console.log('---');
    console.log('## Memory Index');
    console.log('');
    console.log(fs.readFileSync(memoryIndexPath, 'utf8'));
    console.log('');
  }

  console.log('---');

  // Note about other files available on-demand
  console.log('');
  console.log('📁 **Additional context available via Read tool:**');
  console.log('- core/projectbrief.md, core/productContext.md, core/techContext.md, core/progress.md');
  console.log('- knowledge/decisions.md, knowledge/evolution.md');
  console.log('- tasks/ (recent task logs)');
  console.log('');
}

function initializeV2Structure() {
  // To be implemented in Task 14
  console.error('initializeV2Structure not yet implemented');
}

function migrateToV2() {
  // To be implemented in Task 15
  console.error('migrateToV2 not yet implemented');
}
