
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    return url;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <HoverCard key={book.id}>
            <HoverCardTrigger asChild>
              <Link 
                to={`/books/${book.id}`} 
                className="block transition-transform hover:scale-105"
              >
                <div className="book-cover aspect-[3/4] overflow-hidden relative">
                  <img
                    src={formatImageUrl(book.cover_image)}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-serif">{book.title}</h3>
                {book.categories && (
                  <p className="text-sm text-gray-500 font-sans">
                    {book.categories.name}
                  </p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
