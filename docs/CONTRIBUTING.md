# CONTRIBUTING.md
## Guide de Contribution à Archimag

**Version** : 1.0  
**Date** : Juillet 2026  

Merci de votre intérêt pour contribuer à **Archimag** ! Ce guide explique comment contribuer efficacement.

---

## Table des Matières

1. [Avant de Commencer](#avant-de-commencer)
2. [Configuration Locale](#configuration-locale)
3. [Processus de Contribution](#processus-de-contribution)
4. [Standards de Code](#standards-de-code)
5. [Conventions Git](#conventions-git)
6. [Pull Request Guidelines](#pull-request-guidelines)
7. [Communication](#communication)

---

## Avant de Commencer

### Prérequis

- Compte GitHub actif
- Git 2.30+
- Node.js 16+ ou Python 3.9+
- Familiarité avec Git / GitHub

### Posez des Questions

- 💬 **Discussions** : https://github.com/Houston-prog/Archimag/discussions
- 📧 **Email** : dev@houston-prog.dev
- 🎯 **Issues** : Vérifiez si le sujet existe déjà

---

## Configuration Locale

### 1. Fork le Repository

```bash
# Sur GitHub : Cliquez "Fork" en haut à droite
```

### 2. Clone Votre Fork

```bash
git clone https://github.com/VOTRE-USERNAME/Archimag.git
cd Archimag
git remote add upstream https://github.com/Houston-prog/Archimag.git
```

### 3. Installer les Dépendances

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Ou voir INSTALLATION.md pour les détails
```

### 4. Créer une Branche

```bash
# Synchroniser avec upstream
git fetch upstream
git checkout -b upstream/main

# Créer votre branche de travail
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b bugfix/mon-bug
# ou
git checkout -b docs/ma-documentation
```

---

## Processus de Contribution

### Types de Contributions

```
✨ Nouvelles fonctionnalités
🐛 Corrections de bugs
📚 Documentation
🧪 Tests
♻️ Refactoring
⚡ Performance
🔒 Sécurité
🎨 Design/UI
```

### Workflow

```
1. FORK & CLONE
   └─> git clone + git remote add upstream

2. CREATE BRANCH
   └─> git checkout -b feature/xyz

3. CODE & COMMIT
   ├─> Make changes
   ├─> Tests passing
   └─> git commit -m "feat: ..."

4. PUSH
   └─> git push origin feature/xyz

5. CREATE PR
   └─> GitHub: Create Pull Request

6. CODE REVIEW
   └─> Revue + Modifications

7. MERGE
   └─> Maintainers merge votre PR
```

---

## Standards de Code

### Formatage

#### JavaScript/TypeScript

```javascript
// ESLint + Prettier
npm run lint    # Vérifier
npm run format  # Formater
```

**Fichier .prettierrc** :

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

#### Python

```bash
# Black + isort
black .
isort .
flake8 .  # Lint
mypy .    # Type checking
```

### Commentaires et Documentation

#### Code Comments (En Anglais)

```javascript
// ✅ BON
// Fetch user permissions from cache if available
const getPermissions = async (userId) => {
  // Try cache first (Redis)
  const cached = await redis.get(`perms:${userId}`);
  if (cached) return JSON.parse(cached);
  
  // Falls back to database
  return await db.query('SELECT * FROM permissions WHERE user_id = ?', [userId]);
};

// ❌ MAUVAIS
// Get permissions
const getPermissions = (userId) => {
  // TODO: fix this
  return data;
};
```

#### JSDoc

```javascript
/**
 * Uploads a document to S3 storage
 * @param {File} file - Document file object
 * @param {string} folderId - Target folder UUID
 * @param {Object} metadata - Document metadata
 * @returns {Promise<{id: string, url: string}>} Upload result
 * @throws {ValidationError} If file size > 10GB
 * @throws {StorageError} If S3 upload fails
 * @example
 * const result = await uploadDocument(file, folderId, {title: 'My Doc'});
 */
const uploadDocument = async (file, folderId, metadata) => {
  // Implementation
};
```

### Tests

#### Jest (Frontend/Backend)

```bash
# Exécuter les tests
npm test

# Avec couverture
npm run test:coverage

# Watch mode
npm run test:watch
```

#### Exemple Test

```javascript
describe('DocumentService', () => {
  describe('uploadDocument', () => {
    it('should upload document successfully', async () => {
      const file = { name: 'test.pdf', size: 1000 };
      const result = await uploadDocument(file, 'folder-id');
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('url');
    });

    it('should reject files > 10GB', async () => {
      const largeFile = { size: 11 * 1024 * 1024 * 1024 };
      
      await expect(uploadDocument(largeFile)).rejects.toThrow(
        'File too large'
      );
    });
  });
});
```

#### Coverage Target

```
├─ Statements   : ≥ 80%
├─ Branches     : ≥ 75%
├─ Functions    : ≥ 80%
└─ Lines        : ≥ 80%
```

---

## Conventions Git

### Commit Messages

Format: `<type>(<scope>): <subject>`

```
feat(documents): add bulk upload feature
↑     ↑         ↑
|     |         └─> Sujet clair et concis (impératif, en anglais)
|     └─────────────> Domaine affecté
└─────────────────────> Type de changement
```

### Types de Commit

| Type | Usage | Exemple |
|------|-------|----------|
| `feat` | Nouvelle fonctionnalité | `feat(search): add advanced filters` |
| `fix` | Correction de bug | `fix(upload): handle corrupted files` |
| `docs` | Documentation uniquement | `docs(readme): update installation` |
| `style` | Formatage, pas de logique | `style: reformat code blocks` |
| `refactor` | Refonte sans changement comportement | `refactor(auth): simplify login flow` |
| `perf` | Amélioration performance | `perf(search): optimize query` |
| `test` | Tests uniquement | `test(documents): add upload tests` |
| `ci` | CI/CD config | `ci: add github actions workflow` |
| `chore` | Dépendances, tools | `chore: update dependencies` |

### Exemple de Commits Bons

```bash
# ✅ BON
git commit -m "feat(workflows): add approval step to workflow engine"
git commit -m "fix(permissions): fix cascade delete issue on folder removal"
git commit -m "test(api): add comprehensive tests for auth endpoints"
git commit -m "docs(api): document new search endpoint"

# ❌ MAUVAIS
git commit -m "Fixed stuff"
git commit -m "WIP"
git commit -m "asdfasd"
git commit -m "Updated code"
```

### Commits Atomiques

```bash
# ✅ BON : Chaque commit est autonome et logique
git commit -m "feat: add user registration endpoint"
git commit -m "test: add unit tests for registration"
git commit -m "docs: document registration API"

# ❌ MAUVAIS : Tout mélangé dans un seul commit
git commit -m "Added registration, tests, docs, and fixed auth bug"
```

---

## Pull Request Guidelines

### Avant de Créer une PR

- [ ] Code testé localement
- [ ] Tests écrits et `npm test` réussi
- [ ] Code formaté (`npm run format`)
- [ ] Lint passé (`npm run lint`)
- [ ] Commits bien structurés (atomiques)
- [ ] Branche à jour avec `upstream/main`
- [ ] Pas de dépendances non testées

### Template PR

```markdown
## Description
Description claire de ce qui change et pourquoi.

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester
1. Cloner la branche
2. Faire X, Y, Z
3. Vérifier que...

## Checklist
- [ ] Tests écrits et passants
- [ ] Documentation mise à jour
- [ ] Pas de warnings dans les logs
- [ ] CHANGELOG.md mis à jour
- [ ] Commits bien messagés

## Screenshots (si applicable)
[Ajouter des screenshots des changements UI]

## Fixes
Closes #123, Closes #456
```

### Code Review

Les mainteneurs vérifieront :

- ✅ Code quality (architecture, design patterns)
- ✅ Tests (coverage, edge cases)
- ✅ Documentation
- ✅ Performance impact
- ✅ Security concerns
- ✅ Backward compatibility

### Adresser les Commentaires

```bash
# Ne pas squash les commits automatiquement
# Ajouter des commits de correction directement

git add .
git commit -m "Address review: fix edge case in validation"
git push

# Maintainer merge tout ensemble avec "Squash and merge"
```

---

## Communication

### Où Poser des Questions

| Canal | Usage |
|-------|-------|
| **GitHub Issues** | Bugs, feature requests |
| **Discussions** | Questions générales, design |
| **Slack/Chat** | Discussions temps réel (invite required) |
| **Email** | dev@houston-prog.dev |

### Code of Conduct

- 🤝 Respecter tous les contributeurs
- 💬 Communication claire et constructive
- 🚫 Zéro tolérance pour le harcèlement/discrimination
- 🔄 Feedback bienveillant et orienté amélioration

---

## Remerciements

Merci beaucoup pour votre contribution à Archimag ! Vous rendez ce projet meilleur. 🚀

---

**Last Updated** : Juillet 2026