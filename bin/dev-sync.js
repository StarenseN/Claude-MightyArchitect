#!/usr/bin/env node
// bin/dev-sync.js
// Quick sync for development: copies changed files to installation dirs

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || process.env.USERPROFILE;
const CLAUDE_DIR = path.join(HOME, '.claude');
const PLUGIN_DIR = path.join(CLAUDE_DIR, 'plugins', 'mighty-architect');
const COMMANDS_DIR = path.join(CLAUDE_DIR, 'commands');

const sourceDir = path.join(__dirname, '..');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🔄 Dev Sync: Copying changed files...\n');

// Sync commands
console.log('📝 Commands...');
copyDir(path.join(sourceDir, 'commands'), COMMANDS_DIR);
console.log('   ✓ Commands synced to', COMMANDS_DIR);

// Sync hooks
console.log('🪝 Hooks...');
copyDir(path.join(sourceDir, 'hooks'), path.join(PLUGIN_DIR, 'hooks'));
console.log('   ✓ Hooks synced to', path.join(PLUGIN_DIR, 'hooks'));

// Sync templates
console.log('📋 Templates...');
copyDir(path.join(sourceDir, 'templates'), path.join(PLUGIN_DIR, 'templates'));
console.log('   ✓ Templates synced to', path.join(PLUGIN_DIR, 'templates'));

// Sync skills
console.log('🎯 Skills...');
copyDir(path.join(sourceDir, 'skills'), path.join(PLUGIN_DIR, 'skills'));
console.log('   ✓ Skills synced to', path.join(PLUGIN_DIR, 'skills'));

console.log('\n✅ Dev sync complete!');
console.log('💡 Changes are now available in Claude Code');
console.log('⚠️  You may need to restart Claude session for some changes');
