
import React from 'react';

interface BookDescriptionSectionProps {
  description: string;
  bookTitle?: string;
  isViveLeChangementAir?: boolean; // Nouveau paramètre pour VIVE LE CHANGEMENT D'AIR
}

export const BookDescriptionSection: React.FC<BookDescriptionSectionProps> = ({ 
  description,
  bookTitle,
  isViveLeChangementAir
}) => {
  // Description spéciale pour "VIVE LE CHANGEMENT D'AIR"
  if (isViveLeChangementAir) {
    return (
      <div className="my-6">
        <h3 className="text-xl font-bold mb-2 text-[#1A1F2C] uppercase">DESCRIPTION</h3>
        <div className="text-[#403E43] text-lg leading-relaxed mt-2 whitespace-pre-line">
          <p>
            De 1998 à 2023, l'agenda d'histoire de La Réunion a connu des tirages records. Chaque année, 
            pendant plus de 25 ans, son éditeur a invité des auteurs locaux à travailler sur un thème.
            L'édition 
            2010 était consacrée aux pratiques du changement d'air qui se sont développées à partir du XIXe 
            siècle dans l'île. D'Hell Bourg à Cilaos en passant par l'Étang-Salé ou St-Gilles-les-Bains, ce tourisme 
            intérieur a connu un essor important à une époque où sortir de l'île n'était pas chose simple. 
            Réservé à une élite, cette pratique a toutefois permis le développement d'une première économie 
            touristique, d'une architecture singulière... et très vite de la photographie souvenir. Toutes ces 
            images constituent aujourd'hui un patrimoine inestimable, car elles ont permis d'immortaliser les 
            grands paysages et surtout la vie quotidienne des Réunionnais.
          </p>
        </div>
      </div>
    );
  }

  // Description par défaut pour les autres livres
  if (!description) {
    return null;
  }
  
  // Pour les livres avec description, mais qui ne sont pas VIVE LE CHANGEMENT D'AIR
  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-2 text-[#1A1F2C] uppercase">DESCRIPTION</h3>
      <div className="text-[#403E43] text-lg leading-relaxed mt-2 whitespace-pre-line">
        {description}
      </div>
    </div>
  );
};
