
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

  // Fonction utilitaire pour formater les URLs d'images
  const formatImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg";
    
    // Si l'URL contient "public/", on le supprime
    if (url.includes("public/")) {
      return url.replace("public/", "");
    }
    
    // Si l'URL commence par "/", on retourne telle quelle
    if (url.startsWith("/")) {
      return url;
    }
    
    // Sinon on retourne l'URL telle quelle
    return url;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`} className="block transition-transform hover:scale-105">
            <div className="book-cover aspect-[3/4] overflow-hidden relative">
              <img
                src={formatImageUrl(book.cover_image)}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="text-white text-sm md:text-base font-medium">{book.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
