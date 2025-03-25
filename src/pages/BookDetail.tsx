
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getBookById, 
  getBookDetails, 
  getPressLinks, 
  getAwards, 
  getEditions,
  updateCompleteBookInfo
} from '@/services/bookService';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { BookDetail, PressLink, Award, Edition } from '@/integrations/supabase/schema';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const queryClient = useQueryClient();
  const hasUpdatedRef = useRef(false);
  const [preventUpdates, setPreventUpdates] = useState(false);
  
  // Mutations pour mettre à jour les informations complètes du livre
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
      // Invalider les requêtes pour forcer le rechargement des données
      if (bookId) {
        queryClient.invalidateQueries({ queryKey: ['book', bookId] });
        queryClient.invalidateQueries({ queryKey: ['bookDetails', bookId] });
        queryClient.invalidateQueries({ queryKey: ['pressLinks', bookId] });
        queryClient.invalidateQueries({ queryKey: ['awards', bookId] });
        queryClient.invalidateQueries({ queryKey: ['editions', bookId] });
      }
      
      // Afficher un seul toast de succès, uniquement si ce n'est pas un rechargement de page
      if (!hasUpdatedRef.current) {
        console.log('Book information updated successfully');
        toast.success('Informations du livre mises à jour avec succès');
        hasUpdatedRef.current = true;
        setPreventUpdates(true); // Prevent any more updates after a successful one
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour des informations:', error);
      if (!hasUpdatedRef.current) {
        toast.error('Erreur lors de la mise à jour des informations');
        hasUpdatedRef.current = true;
      }
      setPreventUpdates(true); // Prevent retries after error
    }
  });
  
  // Store book ID in session storage to prevent multiple updates during navigation
  useEffect(() => {
    const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
    const updatedBooksObj = JSON.parse(updatedBooks);
    
    if (bookId && updatedBooksObj[bookId]) {
      // Book was already updated in this session
      setPreventUpdates(true);
      hasUpdatedRef.current = true;
    }
    
    return () => {
      // Save update state when component unmounts
      if (bookId && hasUpdatedRef.current) {
        const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
        const updatedBooksObj = JSON.parse(updatedBooks);
        updatedBooksObj[bookId] = true;
        sessionStorage.setItem('updatedBooks', JSON.stringify(updatedBooksObj));
      }
    };
  }, [bookId]);
  
  // Queries pour récupérer les données actuelles
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
    enabled: !!bookId
  });
  
  // Effet pour mettre à jour les informations du livre une seule fois
  useEffect(() => {
    // Skip updates if we've already done them or if we're explicitly preventing updates
    if (preventUpdates || !bookId || hasUpdatedRef.current) {
      return;
    }
    
    console.log("Checking if book needs update:", bookId);
    
    // Éviter de faire les mises à jour si déjà effectuées, en cours, ou si des erreurs ont été rencontrées
    if (
      updateBookMutation.isPending || 
      isLoadingBook || 
      !book || 
      isBookError ||
      !book.title
    ) {
      return;
    }
    
    // Vérifier que le livre est "Un flamboyant père-Noël"
    if (book.title.toLowerCase().includes("flamboyant") && book.title.toLowerCase().includes("noël") && book.id) {
      try {
        // Marquer comme mise à jour avant de commencer pour éviter les mises à jour multiples
        hasUpdatedRef.current = true;
        
        // Description mise à jour selon l'image
        const newDescription = "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";
        
        // Nouveaux détails du livre selon l'image
        const newDetails = {
          publisher: "Atelier des nomades",
          illustrator: "Iloë", 
          year: "2020",
          pages: "24",
          isbn: "9782919300297"
        };
        
        // Nouveaux prix selon l'image
        const newAwards = [
          { name: "Prix Afrilivres", year: "2020" },
          { name: "Prix Jeanne de Cavally", year: "2022" },
          { name: "Finaliste du Prix Vanille Illustration", year: "2020" }
        ];
        
        // Nouvelles éditions selon l'image
        const newEditions = [
          { name: "Edition anglaise Ile Maurice", publisher: null, year: null, language: "Anglais" },
          { name: "Edition française spéciale Côte d'Ivoire", publisher: null, year: null, language: "Français" },
          { name: "Edition bilingue fran��ais-malgache", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: "Edition Vallesse", year: null, language: null },
          { name: "Edition Filigrane", publisher: null, year: null, language: null }
        ];
        
        // Nouveaux liens de presse selon l'image
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Nol/1282122", label: "Babelio" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "Super Chouette" }
        ];
        
        // Vérifier si les données ont besoin d'être mises à jour
        const needsUpdate = false; // Setting to false to prevent any more updates
        
        if (false) { // This condition will never be true, effectively disabling the update
          // ... keep existing code (update logic)
        } else {
          console.log("Updates are disabled for this session");
        }
      } catch (error) {
        console.error("Error in update effect:", error);
        hasUpdatedRef.current = true;
        setPreventUpdates(true);
      }
    } else {
      // Marquer comme mis à jour si ce n'est pas le livre cible
      hasUpdatedRef.current = true;
      setPreventUpdates(true);
    }
    
    // Reset the ref when unmounting
    return () => {
      // This is handled by the session storage effect
    };
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
  
  // Déduplication plus stricte des liens de presse - filtrage par URL
  const uniquePressLinks = Array.from(new Map(
    (pressLinks.length > 0 ? pressLinks : fallbackPressLinks)
    .map(link => [link.url, link])
  ).values());
  
  // Déduplication plus stricte des prix par nom et année
  const uniqueAwards = Array.from(new Map(
    awards.map(award => [`${award.name}-${award.year || 'none'}`, award])
  ).values());
  
  // Déduplication plus stricte des éditions par nom
  const uniqueEditions = Array.from(new Map(
    editions.map(edition => [edition.name, edition])
  ).values());
  
  if (isLoading) {
    return <div className="min-h-screen bg-white">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Chargement...</p>
        </div>
      </div>;
  }
  
  if (bookError || !book) {
    return <div className="min-h-screen bg-white">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Ce livre n'existe pas ou une erreur est survenue.</p>
          <Link to="/" className="mt-4 inline-block underline">
            Retour aux livres
          </Link>
        </div>
      </div>;
  }
  
  const updatedDescription = book.description || "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";
  const editorialText = `${book.categories?.name || "Jeunesse"} – illustré par ${details.illustrator || "Non spécifié"} – ${details.publisher || "Non spécifié"} – ${details.year || "2024"} – ${details.pages || "0"} pages`;
  
  const renderDescription = () => {
    if (!updatedDescription) return <p>Aucune description disponible pour ce livre.</p>;
    const paragraphs = updatedDescription.split('\n\n');
    return paragraphs.map((paragraph, index) => <p key={index} className="mb-4 whitespace-pre-line">
        {paragraph}
      </p>);
  };
  
  return <div className="min-h-screen bg-white">
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
          <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
            {book.title?.toUpperCase()}
          </h1>
          
          <div className="mb-10 mt-6">
            <p className="editorial-info mb-0">
              {editorialText}
              {details.isbn && <span className="block mt-0">
                  ISBN : {details.isbn}
                </span>}
            </p>
          </div>
          
          <div className="description">
            {renderDescription()}
          </div>
          
          {uniquePressLinks.length > 0 && <div>
              <h3 className="press-title">PRESSE</h3>
              <ul className="space-y-2 list-none pl-0">
                {uniquePressLinks.map((link, index) => <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="press-link">
                      {link.label || link.url}
                    </a>
                  </li>)}
              </ul>
            </div>}
          
          {uniqueAwards.length > 0 && <div>
              <h3 className="awards-title">PRIX ET DISTINCTIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {uniqueAwards.map((award, index) => <li key={index} className="award-item">
                    {award.name}{award.year ? ` (${award.year})` : ''}
                  </li>)}
              </ul>
            </div>}
          
          {uniqueEditions.length > 0 && <div>
              <h3 className="editions-title">ÉDITIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {uniqueEditions.map((edition, index) => <li key={index} className="edition-item">
                    {edition.name}
                    {edition.publisher ? `, ${edition.publisher}` : ''}
                    {edition.year ? `, ${edition.year}` : ''}
                    {/* Suppression de l'affichage du champ language */}
                  </li>)}
              </ul>
            </div>}
        </div>
      </div>
    </div>;
};

export default BookDetailPage;
