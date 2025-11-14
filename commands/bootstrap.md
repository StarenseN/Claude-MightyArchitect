---
name: bootstrap
description: Bootstrap MightyArchitect on existing project (one-time comprehensive onboarding)
---

# Bootstrapping MightyArchitect on Existing Project

**One-time comprehensive onboarding** that captures your project's complete history and tribal knowledge.

---

## What Happens (Fully Automatic)

### Phase 0: Git Forensic Analysis (2-5 min)

I'll analyze your **complete git history**:
- Commit timeline - All major features, refactorings, performance changes
- File evolution - Hotspots (most modified files), creation dates
- Author patterns - Who worked on what (tribal knowledge owners)
- Architecture timeline - When patterns emerged, tech stack evolution

**Output**: `.claude/memory/knowledge/evolution.md`

### Phase 1: Codebase Analysis (3-7 min)

I'll explore your **entire codebase**:
- Project structure and organization
- 5-7 key architectural patterns in use
- Technology stack and dependencies
- Cross-reference with forensic findings

**Output**: Updates to `patterns.md` and `decisions.md`

### Phase 2: Knowledge Capture (5-15 min - Your Input)

I'll ask you questions about:
- **Rationale** - Why certain decisions were made
- **Context** - Business requirements, deadlines, team changes
- **Pain points** - What you'd change if starting fresh
- **Tribal knowledge** - Things not visible in code/git

**Output**: Complete `decisions.md` with the "why"

### Phase 3: Memory Initialization (1-2 min)

I'll set up your complete memory system:
- `core/activeContext.md` - Current project state
- `core/projectbrief.md` - Project overview
- `core/productContext.md` - Business context
- `core/techContext.md` - Tech stack & decisions
- `core/systemPatterns.md` - Architectural patterns
- `core/progress.md` - Improvement roadmap
- `core/memory-index.md` - Health dashboard

**Output**: Complete `.claude/memory/` structure

### Phase 4: Architect Review (3-5 min) - AUTOMATIC

After bootstrap completes, I'll automatically run `/architect-review` (Mode C) to:
- Validate all captured documentation for coherence
- Generate comprehensive analysis report
- Score project health (23-point system)
- Identify architectural strengths and technical debt
- Create actionable improvement roadmap

**Output**: Complete architectural analysis report in `Docs/`

---

## Ready to Start?

Just tell me about your project:

**Required Info:**
- What type of app? (web, mobile, API, CLI, etc.)
- Main tech stack? (Node.js, Python, Go, React, etc.)
- How old? (months/years)

**Optional Info:**
- Known pain points?
- Most complex areas?
- Team size?

Then I'll run the complete analysis (13-35 minutes total, including automatic architect review).

---

## Example Output

After completion, you'll have **~2000-4000 lines of documentation** + **architectural analysis report**:

```
.claude/memory/
├── core/
│   ├── activeContext.md       ✅ Current project state
│   ├── projectbrief.md        ✅ Project overview
│   ├── productContext.md      ✅ Business context
│   ├── techContext.md         ✅ Tech decisions
│   ├── systemPatterns.md      ✅ Architectural patterns
│   ├── progress.md            ✅ Improvement roadmap
│   └── memory-index.md        ✅ Health dashboard
│
└── knowledge/
    ├── evolution.md           ✅ Complete git timeline
    ├── patterns.md            ✅ Pattern history
    └── decisions.md           ✅ Decision rationale

Docs/
└── YYYYMMDD-HHMM-bootstrap-architect-review.md  ✅ Complete analysis report
                                                     (Health score, patterns,
                                                      technical debt, roadmap)

Token usage when loaded: ~1500-2500 tokens
```

---

## After Bootstrap

Going forward:
- ✅ Memory auto-loads on session start
- ✅ Patterns auto-detected on commits (Mode A automatic)
- ✅ Architecture validated with baseline report
- ✅ Task logs auto-created when completing todos
- ✅ Run `/architect-review` anytime for updated analysis

**Bootstrap is one-time only** - from then on, the system maintains itself automatically.

---

**This captures your entire project's story - let's preserve your tribal knowledge!** 🏗️
