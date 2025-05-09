
import React from 'react';

interface BookDescriptionProps {
  description: string | null;
}

export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({ description }) => {
  if (!description) return <p>Aucune description disponible pour ce livre.</p>;
  
  // Format the description to display "Brown Baby" in italics
  const paragraphs = description.split('\n\n');
  return (
    <div className="description">
      {paragraphs.map((paragraph, index) => {
        // Add italics to "Brown Baby" in the text
        const formattedParagraph = paragraph.replace(/Brown Baby/g, '<em>Brown Baby</em>');
        
        return (
          <p 
            key={index} 
            className="mb-4 whitespace-pre-line" 
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        );
      })}
    </div>
  );
};
