# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-15

### Added
- **Architect Agent System**: Revolutionary two-mode architectural analysis
  - Mode A: Quick observation (60s) triggered automatically on commits
  - Mode C: Comprehensive analysis (5-10min) via `/architect-review`
- **Enhanced Pattern Detection**: 8 architectural patterns auto-detected
  - Agent-Hook Integration Pattern
  - Middleware-Controller Pattern
  - Service Layer Pattern
  - MVC/Three-Tier Architecture
  - Test-Driven Development
  - Configuration Management
  - Event-Driven Hook Pattern
  - General Architecture Updates
- **Health Check System**: Automatic verification of memory structure integrity
- **Version Tracking**: `.version` file prevents accidental re-migration
- **Auto-Migration**: Seamless v1→v2 upgrade with full backup
- **Corrupted Structure Repair**: Auto-recovery for damaged v2.0 structures
- **New Directories**: `plans/` and `errors/` for better organization
- **Memory Index**: Health status dashboard at `memory-index.md`
- **Integration Tests**: Comprehensive test suite for v2.0 features
  - New project initialization test
  - v1 to v2 migration test
  - Architect Mode A trigger test

### Changed
- **Hierarchical Structure**: Moved to `core/` directory organization
  - `activeContext.md` → `core/activeContext.md`
  - `knowledge/patterns.md` → `core/systemPatterns.md`
  - Added 4 new core files: `projectbrief.md`, `productContext.md`, `techContext.md`, `progress.md`
- **Token Optimization**: Reduced from 3000+ to 800-1000 tokens (73% reduction)
  - Selective loading: only `activeContext.md`, `systemPatterns.md`, `memory-index.md`
  - Other files loaded on-demand
- **Clear Separation of Concerns**:
  - Task Manager: Handles 23-point scoring
  - Architect Agent: Analyzes patterns and architecture
  - LLM: Executes tasks
- **Task Log Format**: Changed to `YYYYMMDD-HHMMSS-description.md`
- **Pattern Recording**: Enhanced with significance tracking and auto-append

### Fixed
- Migration now creates version file to prevent re-migration
- Architect Mode A properly detects and categorizes patterns
- Health checks verify all 6 core files
- Session-start hook handles v1, v2, and corrupted structures correctly

### Removed
- Old inline pattern detection in git-commit.js (moved to Agent Mode A)
- v1.x architect.md with 23-point scoring (replaced with agent instructions)
- Deprecated scoring functions (100+ lines removed)

### Migration Notes

#### From v1.x to v2.0
The system will **automatically migrate** on first use:
1. Creates backup at `.claude/memory.backup-v1/`
2. Moves files to new structure
3. Creates missing core files from templates
4. Installs v2.0 architect agent
5. Creates version file

No manual intervention required. Your existing memory is preserved.

#### Breaking Changes
- Task logs now use YYYYMMDD-HHMMSS format (was flexible before)
- architect.md is no longer loaded automatically (agent instructions)
- patterns.md renamed to systemPatterns.md and moved to core/

#### Compatibility
- **v2.0 is backward compatible** - existing v1.x installations will auto-migrate
- **No data loss** - full backup created before migration
- **Windows workaround** still required for SessionStart hooks

## [Unreleased]

### Added
- **TodoWrite-Based Automatic Task Logging** ⭐ NEW
  - PreToolUse hook intercepts Claude's native TodoWrite operations
  - Automatic task log creation with flexible granularity:
    - **1 todo completed** = 1 task log (standalone work)
    - **1 theme completed** (group of related todos) = 1 task log (planned work)
  - Smart theme detection:
    - Sequential "Task X:" patterns automatically grouped
    - Word overlap heuristic for related todos
    - Waits for theme completion before creating log
  - `/register-todowrite-hook` command for easy setup
  - Full test suite with 4 comprehensive tests
  - Integration with Superpowers execute-plan workflow
  - See [`docs/plans/2025-11-12-todowrite-integration.md`](docs/plans/2025-11-12-todowrite-integration.md) for details
  - Based on undocumented feature: [GitHub Issue #6975](https://github.com/anthropics/claude-code/issues/6975)

- **Knowledge Base Templates**: Initialize with guidance
  - `patterns.md` template with pattern documentation structure
  - `decisions.md` template for architectural decisions
  - `evolution.md` template for project timeline (populated by `/forensic`)
  - Copied automatically during session-start initialization

- **Manual Installation Documentation**: Added alternative installation methods in README
  - Instructions for installing from source (`npm install -g .`)
  - Development workflow with `npm link`
- **Windows Workaround Documentation**: Comprehensive documentation for Windows users
  - `/power-up` command for all-in-one activation
  - Individual activation commands documented
  - Clear explanation of SessionStart hook bug #9542
- **Bootstrap Command Documentation**: Added `/bootstrap` command to manual commands section
- **PUBLISH_CHECKLIST.md**: Complete pre-publish checklist for npm publishing

### Fixed
- **Installer Bug**: Commands now install to `~/.claude/commands/` (global directory) instead of plugin directory
  - Fixed `bin/install.js` to correctly copy commands to global location
  - Commands are now accessible after installation: `/forensic`, `/bootstrap`, `/architect-review`, `/memory-status`
  - Added test verification for command installation location

### Changed
- Session-start hook now copies knowledge base templates during initialization
- `activate-mighty-architect` command updated to include knowledge templates
- Improved installer success message with available commands and Windows tips
- Enhanced test suite with command installation verification (Test 4)
- Updated README with better installation flow and Windows workaround instructions
- Added TodoWrite hook test suite (`test/test-todowrite-hook.js`)

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
