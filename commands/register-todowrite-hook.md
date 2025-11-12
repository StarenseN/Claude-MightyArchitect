---
description: Register MightyArchitect TodoWrite hook for automatic task logging
---

# Register TodoWrite Hook

Enable automatic task log creation when todos complete.

## What This Does

Registers a PreToolUse hook that intercepts TodoWrite operations and automatically creates task logs with flexible granularity:

- **1 todo completed** = 1 task log (for standalone work)
- **1 theme completed** (group of related todos) = 1 task log (for planned work)

## Step 1: Check Current Hook Configuration

```bash
cat ~/.claude/settings.json 2>/dev/null | grep -A 10 PreToolUse || echo "No PreToolUse hooks configured"
```

## Step 2: Locate Hook Script

```bash
HOOK_PATH="$(pwd)/hooks/pre-tool-use-todowrite.js"

if [ ! -f "$HOOK_PATH" ]; then
  echo "❌ Hook not found at: $HOOK_PATH"
  echo "Expected location: <project>/hooks/pre-tool-use-todowrite.js"
  exit 1
fi

echo "✓ Hook found: $HOOK_PATH"
```

## Step 3: Make Hook Executable

```bash
chmod +x "$HOOK_PATH"
echo "✓ Hook is executable"
```

## Step 4: Register Hook Configuration

This adds the TodoWrite hook to your user settings:

```bash
# Backup existing settings
cp ~/.claude/settings.json ~/.claude/settings.json.backup 2>/dev/null || true

# Read current settings
if [ -f ~/.claude/settings.json ]; then
  SETTINGS=$(cat ~/.claude/settings.json)
else
  SETTINGS='{}'
fi

# Use jq to add TodoWrite hook (if jq available)
if command -v jq >/dev/null 2>&1; then
  echo "$SETTINGS" | jq --arg hook_path "$HOOK_PATH" '
    .hooks.PreToolUse += [{
      "matcher": "TodoWrite",
      "hooks": [{
        "type": "command",
        "command": $hook_path
      }]
    }]
  ' > ~/.claude/settings.json

  echo "✓ Hook registered using jq"
else
  # Manual registration instructions if jq not available
  echo "⚠️  jq not found. Manual registration required:"
  echo ""
  echo "Add this to ~/.claude/settings.json:"
  echo ""
  echo '{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "TodoWrite",
        "hooks": [
          {
            "type": "command",
            "command": "'$HOOK_PATH'"
          }
        ]
      }
    ]
  }
}'
  echo ""
  echo "Or install jq and run this command again:"
  echo "  brew install jq  # macOS"
  echo "  apt-get install jq  # Linux"
fi
```

## Step 5: Verify Registration

```bash
if command -v jq >/dev/null 2>&1; then
  cat ~/.claude/settings.json | jq '.hooks.PreToolUse[] | select(.matcher == "TodoWrite")'

  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ TodoWrite hook successfully registered!"
  fi
else
  cat ~/.claude/settings.json | grep -A 5 TodoWrite
fi
```

## Step 6: Test Hook

Create a test todo to verify:

```bash
echo "Test the hook by completing a todo in Claude:"
echo "1. Create a todo: 'Test automatic task log'"
echo "2. Mark it complete"
echo "3. Check .claude/memory/tasks/ for new task log"
```

## Configuration Options

### Project-Specific Hook

To register the hook only for this project (not all projects):

1. Open `/hooks` slash command
2. Select `PreToolUse`
3. Add matcher: `TodoWrite`
4. Add hook command: `./hooks/pre-tool-use-todowrite.js`
5. Select storage: **Project settings** (not User settings)

### Disable Hook Temporarily

Remove the hook configuration from `~/.claude/settings.json`:

```bash
# Backup first
cp ~/.claude/settings.json ~/.claude/settings.json.backup

# Use jq to remove TodoWrite hook
jq 'del(.hooks.PreToolUse[] | select(.matcher == "TodoWrite"))' ~/.claude/settings.json > ~/.claude/settings.json.tmp
mv ~/.claude/settings.json.tmp ~/.claude/settings.json
```

## How It Works

**Flexible Granularity System:**

1. **Single Todo Mode**
   - Todo: "Fix login bug"
   - Completed → Creates: `2025-11-12-fix-login-bug.md`

2. **Thematic Batch Mode**
   - Todos:
     - "Task 1: Create user model"
     - "Task 2: Add validation"
     - "Task 3: Write tests"
   - All 3 completed → Creates: `2025-11-12-create-user-model.md` (1 log for theme)

3. **Smart Detection**
   - Analyzes todo content patterns
   - Detects if part of a plan (Task X:, Step X:, etc.)
   - Groups related todos into themes
   - Waits for theme completion before creating log

**State Tracking:**

The hook maintains `.claude/memory/.todo-state.json` to track todo transitions and detect completions.

---

✅ **Hook Registered!**

Now when you complete todos, task logs will be automatically created in `.claude/memory/tasks/`.

**Next Steps:**
- Complete a todo to test automatic task log creation
- Use `/task-list` to view generated task logs
- Review `.claude/memory/tasks/` directory for task history
