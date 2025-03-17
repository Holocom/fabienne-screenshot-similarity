
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';

const BookGrid = () => {
  const location = useLocation();
  const currentCategory = location.pathname.substring(1) || 'all';
  
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books', currentCategory],
    queryFn: () => getBooks(currentCategory)
  });

  console.log('Current category:', currentCategory);
  console.log('Loaded books:', books.length);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center py-12">
        <p>Chargement des livres...</p>
      </div>
    );
  }

  if (error) {
    console.error('Error loading books:', error);
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center py-12">
        <p>Une erreur est survenue lors du chargement des livres.</p>
        <p className="text-sm text-gray-500 mt-2">Détail: {error.toString()}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center py-12">
        <p>Aucun livre dans cette catégorie pour le moment.</p>
      </div>
    );
  }

  // Function to format image URLs
  const formatImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg";
    return url;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <Link 
            key={book.id} 
            to={`/books/${book.id}`} 
            className="group relative block overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={formatImageUrl(book.cover_image)}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  console.error(`Error loading image for ${book.title}:`, book.cover_image);
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-serif text-base md:text-lg mb-1">{book.title}</h3>
                {book.categories && (
                  <p className="text-white/80 font-sans text-xs md:text-sm">
                    {book.categories.name}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
