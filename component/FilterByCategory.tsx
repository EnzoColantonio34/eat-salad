'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FilterByCategoryProps {
  currentCategory?: string;
}

export default function FilterByCategory({ currentCategory }: FilterByCategoryProps) {
  const categories = [
    { slug: 'all', title: 'Tous les plats', href: '/menu' },
    { slug: 'salads', title: 'Salades', href: '/menu/salads' },
    { slug: 'hot-meal', title: 'Plats Chauds', href: '/menu/hot-meal' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => {
        const isActive = currentCategory === category.slug || 
                        (currentCategory === undefined && category.slug === 'all');
        
        return (
          <Link
            key={category.slug}
            href={category.href}
            className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700'
            }`}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
