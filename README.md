<div align="center">

# 🏗️ MightyArchitect

### Port of Entrepreneur4lyf's Meta-Cognitive Workflow Architecture for Claude Code

*Intelligent memory system that learns from your code*

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](package.json)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](#installation)
[![GitHub](https://img.shields.io/badge/github-StarenseN%2FClaude--MightyArchitect-black)](https://github.com/StarenseN/Claude-MightyArchitect)

[Features](#-features) • [Quick Start](#-quick-start) • [How It Works](#-how-it-works) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## 🎯 What is MightyArchitect?

MightyArchitect transforms Claude Code into an **intelligent development partner** with persistent memory that:

- 📝 **Remembers your context** across sessions (~800 tokens vs original's 3000+)
- 🏗️ **Analyzes your architecture** automatically on significant commits
- 🎯 **Scores code quality** objectively using a 23-point system
- 📚 **Builds knowledge** by documenting patterns and decisions
- 🚀 **Zero setup** - one command installation with no external dependencies

### Why MightyArchitect?

**Problem**: Claude forgets your project context between sessions. You explain the same architecture repeatedly.

**Solution**: MightyArchitect gives Claude a three-layer memory system that persists your:
- Current work focus (working memory)
- Recent task history (short-term memory)
- Architectural patterns & decisions (long-term memory)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 Three-Layer Memory System
Inspired by human cognition:
- **Working Memory** - Current focus & blockers
- **Short-Term Memory** - Task logs (5-7 days)
- **Long-Term Memory** - Patterns & decisions

</td>
<td width="50%">

### 🏗️ Fully Automated Analysis
Triggers on significant commits (feat/refactor/perf with 3+ files):
- Automatic pattern detection
- Basic quality scoring (15-20/23)
- Knowledge base auto-updates
- Optional detailed 23-point review

</td>
</tr>
<tr>
<td>

### 📊 23-Point Evaluation System
Objective code quality scoring:
- 21-23: **Excellent** (≥90%)
- 18-20: **Sufficient** (≥78%)
- <18: **Unacceptable** (needs work)

</td>
<td>

### ⚡ Token Efficient
**73% reduction** from original:
- MightyArchitect: ~800 tokens
- Original: ~3000+ tokens
- Selective loading strategy

</td>
</tr>
<tr>
<td>

### 🔒 Zero Dependencies
Pure Node.js implementation:
- No bash required
- No jq required
- No external tools
- Cross-platform ready

</td>
<td>

### 🎨 Seamless Integration
One command installation:
- Auto-initialization
- Hook registration
- Template setup
- Ready in seconds

</td>
</tr>
<tr>
<td colspan="2">

### 🔍 Git Forensic Analysis
Understand legacy codebases:
- Timeline reconstruction from commits
- File hotspot identification
- Pattern emergence tracking
- Architectural decision inference
- Perfect for bootstrapping on existing projects

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Installation

```bash
npx create-mighty-architect
```

**That's it!** The installer will:
1. ✅ Copy plugin files to `~/.claude/plugins/mighty-architect/`
2. ✅ Install commands to `~/.claude/commands/`
3. ✅ Register hooks in `~/.claude/settings.json`
4. ✅ Ask about auto-initialization preference
5. ✅ Set up memory templates

#### Alternative: Manual Installation

For development or testing from source:

```bash
# Clone repository
git clone https://github.com/StarenseN/Claude-MightyArchitect.git
cd Claude-MightyArchitect

# Install globally
npm install -g .

# Or link for development
npm link
```

This installs the same way as `npx create-mighty-architect`.

### First Use

**macOS/Linux** (automatic):
```bash
cd your-project
claude
# Memory system auto-initializes! 🎉
```

**Windows** (manual workaround due to [bug #9542](https://github.com/anthropics/claude-code/issues/9542)):
```bash
cd your-project
claude
/power-up  # Recommended: Activates everything at once
```

Or individually:
```bash
/activate-mighty-architect  # Load memory system only
/activate-superpowers       # Load Superpowers skills only
/sync-memory                # Sync episodic memory
```

> 💡 **Windows Tip**: The `/power-up` command is a convenient all-in-one activation that runs all three commands above. It's been pre-installed for you!

---

## 🧠 How It Works

### Memory Structure

MightyArchitect creates a `.claude/memory/` directory in your project:

```
.claude/memory/
├── 📝 activeContext.md        # 👁️  Always loaded (~200 tokens)
│                               # Your current work, focus, blockers
│
├── 🏗️  architect.md            # 👁️  Always loaded (~600 tokens)
│                               # 23-point rubric, analysis instructions
│
├── 📂 tasks/                   # 📁 Loaded on-demand
│   ├── 2025-11-12-auth.md      # Task logs with evaluations
│   ├── 2025-11-11-api.md       # Recent work history
│   └── template.md             # Template for new logs
│
└── 📂 knowledge/               # 🧠 Long-term wisdom
    ├── patterns.md             # Architectural patterns observed
    └── decisions.md            # Key decisions & rationales
```

**Legend**: 👁️ = Auto-loaded | 📁 = On-demand | 🧠 = Accumulated wisdom

### Example: activeContext.md

```markdown
# Active Context

## Current Work
Implementing user authentication system

## Current Focus
- Setting up JWT middleware
- Deciding on token expiration strategy

## Blockers
- Need to choose between 1h vs 24h access tokens
- Rate limiting strategy unclear

## Next Steps
- [ ] Research JWT best practices
- [ ] Implement token refresh logic
- [ ] Add rate limiting middleware
```

### Example: patterns.md

```markdown
# Architectural Patterns

## 2025-11-12 - Middleware Authentication Pattern

**Commit**: abc1234 - feat: add JWT authentication
**Score**: 20/23 (Sufficient)

**Pattern**: Middleware/interceptor for cross-cutting auth concerns

**Rationale**:
- Separates authentication from business logic
- Reusable across all protected routes
- Easy to test in isolation

**Trade-offs**:
- **Pros**: DRY, testable, follows Express.js conventions
- **Cons**: Missing rate limiting (security concern)

**Future Considerations**:
- Add rate limiting to prevent brute force
- Consider token blacklist for logout
- May need to split into authentication + authorization middleware
```

---

## 🤖 What's Automatic vs Manual?

Understanding what MightyArchitect does automatically vs when you need to take action:

| Action | Type | When | Platform |
|--------|------|------|----------|
| **Memory Loading** | ✅ Automatic | Session start | macOS/Linux |
| **Memory Loading** | ⚡ Manual | Session start | Windows (bug workaround) |
| **Commit Detection** | ✅ Automatic | After git commit | All platforms |
| **Basic Analysis** | ✅ Automatic | When 3+ files changed (feat/refactor/perf) | All platforms |
| **Detailed Review** | 📝 Manual (optional) | For full 23-point evaluation | Run `/architect-review` |
| **Task Log Reminder** | ✅ Automatic | Session end | All platforms |
| **Memory Updates** | 📝 Manual | When you want | Edit markdown files |

**Key Point**: The hook **automatically analyzes** significant commits (feat/refactor/perf with 3+ files), detecting patterns and updating your knowledge base. For **detailed 23-point evaluation**, run `/architect-review` manually.

---

## 🔄 Workflow Example

### 1️⃣ Session Start

**macOS/Linux** (automatic):
```
Starting Claude...
✅ MightyArchitect memory loaded (~800 tokens)
- Working memory: Current authentication work
- Long-term memory: 3 patterns, 5 decisions documented
```

**Windows** (manual):
```
/activate-mighty-architect
✅ Memory system activated
```

### 2️⃣ During Development

Code normally with Claude. Memory provides context automatically.

### 3️⃣ Git Commit (3+ files)

```bash
git commit -m "feat: add JWT authentication middleware"
```

**Automatic analysis** (PostToolUse hook):
```
🏗️  MightyArchitect Analysis Complete (Automatic)

Commit: abc1234 - feat: add JWT authentication middleware
Files Changed: 5
Pattern Detected: Middleware/Interceptor Pattern
Estimated Score: 19/23 (Sufficient)

Knowledge Base Updated:
✓ .claude/memory/knowledge/patterns.md

💡 Tip: Run /architect-review for detailed analysis with full 23-point evaluation
```

> 💡 **Note**: The hook automatically *analyzes* significant commits (feat/refactor/perf with 3+ files), detects patterns, calculates a basic score (15-20/23), and updates your knowledge base. For comprehensive 23-point evaluation with detailed rationale, run `/architect-review`.

### 4️⃣ Detailed Review (Optional)

For comprehensive 23-point evaluation with detailed rationale:
```
/architect-review
```

**Output**:
```
🏗️ Detailed Architectural Analysis

Commit Analyzed: abc1234 - feat: add JWT authentication middleware
Quality Score: 20/23 (Sufficient - 87%)

Detailed Breakdown:
Rewards: +10 elegant, +3 idioms, +2 DRY, +2 edge cases, +1 portable = +18
Penalties: -1 missing rate limiting = -1
Net Score: 18 + 2 bonus = 20/23

Key Findings:
- Pattern: Middleware/interceptor for authentication
- Clean separation of concerns
- Comprehensive test coverage (85%)
- Missing: Rate limiting on auth endpoints

Memory Updated:
✓ .claude/memory/knowledge/patterns.md (detailed evaluation added)
✓ .claude/memory/knowledge/decisions.md (trade-offs documented)

Recommendation: Add rate limiting to prevent brute force attacks.
Next Steps: Implement token blacklist for logout, improve error messages
```

> 💡 **When to use**: The automatic analysis provides quick pattern detection and basic scoring (15-20/23). Use `/architect-review` when you want detailed breakdown of rewards/penalties, comprehensive trade-off analysis, and actionable recommendations.

### 5️⃣ Session End

```
💾 MightyArchitect Memory Update

Files modified in this session. Consider:
- Update `.claude/memory/activeContext.md` with current state
- Log completed work to `.claude/memory/tasks/2025-11-12-auth.md`
- Use template: `.claude/memory/tasks/template.md`
```

---

## 📊 23-Point Scoring System

<table>
<tr>
<th width="50%">Rewards (add points)</th>
<th width="50%">Penalties (subtract points)</th>
</tr>
<tr>
<td>

- ✅ **+10**: Elegant, optimized solution
- ✅ **+5**: Effective parallelization
- ✅ **+3**: Perfect language idioms
- ✅ **+2**: Minimal code (DRY)
- ✅ **+2**: Handles edge cases
- ✅ **+1**: Portable/reusable

</td>
<td>

- ❌ **-10**: Fails core problem
- ❌ **-5**: Placeholder comments
- ❌ **-5**: Inefficient algorithms
- ❌ **-3**: Style violations
- ❌ **-2**: Misses edge cases
- ❌ **-1**: Overcomplicated
- ❌ **-1**: Deprecated libraries

</td>
</tr>
</table>

### Scoring Tiers

| Score | Tier | Meaning |
|-------|------|---------|
| **21-23** | 🌟 Excellent | Production-ready, exemplary code (≥90%) |
| **18-20** | ✅ Sufficient | Good quality, minor improvements possible (≥78%) |
| **<18** | ⚠️ Unacceptable | Requires remediation before proceeding (<78%) |

### Example Evaluation

```markdown
## Performance Evaluation

**Score**: 20/23 (Sufficient - 87%)

**Rewards**:
- +10: Elegant middleware pattern
- +3: Idiomatic Express.js code
- +2: DRY implementation
- +2: Handles token expiration
- +1: Reusable across projects
Subtotal: +18

**Penalties**:
- -1: Missing rate limiting
Subtotal: -1

**Net Score**: 18 + 2 = 20/23

**Strengths**:
- Clean separation of concerns
- Comprehensive test coverage (85%)
- Secure token handling

**Areas for Improvement**:
- Add rate limiting middleware
- Consider token blacklist for logout
- Improve error messages for debugging
```

---

## 💻 Manual Commands

### `/architect-review`

Manually trigger **detailed** architectural analysis with full 23-point evaluation:

```
/architect-review
```

**Use when**:
- You want comprehensive breakdown (not just the automatic basic analysis)
- You need detailed rewards/penalties explanation
- You're making critical architectural decisions
- You want actionable recommendations beyond pattern detection
- You've made changes but haven't committed yet
- You're reviewing someone else's code

### `/memory-status`

View current memory system state:

```
/memory-status
```

**Output**:
```
## Memory Structure
.claude/memory/
├── activeContext.md
├── architect.md
├── tasks/ (3 logs)
└── knowledge/ (5 patterns, 8 decisions)

## Active Context
Current Work: User authentication system
Focus: Rate limiting implementation
Blockers: None

## Recent Tasks
- 2025-11-12: JWT authentication (20/23)
- 2025-11-11: Database migration (22/23)
- 2025-11-10: API setup (19/23)

## Knowledge Base
- 5 architectural patterns documented
- 8 key decisions recorded
- Average quality score: 20.3/23 (Sufficient)
```

### `/forensic`

Analyze git history to understand project evolution and architectural decisions:

```
/forensic
```

**What it does**:
- Constructs timeline from architectural commits (feat/refactor/perf)
- Identifies file hotspots (complexity centers needing refactoring)
- Tracks when patterns first emerged
- Finds large commits indicating architectural shifts
- Maps author knowledge distribution
- Updates knowledge base with evolution insights

**Usage modes**:

```bash
# Quick mode (last 3 months)
/forensic

# Deep mode (full history)
/forensic --deep

# Focus on specific area
/forensic --path src/api

# Custom timeframe
/forensic --since "6 months ago"

# Specific author's work
/forensic --author "john@example.com"
```

**Output**: Creates `.claude/memory/knowledge/evolution.md` with timeline, hotspots, pattern emergence dates, and inferred architectural decisions. Asks you to fill in "why" after analyzing "what" from commit history.

**Use when**:
- Bootstrapping MightyArchitect on legacy projects
- Understanding why the codebase evolved this way
- Preparing for major refactors (know the history first)
- Identifying tribal knowledge owners
- Finding technical debt accumulation points

**Perfect for**: Taking over inherited codebases, onboarding to existing projects, or conducting architectural archaeology.

### `/bootstrap`

Interactive workflow to bootstrap MightyArchitect on existing legacy projects:

```bash
/bootstrap
```

**What it does**:
- **Phase 1**: Automated codebase analysis (explores structure, identifies 5-7 patterns)
- **Phase 2**: Interactive Q&A (asks you to explain "why" behind decisions)
- **Phase 3**: Initializes memory system with captured knowledge

**Use when**:
- First time using MightyArchitect on existing project
- Project has no documentation
- You want to capture tribal knowledge before it's lost
- Onboarding new team members

**Combines with**: `/forensic` (analyzes git history) + `/bootstrap` (analyzes code structure) = comprehensive project understanding.

### Windows Workaround Commands

Due to [SessionStart hook bug #9542](https://github.com/anthropics/claude-code/issues/9542), Windows users need manual activation:

#### `/power-up` (Recommended)
```bash
/power-up
```
Activates everything at once:
- ✅ MightyArchitect memory system
- ✅ Superpowers skills framework
- ✅ Episodic memory sync

**Run this at the start of each session.**

#### Individual Commands

If you prefer granular control:

```bash
/activate-mighty-architect  # Load memory system only
/activate-superpowers       # Load Superpowers skills only
/sync-memory                # Sync episodic memory only
/test-hooks                 # Verify hooks are working
```

**macOS/Linux users**: These commands are unnecessary - SessionStart hooks work automatically.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| 📘 [Architecture](docs/ARCHITECTURE.md) | System design, technical decisions, token analysis |
| 📗 [Usage Guide](docs/USAGE.md) | Complete workflows, examples, troubleshooting |
| 🪟 [Windows Workaround](docs/WINDOWS-WORKAROUND.md) | Fix for SessionStart hook bug |
| 📝 [CHANGELOG](CHANGELOG.md) | Version history and release notes |

---

## 🎓 Examples

### Example 1: Task Log

``.claude/memory/tasks/2025-11-12-auth-middleware.md`:

```markdown
# Task Log: JWT Authentication Middleware

## Task Information
- Date: 2025-11-12
- Duration: 3 hours
- Files Modified: 5 (middleware/auth.js, routes/auth.js, tests/auth.test.js, ...)
- Status: ✅ Complete

## Task Details

**Goal**: Implement secure JWT-based authentication

**Implementation**:
- Created middleware to verify JWT tokens
- Integrated with Express routes
- Added comprehensive test coverage (85%)

**Challenges**:
- Token refresh strategy was complex
- Decided between 1h vs 24h access tokens
- Needed to balance security vs UX

**Decisions Made**:
- ✅ 1h access token + 7d refresh token
- ✅ HttpOnly cookies for refresh tokens (XSS protection)
- ⚠️ Deferred: Rate limiting (next task)

## Performance Evaluation

**Score**: 20/23 (Sufficient - 87%)

**Rewards**: +18 (elegant pattern, idiomatic code, DRY, handles edge cases, reusable)
**Penalties**: -1 (missing rate limiting)

**Strengths**:
- Clean separation of concerns
- Secure token handling
- Good test coverage

**Areas for Improvement**:
- Add rate limiting to prevent brute force
- Consider token blacklist for logout
- Improve error messages for debugging

## Next Steps
- [ ] Implement rate limiting middleware
- [ ] Add token blacklist for logout
- [ ] Document authentication flow in README
- [ ] Load testing with 1000+ concurrent users

## Lessons Learned

1. **Security first**: Even small auth oversights can be exploited
2. **Test edge cases**: Expired tokens, invalid signatures, missing headers
3. **Balance UX vs security**: 1h tokens with auto-refresh is sweet spot
```

### Example 2: Architectural Decision

`.claude/memory/knowledge/decisions.md`:

```markdown
## 2025-11-12 - JWT Over Session-Based Authentication

**Context**:
Needed authentication for REST API. Had to choose between:
- Session-based auth (cookies + server-side sessions)
- Token-based auth (JWT)

**Decision**: Use JWT-based authentication

**Alternatives Considered**:
1. **Session-based** - REJECTED
   - Pro: Server controls revocation
   - Pro: Simpler implementation
   - Con: Doesn't scale horizontally (session store needed)
   - Con: CSRF vulnerabilities
   - Con: Not API-friendly

2. **JWT** - CHOSEN
   - Pro: Stateless (no session store)
   - Pro: Scales horizontally
   - Pro: Mobile/API friendly
   - Pro: Can include claims (roles, permissions)
   - Con: Can't revoke without blacklist
   - Con: Slightly larger payload

**Consequences**:
- ✅ Easy horizontal scaling (no shared session store)
- ✅ Works seamlessly with mobile apps and SPAs
- ⚠️ Need to implement refresh token rotation
- ⚠️ May need token blacklist for immediate logout

**Implementation Notes**:
- Using 1h access tokens (short-lived for security)
- 7-day refresh tokens in HttpOnly cookies
- Storing user ID + roles in JWT payload
- Using HS256 algorithm (RS256 if we need key rotation)

**Future Considerations**:
- May switch to RS256 if we need multiple services
- Consider OAuth2/OIDC if we add social login
- Monitor token size (currently 250 bytes, limit 4KB)
```

---

## 🔧 Configuration

### Default Settings

Stored in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{
        "command": "node ~/.claude/plugins/mighty-architect/hooks/session-start.js"
      }]
    }],
    "PostToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "command": "node ~/.claude/plugins/mighty-architect/hooks/git-commit.js"
      }]
    }],
    "Stop": [{
      "matcher": "",
      "hooks": [{
        "command": "node ~/.claude/plugins/mighty-architect/hooks/stop.js"
      }]
    }]
  },
  "mightyArchitect": {
    "autoInit": true,
    "version": "1.0.0",
    "installedAt": "2025-11-12T10:00:00.000Z"
  }
}
```

### Customization

**Disable auto-initialization**:
```json
{
  "mightyArchitect": {
    "autoInit": false
  }
}
```

**Adjust commit filter** (edit `hooks/git-commit.js`):
```javascript
// Change from 3+ files to 5+ files
if (filesChanged >= 5) {  // Was: >= 3
  // Trigger Architect
}

// Add more commit types
if (!/^(feat|refactor|perf|arch):/.test(commitMsg)) {  // Added 'arch:'
  return;
}
```

---

## 🪟 Windows Users

**Important**: Due to a bug in Claude Code (GitHub issue #9542), SessionStart hooks don't work on Windows.

### Quick Fix

Run this at the start of each session:
```
/activate-mighty-architect
```

Or add to your `/power-up` command if you use one.

### What Still Works

✅ **Git commit analysis** (PostToolUse hook) - Works perfectly!
✅ **Task reminders** (Stop hook) - Works perfectly!
❌ **Auto-load memory** (SessionStart hook) - Manual activation needed

📖 **Full details**: [WINDOWS-WORKAROUND.md](docs/WINDOWS-WORKAROUND.md)

---

## ❓ FAQ

<details>
<summary><b>Q: Does this work with other AI assistants?</b></summary>

A: Currently designed for Claude Code only. The hook system is specific to Claude Code's architecture.

</details>

<details>
<summary><b>Q: Can I use this in multiple projects?</b></summary>

A: Yes! Each project gets its own `.claude/memory/` directory. The plugin is installed globally but memory is per-project.

</details>

<details>
<summary><b>Q: How much disk space does it use?</b></summary>

A: Very little! Memory files are markdown text:
- activeContext.md: ~1-2 KB
- architect.md: ~5 KB (template)
- Each task log: ~2-5 KB
- patterns.md grows slowly: ~10-20 KB per 100 commits

</details>

<details>
<summary><b>Q: What happens if I don't update my memory files?</b></summary>

A: Claude will still work! Memory is optional enrichment:
- No memory: Claude has general knowledge only
- With memory: Claude has your project context too

</details>

<details>
<summary><b>Q: Can I edit the memory files manually?</b></summary>

A: Absolutely! They're just markdown files. Edit anytime in your favorite editor.

</details>

<details>
<summary><b>Q: Does this send data anywhere?</b></summary>

A: No. Everything is local:
- Memory files: In your project (`.claude/memory/`)
- Plugin code: In your home directory (`~/.claude/plugins/`)
- No network requests, no telemetry, no external servers

</details>

<details>
<summary><b>Q: How do I uninstall?</b></summary>

```bash
# Remove plugin
rm -rf ~/.claude/plugins/mighty-architect

# Remove hooks from settings.json (manually edit)
# Remove per-project: rm -rf .claude/memory/
```

</details>

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. **Report issues**: [GitHub Issues](https://github.com/StarenseN/Claude-MightyArchitect/issues)
2. **Suggest features**: Open a discussion first
3. **Submit PRs**: Fork, create feature branch, submit PR
4. **Share experiences**: How are you using MightyArchitect?

### Development Setup

```bash
# Clone repository
git clone https://github.com/StarenseN/Claude-MightyArchitect.git
cd Claude-MightyArchitect

# Install locally for testing
npm install -g .

# Run tests
npm test

# All tests should pass (6/6)
```

---

## 📊 Comparison

| Feature | MightyArchitect | Original (Windsurf) | Claude Code (vanilla) |
|---------|----------------|---------------------|----------------------|
| **Memory System** | ✅ 3-layer | ✅ Full repo context | ❌ None |
| **Token Usage** | 🟢 ~800 | 🟡 ~3000+ | 🟢 0 |
| **Auto Analysis** | ✅ Automatic (on commits) | ✅ Always-on | ❌ Manual |
| **Pattern Detection** | ✅ Automatic | ✅ Yes | ❌ None |
| **Quality Scoring** | ✅ 23-point (auto: 15-20, detailed: 21-23) | ✅ Yes | ❌ Subjective |
| **Zero Dependencies** | ✅ Pure Node.js | ❌ Bash + jq | ✅ Native |
| **Cross-Platform** | ✅ Win/Mac/Linux | 🟡 macOS/Linux | ✅ All |
| **Installation** | ⚡ One command | ⚡ One command | 🟢 Built-in |
| **Knowledge Base** | ✅ Auto-updated | ✅ Persistent | ❌ None |

---

## 🙏 Credits

- **Inspired by**: [Entrepreneur4lyf's Meta-Cognitive Workflow Architecture](https://github.com/entrepeneur4lyf/engineered-meta-cognitive-workflow-architecture)
- **Built with**: [Claude Code](https://claude.ai/code) by Anthropic
- **Development approach**: [Superpowers](https://github.com/superpowers-framework) TDD framework
- **Created by**: Claude & StarenseN

---

## 📝 License

Apache 2.0 - See [LICENSE](LICENSE) file

---

## 🌟 Star History

If you find MightyArchitect helpful, consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=StarenseN/Claude-MightyArchitect&type=Date)](https://star-history.com/#StarenseN/Claude-MightyArchitect&Date)

---

## 🔗 Links

- **Repository**: [github.com/StarenseN/Claude-MightyArchitect](https://github.com/StarenseN/Claude-MightyArchitect)
- **Issues**: [Report a bug](https://github.com/StarenseN/Claude-MightyArchitect/issues)
- **Discussions**: [Ask questions](https://github.com/StarenseN/Claude-MightyArchitect/discussions)
- **Claude Code**: [claude.ai/code](https://claude.ai/code)

---

<div align="center">

**Made with 🏗️ by the Claude Code community**

*Giving Claude a memory, one commit at a time*

[⬆ Back to Top](#-mightyarchitect)

</div>
