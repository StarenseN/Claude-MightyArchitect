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
  // Check for version file first
  const versionFile = path.join(MEMORY_DIR, '.version');
  if (fs.existsSync(versionFile)) {
    const version = fs.readFileSync(versionFile, 'utf8').trim();
    if (version === 'v2.0') {
      // Verify v2 structure integrity
      if (fs.existsSync(path.join(MEMORY_DIR, 'core', 'activeContext.md'))) {
        return 'v2';
      } else {
        console.error('⚠️  Corrupted v2.0 structure detected - reinitializing');
        return 'v2-corrupted';
      }
    }
  }

  // Check for v2.0 structure (core/ directory)
  if (fs.existsSync(path.join(MEMORY_DIR, 'core'))) {
    // Core exists but no version file - mark as v2 and add version file
    fs.writeFileSync(versionFile, 'v2.0\n');
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
  } else if (version === 'v2-corrupted') {
    // Corrupted v2 structure → reinitialize
    console.error('🔧 Repairing corrupted v2.0 structure...');
    repairV2Structure();
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

  // Create version file
  const versionFile = path.join(MEMORY_DIR, '.version');
  fs.writeFileSync(versionFile, 'v2.0\n');

  console.error('✓ MightyArchitect v2.0 memory structure initialized');

  // Load the newly created structure
  loadV2Structure();
}

function migrateToV2() {
  // Backup old structure first
  const backupDir = path.join(MEMORY_DIR + '.backup-v1');
  if (!fs.existsSync(backupDir)) {
    fs.cpSync(MEMORY_DIR, backupDir, { recursive: true });
    console.error(`✓ Backup created: ${backupDir}`);
  }

  // 1. Create new directories
  fs.mkdirSync(path.join(MEMORY_DIR, 'core'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'plans'), { recursive: true });
  fs.mkdirSync(path.join(MEMORY_DIR, 'errors'), { recursive: true });
  // knowledge/ and tasks/ already exist in v1.x

  // 2. Move activeContext.md → core/activeContext.md
  const oldActiveContext = path.join(MEMORY_DIR, 'activeContext.md');
  const newActiveContext = path.join(MEMORY_DIR, 'core', 'activeContext.md');
  if (fs.existsSync(oldActiveContext)) {
    fs.renameSync(oldActiveContext, newActiveContext);
    console.error('✓ Moved activeContext.md → core/');
  }

  // 3. Rename knowledge/patterns.md → core/systemPatterns.md
  const oldPatterns = path.join(MEMORY_DIR, 'knowledge', 'patterns.md');
  const newPatterns = path.join(MEMORY_DIR, 'core', 'systemPatterns.md');
  if (fs.existsSync(oldPatterns)) {
    fs.renameSync(oldPatterns, newPatterns);
    console.error('✓ Renamed patterns.md → systemPatterns.md');
  }

  // 4. Create missing core/ files from templates
  const templateDir = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'templates');
  const missingCoreFiles = ['projectbrief.md', 'productContext.md', 'techContext.md', 'progress.md'];

  for (const file of missingCoreFiles) {
    const dest = path.join(MEMORY_DIR, 'core', file);
    if (!fs.existsSync(dest)) {
      const src = path.join(templateDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      } else {
        // Minimal fallback
        fs.writeFileSync(dest, `# ${file.replace('.md', '')}\n\n[Complete via /architect-review]\n`);
      }
    }
  }
  console.error('✓ Created missing core/ files');

  // 5. Create memory-index.md
  const indexSrc = path.join(templateDir, 'memory-index.md');
  const indexDest = path.join(MEMORY_DIR, 'memory-index.md');
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, indexDest);
  } else {
    fs.writeFileSync(indexDest, '# Memory Index\n\nRun `/architect-review` to populate.\n');
  }
  console.error('✓ Created memory-index.md');

  // 6. Remove old architect.md (v1.x with scoring), will be replaced by agent version
  const oldArchitect = path.join(MEMORY_DIR, 'architect.md');
  if (fs.existsSync(oldArchitect)) {
    fs.unlinkSync(oldArchitect);
    console.error('✓ Removed old architect.md (v1.x)');
  }

  // 7. Copy new architect.md from plugin (agent instructions)
  const architectSrc = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'agents', 'architect.md');
  const architectDest = path.join(MEMORY_DIR, 'architect.md');
  if (fs.existsSync(architectSrc)) {
    fs.copyFileSync(architectSrc, architectDest);
    console.error('✓ Installed new architect.md (v2.0 agent)');
  }

  // 8. Create version file to mark successful migration
  const versionFile = path.join(MEMORY_DIR, '.version');
  fs.writeFileSync(versionFile, 'v2.0\n');
  console.error('✓ Created version file');

  console.error('');
  console.error('✅ Migration to v2.0 complete!');
  console.error('');
  console.error('📁 New structure:');
  console.error('  - core/ (6 files)');
  console.error('  - knowledge/ (decisions.md, evolution.md)');
  console.error('  - tasks/ (preserved)');
  console.error('  - plans/ (new)');
  console.error('  - errors/ (new)');
  console.error('  - memory-index.md (new)');
  console.error('');
  console.error('💡 Run `/architect-review` to complete missing files');
  console.error('');
}

function repairV2Structure() {
  // Repair corrupted v2.0 structure
  const coreDir = path.join(MEMORY_DIR, 'core');
  const templateDir = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'templates');

  // Ensure core directory exists
  if (!fs.existsSync(coreDir)) {
    fs.mkdirSync(coreDir, { recursive: true });
  }

  // Check and repair missing core files
  const coreFiles = [
    'activeContext.md',
    'projectbrief.md',
    'productContext.md',
    'systemPatterns.md',
    'techContext.md',
    'progress.md'
  ];

  for (const file of coreFiles) {
    const filePath = path.join(coreDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`  Repairing missing ${file}...`);
      const templatePath = path.join(templateDir, file);
      if (fs.existsSync(templatePath)) {
        fs.copyFileSync(templatePath, filePath);
      } else {
        // Create minimal file
        fs.writeFileSync(filePath, `# ${file.replace('.md', '')}\n\n[Repaired - complete via /architect-review]\n`);
      }
    }
  }

  // Ensure memory-index.md exists
  const memoryIndexPath = path.join(MEMORY_DIR, 'memory-index.md');
  if (!fs.existsSync(memoryIndexPath)) {
    const templatePath = path.join(templateDir, 'memory-index.md');
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, memoryIndexPath);
    } else {
      fs.writeFileSync(memoryIndexPath, '# Memory Index\n\n[Repaired - run /architect-review]\n');
    }
  }

  // Update version file
  const versionFile = path.join(MEMORY_DIR, '.version');
  fs.writeFileSync(versionFile, 'v2.0\n');

  console.error('✓ v2.0 structure repaired');
}
