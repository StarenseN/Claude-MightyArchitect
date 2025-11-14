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

- 📝 **Remembers your context** across sessions (800-1000 tokens vs Windsurf's 3000+)
- 🏗️ **Analyzes your architecture** automatically on significant commits
- 🎯 **Scores code quality** objectively using a 23-point system (Task Manager)
- 📚 **Builds knowledge** by documenting patterns and decisions
- 🚀 **Zero setup** - one command installation with auto v1→v2 migration

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

### ⚡ Token Efficient (v2.0)
**73% reduction** from Windsurf:
- MightyArchitect v2.0: 800-1000 tokens
- Windsurf: ~3000+ tokens
- Selective loading: 3 files only

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

## 🆕 What's New in v2.0

### Architectural Improvements
- **🏗️ Architect Agent**: Two modes for different analysis depths
  - **Mode A**: Quick observation (60s) - auto-triggered on commits
  - **Mode C**: Full analysis (5-10min) - manual via `/architect-review`
- **📁 Hierarchical structure**: `core/` directory for better organization
- **🔄 Auto-migration**: Seamless upgrade from v1.x with backup
- **🎯 Clear separation**: Task Manager scores, Architect analyzes

### Enhanced Pattern Detection
8 architectural patterns auto-detected:
- Agent-Hook Integration
- Middleware-Controller
- Service Layer
- MVC/Three-Tier
- Test-Driven Development
- Configuration Management
- Event-Driven Hooks
- General Architecture Updates

### Token Optimization
- **Before**: 3000+ tokens (Windsurf full context)
- **After**: 800-1000 tokens (selective loading)
- **Strategy**: Load only activeContext, systemPatterns, memory-index
- **Result**: 73% reduction without losing critical context

### Migration Safety
- Automatic v1→v2 migration on first use
- Full backup created at `.claude/memory.backup-v1/`
- Version tracking prevents re-migration
- Corrupted structure auto-repair

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

### Memory Structure (v2.0)

MightyArchitect creates a `.claude/memory/` directory in your project:

```
.claude/memory/
├── 📝 core/                          # Core memory (selectively loaded)
│   ├── activeContext.md              # 👁️ Always loaded (~200 tokens)
│   ├── systemPatterns.md             # 👁️ Always loaded (~300 tokens)
│   ├── projectbrief.md               # 📁 Project overview
│   ├── productContext.md             # 📁 Problem/solution context
│   ├── techContext.md                # 📁 Technology decisions
│   ├── progress.md                   # 📁 Roadmap & features
│   └── memory-index.md               # 👁️ Health status (~300 tokens)
│
├── 🏗️ architect.md                   # 📋 Architect agent reference (local copy)
│
├── 📂 tasks/                         # 📁 Task logs (created by Task Manager agent)
│   ├── 20251112-120000-auth.md      # Timestamped task logs
│   └── 20251111-143000-api.md       # With 23-point scoring
│
├── 📂 knowledge/                     # 🧠 Long-term wisdom
│   ├── decisions.md                  # Architectural decisions
│   └── evolution.md                  # Project history
│
├── 📂 plans/                         # 📁 Implementation plans
└── 📂 errors/                        # 📁 Error patterns
```

**Legend**: 👁️ = Auto-loaded (800-1000 tokens total) | 📁 = On-demand | 🧠 = Accumulated wisdom

> **Note on Agents**: The actual agent definitions (architect.md, task-manager.md) are installed globally in `~/.claude/plugins/mighty-architect/agents/`. The `architect.md` file in your project memory is a local reference copy. Agents are invoked via Claude's Task tool and operate on your project's memory.

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

## 🤝 Agent Collaboration

MightyArchitect uses two specialized agents that work together:

### Architect Agent (Macro-Level)

**Location**: `~/.claude/plugins/mighty-architect/agents/architect.md`

**Responsibilities**:
- 🏗️ Architectural pattern detection and documentation
- 📊 System health monitoring
- 🔍 Cross-file coherence analysis
- 📝 Strategic decision documentation

**Modes**:
- **Mode A** (Automatic, 60s): Quick observation after commits, basic pattern detection
- **Mode C** (Manual, 5-10min): Comprehensive analysis via `/architect-review`

**Output**: Updates `systemPatterns.md`, generates detailed reports in `Docs/`

**When Invoked**:
- Automatically: After architectural commits (feat/refactor/perf with 3+ files)
- Manually: `/architect-review` command

### Task Manager Agent (Micro-Level)

**Location**: `~/.claude/plugins/mighty-architect/agents/task-manager.md`

**Responsibilities**:
- ✅ Todo completion tracking
- 📊 23-point quality scoring
- 📝 Task log generation
- 🎯 Semantic task grouping

**Scoring System**: Brutal honesty 23-point system (rewards - penalties)

**Output**: Creates task logs in `.claude/memory/tasks/` with performance evaluation

**When Invoked**:
- Automatically: When you complete todos (via TodoWrite hook)
- Creates 1 log per standalone todo OR 1 log per thematic batch

### Agent Separation

| Aspect | Architect Agent | Task Manager Agent |
|--------|----------------|-------------------|
| **Focus** | Macro (architecture) | Micro (tasks) |
| **Scope** | System-wide patterns | Individual work items |
| **Trigger** | Git commits | Todo completion |
| **Analysis Time** | 60s (Mode A) or 5-10min (Mode C) | < 5s |
| **Scoring** | No scoring (just analysis) | 23-point scoring |
| **Output** | systemPatterns.md, reports | Task logs |

**No Overlap**: Architect analyzes *what* patterns exist, Task Manager scores *how well* you implemented them.

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

**Automatic analysis** (Architect Agent Mode A - v2.0):
```
🏗️  **Architect Agent Mode A** (Quick Observation)

✓ Pattern: Middleware-Controller Pattern
  Significance: Request processing pipeline

⚠️ Warning: techContext.md appears empty - complete via /architect-review

Pattern appended to core/systemPatterns.md
Auto-detected by Architect Agent Mode A

💡 Tip: Run /architect-review for comprehensive analysis
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

### `/bootstrap` (One-Time Comprehensive Onboarding)

**One-time comprehensive onboarding** that captures your project's complete history and tribal knowledge:

```bash
/bootstrap
```

**What it does** (fully automatic 4-phase workflow):
- **Phase 0 (2-5 min)**: Git forensic analysis - analyzes **complete git history**, identifies file hotspots, maps architectural evolution
- **Phase 1 (3-7 min)**: Codebase analysis - explores **entire codebase**, identifies 5-7 patterns, cross-references with forensic findings
- **Phase 2 (5-15 min)**: Interactive Q&A - asks "why" behind decisions, captures tribal knowledge not visible in code
- **Phase 3 (1-2 min)**: Memory initialization - sets up complete `.claude/memory/` structure with all context

**Output**: Complete memory system (~2000-4000 lines of documentation):
- `core/` - Project brief, context, patterns, progress (~800 tokens)
- `knowledge/evolution.md` - Full project timeline from git history
- `knowledge/patterns.md` - Pattern emergence and usage
- `knowledge/decisions.md` - Architectural decisions with rationale

**Duration**: 10-30 minutes (mostly automatic, ~5-15 min of your Q&A time)

**Use when**:
- First time using MightyArchitect on existing project (>3 months old)
- Project has no documentation
- You want to capture tribal knowledge before it's lost
- Onboarding new team members
- Taking over inherited codebases

> **Note**: Bootstrap is a one-time command that always performs deep analysis of your entire project history. After bootstrap, the system maintains itself automatically through git commit hooks.

### `/forensic` (Git History Only)

Standalone git forensic analysis (consider using `/bootstrap` instead for complete onboarding):

```bash
/forensic
```

> **💡 Tip**: `/bootstrap` automatically includes forensic analysis plus code analysis and Q&A. Use `/forensic` only if you need git history analysis without full project setup.

**What it does**:
- Analyzes commit timeline (feat/refactor/perf)
- Identifies file hotspots
- Tracks pattern emergence
- Maps author knowledge distribution

**Output**: `.claude/memory/knowledge/evolution.md` only

**Duration**: 2-5 minutes

### `/register-todowrite-hook` ⭐ NEW

Enable automatic task log creation when you complete todos:

```bash
/register-todowrite-hook
```

**What it does**:
- Registers a PreToolUse hook that intercepts Claude's native TodoWrite operations
- Automatically creates task logs in `.claude/memory/tasks/` when todos complete
- **Flexible granularity**:
  - **1 todo completed** = 1 task log (for standalone work)
  - **1 theme completed** (group of related todos) = 1 task log (for planned work)

**How it works**:

**Scenario 1: Single Todo**
```
You: "Fix the login bug"
Claude: [Creates todo] "Fix login bug"
        [Completes work, marks todo completed]
→ Task log auto-created: .claude/memory/tasks/2025-11-12-fix-login-bug.md
```

**Scenario 2: Thematic Batch (from a plan)**
```
You: "/superpowers:execute-plan docs/plans/jwt-auth.md"
Claude: [Creates 3 todos]
        1. "Create user model with password hashing"
        2. "Add JWT token generation"
        3. "Implement auth middleware"
        [Completes all 3, marks as completed]
→ Task log auto-created: .claude/memory/tasks/2025-11-12-jwt-authentication.md
  (1 log for the entire theme, not 3 separate logs)
```

**Smart Detection**:
- Analyzes todo content patterns to detect if part of a plan
- Groups related todos into themes automatically
- Waits for theme completion before creating log
- No manual intervention required

**Benefits**:
- ✅ Works with Claude's native TodoWrite (Ctrl+T)
- ✅ No forced batch sizes (3, 5, etc.)
- ✅ Semantic grouping by themes, not arbitrary numbers
- ✅ Automatic documentation of all work
- ✅ Integrates seamlessly with Superpowers execute-plan

**Use when**:
- You want automatic task logs without manual commands
- You're using Superpowers to execute plans
- You want flexible granularity (1 todo OR 1 theme)
- You prefer natural workflow over forced batching

**Technical Note**: Uses PreToolUse TodoWrite matcher (undocumented feature, see [GitHub Issue #6975](https://github.com/anthropics/claude-code/issues/6975))

**Verification**:
```bash
# Check hook is registered
cat ~/.claude/settings.json | grep -A 5 TodoWrite

# Test it
# 1. Create a todo (Ctrl+T)
# 2. Complete the todo
# 3. Check: ls -la .claude/memory/tasks/
```

**Full documentation**: See [`docs/plans/2025-11-12-todowrite-integration.md`](docs/plans/2025-11-12-todowrite-integration.md)

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

### Plugin Structure

MightyArchitect is installed globally in your home directory:

```
~/.claude/
├── plugins/mighty-architect/
│   ├── agents/
│   │   ├── architect.md        # Architect Agent (Modes A & C)
│   │   └── task-manager.md     # Task Manager Agent (23-point scoring)
│   ├── hooks/
│   │   ├── session-start.js    # Loads memory on startup
│   │   ├── git-commit.js       # Triggers Mode A analysis
│   │   ├── stop.js             # Reminds to update memory
│   │   └── pre-tool-use-todowrite.js  # Task log creation
│   ├── templates/              # Memory file templates
│   └── skills/                 # Superpowers integration
│
├── commands/                   # Slash commands
│   ├── architect-review.md     # /architect-review
│   ├── power-up.md            # /power-up
│   └── ...                    # 11 commands total
│
└── settings.json              # Hook registrations
```

**Important**: Agents are invoked globally via Claude's Task tool, but they operate on your **per-project** memory in `.claude/memory/`.

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
