
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getBookById, 
  getBookDetails, 
  getPressLinks, 
  getAwards,
  getDistinctions,
  getEditions 
} from '@/services/bookService';
import { LoadingState } from '@/components/book-detail/LoadingState';
import { ErrorState } from '@/components/book-detail/ErrorState';
import { BookDetailLayout } from '@/components/book-detail/BookDetailLayout';
import { BookUpdateHandler } from '@/components/book-detail/BookUpdateHandler';
import { BookDetailContent } from '@/components/book-detail/BookDetailContent';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const queryClient = useQueryClient();
  
  // Force a refresh of the data on every mount
  useEffect(() => {
    if (bookId) {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      queryClient.invalidateQueries({ queryKey: ['bookDetails', bookId] });
      queryClient.invalidateQueries({ queryKey: ['pressLinks', bookId] });
      queryClient.invalidateQueries({ queryKey: ['awards', bookId] });
      queryClient.invalidateQueries({ queryKey: ['distinctions', bookId] });
      queryClient.invalidateQueries({ queryKey: ['editions', bookId] });
    }
  }, [bookId, queryClient]);
  
  const {
    data: book,
    isLoading: isLoadingBook,
    error: bookError,
    isError: isBookError
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId
  });
  
  const {
    data: bookDetails,
    isLoading: isLoadingDetails
  } = useQuery({
    queryKey: ['bookDetails', bookId],
    queryFn: () => getBookDetails(bookId || ''),
    enabled: !!bookId
  });
  
  const {
    data: pressLinks = [],
    isLoading: isLoadingPressLinks
  } = useQuery({
    queryKey: ['pressLinks', bookId],
    queryFn: () => getPressLinks(bookId || ''),
    enabled: !!bookId
  });
  
  const {
    data: awards = [],
    isLoading: isLoadingAwards
  } = useQuery({
    queryKey: ['awards', bookId],
    queryFn: () => getAwards(bookId || ''),
    enabled: !!bookId
  });
  
  const {
    data: distinctions = [],
    isLoading: isLoadingDistinctions
  } = useQuery({
    queryKey: ['distinctions', bookId],
    queryFn: () => getDistinctions(bookId || ''),
    enabled: !!bookId
  });
  
  const {
    data: editions = [],
    isLoading: isLoadingEditions
  } = useQuery({
    queryKey: ['editions', bookId],
    queryFn: () => getEditions(bookId || ''),
    enabled: !!bookId
  });

  // Déterminer si tout est en cours de chargement
  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || 
                    isLoadingAwards || isLoadingDistinctions || isLoadingEditions;
  
  // Composant de gestion des mises à jour rendu correctement
  if (book) {
    return (
      <>
        <BookUpdateHandler 
          book={book} 
          bookId={bookId} 
          isLoadingBook={isLoadingBook} 
          isBookError={isBookError} 
        />
        
        {isLoading ? (
          <LoadingState />
        ) : bookError || !book ? (
          <ErrorState />
        ) : (
          <BookDetailLayout>
            <BookDetailContent 
              book={book}
              bookDetails={bookDetails || {
                id: "temp-id",
                book_id: bookId || '',
                publisher: "Océan Jeunesse",
                illustrator: "Audrey Caron",
                year: "2025",
                pages: "48",
                isbn: "9782916533520",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }}
              pressLinks={pressLinks}
              awards={awards}
              distinctions={distinctions}
              editions={editions}
            />
          </BookDetailLayout>
        )}
      </>
    );
  }
  
  // État de chargement initial
  if (isLoading) {
    return <LoadingState />;
  }
  
  // État d'erreur
  if (bookError || !book) {
    return <ErrorState />;
  }
  
  // Cas par défaut (ne devrait jamais arriver, mais ajouté par sécurité)
  return (
    <BookDetailLayout>
      <div>Une erreur inattendue s'est produite.</div>
    </BookDetailLayout>
  );
};

export default BookDetailPage;
