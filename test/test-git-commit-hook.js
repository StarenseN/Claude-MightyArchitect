#!/usr/bin/env node
// test/test-git-commit-hook.js

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

console.log('Testing Git Commit Hook...');

// Setup test git repo with 3+ file changes
const testDir = path.join(process.cwd(), 'test-git-repo');
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir);

const originalDir = process.cwd();

// Copy hook to test dir
fs.copyFileSync(
  path.join(originalDir, 'hooks', 'git-commit.js'),
  path.join(testDir, 'git-commit.js')
);

process.chdir(testDir);

execSync('git init');
execSync('git config user.email "test@example.com"');
execSync('git config user.name "Test User"');

// Create initial commit
fs.writeFileSync('file1.txt', 'content1');
execSync('git add .');
execSync('git commit -m "initial"');

// Create commit with 3+ files for feat: test
fs.writeFileSync('file2.txt', 'content2');
fs.writeFileSync('file3.txt', 'content3');
fs.writeFileSync('file4.txt', 'content4');
execSync('git add .');
execSync('git commit -m "feat: add files"');

// Helper function to run hook with input
function runHook(input) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['git-commit.js'], {
      cwd: testDir
    });

    let output = '';
    let errorOutput = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0 && errorOutput) {
        reject(new Error(errorOutput));
      } else {
        resolve(output);
      }
    });

    // Write input to stdin
    proc.stdin.write(JSON.stringify(input));
    proc.stdin.end();
  });
}

// Test 1: Hook triggers on feat: commit with 3+ files
console.log('Test 1: Hook triggers on feat: commit...');
runHook({
  hook_event_name: 'PostToolUse',
  tool_name: 'Bash',
  tool_input: { command: 'git commit -m "feat: add new feature"' }
})
.then(output => {
  if (output.includes('Analysis Complete')) {
    console.log('✓ Test 1 passed: Automatic analysis triggered on feat: commit');
    return Promise.resolve();
  } else {
    console.log('✗ Test 1 failed: Did not trigger automatic analysis on feat:');
    console.log('Output:', output);
    process.exit(1);
  }
})
// Test 2: Hook skips chore: commit
.then(() => {
  console.log('Test 2: Hook skips chore: commit...');
  return runHook({
    hook_event_name: 'PostToolUse',
    tool_name: 'Bash',
    tool_input: { command: 'git commit -m "chore: update deps"' }
  });
})
.then(output => {
  if (output.trim() === '') {
    console.log('✓ Test 2 passed: Skipped chore: commit');
    return Promise.resolve();
  } else {
    console.log('✗ Test 2 failed: Should not trigger on chore:');
    process.exit(1);
  }
})
// Test 3: Hook skips non-git commands
.then(() => {
  console.log('Test 3: Hook skips non-git command...');
  return runHook({
    hook_event_name: 'PostToolUse',
    tool_name: 'Bash',
    tool_input: { command: 'npm install' }
  });
})
.then(output => {
  if (output.trim() === '') {
    console.log('✓ Test 3 passed: Skipped non-git command');
    return Promise.resolve();
  } else {
    console.log('✗ Test 3 failed: Should not trigger on non-git');
    process.exit(1);
  }
})
.then(() => {
  // Cleanup
  process.chdir(originalDir);
  fs.rmSync(testDir, { recursive: true });
  console.log('All tests passed!');
})
.catch(error => {
  console.log('✗ Test failed with error:', error.message);
  process.chdir(originalDir);
  fs.rmSync(testDir, { recursive: true });
  process.exit(1);
});
