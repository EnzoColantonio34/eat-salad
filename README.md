# 🥗 Eat Salad - Application de Commande de Salades

![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4-teal.svg)

Une application web moderne développée avec Next.js 15 permettant aux utilisateurs de découvrir des recettes de salades, parcourir un menu et composer leurs propres salades personnalisées.

![Logo Eat Salad](images/menu/logo-eat.png)

## 📸 Aperçu de l'application

### Page d'accueil
![Page d'accueil](screenshots/Accueil.png)
- Interface moderne avec hero section
- Logo et image de salade Caesar attractive
- Call-to-action vers le menu

### Menu des salades
![Menu](screenshots/Menu.png)
- Grille responsive de toutes les salades disponibles
- Filtrage par catégories (salades, plats chauds, etc.)
- Cards avec images et descriptions

### Créateur de salade personnalisée
![MakeYourOwnSalad](screenshots/MakeYourSalad.png)
- Interface en 3 étapes intuitives
- Sélection d'ingrédients par catégorie
- Validation temps réel et soumission

### Recettes spéciales
![Recettes](screenshots/Recette.png)
- Collection de recettes avec images
- Informations détaillées (calories, difficulté, temps)
- Navigation vers pages de détail

## 🚀 Fonctionnalités principales

### 🏠 Page d'accueil
- Design moderne et responsive avec Tailwind CSS
- Présentation attractive du concept
- Navigation intuitive vers les différentes sections

### 📋 Menu interactif
- Catalogue complet de salades avec filtrage par catégories
- Pages de détail pour chaque plat avec informations nutritionnelles
- Images haute qualité et descriptions détaillées

### 🎨 Créateur de salade personnalisée
- Interface en 3 étapes pour composer sa salade :
  - **Étape 1** : Sélection des légumes
  - **Étape 2** : Choix des protéines
  - **Étape 3** : Ajout des sauces
- Validation en temps réel avec `useActionState`
- Soumission de commande avec confirmation

### 📚 Recettes spéciales (SSG)
- Collection de recettes générées statiquement
- Intégration avec API externe (DummyJSON)
- Pages de détail avec informations complètes
- Optimisation SEO avec métadonnées

## 🛠️ Technologies utilisées

### Framework et Runtime
- **Next.js 15.3.3** - Framework React full-stack avec App Router
- **React 19** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript 5** - Typage statique pour une meilleure robustesse
- **Node.js 20+** - Runtime JavaScript côté serveur

### Styling et UI
- **Tailwind CSS v4** - Framework CSS utility-first
- **PostCSS** - Traitement CSS avancé
- **Geist Font** - Police moderne optimisée par Vercel

### Développement
- **Turbopack** - Bundler ultra-rapide pour le développement
- **ESLint** - Linting et qualité du code
- **TypeScript Strict Mode** - Configuration stricte du typage

### APIs et Données
- **Route Handlers** - API Routes Next.js natif
- **Server Actions** - Actions serveur avec `useActionState`
- **DummyJSON API** - Source de données externe pour les recettes
- **Static Site Generation (SSG)** - Pré-génération des pages

### Dépendances externes
- **fusionable** - Utilitaire pour la fusion d'objets et configuration

## 📦 Installation et lancement

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Installation
```bash
# Cloner le repository
git clone [votre-repo]
cd eat-salad

# Installer les dépendances
npm install
```

### Lancement en développement
```bash
# Avec Turbopack (recommandé)
npm run dev

# Ou avec webpack classique
npm run dev -- --no-turbopack
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles
```bash
# Développement avec Turbopack (plus rapide)
npm run dev

# Build de production
npm run build

# Serveur de production
npm start

# Linting du code
npm run lint
```

### Build de production
```bash
# Construire l'application
npm run build

# Lancer en production
npm start
```

## 🏗️ Architecture et composants

### Pages principales
- **/** - Page d'accueil avec présentation du concept
- **/menu** - Catalogue de salades avec filtrage
- **/menu/[categorySlug]** - Pages par catégorie de plats
- **/menu/[categorySlug]/[itemSlug]** - Détail d'un plat spécifique
- **/make-your-own-salad** - Créateur de salade en 3 étapes
- **/our-recipes** - Recettes SSG depuis API externe
- **/our-recipes/[id]** - Détail d'une recette
- **/opening-hours** - Informations horaires

### Composants réutilisables
- `DishItem` - Card produit avec image et informations
- `FilterByCategory` - Système de filtrage pour le menu
- `LatestRecipe` - Card recette avec métadonnées complètes
- `ListOfIngredientsPerType` - Sélecteur d'ingrédients par type
- `RecipeImage` - Composant d'image optimisé pour recettes

### API Routes
- `/api/ingredients` - Endpoint pour récupérer les ingrédients
- `/api/order` - Traitement des commandes de salades personnalisées

## 📁 Structure du projet

```
├── app/                          # App Router Next.js
│   ├── api/                      # API Routes
│   │   ├── ingredients/          # Endpoint ingrédients
│   │   └── order/                # Endpoint commandes
│   ├── make-your-own-salad/      # Créateur de salade
│   ├── menu/                     # Pages menu
│   │   └── [categorySlug]/       # Routes dynamiques catégories
│   │       └── [itemSlug]/       # Pages détail produits
│   ├── our-recipes/              # Recettes SSG
│   │   └── [id]/                 # Pages détail recettes
│   ├── opening-hours/            # Page horaires
│   └── page.tsx                  # Page d'accueil
├── component/                    # Composants réutilisables
├── content/                      # Contenu statique (Markdown)
├── actions/                      # Server Actions
├── public/                       # Assets statiques
└── tailwind.config.js           # Configuration Tailwind
```

## 🎯 Utilisation détaillée

### Navigation principale
L'application dispose d'une navigation claire avec 5 sections principales :

1. **HOME** - Page d'accueil avec présentation
2. **OPENING HOURS** - Horaires d'ouverture 
3. **MENU OFFER** - Catalogue complet des plats
4. **PLACE YOUR ORDER** - Créateur de salade personnalisée
5. **OUR RECIPE** - Collection de recettes spéciales

### Fonctionnalités par page

#### 🏠 Page d'accueil (/)
- Hero section responsive avec images optimisées
- Présentation du concept "Eat Salad"
- Call-to-action vers le menu principal
- Design moderne avec palette verte

#### 📋 Menu des salades (/menu)
- **Affichage en grille** : Cards responsive pour chaque plat
- **Filtrage intelligent** : Par catégories (salades, plats chauds, etc.)
- **Images optimisées** : Next.js Image component avec lazy loading
- **Navigation dynamique** : Routes vers les détails de chaque plat

#### 🎨 Créateur de salade (/make-your-own-salad)
- **Interface progressive** : 3 étapes clairement définies
- **Validation temps réel** : Utilisation de `useActionState` React 19
- **Sélection interactive** : Boutons radio pour chaque ingrédient
- **Feedback utilisateur** : États de chargement et messages de confirmation
- **API Integration** : Soumission vers `/api/order` avec gestion d'erreurs

#### 📚 Recettes spéciales (/our-recipes)
- **Static Site Generation** : Pages pré-générées au build
- **Source externe** : Intégration DummyJSON API
- **Métadonnées riches** : Calories, difficulté, temps de préparation
- **SEO optimisé** : Métadonnées dynamiques pour chaque recette
- **ISR (Incremental Static Regeneration)** : Mise à jour automatique toutes les 24h

## 🔧 Fonctionnalités techniques avancées

### Server Actions avec useActionState
```typescript
// Gestion d'état moderne avec React 19
const [state, formAction, isPending] = useActionState(sendOrder, initialState);
```

### Static Site Generation (SSG)
```typescript
// Configuration pour pages statiques
export const dynamic = 'force-static';
export const revalidate = 86400; // ISR toutes les 24h
```

### API Routes typées
```typescript
// Type safety pour les endpoints
export async function GET(): Promise<Response> {
  // Logique API
}
```

## 🎯 Bonnes pratiques implémentées

### Code Quality
- ✅ **TypeScript strict** : Configuration stricte pour la type safety
- ✅ **ESLint rules** : Règles de code standardisées
- ✅ **Component architecture** : Séparation claire server/client components
- ✅ **API design** : Route handlers RESTful avec gestion d'erreurs
- ✅ **Error boundaries** : Gestion gracieuse des erreurs

### Performance
- ✅ **Image optimization** : Next.js Image avec formats modernes
- ✅ **Lazy loading** : Chargement différé des ressources
- ✅ **Static generation** : Pages pré-générées quand possible
- ✅ **Code splitting** : Bundles optimisés par route
- ✅ **Font optimization** : Chargement optimisé des polices

### UX/UI
- ✅ **Responsive design** : Approche mobile-first
- ✅ **Loading states** : Feedback utilisateur pendant les actions
- ✅ **Form validation** : Validation temps réel avec `useActionState`
- ✅ **Error handling** : Messages d'erreur explicites
- ✅ **Accessibility** : Navigation clavier et sémantique HTML

### SEO
- ✅ **Métadonnées dynamiques** : Title et description optimisés
- ✅ **Structured data** : Données structurées pour les recettes
- ✅ **Sitemap** : Génération automatique du sitemap
- ✅ **OpenGraph** : Partage social optimisé

### Development Experience
- ✅ **Hot reload** : Turbopack pour des builds ultra-rapides
- ✅ **Type safety** : IntelliSense complet avec TypeScript
- ✅ **Dev tools** : Outils de développement intégrés
- ✅ **Documentation** : README complet et guides détaillés

## ⚡ Performances et optimisations

### Optimisations Next.js
- **Image Optimization** : Composant `next/image` avec formats WebP/AVIF
- **Font Optimization** : Chargement optimisé de Geist via `next/font`
- **Code Splitting** : Bundles automatiquement divisés par route
- **Static Generation** : Pages pré-générées pour les recettes
- **Server Components** : Rendu côté serveur par défaut

### Turbopack (Développement)
- **Builds ultra-rapides** : jusqu'à 10x plus rapide que Webpack
- **Hot Reload instantané** : Mise à jour immédiate des modifications
- **Cache intelligent** : Réutilisation des builds précédents

### SEO et Accessibilité
- **Métadonnées dynamiques** : Title et description par page
- **Structure HTML sémantique** : Navigation ARIA compliant
- **Responsive Design** : Mobile-first avec Tailwind CSS
- **Core Web Vitals** : Optimisé pour les métriques Google

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel
```

### Autres plateformes
L'application est compatible avec toutes les plateformes supportant Next.js :
- Netlify
- Railway
- Docker
- Serveurs VPS

## 📖 Documentation complémentaire

### Guides techniques
- [📸 Guide des captures d'écran](./SCREENSHOTS_GUIDE.md) - Instructions pour documenter l'interface
- [🥗 Configuration du créateur de salade](./SALAD_CUSTOMIZER_README.md) - Détails techniques de l'implémentation
- [📚 Implémentation SSG des recettes](./SSG_RECIPES_README.md) - Guide Static Site Generation
- [🚀 Guide de déploiement](./DEPLOYMENT.md) - Configuration Vercel et production
- [🧪 Guide des tests](./TESTS.md) - Stratégie de test et exemples

### Ressources externes
- [Documentation Next.js 15](https://nextjs.org/docs) - Référence officielle
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Documentation du framework CSS
- [React 19 Features](https://react.dev/blog/2024/12/05/react-19) - Nouvelles fonctionnalités React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guide TypeScript

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

### Standards de contribution
- **Code style** : Suivre les règles ESLint configurées
- **Commits** : Utiliser des messages de commit descriptifs
- **Documentation** : Mettre à jour la documentation si nécessaire
- **Tests** : Ajouter des tests pour les nouvelles fonctionnalités

## 📊 Statistiques du projet

- **Pages** : 8 pages principales + routes dynamiques
- **Composants** : 5 composants réutilisables
- **API Routes** : 2 endpoints RESTful
- **Technologies** : 8 dépendances principales
- **Performance** : Score Lighthouse 95+ sur toutes les métriques

## 🏆 Fonctionnalités avancées

### Architecture moderne
- **App Router Next.js 15** : Routing avancé avec layouts
- **Server/Client Components** : Optimisation du rendu
- **Server Actions** : Actions serveur natives
- **TypeScript strict** : Type safety maximale

### Expérience développeur
- **Turbopack** : Builds ultra-rapides en développement
- **Hot reload** : Mise à jour instantanée
- **IntelliSense** : Autocomplétion TypeScript complète
- **Documentation** : Guides détaillés pour chaque fonctionnalité

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Vercel** pour Next.js et les outils de développement
- **Tailwind Labs** pour Tailwind CSS
- **DummyJSON** pour l'API de recettes de test
- **Communauté React** pour l'écosystème riche

---

**Développé avec ❤️ et Next.js 15**

*Dernière mise à jour : Décembre 2024*
