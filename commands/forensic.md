---
name: forensic
description: Git forensic analysis only (consider using /bootstrap for complete project onboarding)
---

# Git Forensic Analysis (Standalone)

> **💡 Tip**: For complete project onboarding (forensic + code analysis + Q&A), use `/bootstrap` instead. This command runs **only** the git forensic analysis.

---

I'll analyze your project's git history to understand architectural evolution.

## What I'll Analyze

1. **Commit Timeline** - Major features (feat:), refactoring (refactor:), performance (perf:)
2. **File Evolution** - Most modified files (hotspots), creation dates, large commits
3. **Author Patterns** - Who worked on what (tribal knowledge owners)
4. **Architecture Timeline** - When patterns emerged, technology additions/removals

## Usage

```bash
# Quick mode (last 3 months)
/forensic

# Deep mode (full history)
/forensic --deep

# Focused analysis
/forensic --path src/api

# Specific timeframe
/forensic --since "6 months ago"

# Specific author
/forensic --author "john@example.com"
```

## Output

Results saved to:
- `.claude/memory/knowledge/evolution.md` - Project evolution timeline
- Updates `patterns.md` with pattern emergence dates
- Updates `decisions.md` with inferred architectural decisions

## vs /bootstrap

| Command | Forensic | Code Analysis | Q&A | Duration |
|---------|----------|---------------|-----|----------|
| `/forensic` | ✅ Yes | ❌ No | ❌ No | 2-5 min |
| `/bootstrap` | ✅ Yes | ✅ Yes | ✅ Yes | 10-30 min |

**Recommendation**: Use `/bootstrap` for first-time setup on legacy projects. Use `/forensic` only if you just want git history analysis without full memory initialization.

---

## Ready?

Tell me:
- **Scope**: Full history (`--deep`) or recent (`last 3 months`)?
- **Focus area**: Entire project or specific directory (`--path`)?
- **Key people**: Whose work should I focus on (`--author`)?

Then I'll start the forensic analysis.
