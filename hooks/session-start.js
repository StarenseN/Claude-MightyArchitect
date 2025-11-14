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

// Stub functions to be implemented
function loadV2Structure() {
  // To be implemented in Task 13
  console.error('loadV2Structure not yet implemented');
}

function initializeV2Structure() {
  // To be implemented in Task 14
  console.error('initializeV2Structure not yet implemented');
}

function migrateToV2() {
  // To be implemented in Task 15
  console.error('migrateToV2 not yet implemented');
}
