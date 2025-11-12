# ClaudeMemory PowerShell Module
# Project-isolated memory system with architecture support

$Script:MemoryVersion = "1.0.0"

function mem {
    [CmdletBinding()]
    param(
        [Parameter(Position=0)]
        [ValidateSet("", "help", "init", "show", "add", "pattern", "decision", "arch", "recent", "clean", "status", "export")]
        [string]$Action = "help",
        
        [Parameter(Position=1, ValueFromRemainingArguments)]
        [string]$Note
    )
    
    # Project detection - memory only works in projects
    $isProject = (Test-Path ".git") -or (Test-Path "package.json") -or 
                  (Test-Path "Cargo.toml") -or (Test-Path "pyproject.toml") -or
                  (Test-Path "requirements.txt") -or (Test-Path "go.mod") -or
                  (Test-Path "ARCHITECTURE.md") -or (Test-Path ".memory")
    
    if (!$isProject -and $Action -notin @("help", "status", "")) {
        Write-Host "⚠️ Not in a project directory. Memory only works in projects." -ForegroundColor Yellow
        Write-Host "  Projects are detected by: .git, package.json, ARCHITECTURE.md, etc." -ForegroundColor Gray
        return
    }
    
    $memPath = ".memory"
    
    switch ($Action) {
        {$_ -in "", "help"} { 
            Show-MemoryHelp
        }
        
        "init" {
            Initialize-ProjectMemory -Path $memPath
        }
        
        "show" {
            Show-MemoryContext -Path $memPath
        }
        
        "add" {
            Add-MemoryNote -Path $memPath -Note $Note
        }
        
        "pattern" {
            Add-MemoryPattern -Path $memPath -Pattern $Note
        }
        
        "decision" {
            Add-MemoryDecision -Path $memPath -Decision $Note
        }
        
        "arch" {
            Show-ArchitectureStatus -Path $memPath
        }
        
        "recent" {
            Show-RecentTasks -Path $memPath
        }
        
        "clean" {
            Remove-ProjectMemory -Path $memPath
        }
        
        "status" {
            Show-MemoryStatus
        }
        
        "export" {
            Export-MemoryToClaudeMD -Path $memPath
        }
    }
}

function Show-MemoryHelp {
    Write-Host "`n🧠 Claude Memory System v$Script:MemoryVersion" -ForegroundColor Cyan
    Write-Host "  Project-isolated memory with architecture support`n" -ForegroundColor Gray
    
    Write-Host "📝 Basic Commands:" -ForegroundColor Yellow
    Write-Host "  mem              - Show this help"
    Write-Host "  mem init         - Initialize memory in project"
    Write-Host "  mem show         - View current context"
    Write-Host "  mem add 'note'   - Add note to context"
    
    Write-Host "`n🎯 Advanced Commands:" -ForegroundColor Yellow
    Write-Host "  mem pattern 'p'  - Save reusable pattern"
    Write-Host "  mem decision 'd' - Log architecture decision"
    Write-Host "  mem arch         - Show architecture status"
    Write-Host "  mem recent       - Show recent activity"
    Write-Host "  mem export       - Export to CLAUDE.md"
    Write-Host "  mem clean        - Remove all memory"
    Write-Host "  mem status       - Check installation`n"
    
    if (Test-Path ".memory") {
        $taskCount = (Get-ChildItem ".memory\tasks" -Filter "*.md" -ErrorAction SilentlyContinue).Count
        Write-Host "✅ Memory active in this project ($taskCount tasks logged)" -ForegroundColor Green
        
        if (Test-Path "ARCHITECTURE.md") {
            Write-Host "📐 Architecture rules detected and linked" -ForegroundColor Cyan
        }
    } else {
        Write-Host "💡 Run 'mem init' to start memory in this project" -ForegroundColor Yellow
    }
}

