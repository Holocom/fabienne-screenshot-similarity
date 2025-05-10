
import React from 'react';
interface BookHeaderProps {
  title: string;
  editorialText: string;
  showISBN: boolean;
  isbn?: string;
}
export const BookHeader: React.FC<BookHeaderProps> = ({
  title,
  editorialText,
  showISBN,
  isbn
}) => {
  // Add hyphen to PÈRE-NOËL if it's in the title
  let displayTitle = title;
  if (title?.toLowerCase().includes("pere") && title?.toLowerCase().includes("noel")) {
    displayTitle = title.replace(/PERE[\s]?NOEL/i, "PÈRE-NOËL");
  }
  
  // Cas spéciaux pour l'affichage
  const isEdgarChatSouris = title === "EDGAR, LE CHAT SOURIS" || title === "Edgar, le chat souris";
  
  // Cas spécial pour La Réunion des religions - condition élargie pour capture toutes les variantes possibles
  const isLaReunionDesReligions = 
    title === "La Réunion des religions" || 
    title === "LA RÉUNION DES RELIGIONS" || 
    title === "La Reunion des religions" ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "la reunion des religions" ||
    title?.includes("union des religion") ||
    title === "La Réunion des Religions";
    
  // Cas spécial pour Les religions à l'ile Maurice
  const isLesReligionsIleMaurice = 
    title === "Les religions à l'ile Maurice" || 
    title === "Les religions à l'île Maurice" ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("religions") && 
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("maurice");
  
  // Cas spécial pour LA RÉUNION DES ENFANTS
  const isLaReunionDesEnfants =
    title === "LA RÉUNION DES ENFANTS" ||
    title === "La Réunion des enfants" ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "la reunion des enfants";
  
  // Cas spécial pour LE PETIT GARÇON QUI NE SOURIAIT JAMAIS
  const isPetitGarcon = 
    title === "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS" ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "le petit garcon qui ne souriait jamais";
    
  // Version créole réunionnais
  const isTuMeFaisTournerCreole = 
    title === "TU ME FAIS TOURNER LA TERRE\nOU I FÉ TOURNE MON TERRE" ||
    title?.includes("OU I FÉ TOURNE MON TERRE");
    
  // Version anglaise
  const isTuMeFaisTournerAnglais = 
    title === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" ||
    title === "TU ME FAIS TOURNER LA TERRE" ||
    title?.includes("YOU MAKE MY WORLD SPIN") ||
    (title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("tu me fais tourner") &&
      !title?.includes("OU I FÉ TOURNE MON TERRE"));
      
  // Cas spécial pour MA CUISINE MARMAILLE
  const isMaCuisineMarmaille = 
    title === "MA CUISINE MARMAILLE" ||
    title === "Ma Cuisine Marmaille" ||
    title?.toLowerCase().includes("cuisine marmaille");

  // Vérifier si le titre contient un saut de ligne
  const hasLineBreak = title?.includes('\n');
  
  return <>
      {hasLineBreak ? (
        // Si le titre contient un saut de ligne, diviser et afficher chaque ligne
        <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0">
          {title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>
      ) : (
        <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-wide uppercase max-w-full overflow-wrap-break-word text-balance mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {displayTitle?.toUpperCase()}
        </h1>
      )}
      
      <div className="mb-10 mt-2">
        {/* Pour Edgar, le chat souris, afficher le texte exactement comme dans l'image */}
        {isEdgarChatSouris ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse – illustré par Nancy Ribard – 2013
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9782912949509
            </p>
          </>
        ) : isLaReunionDesReligions ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album / documentaire - illustré par Hélène Moreau - Océan Jeunesse - 2011 - 56 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9782362470035
            </p>
          </>
        ) : isLesReligionsIleMaurice ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album / documentaire - illustré par Hélène Moreau - Vizavi - 2015 - 64 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9789990337945
            </p>
          </>
        ) : isLaReunionDesEnfants ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse – illustré par Marion Pradier - Océan Jeunesse – 2014 - 52 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN : 9782362470684
            </p>
          </>
        ) : isPetitGarcon ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse – illustré par Artem Kostyukevitch - Océan Jeunesse – 2009- 36 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9782916533704
            </p>
          </>
        ) : isTuMeFaisTournerCreole ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse français / créole réunionnais - illustré par Modeste Madoré - Traduit par Laurence Daleau - Epsilon Éditions - 2015 - 28 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9782912949745
            </p>
          </>
        ) : isTuMeFaisTournerAnglais ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse français / anglais - illustré par Modeste Madoré - Editions Vizavi - 2015 - 28 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9789990337938
            </p>
          </>
        ) : isMaCuisineMarmaille ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes de Brigitte Grondin - Illustrations de Caroline Grondin - Photographies de Pascale Béroujon - Epsilon Éditions – 4 Épices - 2016 – 160 pages
            </p>
            <p className="text-[#ea384c] text-lg md:text-xl font-medium">
              ISBN 9782912949721
            </p>
          </>
        ) : (
          <>
            {/* Using red color for editorial text */}
            <p className="text-[#ea384c] text-lg md:text-xl mb-1" dangerouslySetInnerHTML={{
              __html: editorialText
            }} />
            
            {/* S'assurer que l'ISBN s'affiche correctement */}
            {showISBN && isbn && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN : {isbn}
              </p>
            )}
          </>
        )}
      </div>
    </>;
};
