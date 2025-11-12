---
name: memory-status
description: Display current memory system state and recent activity
---

Show MightyArchitect memory status:

## Memory Structure
```bash
ls -la .claude/memory/
```

## Active Context
```bash
cat .claude/memory/activeContext.md
```

## Recent Tasks
```bash
ls -lt .claude/memory/tasks/ | head -5
```

## Knowledge Base
```bash
ls -la .claude/memory/knowledge/
```

## Summary
- Working Memory: Current focus and blockers
- Short-Term: Last 5 task logs
- Long-Term: Accumulated patterns and decisions
