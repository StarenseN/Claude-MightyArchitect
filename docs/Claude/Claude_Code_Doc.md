### Use Git with Claude Code

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of conversational Git commands supported by Claude Code. Users can inquire about changed files, commit changes, create branches, view commit history, and get help with merge conflicts.

```text
> what files have I changed?
> commit my changes with a descriptive message
> create a new branch called feature/quickstart
> show me the last 5 commits
> help me resolve merge conflicts
```

--------------------------------

### Install Claude Code using Windows CMD

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Installs Claude Code on Windows using the Command Prompt (CMD) by downloading an executable script, running it, and then cleaning up the installer file. This method ensures installation on Windows systems.

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

--------------------------------

### Claude Code: Common Development Task Examples

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of natural language prompts for common development workflows with Claude Code. These prompts guide the AI in tasks such as code refactoring, test generation, documentation updates, and code review.

```natural-language
> refactor the authentication module to use async/await instead of callbacks
```

```natural-language
> write unit tests for the calculator functions
```

```natural-language
> update the README with installation instructions
```

```natural-language
> review my changes and suggest improvements
```

--------------------------------

### Ask Claude Code about the project

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of natural language queries to understand the project. Claude Code can analyze files to provide summaries, identify technologies, locate entry points, and explain folder structures.

```text
> what does this project do?
> what technologies does this project use?
> where is the main entry point?
> explain the folder structure
```

--------------------------------

### Ask Claude Code about its capabilities

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of natural language queries to understand Claude Code's features. Users can ask about its general capabilities, usage of slash commands, and compatibility with tools like Docker.

```text
> what can Claude Code do?
> how do I use slash commands in Claude Code?
> can Claude Code work with Docker?
```

--------------------------------

### Start a Claude Code session

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Starts an interactive session with Claude Code within a project directory. After logging in, this command activates the AI assistant for coding tasks.

```bash
cd /path/to/your/project
claude
```

--------------------------------

### Claude Code: Exploration and Analysis Prompts

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of prompts for Claude Code to analyze existing codebases or data. These prompts encourage the AI to understand the project's structure and identify patterns before making changes.

```natural-language
> analyze the database schema
```

```natural-language
> build a dashboard showing products that are most frequently returned by our UK customers
```

--------------------------------

### Request code changes with Claude Code

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Example of a natural language prompt to add a simple function to the main file. Claude Code will identify the file, propose changes, seek approval, and then implement the edit.

```text
> add a hello world function to the main file
```

--------------------------------

### Claude Code: Essential CLI Commands

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Key command-line interface commands for interacting with Claude Code. These commands cover starting interactive mode, running one-time tasks, continuing conversations, committing code, and accessing help.

```bash
claude
```

```bash
claude "task"
```

```bash
claude -p "query"
```

```bash
claude -c
```

```bash
claude -r
```

```bash
claude commit
```

```bash
> /clear
```

```bash
> /help
```

```bash
> exit
```

```bash
Ctrl+C
```

--------------------------------

### Fix bugs or add features with Claude Code

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Examples of natural language prompts for debugging and feature implementation. Claude Code can locate relevant code, understand context, implement solutions, and potentially run tests.

```text
> add input validation to the user registration form
> there's a bug where users can submit empty forms - fix it
```

--------------------------------

### Start Claude Code in a project

Source: https://docs.claude.com/en/docs/claude-code/setup

Navigates to a project directory and initiates the Claude Code command-line interface. This command is run after successful installation.

```bash
cd your-awesome-project
claude
```

--------------------------------

### Log in to Claude Code

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Initiates the login process for Claude Code. This command should be run within the terminal, and the user will be prompted to log in via their account on first use.

```bash
claude
# You'll be prompted to log in on first use
```

--------------------------------

### Install Claude Agent SDK (Python)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Command to install the new claude-agent-sdk package for Python projects using pip.

```bash
pip install claude-agent-sdk
```

--------------------------------

### Start Claude Code in a Project Directory

Source: https://docs.claude.com/en/docs/claude-code/overview

Initiates the Claude Code interactive terminal session within your project directory. After installation, navigate to your project's root folder and run the `claude` command to start interacting with the tool.

```bash
cd your-project
claude
```

--------------------------------

### Claude Code: Step-by-Step Task Decomposition

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Demonstrates breaking down complex tasks into sequential steps for Claude Code. This approach ensures clarity and allows the AI to manage multi-stage development processes effectively.

```natural-language
> 1. create a new database table for user profiles
```

```natural-language
> 2. create an API endpoint to get and update user profiles
```

```natural-language
> 3. build a webpage that allows users to see and edit their information
```

--------------------------------

### Install Claude Agent SDK (TypeScript/JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Command to install the new Claude Agent SDK package for TypeScript/JavaScript projects using npm.

```bash
npm install @anthropic-ai/claude-agent-sdk
```

--------------------------------

### Markdown Formatting Hook Example Reference

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Provides a reference to an example implementation for a markdown formatting hook, which can be used to automatically detect and add missing language tags to code blocks.

```text
/en/docs/claude-code/hooks-guide#markdown-formatting-hook
```

--------------------------------

### Install Claude Code via Shell Script (Bash)

Source: https://docs.claude.com/en/docs/claude-code/setup

Installs Claude Code using a curl command to download and execute an installation script. Supports installing a specific version number.

```bash
curl -fsSL https://claude.ai/install.sh | bash -s 1.0.58
```

--------------------------------

### Configure Automatic Dependency Installation with SessionStart Hooks

Source: https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web

This JSON configuration sets up a 'SessionStart' hook to automatically run a script for installing project dependencies when a new session begins. It specifies a 'startup' matcher and defines the command to execute, pointing to a shell script for package installation.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/install_pkgs.sh"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Install Claude Code via PowerShell

Source: https://docs.claude.com/en/docs/claude-code/setup

Installs Claude Code on Windows using PowerShell. Supports installing the stable (default), latest, or a specific version number.

```powershell
# Install stable version (default)
irm https://claude.ai/install.ps1 | iex

# Install latest version
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) latest

# Install specific version number
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) 1.0.58
```

--------------------------------

### Re-authenticate Claude Code

Source: https://docs.claude.com/en/docs/claude-code/quickstart

Explicitly triggers the login prompt for Claude Code, allowing users to log in again or switch between accounts. This is useful if credentials change or multiple accounts are used.

```bash
/login
# Follow the prompts to log in with your account
```

--------------------------------

### Install Claude Code via Windows CMD

Source: https://docs.claude.com/en/docs/claude-code/setup

Installs Claude Code on Windows using the Command Prompt (CMD). Downloads the script, executes it, and cleans up the downloaded file. Supports installing the stable, latest, or a specific version number.

```batch
REM Install stable version (default)
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

REM Install latest version
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd latest && del install.cmd

REM Install specific version number
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd 1.0.58 && del install.cmd
```

--------------------------------

### Install and Test Plugin Locally (Bash)

Source: https://docs.claude.com/en/docs/claude-code/plugins

These bash commands demonstrate how to install and test a locally developed plugin in Claude Code. It involves starting Claude Code, adding the local marketplace, installing the plugin, and then invoking a custom command.

```bash
# Start Claude Code from parent directory
cd ..
claude

# Add the test marketplace
/plugin marketplace add ./test-marketplace

# Install your plugin
/plugin install my-first-plugin@test-marketplace

# Try your new command
/hello
```

--------------------------------

### Bash Script for Installing Node.js and Python Packages

Source: https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web

This bash script, designed to be executed by a SessionStart hook, handles the installation of project dependencies. It first runs 'npm install' for Node.js packages and then 'pip install -r requirements.txt' for Python packages, followed by exiting successfully.

```bash
#!/bin/bash
npm install
pip install -r requirements.txt
exit 0
```

--------------------------------

### Install a Plugin from a Local Marketplace (Shell)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command installs a plugin named 'test-plugin' from a specifically added local marketplace named 'my-local-marketplace'. This allows developers to test plugin installation from their local development environment.

```shell
/plugin install test-plugin@my-local-marketplace
```

--------------------------------

### Install a Specific Plugin in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command installs a particular plugin directly from a marketplace. It requires the plugin name and optionally the marketplace it belongs to. This is useful for quick installations when the plugin name is known. The `theme={null}` parameter is a placeholder.

```shell
/plugin install formatter@your-org
```

--------------------------------

### Log Bash Commands with jq Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This hook logs the command and its description to a file before tool calls. It requires `jq` to be installed. The input is the tool's command and description, and the output is an appended line in a log file.

```bash
jq -r '"(.tool_input.command) - (.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

--------------------------------

### Install Claude Code via curl script (macOS, Linux, WSL)

Source: https://docs.claude.com/en/docs/claude-code/setup

Installs Claude Code by downloading and executing an installation script using `curl`. This method is suitable for macOS, Linux, and Windows Subsystem for Linux (WSL) environments.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

```bash
# Install latest version
curl -fsSL https://claude.ai/install.sh | bash -s latest
```

--------------------------------

### Example of Enabled Plugins Configuration in JSON

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON configuration snippet provides an example of enabling plugins for different purposes, such as code formatting and deployment tools. It illustrates the format for specifying plugin names, their associated marketplaces, and their activation status (true/false).

```json
{
  "enabledPlugins": {
    "code-formatter@team-tools": true,
    "deployment-tools@team-tools": true,
    "experimental-features@personal": false
  }
}
```

--------------------------------

### SessionStart Hook Input Example (JSON)

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object represents the input for the 'SessionStart' hook. It contains session identifiers, the transcript path, permission mode, and the source of the session start.

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

--------------------------------

### Start Claude in Plan Mode (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

This command initiates a new Claude session in Plan Mode, which allows for read-only code analysis and planning without making direct changes. It's useful for exploring codebases or planning complex refactors. Dependencies: Claude CLI installed.

```bash
claude --permission-mode plan
```

--------------------------------

### Multi-turn Legal Assistant with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This example demonstrates a multi-turn legal assistant using the Claude CLI with session persistence. It first starts a session to get a `session_id`, then uses this ID to resume the conversation for subsequent legal review steps, including contract review, compliance checks, and risk summarization.

```bash
# Legal document review with session persistence
session_id=$(claude -p "Start legal review session" --output-format json | jq -r '.session_id')

# Review contract in multiple steps
claude -p --resume "$session_id" "Review contract.pdf for liability clauses"
claude -p --resume "$session_id" "Check compliance with GDPR requirements"
claude -p --resume "$session_id" "Generate executive summary of risks"
```

--------------------------------

### Command with All Arguments Placeholder ($ARGUMENTS)

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Shows how to define a command that captures all arguments passed to it using the $ARGUMENTS placeholder. The example includes the command definition and how the arguments are processed during usage.

```bash
# Command definition
echo 'Fix issue #$ARGUMENTS following our coding standards' > .claude/commands/fix-issue.md

# Usage
> /fix-issue 123 high-priority
# $ARGUMENTS becomes: "123 high-priority"
```

--------------------------------

### Install Test Plugin with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command installs a specific test plugin from a marketplace. You need to provide the plugin name and the marketplace name. This is useful for verifying plugin functionality in a controlled environment.

```shell
/plugin install test-plugin@marketplace-name
```

--------------------------------

### Install Plugin from Marketplace

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Installs a specified plugin from any of the configured or known plugin marketplaces. The format 'plugin-name@marketplace-name' allows targeting specific plugins from specific sources.

```shell
/plugin install plugin-name@marketplace-name
```

--------------------------------

### Fix WSL npm and Node.js Path Issues

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Commands to resolve OS/platform detection and Node.js not found errors in WSL. This involves setting npm config for OS and forcing installation without OS checks. It also guides on fixing Node.js path issues by ensuring Linux installations are prioritized over Windows ones.

```bash
npm config set os linux
npm install -g @anthropic-ai/claude-code --force --no-os-check
```

```bash
# Load nvm if it exists
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

```

```bash
source ~/.nvm/nvm.sh
```

```bash
export PATH="$HOME/.nvm/versions/node/$(node -v)/bin:$PATH"
```

--------------------------------

### Example Script for Dynamic OpenTelemetry Headers

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

An example bash script that generates dynamic OpenTelemetry headers in JSON format. This script demonstrates fetching a token and an API key to construct the header object.

```bash
#!/bin/bash
# Example: Multiple headers
echo "{\"Authorization\": \"Bearer $(get-token.sh)\", \"X-API-Key\": \"$(get-api-key.sh)\"}"
```

--------------------------------

### Enterprise MCP Server Configuration (JSON Example)

Source: https://docs.claude.com/en/docs/claude-code/mcp

An example JSON configuration file (`managed-mcp.json`) for enterprise-level management of MCP servers. This file defines which MCP servers are available, their types (http or stdio), and connection details like URLs, commands, arguments, and environment variables.

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp"
    },
    "company-internal": {
      "type": "stdio",
      "command": "/usr/local/bin/company-mcp-server",
      "args": ["--config", "/etc/company/mcp-config.json"],
      "env": {
        "COMPANY_API_URL": "https://internal.company.com"
      }
    }
  }
}
```

--------------------------------

### Browse Available Plugins in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command opens the plugin management interface or lists available plugins, allowing users to discover and select plugins to install. It's the recommended method for finding new plugins. The `theme={null}` parameter is a placeholder. The output is interactive or a list of plugins.

```shell
/plugin
```

--------------------------------

### SlashCommand permission rule examples

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Provides examples of permission rule formats supported by the SlashCommand tool, including exact match and prefix match. These rules define which commands and arguments Claude is allowed to execute.

```text
Exact match: `SlashCommand:/commit` (allows only `/commit` with no arguments)
Prefix match: `SlashCommand:/review-pr:*` (allows `/review-pr` with any arguments)
```

--------------------------------

### GitHub Actions Workflow File Example

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This example demonstrates a basic GitHub Actions workflow file for using Claude Code. It specifies the action to use, its version, and common inputs for configuring Claude's behavior. Ensure you have set up the necessary secrets like ANTHROPIC_API_KEY in your repository.

```yaml
name: Claude Code Action Example

on:
  push:
    branches: [ main ]
  pull_request:
    types: [ opened, synchronize, reopened ]

jobs:
  claude-code-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run Claude Code Action
        uses: anthropics/claude-code-action@v1
        with:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          # Example prompt: 'Refactor this code to be more efficient.'
          prompt: "Refactor this code to be more efficient."
          # Example: Specify Claude model and other arguments
          claude_args: >-
            --model claude-3-opus-20240229
            --max-turns 5
            --system-prompt "You are a helpful AI assistant that refactors code."
```

--------------------------------

### Text Output Example with Bash

Source: https://docs.claude.com/en/docs/claude-code/headless

Illustrates the default text output format when running Claude Code in headless mode. This example queries for an explanation of a specific file.

```bash
claude -p "Explain file src/components/Header.tsx"
# Output: This is a React component showing...
```

--------------------------------

### Install Claude Code Natively on macOS, Linux, and WSL

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Commands to install Claude Code using a native installer script. This method avoids npm and Node.js dependencies and works across macOS, Linux, and WSL environments. It supports installing the stable, latest, or a specific version of Claude Code.

```bash
# Install stable version (default)
curl -fsSL https://claude.ai/install.sh | bash

# Install latest version
curl -fsSL https://claude.ai/install.sh | bash -s latest

# Install specific version number
curl -fsSL https://claude.ai/install.sh | bash -s 1.0.58
```

--------------------------------

### Install Claude Code via NPM

Source: https://docs.claude.com/en/docs/claude-code/overview

Installs Claude Code as a global Node.js package using npm. This method requires Node.js version 18 or later to be installed on your system. It makes the `claude` command available in your terminal.

```bash
npm install -g @anthropic-ai/claude-code
```

--------------------------------

### Migrate Claude Code to Local Installation

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Command to migrate an existing Claude Code installation to a local directory. This process moves the installation to `~/.claude/local/` and sets up a shell alias, eliminating the need for sudo for future updates. It also includes verification steps for different operating systems.

```bash
claude migrate-installer
```

```bash
# On macOS/Linux/WSL:
which claude  # Should show an alias to ~/.claude/local/claude

# On Windows:
where claude  # Should show path to claude executable
```

```bash
claude doctor # Check installation health
```

--------------------------------

### Install Claude Code via PowerShell (Windows)

Source: https://docs.claude.com/en/docs/claude-code/overview

Installs Claude Code on Windows using PowerShell. This command downloads and executes an installation script. Requires PowerShell to be available and execution policies to allow script execution.

```powershell
irm https://claude.ai/install.ps1 | iex
```

--------------------------------

### Example Agent Skill Structure for Code Review

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Illustrates the directory structure for an Agent Skill designed for code review. This structure includes a main SKILL.md file, specific checklist files (SECURITY.md, PERFORMANCE.md, STYLE.md), and a directory for scripts like linters.

```shell
.claude/skills/code-review/
├── SKILL.md (overview and workflows)
├── SECURITY.md (security checklist)
├── PERFORMANCE.md (performance patterns)
├── STYLE.md (style guide reference)
└── scripts/
    └── run-linters.sh
```

--------------------------------

### Project Memory File Reference

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

References the use of project memory files, specifically 'CLAUDE.md', for documenting preferred markdown styling and other project conventions to ensure consistency.

```text
/en/docs/claude-code/memory
```

```markdown
CLAUDE.md
```

--------------------------------

### Persist All Environment Changes with Bash in SessionStart Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks

This bash script example shows how to capture and persist all environment modifications made by setup commands (like 'nvm use') within a SessionStart hook. It achieves this by diffing the environment before and after the commands are run and appending the differences to the CLAUDE_ENV_FILE.

```bash
#!/bin/bash

ENV_BEFORE=$(export -p | sort)

# Run your setup commands that modify the environment
source ~/.nvm/nvm.sh
nvm use 20

if [ -n "$CLAUDE_ENV_FILE" ]; then
  ENV_AFTER=$(export -p | sort)
  comm -13 <(echo "$ENV_BEFORE") <(echo "$ENV_AFTER") >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

--------------------------------

### Execute Local Stdio MCP Server on Windows

Source: https://docs.claude.com/en/docs/claude-code/mcp

Example demonstrating how to correctly execute local MCP servers using `npx` on native Windows environments. The `cmd /c` wrapper is necessary to ensure proper command execution and avoid 'Connection closed' errors.

```bash
# This creates command="cmd" which Windows can execute
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

--------------------------------

### Install Claude Code via Homebrew

Source: https://docs.claude.com/en/docs/claude-code/overview

Installs Claude Code using the Homebrew package manager. This is a convenient method for macOS users who have Homebrew installed. It simplifies the installation and management of the tool.

```bash
brew install --cask claude-code
```

--------------------------------

### Reference MCP Resources in Prompts (Example)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Demonstrates how to use the '@' mention syntax to reference specific resources hosted on connected MCP servers. These resources can be files, schemas, or other data accessible via a server. The format is `@server:protocol://resource/path`.

```text
> Can you analyze @github:issue://123 and suggest a fix?

> Please review the API documentation at @docs:file://api/authentication

> Compare @postgres:schema://users with @docs:file://database/user-model
```

--------------------------------

### Install Claude Code via Curl (macOS/Linux)

Source: https://docs.claude.com/en/docs/claude-code/overview

Installs Claude Code using a curl command to download and execute an installation script. This method is suitable for macOS and Linux systems. Ensure you have internet connectivity and appropriate permissions to execute scripts.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

--------------------------------

### Claude Code Debug Output Example

Source: https://docs.claude.com/en/docs/claude-code/hooks

This example demonstrates the detailed output generated when using the `claude --debug` command to inspect hook execution. It shows the process from finding matching hooks to executing a command and its completion status.

```shell
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <Your command> with timeout 60000ms
[DEBUG] Hook command completed with status 0: <Your stdout>
```

--------------------------------

### SKILL.md Structure Example (YAML/Markdown)

Source: https://docs.claude.com/en/docs/claude-code/skills

Defines the basic structure of a SKILL.md file, including YAML frontmatter for metadata like 'name' and 'description', followed by Markdown content for instructions and examples.

```yaml
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
Provide clear, step-by-step guidance for Claude.

## Examples
Show concrete examples of using this Skill.

```

--------------------------------

### Execute MCP Prompts as Slash Commands (Examples)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Shows how to invoke MCP server prompts using slash commands within Claude Code. Prompts are formatted as `/mcp__servername__promptname`. Arguments can be passed space-separated after the command. Examples include listing pull requests and creating Jira issues.

```text
> /mcp__github__list_prs

> /mcp__github__pr_review 456

> /mcp__jira__create_issue "Bug in login flow" high
```

--------------------------------

