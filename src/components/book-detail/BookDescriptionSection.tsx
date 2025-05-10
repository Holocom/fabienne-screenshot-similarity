
import React from 'react';

interface BookDescriptionProps {
  description: string | null;
  bookTitle?: string;
}

export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({ description, bookTitle }) => {
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
          .replace(/Brown Baby/g, '<em>Brown Baby</em>')
          // Mettre en évidence certains mots pour Z'OISEAUX RARES
          .replace(/"ma ma"/g, '<strong>"ma ma"</strong>')
          .replace(/"mu mu"/g, '<strong>"mu mu"</strong>')
          .replace(/"gueu gueu"/g, '<strong>"gueu gueu"</strong>')
          .replace(/"ga ga"/g, '<strong>"ga ga"</strong>')
          .replace(/"papa"/g, '<strong>"papa"</strong>')
          .replace(/"doudou"/g, '<strong>"doudou"</strong>')
          .replace(/"joujou"/g, '<strong>"joujou"</strong>')
          // Gérer les doubles guillemets français qui peuvent venir du copier-coller
          .replace(/""/g, '"');
        
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
