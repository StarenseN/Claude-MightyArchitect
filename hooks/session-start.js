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

function main() {
  // Check if memory structure exists
  if (!fs.existsSync(MEMORY_DIR)) {
    // Check user preference (default to true)
    let autoInit = true;

    if (fs.existsSync(SETTINGS_FILE)) {
      try {
        const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
        autoInit = settings.mightyArchitect?.autoInit ?? true;
      } catch (error) {
        // Settings file invalid, use default
        autoInit = true;
      }
    }

    if (autoInit) {
      // Create directory structure
      fs.mkdirSync(path.join(MEMORY_DIR, 'tasks'), { recursive: true });
      fs.mkdirSync(path.join(MEMORY_DIR, 'knowledge'), { recursive: true });

      // Copy templates
      const templateDir = path.join(HOME, '.claude', 'plugins', 'mighty-architect', 'templates');

      if (fs.existsSync(templateDir)) {
        fs.copyFileSync(
          path.join(templateDir, 'activeContext.md'),
          path.join(MEMORY_DIR, 'activeContext.md')
        );
        fs.copyFileSync(
          path.join(templateDir, 'architect.md'),
          path.join(MEMORY_DIR, 'architect.md')
        );
      } else {
        // Fallback: create minimal files
        fs.writeFileSync(path.join(MEMORY_DIR, 'activeContext.md'), '# Active Context\n');
        fs.writeFileSync(path.join(MEMORY_DIR, 'architect.md'), '# Architect\n');
      }

      console.error('✓ MightyArchitect memory structure initialized');
    }
  }

  // Load context if structure exists
  if (fs.existsSync(MEMORY_DIR)) {
    console.log('---');
    console.log('# MightyArchitect Memory Context');
    console.log('');
    console.log(fs.readFileSync(path.join(MEMORY_DIR, 'activeContext.md'), 'utf8'));
    console.log('');
    console.log('---');
    console.log('');
    console.log(fs.readFileSync(path.join(MEMORY_DIR, 'architect.md'), 'utf8'));

    // Load incomplete task if exists
    const currentTask = path.join(MEMORY_DIR, 'tasks', 'current.md');
    if (fs.existsSync(currentTask)) {
      console.log('');
      console.log('---');
      console.log('## Resuming Task:');
      console.log('');
      console.log(fs.readFileSync(currentTask, 'utf8'));
    }
  }
}
