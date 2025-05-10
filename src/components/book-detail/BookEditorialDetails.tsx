
import React from 'react';
import { BookDetail } from '@/integrations/supabase/schema';

interface BookDetailsProps {
  bookTitle: string;
  bookDetails: any;
}

export const getBookEditorialDetails = ({ bookTitle, bookDetails }: BookDetailsProps): { editorialText: string; isbn: string } => {
  console.log(`Récupération des détails éditoriaux pour "${bookTitle}"`);
  
  // Update the editorial text information specifically for this book
  let editorialText = '';
  let isbn = '';
  
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
  } else {
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
