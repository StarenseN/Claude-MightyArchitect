---
name: forensic
description: Git forensic analysis - understand project evolution through history
---

# Git Forensic Analysis

I'll analyze your project's history to understand architectural evolution.

## What I'll Analyze

### 1. **Commit Timeline** (Backwards)
- Major features added (feat: commits)
- Refactoring events (refactor: commits)
- Performance changes (perf: commits)
- When patterns emerged or changed

### 2. **File Evolution**
- Most modified files (hotspots = complexity centers)
- File creation dates (what came first)
- Large commits (architectural shifts)
- Churn rate (files constantly changing = design issues)

### 3. **Author Patterns**
- Who worked on what (tribal knowledge owners)
- Team changes over time
- Knowledge silos

### 4. **Architecture Timeline**
- Identify inflection points (big changes)
- Map dependencies evolution
- Track technology additions/removals

## Usage Modes

### Quick Mode (Last 3 months)
```
/forensic
```
Analyzes recent history for active patterns.

### Deep Mode (Full history)
```
/forensic --deep
```
Goes back to first commit, maps entire evolution.

### Focused Mode (Specific area)
```
/forensic --path src/api
```
Analyzes evolution of specific subsystem.

## What You'll Get

### 1. **Timeline Report**
```markdown
## Project Evolution Timeline

### Phase 1: Foundation (2022-01 to 2022-06)
- Initial Express setup (commit abc123)
- PostgreSQL database added (commit def456)
- Basic auth system (commit ghi789)

### Phase 2: Feature Growth (2022-07 to 2023-03)
- Payment integration added (commit jkl012)
- Admin panel built (commit mno345)
- API expanded to 20+ endpoints

### Phase 3: Scale & Refactor (2023-04 to Present)
- Migrated to microservices (commit pqr678)
- Added Redis caching (commit stu901)
- Performance optimizations
```

### 2. **Hotspot Analysis**
```markdown
## File Hotspots (Most Modified)

1. `src/api/users.js` - 87 commits
   - High churn = needs refactor
   - Last major change: 2 weeks ago

2. `src/db/models/order.js` - 63 commits
   - Business logic complexity center
   - Consider splitting into smaller modules
```

### 3. **Pattern Emergence**
```markdown
## When Patterns Appeared

- **2022-03**: Middleware pattern adopted (auth.js added)
- **2022-08**: Service layer introduced (first service file)
- **2023-01**: Repository pattern (db abstraction layer)
- **2023-06**: Event-driven architecture (EventEmitter usage)
```

### 4. **Decision Inference**
```markdown
## Decisions Inferred from History

**2022-11 - Switch from REST to GraphQL**
- Commit: "feat: add Apollo Server"
- Files: +12 (schema, resolvers)
- Rationale: [I'll ask you to confirm]

**2023-04 - Database Migration**
- Commit: "refactor: migrate to Prisma ORM"
- Files: 45 changed
- Massive refactor = strategic decision
```

## How It Works

1. **I'll run git commands** to extract history
2. **Parse commit messages** for semantic meaning
3. **Analyze file changes** to identify patterns
4. **Build timeline** of architectural evolution
5. **Ask you questions** to fill in "why" (what I can't infer)
6. **Update knowledge base** with findings

## Output Location

Results saved to:
- `.claude/memory/knowledge/evolution.md` - Timeline
- Updates to `patterns.md` with emergence dates
- Updates to `decisions.md` with inferred decisions

## Ready?

Tell me:
- **Full history or recent?** (last 3/6/12 months, or all time)
- **Focus area?** (entire project or specific directory)
- **Key people?** (whose work should I focus on)

Then I'll start the forensic analysis.

---

## Example Commands

```bash
# Quick recent analysis
/forensic

# Full project history
/forensic --deep

# Focus on API evolution
/forensic --path src/api --deep

# Specific timeframe
/forensic --since "6 months ago"

# Specific author's work
/forensic --author "john@example.com"
```

---

**This is archaeology for code - let's uncover your project's story!** 🔍
