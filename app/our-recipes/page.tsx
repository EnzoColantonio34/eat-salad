import LatestRecipe from '../../component/LatestRecipe';
import { Metadata } from 'next';

// Configuration pour forcer la génération statique
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidation toutes les 24 heures

// Métadonnées pour le SEO (générées statiquement)
export const metadata: Metadata = {
  title: 'Nos Recettes Spéciales | Eat Salad',
  description: 'Découvrez notre collection de recettes délicieuses et originales, soigneusement sélectionnées pour vous inspirer en cuisine.',
  keywords: 'recettes, cuisine, salade, healthy, nutrition',
  openGraph: {
    title: 'Nos Recettes Spéciales | Eat Salad',
    description: 'Collection de recettes délicieuses et originales',
    type: 'website',
  },
};

interface Recipe {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

// Cette fonction sera exécutée au moment du build (SSG)
async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch('https://dummyjson.com/recipes', {
      // Force la régénération toutes les 24 heures
      next: { revalidate: 86400 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data: RecipesResponse = await response.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export default async function OurRecipesPage() {
  // Les données sont pré-chargées au moment du build
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Nos Recettes Spéciales
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre collection de recettes délicieuses et originales, 
          soigneusement sélectionnées pour vous inspirer en cuisine !
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Aucune recette disponible pour le moment.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              <span className="font-semibold text-green-600">{recipes.length}</span> recettes disponibles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <LatestRecipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
      
      <div className="mt-12 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            💡 Astuce Eat Salad
          </h2>
          <p className="text-green-700">
            Toutes ces recettes peuvent être adaptées avec nos ingrédients frais ! 
            Visitez notre <strong>configurateur de salade</strong> pour créer votre version personnalisée.
          </p>
        </div>
      </div>
    </div>
  );
}
