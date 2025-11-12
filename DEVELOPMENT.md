# Development Workflow

Guide pour développer MightyArchitect en utilisant Claude Code lui-même (récursivité!).

## Le Problème de Récursivité

Vous développez un plugin Claude en utilisant Claude Code. Comment tester vos changements sans casser votre environnement de développement?

```
Plugin installé:    ~/.claude/plugins/mighty-architect/
Code en dev:        D:\AI_DB\claude-MightyArchitect/

Changement dans dev/ → Comment le tester immédiatement?
```

## Setup Initial

### 1. Installation en Mode Développement

```bash
# Clone le repo
git clone https://github.com/StarenseN/Claude-MightyArchitect.git
cd claude-MightyArchitect

# npm link pour le code Node.js
npm link

# Installation initiale (copie commands, hooks, templates)
npm install -g .
```

Résultat:
- ✅ Code Node.js: `npm link` actif (changements automatiques)
- ❌ Commands/Hooks/Templates: Copiés (besoin de sync)

## Workflow de Développement

### Après Chaque Modification

```bash
# 1. Modifier le code
vim hooks/pre-tool-use-todowrite.js
# ou
vim commands/register-todowrite-hook.md

# 2. Synchroniser les changements
npm run dev:sync

# 3. Tester dans Claude Code
# Les changements sont immédiatement disponibles
```

### Types de Changements

**Code Node.js (bin/, lib/):**
- ✅ Automatique via `npm link`
- Pas besoin de dev:sync

**Commands (commands/*.md):**
- ❌ Copié vers `~/.claude/commands/`
- Besoin de `npm run dev:sync`

**Hooks (hooks/*.js):**
- ❌ Copié vers `~/.claude/plugins/mighty-architect/hooks/`
- Besoin de `npm run dev:sync`

**Templates (templates/*.md):**
- ❌ Copié vers `~/.claude/plugins/mighty-architect/templates/`
- Besoin de `npm run dev:sync`

**Skills (skills/*.md):**
- ❌ Copié vers `~/.claude/plugins/mighty-architect/skills/`
- Besoin de `npm run dev:sync`

## Workflow Complet: Feature Branch

### Exemple: Développer Smart Task Manager

```bash
# 1. Créer worktree
git worktree add ../claude-MightyArchitect-smart -b feature/smart-task-manager

# 2. Travailler dans le worktree
cd ../claude-MightyArchitect-smart

# 3. Développer
vim agents/task-manager.md

# 4. Sync les changements
npm run dev:sync

# 5. Tester dans Claude Code (session principale)
# Vos changements sont disponibles!

# 6. Itérer
# Modifier → dev:sync → Tester → Repeat

# 7. Commit + Merge quand c'est prêt
git add agents/task-manager.md
git commit -m "feat: add smart task manager agent"
git checkout main
git merge feature/smart-task-manager
```

## Scripts Disponibles

```bash
# Synchroniser commands, hooks, templates, skills
npm run dev:sync

# Lancer les tests
npm test

# Installer globalement (full reinstall)
npm install -g .
```

## Gestion des Hooks

### Hook TodoWrite Déjà Enregistré?

Vérifier:
```bash
cat ~/.claude/settings.json | grep -A 5 TodoWrite
```

Si modifié le hook, pas besoin de réenregistrer - juste:
```bash
npm run dev:sync
```

Les changements sont immédiatement actifs (pas besoin de redémarrer Claude).

## Debugging

### Hook ne se déclenche pas?

```bash
# Test manuel du hook
echo '{"tool_name":"TodoWrite","tool_input":{"todos":[{"content":"Test","status":"completed","activeForm":"Testing"}]}}' | \
  node hooks/pre-tool-use-todowrite.js 2>&1
```

### Commands pas à jour?

```bash
# Vérifier la date de modification
ls -la ~/.claude/commands/register-todowrite-hook.md

# Sync manuellement
npm run dev:sync
```

## Isolation: Worktrees

Pour éviter de casser votre env principal:

```bash
# Worktree pour feature expérimentale
git worktree add ../claude-MightyArchitect-experimental -b experiment/risky-feature

cd ../claude-MightyArchitect-experimental

# Développer librement
# Si ça casse, retour facile à main
cd ../claude-MightyArchitect
npm run dev:sync
```

## Best Practices

### 1. Toujours sync après changement
```bash
# Alias utile
alias ma-sync='cd ~/claude-MightyArchitect && npm run dev:sync && cd -'
```

### 2. Tester avant commit
```bash
npm test
npm run dev:sync
# Tester manuellement dans Claude
git commit
```

### 3. Documenter les breaking changes
Si vous changez un hook qui affecte settings.json, documentez dans CHANGELOG.md

### 4. Branches pour features expérimentales
```bash
git checkout -b experiment/semantic-analysis
# Hack librement
# Si ça marche: merge
# Si ça casse: git branch -D experiment/semantic-analysis
```

## Problèmes Courants

### "Hook not working after changes"

**Solution**: `npm run dev:sync`

### "Command not found"

**Solution**:
```bash
npm run dev:sync
# Vérifier
ls ~/.claude/commands/ | grep your-command
```

### "npm link broke"

**Solution**:
```bash
npm unlink -g
npm link
npm run dev:sync
```

## Workflow Récursif Sûr

**Règle d'or**: Ne JAMAIS modifier directement dans `~/.claude/`

✅ Bon workflow:
```
1. Modifier dans D:\AI_DB\claude-MightyArchitect/
2. npm run dev:sync
3. Tester dans Claude
4. Commit si OK
```

❌ Mauvais workflow:
```
1. Modifier dans ~/.claude/plugins/mighty-architect/
2. Oublier de copier vers repo
3. Perdre les changements au prochain npm install -g
```

---

**Ready to develop!** 🚀

Chaque fois que vous modifiez quelque chose:
```bash
npm run dev:sync && echo "✅ Ready to test!"
```
