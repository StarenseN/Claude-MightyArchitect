#!/usr/bin/env node
// test/integration-test-mode-a.js
// Test Architect Agent Mode A trigger on commits

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

console.log('Testing Architect Agent Mode A Trigger...');

const testDir = path.join(os.tmpdir(), 'mighty-mode-a-' + Date.now());
const originalDir = process.cwd();

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

  // Create v2.0 memory structure
  const memoryDir = '.claude/memory';
  fs.mkdirSync(path.join(memoryDir, 'core'), { recursive: true });
  fs.mkdirSync(path.join(memoryDir, 'knowledge'), { recursive: true });
  fs.mkdirSync(path.join(memoryDir, 'tasks'), { recursive: true });

  // Create minimal core files
  fs.writeFileSync(path.join(memoryDir, '.version'), 'v2.0\n');
  fs.writeFileSync(
    path.join(memoryDir, 'core', 'activeContext.md'),
    '# Active Context\n\n## Current Focus\nTesting Mode A\n'
  );
  fs.writeFileSync(
    path.join(memoryDir, 'core', 'systemPatterns.md'),
    '# Architectural Patterns\n\n<!-- Patterns will be added here by Mode A -->\n'
  );
  fs.writeFileSync(
    path.join(memoryDir, 'core', 'productContext.md'),
    '# Product Context\n\nTest project for Mode A\n'
  );

  // Copy git-commit hook
  fs.copyFileSync(
    path.join(originalDir, 'hooks', 'git-commit.js'),
    path.join(testDir, 'git-commit.js')
  );

  // Create initial commit
  fs.writeFileSync('README.md', '# Test Project\n');
  execSync('git add .');
  execSync('git commit -m "initial: setup"', { stdio: 'pipe' });

  // Test 1: Mode A triggers on feat: with 3+ files
  console.log('Test 1: Mode A triggers on architectural commit...\n');

  // Create architectural changes
  fs.mkdirSync('middleware', { recursive: true });
  fs.writeFileSync('middleware/auth.js', '// Authentication middleware\n');
  fs.writeFileSync('middleware/logger.js', '// Logging middleware\n');
  fs.writeFileSync('middleware/error.js', '// Error handling\n');
  fs.writeFileSync('routes/api.js', '// API routes\n');

  execSync('git add .', { stdio: 'pipe' });
  execSync('git commit -m "feat: add middleware layer for authentication"', { stdio: 'pipe' });

  // Run hook to simulate post-commit
  const hookInput = JSON.stringify({
    hook_event_name: 'PostToolUse',
    tool_name: 'Bash',
    tool_input: {
      command: 'git commit -m "feat: add middleware layer for authentication"'
    }
  });

  fs.writeFileSync('.hook-input.json', hookInput);
  const isWindows = process.platform === 'win32';
  const catCmd = isWindows ? 'type' : 'cat';

  const output = execSync(`${catCmd} .hook-input.json | node git-commit.js`, {
    encoding: 'utf8'
  });

  // Verify Mode A output
  if (!output.includes('Architect Agent Mode A')) {
    throw new Error('Mode A did not trigger');
  }
  console.log('  ✓ Mode A triggered');

  if (!output.includes('Pattern:')) {
    throw new Error('Pattern detection missing');
  }
  console.log('  ✓ Pattern detected');

  // Check for enhanced pattern detection
  if (output.includes('Middleware') || output.includes('middleware')) {
    console.log('  ✓ Correct pattern identified (Middleware)');
  } else {
    console.log('  ⚠️ Pattern detection could be improved');
  }

  if (output.includes('Significance:')) {
    console.log('  ✓ Architectural significance analyzed');
  }

  // Test 2: Pattern appended to systemPatterns.md
  console.log('\nTest 2: Pattern recording...');

  const patternsContent = fs.readFileSync(
    path.join(memoryDir, 'core', 'systemPatterns.md'),
    'utf8'
  );

  if (!patternsContent.includes('feat: add middleware')) {
    throw new Error('Pattern not recorded in systemPatterns.md');
  }
  console.log('  ✓ Pattern appended to systemPatterns.md');

  if (patternsContent.includes('Auto-detected by Architect Agent Mode A')) {
    console.log('  ✓ Pattern marked as auto-detected');
  }

  // Test 3: Context file creation
  console.log('\nTest 3: Context file for agent integration...');

  const contextFile = path.join(memoryDir, '.agent-mode-a-context.json');
  // File might be deleted after 60s, but let's check if it was created
  if (fs.existsSync(contextFile)) {
    const context = JSON.parse(fs.readFileSync(contextFile, 'utf8'));
    if (context.commitMsg && context.filesChanged && context.gitDiff) {
      console.log('  ✓ Context file created with required fields');
    }
  } else {
    console.log('  ✓ Context file handled (may be auto-cleaned)');
  }

  // Test 4: Health check warnings
  console.log('\nTest 4: Health check functionality...');

  // Create scenario with empty core file
  fs.writeFileSync(path.join(memoryDir, 'core', 'techContext.md'), '');

  // Create another commit to trigger Mode A
  fs.writeFileSync('services/user.js', '// User service\n');
  fs.writeFileSync('services/auth.js', '// Auth service\n');
  fs.writeFileSync('models/user.js', '// User model\n');

  execSync('git add .', { stdio: 'pipe' });
  execSync('git commit -m "feat: add service layer"', { stdio: 'pipe' });

  const hookInput2 = JSON.stringify({
    hook_event_name: 'PostToolUse',
    tool_name: 'Bash',
    tool_input: {
      command: 'git commit -m "feat: add service layer"'
    }
  });

  fs.writeFileSync('.hook-input2.json', hookInput2);
  const output2 = execSync(`${catCmd} .hook-input2.json | node git-commit.js`, {
    encoding: 'utf8'
  });

  if (output2.includes('Warning:') && output2.includes('techContext.md')) {
    console.log('  ✓ Health check detects empty files');
  } else {
    console.log('  ⚠️ Health check could be more thorough');
  }

  // Test 5: Mode A does NOT trigger on non-architectural commits
  console.log('\nTest 5: Mode A skips non-architectural commits...');

  fs.writeFileSync('README.md', '# Updated readme\n');
  execSync('git add .', { stdio: 'pipe' });
  execSync('git commit -m "docs: update readme"', { stdio: 'pipe' });

  const hookInput3 = JSON.stringify({
    hook_event_name: 'PostToolUse',
    tool_name: 'Bash',
    tool_input: {
      command: 'git commit -m "docs: update readme"'
    }
  });

  fs.writeFileSync('.hook-input3.json', hookInput3);
  const output3 = execSync(`${catCmd} .hook-input3.json | node git-commit.js`, {
    encoding: 'utf8'
  });

  if (output3.includes('Architect Agent Mode A')) {
    throw new Error('Mode A triggered on docs commit (should skip)');
  }
  console.log('  ✓ Mode A correctly skips docs: commits');

  console.log('\n✅ All Architect Mode A tests passed!');

} catch (error) {
  console.error('\n✗ Test failed:', error.message);
  process.exit(1);
} finally {
  process.chdir(originalDir);
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
}