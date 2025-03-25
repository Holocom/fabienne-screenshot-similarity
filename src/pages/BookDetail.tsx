
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { useBookDetails } from '@/hooks/useBookDetails';
import BookInfo from '@/components/book-detail/BookInfo';
import PressLinks from '@/components/book-detail/PressLinks';
import Awards from '@/components/book-detail/Awards';
import EditionsTable from '@/components/book-detail/EditionsTable';
import LoadingState from '@/components/book-detail/LoadingState';
import BookNotFound from '@/components/book-detail/BookNotFound';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  
  const {
    book,
    details,
    uniquePressLinks,
    uniqueAwards,
    uniqueEditions,
    updatedDescription,
    isLoading,
    isBookError,
    category
  } = useBookDetails(bookId);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (isBookError || !book) {
    return <BookNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <BookInfo 
          book={book} 
          details={details}
          description={updatedDescription}
          category={category}
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <PressLinks pressLinks={uniquePressLinks} />
            <Awards awards={uniqueAwards} />
          </div>
          
          <div>
            <EditionsTable editions={uniqueEditions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
