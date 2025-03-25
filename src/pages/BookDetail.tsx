
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import BookInfo from '@/components/book-detail/BookInfo';
import PressLinks from '@/components/book-detail/PressLinks';
import Awards from '@/components/book-detail/Awards';
import EditionsTable from '@/components/book-detail/EditionsTable';
import LoadingState from '@/components/book-detail/LoadingState';
import BookNotFound from '@/components/book-detail/BookNotFound';
import { useBookDetails } from '@/hooks/useBookDetails';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { 
    book,
    details,
    uniquePressLinks,
    uniqueAwards,
    uniqueEditions,
    updatedDescription,
    isLoading,
    bookError,
    isBookError
  } = useBookDetails(bookId);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (bookError || !book) {
    return <BookNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 pt-2 pb-20 book-detail">
        <div className="mb-6 mt-0">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#ea384c] transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour aux livres
          </Link>
        </div>
        
        <div className="mt-4">
          <BookInfo 
            title={book.title} 
            description={updatedDescription} 
            bookDetails={details} 
          />
          
          <PressLinks pressLinks={uniquePressLinks} />
          
          <Awards awards={uniqueAwards} />
          
          <EditionsTable editions={uniqueEditions} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
