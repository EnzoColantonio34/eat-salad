export default function RecipeNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🥗</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Recette non trouvée
        </h1>
        <p className="text-gray-600 mb-8">
          Désolé, cette recette n'existe pas ou n'est plus disponible.
        </p>
        <div className="space-y-4">
          <a
            href="/our-recipes"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voir toutes les recettes
          </a>
          <br />
          <a
            href="/make-your-own-salad"
            className="inline-block text-green-600 hover:text-green-700 transition-colors"
          >
            Créer ma propre salade
          </a>
        </div>
      </div>
    </div>
  );
}
