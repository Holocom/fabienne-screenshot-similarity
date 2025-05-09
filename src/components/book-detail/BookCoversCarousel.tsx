
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
    <div className={cn("relative h-auto w-auto overflow-hidden rounded-md", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="h-auto w-auto object-contain max-h-[350px]"
      />
    </div>
  );
};

interface BookCoversCarouselProps {
  bookTitle: string;
  showCovers?: boolean;
  bookDetails?: {
    editorialText: string;
    isbn?: string;
  };
}

export const BookCoversCarousel: React.FC<BookCoversCarouselProps> = ({ 
  bookTitle, 
  showCovers = false,
  bookDetails
}) => {
  // Uniquement montrer pour "Brown Baby"
  if (!showCovers || bookTitle !== "Brown Baby") {
    return null;
  }

  return (
    <div className="my-6 w-full">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5">
              <BookCover 
                src="/lovable-uploads/b0c162d3-58ba-40a7-842d-f0082b0b094f.png" 
                alt="Couverture du livre Brown Baby" 
                className="w-auto"
              />
            </div>
            <div className="w-full md:w-3/5 flex flex-col justify-center">
              <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 mb-6">
                {bookTitle?.toUpperCase()}
              </h1>
              
              {bookDetails && (
                <div className="mt-2">
                  <p className="text-[#ea384c] text-lg md:text-xl mb-1" dangerouslySetInnerHTML={{ __html: bookDetails.editorialText }}>
                  </p>
                  
                  {bookDetails.isbn && (
                    <p className="text-[#ea384c] text-lg md:text-xl">
                      EAN : {bookDetails.isbn}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
