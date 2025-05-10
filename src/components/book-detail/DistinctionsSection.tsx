
import React from 'react';

interface DistinctionsSectionProps {
  distinctions: Array<{ name: string, year?: string | null }>;
  bookTitle: string;
  isCustom?: boolean;
  customDistinctions?: Array<{ name: string, url: string | null }>;
}

export const DistinctionsSection: React.FC<DistinctionsSectionProps> = ({ 
  distinctions, 
  bookTitle, 
  isCustom = false,
  customDistinctions = []
}) => {
  // Determine which distinctions to display
  const displayDistinctions = isCustom ? customDistinctions : distinctions;
  
  if (displayDistinctions.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-2">DISTINCTIONS</h3>
      <ul className="space-y-1 list-none pl-0">
        {displayDistinctions.map((distinction, index) => (
          <li key={`distinction-${index}`} className="text-gray-700 mb-1">
            {distinction.name}{!isCustom && 'year' in distinction && distinction.year ? ` (${distinction.year})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};
