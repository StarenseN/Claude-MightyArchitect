# Manual Integration Test: Superpowers Execute-Plan Scenario

## Setup

1. Ensure both MightyArchitect and Superpowers are installed
2. Start fresh Claude session
3. Have a multi-step feature to implement (e.g., user authentication)

## Test Scenario

**User workflow:**
1. Brainstorm authentication feature
2. Write plan with `/superpowers:write-plan`
3. Execute plan with `/superpowers:execute-plan`

**Plan structure (9 tasks in 3 batches):**

**Batch 1:**
- Task 1: Set up auth database schema
- Task 2: Create User model with password hashing
- Task 3: Implement JWT token generation

**Batch 2:**
- Task 4: Create login endpoint
- Task 5: Create registration endpoint
- Task 6: Add authentication middleware

**Batch 3:**
- Task 7: Write auth integration tests
- Task 8: Update API docs for auth
- Task 9: Add rate limiting to auth

## Test Execution

### Part 1: Execute the plan

1. Let Claude/Superpowers complete all 3 batches
2. Verify all 9 todos marked as completed

### Part 2: Invoke analysis command

1. Run: `/analyze-todos`
2. Say: "all recent"
3. Wait for agent analysis

## Expected Output

### Agent Should Detect 3 Semantic Themes:

**Theme 1: Auth Core (Tasks 1-3)**
- Database schema + User model + JWT
- Creates: `YYYYMMDD-HHMMSS-auth-core.md`

**Theme 2: Auth API (Tasks 4-6)**
- Endpoints + middleware
- Creates: `YYYYMMDD-HHMMSS-auth-api.md`

**Theme 3: Auth Quality (Tasks 7-9)**
- Tests + docs + rate limiting
- Creates: `YYYYMMDD-HHMMSS-auth-quality.md`

### Critical: Themes ≠ Batches

- ✅ Agent should create 3 logs (by semantic themes)
- ❌ Agent should NOT create 3 logs just because 3 batches
- ✅ Grouping based on domain/purpose, NOT batch structure

### Each Task Log Should:
- ✅ List only its relevant todos (3 each)
- ✅ Have independent 23-point score
- ✅ Explain the specific aspect implemented
- ✅ List files modified for that theme

## Success Criteria

- [ ] Exactly 3 task logs created
- [ ] Logs grouped by semantic theme (not by batch)
- [ ] Each log has 3 related todos
- [ ] Each log has independent realistic score
- [ ] Log names reflect themes (auth-core, auth-api, auth-quality)

## Failure Modes

**If agent creates 1 log for all 9 tasks:**
- Issue: Over-grouping
- Fix: Improve theme boundary detection

**If agent creates 9 logs (one per todo):**
- Issue: Under-grouping
- Fix: Improve thematic coherence detection

**If agent respects batch boundaries instead of semantic boundaries:**
- Issue: Batch 1 = log, Batch 2 = log (wrong grouping)
- Fix: Emphasize semantic analysis over temporal/structural grouping
