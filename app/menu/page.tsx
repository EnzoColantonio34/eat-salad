import FusionCollection from "fusionable/FusionCollection";
import DishItem from "../../component/DishItem";
import FilterByCategory from "../../component/FilterByCategory";

interface Dish {
  title: string;
  category: string;
  image: string;
  slug: string;
}

const getDishes = (): Dish[] => {
  const collection = new FusionCollection()
    .loadFromDir('content/menu-offer/');
  
  const items = collection.getItemsArray();
  
  return items.map((dish: any) => {
    const fields = dish.fields || {};
    
    return {
      title: fields.title || "Sans titre",
      category: fields.category || "salads",
      image: fields.imageSrc ? `/images/menu/${fields.imageSrc}` : "/images/menu/no-image.png",
      slug: `/menu/${fields.category || 'salads'}/${fields.slug || dish.name}`
    };
  });
}

export default function MenuPage() {
  const dishes = getDishes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Notre Menu</h1>
      
      <FilterByCategory />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish, idx) => (
          <DishItem key={idx} dish={dish} />
        ))}
      </div>
    </div>
  );
}