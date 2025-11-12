#!/usr/bin/env node
// hooks/pre-tool-use-todowrite.js
// MightyArchitect PreToolUse Hook for TodoWrite
// Auto-creates task logs when todos complete with flexible granularity

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '.claude/memory';
const TASKS_DIR = path.join(MEMORY_DIR, 'tasks');
const STATE_FILE = path.join(MEMORY_DIR, '.todo-state.json');

// Read stdin for hook input
let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(inputData);
    main(hookData);
  } catch (error) {
    // Log error for debugging, but don't block TodoWrite
    console.error('[TodoWrite Hook Error]:', error.message);
    console.error('Stack:', error.stack);
    process.exit(0);
  }
});

function main(hookData) {
  // Skip if not in a MightyArchitect-enabled project
  if (!fs.existsSync(MEMORY_DIR)) {
    console.error('[TodoWrite Hook] Memory dir not found, skipping');
    process.exit(0);
  }

  const newTodos = hookData.tool_input?.todos || [];
  console.error('[TodoWrite Hook] Received', newTodos.length, 'todos');

  // Load previous state
  const prevTodos = loadPreviousState();
  console.error('[TodoWrite Hook] Previous state:', prevTodos.length, 'todos');

  // Detect completed todos
  const completedTodos = detectCompletedTodos(prevTodos, newTodos);
  console.error('[TodoWrite Hook] Detected', completedTodos.length, 'completed todos');

  if (completedTodos.length > 0) {
    // Analyze completion pattern
    const pattern = analyzeCompletionPattern(completedTodos, newTodos);

    if (pattern.type === 'single') {
      // Single todo completed → create 1 task log
      createTaskLog(completedTodos[0], 'single-todo');
    } else if (pattern.type === 'theme-complete') {
      // Thematic batch completed → create 1 task log for theme
      createTaskLog(pattern.theme, 'theme-batch', completedTodos);
    }
    // If theme-partial, wait for more todos to complete
  }

  // Save current state for next invocation
  saveState(newTodos);

  process.exit(0);
}

