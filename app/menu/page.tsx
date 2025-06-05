import FusionCollection from "fusionable/FusionCollection";
import DishItem from "../../component/DishItem";
import { Dish } from "../../types/dish";
import fs from "fs";
import path from "path";

const getDishes = (): Dish[] => {
  const collection = new FusionCollection()
    .loadFromDir('content/menu-offer/');
  
  return collection.getItemsArray().map((dish: any) => {
    const slug = dish.__filename?.replace(/\.md$/, "") || "";
    let image = `/images/menu/${slug}.jpg`;
    const imagePath = path.join(process.cwd(), "public", "images", "menu", `${slug}.jpg`);
    if (!fs.existsSync(imagePath)) {
      image = "/images/menu/no-image.png";
    }
    
    return {
      title: dish.title || "Sans titre",
      category: dish.category || "Non catégorisé",
      image,
      slug: `/menu/${dish.type || 'salads'}/${slug}`
    };
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