function Initialize-ProjectMemory {
    param([string]$Path)
    
    if (Test-Path $Path) {
        Write-Host "Memory already initialized. Current stats:" -ForegroundColor Yellow
        $taskCount = (Get-ChildItem "$Path\tasks" -Filter "*.md" -ErrorAction SilentlyContinue).Count
        $contextSize = (Get-Item "$Path\context.md").Length / 1KB
        Write-Host "  Tasks logged: $taskCount" -ForegroundColor Gray
        Write-Host "  Context size: $([math]::Round($contextSize, 2)) KB" -ForegroundColor Gray
        return
    }
    
    Write-Host "Initializing memory for this project..." -ForegroundColor Gray
    
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
    New-Item -ItemType Directory -Path "$Path\tasks" -Force | Out-Null
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $projectName = (Get-Item .).Name
    
    # Context initialization
    $contextContent = @"
# Context - $projectName

Initialized: $timestamp
Status: Active

## Current Focus
- Project setup and memory initialization

## Environment
- Platform: Windows PowerShell
- Memory System: v$Script:MemoryVersion
"@
    
    # Check for architecture
    if (Test-Path "ARCHITECTURE.md") {
        $contextContent += "`n- Architecture: ARCHITECTURE.md detected ✅"
        
        # Read first few lines of architecture
        $archPreview = Get-Content "ARCHITECTURE.md" -TotalCount 5 | Out-String
        $contextContent += "`n`n## Architecture Preview`n``````markdown`n$archPreview`n```````n"
    }
    
    $contextContent | Set-Content "$Path\context.md"
    
    # Patterns initialization
    @"
# Patterns

Reusable solutions discovered during development.

## Format
Each pattern should include:
- Problem it solves
- Solution approach
- When to apply it
"@ | Set-Content "$Path\patterns.md"
    
    # Decisions initialization
    $decisionsContent = @"
# Decisions

Architectural and technical decisions for this project.

## Format
Each decision should include:
- What was decided
- Why (rationale)
- Alternatives considered
- Consequences
"@
    
    if (Test-Path "ARCHITECTURE.md") {
        $decisionsContent += @"

## Architecture Compliance
✅ This project follows rules defined in ARCHITECTURE.md
All file locations should comply with the defined architecture.
"@
    }
    
    $decisionsContent | Set-Content "$Path\decisions.md"
    
    Write-Host "✅ Memory initialized successfully!" -ForegroundColor Green
    
    if (Test-Path "ARCHITECTURE.md") {
        Write-Host "📐 Architecture linked - compliance tracking enabled" -ForegroundColor Cyan
    }
    
    Write-Host "`n💡 Tips:" -ForegroundColor Yellow
    Write-Host "  - Memory lives in: .memory/" -ForegroundColor Gray
    Write-Host "  - Add .memory/ to .gitignore for private memory" -ForegroundColor Gray
    Write-Host "  - Or commit .memory/patterns.md to share team knowledge" -ForegroundColor Gray
}

function Show-MemoryContext {
    param([string]$Path)
    
    if (!(Test-Path "$Path\context.md")) {
        Write-Host "No memory found. Run 'mem init' first." -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n📚 Current Context:" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Get-Content "$Path\context.md" | Write-Host -ForegroundColor Gray
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
}

function Add-MemoryNote {
    param([string]$Path, [string]$Note)
    
    if (!(Test-Path $Path)) { 
        Initialize-ProjectMemory -Path $Path 
    }
    
    if ($Note) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        Add-Content "$Path\context.md" "`n- [$timestamp] $Note"
        Write-Host "✅ Added to memory" -ForegroundColor Green
        
        # Check for architecture keywords
        if ((Test-Path "ARCHITECTURE.md") -and ($Note -match "controller|service|component|api|frontend|backend")) {
            Write-Host "💡 Tip: Use 'mem decision' for architecture choices" -ForegroundColor DarkGray
        }
    } else {
        Write-Host "Usage: mem add 'your note here'" -ForegroundColor Yellow
    }
}

function Add-MemoryPattern {
    param([string]$Path, [string]$Pattern)
    
    if (!(Test-Path $Path)) { 
        Initialize-ProjectMemory -Path $Path 
    }
    
    if ($Pattern) {
        $timestamp = Get-Date -Format "yyyy-MM-dd"
        $entry = @"

## Pattern: $timestamp
$Pattern

**When to use**: [Add context]
**Benefits**: [Add benefits]
"@
        Add-Content "$Path\patterns.md" $entry
        Write-Host "🎯 Pattern saved" -ForegroundColor Green
    } else {
        Write-Host "Usage: mem pattern 'description of reusable solution'" -ForegroundColor Yellow
    }
}

