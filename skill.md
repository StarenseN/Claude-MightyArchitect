# Memory System Skill

Automatically maintains context across Claude sessions with project isolation and architecture support.

## Features
- 🔒 Project-isolated memory in `.memory/` folder
- 📐 Automatic ARCHITECTURE.md integration
- ⚡ Session persistence without configuration
- 🎯 Intelligent pattern recognition

## Activation
Automatic triggers:
- Session start in any project
- File creation/modification
- Error occurrence
- Architecture decisions

Manual triggers:
- "update memory" → saves current state
- "check memory" → reviews context
- "memory status" → shows system health

## Memory Structure
```
YourProject/
├── ARCHITECTURE.md      # Optional - auto-detected
└── .memory/            # Auto-created
    ├── context.md      # Current working state
    ├── patterns.md     # Reusable solutions
    ├── decisions.md    # Architecture choices
    └── tasks/          # Timestamped activity logs
```

## Architecture Integration
When ARCHITECTURE.md exists:
- Auto-loads rules on session start
- Tracks file placement decisions
- Validates against architecture patterns
- Links decisions to architecture sections

## Usage Examples
```
# Project with architecture
cd MyProject
mem init                    # Links ARCHITECTURE.md automatically
mem add "Using repository pattern per architecture"
mem decision "Chose PostgreSQL for ACID compliance"

# Project without architecture  
cd SimpleProject
mem init                    # Standard memory setup
mem pattern "API timeout fix: increase to 30s"
```

## Benefits
- Never lose context between sessions
- Architecture compliance tracking
- Pattern emergence from usage
- Zero configuration needed
