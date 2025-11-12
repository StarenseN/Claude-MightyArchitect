#!/usr/bin/env pwsh
# Claude Memory System - One-Click Installer
# Usage: iwr https://raw.githubusercontent.com/YOUR-USERNAME/claude-memory/main/install.ps1 | iex

param(
    [string]$Branch = "main",
    [switch]$Uninstall
)

$ErrorActionPreference = "Stop"
$REPO_URL = "https://raw.githubusercontent.com/StarenseN/claude-memory/$Branch"
$VERSION = "1.0.0"

Write-Host "`n🚀 Claude Memory System Installer v$VERSION" -ForegroundColor Cyan

if ($Uninstall) {
    Write-Host "Removing Claude Memory System..." -ForegroundColor Yellow
    Remove-Item "$HOME\.claude\skills\memory-system" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "$HOME\.claude\hooks\memory.ts" -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Uninstalled successfully" -ForegroundColor Green
    exit 0
}

try {
    Write-Host "📦 Installing memory skill..." -ForegroundColor Gray
    $skillPath = "$HOME\.claude\skills\memory-system"
    New-Item -ItemType Directory -Path $skillPath -Force | Out-Null
    
    $skillContent = Invoke-WebRequest -Uri "$REPO_URL/skill.md" -UseBasicParsing
    $skillContent.Content | Set-Content "$skillPath\SKILL.md" -Encoding UTF8
    
    Write-Host "🔗 Installing automation hook..." -ForegroundColor Gray
    $hookPath = "$HOME\.claude\hooks"
    New-Item -ItemType Directory -Path $hookPath -Force | Out-Null
    
    $hookContent = Invoke-WebRequest -Uri "$REPO_URL/memory-hook.ts" -UseBasicParsing
    $hookContent.Content | Set-Content "$hookPath\memory.ts" -Encoding UTF8
    
    Write-Host "⚡ Installing PowerShell module..." -ForegroundColor Gray
    $modulePath = "$HOME\Documents\PowerShell\Modules\ClaudeMemory"
    New-Item -ItemType Directory -Path $modulePath -Force | Out-Null
    
    $moduleContent = Invoke-WebRequest -Uri "$REPO_URL/ClaudeMemory.psm1" -UseBasicParsing
    $moduleContent.Content | Set-Content "$modulePath\ClaudeMemory.psm1" -Encoding UTF8
    
    $profilePath = $PROFILE.CurrentUserAllHosts
    if (!(Test-Path $profilePath)) {
        New-Item -ItemType File -Path $profilePath -Force | Out-Null
    }
    
    $profileContent = Get-Content $profilePath -Raw -ErrorAction SilentlyContinue
    if ($profileContent -notmatch "ClaudeMemory") {
        Add-Content $profilePath "`n# Claude Memory System`nImport-Module ClaudeMemory -ErrorAction SilentlyContinue"
    }
    
    Write-Host "`n✨ INSTALLATION COMPLETE!" -ForegroundColor Green
    Write-Host @"

📝 Quick Start:
   1. Navigate to any project: cd YourProject
   2. Initialize memory: mem init
   3. Work normally - memory is automatic!

🎮 Commands:
   mem         Show help
   mem init    Start memory in project
   mem show    View current context
   mem add     Add note to memory

📐 Architecture Support:
   If your project has ARCHITECTURE.md,
   it will be automatically integrated!

📚 Documentation: https://github.com/StarenseN/claude-memory

"@ -ForegroundColor Cyan

    . $PROFILE

} catch {
    Write-Host "`n❌ Installation failed: $_" -ForegroundColor Red
    Write-Host "Try manual install from: https://github.com/YOUR-USERNAME/claude-memory" -ForegroundColor Yellow
    exit 1
}
