# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-12

### Added
- **Git Forensic Analysis** feature for legacy project bootstrapping
  - `/forensic` slash command for analyzing git history
  - `forensic-analysis.md` skill with 6-phase systematic analysis protocol
  - Timeline construction from architectural commits (feat/refactor/perf)
  - File hotspot analysis to identify complexity centers
  - Pattern emergence tracking (when patterns first appeared)
  - Large commit analysis for architectural inflection points
  - File age analysis to understand foundation vs recent additions
  - Author knowledge mapping for tribal knowledge identification
- `commands/forensic.md` - User-facing documentation with usage modes
- Updated `BOOTSTRAPPING-EXISTING-PROJECTS.md` with forensic analysis section

### Features
- **Quick Mode**: Last 3 months history analysis
- **Deep Mode**: Full repository history from first commit
- **Focused Mode**: Specific path/subsystem evolution tracking
- **Interactive**: Asks user to fill in "why" after inferring "what" from commits
- **Knowledge Base Integration**: Auto-updates evolution.md, patterns.md, decisions.md

### Documentation
- Comprehensive forensic analysis guide in bootstrapping documentation
- Example outputs and usage patterns
- Integration with existing MightyArchitect knowledge system

### Use Cases
- Understanding legacy codebase evolution
- Identifying architectural decision points
- Mapping pattern adoption timeline
- Finding complexity hotspots requiring refactoring
- Preparing for major refactors with historical context

## [1.0.0] - 2025-11-12

### Added
- Three-layer memory system (working/short-term/long-term)
- SessionStart hook for auto-initialization (Node.js)
- PostToolUse hook for git commit analysis (Node.js)
- Stop hook for task logging reminders (Node.js)
- Architect skill with 23-point evaluation system
- Installation script with zero external dependencies
- Slash commands: `/architect-review`, `/memory-status`
- Comprehensive documentation (README, ARCHITECTURE, USAGE)
- Full test suite with integration tests

### Features
- **Zero external dependencies** - Pure Node.js, no jq required
- **Cross-platform** - Works on Windows/macOS/Linux natively
- **Token-efficient** - ~800 tokens per session (vs Windsurf's 3000+)
- **Seamless installation** - One command: `npx create-mighty-architect`
- **Automatic pattern recognition** - Triggers on feat/refactor/perf commits
- **Quality scoring system** - Objective 23-point evaluation
- **Auto-initialization** - Asks once, remembers preference

### Technical
- Node.js >=14.0.0 required
- Native JSON parsing (no bash/jq)
- Uses Node.js spawn for proper stdin handling
- Cross-platform path handling with Node.js path module
- Comprehensive test coverage (6 test suites)

### Architecture Decisions
- **Node.js hooks over bash+jq**: Eliminated external dependency for true seamlessness
- **Hybrid memory structure**: Flat for frequent access, nested for archives
- **Git commit filtering**: Only architectural commits (feat/refactor/perf with 3+ files)
- **One-time auto-init**: User preference stored in ~/.claude/settings.json
- **23-point scoring**: Ported from Windsurf for objective quality evaluation

### Migration from Original Plan
- Removed jq dependency (was blocking seamless Windows support)
- Removed Windows PowerShell task (Node.js works everywhere)
- Tasks reduced from 12 to 11
- All hooks implemented in JavaScript instead of bash

### Known Limitations
- Requires git for commit analysis features
- Windows line endings (CRLF) warnings are cosmetic only
- Memory structure must be manually cleaned if corrupted

### Credits
- Based on Entrepreneur4lyf's Meta-Cognitive Workflow Architecture
- Optimized for Claude Code with dramatic token efficiency improvements
- Built using TDD approach with Superpowers framework

[1.1.0]: https://github.com/StarenseN/Claude-MightyArchitect/releases/tag/v1.1.0
[1.0.0]: https://github.com/StarenseN/Claude-MightyArchitect/releases/tag/v1.0.0
