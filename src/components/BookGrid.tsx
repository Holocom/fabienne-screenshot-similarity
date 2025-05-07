
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import { useToast } from '@/hooks/use-toast';
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
  
  // Vérifier si le livre "Ambroise Vollard, un don singulier" est présent
  const vollardBook = books.find(book => book.title === 'Ambroise Vollard, un don singulier');
  useEffect(() => {
    if (vollardBook) {
      console.log('Livre Vollard trouvé:', vollardBook);
      console.log('Image de couverture:', vollardBook.cover_image);
    }
  }, [books]);

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

  // Fonction pour formater et encoder correctement les URL des images
  const formatImageUrl = (url: string | null, bookId: string) => {
    if (!url || coverErrors[bookId]) return "/placeholder.svg";
    
    try {
      // Vérifier si l'URL contient déjà des caractères encodés
      const isEncoded = url.includes('%20') || url.includes('%2F');
      
      if (isEncoded) {
        return url; // Déjà encodé, retourner tel quel
      }
      
      // Si l'URL est une URL Supabase complète
      if (url.startsWith('https://ygsqgosylxoiqikxlsil.supabase.co/')) {
        // Extraire la partie après 'public/'
        const parts = url.split('public/');
        if (parts.length > 1) {
          // Encoder uniquement la partie du chemin d'accès
          const baseUrl = parts[0] + 'public/';
          const path = parts[1];
          
          // Encoder correctement le chemin en préservant les /
          const encodedPath = path.split('/').map(segment => 
            encodeURIComponent(segment)
          ).join('/');
          
          return baseUrl + encodedPath;
        }
        return url;
      }
      
      // Si l'URL commence par 'public/', il s'agit d'un chemin local
      if (url.startsWith('public/')) {
        return url.replace('public/', '/');
      }
      
      return url;
    } catch (e) {
      console.error(`Error formatting image URL for book ${bookId}:`, e);
      return url; // En cas d'erreur, retourner l'URL d'origine
    }
  };

  // Handle image load errors
  const handleImageError = (bookId: string, bookTitle: string, coverUrl: string | null) => {
    console.error(`Error loading image for "${bookTitle}":`, coverUrl);
    setCoverErrors(prev => ({ ...prev, [bookId]: true }));
    return "/placeholder.svg";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col">
            <Link 
              to={`/books/${book.id}`} 
              className="group relative block overflow-hidden bg-white rounded-sm shadow-md h-full"
            >
              <AspectRatio ratio={3/4} className="w-full h-full bg-gray-100">
                <img
                  src={formatImageUrl(book.cover_image, book.id)}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = handleImageError(book.id, book.title, book.cover_image);
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-sm md:text-base font-medium truncate">
                    {book.title}
                  </h3>
                  {book.author && (
                    <p className="text-white/90 font-sans text-xs truncate">
                      {book.author}
                    </p>
                  )}
                  {book.categories && (
                    <p className="text-white/70 font-sans text-xs hidden group-hover:block">
                      {book.categories.name}
                    </p>
                  )}
                </div>
              </AspectRatio>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