### Bash Command Execution with Allowed Tools

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Provides an example of executing bash commands before a slash command runs using the '!' prefix. It highlights the necessity of including `allowed-tools` with the `Bash` tool and demonstrates how to capture command output like git status and diff.

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.
```

--------------------------------

### Claude Code Hooks Configuration (JSON)

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This JSON configuration shows how a 'PreToolUse' hook is registered for 'Bash' commands. It specifies a command to log the tool's input, including its command and description.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '"\(.tool_input.command) - \(.tool_input.description // \"No description\")"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Check Claude Code Version and Installation Details

Source: https://docs.claude.com/en/docs/claude-code/costs

This command allows you to retrieve information about your current Claude Code installation, including the version number, installation type, and relevant system details. It is useful for troubleshooting and understanding behavior changes between updates.

```bash
claude doctor
```

--------------------------------

### Multi-turn Legal Document Review with Session Persistence (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

This example demonstrates how to conduct a multi-turn legal document review using the Claude CLI with session persistence. It first starts a new session, retrieves the session ID, and then uses the session ID to maintain context across multiple review steps.

```bash
# Legal document review with session persistence
session_id=$(claude -p "Start legal review session" --output-format json | jq -r '.session_id')

# Review contract in multiple steps
claude -p --resume "$session_id" "Review contract.pdf for liability clauses"
claude -p --resume "$session_id" "Check compliance with GDPR requirements"
claude -p --resume "$session_id" "Generate executive summary of risks"

```

--------------------------------

### Example Sandbox Configuration in JSON

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON object demonstrates a typical configuration for Claude Code's sandbox settings. It includes enabling the sandbox, auto-approving bash commands, excluding specific commands like 'docker', and configuring network access for Unix sockets and local binding.

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker"],
    "network": {
      "allowUnixSockets": [
        "/var/run/docker.sock"
      ],
      "allowLocalBinding": true
    }
  },
  "permissions": {
    "deny": [
      "Read(.envrc)",
      "Read(~/.aws/**)"
    ]
  }
}
```

--------------------------------

### Google Vertex AI Job Example with Workload Identity Federation

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This GitLab CI/CD configuration connects to Google Vertex AI using Workload Identity Federation, eliminating the need for service account key files. It uses the Google Cloud CLI image, installs the Claude Code package, and authenticates to GCP. The job then executes the 'claude' command, allowing for AI-driven code reviews and modifications within the Vertex AI environment.

```yaml
claude-vertex:
  stage: ai
  image: gcr.io/google.com/cloudsdktool/google-cloud-cli:slim
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
  before_script:
    - apt-get update && apt-get install -y git nodejs npm && apt-get clean
    - npm install -g @anthropic-ai/claude-code
    # Authenticate to Google Cloud via WIF (no downloaded keys)
    - >
      gcloud auth login --cred-file=<(cat <<EOF
      {
        "type": "external_account",
        "audience": "${GCP_WORKLOAD_IDENTITY_PROVIDER}",
        "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
        "service_account_impersonation_url": "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT}:generateAccessToken",
        "token_url": "https://sts.googleapis.com/v1/token"
      }
      EOF
      )
    - gcloud config set project "$(gcloud projects list --format='value(projectId)' --filter="name:${CI_PROJECT_NAMESPACE}" | head -n1)" || true
  script:
    - /bin/gitlab-mcp-server || true
    - >
      CLOUD_ML_REGION="${CLOUD_ML_REGION:-us-east5}"
      claude
      -p "${AI_FLOW_INPUT:-'Review and update code as requested'}"
      --permission-mode acceptEdits
      --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
      --debug
  variables:
    CLOUD_ML_REGION: "us-east5"

```

--------------------------------

### Update Settings Loading in TypeScript

Source: https://docs.claude.com/en/docs/claude-code/sdk

Demonstrates how to explicitly load settings sources in the Claude Code SDK (v0.1.0 and later) compared to previous versions (v0.0.x) which loaded them automatically. It shows how to load all default sources or specific ones.

```typescript
// BEFORE (v0.0.x) - Loaded all settings automatically
const result = query({ prompt: "Hello" });
// Would read from:
// - ~/.claude/settings.json (user)
// - .claude/settings.json (project)
// - .claude/settings.local.json (local)
// - CLAUDE.md files
// - Custom slash commands

// AFTER (v0.1.0) - No settings loaded by default
// To get the old behavior:
const result = query({
  prompt: "Hello",
  options: {
    settingSources: ["user", "project", "local"]
  }
});

// Or load only specific sources:
const result = query({
  prompt: "Hello",
  options: {
    settingSources: ["project"]  // Only project settings
  }
});

```

--------------------------------

### Centralized OpenTelemetry Configuration via Managed Settings (JSON)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This JSON configuration file allows administrators to centrally manage OpenTelemetry settings for Claude Code across an organization. It defines environment variables that override user configurations, ensuring consistent telemetry setup. The example shows how to enable telemetry, specify OTLP exporters, set the endpoint, and configure authentication headers.

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.company.com:4317",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer company-token"
  }
}
```

--------------------------------

### Desktop Notifications for Input Awaiting

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This hook provides desktop notifications when Claude requires user input. It triggers a command to display a notification, informing the user that their input is needed. This is useful for interactive sessions where timely responses are crucial.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Awaiting your input'"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Install and Test Local Plugin in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

These bash commands are used within the Claude Code environment to add a local development marketplace and install a plugin from it. This allows for iterative testing of plugins during development.

```bash
cd ..
claude
```

```bash
/plugin marketplace add ./dev-marketplace
```

```bash
/plugin install my-plugin@dev-marketplace
```

--------------------------------

### Plan Subagent Example Scenario

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

Illustrates how the Plan subagent is automatically invoked in plan mode to research the codebase before Claude presents a plan. It shows a user request for refactoring and Claude's internal delegation to the Plan subagent for gathering information.

```text
User: [In plan mode] Help me refactor the authentication module

Claude: Let me research your authentication implementation first...
[Internally invokes Plan subagent to explore auth-related files]
[Plan subagent searches codebase and returns findings]
Claude: Based on my research, here's my proposed plan...
```

--------------------------------

### Explicit System Prompt Configuration (TypeScript)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Shows how to explicitly set the system prompt in TypeScript when migrating to Claude Agent SDK v0.1.0, including using presets or custom prompts.

```typescript
// BEFORE (v0.0.x) - Used Claude Code's system prompt by default
const result = query({ prompt: "Hello" });

// AFTER (v0.1.0) - Uses empty system prompt by default
// To get the old behavior, explicitly request Claude Code's preset:
const result = query({
  prompt: "Hello",
  options: {
    systemPrompt: { type: "preset", preset: "claude_code" }
  }
});

// Or use a custom system prompt:
const result = query({
  prompt: "Hello",
  options: {
    systemPrompt: "You are a helpful coding assistant"
  }
});
```

--------------------------------

### Verify Bash Command Log with cat

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This command displays the contents of the bash command log file created by the hook. It's used to verify that the hook is correctly logging executed commands.

```bash
cat ~/.claude/bash-command-log.txt
```

--------------------------------

### Add and Use GitHub MCP Server

Source: https://docs.claude.com/en/docs/claude-code/mcp

Guides on adding an HTTP GitHub MCP server and authenticating within Claude Code to manage pull requests, issues, and code reviews using natural language commands.

```bash
# 1. Add the GitHub MCP server
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 2. In Claude Code, authenticate if needed
> /mcp
# Select "Authenticate" for GitHub

# 3. Now you can ask Claude to work with GitHub
> "Review PR #456 and suggest improvements"
> "Create a new issue for the bug we just found"
> "Show me all open PRs assigned to me"
```

--------------------------------

### Install Python Packages for Claude

Source: https://docs.claude.com/en/docs/claude-code/skills

This bash command installs the necessary Python packages, 'pypdf' and 'pdfplumber', required for Claude to process PDF documents and extract text. Ensure these packages are installed in your environment before running Claude.

```bash
pip install pypdf pdfplumber
```

--------------------------------

### Claude Code Action CLI Arguments

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This example demonstrates how to configure advanced arguments for the Claude Code Action using the `claude_args` parameter. It shows common arguments such as specifying the model, setting maximum conversation turns, and providing a path to a configuration file.

```yaml
claude_args: "--max-turns 5 --model claude-sonnet-4-5-20250929 --mcp-config /path/to/config.json"

```

--------------------------------

### Basic Claude Code Action v1 Configuration (YAML)

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This YAML configuration demonstrates the basic setup for the Claude Code Action v1. It specifies the action to use and provides essential parameters like the Anthropic API key and an optional prompt. The `claude_args` parameter allows for passing CLI arguments.

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Your instructions here" # Optional
    claude_args: "--max-turns 5" # Optional CLI arguments
```

--------------------------------

### Example settings.json for Claude Code Configuration

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON configuration file demonstrates how to set permissions for running bash commands and reading files, define environment variables for telemetry and metrics export, and manage company announcements within Claude Code. It is typically located at user or project level.

```JSON
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  },
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.acme.com",
    "Reminder: Code reviews required for all PRs",
    "New security policy in effect"
  ]
}
```

--------------------------------

### Install ripgrep for Search and Discovery on Multiple Operating Systems

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Installs the ripgrep tool, a fast grep alternative, required for Claude Code's search and discovery features. It provides package manager commands for macOS, Windows, Ubuntu/Debian, Alpine Linux, and Arch Linux.

```bash
# macOS (Homebrew)  
brew install ripgrep

# Windows (winget)
winget install BurntSushi.ripgrep.MSVC

# Ubuntu/Debian
sudo apt install ripgrep

# Alpine Linux
apk add ripgrep

# Arch Linux
pacman -S ripgrep
```

--------------------------------

### Format TypeScript Files Automatically

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This hook automatically formats TypeScript files after they are edited or written. It uses `jq` to extract the file path and then `prettier` to format the file if it has a `.ts` extension. This ensures consistent code style across the project.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | { read file_path; if echo \"$file_path\" | grep -q '\\.ts$'; then npx prettier --write \"$file_path\"; fi; }"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Reporting Bugs with /bug Command

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Documents the use of the '/bug' command within Claude Code for directly reporting problems to Anthropic developers, aiding in faster issue resolution.

```text
/bug
```

--------------------------------

### AWS Bedrock Job Example with GitLab OIDC

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This GitLab CI/CD job integrates with AWS Bedrock using OpenID Connect (OIDC) for authentication, avoiding the need for static AWS credentials. It requires specific CI/CD variables for role assumption and region. The job installs AWS CLI and the Claude Code package, then exchanges the GitLab OIDC token for temporary AWS credentials before running the 'claude' command.

```yaml
claude-bedrock:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
  before_script:
    - apk add --no-cache bash curl jq git python3 py3-pip
    - pip install --no-cache-dir awscli
    - npm install -g @anthropic-ai/claude-code
    # Exchange GitLab OIDC token for AWS credentials
    - export AWS_WEB_IDENTITY_TOKEN_FILE="${CI_JOB_JWT_FILE:-/tmp/oidc_token}"
    - if [ -n "${CI_JOB_JWT_V2}" ]; then printf "%s" "$CI_JOB_JWT_V2" > "$AWS_WEB_IDENTITY_TOKEN_FILE"; fi
    - >
      aws sts assume-role-with-web-identity
      --role-arn "$AWS_ROLE_TO_ASSUME"
      --role-session-name "gitlab-claude-$(date +%s)"
      --web-identity-token "file://$AWS_WEB_IDENTITY_TOKEN_FILE"
      --duration-seconds 3600 > /tmp/aws_creds.json
    - export AWS_ACCESS_KEY_ID="$(jq -r .Credentials.AccessKeyId /tmp/aws_creds.json)"
    - export AWS_SECRET_ACCESS_KEY="$(jq -r .Credentials.SecretAccessKey /tmp/aws_creds.json)"
    - export AWS_SESSION_TOKEN="$(jq -r .Credentials.SessionToken /tmp/aws_creds.json)"
  script:
    - /bin/gitlab-mcp-server || true
    - >
      claude
      -p "${AI_FLOW_INPUT:-'Implement the requested changes and open an MR'}"
      --permission-mode acceptEdits
      --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
      --debug
  variables:
    AWS_REGION: "us-west-2"

```

--------------------------------

### Example Slash Command for Code Review

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Demonstrates a basic slash command written in Markdown for reviewing code. This command is designed for manual invocation and focuses on specific review criteria like security, performance, and style.

```markdown
# .claude/commands/review.md
Review this code for:
- Security vulnerabilities
- Performance issues
- Code style violations
```

--------------------------------

### Read & Edit File Permissions in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/iam

Explains the Read and Edit permission rules for file operations in Claude Code, which follow gitignore specifications. It details four pattern types: absolute paths, home directory paths, settings file relative paths, and current directory relative paths, providing examples for each. It also clarifies that patterns starting with '/' are relative to the settings file, not the filesystem root, unless double slashes '//' are used for absolute paths.

```text
//path
~/path
/path
path or ./path
```

```text
Read(//Users/alice/secrets/**)
Read(~/Documents/*.pdf)
Edit(/src/**/*.ts)
Read(*.env)
```

```text
Edit(/docs/**)
Read(~/.zshrc)
Edit(//tmp/scratch.txt)
Read(src/**)
```

--------------------------------

### YAML Skill Description Example

Source: https://docs.claude.com/en/docs/claude-code/skills

This YAML snippet demonstrates how to define a Skill's description. A good description is specific, outlining what the Skill does and when it should be used, improving Claude's ability to autonomously activate the Skill.

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

--------------------------------

### Marketplace JSON File Structure

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

An example of a `.claude-plugin/marketplace.json` file used to define a plugin marketplace. It includes essential information like the marketplace name, owner details, and a list of plugins with their sources and versions.

```json
{
  "name": "company-tools",
  "owner": {
    "name": "DevTools Team",
    "email": "devtools@company.com"
  },
  "plugins": [
    {
      "name": "code-formatter',
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": {
        "name": "DevTools Team"
      }
    },
    {
      "name": "deployment-tools",
      "source": {
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    }
  ]
}
```

--------------------------------

### Valid OTEL_RESOURCE_ATTRIBUTES Examples (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

These examples demonstrate valid formats for the OTEL_RESOURCE_ATTRIBUTES environment variable. They show how to replace spaces with underscores or use camelCase, and how to percent-encode special characters like apostrophes and spaces if necessary, adhering to the W3C Baggage specification.

```bash
# ✅ Valid - use underscores or camelCase instead
export OTEL_RESOURCE_ATTRIBUTES="org.name=Johns_Organization"
export OTEL_RESOURCE_ATTRIBUTES="org.name=JohnsOrganization"

# ✅ Valid - percent-encode special characters if needed
export OTEL_RESOURCE_ATTRIBUTES="org.name=John%27s%20Organization"
```

--------------------------------

### Example Project-Scoped MCP Server Configuration

Source: https://docs.claude.com/en/docs/claude-code/mcp

Illustrates the JSON structure for defining MCP servers within a project's .mcp.json file. This format is used for project-scoped servers shared among team members and checked into version control.

```json
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

--------------------------------

### Example of triggering SlashCommand tool

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Demonstrates how to prompt Claude to trigger the SlashCommand tool by referencing a command with its slash. This encourages Claude to invoke custom commands programmatically when appropriate during a conversation.

```markdown
> Run /write-unit-test when you are about to start writing tests.
```

--------------------------------

### SessionStart Hook for Initial Context

Source: https://docs.claude.com/en/docs/claude-code/hooks

Allows loading context at the start of a session. The 'additionalContext' from multiple 'SessionStart' hooks are concatenated and added to the session's context.

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

--------------------------------

### Create Plugin Directory Structure (Bash)

Source: https://docs.claude.com/en/docs/claude-code/plugins

This snippet shows the bash commands to create the necessary directory structure for a new Claude Code plugin, starting with a marketplace and then the plugin itself.

```bash
mkdir test-marketplace
cd test-marketplace
mkdir my-first-plugin
cd my-first-plugin
```

--------------------------------

### Example Claude Code Prompt in Issue Comment

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

An example of how to use Claude Code within an issue comment to automate feature implementation. By mentioning '@claude' and providing a clear instruction, Claude can analyze the issue description and codebase, create a new branch with the changes, and open a merge request for review.

```text
@claude implement this feature based on the issue description
```

--------------------------------

### Intelligent Stop Hook Example

Source: https://docs.claude.com/en/docs/claude-code/hooks

An example configuration for an 'Stop' hook that uses a detailed prompt to instruct the LLM on how to evaluate whether Claude should stop. It includes specific criteria for the LLM to consider and specifies a timeout.

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "You are evaluating whether Claude should stop working. Context: $ARGUMENTS\n\nAnalyze the conversation and determine if:\n1. All user-requested tasks are complete\n2. Any errors need to be addressed\n3. Follow-up work is needed\n\nRespond with JSON: {\"decision\": \"approve\" or \"block\", \"reason\": \"your explanation\"}",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Protect Sensitive Files from Edits

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This hook prevents accidental edits to sensitive files by blocking `Edit` and `Write` operations on them. It uses a Python command to check if the file path contains any of the protected patterns (e.g., `.env`, `package-lock.json`, `.git/`). If a match is found, it exits with a status code of 2, indicating a block.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 -c \"import json, sys; data=json.load(sys.stdin); path=data.get('tool_input',{}).get('file_path',''); sys.exit(2 if any(p in path for p in ['.env', 'package-lock.json', '.git/']) else 0)\""
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### SubagentStop Hook with Custom Logic Example

Source: https://docs.claude.com/en/docs/claude-code/hooks

This example demonstrates configuring a 'SubagentStop' hook. It provides a prompt for the LLM to evaluate if a subagent has completed its task, if errors need fixing, or if more context is required, returning a decision and reason.

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if this subagent should stop. Input: $ARGUMENTS\n\nCheck if:\n- The subagent completed its assigned task\n- Any errors occurred that need fixing\n- Additional context gathering is needed\n\nReturn: {\"decision\": \"approve\" or \"block\", \"reason\": \"explanation\"}"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Update Python Imports for Claude Agent SDK

Source: https://docs.claude.com/en/docs/claude-code/sdk

Demonstrates updating import statements from 'claude_code_sdk' to 'claude_agent_sdk' in Python.

```python
# Before
from claude_code_sdk import query, ClaudeCodeOptions

# After
from claude_agent_sdk import query, ClaudeAgentOptions
```

--------------------------------

### Update package.json Dependencies (TypeScript/JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Shows how to update the dependencies section in package.json when migrating from Claude Code SDK to Claude Agent SDK.

```json
// Before
{
  "dependencies": {
    "@anthropic-ai/claude-code": "^1.0.0"
  }
}

// After
{
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "^0.1.0"
  }
}
```

--------------------------------

### Checking Claude Code Health with /doctor

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Explains the utility of the '/doctor' command for checking the health and status of a Claude Code installation, helping to identify local configuration or operational problems.

```text
/doctor
```

--------------------------------

### Reference File Content in Commands

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Illustrates how to include the content of files directly within commands using the '@' prefix. Examples show referencing a single file and comparing multiple files.

```markdown
# Reference a specific file

Review the implementation in @src/utils/helpers.js

# Reference multiple files

