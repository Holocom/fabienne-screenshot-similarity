
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/bookService';

const BookCategories = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // ID du livre Brown Baby
  const brownBabyBookId = '0e2076f3-db50-4b64-ad3e-a8fb3d5b3308';
  
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Définir l'ordre souhaité des catégories
  const desiredOrder = ['roman', 'art', 'jeunesse', 'cuisine', 'collectifs', 'commandes'];
  
  // Créer un nouveau tableau avec les catégories ordonnées
  const sortedCategories = [...categoriesData].sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.slug.toLowerCase());
    const indexB = desiredOrder.indexOf(b.slug.toLowerCase());
    
    // Si une catégorie n'est pas dans l'ordre prédéfini, la placer à la fin
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });
  
  // Préparer les catégories avec leurs destinations
  const allCategories = [
    { name: 'TOUS', slug: '', path: '/' },
    ...sortedCategories.map(cat => {
      // Pour la catégorie "roman", rediriger vers la page de détail de Brown Baby
      const path = cat.slug.toLowerCase() === 'roman' 
        ? `/books/${brownBabyBookId}` 
        : `/${cat.slug}`;
      
      return { 
        name: cat.name.toUpperCase(),
        slug: cat.slug,
        path: path
      };
    })
  ];

  if (isLoading) {
    return <div className="w-full flex justify-center mb-12">Chargement...</div>;
  }

  return (
    <div className="w-full flex justify-center mb-12">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
        {allCategories.map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className={`text-xs tracking-widest hover:underline ${
              (currentPath === category.path || (currentPath === '/' && category.slug === ''))
                ? 'font-bold underline'
                : ''
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
