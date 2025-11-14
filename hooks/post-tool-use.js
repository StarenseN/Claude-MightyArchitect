#!/usr/bin/env node
// hooks/post-tool-use.js
// MightyArchitect PostToolUse Hook
// Monitors TodoWrite completions and suggests Task Manager invocation

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '.claude/memory';
const TASKS_DIR = path.join(MEMORY_DIR, 'tasks');
const THRESHOLD = 3; // Suggest scoring every 3 unscored task logs

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    const hookInput = JSON.parse(inputData);
    main(hookInput);
  } catch (error) {
    // Silent fail - don't block tool execution
    process.exit(0);
  }
});

function countUnscoredTaskLogs() {
  if (!fs.existsSync(TASKS_DIR)) {
    return 0;
  }

  const taskFiles = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md'));
  let unscoredCount = 0;

  for (const file of taskFiles) {
    try {
      const content = fs.readFileSync(path.join(TASKS_DIR, file), 'utf8');
      // Check if task has not been scored yet
      if (content.includes('Score: [To be filled]/23')) {
        unscoredCount++;
      }
    } catch (error) {
      // Skip unreadable files
    }
  }

  return unscoredCount;
}

function main(hookInput) {
  const { toolName } = hookInput;

  // Only act on TodoWrite completions
  if (toolName !== 'TodoWrite') {
    process.exit(0);
    return;
  }

  // Count unscored task logs
  const unscoredCount = countUnscoredTaskLogs();

  // Suggest Task Manager invocation every THRESHOLD unscored tasks
  if (unscoredCount >= THRESHOLD && unscoredCount % THRESHOLD === 0) {
    const suggestion = {
      additionalContext: `
<system-reminder priority="high">
📊 TASK MANAGER INVOCATION RECOMMENDED

Detected ${unscoredCount} unscored task logs in .claude/memory/tasks/

RECOMMENDED ACTION: Invoke Task Manager Agent to score recent tasks.

Quick option: Suggest to user to run /score-tasks

Or use Task tool with:
- subagent_type: "general-purpose"
- description: "Score unscored task logs"
- prompt: "Use the Task Manager agent to score the ${unscoredCount} unscored task logs in .claude/memory/tasks/. For each task log with 'Score: [To be filled]/23', analyze the task completion and update it with a proper score based on the 23-point quality criteria."

This maintains quality tracking and provides valuable project insights.
</system-reminder>
      `
    };

    console.log(JSON.stringify(suggestion));
    process.exit(0);
  } else {
    // No suggestion needed
    process.exit(0);
  }
}