Compare @src/old-version.js with @src/new-version.js
```

--------------------------------

### Example Plugin Hook Configuration

Source: https://docs.claude.com/en/docs/claude-code/hooks

Illustrates how a plugin can define its own hooks. It uses the ${CLAUDE_PLUGIN_ROOT} environment variable to reference plugin-specific files and includes an optional timeout for the command.

```json
{
  "description": "Automatic code formatting",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Command with Individual Arguments ($1, $2, $3)

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Demonstrates using positional parameters like $1, $2, and $3 to access individual arguments passed to a command. This allows for structured argument handling and provides examples of both the command definition and its usage.

```bash
# Command definition  
echo 'Review PR #$1 with priority $2 and assign to $3' > .claude/commands/review-pr.md

# Usage
> /review-pr 456 high alice
# $1 becomes "456", $2 becomes "high", $3 becomes "alice"
```

--------------------------------

### Fix Markdown Formatting and Language Tags

Source: https://docs.claude.com/en/docs/claude-code/hooks-guide

This hook automatically fixes formatting issues in markdown files, such as missing language tags in code blocks and excessive blank lines. It utilizes a Python script to perform these corrections, ensuring that markdown content is well-formatted and code blocks are properly identified for syntax highlighting. The script processes `.md` and `.mdx` files.

```python
#!/usr/bin/env python3
"""
Markdown formatter for Claude Code output.
Fixes missing language tags and spacing issues while preserving code content.
"""
import json
import sys
import re
import os

def detect_language(code):
    """Best-effort language detection from code content."""
    s = code.strip()
    
    # JSON detection
    if re.search(r'^\s*[{\[]', s):
        try:
            json.loads(s)
            return 'json'
        except:
            pass
    
    # Python detection
    if re.search(r'^\s*def\s+\w+\s*\(', s, re.M) or \
       re.search(r'^\s*(import|from)\s+\w+', s, re.M):
        return 'python'
    
    # JavaScript detection  
    if re.search(r'\b(function\s+\w+\s*\(|const\s+\w+\s*=)', s) or \
       re.search(r'=>|console\.(log|error)', s):
        return 'javascript'
    
    # Bash detection
    if re.search(r'^#!.*\b(bash|sh)\b', s, re.M) or \
       re.search(r'\b(if|then|fi|for|in|do|done)\b', s):
        return 'bash'
    
    # SQL detection
    if re.search(r'\b(SELECT|INSERT|UPDATE|DELETE|CREATE)\s+', s, re.I):
        return 'sql'
        
    return 'text'

def format_markdown(content):
    """Format markdown content with language detection."""
    # Fix unlabeled code fences
    def add_lang_to_fence(match):
        indent, info, body, closing = match.groups()
        if not info.strip():
            lang = detect_language(body)
            return f"{indent}```{lang}\n{body}{closing}\n"
        return match.group(0)
    
    fence_pattern = r'(?ms)^([ \t]{0,3})```([^\n]*)\n(.*?)(\n\1```)\s*$'
    content = re.sub(fence_pattern, add_lang_to_fence, content)
    
    # Fix excessive blank lines (only outside code fences)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content.rstrip() + '\n'

# Main execution
try:
    input_data = json.load(sys.stdin)
    file_path = input_data.get('tool_input', {}).get('file_path', '')
    
    if not file_path.endswith(('.md', '.mdx')):
        sys.exit(0)  # Not a markdown file
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        formatted = format_markdown(content)
        
        if formatted != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(formatted)
            print(f"✓ Fixed markdown formatting in {file_path}")
    
except Exception as e:
    print(f"Error formatting markdown: {e}", file=sys.stderr)
    sys.exit(1)

```

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/markdown_formatter.py"
          }
        ]
      }
    ]
  }
}
```

```bash
chmod +x .claude/hooks/markdown_formatter.py
```

--------------------------------

### YAML: Skill with Tool Permissions

Source: https://docs.claude.com/en/docs/claude-code/skills

Configuration for a Claude Skill that requires specific tool permissions (Read, Grep, Glob). This example defines a 'code-reviewer' Skill with a review checklist and instructions.

```yaml
---
name: code-reviewer
description: Review code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
allowed-tools: Read, Grep, Glob
---

# Code Reviewer

## Review checklist

1. Code organization and structure
2. Error handling
3. Performance considerations
4. Security concerns
5. Test coverage

## Instructions

1. Read the target files using Read tool
2. Search for patterns using Grep
3. Find related files using Glob
4. Provide detailed feedback on code quality
```

--------------------------------

### Invalid OTEL_RESOURCE_ATTRIBUTES Example (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This example shows an invalid format for the OTEL_RESOURCE_ATTRIBUTES environment variable because the value contains a space. The W3C Baggage specification prohibits spaces in attribute values.

```bash
# ❌ Invalid - contains spaces
export OTEL_RESOURCE_ATTRIBUTES="org.name=John's Organization"
```

--------------------------------

### Example Claude Code Prompt in MR Discussion

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This example demonstrates using Claude Code in a merge request discussion to request suggestions for code improvements. By asking for specific solutions, such as caching API call results, Claude can propose code modifications and update the merge request accordingly.

```text
@claude suggest a concrete approach to cache the results of this API call
```

--------------------------------

### Uninstall Claude Code SDK (Python)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Command to uninstall the old claude-code-sdk package from a Python project using pip.

```bash
pip uninstall claude-code-sdk
```

--------------------------------

### Basic Claude API Integration with GitLab CI/CD

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This configuration sets up a GitLab CI/CD job to run the Claude Code tool. It installs the necessary package, configures rules for when the job should run, and executes the 'claude' command with specified prompts and permissions. It relies on the ANTHROPIC_API_KEY being set as a CI/CD variable.

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  variables:
    GIT_STRATEGY: fetch
  before_script:
    - apk update
    - apk add --no-cache git curl bash
    - npm install -g @anthropic-ai/claude-code
  script:
    - /bin/gitlab-mcp-server || true
    - >
      claude
      -p "${AI_FLOW_INPUT:-'Summarize recent changes and suggest improvements'}"
      --permission-mode acceptEdits
      --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
      --debug
  # Claude Code will use ANTHROPIC_API_KEY from CI/CD variables

```

--------------------------------

### YAML: Simple Skill Configuration

Source: https://docs.claude.com/en/docs/claude-code/skills

Configuration for a simple Claude Skill with a name, description, and instructions. This example defines a Skill for generating commit messages from git diffs.

```yaml
---
name: generating-commit-messages
description: Generates clear commit messages from git diffs. Use when writing commit messages or reviewing staged changes.
---

# Generating Commit Messages

## Instructions

1. Run `git diff --staged` to see changes
2. I'll suggest a commit message with:
   - Summary under 50 characters
   - Detailed description
   - Affected components

## Best practices

- Use present tense
- Explain what and why, not how
```

--------------------------------

### YAML: Skill Description Examples

Source: https://docs.claude.com/en/docs/claude-code/skills

Demonstrates clear and vague descriptions for Claude Skills. Clear descriptions specify the Skill's function and when to use it, aiding discoverability. Vague descriptions are too generic.

```yaml
description: Analyze Excel spreadsheets, create pivot tables, and generate charts. Use when working with Excel files, spreadsheets, or analyzing tabular data in .xlsx format.
```

```yaml
description: For files
```

```yaml
description: Helps with data
```

```yaml
description: Analyze Excel spreadsheets, generate pivot tables, create charts. Use when working with Excel files, spreadsheets, or .xlsx files.
```

```yaml
# Skill 1
description: For data analysis
```

```yaml
# Skill 2
description: For analyzing data
```

```yaml
# Skill 1
description: Analyze sales data in Excel files and CRM exports. Use for sales reports, pipeline analysis, and revenue tracking.
```

```yaml
# Skill 2
description: Analyze log files and system metrics data. Use for performance monitoring, debugging, and system diagnostics.
```

--------------------------------

### Using Prettier for Markdown Formatting

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Suggests utilizing markdown formatters like 'prettier' as part of post-processing hooks to automatically correct inconsistent spacing and formatting in generated markdown files.

```text
prettier
```

--------------------------------

### Configure Git Bash path for Claude Code on Windows

Source: https://docs.claude.com/en/docs/claude-code/setup

Sets an environment variable `CLAUDE_CODE_GIT_BASH_PATH` to specify the location of `bash.exe` when using a portable Git installation on Windows with Claude Code.

```powershell
$env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
```

--------------------------------

### Specify Multiple Command and Agent Paths in plugin.json

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Demonstrates how to define multiple paths for commands and agents within the plugin.json manifest. Paths must be relative to the plugin root and start with './'. This allows for flexible organization of plugin components.

```json
{
  "commands": [
    "./specialized/deploy.md",
    "./utilities/batch-process.md"
  ],
  "agents": [
    "./custom-agents/reviewer.md",
    "./custom-agents/tester.md"
  ]
}
```

--------------------------------

### Example Claude Code Prompt for Bug Fixing

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

An example of leveraging Claude Code to automatically fix bugs. When a specific error, like a `TypeError` in a component, is described in an issue or MR comment, Claude can identify the bug, implement a fix, and update the relevant branch or create a new MR.

```text
@claude fix the TypeError in the user dashboard component
```

--------------------------------

### Configuring MCP permissions

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Illustrates correct and incorrect ways to configure permissions for MCP tools. It highlights that wildcards are not supported and shows the proper syntax for approving all tools from a server or specific tools.

```text
✅ **Correct**: `mcp__github` (approves ALL tools from the github server)
✅ **Correct**: `mcp__github__get_issue` (approves specific tool)
❌ **Incorrect**: `mcp__github__*` (wildcards not supported)
To approve all tools from an MCP server, use just the server name: `mcp__servername`. To approve specific tools only, list each tool individually.
```

--------------------------------

### Update TypeScript/JavaScript Imports for Claude Agent SDK

Source: https://docs.claude.com/en/docs/claude-code/sdk

Demonstrates how to update import statements after migrating from the Claude Code SDK to the Claude Agent SDK in TypeScript/JavaScript.

```typescript
// Before
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-code";

// After
import {
  query,
  tool,
  createSdkMcpServer,
} from "@anthropic-ai/claude-agent-sdk";
```

--------------------------------

### Uninstall Claude Code SDK (TypeScript/JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Command to uninstall the old Claude Code SDK package from a TypeScript/JavaScript project using npm.

```bash
npm uninstall @anthropic-ai/claude-code
```

--------------------------------

### PreCompact Hook Input Example (JSON)

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object is the input for the 'PreCompact' hook. It specifies the session, transcript, permission mode, hook event, and the trigger type ('manual' or 'auto'), which determines if custom instructions are provided.

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "PreCompact",
  "trigger": "manual",
  "custom_instructions": ""
}
```

--------------------------------

### Define an Advanced Plugin Entry (JSON)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This JSON object defines an advanced plugin entry, overriding default component locations and providing metadata. It includes source, description, version, author, license, keywords, commands, agents, hooks, and server configurations. The `CLAUDE_PLUGIN_ROOT` environment variable is used to resolve plugin installation paths.

```json
{
  "name": "enterprise-tools",
  "source": {
    "source": "github",
    "repo": "company/enterprise-plugin"
  },
  "description": "Enterprise workflow automation tools",
  "version": "2.1.0",
  "author": {
    "name": "Enterprise Team",
    "email": "enterprise@company.com"
  },
  "homepage": "https://docs.company.com/plugins/enterprise-tools",
  "repository": "https://github.com/company/enterprise-plugin",
  "license": "MIT",
  "keywords": ["enterprise", "workflow", "automation"],
  "category": "productivity",
  "commands": [
    "./commands/core/",
    "./commands/enterprise/",
    "./commands/experimental/preview.md"
  ],
  "agents": [
    "./agents/security-reviewer.md",
    "./agents/compliance-checker.md"
  ],
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{"type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh"}]
      }
    ]
  },
  "mcpServers": {
    "enterprise-db": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
    }
  },
  "strict": false
}
```

--------------------------------

### Set Resource Attributes for Multi-Team Support

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This example demonstrates how to use the OTEL_RESOURCE_ATTRIBUTES environment variable to add custom attributes for multi-team organization support. This allows distinguishing between different teams or departments.

```bash
export OTEL_RESOURCE_ATTRIBUTES=deployment.environment=production,organization.id=0123456789,organization.name="Acme Corp."
```

--------------------------------

### Markdown: Skill Version History

Source: https://docs.claude.com/en/docs/claude-code/skills

Example of documenting Skill versions in a SKILL.md file using Markdown. This section tracks changes, including breaking updates, new features, and initial releases.

```markdown
# My Skill

## Version History
- v2.0.0 (2025-10-01): Breaking changes to API
- v1.1.0 (2025-09-15): Added new features
- v1.0.0 (2025-09-01): Initial release
```

--------------------------------

### Pipe Data Through Claude (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Process data by piping it into the Claude CLI and directing the output to a file. This example shows how to explain a build error concisely by piping the error log to Claude.

```bash
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
```

--------------------------------

### Update Python Type Names (ClaudeCodeOptions to ClaudeAgentOptions)

Source: https://docs.claude.com/en/docs/claude-code/sdk

Illustrates changing the type name from ClaudeCodeOptions to ClaudeAgentOptions in Python for the Claude Agent SDK.

```python
# BEFORE (v0.0.x)
from claude_agent_sdk import query, ClaudeCodeOptions

options = ClaudeCodeOptions(
    model="claude-sonnet-4-5",
    permission_mode="acceptEdits"
)

# AFTER (v0.1.0)
from claude_agent_sdk import query, ClaudeAgentOptions

options = ClaudeAgentOptions(
    model="claude-sonnet-4-5",
    permission_mode="acceptEdits"
)
```

--------------------------------

### Customizing Claude Code Compaction Instructions

Source: https://docs.claude.com/en/docs/claude-code/costs

This markdown snippet demonstrates how to add custom instructions to CLAUDE.md to guide Claude Code's behavior during conversation compaction. It specifies focusing on test output and code changes when compaction is active.

```Markdown
# Summary instructions

When you are using compact, please focus on test output and code changes
```

--------------------------------

### Configure Team Marketplaces in Settings

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Defines a JSON structure for `.claude/settings.json` to specify essential plugin marketplaces for team projects. This ensures consistent plugin availability across team members' Claude Code installations.

```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    },
    "project-specific": {
      "source": {
        "source": "git",
        "url": "https://git.company.com/project-plugins.git"
      }
    }
  }
}
```

--------------------------------

### Create Project Command with Bash

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Demonstrates how to create a project-specific command using bash. It involves creating a directory for commands and writing a markdown file that serves as the command definition.

```bash
mkdir -p .claude/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .claude/commands/optimize.md
```

--------------------------------

### Serve Claude Code as MCP Server (Bash)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Starts Claude Code itself as an MCP server using the stdio protocol. This allows other applications to connect to Claude's tools (like View, Edit, LS) via the MCP client. This command can be used in conjunction with Claude Desktop's configuration.

```bash
# Start Claude as a stdio MCP server
claude mcp serve
```

--------------------------------

### SKILL.md with Allowed Tools (YAML)

Source: https://docs.claude.com/en/docs/claude-code/skills

An example of a SKILL.md file specifying allowed tools using the 'allowed-tools' frontmatter field. This restricts Claude's access to specific tools when this skill is active.

```yaml
---
name: safe-file-reader
description: Read files without making changes. Use when you need read-only file access.
allowed-tools: Read, Grep, Glob
---

# Safe File Reader

This Skill provides read-only file access.

```

--------------------------------

### Enable Vertex AI API with gcloud

Source: https://docs.claude.com/en/docs/claude-code/google-vertex-ai

This command sequence enables the Vertex AI API for your Google Cloud project. It requires the Google Cloud SDK to be installed and configured.

```bash
gcloud config set project YOUR-PROJECT-ID
gcloud services enable aiplatform.googleapis.com
```

--------------------------------

### Configure Separate Metrics and Logs Exporters (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry and sets up separate OTLP exporters for metrics (HTTP/protobuf) and logs (gRPC), each with its own endpoint. This setup is useful when you have different endpoints for processing metrics and logs. Ensure CLAUDE_CODE_ENABLE_TELEMETRY is set to '1'.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://metrics.company.com:4318
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://logs.company.com:4317
```

--------------------------------

### CLAUDE.md Import Syntax Example

Source: https://docs.claude.com/en/docs/claude-code/memory

Demonstrates how CLAUDE.md files can import other files using the '@path/to/import' syntax, supporting both relative and absolute paths. Imports are not evaluated within markdown code spans or blocks.

```markdown
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

```markdown
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

```markdown
This code span will not be treated as an import: `@anthropic-ai/claude-code`
```

--------------------------------

### Improve Generated Documentation (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to enhance documentation generated by Claude, adding more context and examples to make it more comprehensive and useful. Input: Request to improve documentation. Output: Enhanced documentation.

```plaintext
> improve the generated documentation with more context and examples
```

--------------------------------

### Python: Example Script for PDF Processing

Source: https://docs.claude.com/en/docs/claude-code/skills

A Python script designed to be part of the 'pdf-processing' Claude Skill. This specific script (`fill_form.py`) is intended for filling out PDF forms.

```python
# Placeholder for fill_form.py content
# Example: using pypdf or a similar library

# def fill_pdf_form(pdf_path, data):
#     pass
```

--------------------------------

### Configure Events/Logs Only Telemetry Exporter (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry and sets the OTLP exporter to 'otlp' using gRPC protocol for events and logs only. Metrics will not be exported with this setup. Ensure CLAUDE_CODE_ENABLE_TELEMETRY is set to '1'.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```

--------------------------------

### Add and Query PostgreSQL Database MCP Server

Source: https://docs.claude.com/en/docs/claude-code/mcp

Details on setting up a PostgreSQL database MCP server using a connection string and querying the database with natural language prompts. This requires the Bytebase DB Hub CLI tool.

```bash
# 1. Add the database server with your connection string
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"

# 2. Query your database naturally
> "What's our total revenue this month?"
> "Show me the schema for the orders table"
> "Find customers who haven't made a purchase in 90 days"
```

--------------------------------

### Parse JSON Response with jq

Source: https://docs.claude.com/en/docs/claude-code/headless

This example shows how to programmatically parse a JSON response from the Claude CLI using the `jq` command-line JSON processor. It captures the `result` and `cost_usd` fields from the JSON output for further processing.

```bash
# Parse JSON response with jq
result=$(claude -p "Generate code" --output-format json)
code=$(echo "$result" | jq -r '.result')
cost=$(echo "$result" | jq -r '.cost_usd')
```

--------------------------------

### Manually Set Claude Haiku Model Version

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This example demonstrates how to manually set a specific Claude Haiku model version using an environment variable. This is useful for ensuring you are using a particular model, like Haiku 4.5.

```bash
export ANTHROPIC_DEFAULT_HAIKU_MODEL=us.anthropic.claude-haiku-4-5-20251001-v1:0
```

--------------------------------

### Get JSON Output from Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

Request structured JSON output from Claude Code, which includes metadata along with the response. Use the `--output-format json` flag for programmatic access to results and session information.

```bash
claude -p "How does the data layer work?" --output-format json
```

```json
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

--------------------------------

### SessionEnd Hook Input Example (JSON)

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object is the input for the 'SessionEnd' hook. It includes session and transcript information, the current working directory, permission mode, and the reason for the session ending.

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "SessionEnd",
  "reason": "exit"
}
```

--------------------------------

### Add a Marketplace in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command adds a new plugin marketplace to your Claude Code environment. It requires the organization and repository name of the marketplace. The `theme={null}` parameter is a placeholder and might be specific to the Claude Code CLI. No direct output is shown, but the marketplace becomes available for browsing plugins.

```shell
/plugin marketplace add your-org/claude-plugins
```

--------------------------------

### Configure Hooks without Matchers

Source: https://docs.claude.com/en/docs/claude-code/hooks

Example of configuring hooks for events that do not use matchers, such as UserPromptSubmit. The matcher field is omitted, and the hooks array directly contains the hook configurations.

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/prompt-validator.py"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Stream JSON Input with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This example shows how to use streaming JSON input with the Claude CLI, requiring the -p and --output-format=stream-json flags, along with --input-format=stream-json. It allows for multi-turn conversations by sending JSON objects representing user turns via stdin.

```bash
echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

--------------------------------

### Configure Google Vertex AI with LLM Gateway

Source: https://docs.claude.com/en/docs/claude-code/bedrock-vertex-proxies

This setup uses Google Vertex AI models with an LLM gateway for centralized management. It requires enabling Vertex AI and setting the gateway's base URL. The `CLAUDE_CODE_SKIP_VERTEX_AUTH` flag is used if the gateway manages GCP authentication.

```shell
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1

# Configure LLM gateway
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # If gateway handles GCP auth

```

--------------------------------

### Adding Language Tags to Markdown Code Blocks

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Addresses the problem of missing language tags in code fences within markdown files generated by Claude Code. Includes methods to request tags from Claude, use post-processing hooks, and perform manual verification.

```markdown
```
function example() {
  return "hello";
}
```
```

```markdown
```javascript
function example() {
  return "hello";
}
```
```

--------------------------------

### Stop and SubagentStop Hook Input Example (JSON)

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object represents the input provided to the 'Stop' or 'SubagentStop' hook. It includes session details and a flag indicating if a stop hook is already active, which is crucial for preventing infinite loops.

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```

--------------------------------

### Remove a Marketplace (Shell)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command removes a configured marketplace, identified by 'marketplace-name', from your Claude Code environment. Be aware that this action will also uninstall any plugins that were previously installed from the removed marketplace.

```shell
/plugin marketplace remove marketplace-name
```

--------------------------------

### Bash Helper Function Approach for Complex Scripts

Source: https://docs.claude.com/en/docs/claude-code/statusline

Demonstrates a pattern for organizing complex Bash scripts used for status lines by reading the input JSON once and potentially using helper functions. This example is a prelude to a more detailed implementation.

```bash
#!/bin/bash
# Read JSON input once
input=$(cat)


```

--------------------------------

### Add Git Repository Marketplace

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Adds a plugin marketplace from any standard Git repository URL. The provided URL should point to a repository containing a `.claude-plugin/marketplace.json` file at its root.

```shell
/plugin marketplace add https://gitlab.com/company/plugins.git
```

--------------------------------

### Configure WSL2 Mirrored Networking Mode

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Sets the networking mode for WSL2 to 'mirrored' by adding configuration to the `.wslconfig` file. This can help with IDE detection issues by allowing WSL2 to use the host's network directly. Requires a WSL shutdown to take effect.

```ini
[wsl2]
networkingMode=mirrored
```

--------------------------------

### Extract Text from PDF using Python

Source: https://docs.claude.com/en/docs/claude-code/skills

This Python code snippet demonstrates how to open a PDF document and extract text from the first page using the pdfplumber library. It requires the 'pdfplumber' package to be installed.

```python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

--------------------------------

### Configure OTLP/gRPC Telemetry Exporter (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry and sets the metrics exporter to OTLP using the gRPC protocol. It specifies the endpoint where the OTLP collector is listening. This setup is suitable for sending telemetry data to a central OpenTelemetry collector for aggregation and processing.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```

--------------------------------

### Sandboxing Commands with Runtime (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sandboxing

This bash command shows how to use the open-source sandbox runtime to sandbox an arbitrary command. It utilizes npx to execute the package, allowing for the execution of other programs within a controlled environment. Replace `<command-to-sandbox>` with the actual command you wish to sandbox.

```bash
npx @anthropic-ai/sandbox-runtime <command-to-sandbox>
```

--------------------------------

### Configure Claude Desktop to use Claude Code MCP Server (JSON)

Source: https://docs.claude.com/en/docs/claude-code/mcp

A JSON configuration snippet to integrate Claude Code as an MCP server within Claude Desktop. This setup allows Claude Desktop to communicate with Claude Code's tools for file operations and other functionalities.

```json
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

--------------------------------

### Conditional Script Execution for Remote Environments

Source: https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web

This bash script demonstrates how to conditionally execute commands based on the environment. It checks if the CLAUDE_CODE_REMOTE environment variable is set to 'true' before proceeding with package installations, ensuring these actions only occur in remote environments.

```bash
#!/bin/bash

# Example: Only run in remote environments
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

npm install
pip install -r requirements.txt
```

--------------------------------

### Manage Disallowed Tools with --disallowedTools

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Specifies a list of tools that Claude Code is prohibited from using without user confirmation. This complements the settings.json configuration. Examples include specific Bash commands and the 'Edit' tool.

```bash
"Bash(git log:*)" "Bash(git diff:*)" "Edit"
```

--------------------------------

### Debugging Claude Plugin Loading

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Use the `claude --debug` command to inspect plugin loading processes. This command provides detailed output on plugin manifests, command, agent, and hook registration, as well as MCP server initialization, aiding in troubleshooting.

```bash
claude --debug
```

--------------------------------

### Persist Environment Variables with Bash in SessionStart Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks

This bash script example demonstrates how to persist individual environment variables by appending 'export' commands to the file path provided by CLAUDE_ENV_FILE within a SessionStart hook. It ensures that variables like NODE_ENV and API_KEY are available for subsequent bash commands.

```bash
#!/bin/bash

if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
  echo 'export API_KEY=your-api-key' >> "$CLAUDE_ENV_FILE"
  echo 'export PATH="$PATH:./node_modules/.bin"' >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

--------------------------------

### Add MCP Server from JSON Configuration (Bash)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Adds an MCP server by providing its configuration as a JSON string directly in the command line. This is useful for quick setup or scripting. Ensure the JSON is properly escaped for your shell and conforms to the MCP server schema. It supports HTTP and stdio server types.

```bash
# Basic syntax
claude mcp add-json <name> '<json>'

# Example: Adding an HTTP server with JSON configuration
claude mcp add-json weather-api '{"type":"http","url":"https://api.weather.com/mcp","headers":{"Authorization":"Bearer token"}}'

# Example: Adding a stdio server with JSON configuration
claude mcp add-json local-weather '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
```

--------------------------------

### Use CLAUDE_PLUGIN_ROOT Environment Variable in Hooks

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Shows how to utilize the `${CLAUDE_PLUGIN_ROOT}` environment variable within hook configurations in plugin.json. This variable provides the absolute path to the plugin directory, ensuring correct script execution regardless of installation location.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/process.sh"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### SRE Incident Response Bot with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

An example Bash script demonstrating an automated incident response agent using Claude Code. It defines a function to investigate incidents, leveraging Claude's ability to diagnose issues, assess impact, and provide action items via JSON output and configured tools.

```bash
#!/bin/bash

# Automated incident response agent
investigate_incident() {
    local incident_description="$1"
    local severity="${2:-medium}"

    claude -p "Incident: $incident_description (Severity: $severity)" \
      --append-system-prompt "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items." \
      --output-format json \
      --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
      --mcp-config monitoring-tools.json
}

# Usage
investigate_incident "Payment API returning 500 errors" "high"

```

--------------------------------

### Configure Setting Sources in Claude Agent SDK

Source: https://docs.claude.com/en/docs/claude-code/sdk/migration-guide

This snippet shows how to configure which settings sources the Claude Agent SDK should load. By default, the SDK no longer loads settings from files like CLAUDE.md or settings.json. You can now specify sources like 'user', 'project', or 'local' explicitly.

```typescript
const result = query({
  prompt: "Hello",
  options: {
    settingSources: ["user", "project", "local"]
  }
});

// Or load only specific sources:
const result = query({
  prompt: "Hello",
  options: {
    settingSources: ["project"]  // Only project settings
  }
});
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        setting_sources=["user", "project", "local"]
    )
):
    print(message)

# Or load only specific sources:
async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        setting_sources=["project"]  // Only project settings
    )
):
    print(message)
```

--------------------------------

### Custom Automation with Prompts and Specific Models

Source: https://docs.claude.com/en/docs/claude-code/github-actions

An example of a scheduled GitHub Actions workflow designed for custom automation, such as generating a daily report. It runs on a cron schedule and uses a specific prompt to instruct Claude on the desired output. The `claude_args` parameter is used to select a particular model, 'claude-opus-4-1-20250805'.

```yaml
yaml  theme={null}
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a summary of yesterday's commits and open issues"
          claude_args: "--model claude-opus-4-1-20250805"

```

--------------------------------

### Run Headless Query in Plan Mode (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Executes a specific query in Claude's Plan Mode without interactive input. This is ideal for scripting or automated analysis tasks. The `-p` flag indicates a 'headless' query. Dependencies: Claude CLI installed.

```bash
claude --permission-mode plan -p "Analyze the authentication system and suggest improvements"
```

--------------------------------

### Remove Stored Authentication Information for Claude Code

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

This bash command removes the authentication file, forcing a clean login and resolving persistent authentication issues. It requires no input and has no direct output, but clears the authentication state.

```bash
rm -rf ~/.config/claude-code/auth.json
claude
```

--------------------------------

### WebFetch and MCP Permission Patterns in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/iam

Details permission configurations for WebFetch and MCP (Multi-Cloud Platform) tools in Claude Code. WebFetch allows domain-specific access, while MCP requires specific patterns for server and tool matching. MCP permissions do not support wildcards; exact server and tool names must be used for approval.

```text
WebFetch(domain:example.com)
mcp__puppeteer
mcp__puppeteer__puppeteer_navigate
```

```text
# Approves all tools from the GitHub server
mcp__github

# Approves specific GitHub tools
mcp__github__get_issue
mcp__github__list_issues
```

--------------------------------

### Configure Plan Mode as Default (JSON)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

This JSON configuration sets Plan Mode as the default behavior for Claude sessions. It modifies the settings file to ensure new sessions start with read-only analysis enabled. Dependencies: Claude CLI settings configuration.

```json
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

--------------------------------

### Graceful Error Handling with Exit Codes and Stderr (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

This example illustrates robust error handling for Claude CLI commands. It checks the exit code of the `claude` command and redirects any standard error output to a log file for debugging.

```bash
if ! claude -p "$prompt" 2>error.log; then
    echo "Error occurred:" >&2
    cat error.log >&2
    exit 1
fi

```

--------------------------------

### Create Personal Command with Bash

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Illustrates the creation of a personal command, which is available across all projects. This involves creating a directory in the user's home directory and defining the command via a markdown file.

```bash
mkdir -p ~/.claude/commands
echo "Review this code for security vulnerabilities:" > ~/.claude/commands/security-review.md
```

--------------------------------

### Manage Allowed Tools with --allowedTools

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Defines a list of tools that Claude Code can use without requiring explicit user permission. This flag works in conjunction with settings.json files. Examples include Bash commands for git operations and the 'Read' tool.

```bash
"Bash(git log:*)" "Bash(git diff:*)" "Read"
```

--------------------------------

### Create Marketplace Manifest File (Bash)

Source: https://docs.claude.com/en/docs/claude-code/plugins

This bash command creates the marketplace manifest file (marketplace.json) which defines the marketplace name, owner, and lists the plugins included in it. This is used for local testing.

```bash
cd ..
mkdir .claude-plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
"name": "test-marketplace",
"owner": {
"name": "Test User"
},
"plugins": [
{
  "name": "my-first-plugin",
  "source": "./my-first-plugin",
  "description": "My first test plugin"
}
]
}
EOF
```

--------------------------------

### Update Claude Code Action from Beta to v1.0

Source: https://docs.claude.com/en/docs/claude-code/github-actions

Demonstrates the transition from the beta version to the GA (v1.0) of the Claude Code Action. The beta version used `direct_prompt` and `custom_instructions`, while v1.0 uses `prompt` and `claude_args` for more granular control over model parameters and system prompts.

```yaml
yaml  theme={null}
- uses: anthropics/claude-code-action@beta
  with:
    mode: "tag"
    direct_prompt: "Review this PR for security issues"
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    custom_instructions: "Follow our coding standards"
    max_turns: "10"
    model: "claude-sonnet-4-5-20250929"

