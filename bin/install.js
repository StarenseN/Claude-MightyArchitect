#!/usr/bin/env node
// bin/install.js
// MightyArchitect Installation Script

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const HOME = process.env.HOME || process.env.USERPROFILE;
const CLAUDE_DIR = path.join(HOME, '.claude');
const PLUGIN_DIR = path.join(CLAUDE_DIR, 'plugins', 'mighty-architect');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');
const TEST_MODE = process.argv.includes('--test-mode');

// Color output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Update Claude settings
function updateSettings(autoInit) {
  let settings = {};

  if (fs.existsSync(SETTINGS_FILE)) {
    settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  }

  // Add MightyArchitect config
  settings.mightyArchitect = {
    autoInit: autoInit,
    version: '1.0.0',
    installedAt: new Date().toISOString()
  };

  // Register hooks (Node.js, not bash)
  settings.hooks = settings.hooks || {};

  settings.hooks.SessionStart = settings.hooks.SessionStart || [];
  settings.hooks.SessionStart.push({
    matcher: 'startup',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'session-start.js')}"`
    }]
  });

  settings.hooks.PostToolUse = settings.hooks.PostToolUse || [];
  settings.hooks.PostToolUse.push({
    matcher: 'Bash',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'git-commit.js')}"`
    }]
  });

  settings.hooks.Stop = settings.hooks.Stop || [];
  settings.hooks.Stop.push({
    matcher: '',
    hooks: [{
      type: 'command',
      command: `node "${path.join(PLUGIN_DIR, 'hooks', 'stop.js')}"`
    }]
  });

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

// Prompt user for auto-init preference
async function promptAutoInit() {
  if (TEST_MODE) return true;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(
      '\n🏗️  Auto-initialize MightyArchitect in new projects? (y/n): ',
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y');
      }
    );
  });
}

// Main installation
async function install() {
  log('\n🏗️  Installing MightyArchitect...', 'blue');

  // Step 1: Create plugin directory
  log('\n1. Creating plugin directory...', 'yellow');
  fs.mkdirSync(PLUGIN_DIR, { recursive: true });
  log('   ✓ Directory created', 'green');

  // Step 2: Copy files
  log('\n2. Copying plugin files...', 'yellow');
  const sourceDir = path.join(__dirname, '..');
  copyDir(path.join(sourceDir, 'templates'), path.join(PLUGIN_DIR, 'templates'));
  copyDir(path.join(sourceDir, 'hooks'), path.join(PLUGIN_DIR, 'hooks'));
  copyDir(path.join(sourceDir, 'skills'), path.join(PLUGIN_DIR, 'skills'));
  log('   ✓ Files copied', 'green');

  // Step 3: Configure auto-init
  log('\n3. Configuring preferences...', 'yellow');
  const autoInit = await promptAutoInit();
  updateSettings(autoInit);
  log(`   ✓ Auto-init: ${autoInit ? 'enabled' : 'disabled'}`, 'green');

  // Step 4: Success message
  log('\n✨ Installation complete!', 'green');
  log('\nMightyArchitect is now installed.', 'blue');
  log('\nKey Features:', 'yellow');
  log('  ✓ Zero external dependencies (pure Node.js)');
  log('  ✓ Cross-platform (Windows/macOS/Linux)');
  log('  ✓ Auto-initializes in new projects');
  log('\nUsage:', 'yellow');
  log('  • Start Claude in any project: Memory system initializes automatically');
  log('  • Manual review: Use /architect-review command');
  log('  • View memory: Check .claude/memory/ directory');
  log('\nDocumentation: https://github.com/your-repo/mighty-architect\n');
}

// Run installation
install().catch(err => {
  console.error('Installation failed:', err);
  process.exit(1);
});
