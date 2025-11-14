# Stratégie de Fusion v2.0 : Task Manager + Architect

## 🎯 Objectif
Fusionner les deux développements parallèles pour créer MightyArchitect v2.0 complet :
- **Main** : Smart Task Manager avec scoring 23 points
- **Branch v2.0** : Refactoring Architect avec structure core/

## 📊 Analyse des Conflits

### Fichiers Modifiés en Commun
| Fichier | Main | v2.0 Branch | Conflit |
|---------|------|-------------|---------|
| `agents/task-manager.md` | `.claude/memory/activeContext.md` | `.claude/memory/core/activeContext.md` | ✅ Simple path update |
| `commands/analyze-todos.md` | `.claude/memory/activeContext.md` | `.claude/memory/core/activeContext.md` | ✅ Simple path update |
| `agents/architect.md` | N/A | Nouveau Mode A & C | ✅ Nouveau fichier |
| `hooks/session-start.js` | v1.x | v2.0 avec migration | ✅ Remplacement complet |
| `hooks/git-commit.js` | v1.x | Mode A enhanced | ✅ Remplacement complet |

### Points d'Intégration Critiques
1. **Task Manager ↔ Architect** : Séparation claire des responsabilités
   - Task Manager : Scoring 23 points sur les todos
   - Architect : Analyse architecturale sur les commits

2. **Structure des Fichiers** : Migration v1 → v2
   - `activeContext.md` → `core/activeContext.md`
   - `patterns.md` → `core/systemPatterns.md`
   - Nouveaux : `core/projectbrief.md`, `core/productContext.md`, etc.

3. **Hooks** : Coordination entre agents
   - SessionStart : Auto-migration + chargement sélectif
   - PostToolUse : Architect Mode A trigger
   - PreToolUse : Task Manager via TodoWrite

## 🔄 Plan de Fusion

### Phase 1 : Préparation
```bash
# 1. Créer une branche de test
cd .worktrees/windsurf-structure-v2
git checkout -b integration-test

# 2. Rebase sur main pour avoir les derniers changements
git fetch origin
git rebase origin/main
```

### Phase 2 : Résolution des Conflits
Les conflits seront minimes car :
- Task Manager : Juste des paths à adapter
- Architect : Nouveaux fichiers sans conflit
- Templates : Nouveaux fichiers sans conflit

### Phase 3 : Tests d'Intégration

#### Test 1 : Coexistence Task Manager + Architect
```bash
# Créer des todos et les compléter
# Vérifier que Task Manager crée les logs avec scoring
# Faire un commit architectural
# Vérifier que Architect Mode A détecte les patterns
```

#### Test 2 : Migration v1→v2 avec Task Manager
```bash
# Simuler un projet v1.x avec task logs existants
# Déclencher SessionStart
# Vérifier :
# - Migration réussie
# - Task logs préservés
# - Task Manager fonctionne avec core/
```

#### Test 3 : Workflow Complet
```bash
# 1. SessionStart : charge v2.0 structure
# 2. Créer todos (vibe coding)
# 3. /analyze-todos : Task Manager analyse
# 4. git commit : Architect Mode A trigger
# 5. /architect-review : Mode C analysis
```

## 🛡️ Points de Vérification

### Avant le Merge
- [ ] Tous les tests passent (11/11)
- [ ] Task Manager utilise `core/activeContext.md`
- [ ] Architect Mode A se déclenche sur commits
- [ ] Auto-migration v1→v2 fonctionne
- [ ] Token budget respecté (800-1000 tokens)

### Après le Merge
- [ ] `/analyze-todos` crée des task logs avec scoring
- [ ] Commits architecturaux déclenchent Mode A
- [ ] `/architect-review` lance Mode C
- [ ] SessionStart charge la bonne structure
- [ ] Windows workaround fonctionne

## 📝 Commandes de Merge

```bash
# Option 1 : Merge direct (recommandé car peu de conflits)
cd D:/AI_DB/claude-MightyArchitect
git merge .worktrees/windsurf-structure-v2/feature/windsurf-structure-v2

# Option 2 : Cherry-pick des commits importants
git cherry-pick 6b49c55  # Update Task Manager paths
git cherry-pick f699119  # Update analyze-todos paths
git cherry-pick 0156cf5  # Version tracking
git cherry-pick 9cdc0b1  # Enhanced Mode A
git cherry-pick d784013  # Final v2.0 implementation

# Option 3 : Rebase interactif (plus de contrôle)
cd .worktrees/windsurf-structure-v2
git rebase -i origin/main
# Réorganiser et squash si nécessaire
```

## 🎯 Résultat Attendu

### Architecture Finale v2.0
```
MightyArchitect v2.0
├── Task Manager Agent
│   ├── 23-point scoring (Windsurf)
│   ├── Semantic analysis
│   └── Works with core/
├── Architect Agent
│   ├── Mode A (auto, 60s)
│   ├── Mode C (manual, 5-10min)
│   └── Pattern detection
└── Memory Structure v2.0
    ├── core/ (6 files)
    ├── knowledge/
    ├── tasks/
    ├── plans/
    └── errors/
```

### Synergie Task Manager + Architect
1. **Task Manager** : Qualité micro (todos, implémentation)
2. **Architect** : Cohérence macro (patterns, architecture)
3. **LLM** : Exécution avec contexte enrichi

## 🚨 Risques et Mitigation

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Paths incohérents | Task Manager échoue | Tests d'intégration complets |
| Double scoring | Confusion des rôles | Documentation claire |
| Token overflow | Dépassement budget | Chargement sélectif strict |
| Migration échoue | Perte de données | Backup automatique |

## ✅ Checklist Finale

- [ ] Créer branche integration-test
- [ ] Résoudre conflits de paths
- [ ] Tester Task Manager avec core/
- [ ] Tester Architect Mode A trigger
- [ ] Tester migration v1→v2
- [ ] Tester workflow complet
- [ ] Documenter dans CHANGELOG
- [ ] Merge vers main
- [ ] Tag v2.0.0
- [ ] Célébrer ! 🎉