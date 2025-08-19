# 🎮 Aevoria Front

Plateforme de jeux vidéo moderne construite avec React et Vite.

## 🚀 Technologies

- **Framework** : React 19
- **Build Tool** : Vite 6
- **Styling** : SCSS avec règles personnalisées
- **UI Components** : Material-UI (MUI) 7
- **State Management** : React Query (TanStack Query)
- **Routing** : React Router DOM 7
- **Real-time** : SignalR
- **Charts** : Recharts
- **Canvas** : Konva + React Konva
- **Icons** : FontAwesome + React Icons
- **Emojis** : Emoji Picker React

## 📋 Prérequis

- **Node.js** : 18+ (recommandé 20+)
- **npm** : 10+

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/freelancersProjects/Aevoria-front.git
cd Aevoria-front

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## 📜 Scripts Disponibles

### 🚀 Développement
```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
```

### 🔍 Linting & Qualité
```bash
npm run lint         # Vérifier ESLint (JS/React)
npm run lint:fix     # Corriger automatiquement ESLint
npm run lint:scss    # Vérifier Stylelint (SCSS)
npm run lint:scss:fix # Corriger automatiquement SCSS
npm run lint:all     # Vérifier tout (ESLint + Stylelint)
```

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── AEV/            # Composants AEV personnalisés
│   ├── Layout/         # Header, Footer, etc.
│   └── Visual/         # Composants visuels
├── pages/              # Pages de l'application
│   ├── Home/           # Page d'accueil
│   ├── Profile/        # Profil utilisateur
│   ├── ViewGame/       # Détails d'un jeu
│   └── ...
├── auth/               # Authentification
├── context/            # Contextes React
├── hooks/              # Hooks personnalisés
├── services/           # Services API
├── translations/       # Internationalisation
├── utils/              # Utilitaires
└── assets/             # Images, SVG, etc.
```

## 🎨 Règles de Style

### SCSS Personnalisées

#### rem-calc Obligatoire
Certaines propriétés **DOIVENT** utiliser `rem-calc()` :
```scss
// ✅ Correct
.my-class {
  width: rem-calc(200);
  margin: rem-calc(20);
  font-size: rem-calc(16);
}

// ❌ Incorrect
.my-class {
  width: 200px;        // Erreur !
  margin: 20px;        // Erreur !
  font-size: 16px;     // Erreur !
}
```

#### Polices Globales
**Interdiction** des polices en dur :
```scss
// ✅ Correct
.my-class {
  @extend .font-primary;
}

// ❌ Incorrect
.my-class {
  font-family: "Arial", sans-serif; // Erreur !
}
```

### ESLint
- Indentation : 2 espaces
- Guillemets : Simples (`'`)
- Point-virgules : Obligatoires
- Console.log : Warnings

## 🔧 Configuration

### ESLint
- **Fichier** : `eslint.config.cjs`
- **Plugins** : React, React Hooks
- **Règles** : Strictes pour la qualité du code

### Stylelint
- **Fichier** : `.stylelintrc.cjs`
- **Plugins** : SCSS
- **Règles** : rem-calc + polices personnalisées

## 🚀 Déploiement

### Pipeline CI/CD
Le projet utilise GitHub Actions avec vérifications automatiques :

1. **Lint JavaScript/React** (ESLint)
2. **Lint SCSS** (Stylelint avec règles personnalisées)
3. **Build** de production
4. **Upload** des artefacts

**⚠️ Important** : Le pipeline échoue si des erreurs de lint sont détectées.

### Variables d'Environnement
```bash
# Créer un fichier .env.local
VITE_API_URL=your_api_url
VITE_SOCKET_URL=your_socket_url
```

## 📱 Fonctionnalités

- 🎮 **Catalogue de jeux** avec filtres avancés
- 👤 **Profils utilisateurs** avec dashboard
- 🛒 **Panier d'achat** avec drawer
- 💬 **Chat en temps réel** (SignalR)
- 🌍 **Internationalisation** (FR/EN)
- 📊 **Graphiques et statistiques**
- 🎨 **Canvas interactif** (Konva)
- 📱 **Design responsive**

## 🧪 Tests

```bash
# Lancer les tests (si configurés)
npm test

# Tests en mode watch
npm run test:watch
```

## 📦 Build de Production

```bash
# Build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Standards de Code
- Respecter les règles ESLint et Stylelint
- Utiliser `rem-calc()` pour les dimensions
- Utiliser les classes globales pour les polices
- Tester avant de commit

## 📄 Licence

Ce projet est sous licence [LICENSE_TYPE] - voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement** : [Noms de l'équipe]
- **Design** : [Designer]
- **Product Owner** : [PO]

## 📞 Support

Pour toute question ou problème :
- 📧 Email : [email@aevoria.com]
- 🐛 Issues : [GitHub Issues]
- 📖 Documentation : [Lien vers la doc]

---

**Aevoria** - Votre plateforme de jeux de nouvelle génération 🎮✨
