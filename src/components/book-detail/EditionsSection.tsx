
import React from 'react';
import { Edition } from '@/integrations/supabase/schema';

interface EditionsSectionProps {
  editions: Edition[];
  bookTitle?: string; // Ajout du titre du livre comme prop
}

export const EditionsSection: React.FC<EditionsSectionProps> = ({ editions, bookTitle }) => {
  // Si pas d'éditions ou si le titre est JACE. MAGIK GOUZOU, ne rien afficher
  if (editions.length === 0 || bookTitle === "JACE. MAGIK GOUZOU") return null;

  // Group editions into two columns
  const halfLength = Math.ceil(editions.length / 2);
  const leftColumn = editions.slice(0, halfLength);
  const rightColumn = editions.slice(halfLength);

  return (
    <div>
      <h3 className="editions-title">ÉDITIONS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Left column */}
        <div>
          {leftColumn.map((edition, index) => (
            <p key={`edition-left-${index}`} className="text-[#F97316] mb-2">
              {edition.name}
            </p>
          ))}
        </div>
        
        {/* Right column */}
        <div>
          {rightColumn.map((edition, index) => (
            <p key={`edition-right-${index}`} className="text-[#F97316] mb-2">
              {edition.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
