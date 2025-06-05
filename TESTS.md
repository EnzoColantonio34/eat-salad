# Script de test pour la page de composition de salade

## Tests automatisés des APIs

### Test 1: API Ingredients - Légumes
```bash
curl "http://localhost:3002/api/ingredients?type=veggies"
# Résultat attendu: ["salad","olives","pickles"]
```

### Test 2: API Ingredients - Protéines  
```bash
curl "http://localhost:3002/api/ingredients?type=proteins"
# Résultat attendu: ["tuna","eggs","tofu"]
```

### Test 3: API Ingredients - Sauces
```bash
curl "http://localhost:3002/api/ingredients?type=sauces"  
# Résultat attendu: ["mustard","vinegar","lemon"]
```

### Test 4: API Order - Commande complète
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Test User", 
    "email": "test@example.com",
    "ingredientsList": {
      "veggie": "salad",
      "protein": "tuna", 
      "sauce": "mustard"
    }
  }' \
  http://localhost:3002/api/order
```

## Tests manuels dans le navigateur

1. **Ouvrir la page** : http://localhost:3002/make-your-own-salad

2. **Vérifier le chargement des ingrédients** :
   - Les 3 sections doivent se charger avec les ingrédients
   - Chaque section doit afficher "Chargement des xxx..." puis les options

3. **Tester la sélection** :
   - Cliquer sur un légume (salad, olives, ou pickles)
   - Cliquer sur une protéine (tuna, eggs, ou tofu)  
   - Cliquer sur une sauce (mustard, vinegar, ou lemon)

4. **Tester le bouton de validation** :
   - Avant sélection complète : bouton grisé et disabled
   - Après sélection complète : bouton vert et actif
   - Pendant soumission : "Validation en cours..." et disabled

5. **Tester la soumission** :
   - Remplir toutes les étapes
   - Cliquer sur "Envoyer votre commande"
   - Attendre 1.5 secondes (délai simulé)
   - Vérifier l'affichage du message de succès avec numéro de commande

## Scenarios de test avancés

### Test de validation du formulaire
- Essayer de soumettre sans sélectionner tous les ingrédients
- Vérifier que le bouton reste disabled

### Test de réactivité
- Changer la sélection d'un ingrédient
- Vérifier que la sélection précédente est désélectionnée
- Vérifier que les champs cachés sont mis à jour

### Test de chargement
- Ouvrir les outils de développement
- Vérifier les appels API dans l'onglet Network
- Vérifier les 3 appels GET vers /api/ingredients avec les bons paramètres

### Test d'erreur (optionnel)
- Arrêter le serveur pendant la soumission
- Vérifier que l'erreur est gérée gracieusement

## Vérifications techniques

### Hook useActionState
- State initial : `{ orderStatus: false, message: "" }`
- FormAction : fonction liée à sendOrder
- isPending : booléen qui change pendant la soumission

### Action sendOrder
- Délai de 1.5s simulé
- Récupération des données FormData
- Appel POST vers /api/order
- Retour du statut avec numéro de commande

### Composant ListOfIngredientsPerType
- useEffect pour charger les données
- Gestion de l'état de chargement
- Boutons radio avec validation

## Checklist finale ✅

- [ ] Page accessible sur /make-your-own-salad
- [ ] 3 étapes de sélection fonctionnelles  
- [ ] Chargement dynamique des ingrédients
- [ ] Validation du formulaire
- [ ] Bouton adaptatif selon l'état
- [ ] Action sendOrder avec délai simulé
- [ ] Appel API vers /api/order
- [ ] Affichage du résultat (succès/erreur)
- [ ] Interface utilisateur moderne et responsive
- [ ] Composants réutilisables et bien structurés
