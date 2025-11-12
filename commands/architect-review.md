---
name: architect-review
description: Manually trigger architectural analysis and pattern documentation
---

Invoke the `mighty-architect` skill to analyze current codebase state:

1. Review recent commits (last 5)
2. Analyze architectural patterns
3. Evaluate code quality using 23-point system
4. Update `.claude/memory/knowledge/` with findings

Use this when:
- You've made architectural changes but haven't committed yet
- You want insights before proceeding with implementation
- You're reviewing code and want architectural perspective
