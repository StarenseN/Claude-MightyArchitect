---
name: forensic-analysis
description: Systematic git history analysis to understand project evolution and architectural decisions
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Git Forensic Analysis Skill

## Purpose

Analyze git history to reverse-engineer architectural decisions and patterns from existing codebases.

**Use when:**
- Bootstrapping MightyArchitect on legacy projects
- Understanding why the codebase looks the way it does
- Identifying architectural inflection points
- Preparing for major refactors (know the history)

**Don't use when:**
- Project has no git history
- You just need current state (use normal code exploration)

---

## Analysis Protocol

### Phase 1: Timeline Construction (REQUIRED)

**Extract commit history:**

```bash
# Get architectural commits
git log --all --pretty=format:"%h|%ad|%an|%s" --date=short \
  --grep="feat:" --grep="refactor:" --grep="perf:" \
  > commits_architectural.txt

# Get all commits for volume analysis
git log --all --pretty=format:"%h|%ad|%an" --date=short --numstat \
  > commits_all.txt
```

**Build timeline:**
- Group by time periods (months/quarters)
- Identify major milestones
- Note technology additions/removals

### Phase 2: File Hotspot Analysis (REQUIRED)

**Find most-changed files:**

```bash
# Top 20 most modified files
git log --all --pretty=format: --name-only | \
  sort | uniq -c | sort -rg | head -20

# Churn by file (adds + deletes)
git log --all --numstat --pretty=format:"%h" | \
  awk 'NF==3 {plus[$3]+=$1; minus[$3]+=$2} END {for (file in plus) print plus[file]+minus[file], file}' | \
  sort -rg | head -20
```

**Interpret hotspots:**
- High churn = complexity center or design issue
- Recent high churn = active work area
- Old high churn + recent stability = matured area

### Phase 3: Pattern Emergence Tracking (REQUIRED)

**When patterns appeared:**

```bash
# When was first middleware file added?
git log --all --diff-filter=A --pretty=format:"%h|%ad|%s" --date=short -- "*middleware*"

# When did testing start?
git log --all --diff-filter=A --pretty=format:"%h|%ad|%s" --date=short -- "*test*" "*spec*"

# When was Docker added?
git log --all --diff-filter=A --pretty=format:"%h|%ad|%s" --date=short -- "Dockerfile*" "docker-compose*"
```

**Pattern searches:**
- Framework adoption (package.json changes)
- Architecture patterns (first occurrence of pattern files)
- Tool additions (config files, CI/CD)

### Phase 4: Large Commit Analysis (REQUIRED)

**Find architectural shifts:**

```bash
# Commits changing 10+ files
git log --all --pretty=format:"%h|%ad|%an|%s" --date=short --numstat | \
  awk '/\|/ {commit=$0; files=0} NF==3 {files++} files>10 {print commit; exit}'

# Commits with "migrate", "rewrite", "overhaul"
git log --all --pretty=format:"%h|%ad|%s" --date=short \
  --grep="migrate" --grep="rewrite" --grep="overhaul" -i
```

**These are decision points** - major changes indicate strategic choices.

### Phase 5: File Age Analysis (REQUIRED)

**Sort files by creation date:**

```bash
# Oldest files (foundation)
git ls-files | while read f; do
  echo "$(git log --diff-filter=A --pretty=format:%ad --date=short -- "$f" | tail -1)|$f"
done | sort | head -20

# Newest files (recent additions)
git ls-files | while read f; do
  echo "$(git log --diff-filter=A --pretty=format:%ad --date=short -- "$f" | tail -1)|$f"
done | sort -r | head -20
```

**Interpretation:**
- Oldest files = core architecture
- Newest files = current direction
- Gap analysis = what's missing

### Phase 6: Author Knowledge Map (OPTIONAL)

**Who owns what knowledge:**

```bash
# Top contributors by file
for file in $(git ls-files | head -20); do
  echo "$file:"
  git log --pretty=format:"%an" -- "$file" | sort | uniq -c | sort -rg | head -3
done
```

**Use for:**
- Identifying tribal knowledge owners
- Risk assessment (single points of failure)
- Not for blame - for knowledge capture!

---

## Output Format

### Create `.claude/memory/knowledge/evolution.md`

