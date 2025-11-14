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

function extractPattern(commitMsg, files) {
  // Analyze commit type and files to detect pattern
  const commitType = commitMsg.split(':')[0];

  // Check file types
  const hasTests = files.some(f => f.includes('test') || f.includes('spec'));
  const hasModels = files.some(f => f.includes('model') || f.includes('schema'));
  const hasControllers = files.some(f => f.includes('controller') || f.includes('route'));
  const hasMiddleware = files.some(f => f.includes('middleware'));
  const hasComponents = files.some(f => f.includes('component'));
  const hasServices = files.some(f => f.includes('service'));
  const hasUtils = files.some(f => f.includes('util') || f.includes('helper'));

  // Pattern detection logic
  if (hasMiddleware) return 'Middleware/Interceptor Pattern';
  if (hasControllers && hasModels && hasServices) return 'Layered Architecture (MVC/Three-tier)';
  if (hasControllers && hasModels) return 'MVC Pattern';
  if (hasServices && hasModels) return 'Service Layer Pattern';
  if (hasComponents) return 'Component-Based Architecture';
  if (hasUtils) return 'Utility/Helper Pattern';
  if (commitType === 'refactor') return 'Code Refactoring';
  if (commitType === 'perf') return 'Performance Optimization';

  return 'General Architecture Update';
}

function calculateBasicScore(filesChanged, commitMsg) {
  // Simplified scoring for automatic analysis
  let score = 15; // Base score

  // Rewards
  if (commitMsg.length > 30 && commitMsg.length < 80) score += 2; // Good commit message
  if (filesChanged >= 3 && filesChanged <= 7) score += 2; // Reasonable scope
  if (commitMsg.includes('test')) score += 2; // Mentions testing

  // Note: Full 23-point analysis requires /architect-review command

  return Math.min(score, 20); // Cap at 20 for automatic, reserve 21-23 for manual review
}

function getScoreTier(score) {
  if (score >= 21) return 'Excellent';
  if (score >= 18) return 'Sufficient';
  return 'Needs Review';
}

function updateKnowledgeBase(commitHash, commitMsg, filesChanged, pattern, score) {
  try {
    const memoryDir = path.join(process.cwd(), '.claude', 'memory', 'knowledge');
    const patternsFile = path.join(memoryDir, 'patterns.md');

    // Ensure directory exists
    if (!fs.existsSync(memoryDir)) {
      return; // Memory not initialized, skip
    }

    // Read existing patterns or create new
    let patternsContent = '';
    if (fs.existsSync(patternsFile)) {
      patternsContent = fs.readFileSync(patternsFile, 'utf8');
    } else {
      patternsContent = '# Architectural Patterns\n\n';
    }

    // Create new entry
    const date = new Date().toISOString().split('T')[0];
    const newEntry = `
## ${date} - ${pattern}

**Commit**: ${commitHash} - ${commitMsg}
**Score**: ${score}/23 (${getScoreTier(score)}) - Auto-analyzed
**Files Changed**: ${filesChanged}

**Pattern**: ${pattern}

**Auto-Analysis Notes**:
- Detected from commit structure and file changes
- For detailed evaluation, run \`/architect-review\`
- This is a basic pattern recognition to keep knowledge base current

---

`;

    // Append new entry at the top (after header)
    const lines = patternsContent.split('\n');
    const headerEnd = lines.findIndex((line, idx) => idx > 0 && line.startsWith('##'));

    if (headerEnd > 0) {
      lines.splice(headerEnd, 0, newEntry);
      patternsContent = lines.join('\n');
    } else {
      patternsContent += newEntry;
    }

    // Write updated file
    fs.writeFileSync(patternsFile, patternsContent, 'utf8');
  } catch (error) {
    // Silent failure - don't break workflow
  }
}

function launchArchitectAgentModeA(commitHash, commitMsg, filesChanged, filesChangedList, gitDiff, taskLogPath) {
  console.log('');
  console.log('🏗️  **Architect Agent Mode A** (Quick Observation)');
  console.log('');

  // Prepare prompt for agent
  const agentPrompt = `
You are in Mode A (automatic observation after commit).

**Commit:** ${commitHash} - ${commitMsg}
**Files Changed:** ${filesChanged}
**Files List:**
${filesChangedList.map(f => `- ${f}`).join('\n')}

**Git Diff:**
\`\`\`
${gitDiff.slice(0, 2000)}${gitDiff.length > 2000 ? '\n... (truncated)' : ''}
\`\`\`

${taskLogPath ? `**Recent Task Log:** ${path.basename(taskLogPath)}\n(Read this file for implementation context)` : '**No recent task log found**'}

**Your Task (Mode A - 60s max):**

1. Detect architectural pattern from this commit
2. Read task log if provided (for implementation context)
3. Quick health check: Do core/ files exist? Any empty?
4. Append detected pattern to \`.claude/memory/core/systemPatterns.md\`
5. If issues detected, output WARNING (don't repair - Mode C handles that)

**Output Format:**
\`\`\`
✓ Pattern: [Pattern Name]
⚠️ Warning: [Issue if detected]
\`\`\`

Be concise. Focus on architectural significance, not code quality (Task Manager's job).
`.trim();

  // For Phase 3, we'll write output to console
  // In final implementation, this would use Task tool with subagent_type: "architect"
  // For now, simulate with simple pattern detection

  const pattern = detectPatternFromFiles(filesChangedList);

  console.log(`✓ Pattern: ${pattern}`);

  // Quick health check
  const coreDir = path.join(process.cwd(), '.claude', 'memory', 'core');
  if (!fs.existsSync(coreDir)) {
    console.log('⚠️ Warning: core/ directory missing - run SessionStart to initialize');
  } else {
    const productContextPath = path.join(coreDir, 'productContext.md');
    if (fs.existsSync(productContextPath)) {
      const content = fs.readFileSync(productContextPath, 'utf8');
      if (content.length < 100) {
        console.log('⚠️ Warning: productContext.md is empty - run /architect-review');
      }
    }
  }

  // Append pattern to systemPatterns.md
  const patternsPath = path.join(coreDir, 'systemPatterns.md');
  if (fs.existsSync(patternsPath)) {
    const date = new Date().toISOString().split('T')[0];
    const entry = `\n## ${date} - ${pattern}\n\n**Commit:** ${commitHash} - ${commitMsg}\n**Files Changed:** ${filesChanged}\n\n**Auto-detected by Architect Agent Mode A**\n\n---\n\n`;
    fs.appendFileSync(patternsPath, entry);
  }

  console.log('');
  console.log('💡 Tip: Run `/architect-review` for comprehensive analysis');
  console.log('');
}

function detectPatternFromFiles(files) {
  // Simple pattern detection (will be replaced by actual agent)
  const hasMiddleware = files.some(f => f.includes('middleware'));
  const hasService = files.some(f => f.includes('service'));
  const hasController = files.some(f => f.includes('controller') || f.includes('route'));
  const hasModel = files.some(f => f.includes('model') || f.includes('schema'));

  if (hasMiddleware) return 'Middleware Pattern';
  if (hasService && hasModel) return 'Service Layer Pattern';
  if (hasController && hasModel) return 'MVC Pattern';
  return 'General Architecture Update';
}
