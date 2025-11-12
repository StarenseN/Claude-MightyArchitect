# MightyArchitect

Port of Windsurf's Meta-Cognitive Workflow Architecture for Claude Code.

## Features

- **Three-Layer Memory System**: Working, short-term, and long-term memory
- **Automated Architect Analysis**: Triggers on significant commits
- **23-Point Evaluation System**: Objective code quality scoring
- **Token Efficient**: ~800 tokens per session (vs Windsurf's 3000+)
- **Zero External Dependencies**: Pure Node.js implementation
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Seamless Integration**: Auto-initializes in new projects

## Installation

```bash
npx create-mighty-architect
```

Follow the prompts to configure auto-initialization.

## How It Works

### Memory Structure

```
.claude/memory/
├── activeContext.md       # Working memory - current focus
├── architect.md           # Architect instructions
├── tasks/                 # Short-term - task logs
│   └── 2025-11-12-auth.md
└── knowledge/             # Long-term - patterns & decisions
    ├── patterns.md
    └── decisions.md
```

### Automatic Workflow

1. **SessionStart**: Loads active context and Architect instructions (~800 tokens)
2. **During Work**: You code normally with Claude
3. **Git Commit**: After `feat:`, `refactor:`, or `perf:` commits with 3+ files:
   - Architect skill automatically analyzes changes
   - Updates knowledge base with patterns
   - Scores quality using 23-point system
4. **Session End**: Reminder to update task logs

### Manual Commands

- `/architect-review` - Trigger architectural analysis
- `/memory-status` - View current memory state

## Task Logging

After completing work, document it in `.claude/memory/tasks/`:

```markdown
# Task Log: [Description]

## Task Information
- Date: 2025-11-12
- Files Modified: auth.js, middleware.js

## Task Details
- Goal: Implement JWT authentication
- Implementation: Added middleware pattern
- Challenges: Token refresh logic
- Decisions: Use 1h access token + 7d refresh token

## Performance Evaluation
- Score: 20/23 (Sufficient)
- Strengths: Clean separation, secure
- Areas for Improvement: Add rate limiting

## Next Steps
- Add rate limiting
- Write integration tests
```

## 23-Point Scoring System

**Rewards:**
- +10: Elegant, optimized solution
- +5: Effective parallelization
- +3: Perfect language idioms
- +2: Minimal code (DRY)
- +2: Handles edge cases
- +1: Portable/reusable

**Penalties:**
- -10: Fails core problem
- -5: Placeholder comments
- -5: Inefficient algorithms
- -3: Style violations
- -2: Misses edge cases
- -1: Overcomplicated
- -1: Deprecated libraries

**Tiers:**
- 21-23: Excellent (≥90%)
- 18-20: Sufficient (≥78%)
- <18: Unacceptable (requires fix)

## Configuration

Stored in `~/.claude/settings.json`:

```json
{
  "mightyArchitect": {
    "autoInit": true,
    "version": "1.0.0"
  }
}
```

Change `autoInit` to `false` to disable auto-initialization.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and technical decisions
- [Usage Guide](docs/USAGE.md) - Detailed usage examples and workflows

## Repository

[https://github.com/StarenseN/Claude-MightyArchitect](https://github.com/StarenseN/Claude-MightyArchitect)

## License

Apache 2.0 - See LICENSE file
