
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import { useToast } from '@/hooks/use-toast';

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
  const formatImageUrl = (url: string | null, bookId: string, bookTitle: string) => {
    if (!url || coverErrors[bookId]) return "/placeholder.svg";
    
    // Traitement spécifique pour le livre "Ambroise Vollard, un don singulier"
    if (bookTitle === "Ambroise Vollard, un don singulier") {
      return "/lovable-uploads/ba6037dd-e62c-442b-a3bf-8590b334f625.png";
    }
    
    // Si l'URL commence par 'public/', il s'agit d'un chemin local
    // Nous devons supprimer 'public/' car les fichiers dans ce dossier sont servis à la racine
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

  return (
    <div className="w-full max-w-7xl mx-auto px-3">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        {books.map((book) => (
          <div key={book.id} className="mb-5 break-inside-avoid">
            <Link 
              to={`/books/${book.id}`}
              className="block relative group overflow-hidden bg-transparent"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={formatImageUrl(book.cover_image, book.id, book.title)}
                  alt={book.title}
                  className="w-full h-auto object-contain transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = handleImageError(book.id, book.title, book.cover_image);
                  }}
                />
                {/* Overlay sombre avec transition fluide */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              
              {/* Informations en surimpression avec animation */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-serif text-base md:text-lg font-medium tracking-tight text-white mb-1 drop-shadow-md">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                    {book.author}
                  </p>
                )}
                {book.categories && (
                  <p className="text-xs text-white/80 mt-1 drop-shadow-md">
                    {book.categories.name}
                  </p>
                )}
              </div>
              
              {/* Titre et infos visibles sans survol pour l'accessibilité et les appareils tactiles */}
              <div className="mt-2 md:group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-serif text-sm md:text-base mb-1 font-medium tracking-tight text-gray-900">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="text-xs md:text-sm text-gray-600">
                    {book.author}
                  </p>
                )}
                {book.categories && (
                  <p className="text-xs text-gray-500 mt-1">
                    {book.categories.name}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
