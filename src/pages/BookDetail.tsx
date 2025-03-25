
import React, { useEffect } from 'react';
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
      
      toast.success('Informations du livre mises à jour avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour des informations:', error);
      toast.error('Erreur lors de la mise à jour des informations');
    }
  });
  
  // Queries pour récupérer les données actuelles
  const {
    data: book,
    isLoading: isLoadingBook,
    error: bookError
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
  
  // Ajout d'un drapeau pour éviter les mises à jour en boucle
  const [hasUpdated, setHasUpdated] = React.useState(false);
  
  // Effet pour mettre à jour les informations du livre une seule fois
  useEffect(() => {
    // Éviter de faire les mises à jour si déjà effectuées ou en cours
    if (
      hasUpdated || 
      updateBookMutation.isPending || 
      isLoadingBook || 
      isLoadingDetails ||
      !book || 
      !book.title
    ) {
      return;
    }
    
    // Vérifier que le livre est "Un flamboyant père-Noël"
    if (book.title.toLowerCase().includes("flamboyant") && book.title.toLowerCase().includes("noël")) {
      try {
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
          { name: "Edition bilingue français-malgache", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: "Edition Vallesse", year: null, language: null },
          { name: "Edition Filigrane", publisher: null, year: null, language: null }
        ];
        
        // Nouveaux liens de presse selon l'image
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Nol/1282122", label: "Babelio" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "Super Chouette" }
        ];
        
        // Vérifier si les données ont besoin d'être mises à jour
        const needsUpdate = 
          (bookDetails?.illustrator !== newDetails.illustrator) || 
          (bookDetails?.publisher !== newDetails.publisher) ||
          (bookDetails?.year !== newDetails.year) ||
          (bookDetails?.pages !== newDetails.pages) ||
          (bookDetails?.isbn !== newDetails.isbn) ||
          (book.description !== newDescription) ||
          (pressLinks.length < 2) ||  // Vérifie seulement si les liens minimum sont présents
          (awards.length < 3) ||      // Vérifie seulement si les prix minimum sont présents
          (editions.length < 5);      // Vérifie seulement si les éditions minimum sont présentes
        
        // Si des mises à jour sont nécessaires, mettre à jour les informations
        if (needsUpdate) {
          console.log("Updating book information for:", book.title);
          updateBookMutation.mutate({
            bookId: bookId || '',
            bookData: { description: newDescription },
            detailsData: newDetails,
            pressLinks: newPressLinks.filter(link => 
              !pressLinks.some(existingLink => existingLink.url === link.url)
            ),
            awards: newAwards.filter(award => 
              !awards.some(existingAward => 
                existingAward.name === award.name && existingAward.year === award.year
              )
            ),
            editions: newEditions.filter(edition => 
              !editions.some(existingEdition => 
                existingEdition.name === edition.name
              )
            )
          });
        }
        
        // Marquer comme mis à jour même si aucune mise à jour n'était nécessaire
        setHasUpdated(true);
      } catch (error) {
        console.error("Error in update effect:", error);
        // Marquer comme mis à jour pour éviter des tentatives répétées même en cas d'erreur
        setHasUpdated(true);
      }
    } else {
      // Marquer comme mis à jour si ce n'est pas le livre cible
      setHasUpdated(true);
    }
  }, [book, bookDetails, pressLinks, awards, editions, isLoadingBook, isLoadingDetails, bookId, updateBookMutation, hasUpdated]);
  
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
  
  // Déduplication des liens de presse - filtrage par URL
  const uniquePressLinks = [...new Map(
    (pressLinks.length > 0 ? pressLinks : fallbackPressLinks)
    .map(link => [link.url, link])
  ).values()];
  
  // Déduplication des prix par nom et année
  const uniqueAwards = [...new Map(
    awards.map(award => [`${award.name}-${award.year}`, award])
  ).values()];
  
  // Déduplication des éditions par nom
  const uniqueEditions = [...new Map(
    editions.map(edition => [edition.name, edition])
  ).values()];
  
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
                    {edition.name}{edition.publisher ? `, ${edition.publisher}` : ''}{edition.year ? `, ${edition.year}` : ''}
                    {edition.language ? ` (${edition.language})` : ''}
                  </li>)}
              </ul>
            </div>}
        </div>
      </div>
    </div>;
};

export default BookDetailPage;
