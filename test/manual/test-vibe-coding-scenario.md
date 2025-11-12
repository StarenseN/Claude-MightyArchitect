# Manual Integration Test: Vibe Coding Scenario

## Setup

1. Ensure MightyArchitect is installed and active
2. Ensure `.claude/memory/` structure exists
3. Start fresh Claude session in test project

## Test Scenario

**User request:** "Add a dark mode toggle to the application settings"

## Expected Claude Behavior

Claude should create todos like:
- Create DarkModeToggle component
- Add theme context provider
- Update Settings page
- Add CSS for dark theme

## Test Execution

### Part 1: Complete the todos

1. Let Claude implement the dark mode feature
2. Mark all todos as completed
3. Verify all 4 (or similar) todos show as [x] completed

### Part 2: Invoke analysis command

1. Run: `/analyze-todos`
2. When prompted, say: "all recent"
3. Wait for agent to complete analysis

## Expected Output

### Agent Should:
1. ✅ Detect all 4 todos as part of "Dark Mode Feature" theme
2. ✅ Verify theme is complete (no pending related todos)
3. ✅ Calculate 23-point score
4. ✅ Create task log: `.claude/memory/tasks/YYYYMMDD-HHMMSS-dark-mode-feature.md`

### Task Log Should Contain:
- ✅ All 4 completed todos listed
- ✅ Implementation summary explaining the feature
- ✅ Quality assessment with scores for each dimension
- ✅ Total score out of 23
- ✅ List of modified files

### Agent Should NOT:
- ❌ Create multiple logs (should be 1 theme)
- ❌ Touch patterns.md, decisions.md, evolution.md
- ❌ Give unrealistic scores (all 23/23)

## Success Criteria

- [ ] Task log created in correct location
- [ ] Filename format: `YYYYMMDD-HHMMSS-dark-mode-feature.md`
- [ ] All sections present and filled
- [ ] Realistic quality scores
- [ ] No duplicate logs
- [ ] Architect files untouched

## Failure Modes

**If agent creates multiple logs:**
- Issue: Semantic grouping failed
- Fix: Improve agent's thematic coherence detection

**If agent gives 23/23 score:**
- Issue: Unrealistic scoring
- Fix: Add scoring guidelines with typical ranges

**If agent creates empty log:**
- Issue: Agent couldn't read context or todos
- Fix: Check file paths and Read tool usage
