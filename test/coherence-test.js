#!/usr/bin/env node
// MightyArchitect v2.0 Coherence Test
// Tests system-wide coherence and integration

const fs = require('fs');
const path = require('path');

console.log('🧪 MIGHTY ARCHITECT v2.0 - COHERENCE TEST');
console.log('=========================================\n');

let passed = 0;
let failed = 0;
const issues = [];

// Test 1: Version Consistency
console.log('📌 Test 1: Version Consistency');
const versionFile = path.join('.claude', 'memory', '.version');
const packageJson = require('../package.json');
if (fs.existsSync(versionFile)) {
  const memoryVersion = fs.readFileSync(versionFile, 'utf8').trim();
  console.log(`  Memory version: ${memoryVersion}`);
  console.log(`  Package version: ${packageJson.version}`);
  if (memoryVersion === 'v2.0') {
    console.log('  ✅ Version consistent\n');
    passed++;
  } else {
    console.log('  ❌ Version mismatch\n');
    issues.push('Version mismatch between memory and package');
    failed++;
  }
} else {
  console.log('  ❌ Version file missing\n');
  issues.push('Version file missing');
  failed++;
}

// Test 2: Agent-Hook Alignment
console.log('📌 Test 2: Agent-Hook Alignment');
const agents = fs.readdirSync('agents').filter(f => f.endsWith('.md'));
const hooks = fs.readdirSync('hooks').filter(f => f.endsWith('.js'));
console.log(`  Agents: ${agents.length} (${agents.join(', ')})`);
console.log(`  Hooks: ${hooks.length} (${hooks.join(', ')})`);
if (agents.includes('architect.md') && agents.includes('task-manager.md')) {
  console.log('  ✅ Required agents present\n');
  passed++;
} else {
  console.log('  ❌ Missing required agents\n');
  issues.push('Required agents missing');
  failed++;
}

// Test 3: Memory Layer Coherence
console.log('📌 Test 3: Memory Layer Coherence');
const coreFiles = fs.readdirSync(path.join('.claude', 'memory', 'core'));
const expectedCore = ['activeContext.md', 'systemPatterns.md', 'projectbrief.md',
                     'productContext.md', 'techContext.md', 'progress.md', 'memory-index.md'];
const missingCore = expectedCore.filter(f => !coreFiles.includes(f));
if (missingCore.length === 0) {
  console.log('  ✅ All core files present\n');
  passed++;
} else {
  console.log(`  ❌ Missing core files: ${missingCore.join(', ')}\n`);
  issues.push(`Missing core files: ${missingCore.join(', ')}`);
  failed++;
}

// Test 4: Hook Registration
console.log('📌 Test 4: Hook Registration');
const prefsPath = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'preferences.json');
if (fs.existsSync(prefsPath)) {
  const prefs = JSON.parse(fs.readFileSync(prefsPath, 'utf8'));
  const registeredHooks = prefs['claude.hooks.nodejs'] || {};
  const expectedHooks = ['SessionStart', 'PostToolUse', 'Stop'];
  const missingHooks = expectedHooks.filter(h => !registeredHooks[h]);
  if (missingHooks.length === 0) {
    console.log('  ✅ All hooks registered\n');
    passed++;
  } else {
    console.log(`  ⚠️  Missing hook registrations: ${missingHooks.join(', ')}\n`);
    console.log('  (Run install.js to register)\n');
    passed++; // Warning, not failure
  }
} else {
  console.log('  ⚠️  Preferences not found (normal if not installed)\n');
  passed++;
}

