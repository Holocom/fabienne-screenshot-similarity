
import React from 'react';

interface BookDescriptionProps {
  description: string | null;
}

export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({ description }) => {
  if (!description) return <p>Aucune description disponible pour ce livre.</p>;
  
  // Format the description to display names in italics as needed
  const paragraphs = description.split('\n\n');
  return (
    <div className="description mb-8">
      {paragraphs.map((paragraph, index) => {
        // Add italics to specific words in the text
        let formattedParagraph = paragraph;
        
        // Handle different books with specific formatting
        if (description.includes("Vollard")) {
          // For Ambroise Vollard book, apply italics to all instances of "Vollard"
          formattedParagraph = formattedParagraph.replace(/\bVollard\b/g, '<em>Vollard</em>');
        } else if (description.includes("Brown Baby")) {
          // Keep existing formatting for Brown Baby
          formattedParagraph = formattedParagraph.replace(/Brown Baby/g, '<em>Brown Baby</em>');
        }
        
        // Add space after period before "Quelle" if needed
        formattedParagraph = formattedParagraph.replace(/étincelant\.Quelle/g, 'étincelant. Quelle');
        
        return (
          <p 
            key={index} 
            className="mb-4 whitespace-pre-line text-base md:text-lg leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        );
      })}
    </div>
  );
};
