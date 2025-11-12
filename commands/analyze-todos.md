Analyze completed todos and create semantic task logs.

## Your Task

You are being asked to analyze recently completed todos and create intelligent task logs using the task-manager agent.

## Instructions

1. **Ask user for completed todos**
   - If user hasn't provided specific todos, ask: "Please provide the completed todos you want analyzed (or say 'all recent' to analyze everything)"

2. **Read current context**
   - Read `.claude/memory/activeContext.md` to understand current project focus
   - If file doesn't exist, proceed with minimal context

3. **List recent task logs**
   - Check `.claude/memory/tasks/` directory
   - Get list of files created in last 24 hours (for duplicate detection)

4. **Prepare agent input**
   - Format completed todos as markdown list
   - Include active context content
   - Include list of recent log filenames

5. **Invoke task-manager agent**
   - Use the Task tool with `subagent_type: "general-purpose"`
   - Pass the agent reference: "Use the task-manager agent located at `agents/task-manager.md`"
   - Provide all prepared input

6. **Report results**
   - Summarize what task logs were created
   - Show the 23-point scores
   - Inform user where logs were saved

## Example Usage

**User:** `/analyze-todos`

**You:** "I'll analyze your recent todos. Please provide the completed todos you want analyzed, or say 'all recent' to analyze everything."

**User:** "All recent"

**You:** [Reads activeContext.md, lists recent task logs, collects recent TodoWrite completions, invokes task-manager agent via Task tool, reports results]

## Notes

- This command is semi-automatic: user must explicitly invoke it
- The task-manager agent does the heavy lifting (semantic analysis + scoring)
- You are just the orchestrator that prepares input and reports output