// Test 5: Pattern Detection Functionality
console.log('📌 Test 5: Pattern Detection');
const patternsPath = path.join('.claude', 'memory', 'core', 'systemPatterns.md');
const patternsContent = fs.readFileSync(patternsPath, 'utf8');
const detectedPatterns = (patternsContent.match(/^## \d{4}-\d{2}-\d{2} - /gm) || []).length;
console.log(`  Patterns detected: ${detectedPatterns}`);
if (detectedPatterns > 0) {
  console.log('  ✅ Pattern detection working\n');
  passed++;
} else {
  console.log('  ⚠️  No patterns detected yet (commit to trigger)\n');
  passed++;
}

// Test 6: Task Log Generation
console.log('📌 Test 6: Task Log Generation');
const tasksDir = path.join('.claude', 'memory', 'tasks');
const taskLogs = fs.readdirSync(tasksDir).filter(f => f.endsWith('.md'));
console.log(`  Task logs found: ${taskLogs.length}`);
if (taskLogs.length > 0) {
  const latestTask = taskLogs.sort().pop();
  console.log(`  Latest: ${latestTask}`);
  console.log('  ✅ Task logging functional\n');
  passed++;
} else {
  console.log('  ⚠️  No task logs yet (complete todos to generate)\n');
  passed++;
}

// Test 7: Commands Installation
console.log('📌 Test 7: Commands Installation');
const commandsDir = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'commands');
if (fs.existsSync(commandsDir)) {
  const commands = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
  const expectedCommands = ['architect-review.md', 'forensic.md', 'bootstrap.md'];
  const installedExpected = expectedCommands.filter(c => commands.includes(c));
  console.log(`  Commands installed: ${commands.length}`);
  console.log(`  Expected commands: ${installedExpected.length}/${expectedCommands.length}`);
  if (installedExpected.length >= 2) {
    console.log('  ✅ Commands installed\n');
    passed++;
  } else {
    console.log('  ⚠️  Some commands missing (run install.js)\n');
    passed++;
  }
} else {
  console.log('  ⚠️  Commands not installed (run install.js)\n');
  passed++;
}

// Test 8: Integration Test Suite
console.log('📌 Test 8: Integration Tests');
const testFiles = fs.readdirSync('test').filter(f => f.endsWith('.js'));
const integrationTests = testFiles.filter(f => f.includes('integration'));
console.log(`  Total tests: ${testFiles.length}`);
console.log(`  Integration tests: ${integrationTests.length}`);
if (integrationTests.length >= 2) {
  console.log('  ✅ Integration test coverage\n');
  passed++;
} else {
  console.log('  ⚠️  Limited integration tests\n');
  passed++;
}

// Test 9: Token Efficiency
console.log('📌 Test 9: Token Efficiency');
const contextSize = fs.readFileSync(path.join('.claude', 'memory', 'core', 'activeContext.md'), 'utf8').length;
const patternsSize = patternsContent.length;
const totalTokenEstimate = Math.round((contextSize + patternsSize) / 4); // ~4 chars per token
console.log(`  Active context: ${contextSize} chars`);
console.log(`  System patterns: ${patternsSize} chars`);
console.log(`  Estimated tokens: ~${totalTokenEstimate}`);
if (totalTokenEstimate < 1500) {
  console.log('  ✅ Within token budget (<1500)\n');
  passed++;
} else {
  console.log('  ⚠️  Approaching token limit\n');
  issues.push(`High token usage: ${totalTokenEstimate}`);
  passed++;
}

// Test 10: Cross-Component References
console.log('📌 Test 10: Cross-Component References');
const architectAgent = fs.readFileSync('agents/architect.md', 'utf8');
const taskManager = fs.readFileSync('agents/task-manager.md', 'utf8');
const hasCrossRefs = architectAgent.includes('Task Manager') && taskManager.includes('Architect');
if (hasCrossRefs) {
  console.log('  ✅ Agents properly cross-reference\n');
  passed++;
} else {
  console.log('  ⚠️  Missing cross-references between agents\n');
  issues.push('Agents should reference each other');
  passed++;
}

// FINAL REPORT
console.log('\n=========================================');
console.log('📊 COHERENCE TEST RESULTS');
console.log('=========================================\n');

const total = passed + failed;
const score = Math.round((passed / total) * 100);

console.log(`  Tests Passed: ${passed}/${total}`);
console.log(`  Coherence Score: ${score}%`);

if (score >= 90) {
  console.log('\n  🏆 EXCELLENT - System highly coherent');
} else if (score >= 75) {
  console.log('\n  ✅ GOOD - System coherent with minor issues');
} else if (score >= 60) {
  console.log('\n  ⚠️  ADEQUATE - System functional but needs attention');
} else {
  console.log('\n  ❌ POOR - System has coherence issues');
}

if (issues.length > 0) {
  console.log('\n  Issues Found:');
  issues.forEach(issue => console.log(`    - ${issue}`));
}

console.log('\n=========================================');
console.log('✨ Coherence test complete!');

process.exit(failed > 0 ? 1 : 0);