```markdown
# Project Evolution

## Timeline

### Phase 1: [Name] (YYYY-MM to YYYY-MM)
**Key Changes:**
- [Change 1] (commit hash, date)
- [Change 2] (commit hash, date)

**Patterns Emerged:**
- [Pattern name] - first seen in [file/commit]

**Technologies Added:**
- [Tech] - added [date] (commit hash)

### Phase 2: [Name] (YYYY-MM to YYYY-MM)
...

## Hotspots

### High Churn Files
1. `path/to/file.js` - [N] commits
   - **Analysis**: [Complexity center | Active development | Design issue]
   - **Recommendation**: [Refactor | Monitor | Document]

## Pattern Emergence

- **[Date]**: [Pattern name] first introduced
  - Commit: [hash]
  - Files: [list]
  - Evolution: [how it changed over time]

## Major Inflection Points

### [Date] - [Event Name]
- **Commit**: [hash] - "[message]"
- **Files Changed**: [N]
- **Impact**: [Description]
- **Rationale**: [Ask user if not clear from commits]

## Technology Evolution

- **[Date]**: Added [technology]
- **[Date]**: Removed [old technology]
- **[Date]**: Migrated from [X] to [Y]

## Knowledge Owners

- **[Area/Module]**: Primary - [Author], Secondary - [Author]
- [Only include if useful for knowledge capture]
```

### Update `patterns.md`

Add emergence dates to existing patterns:

```markdown
## YYYY-MM-DD - [Pattern Name]

**First Appeared**: YYYY-MM (commit abc123)
**Commits**: [List of relevant commits showing evolution]
**Score**: [Evaluate current implementation]

[Rest of pattern documentation]
```

### Update `decisions.md`

Add inferred decisions:

```markdown
## YYYY-MM-DD - [Decision Title] (INFERRED)

**Context**: [From commit analysis]

**Decision**: [What was done]

**Evidence**:
- Commit [hash]: "[message]"
- Files changed: [N] ([list major ones])
- [Other evidence from git history]

**Rationale**: [TO BE CONFIRMED BY USER]

**Questions for User**:
1. Why was this change made?
2. What alternatives were considered?
3. Any regrets or things you'd do differently?
```

---

## User Interaction Protocol

After analysis, ALWAYS ask user to fill in gaps:

```
I've analyzed your git history and found [N] major architectural decisions.

I can infer WHAT happened, but not WHY. Please help me complete the knowledge base:

1. [YYYY-MM] Migration from [X] to [Y]
   - Why was this needed?
   - What problems did it solve?

2. [YYYY-MM] Added [Pattern/Technology]
   - What drove this decision?
   - Were there alternatives?

[Continue for each major finding]
```

---

## Success Criteria

✅ **Complete when:**
- Timeline created with phases
- Hotspots identified and analyzed
- Pattern emergence dates documented
- Major decisions inferred from commits
- User has filled in "why" for key decisions
- All findings added to knowledge base

❌ **Incomplete if:**
- Only raw git output (no interpretation)
- No user confirmation of inferred decisions
- Missing emergence dates for patterns
- Hotspot analysis without recommendations

---

## Example Analysis

**Command**: `/forensic --since "1 year ago"`

**Output**:

```markdown
# Project Evolution (Last 12 Months)

## Timeline

### Phase 3: Microservices Migration (2024-01 to 2024-04)
**Key Changes:**
- Split monolith into 5 services (commit a1b2c3d, 2024-02-15)
- Added RabbitMQ for inter-service messaging (commit e4f5g6h, 2024-02-28)
- Implemented API gateway (commit i7j8k9l, 2024-03-10)

**Impact**: 127 files changed across 15 commits

### Phase 4: Performance Optimization (2024-05 to Present)
**Key Changes:**
- Redis caching layer (commit m0n1o2p, 2024-05-20)
- Database query optimization (commit q3r4s5t, 2024-06-15)
- CDN integration (commit u6v7w8x, 2024-07-01)

## Hotspots

1. `services/order/index.js` - 34 commits in last year
   - **Analysis**: Complexity center - business logic heavy
   - **Recommendation**: Split into smaller modules
   - **Owner**: john@example.com (28 commits), jane@example.com (6 commits)

2. `lib/auth.js` - 28 commits in last year
   - **Analysis**: Security requirements evolving
   - **Recommendation**: Audit for completeness

## Major Decisions (Inferred)

### 2024-02-15 - Microservices Migration (INFERRED)

**Evidence**:
- Commit a1b2c3d: "refactor: split monolith into microservices"
- Files changed: 89
- New directories: services/auth, services/order, services/user, etc.

**Rationale**: [TO BE CONFIRMED]

**Questions**:
1. What triggered the decision to migrate?
2. How long did planning take?
3. What challenges did you face?
```

Then ask user to fill in the gaps!

---

## Tips

- **Look for commit message patterns** (team conventions)
- **Package.json history** shows technology adoption
- **Large deletes** often indicate abandoned approaches (valuable lessons!)
- **Config file changes** reveal infrastructure evolution
- **Test file additions** show when quality practices started

---

**The goal: Turn git history into architectural wisdom.** 🔍
