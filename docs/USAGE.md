# MightyArchitect Usage Guide

Complete guide to using MightyArchitect in your daily development workflow.

## Installation

### Step 1: Install MightyArchitect

```bash
npx create-mighty-architect
```

You'll see:
```
🏗️  Installing MightyArchitect...

1. Creating plugin directory...
   ✓ Directory created

2. Copying plugin files...
   ✓ Files copied

3. Configuring preferences...

🏗️  Auto-initialize MightyArchitect in new projects? (y/n):
```

**Recommendation**: Choose `y` for automatic initialization in all new projects.

### Step 2: Verify Installation

```bash
# Check that hooks are registered
cat ~/.claude/settings.json

# Should see:
{
  "hooks": {
    "SessionStart": [...],
    "PostToolUse": [...],
    "Stop": [...]
  },
  "mightyArchitect": {
    "autoInit": true,
    "version": "1.0.0"
  }
}
```

## First Session

### Starting a New Project

1. Open Claude Code in your project directory:
   ```bash
   cd my-project
   claude
   ```

2. On first run, you'll see:
   ```
   📚 MightyArchitect Memory System

   Would you like to initialize the memory system? (y/n):
   ```

3. Answer `y` to create the memory structure:
   ```
   .claude/memory/
   ├── activeContext.md
   ├── architect.md
   ├── tasks/
   │   └── template.md
   └── knowledge/
       ├── patterns.md
       └── decisions.md
   ```

4. Start coding with Claude as normal!

### Understanding the Memory Files

**`activeContext.md`** - Your scratchpad
```markdown
# Active Context

## Current Work
- Implementing user authentication

## Current Focus
- Setting up JWT middleware

## Blockers
- Need to decide on token expiration strategy

## Next Steps
- [ ] Research JWT best practices
- [ ] Implement token refresh logic
```

