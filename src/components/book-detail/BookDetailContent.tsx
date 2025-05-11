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
  // Détecter si c'est "VIVE LE CHANGEMENT D'AIR"
  const isViveLeChangementAir = 
    book?.title === "VIVE LE CHANGEMENT D'AIR" ||
    book?.id === "821f80df-f6fe-4c27-a82a-23c639cc1bf7";
  
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
    
  // Détecter si c'est "ROUTE DES TAMARINS"
  const isRouteDesTamarins = 
    book?.title === "ROUTE DES TAMARINS, LA REUNION DES DEFIS" ||
    book?.id === "5db0f368-4220-4ca4-97c7-883dab8c2559";
  
  // Détecter si c'est "DE LA PLANTE AU SUCRE"
  const isDePlanteSucre = 
    book?.title === "DE LA PLANTE AU SUCRE, L'AVENTURE DE LA CANNE" ||
    book?.id === "4458feae-b1cc-4a82-9798-377b7066ae49";
  
  // Obtenir les détails éditoriaux en passant également l'ID du livre
  const { editorialText, isbn } = getBookEditorialDetails({ 
    bookTitle: book.title, 
    bookDetails,
    bookId: book.id // Pass the book ID explicitly
  });
  
  // Log pour débogage si c'est "VIVE LE CHANGEMENT D'AIR"
  if (isViveLeChangementAir) {
    console.log(`Content détecté VIVE LE CHANGEMENT D'AIR avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
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
  
  // Log pour débogage si c'est DE LA PLANTE AU SUCRE
  if (isDePlanteSucre) {
    console.log(`Content détecté DE LA PLANTE AU SUCRE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  else if (isRouteDesTamarins) {
    console.log("Livre identifié comme 'ROUTE DES TAMARINS, LA REUNION DES DEFIS' par son ID");
  }
  
  // Log pour débogage si c'est SEMADER, 30 REGARDS SUR LES 30 ANS
  if (isSemader30Regards) {
    console.log(`Content détecté SEMADER, 30 REGARDS SUR LES 30 ANS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
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
  
  // Log pour débogage si c'est DE LA PLANTE AU SUCRE
  if (isDePlanteSucre) {
    console.log(`Content détecté DE LA PLANTE AU SUCRE avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  else if (isRouteDesTamarins) {
    console.log("Livre identifié comme 'ROUTE DES TAMARINS, LA REUNION DES DEFIS' par son ID");
  }
  
  // Log pour débogage si c'est SEMADER, 30 REGARDS SUR LES 30 ANS
  if (isSemader30Regards) {
    console.log(`Content détecté SEMADER, 30 REGARDS SUR LES 30 ANS avec ID: ${book?.id}`);
    console.log(`Titre: "${book?.title}", Éditorial: "${editorialText}", ISBN: "${isbn}"`);
  }
  
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
  if (isGrand