```

```yaml
yaml  theme={null}
- uses: anthropics/claude-code-action@v1
  with:
    prompt: "Review this PR for security issues"
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    claude_args: |
      --system-prompt "Follow our coding standards"
      --max-turns 10
      --model claude-sonnet-4-5-20250929

```

--------------------------------

### Basic Plugin Command Structure

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Illustrates the basic structure for plugin commands, including the 'description' frontmatter and command name/details in the Markdown body. Commands are located in the 'commands/' directory of a plugin.

```markdown
---
description: Brief description of what the command does
---

# Command Name

Detailed instructions for Claude on how to execute this command. Include specific guidance on parameters, expected outcomes, and any special considerations.
```

--------------------------------

### Basic Claude Code Action Workflow

Source: https://docs.claude.com/en/docs/claude-code/github-actions

A fundamental GitHub Actions workflow that triggers on new issue comments. It utilizes the Claude Code Action (v1) to respond to mentions, requiring an `ANTHROPIC_API_KEY` secret for authentication. This setup enables interactive assistance within issue comments.

```yaml
yaml  theme={null}
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # Responds to @claude mentions in comments

```

--------------------------------

### Set Timeout for Claude CLI Command

Source: https://docs.claude.com/en/docs/claude-code/headless

This example uses the `timeout` command to limit the execution time of a Claude CLI command. If the command exceeds the specified duration (e.g., 300 seconds), it will be terminated, and a message indicating the timeout will be printed.

```bash
timeout 300 claude -p "$complex_prompt" || echo "Timed out after 5 minutes"
```

--------------------------------

### Add Marketplace for Testing with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command adds a local marketplace to your Claude environment for testing purposes. It takes the path to your marketplace directory as input. Ensure the path is correct to avoid errors.

```shell
/plugin marketplace add ./path/to/marketplace
```

--------------------------------

### Fixing ESC Key Binding in JetBrains Terminals for Claude Code

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Resolves the issue where the ESC key does not interrupt Claude Code in JetBrains IDE terminals due to keybinding conflicts. This involves adjusting terminal settings within the IDE.

```text
1. Go to Settings → Tools → Terminal
2. Either:
   * Uncheck "Move focus to the editor with Escape", or
   * Click "Configure terminal keybindings" and delete the "Switch focus to Editor" shortcut
3. Apply the changes
```

--------------------------------

### Claude Code Dynamic API Key Helper Script

Source: https://docs.claude.com/en/docs/claude-code/llm-gateway

Sets up a dynamic API key for Claude Code using a helper script. This script, when executed, fetches or generates an API key, suitable for rotating keys or per-user authentication. The script's path and token refresh interval are configured in Claude Code settings and environment variables.

```bash
#!/bin/bash
# ~/bin/get-litellm-key.sh

# Example: Fetch key from vault
vault kv get -field=api_key secret/litellm/claude-code

# Example: Generate JWT token
jwt encode \
  --secret="${JWT_SECRET}" \
  --exp="+1h" \
  '{"user":"'${USER}'","team":"engineering"}'
```

```json
{
  "apiKeyHelper": "~/bin/get-litellm-key.sh"
}
```

```bash
# Refresh every hour (3600000 ms)
export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=3600000
```

--------------------------------

### Configure Windows Firewall Rule for WSL2 Internal Traffic

Source: https://docs.claude.com/en/docs/claude-code/troubleshooting

Creates a Windows Firewall rule to allow inbound TCP traffic within the WSL2 subnet, essential for IDE detection when using Claude Code on WSL2 with default NAT networking. Requires administrator privileges.

```powershell
New-NetFirewallRule -DisplayName "Allow WSL2 Internal Traffic" -Direction Inbound -Protocol TCP -Action Allow -RemoteAddress 172.21.0.0/16 -LocalAddress 172.21.0.0/16
```

--------------------------------

### Configure Claude Code Job in GitLab CI/CD

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This snippet shows how to add a Claude Code job to your `.gitlab-ci.yml` file. It includes setting up necessary dependencies, installing the Claude Code CLI, and configuring job rules for triggering. The job can be triggered manually, via merge request events, or through web/API triggers.

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  # Adjust rules to fit how you want to trigger the job:
  # - manual runs
  # - merge request events
  # - web/API triggers when a comment contains '@claude'
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  variables:
    GIT_STRATEGY: fetch
  before_script:
    - apk update
    - apk add --no-cache git curl bash
    - npm install -g @anthropic-ai/claude-code
  script:
    # Optional: start a GitLab MCP server if your setup provides one
    - /bin/gitlab-mcp-server || true
    # Use AI_FLOW_* variables when invoking via web/API triggers with context payloads
    - echo "$AI_FLOW_INPUT for $AI_FLOW_CONTEXT on $AI_FLOW_EVENT"
    - >
      claude
      -p "${AI_FLOW_INPUT:-'Review this MR and implement the requested changes'}"
      --permission-mode acceptEdits
      --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
      --debug
```

--------------------------------

### List Configured Marketplaces (Shell)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command lists all the plugin marketplaces that have been configured in your Claude Code environment. It displays their sources and current status, helping you manage your available plugin sources.

```shell
/plugin marketplace list
```

--------------------------------

### Create Plugin Manifest File (Bash)

Source: https://docs.claude.com/en/docs/claude-code/plugins

This bash command creates the plugin manifest file (.claude-plugin/plugin.json) which contains metadata about the plugin, such as its name, description, version, and author.

```bash
mkdir .claude-plugin
cat > .claude-plugin/plugin.json << 'EOF'
{
"name": "my-first-plugin",
"description": "A simple greeting plugin to learn the basics",
"version": "1.0.0",
"author": {
"name": "Your Name"
}
}
EOF
```

--------------------------------

### Enable and Configure OpenTelemetry via Environment Variables (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This snippet demonstrates how to enable OpenTelemetry for Claude Code using environment variables. It covers enabling telemetry, choosing exporters (OTLP, Prometheus, console), configuring the OTLP endpoint and protocol, setting authentication headers, and adjusting export intervals for debugging. It also shows how to run Claude Code after configuration.

```bash
# 1. Enable telemetry
export CLAUDE_CODE_ENABLE_TELEMETRY=1

# 2. Choose exporters (both are optional - configure only what you need)
export OTEL_METRICS_EXPORTER=otlp       # Options: otlp, prometheus, console
export OTEL_LOGS_EXPORTER=otlp          # Options: otlp, console

# 3. Configure OTLP endpoint (for OTLP exporter)
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

# 4. Set authentication (if required)
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"

# 5. For debugging: reduce export intervals
export OTEL_METRIC_EXPORT_INTERVAL=10000  # 10 seconds (default: 60000ms)
export OTEL_LOGS_EXPORT_INTERVAL=5000     # 5 seconds (default: 5000ms)

# 6. Run Claude Code
claude
```

--------------------------------

### Configure Claude Model via Command Line and Session Commands

Source: https://docs.claude.com/en/docs/claude-code/model-config

Demonstrates how to set the Claude model using the command-line interface (CLI) when launching the application and how to switch models during an active session. These commands allow for dynamic model selection based on current needs.

```bash
claude --model opus
/model sonnet
```

--------------------------------

### Add GitHub Marketplace

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Adds a plugin marketplace hosted on a GitHub repository. This command expects the repository in the format 'owner/repo'. Claude Code will then look for a `.claude-plugin/marketplace.json` file within that repository's root.

```shell
/plugin marketplace add owner/repo
```

--------------------------------

### View All MCP Servers in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/mcp

Lists all currently active MCP servers, including those provided by plugins, within the Claude Code environment. This command helps in verifying server status and identifying plugin-originated servers.

```bash
# Within Claude Code, see all MCP servers including plugin ones
/mcp
```

--------------------------------

### Manually Update Claude Code

Source: https://docs.claude.com/en/docs/claude-code/setup

Manually triggers an update for Claude Code using the command-line interface. This ensures you have the latest version with new features and security fixes.

```bash
claude update
```

--------------------------------

### Create Marketplace Manifest File

Source: https://docs.claude.com/en/docs/claude-code/plugins

This bash script creates a `.claude-plugin` directory and a `marketplace.json` file within it. The `marketplace.json` file defines the local development marketplace, including its name, owner, and the plugins it references, such as the 'my-plugin' under development.

```bash
mkdir .claude-plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
"name": "dev-marketplace",
"owner": {
"name": "Developer"
},
"plugins": [
{
  "name": "my-plugin",
  "source": "./my-plugin",
  "description": "Plugin under development"
}
]
}
EOF
```

--------------------------------

### Frontmatter for Command Metadata

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Defines metadata for commands using frontmatter in Markdown files. Supports 'allowed-tools', 'argument-hint', 'description', 'model', and 'disable-model-invocation'.

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
argument-hint: [message]
description: Create a git commit
model: claude-3-5-haiku-20241022
---

Create a git commit with message: $ARGUMENTS
```

```markdown
---
argument-hint: [pr-number] [priority] [assignee]
description: Review pull request
---

Review PR #$1 with priority $2 and assign to $3.
Focus on security, performance, and code style.
```

--------------------------------

### Add a Local Marketplace for Development (Shell)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command adds a local directory as a plugin marketplace. This is useful for testing your marketplace locally before distributing it. The path `./my-local-marketplace` points to the directory containing your marketplace definitions.

```shell
/plugin marketplace add ./my-local-marketplace
```

--------------------------------

### MCP Server Environment Variable Expansion in .mcp.json

Source: https://docs.claude.com/en/docs/claude-code/mcp

Demonstrates how to use environment variables for dynamic configuration in `.mcp.json` files. Supports `${VAR}` and `${VAR:-default}` syntax for `command`, `args`, `env`, `url`, and `headers`. Failing to set a required variable without a default will cause parsing errors.

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

--------------------------------

### Create Command File with $ARGUMENTS Placeholder (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Creates a markdown file for a custom slash command that accepts arguments. The $ARGUMENTS placeholder will be replaced by user input when the command is invoked. This allows for dynamic command creation based on user-provided values.

```bash
echo 'Find and fix issue #$ARGUMENTS. Follow these steps: 1. Understand the issue described in the ticket 2. Locate the relevant code in our codebase 3. Implement a solution that addresses the root cause 4. Add appropriate tests 5. Prepare a concise PR description' > .claude/commands/fix-issue.md
```

--------------------------------

### Basic Headless Execution with Bash

Source: https://docs.claude.com/en/docs/claude-code/headless

Demonstrates the basic command for running Claude Code in non-interactive mode using the `claude` CLI. It specifies a prompt, allowed tools, and permission mode for automated execution.

```bash
claude -p "Stage my changes and write a set of commits for them" \
  --allowedTools "Bash,Read" \
  --permission-mode acceptEdits
```

--------------------------------

### Analyze Images with Claude Code

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Learn how to provide images to Claude Code for analysis. This includes methods like drag-and-drop, copy-pasting into the CLI, and providing image paths. Claude can then describe image content, UI elements, or identify problematic areas.

```text
> What does this image show?

> Describe the UI elements in this screenshot

> Are there any problematic elements in this diagram?

> Here's a screenshot of the error. What's causing it?

> This is our current database schema. How should we modify it for the new feature?

> Generate CSS to match this design mockup

> What HTML structure would recreate this component?
```

--------------------------------

### Configure Plugin MCP Server in .mcp.json

Source: https://docs.claude.com/en/docs/claude-code/mcp

Defines a database tool MCP server within a plugin's .mcp.json configuration file. It specifies the command to execute, arguments to pass, and environment variables to set, utilizing the CLAUDE_PLUGIN_ROOT variable for path resolution.

```json
{
  "database-tools": {
    "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
    "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
    "env": {
      "DB_URL": "${DB_URL}"
    }
  }
}
```

--------------------------------

### Direct File Management for Subagents

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

This method involves directly manipulating subagent files to manage them. It includes creating project and user subagents by defining their metadata and behavior in markdown files within specific directories. This approach offers more granular control for advanced users.

```bash
# Create a project subagent
mkdir -p .claude/agents
echo '---
name: test-runner
description: Use proactively to run tests and fix failures
--- 

You are a test automation expert. When you see code changes, proactively run the appropriate tests. If tests fail, analyze the failures and fix them while preserving the original test intent.' > .claude/agents/test-runner.md