**`architect.md`** - Loaded automatically (don't edit)
- Contains Architect instructions
- Includes 23-point scoring rubric
- ~600 tokens

**`tasks/`** - Your work log
- Create a new file after completing each task
- Use template: `tasks/template.md`
- Example: `tasks/2025-11-12-auth-implementation.md`

**`knowledge/`** - Architectural wisdom
- `patterns.md`: Architectural patterns observed
- `decisions.md`: Key decisions and rationales
- Updated automatically by Architect

## Daily Workflow

### Typical Day

**Morning: Start Session**
```bash
claude
```
- SessionStart hook loads your activeContext.md (~200 tokens)
- You see your current focus and blockers
- Ready to code!

**During Work: Code Normally**
```
User: "Let's implement the user authentication middleware"
Claude: *implements code*
User: "Add tests for the middleware"
Claude: *adds tests*
```

**After Significant Changes: Commit**
```bash
git add .
git commit -m "feat: add JWT authentication middleware"
```

If your commit:
- Starts with `feat:`, `refactor:`, or `perf:`
- Changed 3+ files

You'll see:
```
🏗️  MightyArchitect Analysis Triggered

Significant architectural changes detected (5 files).
Commit: feat: add JWT authentication middleware

Action Required: Review patterns and update knowledge base.
Run: `/architect-review` or let me analyze automatically.
```

**Running Architect Review**
```
User: "/architect-review"
Claude: *analyzes commit, scores quality, updates knowledge base*
```

Output:
```
🏗️ Architectural Analysis Complete

Commit Analyzed: abc1234 - feat: add JWT authentication middleware
Quality Score: 20/23 (Sufficient)

Key Findings:
- Pattern: Middleware/interceptor for cross-cutting auth concerns
- Clean separation between auth logic and business logic
- Missing: Rate limiting on auth endpoints

Memory Updated:
- ✓ .claude/memory/knowledge/patterns.md
- ✓ .claude/memory/knowledge/decisions.md

Recommendation: Consider adding rate limiting to prevent brute force attacks.
```

**End of Day: Session End**
When you exit Claude:
```
💾 MightyArchitect Memory Update

Files modified in this session. Consider:
- Update `.claude/memory/activeContext.md` with current state
- Log completed work to `.claude/memory/tasks/2025-11-12-task.md`
- Use template: `.claude/memory/tasks/template.md`
```

**Before Closing: Update Memory**
```markdown
# .claude/memory/activeContext.md

## Current Work
- User authentication system ✓ (completed)

## Current Focus
- Next: Add rate limiting to auth endpoints

## Blockers
- None

## Next Steps
- [ ] Research rate limiting strategies
- [ ] Implement rate limiter middleware
```

Create task log:
```bash
cp .claude/memory/tasks/template.md .claude/memory/tasks/2025-11-12-auth-middleware.md
```

Fill in the details of what you accomplished.

## Advanced Usage

### Manual Architect Review

Use `/architect-review` when:
- You've made changes but haven't committed yet
- You want feedback before proceeding
- You're reviewing someone else's code

```
User: "I've refactored the database layer. /architect-review"
Claude: *analyzes recent changes, provides architectural insights*
```

### Checking Memory Status

Use `/memory-status` to inspect your memory system:

```
User: "/memory-status"
Claude:
```

Output:
```
## Memory Structure
.claude/memory/
├── activeContext.md
├── architect.md
├── tasks/
│   ├── 2025-11-10-api-setup.md
│   ├── 2025-11-11-database-migration.md
│   └── 2025-11-12-auth-middleware.md
└── knowledge/
    ├── patterns.md
    └── decisions.md

## Active Context
Current Work: User authentication system
Current Focus: Rate limiting implementation
Blockers: None

## Recent Tasks
- 2025-11-12-auth-middleware.md (today)
- 2025-11-11-database-migration.md (yesterday)
- 2025-11-10-api-setup.md (2 days ago)

## Knowledge Base
- 3 patterns documented
- 5 architectural decisions recorded

## Summary
- Working Memory: Focused on auth rate limiting
- Short-Term: 3 completed tasks this week
- Long-Term: Layered architecture with middleware patterns
```

### Task Logging Best Practices

**Use the 23-Point System**

When logging tasks, evaluate your work:

```markdown
# Task Log: JWT Authentication Middleware

## Task Information
- Date: 2025-11-12
- Files Modified: src/middleware/auth.js, src/routes/auth.js, tests/auth.test.js
- Hours Spent: 3

## Task Details
- **Goal**: Implement secure JWT-based authentication
- **Implementation**:
  - Created middleware to verify JWT tokens
  - Integrated with Express routes
  - Added comprehensive test coverage
- **Challenges**:
  - Token refresh strategy was complex
  - Decided between 1h vs 24h access tokens
- **Decisions**:
  - 1h access token + 7d refresh token
  - HttpOnly cookies for refresh tokens (XSS protection)

## Performance Evaluation

**Score**: 20/23 (Sufficient)

**Rewards**:
- +10: Elegant middleware pattern
- +3: Idiomatic Express.js code
- +2: DRY - reusable middleware
- +2: Handles edge cases (expired tokens, invalid signatures)
- +1: Portable across projects
- **Total**: +18

**Penalties**:
- -1: Missing rate limiting (security concern)
- **Total**: -1

**Net Score**: 18 + 2 (handled some edge cases well) = 20/23

**Strengths**:
- Clean separation of concerns
- Secure token handling
- Good test coverage (85%)

**Areas for Improvement**:
- Add rate limiting to prevent brute force
- Consider adding token blacklist for logout
- Improve error messages for debugging

## Next Steps
- [ ] Implement rate limiting middleware
- [ ] Add token blacklist for logout
- [ ] Document auth flow in README
```

## Working with the Architect

### Understanding Architect Analysis

The Architect analyzes commits based on:

1. **Pattern Recognition**: What architectural pattern is being used?
   - MVC, Layered, Microservices, Event-driven, etc.

2. **Consistency**: Does this match previous patterns?
   - Are you consistent with past decisions?

3. **Trade-offs**: What are the pros/cons?
   - Every choice has consequences

4. **Quality**: 23-point evaluation
   - Objective scoring based on clear criteria

### Example Architect Output

After a significant refactor:

```
🏗️ Architectural Analysis Complete

Commit Analyzed: def5678 - refactor: extract business logic to service layer
Quality Score: 22/23 (Excellent)

Key Findings:
- Pattern: Three-layer architecture (Controller → Service → Repository)
- Excellent separation of concerns
- Business logic properly isolated from HTTP layer
- Consistent with previous layered architecture decisions

**Detailed Scoring**:
Rewards:
- +10: Elegant refactor exceeding requirements
- +3: Perfect Express.js + Node.js idioms
- +2: Minimal code, excellent DRY
- +2: All edge cases handled
- +1: Highly reusable service pattern
Subtotal: +18

Penalties:
- -1: Minor - Could use async/await more consistently
Subtotal: -1

**Final Score: 22/23 (Excellent - 96%)**

Memory Updated:
- ✓ `.claude/memory/knowledge/patterns.md`
  Added: "Three-layer architecture pattern" with pros/cons
- ✓ `.claude/memory/knowledge/decisions.md`
  Added: "Why service layer over fat controllers"

Future Considerations:
- As app grows, consider domain-driven design
- May need to split services into smaller modules
- Watch for service interdependencies
```

### When Architect Says "Unacceptable" (<18/23)

If you get a low score:

```
⚠️ Remediation Required

Quality Score: 15/23 (Unacceptable)

Issues:
- Missing error handling (−5)
- Inefficient N+1 query pattern (−5)
- No input validation (−3)

Required Actions:
1. Add try/catch blocks with proper error handling
2. Refactor to use join queries instead of N+1
3. Add input validation with express-validator

Please address these issues before proceeding.
```

**What to do**:
1. Review the Architect's feedback carefully
2. Fix the identified issues
3. Commit the fixes
4. Run `/architect-review` again to verify

## Customization

### Disable Auto-Init

Edit `~/.claude/settings.json`:
```json
{
  "mightyArchitect": {
    "autoInit": false  // Changed from true
  }
}
```

Now you'll manually initialize projects:
```bash
mkdir -p .claude/memory/{tasks,knowledge}
cp ~/.claude/plugins/mighty-architect/templates/* .claude/memory/
```

### Adjust Commit Filters

Edit `~/.claude/plugins/mighty-architect/hooks/git-commit.js`:

```javascript
// Change filter from 3+ files to 5+ files
if (filesChanged >= 5) {  // Was: if (filesChanged >= 3)
  // Trigger Architect
}

// Add more commit types
if (!/^(feat|refactor|perf|arch):/.test(commitMsg)) {  // Added 'arch:'
  return;
}
```

## Troubleshooting

### Architect Not Triggering

**Symptom**: Commits don't trigger Architect analysis

**Check**:
1. Is commit message format correct? (`feat:`, `refactor:`, `perf:`)
2. Are 3+ files changed? Check with `git diff --name-only HEAD~1 | wc -l`
3. Are hooks registered? Check `~/.claude/settings.json`

**Fix**:
```bash
# Reinstall hooks
npx create-mighty-architect
```

### Memory Not Loading

**Symptom**: activeContext.md not visible in session

**Check**:
1. Does `.claude/memory/activeContext.md` exist?
2. Is SessionStart hook running? Look for initialization message

**Fix**:
```bash
# Manually initialize
mkdir -p .claude/memory/{tasks,knowledge}
cp ~/.claude/plugins/mighty-architect/templates/* .claude/memory/
```

### Cross-Platform Issues

**Symptom**: Hooks fail on Windows

**Check**: Are you using the Node.js hooks (`.js` files)?

**Fix**: MightyArchitect v1.0.0+ uses Node.js hooks by default. If you have old bash hooks, reinstall:
```bash
npx create-mighty-architect
```

## Tips & Best Practices

### Daily Habits

1. **Start each session**: Review activeContext.md
2. **During work**: Update focus as you switch tasks
3. **After commits**: Let Architect analyze significant changes
4. **End of day**: Update activeContext.md and log completed tasks

### Task Logging Tips

- **Be honest with scoring**: Don't inflate scores
- **Document trade-offs**: Explain *why* you chose this approach
- **Note future work**: What would you do differently?
- **Track patterns**: Reference knowledge base patterns

### Working with the Knowledge Base

**When to read it**:
- Starting a new feature
- Making architectural decisions
- Debugging unfamiliar code

**How to maintain it**:
- Let Architect update it automatically
- Manually add critical decisions Architect might miss
- Archive outdated patterns (keep it current)

### Memory Hygiene

**Weekly**:
- Archive old task logs (>7 days) to `tasks/archive/`
- Review activeContext.md - is it still accurate?

**Monthly**:
- Review knowledge base - remove outdated patterns
- Check for consistency in documented patterns

**Quarterly**:
- Major refactors? Update all knowledge base docs
- Consider fresh start if project pivoted significantly

## Examples

### Example 1: Building a REST API

See complete workflow in [examples/rest-api-workflow.md](../examples/rest-api-workflow.md)

### Example 2: Refactoring Legacy Code

See complete workflow in [examples/refactoring-workflow.md](../examples/refactoring-workflow.md)


## Semantic Task Analysis

### Using `/analyze-todos`

After completing todos (either through Vibe Coding or Superpowers Execute-Plan), run:

```
/analyze-todos
```

**What it does:**
1. Collects your recently completed todos
2. Reads current context from `.claude/memory/activeContext.md`
3. Invokes the task-manager agent to perform semantic analysis
4. Creates task logs in `.claude/memory/tasks/` with 23-point quality scores

**Example workflow:**

```
User: "Add authentication to the API"
Claude: [Creates and completes todos for auth implementation]
User: "/analyze-todos"
Claude: "I'll analyze your completed todos..."
[Agent runs semantic analysis]
Claude: "Created 2 task logs:
- auth-core.md (Score: 18/23)
- auth-api.md (Score: 20/23)"
```

**Task Log Format:**

Each log includes:
- Context and goal
- List of completed todos
- Implementation summary
- Quality assessment (23-point scale across 5 dimensions)
- Files modified
- Next steps

**Semantic Grouping:**

The agent groups todos by thematic coherence, NOT by arbitrary patterns:
- ✅ Related feature work = one log
- ✅ Multiple distinct features = multiple logs
- ❌ Batches don't dictate boundaries

## Getting Help

- **Documentation**: This guide + [ARCHITECTURE.md](ARCHITECTURE.md)
- **Issues**: https://github.com/your-repo/mighty-architect/issues
- **Community**: [Discord/Slack/etc]

## License

Apache 2.0
