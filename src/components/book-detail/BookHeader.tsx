import React from 'react';
interface BookHeaderProps {
  title: string;
  editorialText: string;
  showISBN: boolean;
  isbn?: string;
  categorySlug?: string;
}
export const BookHeader: React.FC<BookHeaderProps> = ({
  title,
  editorialText,
  showISBN,
  isbn,
  categorySlug
}) => {
  // Add hyphen to PÈRE-NOËL if it's in the title
  let displayTitle = title;
  if (title?.toLowerCase().includes("pere") && title?.toLowerCase().includes("noel")) {
    displayTitle = title.replace(/PERE[\s]?NOEL/i, "PÈRE-NOËL");
  }
  
  // Cas spéciaux pour l'affichage
  const isEdgarChatSouris = title === "EDGAR, LE CHAT SOURIS" || title === "Edgar, le chat souris";
  
  // Cas spécial pour DE LA PLANTE AU SUCRE - vérifier toutes les variantes possibles
  const isDePlanteSucre = 
    title === "DE LA PLANTE AU SUCRE, L'AVENTURE DE LA CANNE" ||
    title?.toLowerCase().includes("plante au sucre") ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("plante au sucre");
  
  // Cas spécial pour l'affichage
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
  
  // Cas spécial pour LA CLÉ DES SAVEURS DE JACQUELINE DALAIS
  const isJacquelineDalais = 
    title === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS" ||
    title?.toLowerCase().includes("jacqueline dalais") ||
    title?.toLowerCase().includes("cle des saveurs");

  // Cas spécial pour SAVEURS METISSÉES D'AYMERIC PATAUD
  const isSaveursMetissees = 
    title === "SAVEURS METISSÉES D'AYMERIC PATAUD" ||
    title?.toLowerCase().includes("saveurs metissees") ||
    title?.toLowerCase().includes("aymeric pataud");
    
  // Cas spécial pour DU BONHEUR DANS VOTRE ASSIETTE
  const isDuBonheurAssiette = 
    title === "DU BONHEUR DANS VOTRE ASSIETTE" || 
    title === "Du Bonheur dans votre assiette" ||
    title?.toLowerCase().includes("bonheur dans votre assiette");
    
  // Cas spécial pour MA CUISINE BIEN-ÊTRE
  const isCuisineBienEtre = 
    title === "MA CUISINE BIEN-ÊTRE" ||
    title?.toLowerCase().includes("cuisine bien-être") ||
    title?.toLowerCase().includes("cuisine bien etre");
    
  // Cas spécial pour MANIFESTE POUR LA LECTURE
  const isManifestePourLaLecture = 
    title === "MANIFESTE POUR LA LECTURE - LES AUTEURS FRANCOPHONES CÉLÈBRENT LE LIVRE" ||
    title === "MANIFESTE POUR LA LECTURE" ||
    title?.toLowerCase().includes("manifeste pour la lecture");
    
  // Cas spécial pour PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES
  const isPetitesHistoiresMusiques = 
    title === "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES" ||
    title?.toLowerCase().includes("petites histoires des musiques") ||
    title?.toLowerCase().includes("musiques réunionnaises");

  // Cas spécial pour CASES CRÉOLES DE LA RÉUNION
  const isCasesCréolesReunion = 
    title === "CASES CRÉOLES DE LA RÉUNION" ||
    title?.toLowerCase().includes("cases créoles") ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("cases creoles");
  
  // Cas spécial pour LE PONT DE LA RIVIERE DE L'EST
  const isPontRiviereEst = 
    title === "LE PONT DE LA RIVIERE DE L'EST" ||
    title?.toLowerCase().includes("pont de la riviere") ||
    title?.toLowerCase().includes("pont de la rivière");
    
  // Cas spécial pour SEMADER, 30 REGARDS SUR LES 30 ANS
  const isSemader30Regards =
    title === "SEMADER, 30 REGARDS SUR LES 30 ANS" ||
    title?.toLowerCase().includes("semader") && 
    title?.toLowerCase().includes("30 regards");
  
  // Cas spécial pour LE GRAND HAZIER, UN DOMAINE CREOLE
  const isGrandHazier = 
    title === "LE GRAND HAZIER, UN DOMAINE CREOLE" ||
    title?.toLowerCase().includes("grand hazier");
    
  // Cas spécial pour SOCIÉTÉ ADRIEN BELLIER
  const isSocieteAdrienBellier =
    title === "SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)" ||
    title?.toLowerCase().includes("société adrien bellier") ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("societe adrien bellier");
  
  // Cas spécial pour LA REUNION, L'ILE AUX OUVRAGES
  const isLaReunionIleOuvrages = 
    title === "LA REUNION, L'ILE AUX OUVRAGES" ||
    title?.toLowerCase().includes("reunion, l'ile aux ouvrages") ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("reunion, lile aux ouvrages");
  
  // Cas spécial pour ROUTE DES TAMARINS
  const isRouteDesTamarins = 
    title === "ROUTE DES TAMARINS, LA REUNION DES DEFIS" ||
    title?.toLowerCase().includes("route des tamarins") ||
    title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("route des tamarins");
    
  // Cas spécial pour VIVE LE CHANGEMENT D'AIR
  const isViveLeChangement = 
    title === "VIVE LE CHANGEMENT D'AIR" || 
    title === "VIVE LE CHANGEMENT D'AIR !" ||
    title?.toLowerCase().includes("vive le changement");
  
  // Cas spécial pour ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE
  const isEntreJardinEtCour = 
    title === "ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE" || 
    title?.toLowerCase().includes("entre jardin et cour") ||
    title?.toLowerCase().includes("architecture creole");
    
  // Vérifier si c'est un livre de la catégorie COMMANDE
  const isCommandeCategory = categorySlug === "commande";
  
  // Vérifier si le titre contient un saut de ligne
  const hasLineBreak = title?.includes('\n');
  
  // Déterminer si l'ISBN doit être affiché
  // Ne pas afficher pour certains livres spécifiques ni pour les livres de catégorie COMMANDE
  const shouldDisplayISBN = showISBN && isbn && 
    !isPontRiviereEst && 
    !isSemader30Regards && 
    !isGrandHazier && 
    !isSocieteAdrienBellier && 
    !isLaReunionIleOuvrages &&
    !isRouteDesTamarins &&
    !isDePlanteSucre &&
    !isEntreJardinEtCour &&
    !isCommandeCategory;
  
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
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949509
              </p>
            )}
          </>
        ) : isLaReunionDesReligions ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album / documentaire - illustré par Hélène Moreau - Océan Jeunesse - 2011 - 56 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782362470035
              </p>
            )}
          </>
        ) : isLesReligionsIleMaurice ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album / documentaire - illustré par Hélène Moreau - Vizavi - 2015 - 64 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9789990337945
              </p>
            )}
          </>
        ) : isLaReunionDesEnfants ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse – illustré par Marion Pradier - Océan Jeunesse – 2014 - 52 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN : 9782362470684
              </p>
            )}
          </>
        ) : isPetitGarcon ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse – illustré par Artem Kostyukevitch - Océan Jeunesse – 2009- 36 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782916533704
              </p>
            )}
          </>
        ) : isTuMeFaisTournerCreole ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse français / créole réunionnais - illustré par Modeste Madoré - Traduit par Laurence Daleau - Epsilon Éditions - 2015 - 28 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949745
              </p>
            )}
          </>
        ) : isTuMeFaisTournerAnglais ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Album jeunesse français / anglais - illustré par Modeste Madoré - Editions Vizavi - 2015 - 28 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9789990337938
              </p>
            )}
          </>
        ) : isMaCuisineMarmaille ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes de Brigitte Grondin - Illustrations de Caroline Grondin - Photographies de Pascale Béroujon - Epsilon Éditions – 4 Épices - 2016 – 160 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949721
              </p>
            )}
          </>
        ) : isJacquelineDalais ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes de Jacqueline Dalais - Éditions Vizavi – 2014 - 126 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9789990337860
              </p>
            )}
          </>
        ) : isSaveursMetissees ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes d'Aymeric Pataud – Photographies de Corinne Tellier - Epsilon Éditions – 4 Épices - 2e édition 2011 - 144 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949097
              </p>
            )}
          </>
        ) : isDuBonheurAssiette ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes de Brigitte Grondin - Photographies de Hervé Douris - Epsilon Éditions – 4 Épices - 5e édition 2007 – 184 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949219
              </p>
            )}
          </>
        ) : isCuisineBienEtre ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Recettes de Brigitte Grondin - Photographies de Pascale Béroujon - Epsilon Éditions – 4 Épices – 2010 – 144 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782912949332
              </p>
            )}
          </>
        ) : isManifestePourLaLecture ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Ananda Devi – Véronique Tadjo – Nassuf Djailani – Jennifer Richard – Michèle Rakotoson – Blaise Ndala – Gaël Octavia – Watson Charles – Gaëlle Belem – Kenza Sefrioui – Johary Ravaloson – Fabienne Jonca – Shenaz Patel – Griotte – Amarnath Hosany – Véronique Massenot. Atelier Des Nomades – 2023 – 96 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782919300686
              </p>
            )}
          </>
        ) : isRouteDesTamarins ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Beau livre – Conçu avec l'aide de Jean-Louis Cariou – Photographies Hervé Douris et René Carayol - Océan Éditions – 2009 – 256 pages
            </p>
            {/* ISBN supprimé pour ROUTE DES TAMARINS */}
          </>
        ) : isLaReunionIleOuvrages ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Ouvrage technique - Photographies crédits multiples - Conception graphique Olivier Bard - 4 Épices – 2e édition 2020 – 60 pages.
            </p>
            {/* ISBN supprimé pour LA REUNION, L'ILE AUX OUVRAGES */}
          </>
        ) : isGrandHazier ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Beau livre - Co-écrit avec Bernard Leveneur – Photographies (hors archives) de François-Louis Athénas - Conception graphique Olivier Bard - 4 Épices – 2013 – 96 pages
            </p>
            {/* ISBN supprimé pour LE GRAND HAZIER, UN DOMAINE CREOLE */}
          </>
        ) : isSocieteAdrienBellier ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Beau livre - Co-écrit avec Bernard Leveneur – Photographies (hors archives) de Romain Philippon - Conception graphique Olivier Bard - 4 Épices – 2012 – 120 pages
            </p>
            {/* ISBN supprimé pour SOCIÉTÉ ADRIEN BELLIER */}
          </>
        ) : isDePlanteSucre ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Agenda historique - Co-écrit avec Bernard Leveneur Océan Éditions – 2012 – 144 pages
            </p>
            {/* ISBN supprimé pour DE LA PLANTE AU SUCRE */}
          </>
        ) : isEntreJardinEtCour ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Agenda historique - Co-écrit avec Bernard Leveneur Océan Éditions — 2005 — 144 pages
            </p>
            {/* ISBN supprimé pour ENTRE JARDIN ET COUR */}
          </>
        ) : isCasesCréolesReunion ? (
          <>
            <p className="text-[#ea384c] text-lg md:text-xl mb-1">
              Bernard Leveneur – Fabienne Jonca – Nicolas Peyrebonne – Patrick Hoarau - Collection PREC (Patrimoine, Réunion, Éducation, Culture) – Canopé Éditions – 2011 – 48 pages
            </p>
            {!isCommandeCategory && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN 9782845579078
              </p>
            )}
          </>
        ) : (
          <>
            {/* Using red color for editorial text */}
            <p className="text-[#ea384c] text-lg md:text-xl mb-1" dangerouslySetInnerHTML={{
              __html: editorialText
            }} />
            
            {/* S'assurer que l'ISBN s'affiche correctement seulement si nécessaire */}
            {shouldDisplayISBN && (
              <p className="text-[#ea384c] text-lg md:text-xl font-medium">
                ISBN : {isbn}
              </p>
            )}
          </>
        )}
      </div>
    </>;
};
