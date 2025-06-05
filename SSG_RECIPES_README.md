# Étape 10 : Recettes Spéciales avec SSG (Static Site Generation)

## 🎯 Objectif

Créer une page SSG utilisant l'équivalent de `getStaticProps` dans Next.js App Router pour charger les données lors du build de l'application.

## 🚀 Implémentation Réalisée

### 1. Composant `LatestRecipe`

**Fichier :** `component/LatestRecipe.tsx`

- Interface TypeScript complète pour les recettes
- Design responsive avec Tailwind CSS
- Affichage des informations clés : difficulté, cuisine, calories, temps
- Tags et ingrédients principaux
- Lien cliquable vers la page de détail

### 2. Page principale des recettes

**Fichier :** `app/our-recipes/page.tsx`

**Caractéristiques SSG :**
```typescript
// Configuration pour forcer la génération statique
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidation toutes les 24 heures

// Métadonnées pour le SEO (générées statiquement)
export const metadata: Metadata = {
  title: 'Nos Recettes Spéciales | Eat Salad',
  description: 'Collection de recettes délicieuses et originales',
  // ... autres métadonnées
};
```

**Fonction de récupération des données :**
```typescript
async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch('https://dummyjson.com/recipes', {
    next: { revalidate: 86400 } // ISR - Incremental Static Regeneration
  });
  return data.recipes;
}
```

### 3. Pages de détail dynamiques

**Fichier :** `app/our-recipes/[id]/page.tsx`

**Génération statique avec `generateStaticParams` :**
```typescript
export async function generateStaticParams() {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();
  
  return data.recipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}
```

**Métadonnées dynamiques :**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipe(id);
  
  return {
    title: `${recipe.name} | Recettes Eat Salad`,
    description: `Recette ${recipe.difficulty} - ${recipe.cuisine}`,
    // ...
  };
}
```

### 4. Gestion des erreurs

**Fichier :** `app/our-recipes/[id]/not-found.tsx`
- Page d'erreur personnalisée pour les recettes inexistantes

## 📊 Résultats du Build

Lors du `npm run build`, nous obtenons :

```
Route (app)                                 Size  First Load JS  Revalidate
├ ○ /our-recipes                           189 B         110 kB          1d
└ ● /our-recipes/[id]                      173 B         107 kB          1d
    ├ /our-recipes/1                                                     1d
    ├ /our-recipes/2                                                     1d
    └ [+27 more paths] (30 pages au total)
```

**Légende :**
- ○ (Static) : contenu statique pré-rendu
- ● (SSG) : HTML statique pré-rendu avec `generateStaticParams`

## 🔄 Différences avec Pages Router

### Ancien système (Pages Router)
```typescript
// pages/our-recipes.js
export async function getStaticProps() {
  const recipes = await fetch('https://dummyjson.com/recipes');
  return {
    props: { recipes: recipes.json() },
    revalidate: 86400
  };
}
```

### Nouveau système (App Router)
```typescript
// app/our-recipes/page.tsx
export const revalidate = 86400;

async function getRecipes() {
  return await fetch('https://dummyjson.com/recipes', {
    next: { revalidate: 86400 }
  });
}

export default async function Page() {
  const recipes = await getRecipes(); // Server Component
  return <div>{/* JSX */}</div>;
}
```

## 🎨 Fonctionnalités Implémentées

### Interface Utilisateur
✅ **Grille responsive** des recettes (1-4 colonnes selon l'écran)  
✅ **Cards interactives** avec hover effects  
✅ **Informations détaillées** : rating, temps, calories, difficulté  
✅ **Tags visuels** pour les catégories  
✅ **Navigation** vers les pages de détail  

### Optimisations
✅ **Images Next.js** avec `priority` et `sizes` optimisés  
✅ **Métadonnées SEO** générées dynamiquement  
✅ **Lazy loading** automatique  
✅ **Cache intelligent** avec revalidation  

### Expérience Développeur
✅ **TypeScript** avec interfaces complètes  
✅ **Gestion d'erreurs** robuste  
✅ **Code réutilisable** et modulaire  
✅ **Performance optimale** grâce au SSG  

## 🌟 Avantages du SSG

1. **Performance** : Pages pré-générées = chargement instantané
2. **SEO** : Contenu statique indexable par les moteurs de recherche
3. **Évolutivité** : Pas de charge serveur à l'exécution
4. **Résilience** : Fonctionne même si l'API externe est temporairement indisponible
5. **CDN** : Déployable sur n'importe quel CDN

## 📝 Comment Tester

```bash
# Mode développement
npm run dev

# Build et mode production
npm run build
npm start

# Vérifier les pages générées
ls -la .next/server/app/our-recipes/
```

## 🔗 URLs Disponibles

- `/our-recipes` - Liste de toutes les recettes
- `/our-recipes/1` à `/our-recipes/30` - Pages de détail (pré-générées)
- Pages avec IDs inexistants → redirection vers `not-found.tsx`
