
import React from 'react';

interface BookCoverImageProps {
  bookTitle: string;
  defaultCover: string;
}

export const getBookCoverImage = ({ bookTitle, defaultCover }: BookCoverImageProps): string => {
  if (bookTitle === "Brown Baby") {
    return "/lovable-uploads/b0c162d3-58ba-40a7-842d-f0082b0b094f.png";
  }
  
  if (bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël")) {
    return "/lovable-uploads/fee9c5df-edcf-4ad2-9d9e-a8b6da17b84b.png";
  }
  
  if (bookTitle === "Ambroise Vollard, un don singulier") {
    return "/lovable-uploads/8531bfd5-fdcb-48af-98cf-95d85012bf9d.png";
  }
  
  if (bookTitle === "JACE. MAGIK GOUZOU") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/ART/jace-magik-gouzou.jpg";
  }
  
  if (bookTitle === "La Réunion des enfants") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/JEUNESSE/La%20Reunion%20des%20enfants%20copie.jpg";
  }
  
  // Ajout de la condition pour TU ME FAIS TOURNER LA TERRE
  if (bookTitle === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" || 
      bookTitle === "TU ME FAIS TOURNER LA TERRE" || 
      bookTitle?.includes("TU ME FAIS TOURNER")) {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/JEUNESSE/tu-me-fais-tourner-la-Terre-you-make-my-world-spin.png";
  }
  
  return defaultCover;
};
