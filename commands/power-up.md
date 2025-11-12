---
description: Activate all superpowers (Windows workaround for SessionStart hooks)
---

⚡ **POWERING UP...**

Activating all Superpowers features manually (Windows workaround).

## Step 1: Activate Superpowers Framework

Execute `/activate-superpowers` to load the mandatory skill-based workflow.

## Step 2: Sync Episodic Memory

Execute `/sync-memory` to index past conversations for semantic search.

## Step 3: Activate MightyArchitect

Execute `/activate-mighty-architect` to load the memory system (working + long-term memory).

**Note**: If this is a fresh project, `/activate-mighty-architect` will automatically initialize the memory structure.

## Summary

Once all commands complete:
✅ Superpowers protocols active
✅ Episodic memory synced
✅ MightyArchitect memory loaded (~800 tokens)
✅ Ready for skill-driven development with full context

**Why manual activation?**
SessionStart hooks have a known bug on Windows (GitHub issue #9542) where `additionalContext` isn't properly injected. This manual command is the workaround until Anthropic fixes the Windows subprocess handling.

**Usage:**
Run power-up at the start of each session to activate all features.
