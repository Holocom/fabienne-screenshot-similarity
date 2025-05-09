
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
          publisher: "Océan Jeunesse",
          illustrator: "Audrey Caron", 
          year: "2025",
          pages: "48",
          isbn: "9782916533520"
        };
        
        const newAwards = [
          { name: "Prix Afrilivres", year: "2020" },
          { name: "Prix Jeanne de Cavally", year: "2022" },
          { name: "Finaliste du Prix Vanille Illustration", year: "2020" }
        ];
        
        const newEditions = [
          { name: "Edition anglaise Ile Maurice", publisher: null, year: null, language: "Anglais" },
          { name: "Edition française spéciale Côte d'Ivoire", publisher: null, year: null, language: "Français" },
          { name: "Edition bilingue franais-malgache", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: "Edition Vallesse", year: null, language: null },
          { name: "Edition Filigrane", publisher: null, year: null, language: null }
        ];
        
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Nol/1282122", label: "Babelio" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "Super Chouette" }
        ];
        
        if (false) {
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
    
    return () => {
    };
  }, [book, bookId, isLoadingBook, isBookError, updateBookMutation, preventUpdates]);
  
  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || isLoadingAwards || isLoadingEditions || updateBookMutation.isPending;
  
  const fallbackDetails = {
    id: "temp-id",
    book_id: bookId || '',
    publisher: "Océan Jeunesse",
    illustrator: "Audrey Caron",
    year: "2025",
    pages: "48",
    isbn: "9782916533520",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const details = bookDetails || fallbackDetails;
  
  const uniquePressLinks = Array.from(new Map(
    pressLinks.map(link => [link.url, link])
  ).values());
  
  const uniqueAwards = Array.from(new Map(
    awards.map(award => [`${award.name}-${award.year || 'none'}`, award])
  ).values());
  
  const uniqueEditions = Array.from(new Map(
    editions.map(edition => [edition.name, edition])
  ).values());
  
  const isExpressionsMelanze = book?.title === "Expressions Melanze";
  
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
  
  const updatedDescription = book?.description || "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";
  
  // Update the editorial text information based on the image 2
  let editorialText = '';
  
  if (book?.title === "Brown Baby") {
    editorialText = "Roman - Atelier des Nomades - 2024 - 264 pages";
    if (details?.isbn) {
      editorialText += `<br>EAN : ${details.isbn}`;
    }
  } else if (book?.title === "AS-TU LA LANGUE BIEN PENDUE ?") {
    editorialText = `Jeux d'expressions - illustré par Audrey Caron - Océan Jeunesse - 2025 - 48 pages`;
    if (fallbackDetails?.isbn) {
      editorialText += `<br>ISBN : 9782916533520`;
    }
  } else {
    // Format standard pour les autres livres
    editorialText = `${book?.categories?.name || "Jeunesse"} – illustré par ${details.illustrator || "Non spécifié"} – ${details.publisher || "Non spécifié"} – ${details.year || "2024"} – ${details.pages || "0"} pages`;
  }
  
  // Nouveaux prix et distinctions pour Brown Baby
  const brownBabyAwards = [
    { name: "Prix Vanille œuvre de fiction 2024", url: null },
    { name: "Prix Seligmann du livre contre le racisme 2024", url: null },
    { name: "Sélection Prix Maryse Condé 2024", url: null },
    { name: "Sélection Prix Senghor du premier roman 2024", url: null },
    { name: "Sélection Prix Verdelettres 2025", url: null },
    { name: "Coup de cœur Takam Tikou", url: null }
  ];
  
  // Nouveaux liens de presse pour Brown Baby
  const brownBabyPressLinks = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/brown-baby", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/brown-baby" },
    { url: "https://etlettres.com/la-couleur-du-coeur/", label: "https://etlettres.com/la-couleur-du-coeur/" },
    { url: "https://voya-g.com/fabienne-jonca-presente-brown-baby-roman-empreint-de-poesie-de-resistance-et-de-racines-afro-americaines/", label: "https://voya-g.com/fabienne-jonca-presente-brown-baby-roman-empreint-de-poesie-de-resistance-et-de-racines-afro-americaines/" },
    { url: "https://lexpress.mu/s/fabienne-jonca-blues-antiracisme-bleus-a-notre-humanite-540621", label: "https://lexpress.mu/s/fabienne-jonca-blues-antiracisme-bleus-a-notre-humanite-540621" }
  ];
  
  // Nouveaux liens de blog pour Brown Baby
  const brownBabyBlogLinks = [
    { url: "https://kittylamouette.blogspot.com/2024/10/brown-baby.html", label: "https://kittylamouette.blogspot.com/2024/10/brown-baby.html" }
  ];
  
  // Nouveaux liens pour le Prix Seligmann
  const brownBabySeligmannLinks = [
    { url: "https://www.linfo.re/la-reunion/societe/l-autrice-reunionnaise-fabienne-jonca-remporte-le-prix-seligmann-contre-le-racisme", label: "https://www.linfo.re/la-reunion/societe/l-autrice-reunionnaise-fabienne-jonca-remporte-le-prix-seligmann-contre-le-racisme" },
    { url: "https://www.lindependant.fr/2024/11/11/montesquieu-des-alberes-fabienne-jonca-obtient-le-prix-seligmann-2024-12317125.php", label: "https://www.lindependant.fr/2024/11/11/montesquieu-des-alberes-fabienne-jonca-obtient-le-prix-seligmann-2024-12317125.php" }
  ];
  
  const renderDescription = () => {
    if (!updatedDescription) return <p>Aucune description disponible pour ce livre.</p>;
    
    // Format the description to display "Brown Baby" in italics
    const paragraphs = updatedDescription.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      // Add italics to "Brown Baby" in the text
      const formattedParagraph = paragraph.replace(/Brown Baby/g, '<em>Brown Baby</em>');
      
      return <p key={index} className="mb-4 whitespace-pre-line" 
                dangerouslySetInnerHTML={{ __html: formattedParagraph }}>
             </p>;
    });
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
            {book?.title?.toUpperCase()}
          </h1>
          
          <div className="mb-10 mt-6">
            <p className="editorial-info mb-0" dangerouslySetInnerHTML={{ __html: editorialText }}>
            </p>
            
            {/* Display ISBN in the format from image 2 for "AS-TU LA LANGUE BIEN PENDUE ?" */}
            {book?.title === "AS-TU LA LANGUE BIEN PENDUE ?" && (
              <p className="mt-1 text-[#ea384c]">
                ISBN : {fallbackDetails?.isbn}
              </p>
            )}
          </div>
          
          <div className="description">
            {renderDescription()}
          </div>

          {/* Section Prix et distinctions pour Brown Baby avec style harmonisé */}
          {book?.title === "Brown Baby" && (
            <div className="mt-8">
              <h3 className="awards-title">PRIX ET DISTINCTIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {brownBabyAwards.map((award, index) => (
                  <li key={`brownbaby-award-${index}`} className="award-item">
                    {award.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Section Presse avec style harmonisé */}
          {(uniquePressLinks.length > 0 || (book?.title === "Brown Baby" && brownBabyPressLinks.length > 0)) && (
            <div>
              <h3 className="press-title">PRESSE</h3>
              <ul className="space-y-2 list-none pl-0">
                {book?.title === "Brown Baby" ? 
                  brownBabyPressLinks.map((link, index) => (
                    <li key={`brownbaby-press-${index}`}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="press-link">
                        {link.label || link.url}
                      </a>
                    </li>
                  ))
                  :
                  uniquePressLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="press-link">
                        {link.label || link.url}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
          
          {/* Section Blog avec style harmonisé */}
          {book?.title === "Brown Baby" && brownBabyBlogLinks.length > 0 && (
            <div>
              <h3 className="blog-title">BLOG</h3>
              <ul className="space-y-2 list-none pl-0">
                {brownBabyBlogLinks.map((link, index) => (
                  <li key={`brownbaby-blog-${index}`}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="blog-link">
                      {link.label || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Prix et distinctions pour les autres livres */}
          {uniqueAwards.length > 0 && book?.title !== "Brown Baby" && (
            <div>
              <h3 className="awards-title">PRIX ET DISTINCTIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {uniqueAwards.map((award, index) => (
                  <li key={index} className="award-item">
                    {award.name}{award.year ? ` (${award.year})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {uniqueEditions.length > 0 && book?.title !== "Brown Baby" && (
            <div>
              <h3 className="editions-title">ÉDITIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {uniqueEditions.map((edition, index) => (
                  <li key={index} className="edition-item">
                    {edition.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Section Prix Seligmann déplacée tout en bas */}
          {book?.title === "Brown Baby" && brownBabySeligmannLinks.length > 0 && (
            <div className="mt-10">
              <h3 className="seligmann-title-bottom">PRIX SELIGMANN</h3>
              <ul className="space-y-2 list-none pl-0">
                {brownBabySeligmannLinks.map((link, index) => (
                  <li key={`brownbaby-seligmann-${index}`}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="seligmann-link-bottom">
                      {link.label || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>;
};

export default BookDetailPage;
