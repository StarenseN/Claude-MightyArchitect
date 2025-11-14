---
name: bootstrap
description: Bootstrap MightyArchitect on existing undocumented project (with automatic forensic analysis)
---

# Bootstrapping MightyArchitect on Existing Project

I'll help you capture the architectural knowledge from your existing codebase through a comprehensive 3-phase analysis.

## Phase 0: Git Forensic Analysis (Automatic - I'll do this first)

**What I'll analyze:**
1. **Commit Timeline** - Major features, refactoring events, performance changes
2. **File Evolution** - Hotspots (most modified files), creation dates, large commits
3. **Author Patterns** - Who worked on what (tribal knowledge owners)
4. **Architecture Timeline** - Inflection points, dependency evolution, tech stack changes

**Output:**
- `.claude/memory/knowledge/evolution.md` - Project evolution timeline
- Partial `patterns.md` - When patterns first emerged
- Partial `decisions.md` - Inferred architectural decisions

**Duration:** 2-5 minutes depending on project history

**Modes:**
- Default: Last 3 months (quick recent analysis)
- Deep: Full project history (use `--deep` flag)
- Focused: Specific directory (use `--path src/api`)

## Phase 1: Codebase Analysis (Automatic - I'll do this)

**What I'll do:**
1. Explore your project structure using the Task tool (medium thoroughness)
2. Identify 5-7 key architectural patterns currently in use
3. Infer major architectural decisions from code structure
4. Cross-reference with forensic findings (Phase 0)
5. Complete `.claude/memory/knowledge/patterns.md`
6. Complete `.claude/memory/knowledge/decisions.md`

**Duration:** 3-7 minutes depending on codebase size

## Phase 2: Knowledge Capture (Interactive - You'll help)

After automated analysis, I'll ask you questions about:
- **Rationale**: Why certain decisions were made
- **Timeline**: When patterns emerged or changed (confirming forensic findings)
- **Context**: External factors (deadlines, team changes, business requirements)
- **Pain points**: What you'd change if starting fresh
- **Tribal knowledge**: Things not visible in code or git history

**Duration:** 5-15 minutes (your time investment)

## Phase 3: Memory Initialization (Automatic)

Once bootstrapped, I'll:
- Update `.claude/memory/core/activeContext.md` with current state
- Fill `projectbrief.md`, `productContext.md`, `techContext.md`
- Create comprehensive `systemPatterns.md` from forensic + code analysis
- Set up initial `progress.md` with improvement roadmap
- Generate `memory-index.md` health dashboard

---

## Ready to Start?

Tell me about your project:
- **What type of app is it?** (web, mobile, API, CLI, etc.)
- **What's the main tech stack?** (Node.js, Python, Go, etc.)
- **How old is the project?** (months/years)
- **Any known architectural pain points?**
- **Analysis depth?** (Quick: last 3 months | Deep: full history)

Then I'll begin:
1. **Phase 0**: Forensic analysis (automatic)
2. **Phase 1**: Code analysis (automatic)
3. **Phase 2**: Q&A with you (interactive)
4. **Phase 3**: Memory initialization (automatic)

---

## Optional Flags

```bash
# Quick bootstrap (last 3 months history)
/bootstrap

# Deep bootstrap (full git history)
/bootstrap --deep

# Focus on specific directory
/bootstrap --path src/api --deep

# Skip forensic (code analysis only)
/bootstrap --no-forensic
```

---

## Example Output Structure

After completion, you'll have:

```
.claude/memory/
├── core/
│   ├── activeContext.md       ✅ Current project state
│   ├── projectbrief.md        ✅ Project overview
│   ├── productContext.md      ✅ Business context
│   ├── techContext.md         ✅ Tech stack & decisions
│   ├── systemPatterns.md      ✅ Architectural patterns
│   ├── progress.md            ✅ Roadmap & improvements
│   └── memory-index.md        ✅ Health dashboard
│
└── knowledge/
    ├── evolution.md           ✅ Git forensic timeline
    ├── patterns.md            ✅ Pattern emergence history
    └── decisions.md           ✅ Architectural decisions

Total documentation: ~2000-4000 lines of context
Token usage: ~1500-2500 tokens when loaded
```

---

**This is comprehensive onboarding for legacy projects - let's capture your tribal knowledge!** 🏗️
