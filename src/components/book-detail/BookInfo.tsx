import React from 'react';
import { BookDetail } from '@/integrations/supabase/schema';

export interface BookInfoProps {
  title: string;
  author: string;
  description: string;
  category: string;
  details?: BookDetail | null;
}

const BookInfo = ({ title, author, description, category, details }: BookInfoProps) => {
  const editorialText = `${details?.publisher || "Non spécifié"} – illustré par ${details?.illustrator || "Non spécifié"} – ${details?.year || "2024"} – ${details?.pages || "0"} pages`;

  const renderDescription = () => {
    if (!description) return <p>Aucune description disponible pour ce livre.</p>;
    const paragraphs = description.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 whitespace-pre-line">
        {paragraph}
      </p>
    ));
  };

  return (
    <div>
      <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {title?.toUpperCase()}
      </h1>
      
      <div className="mb-10 mt-6">
        <p className="editorial-info mb-0">
          {editorialText}
          {details?.isbn && (
            <span className="block mt-0">
              ISBN : {details?.isbn}
            </span>
          )}
        </p>
      </div>
      
      <div className="description">
        {renderDescription()}
      </div>
    </div>
  );
};

export default BookInfo;
