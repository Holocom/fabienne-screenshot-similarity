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
  // Détecter si c'est "UN FLAMBOYANT PÈRE-NOËL"
  const isFlamboyantNoel = 
    book?.title === "UN FLAMBOYANT PÈRE-NOËL" ||
    book?.title === "Un Flamboyant Père-Noël" ||
    book?.id === "b733fd7b-1bc8-4e37-bc19-94f0a445311d";
    
  // Détecter si c'est "MA CUISINE MARMAILLE"
  const isMaCuisineMarmaille = 
    book?.title === "MA CUISINE MARMAILLE" ||
    book?.title === "Ma Cuisine Marmaille" ||
    book?.id === "31bd8bad-b180-4f39-bc59-a40b3e367975";

  // Détecter si c'est "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS"
  const isJacquelineDalais = 
    book?.title === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS" ||
    book?.id === "e6586dd6-2fd3-4426-b491-cee425a863c2";
    
  // Détecter si c'est "SAVEURS METISSÉES D'AYMERIC PATAUD"
  const isSaveursMetissees = 
    book?.title === "SAVEURS METISSÉES D'AYMERIC PATAUD" ||
    book?.id === "3e02b6d4-3476-421f-802b-c9e2252cb553";

  // Détecter si c'est "LES COUPS DE CŒUR DE BRIGITTE GRONDIN"
  const isCoupsDeCoeurBrigitte = 
    book?.title === "LES COUPS DE CŒUR DE BRIGITTE GRONDIN" ||
    book?.id === "ef2cb58b-988f-46e4-a5c8-4e133db97185";
    
  // Détecter si c'est "DU BONHEUR DANS VOTRE ASSIETTE"
  const isDuBonheurAssiette = 
    book?.title === "DU BONHEUR DANS VOTRE ASSIETTE" ||
    book?.id === "fc38c7c0-27d3-43fe-80a0-1e7e43f7ec43";
    
  // Détecter si c'est "MA CUISINE BIEN-ÊTRE"
  const isCuisineBienEtre = 
    book?.title === "MA CUISINE BIEN-ÊTRE" ||
    book?.id === "8525480b-e8cd-4149-b427-16672a5f55b4";
    
  // Détecter si c'est "MANIFESTE POUR LA LECTURE"
  const isManifestePourLaLecture = 
    book?.title === "MANIFESTE POUR LA LECTURE - LES AUTEURS FRANCOPHONES CÉLÈBRENT LE LIVRE" ||
    book?.title === "MANIFESTE POUR LA LECTURE" ||
    book?.id === "dacd7eab-7fab-408e-88b0-21ef99efff5b";
    
  // Détecter si c'est "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES"
  const isPetitesHistoiresMusiques = 
    book?.title === "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES" ||
    book?.id === "b9b54f90-a190-49b3-a215-992362b1cc6a";

  // Détecter si c'est "CASES CRÉOLES DE LA RÉUNION"
  const isCasesCréolesReunion = 
    book?.title === "CASES CRÉOLES DE LA RÉUNION" || 
    book?.id === "abe5d8a2-77bb-42b0-8c3e-250a9551c9ea";
  
  // Détecter si c'est "LE PONT DE LA RIVIERE DE L'EST"
  const isPontRiviereEst = 
    book?.title === "LE PONT DE LA RIVIERE DE L'EST" ||
    book?.id === "1c0b1991-3455-4727-bc72-7a605c2ef62f";
  
  // Détecter si c'est "SEMADER, 30 REGARDS SUR LES 30 ANS"
  const isSemader30Regards = 
    book?.title === "SEMADER, 30 REGARDS SUR LES 30 ANS" ||
    book?.id === "c5896f91-0f7c-431c-9752-00ff7fb803c1";
  
  // Détecter si c'est "LE GRAND HAZIER, UN DOMAINE CREOLE"
  const isGrandHazier = 
    book?.title === "LE GRAND HAZIER, UN DOMAINE CREOLE" ||
    book?.id === "b17468a7-1e30-4f25-8e85-c6c1a1fcf3b1";
    
  // Détecter si c'est "SOCIÉTÉ ADRIEN BELLIER"
  const isSocieteAdrienBellier = 
    book?.title === "SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)" ||
    book?.id === "a557a8b4-5d62-4ec7-be9b-301ed5b50369";
    
  // Détecter si c'est "LA REUNION, L'ILE AUX OUVRAGES"
  const isLaReunionIleOuvrages = 
    book?.title === "LA REUNION, L'ILE AUX OUVRAGES" ||
    book?.id === "a63d08f5-49ff-4220-9a70-9627fcbe7643";
  
  // Obtenir les détails éditoriaux en passant également l'ID du livre
  const { editorialText, isbn } = getBookEditorialDetails({ 
    bookTitle: book.title, 
    bookDetails,
    bookId: book.id // Pass the book ID explicitly
  });
  
  // Récupérer la catégorie du livre à partir du book object
  const categorySlug = book.category_id ? book.category_id : undefined;
  
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
  
  // Définir les awards spécifiques pour UN FLAMBOYANT PÈRE-NOËL (basés sur l'image 2)
  const flamboyantNoelAwards = [
    { name: "Prix Afrilivres 2020", url: null },
    { name: "Prix Jeanne de Cavally 2022", url: null },
    { name: "Finaliste du Prix Vanille Illustration 2020", url: null }
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
    
  // Special case for "TU ME FAIS TOURNER LA TERRE" - version créole
  const isTuMeFaisTournerCreole = 
    book?.title === "TU ME FAIS TOURNER LA TERRE\nOU I FÉ TOURNE MON TERRE" ||
    book?.id === "451338a8-2537-454d-a990-00dbc0988370";
    
  // Special case for "TU ME FAIS TOURNER LA TERRE" - version anglaise  
  const isTuMeFaisTournerAnglais = 
    book?.title === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" ||
    (book?.title?.includes("TU ME FAIS TOURNER") && !book?.title?.includes("OU I FÉ TOURNE MON TERRE"));
  
  // Log pour débogage si c'est "SOCIÉTÉ ADRIEN BELLIER"
  if (isSocieteAdrienBellier) {
    console.log(`Content détecté SOCIÉTÉ ADRIEN BELLIER avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}"`);
  }
  
  // Log pour débogage si c'est "LE GRAND HAZIER, UN DOMAINE CREOLE"
  if (isGrandHazier) {
    console.log(`Content détecté LE GRAND HAZIER, UN DOMAINE CREOLE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}"`);
  }
  
  else if (isPetitesHistoiresMusiques) {
    console.log(`Content détecté PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}"`);
  }
  else if (isLaReunionDesReligions) {
    console.log(`Content détecté La Réunion des religions avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est Les religions à l'ile Maurice
  if (isLesReligionsIleMaurice) {
    console.log(`Content détecté Les religions à l'ile Maurice avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }

  // Log pour débogage si c'est LA RÉUNION DES ENFANTS
  if (isLaReunionDesEnfants) {
    console.log(`Content détecté LA RÉUNION DES ENFANTS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est LE PETIT GARÇON QUI NE SOURIAIT JAMAIS
  if (isPetitGarcon) {
    console.log(`Content détecté LE PETIT GARÇON QUI NE SOURIAIT JAMAIS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est TU ME FAIS TOURNER LA TERRE (créole)
  if (isTuMeFaisTournerCreole) {
    console.log(`Content détecté TU ME FAIS TOURNER LA TERRE (créole) avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est TU ME FAIS TOURNER LA TERRE (anglais)
  if (isTuMeFaisTournerAnglais) {
    console.log(`Content détecté TU ME FAIS TOURNER LA TERRE (anglais) avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est MA CUISINE MARMAILLE
  if (isMaCuisineMarmaille) {
    console.log(`Content détecté MA CUISINE MARMAILLE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}"`);
  }

  // Log pour débogage si c'est LA CLÉ DES SAVEURS DE JACQUELINE DALAIS
  if (isJacquelineDalais) {
    console.log(`Content détecté LA CLÉ DES SAVEURS DE JACQUELINE DALAIS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}"`);
  }
  
  // Log pour débogage si c'est SAVEURS METISSÉES D'AYMERIC PATAUD
  if (isSaveursMetissees) {
    console.log(`Content détecté SAVEURS METISSÉES D'AYMERIC PATAUD avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}"`);
  }
  
  // Log pour débogage si c'est LES COUPS DE CŒUR DE BRIGITTE GRONDIN
  if (isCoupsDeCoeurBrigitte) {
    console.log(`Content détecté LES COUPS DE CŒUR DE BRIGITTE GRONDIN avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est DU BONHEUR DANS VOTRE ASSIETTE
  if (isDuBonheurAssiette) {
    console.log(`Content détecté DU BONHEUR DANS VOTRE ASSIETTE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est MANIFESTE POUR LA LECTURE
  if (isManifestePourLaLecture) {
    console.log(`Content détecté MANIFESTE POUR LA LECTURE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
  // Log pour débogage si c'est SEMADER, 30 REGARDS SUR LES 30 ANS
  if (isSemader30Regards) {
    console.log(`Content détecté SEMADER, 30 REGARDS SUR LES 30 ANS avec ID: ${book?.id}`);
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
  
  // Liens spécifiques pour JACE. MAGIK GOUZOU
  const jaceMagikGouzouLinks = [
    { url: "https://streep.re/rencontre-avec-jace/", label: "Streep - Rencontre avec Jace" },
    { url: "https://actualite.com/le-chevalier-des-temps-modernes", label: "Actualité - Le chevalier des temps modernes" },
    { url: "https://actualite.com/extraits-du-livre", label: "Actualité - Extraits du livre" },
    { url: "https://www.imazpress.com/actualites/magik-gouzou-court-au-fil-des-pages", label: "Imazpress - Magik Gouzou court au fil des pages" }
  ];
  
  // Vérifier si c'est JACE. MAGIK GOUZOU
  const isJaceMagikGouzou = book?.title === "JACE. MAGIK GOUZOU";
  
  // Add specific check for Z'OISEAUX RARES and other books that need ISBN display
  const shouldShowISBN = book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || 
    book?.title === "AS-TU LA LANGUE BIEN PENDUE ?" || 
    (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) ||
    isFlamboyantNoel ||
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
    isTuMeFaisTournerCreole ||
    isTuMeFaisTournerAnglais ||
    isMaCuisineMarmaille ||
    isJacquelineDalais ||
    isSaveursMetissees ||
    isCoupsDeCoeurBrigitte ||
    isDuBonheurAssiette ||
    isManifestePourLaLecture ||
    isPetitesHistoiresMusiques ||
    isCasesCréolesReunion &&
    // Suppression des livres qui n'affichent pas l'ISBN
    !isGrandHazier && 
    !isPontRiviereEst && 
    !isSemader30Regards && 
    !isSocieteAdrienBellier &&
    !isLaReunionIleOuvrages;
  
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
            categorySlug={categorySlug} // Passer la catégorie
          />
        </div>
      )}
      
      {/* Description du livre */}
      <BookDescriptionSection description={book?.description || ""} bookTitle={book.title} />
      
      {/* Section des éditions - Passer le titre du livre */}
      {uniqueEditions.length > 0 && 
       !isBrownBaby && (
        <EditionsSection 
          editions={uniqueEditions} 
          bookTitle={book.title} // Passer le titre du livre pour conditionnement
        />
      )}
      
      {/* Section des liens de presse - Afficher les liens spécifiques pour différents livres */}
      {isJaceMagikGouzou ? (
        <PressLinksSection 
          pressLinks={jaceMagikGouzouLinks.map(link => ({ 
            id: '', 
            book_id: book.id, 
            url: link.url, 
            label: link.label, 
            created_at: '' 
          }))} 
          bookTitle={book.title} 
        />
      ) : isEdgarChatSouris ? (
        <PressLinksSection 
          pressLinks={edgarChatSourisLinks.map(link => ({ 
            id: '', 
            book_id: book.id, 
            url: link.url, 
            label: link.label, 
            created_at: '' 
          }))} 
          bookTitle={book.title} 
        />
      ) : (
        <PressLinksSection pressLinks={uniquePressLinks} bookTitle={book.title} />
      )}
      
      {/* Section des liens de blog pour Brown Baby */}
      {isBrownBaby && <BlogLinksSection blogLinks={brownBabyBlogLinks} />}
      
      {/* Section Prix et distinctions : conditionnée pour UN FLAMBOYANT PÈRE-NOËL */}
      {isFlamboyantNoel ? (
        <div className="my-6">
          <h3 className="text-xl font-bold mb-2 text-primary-blue uppercase">PRIX ET DISTINCTIONS</h3>
          <ul className="space-y-1 list-none pl-0">
            {flamboyantNoelAwards.map((award, index) => (
              <li key={`flamboyant-award-${index}`} className="text-primary-blue mb-1">
                {award.name}
              </li>
            ))}
          </ul>
        </div>
      ) : isEdgarChatSouris ? (
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
