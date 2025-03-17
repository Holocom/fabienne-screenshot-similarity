
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/services/bookService';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
        <Header />
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
        <Header />
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
      <Header />
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
        
        <div className="mt-6 bg-[#F6F6F7] rounded-lg p-8 shadow-sm">
          {/* Titre du livre en grand */}
          <h1 className="text-4xl font-serif text-center uppercase font-bold mb-2">
            {book.title}
          </h1>
          
          {/* Informations détaillées du livre (style fiche produit) */}
          {bookDetails.age && (
            <div className="text-center mb-6 text-red-600 font-medium">
              Album jeunesse ({bookDetails.age}) – illustré par {bookDetails.illustrator} – {bookDetails.publisher} – {bookDetails.releaseDate} – {bookDetails.pages}
            </div>
          )}
          
          <div className="flex justify-center my-6">
            <Separator className="w-1/4 bg-gray-300" />
          </div>
          
          {/* Description du livre */}
          {book.description && (
            <div className="prose max-w-3xl mx-auto mb-8 text-lg bg-white p-6 rounded-md shadow-sm">
              <p className="text-center">{book.description}</p>
            </div>
          )}
          
          <div className="flex justify-center my-6">
            <div className="flex items-center w-1/2 gap-4">
              <Separator className="flex-grow bg-gray-300" />
              <div className="text-gray-400">❦</div>
              <Separator className="flex-grow bg-gray-300" />
            </div>
          </div>
          
          {/* Phrase d'accroche */}
          <div className="max-w-3xl mx-auto mb-8 text-lg bg-[#F1F0FB] p-6 rounded-md shadow-sm border border-gray-200">
            <p className="text-center italic">Découvrez <span className="font-semibold">{book.title}</span>, un récit captivant qui vous transportera dans un monde imaginaire !</p>
          </div>
        </div>
        
        {/* Images du livre */}
        <div className="mt-10 mb-6">
          <h2 className="text-2xl font-serif text-center mb-4">Aperçu de l'ouvrage</h2>
          <div className="h-0.5 w-16 bg-gray-300 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md transition-transform hover:scale-105 duration-300">
            <img 
              src={formatImageUrl(book.cover_image)} 
              alt={`${book.title} - couverture`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md bg-gray-100 flex items-center justify-center text-gray-400 transition-transform hover:scale-105 duration-300">
            <p>Image intérieure</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-md bg-gray-100 flex items-center justify-center text-gray-400 transition-transform hover:scale-105 duration-300">
            <p>Image intérieure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
