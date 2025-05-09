import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
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
import { BookCoversCarousel } from '@/components/book-detail/BookCoversCarousel';

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
    
    // Special case for Ambroise Vollard book
    if (book.title === "AMBROISE VOLLARD, UN DON SINGULIER" || book.title === "Ambroise Vollard, un don singulier") {
      try {
        hasUpdatedRef.current = true;
        
        const newDescription = "Le premier ouvrage à rendre hommage à Vollard le Réunionnais et au don exceptionnel fait à son île en 1947, exposé au musée Léon Dierx. Ces 157 œuvres initiales, complétées depuis 70 ans, forment la plus grande collection d'art moderne française en dehors de la métropole. Né à La Réunion en 1866 et mort en France métropolitaine à la veille de la Seconde Guerre mondiale, Ambroise Vollard a eu une influence décisive sur l'art au tournant des XIXe et XXe siècles. Paul Cézanne, Pablo Picasso, Auguste Renoir, Georges Rouault, Paul Gauguin, Berthe Morisot, Edgar Degas, Émile Bernard... En cinquante ans, il découvrit ou accompagna les plus grands artistes de son temps. Marchand, éditeur d'art et écrivain, Vollard avait un talent unique pour repérer les artistes. Comment, alors qu'il n'est jamais revenu dans son île natale, a-t-il participé à former le regard de nombreux Réunionnais ? Comment, alors qu'il ne cachait pas son aversion pour les institutions muséales, a-t-il participé à la création du premier musée des beaux-arts des Outre-mers français ? À l'occasion du 70e anniversaire du don Vollard au musée Léon Dierx, cet ouvrage retrace le parcours de ce réunionnais au don singulier.";
        
        const newDetails = {
          publisher: "Ed. 4 Épices",
          illustrator: "Non spécifié", 
          year: "2017",
          pages: "216",
          isbn: "9782952720496"
        };
        
        const newPressLinks = [
          { url: "https://imazpress.com/culture/le-livre-qui-veut-faire-decouvrir-ce-reunionnais-qui-a-revele-picasso", label: "https://imazpress.com/culture/le-livre-qui-veut-faire-decouvrir-ce-reunionnais-qui-a-revele-picasso" },
          { url: "https://la1ere.francetvinfo.fr/reunion/culture-1ere-539729.html", label: "https://la1ere.francetvinfo.fr/reunion/culture-1ere-539729.html" }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: [],
          editions: []
        });
      } catch (error) {
        console.error("Error in update effect for Ambroise Vollard book:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël") && book.id) {
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
  
  // Specific case for Ambroise Vollard
  if (book?.title === "Ambroise Vollard, un don singulier" || book?.title === "AMBROISE VOLLARD, UN DON SINGULIER") {
    editorialText = `Beau-livre. Co-écrit avec Bernard Leveneur – Ed. 4 Épices – 2017 – 216 pages`;
    
    // Force specific details for Ambroise Vollard book
    details.isbn = "9782952720496";
    details.publisher = "Ed. 4 Épices";
    details.year = "2017";
    details.pages = "216";
    details.illustrator = "Non spécifié";
  } 
  // Specific case for "UN FLAMBOYANT PÈRE-NOËL"
  else if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) {
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

  // Function to get the correct image URL for the book
  const getBookCoverImage = () => {
    if (book.title === "Brown Baby") {
      return "/lovable-uploads/b0c162d3-58ba-40a7-842d-f0082b0b094f.png";
    }
    
    if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) {
      return "/lovable-uploads/fee9c5df-edcf-4ad2-9d9e-a8b6da17b84b.png";
    }
    
    if (book?.title === "Ambroise Vollard, un don singulier") {
      return "/lovable-uploads/8531bfd5-fdcb-48af-98cf-95d85012bf9d.png";
    }
    
    if (book?.title === "JACE. MAGIK GOUZOU") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/ART/jace-magik-gouzou.jpg";
    }
    
    if (book?.title === "La Réunion des enfants") {
      return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/JEUNESSE/La%20Reunion%20des%20enfants%20copie.jpg";
    }
    
    return book.cover_image || "/placeholder.svg";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 pt-2 pb-20 book-detail">
        <div className="mt-4">
          <div className="mb-6 mt-0">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#ea384c] transition-colors group">
              <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Retour aux livres
            </Link>
          </div>
          
          {/* Afficher la couverture du livre dans son format original sans cadre ni rognage */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="relative">
                <img 
                  src={getBookCoverImage()} 
                  alt={`Couverture du livre ${book.title}`} 
                  className="w-full h-auto" 
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5">
              <BookHeader 
                title={book.title} 
                editorialText={editorialText}
                showISBN={book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || 
                        book?.title === "AS-TU LA LANGUE BIEN PENDUE ?" || 
                        (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) ||
                        book?.title === "Ambroise Vollard, un don singulier" ||
                        book?.title === "AMBROISE VOLLARD, UN DON SINGULIER"}
                isbn={book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël") ? 
                      "9782919300297" : 
                      book?.title === "Ambroise Vollard, un don singulier" || book?.title === "AMBROISE VOLLARD, UN DON SINGULIER" ?
                      "9782952720496" : "9782916533520"}
              />
            </div>
          </div>
          
          {/* Ajout des couvertures ici, avant le titre */}
          <BookCoversCarousel 
            bookTitle={book.title}
            showCovers={book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")} 
          />
          
          <BookDescriptionSection description={updatedDescription} />
          
          {/* Editions section - Moved before Press Links */}
          {uniqueEditions.length > 0 && 
           book?.title !== "Brown Baby" && (
            <EditionsSection editions={uniqueEditions} />
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