function Add-MemoryDecision {
    param([string]$Path, [string]$Decision)
    
    if (!(Test-Path $Path)) { 
        Initialize-ProjectMemory -Path $Path 
    }
    
    if ($Decision) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        $entry = @"

## Decision: $timestamp
**What**: $Decision
**Why**: [Add rationale]
**Alternatives**: [What else was considered]
**Consequences**: [Impact of this decision]
"@
        Add-Content "$Path\decisions.md" $entry
        Write-Host "📐 Decision logged" -ForegroundColor Green
        
        # Update architecture status
        if (Test-Path "ARCHITECTURE.md") {
            Add-Content "$Path\context.md" "`n- [$timestamp] Architecture decision: $Decision"
        }
    } else {
        Write-Host "Usage: mem decision 'what was decided and why'" -ForegroundColor Yellow
    }
}

function Show-ArchitectureStatus {
    param([string]$Path)
    
    Write-Host "`n📐 Architecture Status:" -ForegroundColor Cyan
    
    if (Test-Path "ARCHITECTURE.md") {
        Write-Host "  ✅ ARCHITECTURE.md present" -ForegroundColor Green
        
        # Show file stats
        $archSize = (Get-Item "ARCHITECTURE.md").Length / 1KB
        $archLines = (Get-Content "ARCHITECTURE.md").Count
        Write-Host "  📄 Size: $([math]::Round($archSize, 2)) KB ($archLines lines)" -ForegroundColor Gray
        
        # Show architecture sections
        $sections = Get-Content "ARCHITECTURE.md" | Where-Object { $_ -match "^#{1,2} " }
        if ($sections) {
            Write-Host "`n  Sections:" -ForegroundColor Gray
            $sections | Select-Object -First 5 | ForEach-Object {
                Write-Host "    $_" -ForegroundColor DarkGray
            }
        }
        
        # Show related decisions
        if (Test-Path "$Path\decisions.md") {
            $archDecisions = Get-Content "$Path\decisions.md" | 
                            Select-String -Pattern "architecture|structure|design|pattern" -SimpleMatch
            
            if ($archDecisions) {
                Write-Host "`n  Related Decisions:" -ForegroundColor Gray
                $archDecisions | Select-Object -First 3 | ForEach-Object { 
                    Write-Host "    $_" -ForegroundColor DarkGray 
                }
            }
        }
    } else {
        Write-Host "  ⚠️ No ARCHITECTURE.md found" -ForegroundColor Yellow
        Write-Host "  💡 Create ARCHITECTURE.md to enable compliance tracking" -ForegroundColor DarkGray
    }
}

function Show-RecentTasks {
    param([string]$Path)
    
    if (!(Test-Path "$Path\tasks")) {
        Write-Host "No task history found." -ForegroundColor Gray
        return
    }
    
    $tasks = Get-ChildItem "$Path\tasks" -Filter "*.md" -ErrorAction SilentlyContinue | 
             Sort-Object LastWriteTime -Descending | 
             Select-Object -First 5
    
    if ($tasks) {
        Write-Host "`n📋 Recent Tasks:" -ForegroundColor Cyan
        foreach ($task in $tasks) {
            Write-Host "`n  ⏰ $($task.LastWriteTime.ToString('yyyy-MM-dd HH:mm'))" -ForegroundColor DarkGray
            $content = Get-Content $task.FullName | Select-Object -Skip 1 -First 3
            $content | ForEach-Object { Write-Host "     $_" -ForegroundColor Gray }
        }
    } else {
        Write-Host "No recent tasks." -ForegroundColor Gray
    }
}

