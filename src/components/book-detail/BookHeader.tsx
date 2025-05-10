
import React from 'react';

interface BookHeaderProps {
  title: string;
  editorialText: string;
  showISBN?: boolean;
  isbn?: string;
}

export const BookHeader: React.FC<BookHeaderProps> = ({ 
  title, 
  editorialText, 
  showISBN = false,
  isbn
}) => {
  return (
    <div className="w-full mb-6">
      <h1 className="text-3xl font-bold mb-2 uppercase text-primary-blue">{title}</h1>
      <p className="text-red-500 font-medium">{editorialText}</p>
      {showISBN && isbn && (
        <p className="text-red-500 font-medium mt-1">ISBN {isbn}</p>
      )}
    </div>
  );
};
