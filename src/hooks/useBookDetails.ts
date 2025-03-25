import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getBookById } from '@/services/bookService';
import { getBookDetails } from '@/services/bookDetailService';
import { getPressLinks } from '@/services/pressLinkService';
import { getAwards } from '@/services/awardService';
import { getEditions } from '@/services/editionService';
import { updateCompleteBookInfo } from '@/services/bookUpdateService';
import { BookDetail, PressLink, Award, Edition } from '@/integrations/supabase/schema';

export const useBookDetails = (bookId?: string) => {
  const queryClient = useQueryClient();
  const hasUpdatedRef = useRef(false);
  const [preventUpdates, setPreventUpdates] = useState(false);
  
  useEffect(() => {
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
    data: editions = [],
    isLoading: isLoadingEditions
  } = useQuery({
    queryKey: ['editions', bookId],
    queryFn: () => getEditions(bookId || ''),
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000
  });
  
  useEffect(() => {
    if (preventUpdates || !bookId || hasUpdatedRef.current) {
      return;
    }
    
    console.log("Checking if book needs update:", bookId);
    
    if (
      updateBookMutation.isPending || 
      isLoadingBook || 
      !book || 
      isBookError ||
      !book.title
    ) {
      return;
    }
    
    if (book.title.toLowerCase().includes("flamboyant") && book.title.toLowerCase().includes("noël") && book.id) {
      try {
        hasUpdatedRef.current = true;
        
        const newDescription = "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";
        
        const newDetails = {
          publisher: "Atelier des nomades",
          illustrator: "Iloë", 
          year: "2020",
          pages: "24",
          isbn: "9782919300297"
        };
        
        const newAwards = [
          { name: "Prix Afrilivres", year: "2020" },
          { name: "Prix Jeanne de Cavally", year: "2022" },
          { name: "Finaliste du Prix Vanille Illustration", year: "2020" }
        ];
        
        const newEditions = [
          { name: "Edition anglaise Ile Maurice", publisher: null, year: null, language: "Anglais" },
          { name: "Edition française spéciale Côte d'Ivoire", publisher: null, year: null, language: "Français" },
          { name: "Edition bilingue français-malgache", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: null, year: null, language: null },
          { name: "Edition Vallesse", publisher: null, year: null, language: null },
          { name: "Edition Filigrane", publisher: null, year: null, language: null }
        ];
        
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Nol/1282122", label: "Babelio" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "Super Chouette" }
        ];
        
        const needsUpdate = true;
        
        if (needsUpdate) {
          console.log("Updating book information...");
          
          updateBookMutation.mutate({
            bookId: book.id,
            bookData: {
              description: newDescription
            },
            detailsData: newDetails,
            pressLinks: newPressLinks,
            awards: newAwards,
            editions: newEditions
          });
        } else {
          console.log("Updates are disabled for this session");
        }
      } catch (error) {
        console.error("Error in update effect:", error);
        hasUpdatedRef.current = true;
        setPreventUpdates(true);
      }
    } else {
      hasUpdatedRef.current = true;
      setPreventUpdates(true);
    }
  }, [book, bookId, isLoadingBook, isBookError, updateBookMutation, preventUpdates]);

  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || isLoadingAwards || isLoadingEditions || updateBookMutation.isPending;
  
  const fallbackDetails: BookDetail = {
    id: "temp-id",
    book_id: bookId || '',
    publisher: "Atelier des nomades",
    illustrator: "Iloë",
    year: "2020",
    pages: "24",
    isbn: "9782919300297",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const fallbackPressLinks: PressLink[] = [{
    id: "press-1",
    book_id: bookId || '',
    url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Nol/1282122",
    label: "Babelio",
    created_at: new Date().toISOString()
  }, {
    id: "press-2",
    book_id: bookId || '',
    url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html",
    label: "Super Chouette",
    created_at: new Date().toISOString()
  }];
  
  const details = bookDetails || fallbackDetails;
  
  const uniquePressLinks = Array.from(new Map(
    (pressLinks.length > 0 ? pressLinks : fallbackPressLinks)
    .map(link => [link.url, link])
  ).values());
  
  const uniqueAwards = Array.from(new Map(
    awards.map(award => [`${award.name}-${award.year || 'none'}`, award])
  ).values());
  
  const uniqueEditions = editions && editions.length > 0 
    ? editions.sort((a, b) => a.name.localeCompare(b.name))
    : [];
  
  const updatedDescription = book?.description || "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";

  return {
    book,
    details,
    uniquePressLinks,
    uniqueAwards,
    uniqueEditions,
    updatedDescription,
    isLoading,
    bookError,
    isBookError,
    category: book?.categories?.name || "Jeunesse"
  };
};

