# Windows SessionStart Hook Workaround

## The Problem

Windows has a known bug (GitHub issue #9542) where SessionStart hooks don't properly inject `additionalContext`. This prevents MightyArchitect's memory system from auto-loading on session start.

## The Solution

Use manual slash commands to activate MightyArchitect at the start of each session.

---

## Installation

1. **Install MightyArchitect** (already done if you're reading this):
   ```bash
   npx create-mighty-architect
   ```

2. **Copy the manual activation command** to your `.claude/commands/` directory:

   Create: `C:\Users\YourName\.claude\commands\activate-mighty-architect.md`

   ```markdown
   ---
   description: Activate MightyArchitect memory system (Windows workaround)
   ---

   🏗️ **Activating MightyArchitect...**

   Loading memory system manually (Windows SessionStart hook workaround).

   ## Loading Memory Structure

   Reading memory files from `.claude/memory/`:

   ```bash
   cat .claude/memory/activeContext.md
   ```

   ```bash
   cat .claude/memory/architect.md
   ```

   ## Memory System Status

   **Working Memory**: Loaded from `activeContext.md`
   - Current work focus
   - Active blockers
   - Next steps

   **Long-Term Memory**: Loaded from `architect.md`
   - 23-point evaluation rubric
   - Architectural analysis instructions
   - Pattern recognition guidelines

   ## Available Commands

   - `/architect-review` - Manually trigger architectural analysis
   - `/memory-status` - View current memory state

   ## How It Works

   **Automatic (when fixed)**:
   - SessionStart hook auto-loads memory (~800 tokens)
   - PostToolUse hook triggers Architect on significant commits (feat/refactor/perf with 3+ files)
   - Stop hook reminds to update task logs

   **Manual (Windows workaround)**:
   - Run `/activate-mighty-architect` to load memory context
   - Use `/architect-review` when you want analysis
   - Use `/memory-status` to see what's in memory

   ---

   ✅ **MightyArchitect memory system activated!**

   You now have access to:
   - Working memory (current focus)
   - Long-term memory (architectural patterns & decisions)
   - 23-point evaluation system
   - Pattern recognition

   **Ready to code with full context!** (~800 tokens)
   ```

3. **Copy MightyArchitect commands** to your commands directory:
   ```bash
   copy C:\Users\YourName\.claude\plugins\mighty-architect\commands\*.md C:\Users\YourName\.claude\commands\
   ```

4. **(Optional) Add to your `/power-up` command** if you use one:

   Edit: `C:\Users\YourName\.claude\commands\power-up.md`

   Add this step:
   ```markdown
   ## Step 3: Activate MightyArchitect

   Execute `/activate-mighty-architect` to load the memory system (working + long-term memory).
   ```

---

## Usage

### Manual Activation (Each Session)

At the start of each Claude Code session, run:

```
/activate-mighty-architect
```

This will:
- ✅ Load your working memory (activeContext.md)
- ✅ Load long-term memory (architect.md with 23-point rubric)
- ✅ Make `/architect-review` and `/memory-status` available

### With `/power-up` (Recommended)

If you have a `/power-up` command (common Windows workaround), add MightyArchitect to it:

```
/power-up
```

This will activate:
- Superpowers framework
- Episodic memory
- **MightyArchitect** (your addition)

---

## What Still Works

Even with manual activation, these features work automatically:

✅ **PostToolUse Hook** (Git commit analysis)
- Triggers on `feat:`, `refactor:`, `perf:` commits with 3+ files
- Works because it's not a SessionStart hook

✅ **Stop Hook** (Task logging reminder)
- Reminds you to update memory when session ends
- Works because it's not a SessionStart hook

❌ **SessionStart Hook** (Memory auto-loading)
- Doesn't work on Windows due to bug
- **Workaround**: Use `/activate-mighty-architect` instead

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `/activate-mighty-architect` | Load memory system (run at session start) |
| `/architect-review` | Trigger architectural analysis |
| `/memory-status` | View current memory state |
| `/power-up` | Activate all features (if configured) |

---

## When Will This Be Fixed?

The Windows SessionStart hook bug is tracked in GitHub issue #9542. Once Anthropic fixes the subprocess handling on Windows, you can:

1. Remove the manual activation step
2. Memory will auto-load on session start
3. Everything will work seamlessly like on macOS/Linux

Until then, just run `/activate-mighty-architect` (or `/power-up` if configured) at the start of each session.

---

## Testing

To verify it's working:

1. Run `/activate-mighty-architect`
2. You should see your memory context loaded
3. Try `/memory-status` to confirm
4. Make a commit with 3+ files - PostToolUse hook should still trigger

---

## Troubleshooting

**Problem**: `/activate-mighty-architect` command not found

**Solution**:
```bash
# Verify the command file exists
dir C:\Users\YourName\.claude\commands\activate-mighty-architect.md

# If missing, copy it from the template above
```

**Problem**: Memory files not found

**Solution**:
```bash
# Initialize memory structure in your project
mkdir .claude\memory\tasks
mkdir .claude\memory\knowledge
copy C:\Users\YourName\.claude\plugins\mighty-architect\templates\* .claude\memory\
```

**Problem**: PostToolUse/Stop hooks not triggering

**Solution**: These hooks work on Windows! Check your settings.json:
```bash
type C:\Users\YourName\.claude\settings.json
```

Should contain:
```json
"PostToolUse": [
  {
    "matcher": "Bash",
    "hooks": [{
      "command": "node \"C:\\Users\\YourName\\.claude\\plugins\\mighty-architect\\hooks\\git-commit.js\""
    }]
  }
]
```

---

## Summary

**Windows Limitation**: SessionStart hooks don't work (Anthropic bug)

**Workaround**: Run `/activate-mighty-architect` at session start

**What Works**: Git commit analysis (PostToolUse) and task reminders (Stop)

**Future**: Will be seamless once Anthropic fixes the Windows bug

---

**Need help?** Open an issue: https://github.com/StarenseN/Claude-MightyArchitect/issues
