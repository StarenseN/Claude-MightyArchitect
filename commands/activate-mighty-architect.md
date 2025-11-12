---
description: Activate MightyArchitect memory system (Windows workaround)
---

🏗️ **Activating MightyArchitect...**

Loading memory system manually (Windows SessionStart hook workaround).

## Step 1: Check if Memory Structure Exists

First, check if the project has been initialized:

```bash
ls -la .claude/memory/ 2>/dev/null || echo "NOT_INITIALIZED"
```

## Step 2: Initialize if Needed

If you see "NOT_INITIALIZED" above, create the memory structure manually:

```bash
mkdir -p .claude/memory/tasks .claude/memory/knowledge
```

Copy templates from the plugin directory:

```bash
cp ~/.claude/plugins/mighty-architect/templates/activeContext.md .claude/memory/
cp ~/.claude/plugins/mighty-architect/templates/architect.md .claude/memory/
```

If templates don't exist (fallback):

```bash
[ ! -f .claude/memory/activeContext.md ] && echo "# Active Context" > .claude/memory/activeContext.md
[ ! -f .claude/memory/architect.md ] && echo "# Architect" > .claude/memory/architect.md
```

Structure created:
- `.claude/memory/activeContext.md` ✅
- `.claude/memory/architect.md` ✅
- `.claude/memory/tasks/` ✅
- `.claude/memory/knowledge/` ✅

## Step 3: Load Memory Files

Now read the memory files:

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
