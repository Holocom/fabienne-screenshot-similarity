
import React from 'react';

interface DistinctionsSectionProps {
  distinctions: Array<{ name: string, year?: string | null }>;
  bookTitle: string;
  isCustom?: boolean;
  customDistinctions?: Array<{ name: string, url: string | null }>;
  hideTitle?: boolean;
  className?: string;
  combineWithAwards?: boolean;
}

export const DistinctionsSection: React.FC<DistinctionsSectionProps> = ({ 
  distinctions, 
  bookTitle, 
  isCustom = false,
  customDistinctions = [],
  hideTitle = false,
  className = '',
  combineWithAwards = false
}) => {
  // Determine which distinctions to display
  const displayDistinctions = isCustom ? customDistinctions : distinctions;
  
  // Éliminer les doublons basés sur le nom uniquement
  const uniqueDistinctionsMap = new Map();
  displayDistinctions.forEach(distinction => {
    if (distinction && distinction.name) {
      uniqueDistinctionsMap.set(distinction.name, distinction);
    }
  });
  
  const uniqueDistinctions = Array.from(uniqueDistinctionsMap.values());
  
  if (uniqueDistinctions.length === 0 && !combineWithAwards) return null;

  return (
    <div className={`my-6 text-primary-blue ${className}`}>
      {!hideTitle && !combineWithAwards && (
        <h3 className="text-xl font-bold mb-2 text-primary-blue uppercase">DISTINCTIONS</h3>
      )}
      {uniqueDistinctions.length > 0 && (
        <ul className="space-y-1 list-none pl-0">
          {uniqueDistinctions.map((distinction, index) => (
            <li key={`distinction-${index}`} className="text-primary-blue mb-1">
              {distinction.name}{!isCustom && 'year' in distinction && distinction.year ? ` (${distinction.year})` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
