import Image from "next/image";
import Link from "next/link";

interface DishItemProps {
  dish: {
    title: string;
    category: string;
    image: string;
    slug: string;
  };
}

export default function DishItem({ dish }: DishItemProps) {
  // Utiliser une image par défaut si dish.image est vide ou non défini
  const imageSrc = dish.image && dish.image.trim() !== "" ? dish.image : "/images/menu/no-image.png";
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageSrc}
          alt={dish.title}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className="mt-2 text-xl font-bold text-center">{dish.title}</h2>
      <p className="text-gray-600 text-center mb-4 capitalize">{dish.category}</p>
      <Link 
        href={dish.slug} 
        className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
      >
        En savoir plus
      </Link>
    </div>
  );
}