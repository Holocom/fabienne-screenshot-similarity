
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import { useToast } from '@/hooks/use-toast';

interface BookGridProps {
  excludeBookId?: string;
}

const BookGrid = ({ excludeBookId }: BookGridProps) => {
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
  console.log('Excluding book ID:', excludeBookId);

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

  // Filter out excluded book if specified
  const filteredBooks = excludeBookId 
    ? books.filter(book => book.id !== excludeBookId)
    : books;

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

  if (filteredBooks.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 text-center py-12">
        <p>Aucun livre dans cette catégorie pour le moment.</p>
      </div>
    );
  }

  // Fonction modifiée pour gérer correctement les URLs de Supabase Storage
  const formatImageUrl = (url: string | null, bookId: string, bookTitle: string) => {
    if (!url || coverErrors[bookId]) return "/placeholder.svg";
    
    // Cas spécifique pour certains livres qui ont des URLs locales
    if (bookTitle === "Ambroise Vollard, un don singulier") {
      return "/lovable-uploads/ba6037dd-e62c-442b-a3bf-8590b334f625.png";
    }
    
    // Vérifier si l'URL est déjà une URL complète Supabase Storage
    if (url.includes('supabase.co/storage/v1/object/public')) {
      console.log(`URL Supabase détectée pour "${bookTitle}":`, url);
      return url; // Utiliser directement l'URL complète
    }
    
    // Gestion spécifique pour les livres collectifs
    if (bookTitle === "CASES CRÉOLES DE LA RÉUNION") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/cases-creoles-reunion.jpg";
    }
    
    if (bookTitle === "MANIFESTE POUR LA LECTURE - Les auteurs francophones célèbrent le livre") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/manifeste-lecture-600x902.jpg";
    }
    
    if (bookTitle === "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/petites-histoires-musiques-reunion.jpg";
    }
    
    // Gestion spécifique pour les livres de commande
    if (bookTitle === "VIVE LE CHANGEMENT D'AIR !") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/vive-le-changement-d-air.jpg";
    }
    
    if (bookTitle === "ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/entre-jardin-et-cour.jpg";
    }
    
    if (bookTitle === "LA REUNION, L'ILE AUX OUVRAGES") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/la-reunion-ile-aux-ouvrages.jpg";
    }
    
    if (bookTitle === "ROUTE DES TAMARINS, LA REUNION DES DEFIS") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/route-des-tamarins.jpg";
    }
    
    if (bookTitle === "DE LA PLANTE AU SUCRE, L'AVENTURE DE LA CANNE") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/de-la-plante-au-sucre.jpg";
    }
    
    if (bookTitle === "LE PONT DE LA RIVIERE DE L'EST") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/pont-riviere-est.jpg";
    }
    
    if (bookTitle === "SEMADER, 30 REGARDS SUR LES 30 ANS") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/semader-30-regards.jpg";
    }
    
    if (bookTitle === "LE GRAND HAZIER, UN DOMAINE CREOLE") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/grand-hazier.jpg";
    }
    
    if (bookTitle === "SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/societe-adrien-bellier.jpg";
    }
    
    // Gestion spécifique pour Brown Baby
    if (bookTitle === "Brown Baby") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/brown-baby.jpg";
    }
    
    // Si le livre est un des livres de cuisine mais n'a pas d'URL Supabase, utiliser une URL spécifique
    if (bookTitle === "MA CUISINE MARMAILLE") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/CUISINES/ma-cuisine-marmailles-620x788.jpg";
    }
    
    if (bookTitle === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS") {
      return "/placeholder.svg";
    }
    
    if (bookTitle === "SAVEURS METISSÉES D'AYMERIC PATAUD") {
      return "/placeholder.svg";
    }
    
    if (bookTitle === "LES COUPS DE CŒUR DE BRIGITTE GRONDIN") {
      return "/placeholder.svg";
    }
    
    if (bookTitle === "MA CUISINE BIEN-ÊTRE") {
      return "/placeholder.svg";
    }
    
    if (bookTitle === "DU BONHEUR DANS VOTRE ASSIETTE") {
      return "/placeholder.svg";
    }
    
    // Traitement pour les chemins locaux
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

  // Fonction pour formater les titres longs
  const formatTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + '...';
    }
    return title;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        {filteredBooks.map((book) => (
          <div key={book.id} className="mb-5 break-inside-avoid">
            <Link 
              to={`/books/${book.id}`}
              className="block relative group overflow-hidden bg-transparent rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={formatImageUrl(book.cover_image, book.id, book.title)}
                  alt={book.title}
                  className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = handleImageError(book.id, book.title, book.cover_image);
                  }}
                />
                {/* Overlay semi-transparent avec transition fluide */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              
              {/* Informations en surimpression avec animation - uniquement titre et catégorie */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-serif text-base md:text-lg font-medium tracking-tight text-white mb-1 drop-shadow-md">
                  {formatTitle(book.title)}
                </h3>
                {book.categories && (
                  <p className="text-xs text-white/80 mt-1 drop-shadow-md">
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