function loadPreviousState() {
  if (!fs.existsSync(STATE_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(STATE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveState(todos) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(todos, null, 2));
}

function detectCompletedTodos(prevTodos, newTodos) {
  const completed = [];

  for (let i = 0; i < newTodos.length; i++) {
    const newTodo = newTodos[i];
    const prevTodo = prevTodos[i];

    // Detect transition to "completed" status
    if (newTodo.status === 'completed' &&
        prevTodo?.status !== 'completed') {
      completed.push(newTodo);
    }
  }

  return completed;
}

function analyzeCompletionPattern(completedTodos, allTodos) {
  // Single todo completion
  if (completedTodos.length === 1) {
    const todo = completedTodos[0];

    // Check if part of a plan (contains "Task X:" or similar patterns)
    const isPlanTask = /^(Task|Step)\s+\d+:/i.test(todo.content) ||
                       /^(Implementing|Creating|Adding|Fixing|Updating)/i.test(todo.content);

    if (!isPlanTask) {
      return { type: 'single', todo };
    }

    // Part of a plan - check if theme is complete
    const theme = detectTheme(todo, allTodos);

    if (theme.complete) {
      return { type: 'theme-complete', theme };
    } else {
      return { type: 'theme-partial', theme };
    }
  }

  // Multiple todos completed simultaneously
  if (completedTodos.length > 1) {
    // Likely a theme completion
    const theme = {
      name: inferThemeName(completedTodos),
      todos: completedTodos,
      complete: true
    };
    return { type: 'theme-complete', theme };
  }

  return { type: 'unknown' };
}

function detectTheme(todo, allTodos) {
  // Extract potential theme from todo content
  // Examples:
  // "Implement JWT authentication" → theme: "JWT authentication"
  // "Task 1: Create user model" → theme: "Create user model" (from plan)

  const theme = {
    name: extractThemeName(todo.content),
    todos: [todo],
    complete: false
  };

  // Special case: Sequential "Task X:" or "Step X:" patterns
  const hasSequentialPrefix = /^(Task|Step)\s+\d+:/i.test(todo.content);

  if (hasSequentialPrefix) {
    // All todos with "Task X:" pattern in allTodos are part of same theme
    const relatedTodos = allTodos.filter(t =>
      /^(Task|Step)\s+\d+:/i.test(t.content) && t.status !== 'completed'
    );

    theme.complete = relatedTodos.length === 0;
    theme.todos = allTodos.filter(t => /^(Task|Step)\s+\d+:/i.test(t.content));

    // Use first task's name as theme name
    theme.name = extractThemeName(allTodos.find(t => /^(Task|Step)\s+1:/i.test(t.content))?.content || todo.content);
  } else {
    // Check if all related todos are completed (word overlap heuristic)
    const relatedTodos = allTodos.filter(t =>
      isSameTheme(t.content, theme.name) && t.status !== 'completed'
    );

    theme.complete = relatedTodos.length === 0;
  }

  return theme;
}

function extractThemeName(content) {
  // Remove task numbers and action verbs to get core theme
  let theme = content;

  // Remove "Task X:" prefix
  theme = theme.replace(/^(Task|Step)\s+\d+:\s*/i, '');

  // Extract main subject (first 5-8 words)
  const words = theme.split(/\s+/);
  if (words.length > 8) {
    theme = words.slice(0, 8).join(' ') + '...';
  }

  return theme;
}

function isSameTheme(content, themeName) {
  const extracted = extractThemeName(content);
  // Simple similarity check
  const themeWords = themeName.toLowerCase().split(/\s+/);
  const contentWords = extracted.toLowerCase().split(/\s+/);

  // Count overlapping words
  const overlap = themeWords.filter(w => contentWords.includes(w)).length;
  return overlap >= Math.min(3, themeWords.length / 2);
}

function inferThemeName(todos) {
  // Find common prefix/theme from multiple todos
  if (todos.length === 1) {
    return extractThemeName(todos[0].content);
  }

  // Use first todo's theme as baseline
  return extractThemeName(todos[0].content);
}

function createTaskLog(todoOrTheme, type, allTodos = []) {
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0].slice(0, 5);

  let taskName, taskGoal, taskDetails;

  if (type === 'single-todo') {
    taskName = todoOrTheme.content;
    taskGoal = todoOrTheme.content;
    taskDetails = `Single todo completion:\n- ${todoOrTheme.content}`;
  } else if (type === 'theme-batch') {
    taskName = todoOrTheme.name;
    taskGoal = `Complete theme: ${todoOrTheme.name}`;
    taskDetails = `Thematic batch completion:\n${allTodos.map(t => `- ${t.content}`).join('\n')}`;
  }

  const slug = taskName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);

  const filename = `${date}-${slug}.md`;
  const filepath = path.join(TASKS_DIR, filename);

  // Ensure tasks directory exists
  fs.mkdirSync(TASKS_DIR, { recursive: true });

  // Check if task log already exists (avoid duplicates)
  if (fs.existsSync(filepath)) {
    return;
  }

  // Get files modified (simple git diff)
  let filesModified = 'N/A';
  try {
    const { execSync } = require('child_process');
    filesModified = execSync('git diff --name-only HEAD', { encoding: 'utf8' }).trim() || 'No files modified';
  } catch {
    filesModified = 'Git not available';
  }

  const taskLog = `# Task Log: ${taskName}

## Task Information
- **Date**: ${date}
- **Time Started**: ${time}
- **Time Completed**: ${time}
- **Type**: ${type === 'single-todo' ? 'Single Todo' : 'Thematic Batch'}
- **Files Modified**:
${filesModified.split('\n').map(f => `  - ${f}`).join('\n')}

## Task Details
- **Goal**: ${taskGoal}

### Implementation
${taskDetails}

### Todos Completed
${type === 'theme-batch' ? allTodos.map(t => `- [x] ${t.content}`).join('\n') : `- [x] ${todoOrTheme.content}`}

## Performance Evaluation
- **Score**: [To be filled]/23
- **Strengths**: Auto-generated from TodoWrite completion
- **Areas for Improvement**: [To be analyzed]

## Next Steps
- [To be determined based on project context]

---
*Auto-generated by MightyArchitect TodoWrite hook*
`;

  fs.writeFileSync(filepath, taskLog);

  // Update activeContext.md
  updateActiveContext(taskName, date, time, filepath);

  console.error(`✓ Task log created: ${path.relative(process.cwd(), filepath)}`);
  console.error(`  Type: ${type === 'single-todo' ? 'Single todo' : 'Thematic batch'}`);
  console.error(`  Name: ${taskName}`);
}

function updateActiveContext(taskName, date, time, taskLogPath) {
  const activeContextPath = path.join(MEMORY_DIR, 'activeContext.md');

  if (!fs.existsSync(activeContextPath)) {
    return;
  }

  let content = fs.readFileSync(activeContextPath, 'utf8');

  // Add to Recent Changes section
  const recentEntry = `\n### ${date} ${time} - ${taskName}\nTask log: ${path.basename(taskLogPath)}\n`;

  if (content.includes('## Recent Changes')) {
    content = content.replace(
      /## Recent Changes\n/,
      `## Recent Changes\n${recentEntry}`
    );
  } else {
    content += `\n## Recent Changes\n${recentEntry}`;
  }

  fs.writeFileSync(activeContextPath, content);
}
