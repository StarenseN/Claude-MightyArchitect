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
  // Create directory structure
  fs.mkdirSync(path.join(MEMORY_DIR, 'core'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'knowledge'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'plans'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'errors'), { recursive: true });

  const templateDir = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'templates');

  if (fs.existsSync(templateDir)) {
    // Copy core/ templates
    const coreTemplates = [
      'projectbrief.md',
      'productContext.md',
      'systemPatterns.md',
      'techContext.md',
      'activeContext.md',
      'progress.md'
    ];

    for (const template of coreTemplates) {
      const src = path.join(templateDir, template);
      const dest = path.join(MEMORY_DIR, 'core', template);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }

    // Copy knowledge/ templates
    const knowledgeTemplates = ['decisions.md', 'evolution.md'];
    for (const template of knowledgeTemplates) {
      const src = path.join(templateDir, template);
      const dest = path.join(MEMORY_DIR, 'knowledge', template);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }

    // Copy memory-index.md
    const indexSrc = path.join(templateDir, 'memory-index.md');
    const indexDest = path.join(MEMORY_DIR, 'memory-index.md');
    if (fs.existsSync(indexSrc)) {
      fs.copyFileSync(indexSrc, indexDest);
    }

    // Copy architect.md (instructions) - NOT in core/, at root of memory/
    const architectSrc = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'agents', 'architect.md');
    const architectDest = path.join(MEMORY_DIR, 'architect.md');
    if (fs.existsSync(architectSrc)) {
      fs.copyFileSync(architectSrc, architectDest);
    }
  } else {
    // Fallback: create minimal files if templates missing
    console.error('⚠️  Templates not found, creating minimal structure');

    // Minimal core/ files
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'projectbrief.md'), '# Project Brief\n\n[Complete via /architect-review]\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'productContext.md'), '# Product Context\n\n[Complete via /architect-review]\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'systemPatterns.md'), '# Architectural Patterns\n\n<!-- Auto-populated by Architect Agent -->\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'techContext.md'), '# Technical Context\n\n[Complete via /architect-review]\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'activeContext.md'), '# Active Context\n\n## Current Focus\n[What you\'re working on]\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'core', 'progress.md'), '# Project Progress\n\n[Updated by Task Manager]\n');

    // Minimal knowledge/ files
    fs.writeFileSync(path.join(MEMORY_DIR, 'knowledge', 'decisions.md'), '# Architectural Decisions\n\n<!-- Updated by Architect Agent Mode C -->\n');
    fs.writeFileSync(path.join(MEMORY_DIR, 'knowledge', 'evolution.md'), '# Project Evolution\n\nRun `/forensic` to generate timeline from git history.\n');

    // Minimal memory-index.md
    fs.writeFileSync(path.join(MEMORY_DIR, 'memory-index.md'), '# Memory Index\n\nRun `/architect-review` to verify health.\n');

    // Note: architect.md not copied in fallback (agent file, not memory)
  }

  console.error('✓ MightyArchitect v2.0 memory structure initialized');

  // Load the newly created structure
  loadV2Structure();
}

function migrateToV2() {
  // To be implemented in Task 15
  console.error('migrateToV2 not yet implemented');
}
