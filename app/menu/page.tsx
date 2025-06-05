import FusionCollection from "fusionable/FusionCollection";
import DishItem from "../../component/DishItem";

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
  
  // Debug: afficher la structure des données
  console.log('Nombre d\'items:', items.length);
  if (items.length > 0) {
    console.log('Structure du premier item:', items[0]);
    console.log('Clés disponibles:', Object.keys(items[0]));
    if (items[0].fields) {
      console.log('Fields du premier item:', items[0].fields);
    }
  }
  
  return items.map((dish: any) => {
    // Les données sont dans la propriété 'fields' de chaque objet
    const fields = dish.fields || {};
    
    console.log('Mapping dish:', dish.name, 'fields:', fields);
    
    const mappedDish = {
      title: fields.title || "Sans titre",
      category: fields.category || "salads",
      image: fields.imageSrc ? `/images/menu/${fields.imageSrc}` : "/images/menu/no-image.png",
      slug: `/menu/${fields.category || 'salads'}/${fields.slug || dish.name}`
    };
    
    console.log('Mapped dish:', mappedDish);
    
    return mappedDish;
  });
}

export default function MenuPage() {
  const dishes = getDishes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Notre Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish, idx) => (
          <DishItem key={idx} dish={dish} />
        ))}
      </div>
    </div>
  );
}