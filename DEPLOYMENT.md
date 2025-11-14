# 🚀 MightyArchitect v2.0 - Guide de Déploiement

## 📦 Installation sur un Nouveau PC

### Prérequis
- Node.js >= 14.0.0
- Claude Code installé
- Git

### Installation Rapide

#### Option 1: NPX (Recommandé)
```bash
npx create-mighty-architect
```

#### Option 2: Clone depuis GitHub
```bash
# Cloner le repo
git clone https://github.com/StarenseN/Claude-MightyArchitect.git
cd Claude-MightyArchitect

# Installer globalement
npm install -g .
```

### Vérification de l'Installation

```bash
# Vérifier que les hooks sont enregistrés
cat ~/.claude/settings.json | grep -A 5 "mighty-architect"

# Vérifier que les commandes sont installées
ls ~/.claude/commands/ | grep -E "architect|forensic|bootstrap"
```

---

## 🎯 Premier Projet

### 1. Initialiser un Nouveau Projet

```bash
cd your-new-project
claude
```

**macOS/Linux**: Le système se charge automatiquement ✅

**Windows**: Exécuter `/power-up` au démarrage:
```
/power-up
```

### 2. Vérifier l'Initialisation

```bash
# La structure doit être créée
ls -la .claude/memory/

# Devrait afficher:
# core/
# knowledge/
# tasks/
# plans/
# errors/
# memory-index.md
# .version
```

### 3. Premier Commit

```bash
# Créer du code (3+ fichiers)
git add .
git commit -m "feat: initial project structure"

# Mode A se déclenche automatiquement! 🎉
```

---

## 🔧 Migration depuis v1.x

Si vous avez déjà MightyArchitect v1.x installé :

### Automatique (Recommandé)

```bash
# Lancer Claude dans un projet v1.x
cd your-old-project
claude

# La migration se lance automatiquement:
# ✓ Backup créé dans .claude/memory.backup-v1/
# ✓ Structure v2.0 créée
# ✓ Données préservées
# ✓ Version trackée
```

### Manuelle (Si Problème)

```bash
# Backup manuel
cp -r .claude/memory .claude/memory.backup-manual

# Réinstaller MightyArchitect v2.0
npm install -g claude-mighty-architect@latest

# Lancer Claude pour migration
claude
```

---

## 📊 Validation de l'Installation

### Test de Cohérence

```bash
cd Claude-MightyArchitect
node test/coherence-test.js

# Devrait afficher:
# Tests Passed: 10/10
# Coherence Score: 100%
# 🏆 EXCELLENT - System highly coherent
```

### Test Complet

```bash
npm test

# Devrait afficher:
# Tests run: 11
# Passed: 11
# Failed: 0
# ✨ All tests passed!
```

---

## 🐛 Troubleshooting

### Problème: Hooks ne se déclenchent pas

**Solution Windows**:
```bash
/power-up  # À chaque démarrage de session
```

**Solution macOS/Linux**:
```bash
# Vérifier que les hooks sont enregistrés
cat ~/.claude/settings.json | grep -A 10 hooks

# Réinstaller si nécessaire
npm install -g claude-mighty-architect
```

### Problème: Migration échoue

```bash
# Vérifier la structure existante
ls -la .claude/memory/

# Si corrompue, réinitialiser
rm -rf .claude/memory/
claude  # Réinitialise automatiquement
```

### Problème: Tests échouent

```bash
# Nettoyer et réinstaller
npm clean-install
npm test

# Si persistant, vérifier Node.js version
node --version  # Doit être >= 14.0.0
```

---

## 📈 Utilisation Post-Installation

### Workflow Recommandé

1. **Démarrer session**:
   - macOS/Linux: Automatique
   - Windows: `/power-up`

2. **Développer normalement** avec Claude

3. **Commit réguliers**:
   ```bash
   git commit -m "feat: add user authentication"  # Mode A auto
   ```

4. **Review approfondie** (optionnel):
   ```bash
   /architect-review  # Mode C manuel
   ```

5. **Analyser projet existant** (optionnel):
   ```bash
   /forensic  # Analyse historique git
   /bootstrap  # Analyse structure code
   ```

---

## 🎯 Métriques de Succès

Une installation réussie doit afficher:

✅ **Cohérence**: 100% (10/10 tests)
✅ **Tests unitaires**: 11/11 passent
✅ **Token usage**: ~800-1000 (budget: 1500)
✅ **Pattern detection**: Fonctionne après commits
✅ **Task logs**: Auto-générés via TodoWrite
✅ **Migration v1→v2**: Automatique avec backup

---

## 📚 Ressources

- **Documentation**: [README.md](README.md)
- **Architecture**: [Docs/ARCHITECTURE-HEALTH-REPORT.md](Docs/ARCHITECTURE-HEALTH-REPORT.md)
- **Analyse v2.0**: [Docs/20251114-0906-architectural-review-mode-c.md](Docs/20251114-0906-architectural-review-mode-c.md)
- **Windows**: [Docs/WINDOWS-WORKAROUND.md](Docs/WINDOWS-WORKAROUND.md)

---

## 🆘 Support

**Problèmes?** [GitHub Issues](https://github.com/StarenseN/Claude-MightyArchitect/issues)
**Questions?** [GitHub Discussions](https://github.com/StarenseN/Claude-MightyArchitect/discussions)

---

**Version**: 2.0.0
**Date**: 2025-11-14
**Status**: ✅ Production Ready (après tests complets)