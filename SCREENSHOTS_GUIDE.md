# 📸 Guide pour ajouter des captures d'écran

## Instructions pour prendre les captures d'écran

1. **Démarrer l'application**
   ```bash
   npm run dev
   ```

2. **Prendre les captures d'écran des pages suivantes** :

### Page d'accueil (/)
- URL: `http://localhost:3001/`
- Nom du fichier: `homepage.png`
- À placer dans: `public/screenshots/`
- Éléments à capturer: Hero section avec logo, image de salade, texte et bouton CTA

### Menu principal (/menu)
- URL: `http://localhost:3001/menu`
- Nom du fichier: `menu-overview.png`
- Éléments à capturer: Grille des salades, filtres par catégorie, navigation

### Créateur de salade (/make-your-own-salad)
- URL: `http://localhost:3001/make-your-own-salad`
- Nom du fichier: `salad-creator.png`
- Éléments à capturer: Formulaire en 3 étapes, sélection d'ingrédients

### Recettes spéciales (/our-recipes)
- URL: `http://localhost:3001/our-recipes`
- Nom du fichier: `recipes-list.png`
- Éléments à capturer: Collection de recettes avec métadonnées

### Page de détail d'une recette
- URL: `http://localhost:3001/our-recipes/1`
- Nom du fichier: `recipe-detail.png`
- Éléments à capturer: Détails complets d'une recette

## Mise à jour du README

Une fois les captures prises, remplacer les sections "*Placez ici une capture...*" par :

```markdown
![Page d'accueil](public/screenshots/homepage.png)

![Menu des salades](public/screenshots/menu-overview.png)

![Créateur de salade](public/screenshots/salad-creator.png)

![Recettes spéciales](public/screenshots/recipes-list.png)
```

## Optimisation des images

Après avoir pris les captures :

1. **Redimensionner** à une largeur maximale de 1200px
2. **Compresser** les images pour réduire la taille de fichier
3. **Renommer** selon la convention ci-dessus
4. **Placer** dans le dossier `public/screenshots/`
