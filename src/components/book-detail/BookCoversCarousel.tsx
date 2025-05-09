
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface BookCoverProps {
  src: string;
  alt: string;
  className?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ src, alt, className }) => {
  return (
    <div className={cn("relative h-48 md:h-64 w-auto overflow-hidden rounded-md", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="h-full w-auto object-contain mx-auto"
      />
    </div>
  );
};

interface BookCoversCarouselProps {
  bookTitle: string;
  showCovers?: boolean;
}

export const BookCoversCarousel: React.FC<BookCoversCarouselProps> = ({ 
  bookTitle, 
  showCovers = false 
}) => {
  // Uniquement montrer pour "Brown Baby"
  if (!showCovers || bookTitle !== "Brown Baby") {
    return null;
  }

  return (
    <div className="my-6 w-full">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 justify-start">
            <BookCover 
              src="/lovable-uploads/b0c162d3-58ba-40a7-842d-f0082b0b094f.png" 
              alt="Couverture du livre Brown Baby" 
              className="w-36 md:w-48"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
