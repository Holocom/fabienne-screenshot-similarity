
import React from 'react';

interface BookDescriptionProps {
  description: string | null;
}

export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({ description }) => {
  if (!description) return <p>Aucune description disponible pour ce livre.</p>;
  
  // Séparer le texte en paragraphes (double saut de ligne)
  const paragraphs = description.split('\n\n');
  
  return (
    <div className="description mb-8">
      {paragraphs.map((paragraph, index) => {
        // Pour le cas où il y aurait des sauts de ligne simples dans un paragraphe
        const formattedParagraph = paragraph
          // Remplacer les sauts de ligne simples par des balises <br />
          .replace(/\n/g, '<br />')
          // Appliquer les mises en forme spécifiques comme "Brown Baby" en italique
          .replace(/Brown Baby/g, '<em>Brown Baby</em>');
        
        return (
          <p 
            key={index} 
            className="mb-4 text-base md:text-lg leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        );
      })}
    </div>
  );
};
