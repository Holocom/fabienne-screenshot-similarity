
import React from 'react';
import Image from 'react-bootstrap/Image';
import { Book } from '@/integrations/supabase/schema';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BookHeaderProps {
  book: Book;
  bookId?: string;
  detailsData?: {
    publisher?: string;
    illustrator?: string;
    year?: string;
    pages?: string;
    isbn?: string;
  };
}

export const BookHeader: React.FC<BookHeaderProps> = ({ 
  book, 
  bookId,
  detailsData 
}) => {
  const {
    title,
    cover_image_url,
  } = book;
  
  const renderPublisherInfo = () => {
    // Vérifie si c'est "La Réunion des religions"
    if (bookId === "0569acb0-8946-4f62-acce-881604d3146a") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Jeunesse – illustré par Moniri M'Baé – Ed. 4 Épices – 2021 – 48 pages</p>;
    }
    
    // Vérifier si c'est "Les religions à l'île Maurice"
    if (bookId === "23b62768-3770-4621-8c5e-9a705891bb93") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Documentaire – illustré par Moniri M'Baé – Ed. Vizavi – 2015 – 48 pages</p>;
    }
    
    // Vérifier si c'est "TU ME FAIS TOURNER LA TERRE" version créole
    if (bookId === "451338a8-2537-454d-a990-00dbc0988370") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Album illustré bilingue français et créole – illustré par Adeline Hubert – Atelier des nomades – 2019 – 24 pages</p>;
    }
    
    // Vérifier si c'est "UN FLAMBOYANT PÈRE-NOËL"
    if (bookId === "b733fd7b-1bc8-4e37-bc19-94f0a445311d") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Jeunesse – illustré par Iloë – Atelier des nomades – 2020 – 24 pages</p>;
    }
    
    // Pour Edgar le chat souris
    if (bookId === "59a9689a-3484-4977-b0bf-4026e3438ab9") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Jeunesse – illustré par Nancy Ribard – Éditions Orphie – 2013 – 48 pages</p>;
    }
    
    // Pour LA CLÉ DES SAVEURS DE JACQUELINE DALAIS
    if (bookId === "e6586dd6-2fd3-4426-b491-cee425a863c2") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Cuisine – Recettes de Jacqueline Dalais – Photographies de Clency Ivon – Éditions Vizavi – 2014 – 126 pages</p>;
    }
    
    // Pour SAVEURS METISSÉES D'AYMERIC PATAUD
    if (bookId === "3e02b6d4-3476-421f-802b-c9e2252cb553") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Cuisine – Recettes d'Aymeric Pataud – Photographies de Valérie Koch – Epsilon Éditions – 4 Épices – 2011 – 144 pages</p>;
    }
    
    // Pour LES COUPS DE CŒUR DE BRIGITTE GRONDIN
    if (bookId === "ef2cb58b-988f-46e4-a5c8-4e133db97185") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Cuisine – Recettes de Brigitte Grondin – Photographies de Valérie Koch – Epsilon Éditions – 4 Épices – 2012 – 96 pages</p>;
    }
    
    // Pour MA CUISINE BIEN-ÊTRE
    if (bookId === "cec5f8c9-9a6c-4269-895a-fd3c2a139bd9") {
      return <p className="text-[#ea384c] text-lg md:text-xl mb-1">Recettes de Brigitte Grondin - Photographies de Pascale Béroujon - Epsilon Éditions – 4 Épices – 2010 – 144 pages</p>;
    }
    
    // Format par défaut
    return (
      <p className="text-[#ea384c] text-lg md:text-xl mb-1">
        {detailsData?.publisher && 
          `${detailsData.publisher}${detailsData.year ? ` – ${detailsData.year}` : ''}${detailsData.pages ? ` – ${detailsData.pages} pages` : ''}`
        }
      </p>
    );
  };
  
  const hasMultilineTitle = title && title.includes('\n');
  
  // Retravailler les URLs des images de couverture
  const sanitizedCoverUrl = cover_image_url 
    ? cover_image_url
      .replace('localhost:9000', 'media.lovable.dev') 
      .replace('localhost:54321', 'media.lovable.dev')
    : null;
  
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
      <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
        <AspectRatio ratio={3/4} className="bg-muted overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          {sanitizedCoverUrl ? (
            <img
              src={sanitizedCoverUrl}
              alt={`Couverture du livre ${title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              Aucune couverture disponible
            </div>
          )}
        </AspectRatio>
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${hasMultilineTitle ? 'whitespace-pre-line' : ''}`}>
            {title}
          </h1>
          {renderPublisherInfo()}
        </div>
      </div>
    </div>
  );
};
