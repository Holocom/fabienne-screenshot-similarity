
import React from 'react';
import { Award } from '@/integrations/supabase/schema';

interface AwardsSectionProps {
  awards: Award[];
  bookTitle: string;
  isCustom?: boolean;
  customAwards?: Array<{
    name: string;
    url: string | null;
  }>;
  combineWithDistinctions?: boolean; // Nouvelle propriété pour indiquer que des distinctions suivent
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  awards,
  bookTitle,
  isCustom = false,
  customAwards = [],
  combineWithDistinctions = false
}) => {
  // Brown Baby specific awards
  const brownBabyAwards = [{
    name: "Prix Vanille œuvre de fiction 2024",
    url: null
  }, {
    name: "Prix Seligmann du livre contre le racisme 2024",
    url: null
  }, {
    name: "Sélection Prix Maryse Condé 2024",
    url: null
  }, {
    name: "Sélection Prix Senghor du premier roman 2024",
    url: null
  }, {
    name: "Sélection Prix Verdelettres 2025",
    url: null
  }, {
    name: "Coup de cœur Takam Tikou (2024)",
    url: null
  }];

  // Determine which awards to display
  const displayAwards = isCustom ? customAwards : bookTitle === "Brown Baby" ? brownBabyAwards : awards;

  // Éliminer les doublons basés sur le nom uniquement
  const uniqueAwardsMap = new Map();
  
  // Fonction pour normaliser les noms de prix (enlever les espaces, mettre en minuscules)
  const normalizeAwardName = (name: string) => {
    // Pour "UN FLAMBOYANT PÈRE-NOËL", on normalise les noms spécifiques pour éliminer les doublons
    if (bookTitle.includes("FLAMBOYANT") && bookTitle.includes("NOËL")) {
      // Enlever l'année entre parenthèses et normaliser
      return name.replace(/\s*\(\d+\)\s*$/, '').toLowerCase().trim();
    }
    // Pour les autres livres, juste normaliser
    return name.trim().toLowerCase();
  };
  
  displayAwards.forEach(award => {
    if (award && award.name) {
      // Utiliser le nom normalisé comme clé
      const normalizedName = normalizeAwardName(award.name);
      uniqueAwardsMap.set(normalizedName, award);
    }
  });
  
  const uniqueAwards = Array.from(uniqueAwardsMap.values());
  
  if (uniqueAwards.length === 0 && !combineWithDistinctions) return null;
  
  return <div className="my-6 text-primary-blue">
      <h3 className="text-xl font-bold mb-2 text-primary-blue uppercase">PRIX ET DISTINCTIONS</h3>
      <ul className="space-y-1 list-none pl-0">
        {uniqueAwards.map((award, index) => <li key={`award-${index}`} className="text-primary-blue mb-1">
            {award.name}{!isCustom && 'year' in award && award.year ? ` (${award.year})` : ''}
          </li>)}
      </ul>
    </div>;
};