# Create a user subagent
mkdir -p ~/.claude/agents
# ... create subagent file
```

--------------------------------

### Create Personal Command File (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Creates a markdown file for a personal slash command in the ~/.claude/commands directory. This command, 'security-review', can be used across any project to prompt Claude for code security reviews.

```bash
echo "Review this code for security vulnerabilities, focusing on:" > ~/.claude/commands/security-review.md
```

--------------------------------

### Create a Project Skill Directory

Source: https://docs.claude.com/en/docs/claude-code/skills

This bash command creates the necessary directory structure for a new project-specific Skill. It ensures that the `.claude/skills/` directory and the skill's subdirectory are properly set up before creating the `SKILL.md` file.

```bash
mkdir -p .claude/skills/team-skill
# Create SKILL.md
```

--------------------------------

### Add Direct Marketplace JSON File

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Adds a specific `marketplace.json` file from a local path as a plugin marketplace. This allows direct referencing of a marketplace definition file.

```shell
/plugin marketplace add ./path/to/marketplace.json
```

--------------------------------

### Check Available Tools in Claude Code Environment

Source: https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web

This bash command is used within the Claude Code on the web environment to display information about pre-installed programming languages, their versions, available package managers, and development tools.

```bash
check-tools
```

--------------------------------

### Add Local Stdio MCP Server using Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/mcp

Configure a connection to a local MCP server that runs as a process. This is suitable for tools needing direct system access or custom scripts. It requires a name, the command to execute, and optional arguments. Environment variables can be set using the --env flag.

```bash
# Basic syntax
claude mcp add --transport stdio <name> <command> [args...]

# Real example: Add Airtable server
claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=YOUR_KEY \
  -- npx -y airtable-mcp-server
```

--------------------------------

### Displaying Claude Code Cost Statistics

Source: https://docs.claude.com/en/docs/claude-code/costs

This snippet shows the output format for the `/cost` command, which provides detailed token usage statistics for the current session. It includes total cost, API duration, wall duration, and code changes. Note that this command is not for Claude Max and Pro subscribers.

```Shell
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

--------------------------------

### Claude Code Action with Slash Commands

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This workflow demonstrates using Claude Code Action with a specific prompt, in this case, a slash command '/review', triggered by pull request events. It's configured to run on pull request creation or updates and specifies a maximum of 5 turns for the interaction, controlled via `claude_args`.

```yaml
yaml  theme={null}
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "/review"
          claude_args: "--max-turns 5"

```

--------------------------------

### Configure Bedrock with LLM Gateway in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/third-party-integrations

Sets up Claude Code to use an LLM Gateway for Bedrock-compatible endpoints, centralizing management and potentially bypassing direct AWS authentication. Requires enabling Bedrock and specifying the gateway URL.

```bash
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1

# Configure LLM gateway
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # If gateway handles AWS auth
```

--------------------------------

### GitHub Actions Workflow for Claude

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This YAML workflow configures a GitHub Action to use Claude for processing GitHub events. It sets up authentication for both GitHub Apps and Google Cloud (Vertex AI), and defines steps for checking out the repository, generating tokens, authenticating to GCP, and running the Claude code action.

```yaml
name: Claude PR Action

permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]

jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}

      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}

      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          trigger_phrase: "@claude"
          use_vertex: "true"
          claude_args: '--model claude-sonnet-4@20250514 --max-turns 10'
        env:
          ANTHROPIC_VERTEX_PROJECT_ID: ${{ steps.auth.outputs.project_id }}
          CLOUD_ML_REGION: us-east5
          VERTEX_REGION_CLAUDE_3_7_SONNET: us-east5

```

--------------------------------

### Run and Verify Tests (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to ask Claude to execute newly written tests and address any failures. This ensures that the tests are passing and the code behaves as expected. Input: Request to run tests. Output: Test results and fixes.

```plaintext
> run the new tests and fix any failures
```

--------------------------------

### Configure MCP Servers for Claude Code Plugins

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Defines Model Context Protocol (MCP) servers within a plugin to connect Claude Code with external tools. These servers are configured in a .mcp.json file or inline in plugin.json. They specify commands, arguments, and environment variables for server execution, with paths relative to the plugin root.

```json
{
  "mcpServers": {
    "plugin-database": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api-client": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

--------------------------------

### Handle Text Input with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

Demonstrates two ways to provide text input to the Claude CLI: directly as an argument to the -p flag or via standard input (stdin). This is the default input method if no other format is specified.

```bash
# Direct argument
claude -p "Explain this code"
```

```bash
# From stdin
echo "Explain this code" | claude -p
```

--------------------------------

### MCP Command Format

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Demonstrates the format for MCP (Model Communication Protocol) slash commands, which are dynamically discovered from connected MCP servers. The pattern is /mcp__<server-name>__<prompt-name> [arguments].

```shell
/mcp__github__list_prs
```

```shell
/mcp__github__pr_review 456
```

```shell
/mcp__jira__create_issue "Bug title" high
```

--------------------------------

### Referencing Supporting Files in SKILL.md (Markdown)

Source: https://docs.claude.com/en/docs/claude-code/skills

Demonstrates how to reference external Markdown files and execute shell scripts from within the SKILL.md file. This allows for documentation and utility integration.

```markdown
For advanced usage, see [reference.md](reference.md).

Run the helper script:
```bash
python scripts/helper.py input.txt
```
```

--------------------------------

### Parsing JSON Responses with jq (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

This snippet shows how to leverage the `--output-format json` option with the Claude CLI and parse the JSON response using `jq`. It extracts specific fields like the generated code and cost from the result.

```bash
# Parse JSON response with jq
result=$(claude -p "Generate code" --output-format json)
code=$(echo "$result" | jq -r '.result')
cost=$(echo "$result" | jq -r '.cost_usd')

```

--------------------------------

### Create Custom Slash Commands Directory (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Set up a directory structure for custom slash commands within your project. This involves creating a `.claude/commands` directory where command definition files will reside.

```bash
mkdir -p .claude/commands
```

--------------------------------

### Configure Vertex AI with LLM Gateway in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/third-party-integrations

Integrates Claude Code with Google Vertex AI models via an LLM Gateway, enabling centralized control and potentially skipping direct GCP authentication. Configuration involves enabling Vertex AI and setting the gateway base URL.

```bash
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1

# Configure LLM gateway
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # If gateway handles GCP auth
```

--------------------------------

### Add and Use Sentry MCP Server

Source: https://docs.claude.com/en/docs/claude-code/mcp

Instructions for adding an HTTP-based Sentry MCP server and interacting with it using natural language commands. This enables debugging production issues by querying Sentry data directly within Claude Code.

```bash
# 1. Add the Sentry MCP server
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# 2. Use /mcp to authenticate with your Sentry account
> /mcp

# 3. Debug production issues
> "What are the most common errors in the last 24 hours?"
> "Show me the stack trace for error ID abc123"
> "Which deployment introduced these new errors?"
```

--------------------------------

### Add ClickUp MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to ClickUp using the Model Context Protocol (MCP) via stdio. This requires setting `CLICKUP_API_KEY` and `CLICKUP_TEAM_ID` environment variables.

```shell
claude mcp add --transport stdio clickup --env CLICKUP_API_KEY=YOUR_CLICKUP_API_KEY --env CLICKUP_TEAM_ID=YOUR_CLICKUP_TEAM_ID -- npx -y @hauptsache.net/clickup-mcp
```

--------------------------------

### Enable Sandboxing in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/sandboxing

This command activates the sandboxed bash tool with default settings. It allows read and write access to the current working directory and its subdirectories, while restricting access to other parts of the system. New domain requests within the sandbox will trigger permission prompts.

```bash
> /sandbox
```

--------------------------------

### Configure MCP Server Allowlist and Denylist in managed-settings.json

Source: https://docs.claude.com/en/docs/claude-code/mcp

This JSON configuration snippet demonstrates how to define lists of allowed and denied MCP servers in the `managed-settings.json` file. It specifies which servers users can and cannot configure, with `allowedMcpServers` defining permitted servers and `deniedMcpServers` explicitly blocking others. The denylist takes precedence if a server is in both lists.

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverName": "sentry" },
    { "serverName": "company-internal" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" }
  ]
}
```

--------------------------------

### Bash Permission Patterns in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/iam

Defines how to configure permissions for Bash commands in Claude Code using prefix matching. It explains the wildcard usage and highlights limitations such as the inability to handle shell operators or bypasses through options, protocols, redirects, variables, or extra spaces. For more robust URL filtering, using WebFetch or CLAUDE.md is recommended.

```bash
Bash(npm run build)
Bash(npm run test:*)
Bash(curl http://site.com/:*)
```

--------------------------------

### Import MCP Servers from Claude Desktop (Bash)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Imports MCP servers that have already been configured in Claude Desktop. This command initiates an interactive dialog to select which servers to import. This feature is available on macOS and WSL, and reads configurations from the standard Claude Desktop location.

```bash
# Basic syntax 
claude mcp add-from-claude-desktop 
```

--------------------------------

### Configure Extra Known Marketplaces in JSON

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON configuration defines additional marketplaces for a Claude Code repository. It specifies the source type (e.g., GitHub, Git) and the location (e.g., repository name or URL) for each marketplace. This allows team members to access plugins from these sources when they trust the repository.

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "company-org/claude-plugins"
      }
    },
    "security-plugins": {
      "source": {
        "source": "git",
        "url": "https://git.company.com/security/plugins.git"
      }
    }
  }
}
```

--------------------------------

### Configure Dynamic OpenTelemetry Headers

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This snippet shows how to configure Claude Code to use a script for generating dynamic OpenTelemetry headers. The script must output valid JSON. Note that headers are fetched only at startup.

```json
{
  "otelHeadersHelper": "/bin/generate_opentelemetry_headers.sh"
}
```

--------------------------------

### Add Atlassian MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to Atlassian (Jira/Confluence) using the Model Context Protocol (MCP) via SSE (Server-Sent Events). Authentication is handled via OAuth.

```shell
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse
```

--------------------------------

### Markdown File Format for Subagent Definition

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

Defines subagents in Markdown files with a front matter section for configuration and the system prompt following. Configuration fields include name, description, optional tools, and optional model selection. This format allows for persistent and detailed subagent definitions.

```markdown
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
model: sonnet  # Optional - specify model alias or 'inherit'
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.
```

--------------------------------

### Render Server Cards with Conditional Commands/URLs (React JSX)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Renders a list of servers organized by category. For each server, it displays its name, description, and either a 'Command' (if platform is 'claudeCode') or a 'URL'. It includes basic styling for the cards and command rows.

```jsx
const categoryOrder = ["Development & Testing Tools", "Project Management & Documentation", "Databases & Data Management", "Payments & Commerce", "Design & Media", "Infrastructure & DevOps", "Automation & Integration"];
const serversByCategory = {
  "Development & Testing Tools": [
    {
      name: "GitHub",
      description: "Version control hosting service.",
      documentation: "https://github.com/docs",
      availability: { claudeCode: true },
      urls: { http: "https://github.com" },
      generateClaudeCodeCommand: () => "claudeCode github --help"
    }
  ],
  "Project Management & Documentation": [
    {
      name: "JIRA",
      description: "Issue and project tracking software.",
      documentation: "https://www.atlassian.com/software/jira/docs",
      availability: { claudeCode: true },
      urls: { http: "https://www.atlassian.com/software/jira" },
      generateClaudeCodeCommand: () => "claudeCode jira --help"
    }
  ]
};
const platform = "claudeCode"; // or "mcpConnector"

return (
  <>
    <style jsx>{`
      .cards-container {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .server-card {
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 6px;
        padding: 1rem;
      }
      .command-row {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .command-row code {
        font-size: 0.75rem;
        overflow-x: auto;
      }
    `}</style>
    
    {categoryOrder.map(category => {
      if (!serversByCategory[category]) return null;
      return <div key={category}>
              <h3>{category}</h3>
              <div className="cards-container">
                {serversByCategory[category].map(server => {
      const claudeCodeCommand = server.generateClaudeCodeCommand(server);
      const mcpUrl = server.urls.http || server.urls.sse;
      const commandToShow = platform === "claudeCode" ? claudeCodeCommand : mcpUrl;
      return <div key={server.name} className="server-card">
                    <div>
                      {server.documentation ? <a href={server.documentation}>
                          <strong>{server.name}</strong>
                        </a> : <strong>{server.name}</strong>}
                    </div>
                    
                    <p style={{
        margin: '0.5rem 0',
        fontSize: '0.9rem'
      }}>
                      {server.description}
                      {server.notes && <span style={{
        display: 'block',
        marginTop: '0.25rem',
        fontSize: '0.8rem',
        fontStyle: 'italic',
        opacity: 0.7
      }}>
                          {server.notes}
                        </span>}
                    </p>
                    
                    {commandToShow && <>
                      <p style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 500,
        minWidth: 'fit-content',
        marginTop: '0.5rem',
        marginBottom: 0
      }}>
                        {platform === "claudeCode" ? "Command" : "URL"}
                      </p>
                      <div className="command-row">
                        <code>
                          {commandToShow}
                        </code>
                      </div>
                    </>}
                  </div>;
    })}
            </div>
          </div>;
  })}
  </>
);
```

--------------------------------

### Debugging Claude Code with Logging

Source: https://docs.claude.com/en/docs/claude-code/bedrock-vertex-proxies

Enables debug logging for Claude Code to assist in troubleshooting deployment issues. This involves setting the `ANTHROPIC_LOG` environment variable to 'debug'.

```shell
export ANTHROPIC_LOG=debug

```

--------------------------------

### Update System Prompt Default in Claude Agent SDK

Source: https://docs.claude.com/en/docs/claude-code/sdk/migration-guide

This snippet demonstrates how to explicitly set the system prompt in the Claude Agent SDK. Previously, Claude Code's system prompt was used by default. Now, an empty system prompt is the default, requiring explicit configuration for presets like 'claude_code' or custom prompts.

```typescript
const result = query({
  prompt: "Hello",
  options: {
    systemPrompt: { type: "preset", preset: "claude_code" }
  }
});

// Or use a custom system prompt:
const result = query({
  prompt: "Hello",
  options: {
    systemPrompt: "You are a helpful coding assistant"
  }
});
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        system_prompt={"type": "preset", "preset": "claude_code"}  // Use the preset
    )
):
    print(message)

# Or use a custom system prompt:
async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        system_prompt="You are a helpful coding assistant"
    )
):
    print(message)
```

--------------------------------

### Create Commands Directory (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Creates a directory named '.claude/commands' in the user's home directory if it doesn't already exist. This directory is used to store personal slash command definitions, making them available across all projects.

```bash
mkdir -p ~/.claude/commands
```

--------------------------------

### List Personal and Project Skills

Source: https://docs.claude.com/en/docs/claude-code/skills

These bash commands allow you to list available Skills in your personal directory (`~/.claude/skills/`) and within the current project directory (`.claude/skills/`). This is useful for quickly checking which Skills are available in different scopes.

```bash
# List personal Skills
ls ~/.claude/skills/

# List project Skills (if in a project directory)
ls .claude/skills/
```

--------------------------------

### Configure Plugin MCP Server in plugin.json

Source: https://docs.claude.com/en/docs/claude-code/mcp

Defines an API server MCP configuration inline within a plugin.json file. It specifies the command and arguments for the 'plugin-api' server, using the CLAUDE_PLUGIN_ROOT variable for path.

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

--------------------------------

### Configure Multiple Telemetry Exporters (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry and specifies multiple exporters: 'console' and 'otlp' using HTTP/JSON protocol. This allows telemetry data to be sent to both a local console and an OTLP endpoint simultaneously. Ensure CLAUDE_CODE_ENABLE_TELEMETRY is set to '1'.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console,otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/json
```

--------------------------------

### Use Extended Context Model via Session Command

Source: https://docs.claude.com/en/docs/claude-code/model-config

Illustrates how to use a specific Claude model with an extended context window (1 million tokens) during a session. This is achieved by appending the '[1m]' suffix to the full model name in the session command.

```bash
/model anthropic.claude-sonnet-4-5-20250929-v1:0[1m]
```

--------------------------------

### Add Local Directory Marketplace

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Adds a local directory as a plugin marketplace. This is useful for development and testing. The directory should contain a `.claude-plugin/marketplace.json` file.

```shell
/plugin marketplace add ./my-marketplace
```

--------------------------------

### Configure Enabled Plugins and Marketplaces in JSON

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON configuration snippet shows how to manage plugin settings. It includes the 'enabledPlugins' object to activate or deactivate specific plugins from defined marketplaces, and 'extraKnownMarketplaces' to register custom plugin sources.

```json
{
  "enabledPlugins": {
    "formatter@company-tools": true,
    "deployer@company-tools": true,
    "analyzer@security-plugins": false
  },
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": "github",
      "repo": "company/claude-plugins"
    }
  }
}
```

--------------------------------

### Generate Code Documentation (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to instruct Claude to add documentation comments (e.g., JSDoc) to functions that are currently undocumented. This improves code maintainability and understanding. Input: File and documentation type. Output: Code with added comments.

```plaintext
> add JSDoc comments to the undocumented functions in auth.js
```

--------------------------------

### Agent Structure Definition (Markdown)

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Defines the structure for agent configuration files within Claude Code plugins. It specifies frontmatter details like description and capabilities, followed by a detailed explanation of the agent's role and use cases.

```markdown
---
description: What this agent specializes in
capabilities: ["task1", "task2", "task3"]
---

# Agent Name

Detailed description of the agent's role, expertise, and when Claude should invoke it.

## Capabilities
- Specific task the agent excels at
- Another specialized capability
- When to use this agent vs others

## Context and examples
Provide examples of when this agent should be used and what kinds of problems it solves.

```

--------------------------------

### Code Reviewer Subagent Configuration

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

This markdown defines a 'code-reviewer' subagent, specifying its name, description, available tools, and model. It includes detailed instructions for the agent on how to perform code reviews, focusing on identifying critical issues, warnings, and suggestions.

```markdown
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is simple and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

--------------------------------

### Manage MCP Servers using Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/mcp

Commands to manage configured MCP servers, including listing all servers, retrieving details of a specific server, and removing a server. The `/mcp` command within Claude Code can be used to check server status.

```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get github

# Remove a server
claude mcp remove github

# (within Claude Code) Check server status
/mcp
```

--------------------------------

### Reference Files and Directories in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Discover how to use the '@' symbol to quickly reference files and directories within your project. This allows Claude to access their content or structure for analysis and code generation, supporting relative, absolute, and MCP resource paths.

```text
> Explain the logic in @src/utils/auth.js

> What's the structure of @src/components?

> Show me the data from @github:repos/owner/repo/issues
```

--------------------------------

### Plugin Source: Relative Path

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Specifies a plugin located within the same repository using a relative file path. This is a simple way to manage plugins co-located with the main project.

```json
{
  "name": "my-plugin",
  "source": "./plugins/my-plugin"
}
```

--------------------------------

### Authenticate HTTP MCP Servers with OAuth 2.0

Source: https://docs.claude.com/en/docs/claude-code/mcp

Steps for authenticating remote HTTP MCP servers using OAuth 2.0. This involves adding the server, using the `/mcp` command in Claude Code, and following browser-based authentication prompts. Tokens are stored securely and refreshed automatically.

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

```text
> /mcp
```

--------------------------------

### Validate Marketplace JSON Syntax with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command validates the JSON syntax of your marketplace. It ensures that the theme property is correctly set to null. No external dependencies are required beyond the Claude CLI.

```bash
claude plugin validate .
```

--------------------------------

### Create Plugin Development Directory Structure

Source: https://docs.claude.com/en/docs/claude-code/plugins

This bash script creates the necessary directory structure for a local Claude Code plugin development environment. It includes the main development marketplace directory, the plugin's root directory, and subdirectories for plugin components.

```bash
mkdir dev-marketplace
cd dev-marketplace
mkdir my-plugin
```

--------------------------------

### Resume Subagent Programmatically (TypeScript)

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

Demonstrates how to programmatically resume a subagent's execution using the `resume` parameter within a configuration object. This is useful when interacting with the Agent SDK or AgentTool to continue a previous analysis or task.

```typescript
{
  "description": "Continue analysis",
  "prompt": "Now examine the error handling patterns",
  "subagent_type": "code-analyzer",
  "resume": "abc123"  // Agent ID from previous execution
}
```

--------------------------------

### Upgrade from Claude Code GitHub Actions Beta to v1.0

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This section outlines the essential changes required to migrate from the beta version of Claude Code GitHub Actions to the stable v1.0 release. It details how to update the action version, remove deprecated mode configurations, and adjust prompt and argument inputs.

```yaml
# Beta Version (example of changes needed)
# - uses: anthropics/claude-code-action@beta
#   with:
#     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
#     mode: "tag"
#     direct_prompt: "Add unit tests for this file."
#     custom_instructions: "Write concise tests."
#     max_turns: 3
#     model: "claude-instant-1.2"
```

```yaml
# v1.0 Version (updated example)
- uses: anthropics/claude-code-action@v1
  with:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "Add unit tests for this file."
    claude_args: >-
      --max-turns 3
      --model claude-instant-1.2
      --system-prompt "Write concise tests."
