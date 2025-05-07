
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BookGrid = () => {
  const location = useLocation();
  const currentCategory = location.pathname.substring(1) || 'all';
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [coverErrors, setCoverErrors] = useState<Record<string, boolean>>({});
  
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books', currentCategory],
    queryFn: () => getBooks(currentCategory),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  console.log('Current category:', currentCategory);
  console.log('Loaded books:', books.length);

  // Refresh data when switching routes
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['books', currentCategory] });
  }, [currentCategory, queryClient]);

  useEffect(() => {
    // Check for books without cover images and show toast
    const booksWithoutCovers = books.filter(book => !book.cover_image);
    if (booksWithoutCovers.length > 0) {
      console.log('Books without cover images:', booksWithoutCovers.length);
    }
  }, [books]);

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
  const formatImageUrl = (url: string | null, bookId: string) => {
    if (!url || coverErrors[bookId]) return "/placeholder.svg";
    
    // Si l'URL est une URL Supabase complète, la retourner directement
    // Encoder les espaces dans l'URL pour éviter les problèmes d'affichage
    if (url.startsWith('https://ygsqgosylxoiqikxlsil.supabase.co/')) {
      return url.replace(/ /g, '%20');
    }
    
    // Si l'URL commence par 'public/', il s'agit d'un chemin local
    if (url.startsWith('public/')) {
      return url.replace('public/', '/');
    }
    
    return url;
  };

  // Handle image load errors
  const handleImageError = (bookId: string, bookTitle: string, coverUrl: string | null) => {
    console.error(`Error loading image for "${bookTitle}":`, coverUrl);
    setCoverErrors(prev => ({ ...prev, [bookId]: true }));
    return "/placeholder.svg";
  };

  // Déterminer la mise en page en fonction de la catégorie
  const isArtCategory = currentCategory.toLowerCase() === 'art';
  
  return (
    <div className="w-full max-w-7xl mx-auto px-3">
      <div className={`${isArtCategory 
        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6' 
        : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5'}`}>
        {books.map((book) => (
          <div key={book.id} className={isArtCategory ? "" : "break-inside-avoid mb-5"}>
            <Link 
              to={`/books/${book.id}`} 
              className="group relative block overflow-hidden bg-[#f8f8f8] rounded-sm shadow-md"
            >
              <div className="w-full">
                {isArtCategory ? (
                  <AspectRatio ratio={4/3} className="bg-muted">
                    <img
                      src={formatImageUrl(book.cover_image, book.id)}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = handleImageError(book.id, book.title, book.cover_image);
                      }}
                    />
                  </AspectRatio>
                ) : (
                  <img
                    src={formatImageUrl(book.cover_image, book.id)}
                    alt={book.title}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = handleImageError(book.id, book.title, book.cover_image);
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-serif text-sm md:text-base mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {book.title}
                  </h3>
                  {book.categories && (
                    <p className="text-white/80 font-sans text-xs md:text-sm">
                      {book.categories.name}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
