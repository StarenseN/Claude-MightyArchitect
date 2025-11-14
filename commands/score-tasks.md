---
name: score-tasks
description: Invoke Task Manager Agent to score all unscored task logs
---

# Score Task Logs

Invoke the **Task Manager Agent** to score all unscored task logs in `.claude/memory/tasks/`.

---

## What This Does

1. **Scans** `.claude/memory/tasks/` for task logs with `Score: [To be filled]/23`
2. **Invokes** Task Manager Agent to analyze each unscored task
3. **Updates** task logs with:
   - Objective 23-point quality score
   - Detailed evaluation against quality criteria
   - Strengths and areas for improvement
4. **Reports** scoring summary

---

## When to Use

- ✅ After completing a batch of tasks (5-20 todos)
- ✅ End of coding session
- ✅ Before running `/architect-review` (for complete session analysis)
- ✅ When you see the notification: "📊 TASK MANAGER INVOCATION RECOMMENDED"

---

## Example Output

```
📊 Task Manager Scoring Session
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found: 20 unscored task logs

Scoring in progress...
✓ 2025-11-14-implement-config-module.md → Score: 21/23 (Excellent)
✓ 2025-11-14-create-germany-scraper.md → Score: 19/23 (Sufficient)
✓ 2025-11-14-add-error-handling.md → Score: 18/23 (Sufficient)
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Summary:
- Tasks scored: 20
- Average score: 19.5/23
- Excellent (21-23): 8
- Sufficient (18-20): 10
- Needs work (<18): 2

💡 Check .claude/memory/tasks/ for detailed evaluations
```

---

## Integration

This command complements the automatic system:
- **Automatic**: Suggestion every 10 unscored task logs (PostToolUse hook)
- **Manual**: Run `/score-tasks` anytime for immediate scoring

---

Ready? I'll invoke the Task Manager Agent now to score all unscored task logs.
