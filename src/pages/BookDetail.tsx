
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import BookInfo from '@/components/book-detail/BookInfo';
import PressLinks from '@/components/book-detail/PressLinks';
import Awards from '@/components/book-detail/Awards';
import EditionsTable from '@/components/book-detail/EditionsTable';
import LoadingState from '@/components/book-detail/LoadingState';
import BookNotFound from '@/components/book-detail/BookNotFound';
import useBookDetails from '@/hooks/useBookDetails';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { book, details, pressLinks, editions, awards, isLoading, error } = useBookDetails(bookId);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !book) {
    return <BookNotFound />;
  }

  const categoryName = book.categories ? book.categories.name : 'Non catégorisé';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image de couverture */}
          <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
            <div className="w-48 md:w-full max-w-xs h-auto aspect-[3/4] overflow-hidden rounded-md shadow-md">
              <img 
                src={book.cover_image || '/placeholder.svg'} 
                alt={`Couverture de ${book.title}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
              />
            </div>
          </div>
          
          {/* Informations du livre */}
          <div className="w-full md:w-2/3">
            <BookInfo 
              title={book.title}
              author={book.author}
              description={book.description || ''}
              category={categoryName}
              details={details}
            />
            
            {editions && editions.length > 0 && (
              <EditionsTable editions={editions} />
            )}
            
            {awards && awards.length > 0 && (
              <Awards awards={awards} />
            )}
            
            {pressLinks && pressLinks.length > 0 && (
              <PressLinks pressLinks={pressLinks} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
