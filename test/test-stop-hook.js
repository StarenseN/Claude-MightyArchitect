#!/usr/bin/env node
// test/test-stop-hook.js

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

console.log('Testing Stop Hook...');

// Setup: create a test git repo with modified files
const testDir = path.join(process.cwd(), 'test-stop-repo');
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true });
}
fs.mkdirSync(testDir);

const originalDir = process.cwd();

// Copy hook to test dir
fs.copyFileSync(
  path.join(originalDir, 'hooks', 'stop.js'),
  path.join(testDir, 'stop.js')
);

process.chdir(testDir);

execSync('git init');
execSync('git config user.email "test@example.com"');
execSync('git config user.name "Test User"');
fs.writeFileSync('file.txt', 'test');
execSync('git add file.txt');

// Helper function to run hook with input
function runHook(input) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['stop.js'], {
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

// Test 1: Hook reminds when files modified
console.log('Test 1: Hook reminds when files modified...');
runHook({ hook_event_name: 'Stop' })
.then(output => {
  if (output.includes('MightyArchitect Memory Update') && output.includes('activeContext.md')) {
    console.log('✓ Test 1 passed: Reminder shown for modified files');
    return Promise.resolve();
  } else {
    console.log('✗ Test 1 failed: No reminder for modified files');
    console.log('Output:', output);
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
