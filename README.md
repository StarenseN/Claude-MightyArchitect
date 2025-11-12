# Claude Memory System

🧠 **Persistent, project-isolated memory for Claude Code with automatic architecture support**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/StarenseN/claude-memory)
[![PowerShell](https://img.shields.io/badge/PowerShell-5.1+-blue.svg)](https://microsoft.com/powershell)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## ✨ Features

- 🔒 **Project-Isolated** - Each project has its own `.memory/` folder
- 📐 **Architecture-Aware** - Automatically detects and integrates with `ARCHITECTURE.md`
- ⚡ **Zero Configuration** - Works immediately after installation
- 🎯 **Pattern Recognition** - Captures and reuses solutions that work
- 🚀 **One-Line Install** - Get started in seconds

## 📦 Installation

```powershell
# One-line installation
iwr https://raw.githubusercontent.com/StarenseN/claude-memory/main/install.ps1 | iex
```

Or download and run locally:
```powershell
# Download installer
curl -O https://raw.githubusercontent.com/StarenseN/claude-memory/main/install.ps1

# Run installer
.\install.ps1
```

## 🚀 Quick Start

```powershell
# 1. Navigate to any project
cd YourProject

# 2. Initialize memory (one time per project)
mem init

# 3. That's it! Memory now works automatically
```

## 📝 Usage

### Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `mem` | Show help and status | `mem` |
| `mem init` | Initialize memory in project | `mem init` |
| `mem show` | View current context | `mem show` |
| `mem add` | Add note to memory | `mem add "fixed login bug"` |

### Advanced Commands

| Command | Description | Example |
|---------|-------------|---------|
| `mem pattern` | Save reusable solution | `mem pattern "use retry with exponential backoff"` |
| `mem decision` | Log architecture choice | `mem decision "chose PostgreSQL for ACID"` |
| `mem arch` | Check architecture status | `mem arch` |
| `mem recent` | Show recent activity | `mem recent` |
| `mem export` | Export to CLAUDE.md | `mem export` |
| `mem clean` | Remove project memory | `mem clean` |

## 📐 Architecture Support

When your project has an `ARCHITECTURE.md` file:

1. **Auto-Detection** - Memory system automatically detects architecture rules
2. **Compliance Tracking** - File locations are validated against architecture
3. **Decision Linking** - Architecture decisions are tracked in memory
4. **Smart Warnings** - Get notified when files don't follow architecture

Example `ARCHITECTURE.md`:
```markdown
# Architecture Rules

## File Structure
- Controllers: /backend/src/api/*.controller.ts
- Services: /backend/src/services/*.service.ts
- Components: /frontend/src/components/**/*.tsx
- Shared Types: /common/types/*.ts
```

## 🗂️ Memory Structure

Each project gets its own `.memory/` folder:

```
YourProject/
├── ARCHITECTURE.md      # Optional - your architecture rules
└── .memory/            # Auto-created memory system
    ├── context.md      # Current working state
    ├── patterns.md     # Reusable solutions
    ├── decisions.md    # Technical/architecture choices
    └── tasks/          # Timestamped activity logs
```

## 🔄 How It Works

1. **Session Start** - Memory automatically loads when Claude starts in your project
2. **During Work** - File changes and decisions are logged automatically
3. **Pattern Emergence** - Successful solutions are captured as patterns
4. **Session End** - Everything is saved locally in your project

## 🎯 Use Cases

### For Solo Developers
- Never lose context between Claude sessions
- Build a library of working patterns
- Track why decisions were made

### For Teams
- Share patterns via `.memory/patterns.md`
- Document architecture decisions
- Onboard new developers faster

### For Architecture
- Validate file placement automatically
- Track compliance with rules
- Document architectural evolution

## 🛠️ Configuration

### Git Integration

To share memory with your team:
```bash
# Share patterns and decisions (not tasks)
git add .memory/patterns.md .memory/decisions.md
git commit -m "Team knowledge"
```

To keep memory private:
```bash
# Add to .gitignore
echo ".memory/" >> .gitignore
```

### PowerShell Profile

The installer automatically adds this to your PowerShell profile:
```powershell
# Claude Memory System
Import-Module ClaudeMemory -ErrorAction SilentlyContinue
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not in project directory" | You're in home folder, `cd` to a project |
| Memory not loading | Run `mem init` in your project |
| Commands not found | Restart PowerShell after installation |
| Want fresh start | Run `mem clean` then `mem init` |

## 📊 System Requirements

- Windows PowerShell 5.1+ or PowerShell Core 7+
- Claude Code (Desktop or VS Code)
- Project with any of: `.git`, `package.json`, `ARCHITECTURE.md`, etc.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Windsurf Memory System architecture
- Built for the Claude Code community
- Special thanks to all contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/StarenseN/claude-memory/issues)
- **Discussions**: [GitHub Discussions](https://github.com/StarenseN/claude-memory/discussions)

---

Built with ❤️ for developers who want Claude to remember everything.
