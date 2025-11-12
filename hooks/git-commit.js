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
    // Get commit hash and details
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8', stderr: 'ignore' }).trim();
    const commitStat = execSync('git log -1 --stat', { encoding: 'utf8', stderr: 'ignore' });
    const filesChangedList = execSync('git diff --name-only HEAD~1', { encoding: 'utf8', stderr: 'ignore' }).trim().split('\n').filter(Boolean);

    // Extract pattern from commit message and files
    const pattern = extractPattern(commitMsg, filesChangedList);

    // Basic quality scoring (simplified for automation)
    const score = calculateBasicScore(filesChanged, commitMsg);

    // Update knowledge base
    updateKnowledgeBase(commitHash, commitMsg, filesChanged, pattern, score);

    // Display summary
    console.log('');
    console.log('🏗️  **MightyArchitect Analysis Complete** (Automatic)');
    console.log('');
    console.log(`**Commit**: ${commitHash} - ${commitMsg}`);
    console.log(`**Files Changed**: ${filesChanged}`);
    console.log(`**Pattern Detected**: ${pattern}`);
    console.log(`**Estimated Score**: ${score}/23 (${getScoreTier(score)})`);
    console.log('');
    console.log('**Knowledge Base Updated**:');
    console.log('✓ `.claude/memory/knowledge/patterns.md`');
    console.log('');
    console.log('💡 **Tip**: Run `/architect-review` for detailed analysis with full 23-point evaluation');
    console.log('');
  } catch (error) {
    // Silent failure - don't break the workflow
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
