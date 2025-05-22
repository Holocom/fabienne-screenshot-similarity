
import React from "react";

interface BookCoverProps {
  src: string | null;
  alt: string;
  bookId: string;
  bookTitle: string;
  onError: (bookId: string, bookTitle: string, coverUrl: string | null) => string;
  coverErrors: Record<string, boolean>;
}

const formatImageUrl = (url: string | null, bookId: string, bookTitle: string, coverErrors: Record<string, boolean>) => {
  if (!url || coverErrors[bookId]) return "/placeholder.svg";
  
  if (bookTitle === "LE PONT DE LA RIVIERE DE L'EST") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/COUV%202%20PRE.jpg";
  }
  if (bookTitle === "Ambroise Vollard, un don singulier") {
    return "/lovable-uploads/8531bfd5-fdcb-48af-98cf-95d85012bf9d.png";
  }
  if (
    bookTitle === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" ||
    bookTitle === "TU ME FAIS TOURNER LA TERRE" ||
    bookTitle?.includes("TU ME FAIS TOURNER")
  ) {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/JEUNESSE/tu-me-fais-tourner-la-Terre-you-make-my-world-spin.png";
  }
  if (url.includes("supabase.co/storage/v1/object/public")) {
    return url;
  }
  if (bookTitle === "CASES CRÉOLES DE LA RÉUNION") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/cases-creoles-reunion.jpg";
  }
  if (bookTitle === "MANIFESTE POUR LA LECTURE - Les auteurs francophones célèbrent le livre") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/manifeste-lecture-600x902.jpg";
  }
  if (bookTitle === "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COLLECTIFS/petites-histoires-musiques-reunion.jpg";
  }
  if (bookTitle === "VIVE LE CHANGEMENT D'AIR !") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/vive-le-changement-d-air.jpg";
  }
  if (bookTitle === "ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/entre-jardin-et-cour.jpg";
  }
  if (bookTitle === "LA REUNION, L'ILE AUX OUVRAGES") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/la-reunion-ile-aux-ouvrages.jpg";
  }
  if (bookTitle === "ROUTE DES TAMARINS, LA REUNION DES DEFIS") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/route-des-tamarins.jpg";
  }
  if (bookTitle === "DE LA PLANTE AU SUCRE, L'AVENTURE DE LA CANNE") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/de-la-plante-au-sucre.jpg";
  }
  if (bookTitle === "SEMADER, 30 REGARDS SUR LES 30 ANS") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/semader-30-regards.jpg";
  }
  if (bookTitle === "LE GRAND HAZIER, UN DOMAINE CREOLE") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/grand-hazier.jpg";
  }
  if (bookTitle === "SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/COMMANDES/societe-adrien-bellier.jpg";
  }
  if (bookTitle === "Brown Baby") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/brown-baby.jpg";
  }
  if (bookTitle === "MA CUISINE MARMAILLE") {
    return "https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/CUISINES/ma-cuisine-marmailles-620x788.jpg";
  }
  if (bookTitle === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS") {
    return "/placeholder.svg";
  }
  if (bookTitle === "SAVEURS METISSÉES D'AYMERIC PATAUD") {
    return "/placeholder.svg";
  }
  if (bookTitle === "LES COUPS DE CŒUR DE BRIGITTE GRONDIN") {
    return "/placeholder.svg";
  }
  if (bookTitle === "MA CUISINE BIEN-ÊTRE") {
    return "/placeholder.svg";
  }
  if (bookTitle === "DU BONHEUR DANS VOTRE ASSIETTE") {
    return "/placeholder.svg";
  }
  if (url.startsWith("public/")) {
    return url.replace("public/", "/");
  }
  return url;
};

export const BookCover: React.FC<BookCoverProps> = ({
  src,
  alt,
  bookId,
  bookTitle,
  onError,
  coverErrors,
}) => {
  return (
    <img
      src={formatImageUrl(src, bookId, bookTitle, coverErrors)}
      alt={alt}
      className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-105"
      loading="lazy"
      onError={e => {
        (e.target as HTMLImageElement).src = onError(bookId, bookTitle, src);
      }}
    />
  );
};
