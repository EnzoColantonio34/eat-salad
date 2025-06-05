import FusionCollection from "fusionable/FusionCollection";
import Link from "next/link";
import Image from "next/image";

interface DishDetail {
  title: string;
  category: string;
  image: string;
  ingredients: string[];
  calories: number;
  content: string;
  slug: string;
}

const getDishBySlug = (categorySlug: string, itemSlug: string): DishDetail | null => {
  const collection = new FusionCollection()
    .loadFromDir('content/menu-offer/');
  
  const items = collection.getItemsArray();
  
  // Filtrer manuellement par catégorie et slug
  const dish = items.find((item: any) => {
    const fields = item.fields || {};
    return fields.category === categorySlug && fields.slug === itemSlug;
  });

  if (!dish) return null;

  const fields = dish.fields || {};
  
  return {
    title: fields.title || "Sans titre",
    category: fields.category || categorySlug,
    image: fields.imageSrc ? `/images/menu/${fields.imageSrc}` : "/images/menu/no-image.png",
    ingredients: fields.ingredients || [],
    calories: fields.calories || 0,
    content: dish.content || "",
    slug: fields.slug || itemSlug
  };
}

const getCategoryTitle = (categorySlug: string): string => {
  const categoryTitles: { [key: string]: string } = {
    'salads': 'Salades',
    'hot-meal': 'Plats Chauds'
  };
  return categoryTitles[categorySlug] || categorySlug;
}

export default async function DishDetailPage({ 
  params 
}: { 
  params: Promise<{ categorySlug: string; itemSlug: string }>
}) {
  const resolvedParams = await params;
  const dish = getDishBySlug(resolvedParams.categorySlug, resolvedParams.itemSlug);
  const categoryTitle = getCategoryTitle(resolvedParams.categorySlug);

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Plat non trouvé</h1>
        <Link href="/menu" className="text-blue-600 hover:text-blue-800">
          ← Retour au menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex gap-2 text-sm">
        <Link href="/menu" className="text-blue-600 hover:text-blue-800">
          Menu
        </Link>
        <span className="text-gray-500">→</span>
        <Link href={`/menu/${resolvedParams.categorySlug}`} className="text-blue-600 hover:text-blue-800">
          {categoryTitle}
        </Link>
        <span className="text-gray-500">→</span>
        <span className="text-gray-700">{dish.title}</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Information */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-3">
                {categoryTitle}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dish.title}</h1>
              <p className="text-lg text-green-600 font-semibold">{dish.calories} calories</p>
            </div>

            {/* Ingrédients */}
            {dish.ingredients.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Ingrédients</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bouton d'action */}
            <div className="pt-4">
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        {dish.content && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{dish.content.trim()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
