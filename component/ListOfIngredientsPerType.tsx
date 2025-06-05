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
    return <div>Chargement des {type}...</div>;
  }

  return (
    <div className="ingredient-list">
      {ingredients.map((ingredient) => (
        <label key={ingredient} className="ingredient-option">
          <input
            type="radio"
            name={type}
            value={ingredient}
            checked={selectedValue === ingredient}
            onChange={(e) => onSelect(e.target.value)}
            required
          />
          <span className="ingredient-name">{ingredient}</span>
        </label>
      ))}
    </div>
  );
}