```

--------------------------------

### Generate Pull Request (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A direct prompt to have Claude create a pull request based on the current changes. Claude can help draft the title, description, and potentially include related information. Input: Request to create PR. Output: Draft pull request.

```plaintext
> create a pr
```

--------------------------------

### Create Project Skill Directory (Bash)

Source: https://docs.claude.com/en/docs/claude-code/skills

This command creates a directory for a project-specific skill within the current project's root. It ensures the necessary parent directories are in place.

```bash
mkdir -p .claude/skills/my-skill-name
```

--------------------------------

### Claude Code Unified LiteLLM Endpoint Configuration

Source: https://docs.claude.com/en/docs/claude-code/llm-gateway

Configures Claude Code to use LiteLLM's unified endpoint for Anthropic models. This is the recommended approach, providing benefits like load balancing and fallbacks by setting the ANTHROPIC_BASE_URL environment variable.

```bash
export ANTHROPIC_BASE_URL=https://litellm-server:4000
```

--------------------------------

### Add Airtable MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to Airtable using the Model Context Protocol (MCP) via stdio. This command requires the `AIRTABLE_API_KEY` environment variable to be set.

```shell
claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=YOUR_AIRTABLE_API_KEY -- npx -y airtable-mcp-server
```

--------------------------------

### Define Custom Agents with --agents

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Allows dynamic definition of custom sub-agents using a JSON format. This enables users to create specialized agents for tasks like code review by providing a description and a prompt. The JSON structure is defined in the documentation.

```bash
claude --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}'
```

--------------------------------

### Add Project-Scoped MCP Server (HTTP)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Adds an HTTP-transport MCP server named 'paypal' to the project scope. Project-scoped servers are stored in the .mcp.json file at the project root, enabling team collaboration and version control.

```bash
# Add a project-scoped server
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

--------------------------------

### Enable Claude Code Bedrock Integration (Environment Variables)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This snippet shows the environment variables required to enable Claude Code's integration with Amazon Bedrock. It includes enabling Bedrock and setting the AWS region.

```bash
# Enable Bedrock integration
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1  # or your preferred region

# Optional: Override the region for the small/fast model (Haiku)
export ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2
```

--------------------------------

### Add Asana MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to Asana using the Model Context Protocol (MCP) via SSE (Server-Sent Events). Asana MCP servers typically use OAuth for authentication.

```shell
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

--------------------------------

### JSON: Configure PreToolUse Hooks for MCP Tools

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON configuration demonstrates how to set up PreToolUse hooks to interact with Model Context Protocol (MCP) tools. It uses matchers to target specific MCP tools or servers, executing commands or scripts based on the tool being used.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation initiated' >> ~/mcp-operations.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Custom Proxy Configuration (JSON)

Source: https://docs.claude.com/en/docs/claude-code/sandboxing

This JSON snippet demonstrates how to configure custom network proxy settings within the sandbox environment. It specifies ports for HTTP and SOCKS proxies, allowing for advanced network traffic inspection and filtering. Ensure these ports are accessible and configured correctly in your network.

```json
{
  "sandbox": {
    "network": {
      "httpProxyPort": 8080,
      "socksProxyPort": 8081
    }
  }
}
```

--------------------------------

### Add Claude to Build Scripts (JSON)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Integrate Claude Code into your build process by adding a script to your package.json file. This allows Claude to act as a linter or code reviewer, checking changes against a main branch and reporting issues.

```json
{
    ...
    "scripts": {
        ...
        "lint:claude": "claude -p 'you are a linter. please look at the changes vs. main and report any issues related to typos. report the filename and line number on one line, and a description of the issue on the second line. do not return any other text.'"
    }
}
```

--------------------------------

### Configure GitLab CI/CD for AWS Bedrock

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This snippet shows the GitLab CI/CD variables required for integrating with AWS Bedrock. It assumes that GitLab has been configured as an OIDC identity provider in AWS IAM, and an IAM role with Bedrock permissions has been created. These variables facilitate the assumption of the IAM role by GitLab CI jobs to access AWS Bedrock services without static keys.

```yaml
variables:
  AWS_ROLE_TO_ASSUME: "arn:aws:iam::123456789012:role/YourGitLabRole"
  AWS_REGION: "us-east-1"
```

--------------------------------

### CLI Subagent Configuration with JSON

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

Defines subagents dynamically using the `--agents` CLI flag, which accepts a JSON object. This method is useful for quick testing, session-specific agents, or automation scripts. CLI-defined agents have lower priority than project-level agents but higher than user-level agents.

```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

--------------------------------

### Claude Code Provider-Specific Pass-through Endpoints (LiteLLM)

Source: https://docs.claude.com/en/docs/claude-code/llm-gateway

Configures Claude Code to use provider-specific pass-through endpoints via LiteLLM. This allows direct access to models like Claude API, Amazon Bedrock, and Google Vertex AI through LiteLLM, requiring specific base URLs and potentially skipping authentication for certain providers.

```bash
# Claude API through LiteLLM
export ANTHROPIC_BASE_URL=https://litellm-server:4000/anthropic
```

```bash
# Amazon Bedrock through LiteLLM
export ANTHROPIC_BEDROCK_BASE_URL=https://litellm-server:4000/bedrock
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1
export CLAUDE_CODE_USE_BEDROCK=1
```

```bash
# Google Vertex AI through LiteLLM
export ANTHROPIC_VERTEX_BASE_URL=https://litellm-server:4000/vertex_ai/v1
export ANTHROPIC_VERTEX_PROJECT_ID=your-gcp-project-id
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
```

--------------------------------

### Claude CLI: Custom Agent Configuration with JSON

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Shows how to define and configure custom subagents for the Claude CLI using a JSON object. This allows for specialized agent behavior with custom descriptions, system prompts, tool selections, and model choices.

```bash
claude --agents '{ "code-reviewer": { "description": "Expert code reviewer. Use proactively after code changes.", "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.", "tools": ["Read", "Grep", "Glob", "Bash"], "model": "sonnet" }, "debugger": { "description": "Debugging specialist for errors and test failures.", "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes.", "model": "sonnet" } }'
```

--------------------------------

### Configure GitLab CI/CD for Google Vertex AI

Source: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd

This snippet details the GitLab CI/CD variables needed for integrating with Google Vertex AI using Workload Identity Federation (WIF). It requires a Google Cloud project with Vertex AI API enabled and WIF configured to trust GitLab OIDC. These variables allow GitLab CI jobs to impersonate a dedicated service account, enabling access to Vertex AI without hardcoding credentials.

```yaml
variables:
  GCP_WORKLOAD_IDENTITY_PROVIDER: "projects/your-project-number/locations/global/workloadIdentityPools/your-pool-id/providers/your-provider-id"
  GCP_SERVICE_ACCOUNT: "your-service-account@your-project-id.iam.gserviceaccount.com"
  CLOUD_ML_REGION: "us-east5"
```

--------------------------------

### Categorize Servers by Category (JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Groups filtered servers into categories using the reduce method. It initializes an empty object and populates it with servers, creating new arrays for each category if they don't exist. This is useful for organizing servers for display.

```javascript
const filteredServers = [
  {
    category: "Development & Testing Tools",
    name: "GitHub",
    description: "Version control hosting service.",
    documentation: "https://github.com/docs",
    availability: {
      claudeCode: true,
      mcpConnector: true,
      claudeDesktop: false
    },
    urls: {
      http: "https://github.com"
    }
  },
  {
    category: "Project Management & Documentation",
    name: "JIRA",
    description: "Issue and project tracking software.",
    documentation: "https://www.atlassian.com/software/jira/docs",
    availability: {
      claudeCode: true,
      mcpConnector: false,
      claudeDesktop: false
    },
    urls: {
      http: "https://www.atlassian.com/software/jira"
    }
  }
];

const serversByCategory = filteredServers.reduce((acc, server) => {
  if (!acc[server.category]) {
    acc[server.category] = [];
  }
  acc[server.category].push(server);
  return acc;
}, {});

console.log(serversByCategory);
```

--------------------------------

### Configure Prometheus Telemetry Exporter (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry for Claude Code and sets the metrics exporter to 'prometheus'. This allows Prometheus to scrape metrics exposed by Claude Code. Ensure CLAUDE_CODE_ENABLE_TELEMETRY is set to '1' to activate telemetry.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=prometheus
```

--------------------------------

### Verify Code Documentation Standards (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to ask Claude to check if the generated or existing documentation adheres to project-specific standards. This ensures consistency and quality. Input: Request to verify standards. Output: Feedback on documentation compliance.

```plaintext
> check if the documentation follows our project standards
```

--------------------------------

### Add Figma MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to Figma using the Model Context Protocol (MCP) via HTTP. This uses a specific remote MCP server URL provided by Figma.

```shell
claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp
```

--------------------------------

### Add Intercom MCP Server (Shell)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Command to connect Claude Code to Intercom using the Model Context Protocol (MCP) via HTTP. Authentication is typically handled via OAuth.

```shell
claude mcp add --transport http intercom https://mcp.intercom.com/mcp
```

--------------------------------

### Create and Manage Git Worktrees for Parallel Sessions

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Commands for managing Git worktrees to isolate parallel Claude Code sessions. This includes creating new worktrees for branches, running Claude within them, and listing or removing worktrees.

```bash
# Create a new worktree with a new branch 
git worktree add ../project-feature-a -b feature-a

# Or create a worktree with an existing branch
git worktree add ../project-bugfix bugfix-123

```

```bash
# Navigate to your worktree 
cd ../project-feature-a

# Run Claude Code in this isolated environment
claude

```

```bash
cd ../project-bugfix
claude

```

```bash
# List all worktrees
git worktree list

# Remove a worktree when done
git worktree remove ../project-feature-a

```

--------------------------------

### Set Output Token Limits for Claude Code (Bash)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

Configure recommended output token settings for Claude Code when using Amazon Bedrock. This includes setting maximum output tokens and thinking tokens to manage cost, prevent truncation, and ensure focused reasoning.

```bash
# Recommended output token settings for Bedrock
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096
export MAX_THINKING_TOKENS=1024
```

--------------------------------

### Add Remote Marketplace JSON via URL

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Adds a `marketplace.json` file from a remote URL as a plugin marketplace. This enables referencing marketplaces hosted directly via a URL.

```shell
/plugin marketplace add https://url.of/marketplace.json
```

--------------------------------

### Configure Google Vertex AI with Corporate Proxy

Source: https://docs.claude.com/en/docs/claude-code/bedrock-vertex-proxies

This configuration directs Google Vertex AI traffic through a corporate proxy. It involves enabling Vertex AI, setting the cloud ML region, project ID, and the corporate proxy environment variables.

```shell
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id

# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'

```

--------------------------------

### Configure Amazon Bedrock with LLM Gateway

Source: https://docs.claude.com/en/docs/claude-code/bedrock-vertex-proxies

This configuration enables Claude Code to use Amazon Bedrock through an LLM Gateway service. It involves enabling Bedrock and specifying the gateway's base URL. The `CLAUDE_CODE_SKIP_BEDROCK_AUTH` flag can be used if the gateway handles AWS authentication.

```shell
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1

# Configure LLM gateway
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # If gateway handles AWS auth

```

--------------------------------

### Plugin Manifest Schema (plugin.json) for Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Defines the structure for a plugin.json file, specifying metadata like name, version, description, author, and repository. It also includes fields for commands, agents, hooks, and MCP server configurations, using paths relative to the plugin root.

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json"
}
```

--------------------------------

### Filter Servers by Platform (JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Filters a list of servers based on the specified platform (claudeCode, mcpConnector, claudeDesktop, or all). It throws an error for unknown platforms. This function is crucial for selecting the correct servers for a given environment.

```javascript
const servers = [
  {
    category: "Development & Testing Tools",
    name: "GitHub",
    description: "Version control hosting service.",
    documentation: "https://github.com/docs",
    availability: {
      claudeCode: true,
      mcpConnector: true,
      claudeDesktop: false
    },
    urls: {
      http: "https://github.com"
    }
  },
  {
    category: "Project Management & Documentation",
    name: "JIRA",
    description: "Issue and project tracking software.",
    documentation: "https://www.atlassian.com/software/jira/docs",
    availability: {
      claudeCode: true,
      mcpConnector: false,
      claudeDesktop: false
    },
    urls: {
      http: "https://www.atlassian.com/software/jira"
    }
  }
];

const platform = "claudeCode"; // or "mcpConnector", "claudeDesktop", "all"

const filteredServers = servers.filter(server => {
  if (platform === "claudeCode") {
    return server.availability.claudeCode;
  } else if (platform === "mcpConnector") {
    return server.availability.mcpConnector;
  } else if (platform === "claudeDesktop") {
    return server.availability.claudeDesktop;
  } else if (platform === "all") {
    return true;
  } else {
    throw new Error(`Unknown platform: ${platform}`);
  }
});

console.log(filteredServers);
```

--------------------------------

### Summarize Code Changes (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to generate a summary of modifications made to a specific module. This is useful for understanding the scope of changes before creating a pull request. Input: Module name. Output: Summary of changes.

```plaintext
> summarize the changes I've made to the authentication module
```

--------------------------------

### Iterate on Plugin: Uninstall and Reinstall

Source: https://docs.claude.com/en/docs/claude-code/plugins

These bash commands are used to uninstall and then reinstall a plugin in Claude Code. This process is essential for testing changes made to the plugin code during the development cycle.

```bash
/plugin uninstall my-plugin@dev-marketplace
```

```bash
/plugin install my-plugin@dev-marketplace
```

--------------------------------

### Configure Console Telemetry Exporter (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This configuration enables telemetry for Claude Code and sets the metrics exporter to 'console' with a 1-second export interval. This is useful for debugging purposes, allowing you to see metrics printed to the console periodically. Ensure CLAUDE_CODE_ENABLE_TELEMETRY is set to '1' to activate telemetry.

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console
export OTEL_METRIC_EXPORT_INTERVAL=1000
```

--------------------------------

### Configure AWS Credentials with Environment Variables (Access Key)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This snippet demonstrates setting AWS access key, secret key, and session token using environment variables. This method is useful for scripting and automated environments.

```bash
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
export AWS_SESSION_TOKEN=your-session-token
```

--------------------------------

### Enable a Disabled Plugin in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command re-enables a plugin that has been previously disabled without being uninstalled. It requires the plugin name and the marketplace it originates from. This is useful for temporarily deactivating plugins. The `theme={null}` parameter is a placeholder.

```shell
/plugin enable plugin-name@marketplace-name
```

--------------------------------

### Configure AWS Credentials with AWS CLI

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This snippet shows how to configure AWS credentials using the AWS Command Line Interface. It's a common method for setting up authentication for AWS services.

```bash
aws configure
```

--------------------------------

### Interactive Subagent Management with /agents Command

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

The /agents command provides a user-friendly, interactive interface for managing all types of subagents within Claude Code. It allows viewing, creating, editing, and deleting subagents, as well as managing their tool permissions. This is the recommended method for subagent management.

```text
/agents
```

--------------------------------

### AWS Bedrock GitHub Actions Workflow for Claude

Source: https://docs.claude.com/en/docs/claude-code/github-actions

This YAML workflow configures GitHub Actions to interact with Claude models through AWS Bedrock. It requires AWS credentials, a GitHub App token, and specifies using Bedrock for inference. The workflow triggers on issue comments, review comments, and issue openings.

```yaml
name: Claude PR Action

permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]

jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    env:
      AWS_REGION: us-west-2
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}

      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: us-west-2

      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          use_bedrock: "true"
          claude_args: '--model us.anthropic.claude-sonnet-4-5-20250929-v1:0 --max-turns 10'

```

--------------------------------

### Plugin Source: Git Repository URL

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Specifies a plugin from a Git repository using its URL. The 'source' is set to 'url' and the 'url' field provides the direct link to the repository.

```json
{
  "name": "git-plugin",
  "source": {
    "source": "url",
    "url": "https://gitlab.com/team/plugin.git"
  }
}
```

--------------------------------

### Update a Skill File

Source: https://docs.claude.com/en/docs/claude-code/skills

These commands open the `SKILL.md` file for a personal or project Skill in your default code editor. Direct editing of `SKILL.md` is the primary way to update a Skill's description, tools, and other configurations.

```bash
# Personal Skill
code ~/.claude/skills/my-skill/SKILL.md

# Project Skill
code .claude/skills/my-skill/SKILL.md
```

--------------------------------

### Hook Configuration (JSON)

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Configures event hooks for Claude Code plugins. This JSON structure defines a 'PostToolUse' event that triggers a shell command script to format code when a 'Write' or 'Edit' action is detected.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}

```

--------------------------------

### Set Custom Resource Attributes for Team Identification (Bash)

Source: https://docs.claude.com/en/docs/claude-code/monitoring-usage

This snippet demonstrates how to export the OTEL_RESOURCE_ATTRIBUTES environment variable in bash. These attributes help in filtering metrics, tracking costs, and creating team-specific dashboards. The variable must follow W3C Baggage specification, using comma-separated key=value pairs with no spaces in values and adhering to allowed ASCII characters.

```bash
export OTEL_RESOURCE_ATTRIBUTES="department=engineering,team.id=platform,cost_center=eng-123"
```

--------------------------------

### Add Testing Details to PR (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to include information about how code changes were tested within the pull request description. This provides assurance to reviewers. Input: Request to add testing details. Output: PR description with testing information.

```plaintext
> add information about how these changes were tested
```

--------------------------------

### Create Personal Skill Directory (Bash)

Source: https://docs.claude.com/en/docs/claude-code/skills

This command creates a directory for a personal skill in the user's home directory. It ensures the parent directories exist before creating the skill directory.

```bash
mkdir -p ~/.claude/skills/my-skill-name
```

--------------------------------

### Plugin Source: GitHub Repository

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

Defines a plugin hosted on GitHub. The 'source' field specifies 'github' and the 'repo' field contains the 'owner/plugin-repo' identifier.

```json
{
  "name": "github-plugin",
  "source": {
    "source": "github",
    "repo": "owner/plugin-repo"
  }
}
```

--------------------------------

### Add Remote HTTP MCP Server using Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/mcp

Configure a connection to a remote MCP server using the HTTP transport. This is the recommended method for cloud-based services. It requires the server name and URL, and optionally accepts authentication headers.

```bash
# Basic syntax
claude mcp add --transport http <name> <url>

# Real example: Connect to Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Example with Bearer token
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

--------------------------------

### YAML: Multi-file Skill Metadata

Source: https://docs.claude.com/en/docs/claude-code/skills

Metadata for a multi-file Claude Skill named 'pdf-processing'. It includes the Skill's name, description, required packages, and indicates the presence of associated files like FORMS.md, REFERENCE.md, and scripts.

```yaml
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Use when working with PDF files, forms, or document extraction. Requires pypdf and pdfplumber packages.
---

# PDF Processing
```

--------------------------------

### Configure Amazon Bedrock with Corporate Proxy

Source: https://docs.claude.com/en/docs/claude-code/bedrock-vertex-proxies

This snippet shows how to set up Claude Code to use Amazon Bedrock while routing traffic through a corporate HTTP/HTTPS proxy. It requires enabling Bedrock and setting the proxy environment variables.

```shell
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1

# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'

```

--------------------------------

### Configure Bedrock with Corporate Proxy in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/third-party-integrations

Enables Claude Code to route traffic through a corporate HTTP/HTTPS proxy when using Amazon Bedrock. Requires setting environment variables for Bedrock enablement, AWS region, and proxy configuration.

```bash
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1

# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```

--------------------------------

### Automated Security Audit for Pull Requests (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

This script audits pull requests for security vulnerabilities using the Claude CLI. It pipes the `gh pr diff` output to `claude` with specific system prompts and tool configurations. The output is saved to a JSON file.

```bash
# Security audit agent for pull requests
audit_pr() {
    local pr_number="$1"

    gh pr diff "$pr_number" | claude -p \
      --append-system-prompt "You are a security engineer. Review this PR for vulnerabilities, insecure patterns, and compliance issues."
      --output-format json \
      --allowedTools "Read,Grep,WebSearch"
}

# Usage and save to file
audit_pr 123 > security-report.json

```

--------------------------------

### Plugin Version Management with Semantic Versioning

Source: https://docs.claude.com/en/docs/claude-code/plugins-reference

Adhere to semantic versioning (SemVer) for Claude plugin releases. This includes MAJOR.MINOR.PATCH format, where changes to incompatible APIs increment MAJOR, new features increment MINOR, and backward-compatible bug fixes increment PATCH.

```json
{
  "version": "1.0.0"
}
```

--------------------------------

### Bash: YAML Validation and File Checks

Source: https://docs.claude.com/en/docs/claude-code/skills

Bash commands for troubleshooting Claude Skills. Includes checking Skill file locations, viewing frontmatter, and verifying YAML syntax for common errors.

```bash
# View frontmatter
cat .claude/skills/my-skill/SKILL.md | head -n 15

# Check for common issues
# - Missing opening or closing ---
# - Tabs instead of spaces
# - Unquoted strings with special characters
```

```bash
# Personal Skills
ls ~/.claude/skills/*/SKILL.md

# Project Skills
ls .claude/skills/*/SKILL.md
```

--------------------------------

### Generate Test Scaffolding (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to request Claude to generate boilerplate code for tests for a given service. This accelerates the process of writing new tests by providing a basic structure. Input: Service name. Output: Test scaffolding code.

```plaintext
> add tests for the notification service
```

--------------------------------

