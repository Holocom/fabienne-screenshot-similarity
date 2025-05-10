
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
  // Obtenir les détails éditoriaux en passant également l'ID du livre
  const { editorialText, isbn } = getBookEditorialDetails({ 
    bookTitle: book.title, 
    bookDetails,
    bookId: book.id // Pass the book ID explicitly
  });
  
  // Filtrer les liens de presse pour éliminer les doublons
  const uniquePressLinks = Array.from(new Map(
    pressLinks.map(link => [link.url, link])
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
  
  // Vérifier si Brown Baby a besoin d'un traitement spécial
  const isBrownBaby = book?.title === "Brown Baby";

  // Special case for "EDGAR, LE CHAT SOURIS"
  const isEdgarChatSouris = book?.title === "EDGAR, LE CHAT SOURIS" || book?.title === "Edgar, le chat souris";
  
  // Special case for "La Réunion des religions" - condition élargie
  const isLaReunionDesReligions = 
    book?.title === "La Réunion des religions" || 
    book?.title === "LA RÉUNION DES RELIGIONS" ||
    book?.title === "La Reunion des religions" ||
    book?.id === "0569acb0-8946-4f62-acce-881604d3146a";
  
  // Special case for "Les religions à l'ile Maurice"
  const isLesReligionsIleMaurice = 
    book?.title === "Les religions à l'ile Maurice" || 
    book?.title === "Les religions à l'île Maurice" ||
    book?.id === "23b62768-3770-4621-8c5e-9a705891bb93";

  // Special case for "LA RÉUNION DES ENFANTS"
  const isLaReunionDesEnfants =
    book?.title === "LA RÉUNION DES ENFANTS" ||
    book?.title === "La Réunion des enfants" ||
    book?.id === "c88b5c00-3543-46a1-9996-d82e2c260849";
    
  // Special case for "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS"
  const isPetitGarcon = 
    book?.title === "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS" ||
    book?.id === "3133c2f1-3422-4afd-8e6f-fce3e0ed910c";
    
  // Special case for "TU ME FAIS TOURNER LA TERRE"
  const isTuMeFaisTourner = 
    book?.title === "TU ME FAIS TOURNER LA TERRE" ||
    book?.title === "Tu me fais tourner la terre" ||
    book?.title?.includes("TU ME FAIS TOURNER") ||
    book?.title?.includes("YOU MAKE MY WORLD SPIN") ||
    book?.id === "451338a8-2537-454d-a990-00dbc0988370";
  
  // Log pour débogage si c'est La Réunion des religions
  if (isLaReunionDesReligions) {
    console.log(`Content détecté La Réunion des religions avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est Les religions à l'ile Maurice
  if (isLesReligionsIleMaurice) {
    console.log(`Content détecté Les religions à l'ile Maurice avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }

  // Log pour débogage si c'est La Réunion des enfants
  if (isLaReunionDesEnfants) {
    console.log(`Content détecté LA RÉUNION DES ENFANTS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est LE PETIT GARÇON QUI NE SOURIAIT JAMAIS
  if (isPetitGarcon) {
    console.log(`Content détecté LE PETIT GARÇON QUI NE SOURIAIT JAMAIS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est TU ME FAIS TOURNER LA TERRE
  if (isTuMeFaisTourner) {
    console.log(`Content détecté TU ME FAIS TOURNER LA TERRE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
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
    isLaReunionDesReligions ||
    isLesReligionsIleMaurice ||
    isLaReunionDesEnfants ||
    isPetitGarcon ||
    isTuMeFaisTourner;
  
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
      
      {/* Section des éditions */}
      {uniqueEditions.length > 0 && 
       !isBrownBaby && (
        <EditionsSection editions={uniqueEditions} />
      )}
      
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
