
import React from 'react';
import { BookDetail } from '@/integrations/supabase/schema';

interface BookDetailsProps {
  bookTitle: string;
  bookDetails: any;
  bookId?: string; // Add bookId as an optional parameter
}

export const getBookEditorialDetails = ({ bookTitle, bookDetails, bookId }: BookDetailsProps): { editorialText: string; isbn: string } => {
  console.log(`Récupération des détails éditoriaux pour "${bookTitle}" avec ID: ${bookId || 'non défini'}`);
  
  // Update the editorial text information specifically for this book
  let editorialText = '';
  let isbn = '';
  
  // Normaliser le titre pour une comparaison plus fiable (enlever les accents, tout en minuscules)
  const normalizedTitle = bookTitle?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  console.log(`Titre normalisé pour la comparaison: "${normalizedTitle}"`);
  
  // Special case for Brown Baby
  if (bookTitle === "Brown Baby") {
    editorialText = "Roman - Atelier des Nomades - 2024 - 264 pages";
    isbn = "9782919300716";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } 
  // Specific case for Ambroise Vollard
  else if (bookTitle === "Ambroise Vollard, un don singulier" || bookTitle === "AMBROISE VOLLARD, UN DON SINGULIER") {
    editorialText = `Beau-livre. Co-écrit avec Bernard Leveneur – Ed. 4 Épices – 2017 – 216 pages`;
    isbn = "9782952720496";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } 
  // Specific case for "UN FLAMBOYANT PÈRE-NOËL"
  else if (bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël")) {
    editorialText = `Album jeunesse – illustré par Iloë – Atelier des nomades – 2020 – 24 pages`;
    isbn = "9782919300297";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } else if (bookTitle.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
    editorialText = `Jeux d'expressions - illustré par Audrey Caron - Océan Jeunesse –2025 – 48 pages`;
    isbn = "9782916533520";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } else if (bookTitle === "JACE. MAGIK GOUZOU") {
    editorialText = `Beau-livre - Alternatives-Gallimard - 2017 - 240 pages`;
    isbn = "9782072726590";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } else if (bookTitle === "EXPRESSIONS MÉLANZÉ" || bookTitle === "Expressions Mélanzé" || bookTitle === "Expressions Melanze") {
    editorialText = `Jeux d'expressions - illustré par Flo Vandermeersch - Ed. 4 Épices - 2024 - 44 pages`;
    isbn = "9782956127741";
    console.log(`ISBN défini pour ${bookTitle}: ${isbn}`);
  } else if (bookTitle === "Z'OISEAUX RARES" || bookTitle === "Z'oiseaux rares" || bookTitle === "ZOISEAUX RARES" || bookTitle.toLowerCase() === "zoiseaux rares") {
    editorialText = `Album sonore - illustré par Julie Bernard - Zébulo Éditions - 2019 - 20 pages`;
    isbn = "9791096163069";
    console.log(`ISBN défini pour Z'OISEAUX RARES: ${isbn}`);
  } else if (bookTitle === "EDGAR, LE CHAT SOURIS" || bookTitle === "Edgar, le chat souris") {
    // Format spécifique pour Edgar, le chat souris
    editorialText = `Album jeunesse – illustré par Nancy Ribard – 2013`;
    isbn = "9782912949509";
    console.log(`ISBN défini pour EDGAR, LE CHAT SOURIS: ${isbn}`);
  } 
  // Cas spécial pour La Réunion des religions - condition très élargie pour s'assurer de capturer toutes les variantes
  else if (bookTitle === "La Réunion des religions" || 
           bookTitle === "LA RÉUNION DES RELIGIONS" || 
           bookTitle === "La Reunion des religions" ||
           normalizedTitle === "la reunion des religions" ||
           bookTitle.includes("union des religion") ||
           bookTitle === "La Réunion des Religions" ||
           bookId === "0569acb0-8946-4f62-acce-881604d3146a") {
    // Format exact pour La Réunion des religions selon l'image fournie
    editorialText = `Album / documentaire - illustré par Hélène Moreau - Océan Jeunesse - 2011 - 56 pages`;
    isbn = "9782362470035";
    console.log(`ISBN défini explicitement pour La Réunion des religions: ${isbn}`);
    // Force log pour débogage
    console.log(`FORÇAGE des détails pour La Réunion des religions: {editorialText: "${editorialText}", isbn: "${isbn}"}`);
  }
  // Add special case for Les religions à l'ile Maurice - UPDATED with new information
  else if (bookTitle === "Les religions à l'ile Maurice" || 
           bookTitle === "Les religions à l'île Maurice" || 
           normalizedTitle?.includes("religions") && normalizedTitle?.includes("maurice") ||
           bookId === "23b62768-3770-4621-8c5e-9a705891bb93") {
    // Updated information based on the first image
    editorialText = `Album / documentaire - illustré par Hélène Moreau - Vizavi - 2015 - 64 pages`;
    isbn = "9789990337945";
    console.log(`ISBN défini pour Les religions à l'ile Maurice (mis à jour): ${isbn}`);
  }
  // Cas spécial pour LA RÉUNION DES ENFANTS
  else if (bookTitle === "LA RÉUNION DES ENFANTS" || 
           bookTitle === "La Réunion des enfants" ||
           normalizedTitle === "la reunion des enfants" ||
           bookId === "c88b5c00-3543-46a1-9996-d82e2c260849") {
    editorialText = `Album jeunesse – illustré par Marion Pradier - Océan Jeunesse – 2014 - 52 pages`;
    isbn = "9782362470684";
    console.log(`ISBN défini pour LA RÉUNION DES ENFANTS: ${isbn}`);
  }
  // Cas spécial pour LE PETIT GARÇON QUI NE SOURIAIT JAMAIS
  else if (bookTitle === "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS" || 
           normalizedTitle === "le petit garcon qui ne souriait jamais" ||
           bookId === "3133c2f1-3422-4afd-8e6f-fce3e0ed910c") {
    editorialText = `Album jeunesse – illustré par Artem Kostyukevitch - Océan Jeunesse – 2009- 36 pages`;
    isbn = "9782916533704";
    console.log(`ISBN défini pour LE PETIT GARÇON QUI NE SOURIAIT JAMAIS: ${isbn}`);
  }
  // Cas spécial mis à jour pour TU ME FAIS TOURNER LA TERRE
  else if (bookTitle === "TU ME FAIS TOURNER LA TERRE" ||
           bookTitle === "Tu me fais tourner la terre" ||
           bookTitle === "TU ME FAIS TOURNER LA TERRE\nOU I FÉ TOURNE MON TERRE" ||
           bookTitle === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" ||
           normalizedTitle?.includes("tu me fais tourner") ||
           bookId === "451338a8-2537-454d-a990-00dbc0988370") {
    // Mise à jour selon l'image 1 fournie
    editorialText = `Album jeunesse français / créole réunionnais - illustré par Modeste Madoré - Traduit par Laurence Daleau - Epsilon Éditions - 2015 - 28 pages`;
    isbn = "9782912949745";
    console.log(`ISBN mis à jour pour TU ME FAIS TOURNER LA TERRE: ${isbn}`);
  }
  else {
    // Format standard pour les autres livres
    let price = '';
    if (bookDetails?.price) {
      price = ` - ${bookDetails.price}€`;
    }
    
    editorialText = `${bookDetails?.categories?.name || "Jeunesse"} – illustré par ${bookDetails?.illustrator || "Non spécifié"} – ${bookDetails?.publisher || "Non spécifié"} – ${bookDetails?.year || "2024"} – ${bookDetails?.pages || "0"} pages${price}`;
    
    // Récupérer l'ISBN à partir des détails du livre si disponible
    if (bookDetails?.isbn) {
      isbn = bookDetails.isbn;
      console.log(`ISBN récupéré des détails du livre pour ${bookTitle}: ${isbn}`);
    }
  }

  console.log(`Détails éditoriaux pour "${bookTitle}":`, { editorialText, isbn });
  return { editorialText, isbn };
};
