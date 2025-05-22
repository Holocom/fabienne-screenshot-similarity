import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import { useToast } from '@/hooks/use-toast';
import BookCard from "./book-grid/BookCard";

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

  // Handle image load errors
  const handleImageError = (bookId: string, bookTitle: string, coverUrl: string | null) => {
    console.error(`Error loading image for "${bookTitle}":`, coverUrl);
    setCoverErrors(prev => ({ ...prev, [bookId]: true }));
    return "/placeholder.svg";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onImageError={handleImageError}
            coverErrors={coverErrors}
          />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
