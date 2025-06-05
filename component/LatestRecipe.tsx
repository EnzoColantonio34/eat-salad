'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

interface LatestRecipeProps {
  recipe: Recipe;
}

export default function LatestRecipe({ recipe }: LatestRecipeProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const [imageSrc, setImageSrc] = useState(recipe.image);

  const handleImageError = () => {
    console.error('Error loading image:', recipe.image);
    setImageSrc('/images/menu/no-image.png');
  };

  return (
    <Link href={`/our-recipes/${recipe.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={imageSrc}
            alt={recipe.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
              {recipe.name}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2 whitespace-nowrap">
              {recipe.difficulty}
            </span>
          </div>
          
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {recipe.rating} ({recipe.reviewCount} avis)
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {recipe.cuisine}
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {totalTime} min
            </span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
              {recipe.caloriesPerServing} cal
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {recipe.servings} portions
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{recipe.tags.length - 3} autres
              </span>
            )}
          </div>
          
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              Ingrédients principaux :
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {recipe.ingredients.slice(0, 4).join(', ')}
              {recipe.ingredients.length > 4 && '...'}
            </p>
          </div>
          
          <div className="mt-3 pt-3 border-t">
            <span className="text-sm text-green-600 hover:text-green-700 font-medium">
              Voir la recette complète →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
