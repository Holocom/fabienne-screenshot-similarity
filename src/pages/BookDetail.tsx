import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  getBookById, 
  getBookDetails, 
  getPressLinks, 
  getAwards, 
  getEditions
} from '@/services/bookService';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { useBookUpdate } from '@/hooks/useBookUpdate';
import { LoadingState } from '@/components/book-detail/LoadingState';
import { ErrorState } from '@/components/book-detail/ErrorState';
import { BookHeader } from '@/components/book-detail/BookHeader';
import { BookDescriptionSection } from '@/components/book-detail/BookDescriptionSection';
import { AwardsSection } from '@/components/book-detail/AwardsSection';
import { PressLinksSection } from '@/components/book-detail/PressLinksSection';
import { BlogLinksSection } from '@/components/book-detail/BlogLinksSection';
import { EditionsSection } from '@/components/book-detail/EditionsSection';
import { SeligmannLinksSection } from '@/components/book-detail/SeligmannLinksSection';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { 
    updateBookMutation, 
    preventUpdates, 
    hasUpdatedRef 
  } = useBookUpdate(bookId);
  
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
    
    // Special case for "UN FLAMBOYANT PÈRE-NOËL"
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
          { name: "Prix Afrilivres 2020", year: "2020" },
          { name: "Prix Jeanne de Cavally 2022", year: "2022" },
          { name: "Finaliste du Prix Vanille Illustration 2020", year: "2020" },
          { name: "Finaliste du Prix Vanille Illustration 2024", year: "2024" }
        ];
        
        const newEditions = [
          { name: "Edition anglaise Ile Maurice", publisher: null, year: null, language: "Anglais" },
          { name: "Edition française spéciale Côte d'Ivoire", publisher: null, year: null, language: "Français" },
          { name: "Edition bilingue français-malgache 2024", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: "Atelier des nomades", year: null, language: null },
          { name: "Edition Vallesse", publisher: "Vallesse", year: null, language: null },
          { name: "Edition Filigrane", publisher: "Filigrane", year: null, language: null }
        ];
        
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122", label: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html" },
          { url: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html", label: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html" }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: newEditions
        });
      } catch (error) {
        console.error("Error in update effect:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book.title === "AS-TU LA LANGUE BIEN PENDUE ?") {
      // Add specific update case for "AS-TU LA LANGUE BIEN PENDUE ?"
      try {
        console.log("Updating AS-TU LA LANGUE BIEN PENDUE ?");
        
        const newDescription = "Des dessins qui cachent des expressions et un jeu du pendu pour les retrouver en deux temps trois mouvements. Ce livre est une invitation aux jeux de mots. Un voyage au pays des expressions qui font le charme de notre langue. Langue que tu pourras donner au chat, si tu sèches sur la réponse.";
        
        const newDetails = {
          publisher: "Océan Jeunesse",
          illustrator: "Audrey Caron", 
          year: "2025",
          pages: "48",
          isbn: "9782916533520"
        };
        
        const newPressLinks = [
          { url: "https://takamtikou.bnf.fr", label: "Takam Tikou - BnF" },
          { url: "https://encresvagabondes.com", label: "Encres Vagabondes" }
        ];
        
        // Force an update to the database
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: [],
          editions: []
        });
      } catch (error) {
        console.error("Error updating AS-TU LA LANGUE BIEN PENDUE ?:", error);
        hasUpdatedRef.current = true;
      }
    } else {
      hasUpdatedRef.current = true;
    }
  }, [book, bookId, isLoadingBook, isBookError, updateBookMutation, preventUpdates]);
  
  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || isLoadingAwards || isLoadingEditions || updateBookMutation.isPending;
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (bookError || !book) {
    return <ErrorState />;
  }
  
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
  
  // Update the editorial text information specifically for this book
  let editorialText = '';
  
  // Specific case for "UN FLAMBOYANT PÈRE-NOËL"
  if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) {
    editorialText = `Album jeunesse – illustré par Iloë – Atelier des nomades – 2020 – 24 pages`;
    
    // Force specific details for this book
    details.isbn = "9782919300297";
    details.publisher = "Atelier des nomades";
    details.illustrator = "Iloë";
    details.year = "2020";
    details.pages = "24";
  } else if (book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || book.title.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
    editorialText = `Jeux d'expressions - illustré par Audrey Caron - Océan Jeunesse –2025 – 48 pages`;
    
    // Forcer uniquement pour ce livre le bookDetails avec le bon ISBN
    details.isbn = "9782916533520";
    details.publisher = "Océan Jeunesse";
    details.illustrator = "Audrey Caron";
    details.year = "2025";
    details.pages = "48";
  } else if (book?.title === "Brown Baby") {
    editorialText = "Roman - Atelier des Nomades - 2024 - 264 pages";
    if (details?.isbn) {
      editorialText += `<br>EAN : ${details.isbn}`;
    }
  } else {
    // Format standard pour les autres livres
    editorialText = `${book?.categories?.name || "Jeunesse"} – illustré par ${details.illustrator || "Non spécifié"} – ${details.publisher || "Non spécifié"} – ${details.year || "2024"} – ${details.pages || "0"} pages`;
  }
  
  // Brown Baby blog links
  const brownBabyBlogLinks = [
    { url: "https://kittylamouette.blogspot.com/2024/10/brown-baby.html", label: "https://kittylamouette.blogspot.com/2024/10/brown-baby.html" }
  ];
  
  // Brown Baby Seligmann links
  const brownBabySeligmannLinks = [
    { url: "https://www.linfo.re/la-reunion/societe/l-autrice-reunionnaise-fabienne-jonca-remporte-le-prix-seligmann-contre-le-racisme", label: "https://www.linfo.re/la-reunion/societe/l-autrice-reunionnaise-fabienne-jonca-remporte-le-prix-seligmann-contre-le-racisme" },
    { url: "https://www.lindependant.fr/2024/11/11/montesquieu-des-alberes-fabienne-jonca-obtient-le-prix-seligmann-2024-12317125.php", label: "https://www.lindependant.fr/2024/11/11/montesquieu-des-alberes-fabienne-jonca-obtient-le-prix-seligmann-2024-12317125.php" }
  ];
  
  const updatedDescription = book?.description || "Des dessins qui cachent des expressions et un jeu du pendu pour les retrouver en deux temps trois mouvements. Ce livre est une invitation aux jeux de mots. Un voyage au pays des expressions qui font le charme de notre langue. Langue que tu pourras donner au chat, si tu sèches sur la réponse.";
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 pt-2 pb-20 book-detail">
        <div className="mt-4">
          <BookHeader 
            title={book.title} 
            editorialText={editorialText}
            showISBN={book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || 
                    book?.title === "AS-TU LA LANGUE BIEN PENDUE ?" || 
                    (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël"))}
            isbn={book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël") ? 
                  "9782919300297" : "9782916533520"}
          />
          
          <BookDescriptionSection description={updatedDescription} />
          
          {/* Awards section for specified books */}
          {(book?.title === "Brown Baby" || 
            (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël"))) && (
            <AwardsSection 
              awards={book?.title === "Brown Baby" ? [] : uniqueAwards} 
              bookTitle={book.title}
              isCustom={book?.title === "Brown Baby"}
              customAwards={book?.title === "Brown Baby" ? [
                { name: "Prix Vanille œuvre de fiction 2024", url: null },
                { name: "Prix Seligmann du livre contre le racisme 2024", url: null },
                { name: "Sélection Prix Maryse Condé 2024", url: null },
                { name: "Sélection Prix Senghor du premier roman 2024", url: null },
                { name: "Sélection Prix Verdelettres 2025", url: null },
                { name: "Coup de cœur Takam Tikou", url: null }
              ] : [
                { name: "Prix Afrilivres 2020", url: null },
                { name: "Prix Jeanne de Cavally 2022", url: null },
                { name: "Finaliste du Prix Vanille Illustration 2020", url: null },
                { name: "Finaliste du Prix Vanille Illustration 2024", url: null }
              ]}
            />
          )}
          
          {/* Press links section */}
          <PressLinksSection pressLinks={uniquePressLinks} bookTitle={book.title} />
          
          {/* Blog links section for Brown Baby */}
          {book?.title === "Brown Baby" && <BlogLinksSection blogLinks={brownBabyBlogLinks} />}
          
          {/* Awards section for other books */}
          {uniqueAwards.length > 0 && 
           book?.title !== "Brown Baby" && 
           !(book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) && (
            <AwardsSection awards={uniqueAwards} bookTitle={book.title} />
          )}
          
          {/* Editions section */}
          {uniqueEditions.length > 0 && 
           book?.title !== "Brown Baby" && (
            <EditionsSection editions={uniqueEditions} />
          )}
          
          {/* Seligmann links section for Brown Baby */}
          {book?.title === "Brown Baby" && (
            <SeligmannLinksSection seligmannLinks={brownBabySeligmannLinks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
