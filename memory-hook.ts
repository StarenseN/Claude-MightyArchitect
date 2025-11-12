// Claude Memory System - Automation Hook
// Provides automatic memory persistence with architecture support

import { promises as fs } from 'fs';
import * as path from 'path';

const MEMORY = '.memory';
const ARCH_FILE = 'ARCHITECTURE.md';

interface HookPayload {
  type?: string;
  context?: any;
  projectRoot?: string;
}

interface HookResponse {
  action: 'continue' | 'stop';
  message?: string;
}

async function ensureProjectMemory(projectRoot: string): Promise<boolean> {
  // Safety check - only operate in projects, never globally
  if (!projectRoot || projectRoot === process.env.HOME) {
    console.log('⚠️ No project detected - memory disabled for safety');
    return false;
  }
  
  const memPath = path.join(projectRoot, MEMORY);
  
  // Create memory structure if missing
  if (!await exists(memPath)) {
    await fs.mkdir(memPath, { recursive: true });
    await fs.mkdir(path.join(memPath, 'tasks'), { recursive: true });
    
    // Check for architecture file
    const archPath = path.join(projectRoot, ARCH_FILE);
    const hasArch = await exists(archPath);
    
    // Initialize with architecture awareness
    const timestamp = new Date().toISOString();
    const contextHeader = hasArch ? 
      `# Context\n\nInitialized: ${timestamp}\nArchitecture: ARCHITECTURE.md detected ✅\n\n` :
      `# Context\n\nInitialized: ${timestamp}\n\n`;
    
    await fs.writeFile(path.join(memPath, 'context.md'), contextHeader, 'utf8');
    await fs.writeFile(path.join(memPath, 'patterns.md'), '# Patterns\n\nReusable solutions discovered during development:\n\n', 'utf8');
    await fs.writeFile(path.join(memPath, 'decisions.md'), '# Decisions\n\nArchitectural and technical decisions:\n\n', 'utf8');
    
    if (hasArch) {
      console.log('📐 Architecture detected - memory will track compliance');
      
      // Add architecture reminder to decisions
      const archReminder = `## Architecture Compliance\nThis project follows rules defined in ARCHITECTURE.md\nAll file locations should comply with the architecture.\n\n`;
      await fs.appendFile(path.join(memPath, 'decisions.md'), archReminder, 'utf8');
    }
  }
  
  return true;
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Session start - load memory and architecture
export async function preSessionStart(payload: HookPayload): Promise<HookResponse> {
  if (!payload.projectRoot) {
    return { action: 'continue' };
  }
  
  const isProject = await ensureProjectMemory(payload.projectRoot);
  
  if (isProject) {
    const memPath = path.join(payload.projectRoot, MEMORY);
    const contextPath = path.join(memPath, 'context.md');
    const archPath = path.join(payload.projectRoot, ARCH_FILE);
    
    // Load context
    if (await exists(contextPath)) {
      const context = await fs.readFile(contextPath, 'utf8');
      const lines = context.split('\n').length;
      console.log(`✨ Memory loaded (${lines} lines of context)`);
    }
    
    // Check architecture
    if (await exists(archPath)) {
      console.log('📐 Architecture rules active for this project');
    }
  }
  
  return { action: 'continue' };
}

// After tool use - log activity with architecture tracking
export async function postToolUse(payload: HookPayload): Promise<HookResponse> {
  if (!payload.projectRoot || !payload.type) {
    return { action: 'continue' };
  }
  
  // Only log significant actions
  const significantTools = ['create_file', 'str_replace', 'bash_tool'];
  if (!significantTools.includes(payload.type)) {
    return { action: 'continue' };
  }
  
  const tasksPath = path.join(payload.projectRoot, MEMORY, 'tasks');
  if (!await exists(tasksPath)) {
    return { action: 'continue' };
  }
  
  // Check if action complies with architecture
  let archNote = '';
  const archPath = path.join(payload.projectRoot, ARCH_FILE);
  if (await exists(archPath) && payload.context?.path) {
    const filePath = payload.context.path;
    
    // Simple architecture checks
    if (filePath.includes('controller') && !filePath.includes('/api/')) {
      archNote = '\n⚠️ Architecture note: Controllers should be in /api/ directory';
    } else if (filePath.includes('service') && !filePath.includes('/services/')) {
      archNote = '\n⚠️ Architecture note: Services should be in /services/ directory';
    } else if (filePath.includes('.tsx') && !filePath.includes('/components/')) {
      archNote = '\n⚠️ Architecture note: React components should be in /components/ directory';
    }
  }
  
  // Create task log
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const taskFile = path.join(tasksPath, `${timestamp}.md`);
  
  const taskContent = `# Task: ${payload.type}
Date: ${new Date().toISOString()}
${archNote}

## Activity
\`\`\`json
${JSON.stringify(payload.context || {}, null, 2)}
\`\`\`

## Next Steps
- Review changes
- Update patterns if reusable
- Check architecture compliance
`;
  
  await fs.writeFile(taskFile, taskContent, 'utf8');
  
  return { action: 'continue' };
}

// Export hooks
export const hooks = {
  preSessionStart,
  postToolUse
};
