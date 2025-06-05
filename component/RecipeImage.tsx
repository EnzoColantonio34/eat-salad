'use client';

import Image from 'next/image';
import { useState } from 'react';

interface RecipeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function RecipeImage({ src, alt, className }: RecipeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    console.error('Error loading image:', src);
    setImageSrc('/images/menu/no-image.png');
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      priority
      onError={handleError}
      unoptimized={process.env.NODE_ENV === 'development'}
    />
  );
}
