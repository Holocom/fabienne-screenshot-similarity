
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/bookService';

const BookCategories = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const allCategories = [
    { name: 'TOUS', slug: '' },
    ...categories.map(cat => ({ 
      name: cat.name.toUpperCase(),
      slug: cat.slug
    }))
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
            to={`/${category.slug}`}
            className={`text-xs tracking-widest hover:underline ${
              (currentPath === `/${category.slug}` || (currentPath === '/' && category.slug === ''))
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
