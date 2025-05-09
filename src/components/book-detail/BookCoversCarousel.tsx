
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
  // Uniquement montrer pour "Un flamboyant père Noël"
  if (!showCovers || !bookTitle.toLowerCase().includes("flamboyant")) {
    return null;
  }

  return (
    <div className="my-6 w-full">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 justify-center">
            <BookCover 
              src="/lovable-uploads/fee9c5df-edcf-4ad2-9d9e-a8b6da17b84b.png" 
              alt="Édition anglaise - A Flamboyant Father Christmas" 
              className="w-36 md:w-48"
            />
            <BookCover 
              src="/lovable-uploads/588f8ba0-0133-4c38-a3e2-b7cb85397d17.png" 
              alt="Édition franco-malgache - Dadabe Noely midorehi-mena" 
              className="w-36 md:w-48"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
