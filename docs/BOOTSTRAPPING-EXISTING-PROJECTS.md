# Bootstrapping MightyArchitect on Existing Projects

## The Challenge

You've been building an app for months/years:
- Minimal documentation
- Decisions live in your head (or Slack history)
- Patterns emerged organically
- Tech debt accumulating
- New team members struggle to onboard

**MightyArchitect can help**, but you need a bootstrapping strategy.

---

## Phase 1: Initial Setup (5 minutes)

### Step 1: Install MightyArchitect

```bash
cd your-existing-project
# Plugin auto-initializes on first Claude Code session
```

You'll get:
```
.claude/memory/
├── activeContext.md
├── architect.md
├── tasks/
└── knowledge/
```

### Step 2: Set Your Current State

Edit `.claude/memory/activeContext.md`:

```markdown
# Active Context

## Current Work
Maintaining legacy app - needs documentation overhaul

## Current Focus
Bootstrapping architectural memory from existing codebase

## Recent Achievements
- [List your last 3-5 major features/fixes]
- Built X feature (month/year)
- Refactored Y system (month/year)

## Key Files
- [Leave empty initially - Architect will populate]

## Blockers
- Lack of documentation
- Tribal knowledge not captured
- [Other challenges]

## Next Steps
- [ ] Complete architectural audit
- [ ] Document critical patterns
- [ ] Capture key decisions
```

---

## Phase 2: Architectural Audit (1-2 hours)

### Strategy: Document Backwards from Present

Don't try to document everything. Start with **what matters NOW**.

### Step 1: Ask Claude to Audit Your Codebase

```
"I need to bootstrap MightyArchitect on this existing project.
Please analyze the codebase and identify:

1. Top 5 architectural patterns currently in use
2. Critical decisions that shaped the architecture
3. Major tech debt or design compromises
4. Key files/modules that are central to the system

Then create initial patterns.md and decisions.md in .claude/memory/knowledge/"
```

**What Claude Will Do:**
- Use Task agent with subagent_type=Explore
- Read key files (package.json, main entry points, config)
- Search for patterns (API routes, database models, state management)
- Create initial knowledge base

### Step 2: Review and Refine

