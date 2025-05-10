
import React from 'react';
import { Book, Award, Edition, PressLink, BookDetail } from '@/integrations/supabase/schema';
import { BookHeader } from '@/components/book-detail/BookHeader';
import { BookDescriptionSection } from '@/components/book-detail/BookDescriptionSection';
import { AwardsSection } from '@/components/book-detail/AwardsSection';
import { PressLinksSection } from '@/components/book-detail/PressLinksSection';
import { BlogLinksSection } from '@/components/book-detail/BlogLinksSection';
import { EditionsSection } from '@/components/book-detail/EditionsSection';
import { SeligmannLinksSection } from '@/components/book-detail/SeligmannLinksSection';
import { BookCoversCarousel } from '@/components/book-detail/BookCoversCarousel';
import { getBookEditorialDetails } from './BookEditorialDetails';

interface BookDetailContentProps {
  book: Book;
  bookDetails: BookDetail;
  pressLinks: PressLink[];
  awards: Award[];
  editions: Edition[];
}

export const BookDetailContent: React.FC<BookDetailContentProps> = ({
  book,
  bookDetails,
  pressLinks,
  awards,
  editions
}) => {
  // Obtenir les détails éditoriaux
  const { editorialText, isbn } = getBookEditorialDetails({ bookTitle: book.title, bookDetails });
  
  // Filtrer les liens de presse pour éliminer les doublons
  const uniquePressLinks = Array.from(new Map(
    pressLinks.map(link => [link.url, link])
  ).values());
  
  // Filtrer les prix pour éliminer les doublons
  const uniqueAwards = Array.from(new Map(
    awards.map(award => [`${award.name}-${award.year || 'none'}`, award])
  ).values());
  
  // Filtrer les éditions pour éliminer les doublons
  const uniqueEditions = Array.from(new Map(
    editions.map(edition => [edition.name, edition])
  ).values());
  
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
  
  // Vérifier si l'ISBN doit être affiché
  const showISBN = book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || 
    book?.title === "AS-TU LA LANGUE BIEN PENDUE ?" || 
    (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) ||
    book?.title === "Ambroise Vollard, un don singulier" ||
    book?.title === "AMBROISE VOLLARD, UN DON SINGULIER" ||
    book?.title === "EXPRESSIONS MÉLANZÉ" ||
    book?.title === "Expressions Mélanzé" ||
    book?.title === "Expressions Melanze" ||
    book?.title === "JACE. MAGIK GOUZOU" ||
    book?.title === "Z'OISEAUX RARES" || 
    book?.title === "Z'oiseaux rares" || 
    book?.title === "ZOISEAUX RARES" ||
    book.id === "ed5bd9ea-ad20-4426-b48b-19e4ed5b5356";
  
  return (
    <>
      {/* Affichage spécifique pour Brown Baby avec carousel */}
      {book?.title === "Brown Baby" ? (
        <BookCoversCarousel 
          bookTitle={book.title}
          showCovers={true}
          bookDetails={{ 
            editorialText: editorialText,
            isbn: isbn 
          }}
        />
      ) : (
        <div className="w-full">
          <BookHeader 
            title={book.title} 
            editorialText={editorialText}
            showISBN={showISBN}
            isbn={isbn}
          />
        </div>
      )}
      
      {/* Description du livre */}
      <BookDescriptionSection description={updatedDescription} />
      
      {/* Section des éditions - Placée avant les liens de presse */}
      {uniqueEditions.length > 0 && 
       book?.title !== "Brown Baby" && (
        <EditionsSection editions={uniqueEditions} />
      )}
      
      {/* Section des liens de presse */}
      <PressLinksSection pressLinks={uniquePressLinks} bookTitle={book.title} />
      
      {/* Section des liens de blog pour Brown Baby */}
      {book?.title === "Brown Baby" && <BlogLinksSection blogLinks={brownBabyBlogLinks} />}
      
      {/* Section des prix pour les autres livres */}
      {uniqueAwards.length > 0 && 
       book?.title !== "Brown Baby" && 
       !(book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) && (
        <AwardsSection awards={uniqueAwards} bookTitle={book.title} />
      )}
      
      {/* Section des liens Seligmann pour Brown Baby */}
      {book?.title === "Brown Baby" && (
        <SeligmannLinksSection seligmannLinks={brownBabySeligmannLinks} />
      )}
    </>
  );
};
