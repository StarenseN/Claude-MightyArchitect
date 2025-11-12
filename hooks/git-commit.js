#!/usr/bin/env node
// hooks/git-commit.js
// MightyArchitect PostToolUse Hook for Git Commits

const { execSync } = require('child_process');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    main(data);
  } catch (error) {
    // Invalid JSON or other error - exit silently
    process.exit(0);
  }
});

function main(data) {
  const toolName = data.tool_name || '';
  const command = data.tool_input?.command || '';

  // Only process git commit commands
  if (toolName !== 'Bash' || !command.includes('git commit')) {
    return;
  }

  // Extract commit message
  const match = command.match(/git commit.*-m ["']([^"']+)["']/);
  if (!match) {
    return;
  }

  const commitMsg = match[1];

  // Filter: only architectural commits
  if (!/^(feat|refactor|perf):/.test(commitMsg)) {
    return;
  }

  // Count files changed (if in git repo)
  try {
    const filesChanged = execSync('git diff --name-only HEAD~1', { encoding: 'utf8', stderr: 'ignore' })
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .length;

    if (filesChanged >= 3) {
      console.log('');
      console.log('🏗️  **MightyArchitect Analysis Triggered**');
      console.log('');
      console.log(`Significant architectural changes detected (${filesChanged} files).`);
      console.log(`Commit: ${commitMsg}`);
      console.log('');
      console.log('**Action Required:** Review patterns and update knowledge base.');
      console.log('Run: \`/architect-review\` or let me analyze automatically.');
      console.log('');
    }
  } catch (error) {
    // Not in a git repo or git command failed - exit silently
  }
}
