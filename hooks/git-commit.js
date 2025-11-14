#!/usr/bin/env node
// hooks/git-commit.js
// MightyArchitect PostToolUse Hook for Git Commits (Automatic Analysis)

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

  // Trigger on any commit with 3+ files changed
  // All commits are architecturally relevant, no type filtering

  // Count files changed (if in git repo)
  try {
    const filesChanged = execSync('git diff --name-only HEAD~1', { encoding: 'utf8', stderr: 'ignore' })
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .length;

    if (filesChanged >= 3) {
      // Automatic analysis triggered!
      analyzeCommit(commitMsg, filesChanged);
    }
  } catch (error) {
    // Not in a git repo or git command failed - exit silently
  }
}

function analyzeCommit(commitMsg, filesChanged) {
  try {
    // Get commit details
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8', stderr: 'ignore' }).trim();
    const commitStat = execSync('git log -1 --stat', { encoding: 'utf8', stderr: 'ignore' });
    const filesChangedList = execSync('git diff --name-only HEAD~1', { encoding: 'utf8', stderr: 'ignore' }).trim().split('\n').filter(Boolean);

    // Get git diff for agent
    const gitDiff = execSync('git diff HEAD~1', { encoding: 'utf8', stderr: 'ignore' });

    // Check if corresponding task log exists
    const tasksDir = path.join(process.cwd(), '.claude', 'memory', 'tasks');
    let taskLogPath = null;

    if (fs.existsSync(tasksDir)) {
      // Find most recent task log (heuristic: created in last 10 minutes)
      const now = Date.now();
      const recentLogs = fs.readdirSync(tasksDir)
        .filter(f => f.endsWith('.md'))
        .map(f => ({
          name: f,
          path: path.join(tasksDir, f),
          mtime: fs.statSync(path.join(tasksDir, f)).mtimeMs
        }))
        .filter(f => now - f.mtime < 10 * 60 * 1000) // Within 10 min
        .sort((a, b) => b.mtime - a.mtime);

      if (recentLogs.length > 0) {
        taskLogPath = recentLogs[0].path;
      }
    }

    // Launch Architect Agent Mode A
    launchArchitectAgentModeA(commitHash, commitMsg, filesChanged, filesChangedList, gitDiff, taskLogPath);

  } catch (error) {
    // Silent failure - don't break workflow
    console.error('⚠️  Architect Agent Mode A failed:', error.message);
  }
}

// Deprecated functions removed - functionality replaced by Agent Mode A
// Old inline pattern detection and scoring moved to Architect Agent
// and Task Manager Agent (23-point system)

function launchArchitectAgentModeA(commitHash, commitMsg, filesChanged, filesChangedList, gitDiff, taskLogPath) {
  console.log('');
  console.log('🏗️  **Architect Agent Mode A** (Quick Observation)');
  console.log('');

  try {
    // Prepare context for analysis
    const context = {
      commitHash,
      commitMsg,
      filesChanged,
      filesChangedList,
      gitDiff: gitDiff.slice(0, 2000),
      taskLogPath,
      timestamp: new Date().toISOString()
    };

    // Write context to temp file for future agent invocation
    // When integrated with Claude, this context will be passed to Task tool
    const tempFile = path.join(process.cwd(), '.claude', 'memory', '.agent-mode-a-context.json');
    if (fs.existsSync(path.dirname(tempFile))) {
      fs.writeFileSync(tempFile, JSON.stringify(context, null, 2));
    }

    /*
     * INTEGRATION NOTE:
     * When this hook runs within Claude, it should trigger:
     *
     * Task tool:
     *   subagent_type: "architect"
     *   description: "Quick observation of architectural commit"
     *   model: "haiku"  // Fast model for 60s max
     *   prompt: <agentPrompt with context>
     *
     * The agent will:
     * 1. Read the context file
     * 2. Analyze git diff and task log
     * 3. Detect architectural patterns
     * 4. Update systemPatterns.md
     * 5. Return warnings if issues found
     */

    // Enhanced pattern detection with architectural analysis
    const analysis = analyzeArchitecturalSignificance(filesChangedList, commitMsg, gitDiff);

    console.log(`✓ Pattern: ${analysis.pattern}`);
    if (analysis.significance) {
      console.log(`  Significance: ${analysis.significance}`);
    }

    // Comprehensive health check
    const healthIssues = performHealthCheck();
    healthIssues.forEach(issue => {
      console.log(`⚠️ Warning: ${issue}`);
    });

    // Append pattern to systemPatterns.md with more context
    const coreDir = path.join(process.cwd(), '.claude', 'memory', 'core');
    const patternsPath = path.join(coreDir, 'systemPatterns.md');

    if (fs.existsSync(patternsPath)) {
      // Check if this commit was already processed
      const existingContent = fs.readFileSync(patternsPath, 'utf8');
      if (existingContent.includes(`**Commit:** ${commitHash}`)) {
        console.log('  ℹ️  Pattern already recorded for this commit');
        return;
      }

      const date = new Date().toISOString().split('T')[0];
      const entry = `
## ${date} - ${analysis.pattern}

**Commit:** ${commitHash} - ${commitMsg}
**Files Changed:** ${filesChanged} files
**Architectural Significance:** ${analysis.significance || 'General update'}

**Files Modified:**
${filesChangedList.slice(0, 10).map(f => `- ${f}`).join('\n')}${filesChangedList.length > 10 ? `\n... and ${filesChangedList.length - 10} more` : ''}

**Auto-detected by Architect Agent Mode A**
${taskLogPath ? `**Related Task Log:** ${path.basename(taskLogPath)}` : ''}

*Note: For comprehensive analysis, run \`/architect-review\`*

---

`;
      fs.appendFileSync(patternsPath, entry);
    }

    // Clean up temp context file after 1 minute (agent should have read it by then)
    setTimeout(() => {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }, 60000);

  } catch (error) {
    console.error('⚠️ Architect Agent Mode A encountered an error:', error.message);
  }

  console.log('');
  console.log('💡 Tip: Run `/architect-review` for comprehensive analysis');
  console.log('');
}

