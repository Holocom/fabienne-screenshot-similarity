
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/services/bookService';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId
  });

  // Fonction utilitaire pour formater les URLs d'images
  const formatImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg";
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-beige">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Ce livre n'existe pas ou une erreur est survenue.</p>
          <Link to="/" className="mt-4 inline-block underline">
            Retour aux livres
          </Link>
        </div>
      </div>
    );
  }

  // Extraction d'informations supplémentaires du livre si disponibles dans la description
  let bookDetails = {
    age: "",
    illustrator: "",
    publisher: "",
    releaseDate: "",
    pages: ""
  };

  // Si nous avons les données dans le futur, nous pourrions les extraire ici
  // Pour l'instant, nous affichons un exemple statique si la catégorie est "jeunesse"
  if (book.categories?.slug === "jeunesse") {
    bookDetails = {
      age: "à partir de 5 ans",
      illustrator: "Arianna Simoncini",
      publisher: "Cot Cot Cot éditions",
      releaseDate: "Novembre 2024",
      pages: "40 pages"
    };
  }

  return (
    <div className="min-h-screen bg-beige">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-8 text-sm hover:bg-transparent hover:underline"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux livres
          </Link>
        </Button>
        
        {/* Titre du livre en grand */}
        <h1 className="text-4xl font-serif text-center uppercase font-bold mt-8 mb-2">
          {book.title}
        </h1>
        
        {/* Informations détaillées du livre (style fiche produit) */}
        {bookDetails.age && (
          <div className="text-center mb-6 text-red-600 font-medium">
            Album jeunesse ({bookDetails.age}) – illustré par {bookDetails.illustrator} – {bookDetails.publisher} – {bookDetails.releaseDate} – {bookDetails.pages}
          </div>
        )}
        
        {/* Description du livre */}
        {book.description && (
          <div className="prose max-w-3xl mx-auto mb-8 text-lg">
            <p className="text-center">{book.description}</p>
          </div>
        )}
        
        {/* Phrase d'accroche */}
        <div className="max-w-3xl mx-auto mb-12 text-lg">
          <p className="text-center italic">Découvrez {book.title}, un récit captivant qui vous transportera dans un monde imaginaire !</p>
        </div>
        
        {/* Images du livre */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md">
            <img 
              src={formatImageUrl(book.cover_image)} 
              alt={`${book.title} - couverture`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md bg-gray-100 flex items-center justify-center text-gray-400">
            <p>Image intérieure</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md bg-gray-100 flex items-center justify-center text-gray-400">
            <p>Image intérieure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
