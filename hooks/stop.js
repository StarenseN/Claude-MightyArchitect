#!/usr/bin/env node
// hooks/stop.js
// MightyArchitect Stop Hook - Task Logging Reminder

const { execSync } = require('child_process');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    main();
  } catch (error) {
    // Errors are non-fatal, exit silently
    process.exit(0);
  }
});

function main() {
  // Check if in git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
  } catch (error) {
    // Not in a git repo, exit silently
    return;
  }

  // Check if files were modified (staged or unstaged)
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8', stderr: 'ignore' });
    const modifiedFiles = status.trim().split('\n').filter(line => line.length > 0).length;

    if (modifiedFiles > 0) {
      console.log('');
      console.log('💾 **MightyArchitect Memory Update**');
      console.log('');
      console.log('Files modified in this session. Consider:');
      console.log('- Update `.claude/memory/activeContext.md` with current state');
      console.log(`- Log completed work to \`.claude/memory/tasks/${new Date().toISOString().split('T')[0]}-task.md\``);
      console.log('- Use template: `.claude/memory/tasks/template.md`');
      console.log('');
    }
  } catch (error) {
    // Git command failed, exit silently
  }
}
