
import React from 'react';
import { Book, Award, Edition, PressLink, BookDetail } from '@/integrations/supabase/schema';
import { BookHeader } from '@/components/book-detail/BookHeader';
import { BookDescriptionSection } from '@/components/book-detail/BookDescriptionSection';
import { AwardsSection } from '@/components/book-detail/AwardsSection';
import { PressLinksSection } from '@/components/book-detail/PressLinksSection';
import { BlogLinksSection } from '@/components/book-detail/BlogLinksSection';
import { SeligmannLinksSection } from '@/components/book-detail/SeligmannLinksSection';
import { BookCoversCarousel } from '@/components/book-detail/BookCoversCarousel';
import { getBookEditorialDetails } from './BookEditorialDetails';
import { DistinctionsSection } from './DistinctionsSection';

interface BookDetailContentProps {
  book: Book;
  bookDetails: BookDetail;
  pressLinks: PressLink[];
  awards: Award[];
  distinctions: any[];
  editions: Edition[];
}

export const BookDetailContent: React.FC<BookDetailContentProps> = ({
  book,
  bookDetails,
  pressLinks,
  awards,
  distinctions,
  editions
}) => {
  // Obtenir les détails éditoriaux
  const { editorialText, isbn } = getBookEditorialDetails({ bookTitle: book.title, bookDetails });
  
  // Filtrer les liens de presse pour éliminer les doublons
  const uniquePressLinks = Array.from(new Map(
    pressLinks.map(link => [link.url, link])
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
  
  // Vérifier si Brown Baby a besoin d'un traitement spécial
  const isBrownBaby = book?.title === "Brown Baby";

  // Special case for "EDGAR, LE CHAT SOURIS"
  const isEdgarChatSouris = book?.title === "EDGAR, LE CHAT SOURIS" || book?.title === "Edgar, le chat souris";
  
  // Liens spécifiques pour Edgar, le chat souris
  const edgarChatSourisLinks = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris" },
    { url: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839", label: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839" },
    { url: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html", label: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html" }
  ];
  
  // Prix spécifiques pour Edgar, le chat souris
  const edgarChatSourisAwards = [
    { name: "Prix de l'album Jeunesse au Salon du livre insulaire d'Ouessant 2013", year: "2013" },
    { name: "Sélection Coup de cœur des lecteurs saint-paulois 2013", year: "2013" },
    { name: "Sélection Prix du Paille-en-queue 2014", year: "2014" },
    { name: "Coup de cœur Takam Tikou", year: null }
  ];
  
  // Add specific check for Z'OISEAUX RARES and other books that need ISBN display
  const shouldShowISBN = book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || 
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
    book.id === "ed5bd9ea-ad20-4426-b48b-19e4ed5b5356" ||
    isEdgarChatSouris;
  
  return (
    <>
      {/* Affichage spécifique pour Brown Baby avec carousel */}
      {isBrownBaby ? (
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
            showISBN={shouldShowISBN}
            isbn={isbn}
          />
        </div>
      )}
      
      {/* Description du livre */}
      <BookDescriptionSection description={book?.description || ""} bookTitle={book.title} />
      
      {/* Section des liens de presse - Afficher les liens spécifiques pour Edgar, le chat souris */}
      {isEdgarChatSouris ? (
        <PressLinksSection pressLinks={edgarChatSourisLinks.map(link => ({ id: '', book_id: book.id, url: link.url, label: link.label, created_at: '' }))} bookTitle={book.title} />
      ) : (
        <PressLinksSection pressLinks={uniquePressLinks} bookTitle={book.title} />
      )}
      
      {/* Section des liens de blog pour Brown Baby */}
      {isBrownBaby && <BlogLinksSection blogLinks={brownBabyBlogLinks} />}
      
      {/* Section combinée des prix et distinctions */}
      {isEdgarChatSouris ? (
        <div className="my-6">
          <h3 className="text-xl font-bold mb-2 text-primary-blue uppercase">PRIX ET DISTINCTIONS</h3>
          <ul className="space-y-1 list-none pl-0">
            {edgarChatSourisAwards.map((award, index) => (
              <li key={`award-${index}`} className="text-primary-blue mb-1">
                {award.name}{award.year ? ` (${award.year})` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        (awards.length > 0 || distinctions.length > 0) ? (
          <div className="my-6">
            <h3 className="text-xl font-bold mb-2 text-primary-blue uppercase">PRIX ET DISTINCTIONS</h3>
            {awards.length > 0 && (
              <ul className="space-y-1 list-none pl-0">
                {awards.map((award, index) => (
                  <li key={`award-${index}`} className="text-primary-blue mb-1">
                    {award.name}{award.year ? ` (${award.year})` : ''}
                  </li>
                ))}
              </ul>
            )}
            
            {distinctions.length > 0 && (
              <DistinctionsSection 
                distinctions={distinctions} 
                bookTitle={book.title}
                hideTitle={true}
                className="mt-0"
                combineWithAwards={true}
              />
            )}
          </div>
        ) : isBrownBaby ? (
          <AwardsSection 
            awards={[]} 
            bookTitle={book.title} 
            isCustom={true} 
            customAwards={brownBabyBlogLinks.map(link => ({ name: link.label, url: link.url }))}
          />
        ) : null
      )}
      
      {/* Section des liens Seligmann pour Brown Baby */}
      {isBrownBaby && (
        <SeligmannLinksSection seligmannLinks={brownBabySeligmannLinks} />
      )}
    </>
  );
};
