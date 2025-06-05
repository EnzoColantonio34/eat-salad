import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeImage from '../../../component/RecipeImage';

// Configuration pour la génération statique
export const dynamic = 'force-static';
export const revalidate = 86400;

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

// Génère les paramètres statiques pour toutes les recettes au moment du build
export async function generateStaticParams() {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    const data: RecipesResponse = await response.json();
    
    return data.recipes.map((recipe) => ({
      id: recipe.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Récupère une recette spécifique
async function getRecipe(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`, {
      next: { revalidate: 86400 }
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

// Génère les métadonnées pour chaque recette
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipe(id);
  
  if (!recipe) {
    return {
      title: 'Recette non trouvée | Eat Salad',
    };
  }
  
  return {
    title: `${recipe.name} | Recettes Eat Salad`,
    description: `Découvrez la recette ${recipe.name}. Difficulté: ${recipe.difficulty}. Cuisine: ${recipe.cuisine}. ${recipe.caloriesPerServing} calories par portion.`,
    openGraph: {
      title: recipe.name,
      description: `Recette ${recipe.difficulty} - ${recipe.cuisine}`,
      images: [recipe.image],
    },
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  
  if (!recipe) {
    notFound();
  }
  
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <a href="/our-recipes" className="hover:text-green-600 transition-colors">
            ← Retour aux recettes
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
            <RecipeImage
              src={recipe.image}
              alt={recipe.name}
              className="object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {recipe.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {recipe.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {recipe.cuisine}
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="ml-2 text-gray-700">
                {recipe.rating}/5 ({recipe.reviewCount} avis)
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalTime}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{recipe.caloriesPerServing}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{recipe.servings}</div>
                <div className="text-sm text-gray-600">Portions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{recipe.prepTimeMinutes}</div>
                <div className="text-sm text-gray-600">Préparation</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingrédients</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-1">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="mt-12 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Envie d'essayer cette recette avec nos ingrédients frais ?
          </h3>
          <p className="text-green-700 mb-4">
            Créez votre propre version avec notre configurateur de salade personnalisée !
          </p>
          <a
            href="/make-your-own-salad"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Créer ma salade
          </a>
        </div>
      </div>
    </div>
  );
}
