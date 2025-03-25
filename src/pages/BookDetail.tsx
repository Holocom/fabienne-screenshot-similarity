
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/services/bookService';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [imageError, setImageError] = useState(false);
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId
  });

  // Fonction utilitaire pour formater les URLs d'images
  const formatImageUrl = (url: string | null) => {
    if (!url || imageError) return "/placeholder.svg";
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-8 inline-block text-sm hover:underline">
          &larr; Retour aux livres
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="flex justify-center">
            <div className="max-w-[300px] w-full">
              <img 
                src={formatImageUrl(book.cover_image)} 
                alt={book.title} 
                className="w-full h-auto object-contain shadow-md rounded-sm bg-[#f8f8f8]"
                onError={() => setImageError(true)}
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg mb-6">par {book.author}</p>
            
            {book.description && (
              <div className="prose max-w-none">
                <p>{book.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