function Remove-ProjectMemory {
    param([string]$Path)
    
    if (!(Test-Path $Path)) {
        Write-Host "No memory to remove." -ForegroundColor Gray
        return
    }
    
    $stats = @{
        Tasks = (Get-ChildItem "$Path\tasks" -Filter "*.md" -ErrorAction SilentlyContinue).Count
        Size = [math]::Round((Get-ChildItem $Path -Recurse | Measure-Object Length -Sum).Sum / 1KB, 2)
    }
    
    Write-Host "About to remove:" -ForegroundColor Yellow
    Write-Host "  Tasks: $($stats.Tasks)" -ForegroundColor Gray
    Write-Host "  Total size: $($stats.Size) KB" -ForegroundColor Gray
    
    $confirm = Read-Host "`nRemove all memory for this project? (y/N)"
    if ($confirm -eq 'y') {
        Remove-Item $Path -Recurse -Force
        Write-Host "🗑️ Memory removed" -ForegroundColor Yellow
    } else {
        Write-Host "Cancelled" -ForegroundColor Gray
    }
}

function Show-MemoryStatus {
    Write-Host "`n🧠 Claude Memory System Status" -ForegroundColor Cyan
    Write-Host "  Version: $Script:MemoryVersion" -ForegroundColor Gray
    
    # Check skill
    $skillPath = "$HOME\.claude\skills\memory-system\SKILL.md"
    if (Test-Path $skillPath) {
        Write-Host "  ✅ Skill installed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Skill missing - run installer" -ForegroundColor Red
    }
    
    # Check hook
    $hookPath = "$HOME\.claude\hooks\memory.ts"
    if (Test-Path $hookPath) {
        Write-Host "  ✅ Hook installed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Hook missing - run installer" -ForegroundColor Red
    }
    
    # Check PowerShell module
    if (Get-Module -Name ClaudeMemory) {
        Write-Host "  ✅ PowerShell module loaded" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Module not loaded - restart PowerShell" -ForegroundColor Yellow
    }
    
    # Check current project
    if (Test-Path ".memory") {
        $stats = @{
            Tasks = (Get-ChildItem ".memory\tasks" -Filter "*.md" -ErrorAction SilentlyContinue).Count
            Patterns = (Get-Content ".memory\patterns.md" | Select-String "## Pattern").Count
            Decisions = (Get-Content ".memory\decisions.md" | Select-String "## Decision").Count
        }
        Write-Host "`n  📊 Current Project:" -ForegroundColor Cyan
        Write-Host "     Tasks: $($stats.Tasks)" -ForegroundColor Gray
        Write-Host "     Patterns: $($stats.Patterns)" -ForegroundColor Gray
        Write-Host "     Decisions: $($stats.Decisions)" -ForegroundColor Gray
    } else {
        Write-Host "`n  💡 No memory in current project" -ForegroundColor Yellow
        Write-Host "     Run 'mem init' to start" -ForegroundColor DarkGray
    }
}

function Export-MemoryToClaudeMD {
    param([string]$Path)
    
    if (!(Test-Path $Path)) {
        Write-Host "No memory to export. Run 'mem init' first." -ForegroundColor Yellow
        return
    }
    
    Write-Host "Exporting memory to CLAUDE.md..." -ForegroundColor Gray
    
    $export = @"
# Claude Project Context

Generated from memory system on $(Get-Date -Format "yyyy-MM-dd HH:mm")

## Project Context
$(Get-Content "$Path\context.md" -Raw)

## Established Patterns
$(Get-Content "$Path\patterns.md" -Raw)

## Key Decisions
$(Get-Content "$Path\decisions.md" -Raw)

"@
    
    if (Test-Path "ARCHITECTURE.md") {
        $export += @"

## Architecture Rules
$(Get-Content "ARCHITECTURE.md" -Raw)
"@
    }
    
    $export | Set-Content "CLAUDE.md"
    Write-Host "✅ Exported to CLAUDE.md" -ForegroundColor Green
    Write-Host "💡 This file helps Claude understand your project in future sessions" -ForegroundColor DarkGray
}

# Export functions
Export-ModuleMember -Function mem

# Auto-completion
Register-ArgumentCompleter -CommandName mem -ScriptBlock {
    param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)
    
    $commands = @('help', 'init', 'show', 'add', 'pattern', 'decision', 'arch', 'recent', 'clean', 'status', 'export')
    $commands | Where-Object { $_ -like "$wordToComplete*" } | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', "mem $_")
    }
}

# Welcome message
$version = "v$Script:MemoryVersion"
Write-Host "💫 Memory ready! " -NoNewline -ForegroundColor DarkGray
Write-Host "Type 'mem' for help" -ForegroundColor DarkGray
