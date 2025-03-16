
import React from 'react';
import { Link } from 'react-router-dom';

const BookCategories = () => {
  const categories = [
    { label: 'TOUS', path: '/' },
    { label: 'ROMAN', path: '/roman' },
    { label: 'ART', path: '/art' },
    { label: 'JEUNESSE', path: '/jeunesse' },
    { label: 'CUISINE', path: '/cuisine' },
    { label: 'COLLECTIFS', path: '/collectifs' },
    { label: 'COMMANDES', path: '/commandes' },
  ];

  return (
    <div className="w-full flex justify-center mb-12">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className="text-xs tracking-widest hover:underline"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
