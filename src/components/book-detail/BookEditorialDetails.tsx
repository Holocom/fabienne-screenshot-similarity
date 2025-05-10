
import React from 'react';
import { BookDetail } from '@/integrations/supabase/schema';

interface BookDetailsProps {
  bookTitle: string;
  bookDetails: any;
}

export const getBookEditorialDetails = ({ bookTitle, bookDetails }: BookDetailsProps): { editorialText: string; isbn: string } => {
  // Update the editorial text information specifically for this book
  let editorialText = '';
  let isbn = '';
  
  // Special case for Brown Baby
  if (bookTitle === "Brown Baby") {
    editorialText = "Roman - Atelier des Nomades - 2024 - 264 pages";
    isbn = "9782919300716";
  } 
  // Specific case for Ambroise Vollard
  else if (bookTitle === "Ambroise Vollard, un don singulier" || bookTitle === "AMBROISE VOLLARD, UN DON SINGULIER") {
    editorialText = `Beau-livre. Co-écrit avec Bernard Leveneur – Ed. 4 Épices – 2017 – 216 pages`;
    isbn = "9782952720496";
  } 
  // Specific case for "UN FLAMBOYANT PÈRE-NOËL"
  else if (bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël")) {
    editorialText = `Album jeunesse – illustré par Iloë – Atelier des nomades – 2020 – 24 pages`;
    isbn = "9782919300297";
  } else if (bookTitle.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
    editorialText = `Jeux d'expressions - illustré par Audrey Caron - Océan Jeunesse –2025 – 48 pages`;
    isbn = "9782916533520";
  } else if (bookTitle === "JACE. MAGIK GOUZOU") {
    editorialText = `Beau-livre - Alternatives-Gallimard - 2017 - 240 pages`;
    isbn = "9782072726590";
  } else if (bookTitle === "EXPRESSIONS MÉLANZÉ" || bookTitle === "Expressions Mélanzé" || bookTitle === "Expressions Melanze") {
    editorialText = `Jeux d'expressions - illustré par Flo Vandermeersch - Ed. 4 Épices - 2024 - 44 pages`;
    isbn = "9782956127741";
  } else if (bookTitle === "Z'OISEAUX RARES" || bookTitle === "Z'oiseaux rares" || bookTitle === "ZOISEAUX RARES") {
    editorialText = `Album sonore - illustré par Julie Bernard - Zébulo Éditions - 2019 - 20 pages`;
    isbn = "9791096163069";
  } else {
    // Format standard pour les autres livres
    editorialText = `${bookDetails?.categories?.name || "Jeunesse"} – illustré par ${bookDetails.illustrator || "Non spécifié"} – ${bookDetails.publisher || "Non spécifié"} – ${bookDetails.year || "2024"} – ${bookDetails.pages || "0"} pages`;
  }

  return { editorialText, isbn };
};
