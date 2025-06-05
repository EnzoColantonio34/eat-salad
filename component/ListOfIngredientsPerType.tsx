"use client";

import { useEffect, useState } from 'react';

interface ListOfIngredientsPerTypeProps {
  type: 'veggies' | 'proteins' | 'sauces';
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function ListOfIngredientsPerType({ 
  type, 
  selectedValue, 
  onSelect 
}: ListOfIngredientsPerTypeProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`/api/ingredients?type=${type}`);
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des ingrédients:', error);
        setIngredients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [type]);

  if (loading) {
    return <div className="text-gray-600">Chargement des {type}...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ingredients.map((ingredient) => (
        <label key={ingredient} className="flex items-center space-x-3 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
          <input
            type="radio"
            name={type}
            value={ingredient}
            checked={selectedValue === ingredient}
            onChange={(e) => onSelect(e.target.value)}
            required
            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
          />
          <span className="text-gray-800 capitalize font-medium">{ingredient}</span>
        </label>
      ))}
    </div>
  );
}