### Configure Vertex AI with Corporate Proxy in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/third-party-integrations

Directs Claude Code traffic for Google Vertex AI through a corporate HTTP/HTTPS proxy. This involves enabling Vertex AI, specifying the Google Cloud region and project ID, and setting the proxy environment variables.

```bash
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id

# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```

--------------------------------

### Increase MCP Output Token Limit (Bash)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Demonstrates how to increase the maximum token limit for MCP tool outputs by setting the MAX_MCP_OUTPUT_TOKENS environment variable. This is useful for tools that generate large amounts of data, such as database queries or detailed reports. After setting the variable, run the `claude` command.

```bash
# Set a higher limit for MCP tool outputs
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

--------------------------------

### Claude Code Static API Key Configuration

Source: https://docs.claude.com/en/docs/claude-code/llm-gateway

Configures Claude Code to use a static API key for authentication with an LLM gateway. This is the simplest method, setting the ANTHROPIC_AUTH_TOKEN environment variable or within Claude Code's settings.

```bash
# Set in environment
export ANTHROPIC_AUTH_TOKEN=sk-litellm-static-key
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-litellm-static-key"
  }
}
```

--------------------------------

### Define a Custom Slash Command (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Create a Markdown file within the `.claude/commands` directory to define a custom slash command. The content of the Markdown file serves as the prompt for Claude when the command is invoked.

```bash
echo "Analyze the performance of this code and suggest three specific optimizations:" > .claude/commands/optimize.md
```

--------------------------------

### Identify Untested Code (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to instruct Claude to find functions within a specified file that lack corresponding tests. This helps in identifying areas of the codebase that need test coverage. Input: Swift file name. Output: List of functions without tests.

```plaintext
> find functions in NotificationsService.swift that are not covered by tests
```

--------------------------------

### Project-Specific Hook using CLAUDE_PROJECT_DIR

Source: https://docs.claude.com/en/docs/claude-code/hooks

Demonstrates how to use the CLAUDE_PROJECT_DIR environment variable to reference project-specific hook scripts. This ensures scripts can be found regardless of Claude's current working directory.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/check-style.sh"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Generate JSON Output from Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This command uses the Claude CLI to query information and specifies the output format as JSON. The JSON output includes metadata about the request and the result. It's useful for programmatic parsing of Claude's responses.

```bash
claude -p "How does the data layer work?" --output-format json
```

--------------------------------

### SRE Incident Response Bot with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This bash script defines a function `investigate_incident` that uses the Claude CLI to diagnose issues. It takes incident description and severity as input, appends a system prompt for an SRE expert, and specifies allowed tools and an MCP configuration for monitoring.

```bash
#!/bin/bash

# Automated incident response agent
investigate_incident() {
    local incident_description="$1"
    local severity="${2:-medium}"

    claude -p "Incident: $incident_description (Severity: $severity)" \
      --append-system-prompt "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items." \
      --output-format json \
      --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
      --mcp-config monitoring-tools.json
}

# Usage
investigate_incident "Payment API returning 500 errors" "high"
```

--------------------------------

### Custom Output Style Markdown Structure

Source: https://docs.claude.com/en/docs/claude-code/output-styles

This is a template for creating a custom output style using Markdown. It includes metadata like the style's name and description, followed by custom instructions and specific behaviors for the assistant.

```markdown
```markdown  theme={null}
---
name: My Custom Style
description:
  A brief description of what this style does, to be displayed to the user
---

# Custom Style Instructions

You are an interactive CLI tool that helps users with software engineering
tasks. [Your custom instructions here...]

## Specific Behaviors

[Define how the assistant should behave in this style...]
```
```

--------------------------------

### Configure File Read Deny Permissions in JSON

Source: https://docs.claude.com/en/docs/claude-code/settings

This JSON configuration snippet demonstrates how to set file read deny rules within the 'permissions' object. It specifies patterns for files and directories that Claude Code should not be able to read, helping to protect sensitive information.

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Read(./build)"
    ]
  }
}
```

--------------------------------

### Set Model with --model

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Specifies the language model to be used for the current session. Users can provide an alias for the latest model (e.g., 'sonnet', 'opus') or the model's full name for precise control.

```bash
claude --model claude-sonnet-4-5-20250929
```

--------------------------------

### Configure Proxy with Basic Authentication (Bash)

Source: https://docs.claude.com/en/docs/claude-code/network-config

Configures the HTTPS_PROXY environment variable to include basic authentication credentials (username and password) for proxy servers that require it. This allows Claude Code to authenticate with the proxy during connection attempts.

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

--------------------------------

### Explicit Subagent Invocation in Commands

Source: https://docs.claude.com/en/docs/claude-code/sub-agents

This demonstrates how to explicitly request a specific subagent to perform a task by mentioning its name in your command prompt. This allows for targeted use of subagent capabilities when needed.

```text
> Use the test-runner subagent to fix failing tests
> Have the code-reviewer subagent look at my recent changes
> Ask the debugger subagent to investigate this error
```

--------------------------------

### AWS Credential Export Format for Bedrock

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This JSON snippet defines the required output format for the `awsCredentialExport` command when directly returning AWS credentials. It must include AccessKeyId, SecretAccessKey, and SessionToken.

```json
{
  "Credentials": {
    "AccessKeyId": "value",
    "SecretAccessKey": "value",
    "SessionToken": "value"
  }
}
```

--------------------------------

### Generate Claude Code MCP Server Commands (JavaScript)

Source: https://docs.claude.com/en/docs/claude-code/mcp

This JavaScript function generates `claude mcp add` commands for connecting to various MCP servers. It handles different transport protocols (HTTP, SSE, stdio) and authentication methods. The function determines the appropriate command based on server configuration, falling back to default protocols if custom commands are not specified.

```javascript
export const MCPServersTable = ({platform = "all"}) => {
  const generateClaudeCodeCommand = server => {
    if (server.customCommands && server.customCommands.claudeCode) {
      return server.customCommands.claudeCode;
    }
    if (server.urls.http) {
      return `claude mcp add --transport http ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')} ${server.urls.http}`;
    }
    if (server.urls.sse) {
      return `claude mcp add --transport sse ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')} ${server.urls.sse}`;
    }
    if (server.urls.stdio) {
      const envFlags = server.authentication && server.authentication.envVars ? server.authentication.envVars.map(v => `--env ${v}=YOUR_${v.split('_').pop()}`).join(' ') : '';
      const baseCommand = `claude mcp add --transport stdio ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      return envFlags ? `${baseCommand} ${envFlags} -- ${server.urls.stdio}` : `${baseCommand} -- ${server.urls.stdio}`;
    }
    return null;
  };
  const servers = [/* ... server configurations ... */];
  // ... rest of the component logic
};
```

--------------------------------

### Add Edge Case Test Cases (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to instruct Claude to add test cases that specifically cover edge conditions and potential error scenarios for a given service. This aims to improve test robustness. Input: Service name. Output: Additional test cases.

```plaintext
> add test cases for edge conditions in the notification service
```

--------------------------------

### Configure AWS Credentials with Environment Variables (SSO Profile)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This snippet shows how to log in using an AWS SSO profile and set the AWS_PROFILE environment variable. This is suitable for organizations using AWS Single Sign-On.

```bash
aws sso login --profile=<your-profile-name>

export AWS_PROFILE=your-profile-name
```

--------------------------------

### Uninstall a Plugin in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command completely removes a plugin and all its associated files from your Claude Code environment. It requires the plugin name and its marketplace. Use this when a plugin is no longer needed. The `theme={null}` parameter is a placeholder.

```shell
/plugin uninstall plugin-name@marketplace-name
```

--------------------------------

### Configure HTTPS Proxy with Environment Variables (Bash)

Source: https://docs.claude.com/en/docs/claude-code/network-config

Sets the HTTPS_PROXY environment variable to route network traffic through a specified proxy server. This is the recommended method for secure communication. It also shows how to configure HTTP_PROXY as a fallback and NO_PROXY for excluding specific hosts or domains.

```bash
export HTTPS_PROXY=https://proxy.example.com:8080

export HTTP_PROXY=http://proxy.example.com:8080

export NO_PROXY="localhost 192.168.1.1 example.com .example.com"
export NO_PROXY="localhost,192.168.1.1,example.com,.example.com"
export NO_PROXY="*"
```

--------------------------------

### Configure AWS Bedrock API Key Authentication

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This snippet shows how to set the AWS_BEARER_TOKEN_BEDROCK environment variable for authentication using Bedrock API keys. This offers a simplified authentication method.

```bash
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
```

--------------------------------

### Control Claude Output Format (Bash)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Manage the output format of Claude's responses for script integration. Options include plain text, a structured JSON array of messages, and a real-time streaming JSON format.

```bash
cat data.txt | claude -p 'summarize this data' --output-format text > summary.txt
```

```bash
cat code.py | claude -p 'analyze this code for bugs' --output-format json > analysis.json
```

```bash
cat log.txt | claude -p 'parse this log file for errors' --output-format stream-json
```

--------------------------------

### Configure Claude Code Model and Caching (Bash)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

Set environment variables to specify the Claude Code model to use, either by its inference profile ID or ARN. Optionally, disable prompt caching if it's not needed or available in your region.

```bash
export ANTHROPIC_MODEL='global.anthropic.claude-sonnet-4-5-20250929-v1:0'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'

# Using application inference profile ARN
export ANTHROPIC_MODEL='arn:aws:bedrock:us-east-2:your-account-id:application-inference-profile/your-model-id'

# Optional: Disable prompt caching if needed
export DISABLE_PROMPT_CACHING=1
```

--------------------------------

### Bash Mode Command Execution with '!' Prefix

Source: https://docs.claude.com/en/docs/claude-code/interactive-mode

Execute bash commands directly within Claude Code by prefixing the command with '!'. This mode adds the command and its output to the conversation context, shows real-time progress, and supports backgrounding. It's useful for quick shell operations while maintaining context.

```bash
! npm test
! git status
! ls -la
```

--------------------------------

### Add Working Directories with --add-dir

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Specifies additional directories for Claude Code to access during its operation. The tool validates that each provided path exists and is a directory before proceeding. This is useful for projects with code spread across multiple locations.

```bash
claude --add-dir ../apps ../lib
```

--------------------------------

### Claude CLI: Permission and Session Management Flags

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Demonstrates common command-line flags for the Claude CLI, such as setting permission modes, resuming sessions, and controlling permission prompts. These commands are used for interacting with Claude's features directly from the terminal.

```bash
claude --permission-mode plan
claude -p --permission-prompt-tool mcp_auth_tool "query"
claude --resume abc123 "query"
claude --continue
claude --dangerously-skip-permissions
claude --output-format json
```

--------------------------------

### Include Partial Messages with --include-partial-messages

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Enables the inclusion of partial streaming events in the output. This option requires both `--print` and `--output-format=stream-json` to be set and is useful for observing the streaming process.

```bash
claude -p --output-format stream-json --include-partial-messages "query"
```

--------------------------------

### Provide Text Input to Claude CLI via Stdin

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

Send commands to Claude Code via standard input (stdin) using pipes. This method is convenient for passing script output or predefined commands directly to the CLI without using command-line arguments.

```bash
# Direct argument
claude -p "Explain this code"

# From stdin
echo "Explain this code" | claude -p
```

--------------------------------

### IAM Policy for Claude Code on Bedrock (JSON)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

Define an IAM policy that grants Claude Code the necessary permissions to interact with Amazon Bedrock models and inference profiles, as well as AWS Marketplace for subscriptions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowModelAndInferenceProfileAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:ListInferenceProfiles"
      ],
      "Resource": [
        "arn:aws:bedrock:*:*:inference-profile/*",
        "arn:aws:bedrock:*:*:application-inference-profile/*",
        "arn:aws:bedrock:*:*:foundation-model/*"
      ]
    },
    {
      "Sid": "AllowMarketplaceSubscription",
      "Effect": "Allow",
      "Action": [
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:Subscribe"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:CalledViaLast": "bedrock.amazonaws.com"
        }
      }
    }
  ]
}
```

--------------------------------

### JSON Input Structure for Status Line Scripts

Source: https://docs.claude.com/en/docs/claude-code/statusline

Illustrates the JSON data structure passed to custom status line scripts via stdin. This data includes session details, model information, workspace context, and cost metrics.

```json
{
  "hook_event_name": "Status",
  "session_id": "abc123...",
  "transcript_path": "/path/to/transcript.json",
  "cwd": "/current/working/directory",
  "model": {
    "id": "claude-opus-4-1",
    "display_name": "Opus"
  },
  "workspace": {
    "current_dir": "/current/working/directory",
    "project_dir": "/original/project/directory"
  },
  "version": "1.0.80",
  "output_style": {
    "name": "default"
  },
  "cost": {
    "total_cost_usd": 0.01234,
    "total_duration_ms": 45000,
    "total_api_duration_ms": 2300,
    "total_lines_added": 156,
    "total_lines_removed": 23
  }
}
```

--------------------------------

### Resume Previous Claude Code Conversations

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Commands to resume previous Claude Code conversations. Use `--continue` for the most recent one or `--resume` to pick from a list. The `--print` flag can be used with `--continue` for non-interactive mode.

```bash
claude --continue

```

```bash
claude --continue --print "Continue with my task"

```

```bash
claude --resume

```

```bash
# Continue most recent conversation
claude --continue

# Continue most recent conversation with a specific prompt
claude --continue --print "Show me our progress"

# Show conversation picker
claude --resume

# Continue most recent conversation in non-interactive mode
claude --continue --print "Run the tests again"

```

--------------------------------

### Replace System Prompt with --system-prompt

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

This flag completely replaces the default system prompt with custom instructions. It is available in both Interactive and Print modes. Use this when you need full control over Claude's behavior.

```bash
claude --system-prompt "You are a Python expert who only writes type-annotated code"
```

--------------------------------

### Automated Security Review with Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This bash script defines an `audit_pr` function to perform security audits on pull requests using the Claude CLI. It pipes the diff of a PR to Claude, with a system prompt instructing it to act as a security engineer and review for vulnerabilities. It specifies allowed tools for analysis.

```bash
# Security audit agent for pull requests
audit_pr() {
    local pr_number="$1"

    gh pr diff "$pr_number" | claude -p \
      --append-system-prompt "You are a security engineer. Review this PR for vulnerabilities, insecure patterns, and compliance issues." \
      --output-format json \
      --allowedTools "Read,Grep,WebSearch"
}

# Usage and save to file
audit_pr 123 > security-report.json
```

--------------------------------

### Add Custom Command to Plugin (Bash)

Source: https://docs.claude.com/en/docs/claude-code/plugins

This bash command creates a new markdown file within the 'commands' directory to define a custom slash command for the plugin. It includes a description and a title for the command.

```bash
mkdir commands
cat > commands/hello.md << 'EOF'
---
description: Greet the user with a personalized message
---

# Hello Command

Greet the user warmly and ask how you can help them today. Make the greeting personal and encouraging.
EOF
```

--------------------------------

### Python: Auto-Approve Documentation File Reads in PreToolUse Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks

This Python script shows how to automatically approve specific tool calls in a PreToolUse hook using JSON output. It targets 'Read' tool calls for files with documentation extensions (.md, .mdx, .txt, .json), approving them with a reason and suppressing output.

```python
#!/usr/bin/env python3
import json
import sys

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# Example: Auto-approve file reads for documentation files
if tool_name == "Read":
    file_path = tool_input.get("file_path", "")
    if file_path.endswith((".md", ".mdx", ".txt", ".json")):
        # Use JSON output to auto-approve the tool call
        output = {
            "decision": "approve",
            "reason": "Documentation file auto-approved",
            "suppressOutput": True  # Don't show in transcript mode
        }
        print(json.dumps(output))
        sys.exit(0)

# For other cases, let the normal permission flow proceed
sys.exit(0)
```

--------------------------------

### Update Marketplace Metadata (Shell)

Source: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces

This command refreshes the metadata for a specific marketplace, identified by 'marketplace-name'. It updates plugin listings and related information from the marketplace's source, ensuring you have the latest available plugins.

```shell
/plugin marketplace update marketplace-name
```

--------------------------------

### Add Remote SSE MCP Server using Claude CLI (Deprecated)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Configure a connection to a remote MCP server using the SSE (Server-Sent Events) transport. This method is deprecated and HTTP servers should be preferred. It requires the server name and URL, and can include authentication headers.

```bash
# Basic syntax
claude mcp add --transport sse <name> <url>

# Real example: Connect to Asana
claude mcp add --transport sse asana https://mcp.asana.com/sse

# Example with authentication header
claude mcp add --transport sse private-api https://api.company.com/sse \
  --header "X-API-Key: your-key-here"
```

--------------------------------

### Enhance Pull Request Description (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to refine an existing pull request description by adding more context, such as security improvements. This helps in communicating the value of the changes effectively. Input: Request to enhance description. Output: Improved PR description.

```plaintext
> enhance the PR description with more context about the security improvements
```

--------------------------------

### Configure mTLS Authentication (Bash)

Source: https://docs.claude.com/en/docs/claude-code/network-config

Sets environment variables for mutual Transport Layer Security (mTLS) authentication. CLAUDE_CODE_CLIENT_CERT specifies the client certificate, CLAUDE_CODE_CLIENT_KEY specifies the private key, and CLAUDE_CODE_CLIENT_KEY_PASSPHRASE is used for encrypted private keys, enabling secure client authentication with the server.

```bash
export CLAUDE_CODE_CLIENT_CERT=/path/to/client-cert.pem
export CLAUDE_CODE_CLIENT_KEY=/path/to/client-key.pem
export CLAUDE_CODE_CLIENT_KEY_PASSPHRASE="your-passphrase"
```

--------------------------------

### Append to System Prompt with --append-system-prompt

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

This flag appends custom instructions to the default system prompt, preserving Claude Code's built-in capabilities. It is available in both Interactive and Print modes and is recommended for most use cases.

```bash
claude --append-system-prompt "Always use TypeScript and include JSDoc comments"
```

--------------------------------

### Configure JSON Hooks Structure

Source: https://docs.claude.com/en/docs/claude-code/hooks

Defines the basic structure for configuring hooks in JSON format. This includes specifying events, matchers for tool names, and the type of hook (command or prompt) with associated commands or prompts.

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### View Specific Skill Content

Source: https://docs.claude.com/en/docs/claude-code/skills

This bash command displays the content of a specific Skill's `SKILL.md` file. It's essential for inspecting the metadata and functionality of a Skill, especially when debugging or understanding its purpose.

```bash
cat ~/.claude/skills/my-skill/SKILL.md
```

--------------------------------

### Update Type Names in Python for Claude Agent SDK

Source: https://docs.claude.com/en/docs/claude-code/sdk/migration-guide

Demonstrates how to update type names in Python code, specifically changing 'ClaudeCodeOptions' to 'ClaudeAgentOptions' when migrating to the Claude Agent SDK. This ensures compatibility with the new SDK version.

```python
# Before
from claude_code_sdk import query, ClaudeCodeOptions

options = ClaudeCodeOptions(
    model="claude-sonnet-4-5"
)

# After
from claude_agent_sdk import query, ClaudeAgentOptions

options = ClaudeAgentOptions(
    model="claude-sonnet-4-5"
)
```

--------------------------------

### Continuing and Resuming Conversations with Bash

Source: https://docs.claude.com/en/docs/claude-code/headless

Shows how to manage multi-turn conversations in headless mode. This includes continuing the most recent session or resuming a specific conversation using its session ID, with options for non-interactive continuation.

```bash
# Continue the most recent conversation
claude --continue "Now refactor this for better performance"

# Resume a specific conversation by session ID
claude --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"

# Resume in non-interactive mode
claude --resume 550e8400-e29b-41d4-a716-446655440000 "Fix all linting issues" --no-interactive
```

--------------------------------

### Add Local-Scoped MCP Server (HTTP)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Adds an HTTP-transport MCP server named 'stripe' to the local scope. This is the default scope for servers, typically used for personal or project-specific configurations not intended for sharing.

```bash
# Add a local-scoped server (default)
claude mcp add --transport http stripe https://mcp.stripe.com

# Explicitly specify local scope
claude mcp add --transport http stripe --scope local https://mcp.stripe.com
```

--------------------------------

### Troubleshoot Bedrock Region Issues (Bash)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

Provides bash commands to check model availability in a specific AWS region and to switch the active region for Bedrock operations.

```bash
# Check model availability: aws bedrock list-inference-profiles --region your-region
# Switch to a supported region:
export AWS_REGION=us-east-1
```

--------------------------------

### Enable Extended Thinking in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

Understand how to activate and utilize Claude's extended thinking capabilities for complex tasks. This feature, which can be toggled on or prompted with specific keywords like 'think' or 'think hard', aids in deep reasoning for architectural decisions, debugging, and implementation planning.

```text
> I need to implement a new authentication system using OAuth2 for our API. Think deeply about the best approach for implementing this in our codebase.

> think about potential security vulnerabilities in this approach 

