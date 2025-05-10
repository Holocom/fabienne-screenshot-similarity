
import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompleteBookInfo } from '@/services/bookService';
import { toast } from 'sonner';

export const useBookUpdate = (bookId: string | undefined) => {
  const queryClient = useQueryClient();
  const hasUpdatedRef = useRef(false);
  const [preventUpdates, setPreventUpdates] = useState(false);
  
  useEffect(() => {
    // Force new update for debugging
    sessionStorage.removeItem('updatedBooks');
    
    const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
    const updatedBooksObj = JSON.parse(updatedBooks);
    
    if (bookId && updatedBooksObj[bookId]) {
      setPreventUpdates(true);
      hasUpdatedRef.current = true;
    }
    
    return () => {
      if (bookId && hasUpdatedRef.current) {
        const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
        const updatedBooksObj = JSON.parse(updatedBooks);
        updatedBooksObj[bookId] = true;
        sessionStorage.setItem('updatedBooks', JSON.stringify(updatedBooksObj));
      }
    };
  }, [bookId]);
  
  const updateBookMutation = useMutation({
    mutationFn: (data: {
      bookId: string,
      bookData: {},
      detailsData: {},
      pressLinks: any[],
      awards: any[],
      editions: any[]
    }) => updateCompleteBookInfo(
      data.bookId,
      data.bookData,
      data.detailsData,
      data.pressLinks,
      data.awards,
      data.editions
    ),
    onSuccess: () => {
      if (bookId) {
        queryClient.invalidateQueries({ queryKey: ['book', bookId] });
        queryClient.invalidateQueries({ queryKey: ['bookDetails', bookId] });
        queryClient.invalidateQueries({ queryKey: ['pressLinks', bookId] });
        queryClient.invalidateQueries({ queryKey: ['awards', bookId] });
        queryClient.invalidateQueries({ queryKey: ['editions', bookId] });
      }
      
      if (!hasUpdatedRef.current) {
        console.log('Book information updated successfully');
        toast.success('Informations du livre mises à jour avec succès');
        hasUpdatedRef.current = true;
        setPreventUpdates(true);
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour des informations:', error);
      if (!hasUpdatedRef.current) {
        toast.error('Erreur lors de la mise à jour des informations');
        hasUpdatedRef.current = true;
      }
      setPreventUpdates(true);
    }
  });
  
  return {
    updateBookMutation,
    preventUpdates,
    hasUpdatedRef,
    setPreventUpdates
  };
};
