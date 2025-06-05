import FusionCollection from "fusionable/FusionCollection";
import DishItem from "../../../component/DishItem";
import FilterByCategory from "../../../component/FilterByCategory";
import Link from "next/link";

interface Dish {
  title: string;
  category: string;
  image: string;
  slug: string;
}

const getDishesByCategory = (categorySlug: string): Dish[] => {
  const collection = new FusionCollection()
    .loadFromDir('content/menu-offer/');
  
  const items = collection.getItemsArray();
  
  // Filtrer manuellement par catégorie
  const filteredItems = items.filter((item: any) => {
    const fields = item.fields || {};
    return fields.category === categorySlug;
  });
  
  return filteredItems.map((dish: any) => {
    const fields = dish.fields || {};
    
    return {
      title: fields.title || "Sans titre",
      category: fields.category || "salads",
      image: fields.imageSrc ? `/images/menu/${fields.imageSrc}` : "/images/menu/no-image.png",
      slug: `/menu/${fields.category || 'salads'}/${fields.slug || dish.name}`
    };
  });
}

const getCategoryTitle = (categorySlug: string): string => {
  const categoryTitles: { [key: string]: string } = {
    'salads': 'Salades',
    'hot-meal': 'Plats Chauds'
  };
  return categoryTitles[categorySlug] || categorySlug;
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const resolvedParams = await params;
  const dishes = getDishesByCategory(resolvedParams.categorySlug);
  const categoryTitle = getCategoryTitle(resolvedParams.categorySlug);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/menu" className="text-blue-600 hover:text-blue-800">
          ← Retour au menu complet
        </Link>
      </nav>
      
      <h1 className="text-3xl font-bold text-center mb-8">{categoryTitle}</h1>
      
      <FilterByCategory currentCategory={resolvedParams.categorySlug} />
      
      {dishes.length === 0 ? (
        <p className="text-center text-gray-600">Aucun plat trouvé dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, idx) => (
            <DishItem key={idx} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