> think hard about edge cases we should handle
```

--------------------------------

### Disable a Plugin Without Uninstalling in Claude Code

Source: https://docs.claude.com/en/docs/claude-code/plugins

This command temporarily disables a plugin, making its features unavailable without removing it from the system. It requires the plugin name and its marketplace. This is useful for troubleshooting or when a plugin is not needed for a specific task. The `theme={null}` parameter is a placeholder.

```shell
/plugin disable plugin-name@marketplace-name
```

--------------------------------

### Load System Prompt from File with --system-prompt-file

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Loads the system prompt content from a specified file, overriding the default prompt. This functionality is exclusive to print mode and was added in version 1.0.54.

```bash
claude -p --system-prompt-file ./custom-prompt.txt "query"
```

--------------------------------

### Append to System Prompt with --append-system-prompt

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Adds custom text to the end of the existing system prompt. This allows for incremental modifications to Claude Code's instructions and works in both interactive and print modes, available since version 1.0.55.

```bash
claude --append-system-prompt "Always use TypeScript"
```

--------------------------------

### Configure Claude Code Environment Variables for Vertex AI

Source: https://docs.claude.com/en/docs/claude-code/google-vertex-ai

These environment variables are essential for integrating Claude Code with Google Vertex AI. They control the Vertex AI integration, region settings, project ID, and optional features like prompt caching. Specific variables allow overriding default regions for different Claude model versions.

```bash
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID

# Optional: Disable prompt caching if needed
export DISABLE_PROMPT_CACHING=1

# When CLOUD_ML_REGION=global, override region for unsupported models
export VERTEX_REGION_CLAUDE_3_5_HAIKU=us-east5

# Optional: Override regions for other specific models
export VERTEX_REGION_CLAUDE_3_5_SONNET=us-east5
export VERTEX_REGION_CLAUDE_3_7_SONNET=us-east5
export VERTEX_REGION_CLAUDE_4_0_OPUS=europe-west1
export VERTEX_REGION_CLAUDE_4_0_SONNET=us-east5
export VERTEX_REGION_CLAUDE_4_1_OPUS=europe-west1
```

--------------------------------

### Add User-Scoped MCP Server (HTTP)

Source: https://docs.claude.com/en/docs/claude-code/mcp

Adds an HTTP-transport MCP server named 'hubspot' to the user scope. User-scoped servers are accessible across all projects on a machine but remain private to the user's account, suitable for personal utilities.

```bash
# Add a user server
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

--------------------------------

### PreToolUse Input Schema in JSON

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object represents the input schema for the PreToolUse hook. It includes common hook fields along with event-specific details such as the tool name and the input parameters for that tool, like 'file_path' and 'content' for the 'Write' tool.

```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  }
}
```

--------------------------------

### Configure Claude Code Status Line with JSON

Source: https://docs.claude.com/en/docs/claude-code/statusline

Adds a custom status line command to Claude Code by specifying a script path in the settings.json file. This allows for dynamic information display at the bottom of the interface.

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0 // Optional: set to 0 to let status line go to edge
  }
}
```

--------------------------------

### JSON Configuration for Stop Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON structure configures a 'Stop' hook. It defines a prompt to be evaluated by the LLM to determine if Claude should stop its execution. The prompt uses $ARGUMENTS to refer to the hook input.

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude should stop: $ARGUMENTS. Check if all tasks are complete."
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Stop/SubagentStop Hook for Continuation Control

Source: https://docs.claude.com/en/docs/claude-code/hooks

Determines whether Claude must continue or can stop. 'block' prevents Claude from stopping and requires a 'reason' for Claude to understand how to proceed. 'undefined' allows Claude to stop.

```json
{
  "decision": "block" | undefined,
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

--------------------------------

### Stream JSON Output from Claude CLI

Source: https://docs.claude.com/en/docs/claude-code/headless

This command streams each message from Claude as it's received, formatting each as a separate JSON object. This is useful for real-time processing of conversation turns and provides initial system messages, user/assistant messages, and a final result message with statistics.

```bash
claude -p "Build an application" --output-format stream-json
```

--------------------------------

### Bash Helper Functions for JSON Extraction using jq

Source: https://docs.claude.com/en/docs/claude-code/statusline

Defines several Bash functions to parse JSON input and extract specific fields like model name, directories, version, cost, duration, and lines added/removed. These functions rely on the `jq` utility for JSON processing. They take JSON input implicitly via the `$input` variable and output extracted string values.

```bash
get_model_name() { echo "$input" | jq -r '.model.display_name'; }
get_current_dir() { echo "$input" | jq -r '.workspace.current_dir'; }
get_project_dir() { echo "$input" | jq -r '.workspace.project_dir'; }
get_version() { echo "$input" | jq -r '.version'; }
get_cost() { echo "$input" | jq -r '.cost.total_cost_usd'; }
get_duration() { echo "$input" | jq -r '.cost.total_duration_ms'; }
get_lines_added() { echo "$input" | jq -r '.cost.total_lines_added'; }
get_lines_removed() { echo "$input" | jq -r '.cost.total_lines_removed'; }

# Example Usage:
MODEL=$(get_model_name)
DIR=$(get_current_dir)
echo "[$MODEL] 📁 ${DIR##*/}"
```

--------------------------------

### Enable Verbose Logging with --verbose

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Activates detailed logging output, showing the full turn-by-turn interaction within Claude Code. This flag is invaluable for debugging purposes in both interactive and print modes.

```bash
claude --verbose
```

--------------------------------

### PostToolUse Hook for Feedback

Source: https://docs.claude.com/en/docs/claude-code/hooks

Provides feedback to Claude after tool execution. It can 'block' further processing with a 'reason' or add 'additionalContext' for Claude to consider. If not blocked, it does nothing.

```json
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Claude"
  }
}
```

--------------------------------

### Bash Script for Simple Status Line

Source: https://docs.claude.com/en/docs/claude-code/statusline

A basic Bash script that reads JSON input from stdin, extracts the model display name and current directory, and formats them for the status line. It uses `jq` for JSON parsing.

```bash
#!/bin/bash
# Read JSON input from stdin
input=$(cat)

# Extract values using jq
MODEL_DISPLAY=$(echo "$input" | jq -r '.model.display_name')
CURRENT_DIR=$(echo "$input" | jq -r '.workspace.current_dir')

echo "[$MODEL_DISPLAY] 📁 ${CURRENT_DIR##*/}"
```

--------------------------------

### Python Script for Status Line with Git Info

Source: https://docs.claude.com/en/docs/claude-code/statusline

A Python script that parses JSON input from stdin to display the model name and current directory. It includes logic to detect and display the Git branch.

```python
#!/usr/bin/env python3
import json
import sys
import os

# Read JSON from stdin
data = json.load(sys.stdin)

# Extract values
model = data['model']['display_name']
current_dir = os.path.basename(data['workspace']['current_dir'])

# Check for git branch
git_branch = ""
if os.path.exists('.git'):
    try:
        with open('.git/HEAD', 'r') as f:
            ref = f.read().strip()
            if ref.startswith('ref: refs/heads/'):
                git_branch = f" | 🌿 {ref.replace('ref: refs/heads/', '')}"
    except:
        pass

print(f"[{model}] 📁 {current_dir}{git_branch}")
```

--------------------------------

### Node.js Script for Status Line with Git Info

Source: https://docs.claude.com/en/docs/claude-code/statusline

A Node.js script that reads JSON data from stdin, extracts model and directory information, and checks for the current Git branch to display in the status line.

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read JSON from stdin
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);
    
    // Extract values
    const model = data.model.display_name;
    const currentDir = path.basename(data.workspace.current_dir);
    
    // Check for git branch
    let gitBranch = '';
    try {
        const headContent = fs.readFileSync('.git/HEAD', 'utf8').trim();
        if (headContent.startsWith('ref: refs/heads/')) {
            gitBranch = ` | 🌿 ${headContent.replace('ref: refs/heads/', '')}`;
        }
    } catch (e) {
        // Not a git repo or can't read HEAD
    }
    
    console.log(`[${model}] 📁 ${currentDir}${gitBranch}`);
});
```

--------------------------------

### Replace System Prompt with --system-prompt-file

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

This flag replaces the default system prompt with content loaded from a specified file. It is only available in Print mode. This is useful for managing complex prompts, ensuring reproducibility, and version control.

```bash
claude -p --system-prompt-file ./prompts/code-review.txt "Review this PR"
```

--------------------------------

### Bash: Script Execution Permissions

Source: https://docs.claude.com/en/docs/claude-code/skills

Bash command to set execute permissions for Python scripts within a Claude Skill. Ensures that scripts like `.py` files can be run by the system.

```bash
chmod +x .claude/skills/my-skill/scripts/*.py
```

--------------------------------

### Identify Undocumented Code (Claude Prompt)

Source: https://docs.claude.com/en/docs/claude-code/common-workflows

A prompt to find code elements, such as functions, that lack proper documentation (e.g., JSDoc comments) within a specified module. This helps in identifying documentation gaps. Input: Module and documentation type. Output: List of undocumented code.

```plaintext
> find functions without proper JSDoc comments in the auth module
```

--------------------------------

### Bash Script for Git-Aware Status Line

Source: https://docs.claude.com/en/docs/claude-code/statusline

An enhanced Bash script that displays the model name, current directory, and Git branch if the current directory is a Git repository. It uses `jq` for JSON parsing and `git` commands.

```bash
#!/bin/bash
# Read JSON input from stdin
input=$(cat)

# Extract values using jq
MODEL_DISPLAY=$(echo "$input" | jq -r '.model.display_name')
CURRENT_DIR=$(echo "$input" | jq -r '.workspace.current_dir')

# Show git branch if in a git repo
GIT_BRANCH=""
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current 2>/dev/null)
    if [ -n "$BRANCH" ]; then
        GIT_BRANCH=" | 🌿 $BRANCH"
    fi
fi

echo "[$MODEL_DISPLAY] 📁 ${CURRENT_DIR##*/}$GIT_BRANCH"
```

--------------------------------

### PreToolUse Hook for Decision Control

Source: https://docs.claude.com/en/docs/claude-code/hooks

Controls whether a tool call proceeds by setting permission decisions like 'allow', 'deny', or 'ask'. It can also modify tool inputs before execution using 'updatedInput'. This hook is crucial for managing tool usage and user interactions within Claude.

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "My reason here",
    "updatedInput": {
      "field_to_modify": "new value"
    }
  }
}
```

--------------------------------

### UserPromptSubmit Input Schema in JSON

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object details the input schema for the UserPromptSubmit hook. In addition to common hook fields, it includes the 'prompt' field, which contains the text submitted by the user, allowing for pre-processing or validation.

```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```

--------------------------------

### Advanced Credential Refresh Configuration (JSON)

Source: https://docs.claude.com/en/docs/claude-code/amazon-bedrock

This JSON snippet defines advanced settings for automatically refreshing AWS credentials in Claude Code. It includes commands for authentication refresh and environment variable settings.

```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "env": {
    "AWS_PROFILE": "myprofile"
  }
}
```

--------------------------------

### Configure Custom CA Certificates (Bash)

Source: https://docs.claude.com/en/docs/claude-code/network-config

Sets the NODE_EXTRA_CA_CERTS environment variable to specify the path to a custom CA certificate file. This allows Claude Code to trust certificates signed by enterprise-specific Certificate Authorities, essential for secure HTTPS connections within private networks.

```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

--------------------------------

### PostToolUse Input Schema in JSON

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object illustrates the input schema for the PostToolUse hook. It contains common hook fields, tool details, the input provided to the tool, and the response received from the tool, including success status and any returned data.

```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  }
}
```

--------------------------------

### Python: Add Context via JSON to UserPromptSubmit Hook

Source: https://docs.claude.com/en/docs/claude-code/hooks

This Python script demonstrates how to add context to a UserPromptSubmit hook using JSON output. It checks the prompt for sensitive patterns and, if found, blocks the prompt with a security reason. Otherwise, it adds the current time as context and allows the prompt to proceed.

```python
#!/usr/bin/env python3
import json
import sys
import re
import datetime

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

prompt = input_data.get("prompt", "")

# Check for sensitive patterns
sensitive_patterns = [
    (r"(?i)\b(password|secret|key|token)\s*[:=]", "Prompt contains potential secrets"),
]

for pattern, message in sensitive_patterns:
    if re.search(pattern, prompt):
        # Use JSON output to block with a specific reason
        output = {
            "decision": "block",
            "reason": f"Security policy violation: {message}. Please rephrase your request without sensitive information."
        }
        print(json.dumps(output))
        sys.exit(0)

# Add current time to context
context = f"Current time: {datetime.datetime.now()}"
print(context)

"""
The following is also equivalent:
print(json.dumps({
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": context,
  },
}))
"""

# Allow the prompt to proceed with the additional context
sys.exit(0)
```

--------------------------------

### Disable Claude Code Auto-Updates

Source: https://docs.claude.com/en/docs/claude-code/setup

Disables the automatic update feature for Claude Code by setting the `DISABLE_AUTOUPDATER` environment variable. This can be done in the shell or within the `settings.json` file.

```bash
export DISABLE_AUTOUPDATER=1
```

--------------------------------

### Specify Input Format with --input-format

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Sets the expected format for input data when operating in print mode. The available options are 'text' for plain text input and 'stream-json' for structured JSON data that is streamed.

```bash
claude -p --output-format json --input-format stream-json
```

--------------------------------

### Configure Claude Model in Settings File

Source: https://docs.claude.com/en/docs/claude-code/model-config

Shows how to permanently set the default Claude model by configuring the 'model' field within a settings file. This method ensures a consistent model selection for all future sessions unless overridden by other configurations.

```json
{
    "permissions": {
        ...
    },
    "model": "opus"
}
```

--------------------------------

### Handle Claude CLI Errors

Source: https://docs.claude.com/en/docs/claude-code/headless

This code snippet demonstrates how to gracefully handle errors when executing the Claude CLI. It redirects standard error (stderr) to a file and checks the exit code of the command. If an error occurs, it prints the error message to stderr and exits with a non-zero status.

```bash
if ! claude -p "$prompt" 2>error.log; then
    echo "Error occurred:" >&2
    cat error.log >&2
    exit 1
fi
```

--------------------------------

### Customize Claude Code Default Models for Vertex AI

Source: https://docs.claude.com/en/docs/claude-code/google-vertex-ai

This snippet shows how to override the default primary and small/fast models used by Claude Code when integrating with Vertex AI. This is useful for specifying particular model versions or types.

```bash
export ANTHROPIC_MODEL='claude-opus-4-1@20250805'
export ANTHROPIC_SMALL_FAST_MODEL='claude-haiku-4-5@20251001'
```

--------------------------------

### LLM Response Schema for Hooks

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON schema defines the expected response format from the LLM when evaluating a prompt-based hook. It includes fields for decision, reason, and optional fields for controlling execution flow and providing messages.

```json
{
  "decision": "approve" | "block",
  "reason": "Explanation for the decision",
  "continue": false,  
  "stopReason": "Message shown to user",  
  "systemMessage": "Warning or context"
}
```

--------------------------------

### UserPromptSubmit Hook for Prompt Control

Source: https://docs.claude.com/en/docs/claude-code/hooks

Controls whether a user prompt is processed. It can 'block' the prompt, erasing it from context and showing a 'reason' to the user, or allow it to proceed. It can also add 'additionalContext' to the prompt's context.

```json
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here"
  }
}
```

--------------------------------

### Print Response without Interactive Mode (-p)

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Executes Claude Code in a non-interactive mode, directly printing the response to standard output. This is particularly useful for programmatic usage and integration with other scripts, as detailed in the SDK documentation.

```bash
claude -p "query"
```

--------------------------------

### Timeout for Long-Running Operations (Bash)

Source: https://docs.claude.com/en/docs/claude-code/sdk/sdk-headless

This snippet demonstrates how to set a timeout for Claude CLI commands to prevent operations from running indefinitely. If the command exceeds the specified time limit (e.g., 300 seconds), it will be terminated and a message will be printed.

```bash
timeout 300 claude -p "$complex_prompt" || echo "Timed out after 5 minutes"

```

--------------------------------

### Set Custom System Prompt with --system-prompt

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Replaces the default system prompt with custom text, influencing Claude Code's behavior and persona. This flag is effective in both interactive and print modes and was introduced in version 2.0.14.

```bash
claude --system-prompt "You are a Python expert"
```

--------------------------------

### Common Hook Input Schema in TypeScript

Source: https://docs.claude.com/en/docs/claude-code/hooks

This TypeScript interface defines the common fields available in the input data for all Claude Code hooks. It includes session identifiers, file paths, working directory, and permission mode, which are consistently provided across different hook events.

```typescript
{
  // Common fields
  session_id: string
  transcript_path: string  // Path to conversation JSON
  cwd: string              // The current working directory when the hook is invoked
  permission_mode: string  // Current permission mode: "default", "plan", "acceptEdits", or "bypassPermissions"

  // Event-specific fields
  hook_event_name: string
  ...
}
```

--------------------------------

### Common JSON Output Fields for Claude Code Hooks

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON structure defines common optional fields that can be returned by Claude Code hooks to control execution flow and provide feedback. Fields include 'continue', 'stopReason', 'suppressOutput', and 'systemMessage'.

```json
{
  "continue": true, 
  "stopReason": "string", 

  "suppressOutput": true, 
  "systemMessage": "string"
}
```

--------------------------------

### Specify Output Format with --output-format

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Determines the format of the output when using print mode. Supported options include 'text', 'json', and 'stream-json', allowing for structured data or streaming JSON output.

```bash
claude -p "query" --output-format json
```

--------------------------------

### Disabling SlashCommand tool via permissions

Source: https://docs.claude.com/en/docs/claude-code/slash-commands

Shows how to prevent Claude from executing any slash commands by adding 'SlashCommand' to the deny rules in the permissions configuration. This action also removes the SlashCommand tool and its descriptions from context.

```bash
/permissions
# Add to deny rules: SlashCommand
```

--------------------------------

### Python: Validation Script for PDF Processing

Source: https://docs.claude.com/en/docs/claude-code/skills

A Python script (`validate.py`) intended for the 'pdf-processing' Claude Skill. This script would typically handle validation logic related to PDF processing tasks.

```python
# Placeholder for validate.py content
# Example: validating form data or extracted text

# def validate_pdf_data(data):
#     pass
```

--------------------------------

### Remove a Skill Directory

Source: https://docs.claude.com/en/docs/claude-code/skills

These bash commands recursively remove a Skill directory, effectively deleting a Skill. It's important to use these commands carefully, especially when removing project Skills that might be shared with a team.

```bash
# Personal
rm -rf ~/.claude/skills/my-skill

# Project
rm -rf .claude/skills/my-skill
git commit -m "Remove unused Skill"
```

--------------------------------

### SessionEnd Hook for Cleanup Tasks

Source: https://docs.claude.com/en/docs/claude-code/hooks

Runs when a session ends. This hook cannot block session termination but can be used to perform necessary cleanup tasks.

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionEnd"
  }
}
```

--------------------------------

### Notification Input Schema in JSON

Source: https://docs.claude.com/en/docs/claude-code/hooks

This JSON object shows the input schema for the Notification hook. It includes the standard hook fields along with an event-specific 'message' field, which contains the notification text to be displayed to the user.

```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "Notification",
  "message": "Task completed successfully"
}
```

--------------------------------

### Bash Command Validation Script

Source: https://docs.claude.com/en/docs/claude-code/hooks

A Python script that validates Bash commands against predefined rules to ensure better performance and feature utilization. It checks for the use of 'grep' and 'find -name' and suggests alternatives like 'rg'. It exits with code 2 if issues are found, displaying messages to stderr.

```python
#!/usr/bin/env python3
import json
import re
import sys

# Define validation rules as a list of (regex pattern, message) tuples
VALIDATION_RULES = [
    (
        r"\bgrep\b(?!.*\|)",
        "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
    ),
    (
        r"\bfind\s+\S+\s+-name\b",
        "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
    ),
]


def validate_command(command: str) -> list[str]:
    issues = []
    for pattern, message in VALIDATION_RULES:
        if re.search(pattern, command):
            issues.append(message)
    return issues


try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

if tool_name != "Bash" or not command:
    sys.exit(1)

# Validate the command
issues = validate_command(command)

if issues:
    for message in issues:
        print(f"• {message}", file=sys.stderr)
    # Exit code 2 blocks tool call and shows stderr to Claude
    sys.exit(2)

```

--------------------------------

### Limit Turns with --max-turns

Source: https://docs.claude.com/en/docs/claude-code/cli-reference

Restricts the maximum number of agentic turns that Claude Code will execute in non-interactive mode. This helps control the length and complexity of the execution flow.

```bash
claude -p --max-turns 3 "query"
```

--------------------------------

### Bash Commands Not Tracked by Claude Checkpointing

Source: https://docs.claude.com/en/docs/claude-code/checkpointing

This snippet demonstrates bash commands that modify files. Claude Code's checkpointing does not track these types of file modifications, meaning they cannot be undone using the rewind feature. Users should be aware that direct file edits via Claude's tools are tracked, but external command-line operations are not.

```bash
rm file.txt
mv old.txt new.txt
cp source.txt dest.txt
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.