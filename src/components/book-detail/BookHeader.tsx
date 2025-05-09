
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
  
  return (
    <>
      <div className="mb-6 mt-0">
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#ea384c] transition-colors group">
          <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Retour aux livres
        </Link>
      </div>
      
      <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {displayTitle?.toUpperCase()}
      </h1>
      
      <div className="mb-10 mt-6">
        {/* Using the same styling for editorial text as Brown Baby page */}
        <p className="text-[#ea384c] text-lg md:text-xl mb-1" dangerouslySetInnerHTML={{ __html: editorialText }}>
        </p>
        
        {showISBN && isbn && (
          <p className="text-[#ea384c] text-lg md:text-xl">
            ISBN : {isbn}
          </p>
        )}
      </div>
    </>
  );
};