function analyzeArchitecturalSignificance(files, commitMsg, gitDiff) {
  // Enhanced pattern detection with architectural context
  const analysis = {
    pattern: 'General Architecture Update',
    significance: null
  };

  // Analyze file types and directories
  const hasMiddleware = files.some(f => f.includes('middleware'));
  const hasService = files.some(f => f.includes('service'));
  const hasController = files.some(f => f.includes('controller') || f.includes('route'));
  const hasModel = files.some(f => f.includes('model') || f.includes('schema'));
  const hasTest = files.some(f => f.includes('test') || f.includes('spec'));
  const hasConfig = files.some(f => f.includes('config') || f.includes('.env'));
  const hasHook = files.some(f => f.includes('hook'));
  const hasAgent = files.some(f => f.includes('agent'));

  // Pattern identification with priority
  if (hasAgent && hasHook) {
    analysis.pattern = 'Agent-Hook Integration Pattern';
    analysis.significance = 'Automated workflow enhancement';
  } else if (hasMiddleware && hasController) {
    analysis.pattern = 'Middleware-Controller Pattern';
    analysis.significance = 'Request processing pipeline';
  } else if (hasService && hasModel) {
    analysis.pattern = 'Service Layer Pattern';
    analysis.significance = 'Business logic separation';
  } else if (hasController && hasModel && hasService) {
    analysis.pattern = 'MVC/Three-Tier Architecture';
    analysis.significance = 'Full stack implementation';
  } else if (hasMiddleware) {
    analysis.pattern = 'Middleware Pattern';
    analysis.significance = 'Cross-cutting concerns';
  } else if (hasTest) {
    analysis.pattern = 'Test-Driven Development';
    analysis.significance = 'Quality assurance';
  } else if (hasConfig) {
    analysis.pattern = 'Configuration Management';
    analysis.significance = 'Environment setup';
  } else if (hasHook) {
    analysis.pattern = 'Event-Driven Hook Pattern';
    analysis.significance = 'Automated triggers';
  }

  // Analyze commit message for additional context
  if (commitMsg.includes('refactor')) {
    analysis.significance = (analysis.significance || '') + ' - Code restructuring';
  } else if (commitMsg.includes('perf')) {
    analysis.significance = (analysis.significance || '') + ' - Performance optimization';
  } else if (commitMsg.includes('feat')) {
    analysis.significance = (analysis.significance || '') + ' - New capability';
  }

  return analysis;
}

function performHealthCheck() {
  const issues = [];
  const coreDir = path.join(process.cwd(), '.claude', 'memory', 'core');

  if (!fs.existsSync(coreDir)) {
    issues.push('core/ directory missing - run SessionStart to initialize');
    return issues;
  }

  // Check each core file
  const coreFiles = [
    { name: 'projectbrief.md', minSize: 50 },
    { name: 'productContext.md', minSize: 50 },
    { name: 'techContext.md', minSize: 50 },
    { name: 'systemPatterns.md', minSize: 30 },
    { name: 'activeContext.md', minSize: 30 },
    { name: 'progress.md', minSize: 30 }
  ];

  coreFiles.forEach(file => {
    const filePath = path.join(coreDir, file.name);
    if (!fs.existsSync(filePath)) {
      issues.push(`${file.name} missing - run /architect-review to create`);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.length < file.minSize) {
        issues.push(`${file.name} appears empty - complete via /architect-review`);
      }
    }
  });

  // Check memory index
  const memoryIndexPath = path.join(process.cwd(), '.claude', 'memory', 'memory-index.md');
  if (!fs.existsSync(memoryIndexPath)) {
    issues.push('memory-index.md missing - run /architect-review to generate');
  }

  return issues;
}

