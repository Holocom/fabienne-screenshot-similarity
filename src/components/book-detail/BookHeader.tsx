
import React from 'react';
interface BookHeaderProps {
  title: string;
  editorialText: string;
  showISBN: boolean;
  isbn?: string;
}
export const BookHeader: React.FC<BookHeaderProps> = ({
  title,
  editorialText,
  showISBN,
  isbn
}) => {
  // Add hyphen to PÈRE-NOËL if it's in the title
  let displayTitle = title;
  if (title?.toLowerCase().includes("pere") && title?.toLowerCase().includes("noel")) {
    displayTitle = title.replace(/PERE[\s]?NOEL/i, "PÈRE-NOËL");
  }
  
  // Cas spécial pour Edgar, le chat souris
  const isEdgarChatSouris = title === "EDGAR, LE CHAT SOURIS" || title === "Edgar, le chat souris";
  
  return <>
      <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {displayTitle?.toUpperCase()}
      </h1>
      
      <div className="mb-10 mt-2">
        {/* Using red color for editorial text */}
        <p className="text-[#ea384c] text-lg md:text-xl mb-1" dangerouslySetInnerHTML={{
          __html: editorialText
        }} />
        
        {/* Pour Edgar, le chat souris, afficher l'éditeur sur une ligne séparée */}
        {isEdgarChatSouris && (
          <p className="text-[#ea384c] text-lg md:text-xl mb-1">
            Éditions Orphie – 48 pages
          </p>
        )}
        
        {/* S'assurer que l'ISBN s'affiche correctement */}
        {(showISBN || isEdgarChatSouris) && isbn && (
          <p className="text-[#ea384c] text-lg md:text-xl font-medium">
            ISBN : {isbn}
          </p>
        )}
      </div>
    </>;
};
