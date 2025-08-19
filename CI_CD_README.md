# Pipeline CI/CD Aevoria

Ce projet utilise GitHub Actions pour automatiser les processus de développement, de test et de déploiement.

## Workflows disponibles

### 1. CI/CD Pipeline (`ci.yml`)
**Déclenchement :** Push sur `main`/`develop` et Pull Requests

**Jobs :**
- **Aevoria Front** : Lint + Build de l'application principale
- **Aevoria Panel** : Lint + Build du panel d'administration

**Actions :**
- ✅ Vérification du code (ESLint)
- 🏗️ Build de production
- 📦 Upload des artifacts pour le déploiement

### 2. Deploy (`deploy.yml`)
**Déclenchement :** Push sur `main` uniquement

**Jobs :**
- **Deploy Front** : Déploiement de l'application principale
- **Deploy Panel** : Déploiement du panel d'administration

**Actions :**
- 📥 Téléchargement des artifacts de build
- 🚀 Déploiement en production

### 3. Security & Quality (`security.yml`)
**Déclenchement :** Hebdomadaire + PR + Push

**Jobs :**
- **Security Audit** : Audit de sécurité des dépendances
- **Dependency Review** : Analyse des nouvelles dépendances (PR uniquement)

## Configuration requise

### Secrets GitHub (à configurer dans Settings > Secrets and variables > Actions)

Pour le déploiement, tu auras besoin de configurer des secrets selon ta plateforme :

#### Vercel
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### Netlify
```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

#### Serveur SSH
```
SSH_PRIVATE_KEY=your_private_key
SSH_HOST=your_server_host
SSH_USER=your_username
DEPLOY_PATH=/path/to/production
```

## Personnalisation

### Ajouter des tests
1. Ajoute un script `test` dans `package.json`
2. Décommente le job `test` dans `ci.yml`

### Modifier le déploiement
Édite le fichier `deploy.yml` et remplace les commentaires par tes commandes de déploiement.

### Ajouter des branches
Modifie les triggers dans chaque workflow :
```yaml
on:
  push:
    branches: [ main, develop, staging ]  # Ajoute tes branches
```

## Monitoring

- **Status des workflows :** Onglet "Actions" sur GitHub
- **Logs détaillés :** Clique sur un job pour voir les logs
- **Artifacts :** Téléchargeables depuis l'onglet Actions

## Bonnes pratiques

1. **Toujours tester en local** avant de pousser
2. **Vérifier les logs** en cas d'échec
3. **Mettre à jour les dépendances** régulièrement
4. **Configurer les secrets** avant le premier déploiement

