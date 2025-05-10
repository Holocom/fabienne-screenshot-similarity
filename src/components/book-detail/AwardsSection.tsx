
import React from 'react';
import { Award } from '@/integrations/supabase/schema';

interface AwardsSectionProps {
  awards: Award[];
  bookTitle: string;
  isCustom?: boolean;
  customAwards?: Array<{ name: string, url: string | null }>;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ 
  awards, 
  bookTitle, 
  isCustom = false,
  customAwards = []
}) => {
  // Brown Baby specific awards
  const brownBabyAwards = [
    { name: "Prix Vanille œuvre de fiction 2024", url: null },
    { name: "Prix Seligmann du livre contre le racisme 2024", url: null },
    { name: "Sélection Prix Maryse Condé 2024", url: null },
    { name: "Sélection Prix Senghor du premier roman 2024", url: null },
    { name: "Sélection Prix Verdelettres 2025", url: null },
    { name: "Coup de cœur Takam Tikou", url: null }
  ];
  
  // Determine which awards to display
  const displayAwards = isCustom ? customAwards : 
                        bookTitle === "Brown Baby" ? brownBabyAwards : 
                        awards;
  
  if (displayAwards.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-2">PRIX ET RÉCOMPENSES</h3>
      <ul className="space-y-1 list-none pl-0">
        {displayAwards.map((award, index) => (
          <li key={`award-${index}`} className="text-gray-700 mb-1">
            {award.name}{!isCustom && 'year' in award && award.year ? ` (${award.year})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};