Claude will draft the initial docs. You review and add:
- **Context** (why decisions were made)
- **Timelines** (when patterns emerged)
- **Pain points** (what you'd change)

---

## Phase 3: Git Forensic Analysis (Highly Recommended, 30-60 minutes)

Your git history is an archaeological record of decisions. MightyArchitect can analyze it!

### Option A: Automated Forensic Analysis (Recommended)

```
/forensic
```

**What I'll Do:**
1. **Timeline Construction**: Map your project phases
   - When major features were added
   - When refactors happened
   - Technology adoption timeline

2. **Hotspot Detection**: Find complexity centers
   - Most modified files (churn = complexity)
   - Files constantly changing (design issues?)
   - Stable vs volatile areas

3. **Pattern Emergence**: When patterns appeared
   - "First middleware file: 2022-03"
   - "Testing started: 2022-08"
   - "Microservices split: 2024-02"

4. **Decision Inference**: Major commits = decisions
   - Large refactors
   - Technology migrations
   - Architecture shifts

5. **File Age Analysis**: What came first?
   - Oldest files = core architecture
   - Newest files = current direction
   - Evolution path

**Output**: Creates `.claude/memory/knowledge/evolution.md` with complete timeline

### Option B: Manual Git Mining (If you prefer control)

```bash
# Find architectural commits
git log --all --grep="refactor:" --grep="feat:" --grep="perf:" --oneline | head -20

# Review major changes
git log --stat --since="6 months ago" --author="YourName"

# Most modified files (hotspots)
git log --all --pretty=format: --name-only | sort | uniq -c | sort -rg | head -20
```

**Then Ask Claude:**
```
"Review these commits and add any major architectural decisions
to decisions.md with approximate dates and rationale"
```

### Why Git Forensics Matters

**Example findings:**

```markdown
## What Git History Reveals

### Timeline Discovery
- **2022-01**: Started as Express monolith
- **2022-08**: Added TypeScript (commit a1b2c3d)
- **2023-04**: Split into microservices (89 files changed!)
- **2024-01**: Migrated to PostgreSQL from MongoDB

### Hotspot: `services/order.js` (87 commits)
- Most modified file in codebase
- High churn = complexity center
- **Recommendation**: Needs refactoring

### Decision Evidence
Commit e4f5g6h (2023-04-15): "refactor: migrate to microservices"
- Files changed: 89
- Added: RabbitMQ, API gateway
- **Why?** [I'll ask you to fill this in]
```

### The Power of Forensics

- **Discover forgotten decisions**: "Oh yeah, we tried that in 2022!"
- **Understand tech debt sources**: See when compromises were made
- **Identify knowledge owners**: Who worked on what
- **Track pattern evolution**: When did current patterns emerge
- **Avoid repeating mistakes**: "We migrated away from X because..."

**Pro tip**: Run `/forensic --deep` for full history analysis on very old projects

---

## Phase 4: Capture Tribal Knowledge (Ongoing)

### The "Decision Log" Conversation

Have a 15-minute conversation with Claude:

```
"Let me tell you about the key architectural decisions in this project.
Add these to decisions.md as we talk:

1. We chose [Framework X] because...
2. We structured the database as [Y] to handle...
3. We avoided [Technology Z] due to...
4. The API is designed as [REST/GraphQL] because...
5. We deploy to [Platform] because..."
```

Claude will format this into proper decision records with alternatives and trade-offs.

---

## Phase 5: Establish the Workflow (Week 1+)

### From Now On: Use the Architect

**Before implementing features:**
```
"I need to add [feature X]. Let's use the brainstorming skill
to refine the design before coding."
```

**After significant commits:**
```
"/architect-review"
```

**When making architectural decisions:**
```
"I'm deciding between [A] and [B] for [problem].
Document this decision in decisions.md."
```

---

## Example: Real Bootstrapping Session

### Scenario: E-commerce app built over 18 months

**Initial State:**
- React frontend (hooks-based)
- Express backend
- PostgreSQL database
- Redis for caching
- Stripe integration
- Minimal documentation

### Claude Analysis (10 minutes):

```
User: "Analyze this e-commerce codebase and create initial
      architectural documentation in .claude/memory/knowledge/"

Claude:
1. Explores file structure
2. Identifies patterns:
   - Feature-based folder structure
   - Custom React hooks for API calls
   - Middleware-heavy Express architecture
   - Database access via Knex query builder
3. Creates patterns.md with 6 entries
4. Creates decisions.md with 5 entries
```

### User Adds Context (5 minutes):

```markdown
## decisions.md additions:

**Why Knex over Prisma**:
- Chose Knex (2023-03) because team already knew SQL
- Prisma was too "magic" for debugging
- Trade-off: More boilerplate, but full control
```

### Ongoing Maintenance:

Every major feature now gets:
- Pre-implementation: `/superpowers:brainstorm`
- Implementation: TDD workflow
- Post-commit: `/architect-review` (if 3+ files)
- Knowledge base grows organically

---

## What You'll Have After Bootstrapping

### Week 1:
```
.claude/memory/knowledge/
├── patterns.md         (5-10 entries)
└── decisions.md        (5-10 entries)
```

### Month 3:
```
.claude/memory/
├── activeContext.md
├── architect.md
├── tasks/
│   ├── 2024-01-feature-x.md
│   └── 2024-02-refactor-y.md
└── knowledge/
    ├── patterns.md     (20+ entries)
    └── decisions.md    (15+ entries)
```

---

## Tips for Success

### ✅ DO:
- Start small (top 5 patterns, top 5 decisions)
- Focus on **why** not **what** (code shows what)
- Add context from your memory while it's fresh
- Use `/architect-review` after every significant commit
- Let the knowledge base grow organically

### ❌ DON'T:
- Try to document everything at once
- Just copy code comments into patterns.md
- Worry about perfect formatting initially
- Skip the initial audit (it's foundational)
- Forget to update activeContext.md as you work

---

## Measuring Success

**After 1 month, you should be able to:**

1. **Onboard new devs faster**
   - Point them to `.claude/memory/knowledge/`
   - "Here's why we built it this way"

2. **Make better decisions**
   - "We already tried approach X in 2023, didn't work because..."
   - Avoid repeating mistakes

3. **Track technical debt**
   - Document compromises as they happen
   - Prioritize refactoring based on documented pain

4. **Explain to stakeholders**
   - "Here's our architecture philosophy"
   - Clear rationale for technology choices

---

## Need Help?

**Common Scenarios:**

### "My codebase is too messy to document"
→ Perfect! Document the mess. "Current architecture grew organically,
   needs consolidation." That's valuable context.

### "I don't remember why we made decisions"
→ Document that too! "Rationale unclear, likely due to time pressure."
   Better than nothing.

### "We're planning a big refactor"
→ Ideal time to bootstrap! Document current state, then track
   the transformation.

### "Can I use this with a team?"
→ Yes! Knowledge base is version controlled. Team can:
   - Review architectural changes in PRs
   - Add context via commits
   - Build shared understanding

---

## Quick Start Command

Want Claude to do the initial audit right now?

```
"I have an existing [tech stack] project that lacks documentation.

Please:
1. Explore the codebase using the Task tool (medium thoroughness)
2. Identify top 5-7 architectural patterns
3. Infer key architectural decisions from code structure
4. Create initial .claude/memory/knowledge/patterns.md
5. Create initial .claude/memory/knowledge/decisions.md

Then ask me questions about decisions you can't infer from code."
```

---

**Your undocumented "artisanal" codebase is about to become a documented, maintainable system. Let's get started!** 🏗️
