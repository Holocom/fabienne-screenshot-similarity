import React from 'react';

interface BookDescriptionProps {
  description: string | null;
  bookTitle: string;
}

export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({
  description,
  bookTitle
}) => {
  // Fonction pour afficher la description avec des sauts de ligne
  const renderDescription = (text: string) => {
    return text?.split('\n').map((paragraph, index) => (
      <p key={index} className="text-gray-700 text-base md:text-lg mb-4">
        {paragraph}
      </p>
    ));
  };
  
  // Détecter le titre du livre pour appliquer des cas spéciaux
  const isPetitesHistoiresMusiques = 
    bookTitle === "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES" ||
    bookTitle?.toLowerCase().includes("petites histoires des musiques");
    
  // Détecter si c'est "CASES CRÉOLES DE LA RÉUNION"
  const isCasesCréolesReunion = 
    bookTitle === "CASES CRÉOLES DE LA RÉUNION" ||
    bookTitle?.toLowerCase().includes("cases créoles") ||
    bookTitle?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("cases creoles");
    
  // Détecter si c'est "LA RÉUNION DES ENFANTS"
  const isLaReunionDesEnfants =
    bookTitle === "LA RÉUNION DES ENFANTS" ||
    bookTitle?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "la reunion des enfants";
    
  // Détecter si c'est "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS"
  const isPetitGarcon = 
    bookTitle === "LE PETIT GARÇON QUI NE SOURIAIT JAMAIS" ||
    bookTitle?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "le petit garcon qui ne souriait jamais";
    
  // Détecter si c'est "TU ME FAIS TOURNER LA TERRE" - version créole
  const isTuMeFaisTournerCreole = 
    bookTitle === "TU ME FAIS TOURNER LA TERRE\nOU I FÉ TOURNE MON TERRE" ||
    bookTitle?.includes("OU I FÉ TOURNE MON TERRE");
    
  // Détecter si c'est "TU ME FAIS TOURNER LA TERRE" - version anglaise  
  const isTuMeFaisTournerAnglais = 
    bookTitle === "TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN" ||
    (bookTitle?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("tu me fais tourner") &&
      !bookTitle?.includes("OU I FÉ TOURNE MON TERRE"));
      
  // Détecter si c'est "MA CUISINE MARMAILLE"
  const isMaCuisineMarmaille = 
    bookTitle === "MA CUISINE MARMAILLE" ||
    bookTitle?.toLowerCase().includes("cuisine marmaille");
  
  // Détecter si c'est "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS"
  const isJacquelineDalais = 
    bookTitle === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS" ||
    bookTitle?.toLowerCase().includes("jacqueline dalais") ||
    bookTitle?.toLowerCase().includes("cle des saveurs");

  // Détecter si c'est "SAVEURS METISSÉES D'AYMERIC PATAUD"
  const isSaveursMetissees = 
    bookTitle === "SAVEURS METISSÉES D'AYMERIC PATAUD" ||
    bookTitle?.toLowerCase().includes("saveurs metissees") ||
    bookTitle?.toLowerCase().includes("aymeric pataud");
    
  // Détecter si c'est "DU BONHEUR DANS VOTRE ASSIETTE"
  const isDuBonheurAssiette = 
    bookTitle === "DU BONHEUR DANS VOTRE ASSIETTE" || 
    bookTitle === "Du Bonheur dans votre assiette" ||
    bookTitle?.toLowerCase().includes("bonheur dans votre assiette");
    
  // Détecter si c'est "MANIFESTE POUR LA LECTURE"
  const isManifestePourLaLecture = 
    bookTitle === "MANIFESTE POUR LA LECTURE - LES AUTEURS FRANCOPHONES CÉLÈBRENT LE LIVRE" ||
    bookTitle === "MANIFESTE POUR LA LECTURE" ||
    bookTitle?.toLowerCase().includes("manifeste pour la lecture");
    
  // Détecter si c'est "UN FLAMBOYANT PÈRE-NOËL"
  const isFlamboyantNoel = 
    bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël");
  
  // Pour LE PONT DE LA RIVIERE DE L'EST
  const isPontRiviereEst = 
    bookTitle === "LE PONT DE LA RIVIERE DE L'EST" ||
    bookTitle?.toLowerCase().includes("pont de la riviere") ||
    bookTitle?.toLowerCase().includes("pont de la rivière");
  
  // Détecter si c'est "SEMADER, 30 REGARDS SUR LES 30 ANS"
  const isSemader30Regards = 
    bookTitle === "SEMADER, 30 REGARDS SUR LES 30 ANS" ||
    bookTitle?.toLowerCase().includes("semader") && 
    bookTitle?.toLowerCase().includes("30 regards");
  
  // Ajouter un cas spécial pour "VIVE LE CHANGEMENT D'AIR"
  const isViveLeChangement = 
    bookTitle === "VIVE LE CHANGEMENT D'AIR" || 
    bookTitle === "VIVE LE CHANGEMENT D'AIR !" ||
    bookTitle?.toLowerCase().includes("vive le changement");
  
  // Détecter si c'est "ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE"
  const isEntreJardinEtCour = 
    bookTitle === "ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE" || 
    bookTitle?.toLowerCase().includes("entre jardin et cour") ||
    bookTitle?.toLowerCase().includes("architecture creole");
    
  // Cas spéciaux pour chaque livre
  // Cas spéciaux pour chaque livre
  if (isPetitesHistoiresMusiques && description) {
    // Description spécifique pour Petites Histoires des Musiques Réunionnaises
    const petitesHistoiresDescription = `Cet ouvrage propose aux enfants de découvrir les instruments de musique traditionnels de La Réunion à travers des histoires amusantes et des illustrations colorées.`;
    return renderDescription(petitesHistoiresDescription);
  }
  
  // Pour LA RÉUNION DES ENFANTS, cas spécial avec formattage précis
  if (isLaReunionDesEnfants && description) {
    // Formatage spécifique pour La Réunion des Enfants avec la dernière phrase en italique
    if (description.includes("Un album pour découvrir La Réunion à travers les yeux des enfants.")) {
      const lastSentence = "Un album pour découvrir La Réunion à travers les yeux des enfants.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour LE PETIT GARÇON QUI NE SOURIAIT JAMAIS, cas spécial avec formattage précis
  if (isPetitGarcon && description) {
    // Formatage spécifique pour Le Petit Garçon qui ne souriait jamais avec la dernière phrase en italique
    if (description.includes("Une histoire touchante sur l'importance de l'amitié et du sourire.")) {
      const lastSentence = "Une histoire touchante sur l'importance de l'amitié et du sourire.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour TU ME FAIS TOURNER LA TERRE (créole), cas spécial avec formattage précis
  if (isTuMeFaisTournerCreole && description) {
    // Formatage spécifique pour Tu me fais tourner la terre (créole) avec la dernière phrase en italique
    if (description.includes("Une ode à l'amour et à la beauté du monde en français et en créole.")) {
      const lastSentence = "Une ode à l'amour et à la beauté du monde en français et en créole.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour TU ME FAIS TOURNER LA TERRE (anglais), cas spécial avec formattage précis
  if (isTuMeFaisTournerAnglais && description) {
    // Formatage spécifique pour Tu me fais tourner la terre (anglais) avec la dernière phrase en italique
    if (description.includes("A celebration of love and the world's beauty in French and English.")) {
      const lastSentence = "A celebration of love and the world's beauty in French and English.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour MA CUISINE MARMAILLE, cas spécial avec formattage précis
  if (isMaCuisineMarmaille && description) {
    // Formatage spécifique pour Ma Cuisine Marmaille avec la dernière phrase en italique
    if (description.includes("Des recettes simples et savoureuses pour les enfants.")) {
      const lastSentence = "Des recettes simples et savoureuses pour les enfants.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour LA CLÉ DES SAVEURS DE JACQUELINE DALAIS, cas spécial avec formattage précis
  if (isJacquelineDalais && description) {
    // Formatage spécifique pour La Clé des Saveurs de Jacqueline Dalais avec la dernière phrase en italique
    if (description.includes("Un voyage culinaire à travers les saveurs de La Réunion.")) {
      const lastSentence = "Un voyage culinaire à travers les saveurs de La Réunion.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour SAVEURS METISSÉES D'AYMERIC PATAUD, cas spécial avec formattage précis
  if (isSaveursMetissees && description) {
    // Formatage spécifique pour Saveurs Metissées d'Aymeric Pataud avec la dernière phrase en italique
    if (description.includes("Un mélange de saveurs créoles et métropolitaines.")) {
      const lastSentence = "Un mélange de saveurs créoles et métropolitaines.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour DU BONHEUR DANS VOTRE ASSIETTE, cas spécial avec formattage précis
  if (isDuBonheurAssiette && description) {
    // Formatage spécifique pour Du Bonheur dans votre Assiette avec la dernière phrase en italique
    if (description.includes("Des recettes simples et gourmandes pour tous les jours.")) {
      const lastSentence = "Des recettes simples et gourmandes pour tous les jours.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour MANIFESTE POUR LA LECTURE, cas spécial avec formattage précis
  if (isManifestePourLaLecture && description) {
    // Formatage spécifique pour Manifeste pour la Lecture avec la dernière phrase en italique
    if (description.includes("Une célébration de la lecture par des auteurs francophones.")) {
      const lastSentence = "Une célébration de la lecture par des auteurs francophones.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour UN FLAMBOYANT PÈRE-NOËL, cas spécial avec formattage précis
  if (isFlamboyantNoel && description) {
    // Formatage spécifique pour Un Flamboyant Père-Noël avec la dernière phrase en italique
    if (description.includes("Un conte de Noël créole pour les enfants.")) {
      const lastSentence = "Un conte de Noël créole pour les enfants.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour LE PONT DE LA RIVIERE DE L'EST, cas spécial avec formattage précis
  if (isPontRiviereEst && description) {
    // Description spécifique avec saut de paragraphe respecté comme dans l'image
    const firstParagraph = "Classé Monument historique en 2018, le pont suspendu de la rivière de l'Est est l'une des merveilles architecturales les plus emblématiques de l'île de La Réunion, mais aussi une merveille d'ingénierie. Ce livre richement illustré de photographies de Sébastien Marchal, retrace l'histoire de ce lieu unique, mais aussi l'impressionnant chantier de sa restauration à l'état originel.";
    
    const secondParagraph = "Restaurer un tel ouvrage n'a pas été une chose facile même avec les moyens actuels. On peut donc s'imaginer que dans le contexte de l'époque, les équipes ont dû relever de nombreux défis et faire des prouesses pour s'affranchir des pentes abruptes et de la rivière tumultueuse.";
    
    // Description avec paragraphes séparés
    const pontDescription = `${firstParagraph}\n\n${secondParagraph}`;
    
    return renderDescription(pontDescription);
  }
  
  // Pour CASES CRÉOLES DE LA RÉUNION, cas spécial avec formatage précis
  if (isCasesCréolesReunion && description) {
    // Formatage spécifique pour Cases Créoles avec la dernière phrase en italique
    if (description.includes("Première partie sur L'histoire des cases de La Réunion co-écrite avec Bernard Leveneur")) {
      const lastSentence = "Première partie sur L'histoire des cases de La Réunion co-écrite avec Bernard Leveneur.";
      const mainText = description.replace(lastSentence, "");
      
      // Description modifiée avec la dernière phrase en italique
      const modifiedDescription = `${mainText}\n\n<em>${lastSentence}</em>`;
      
      return renderDescription(modifiedDescription);
    }
    
    return renderDescription(description);
  }
  
  // Pour SEMADER, 30 REGARDS SUR LES 30 ANS, cas spécial avec formattage précis
  if (isSemader30Regards && description) {
    // Formatage spécifique pour le livre SEMADER
    const formattedDescription = description;
    return renderDescription(formattedDescription);
  }
  
  // Cas spécial pour VIVE LE CHANGEMENT D'AIR
  if (isViveLeChangement && description) {
    // Créer le texte avec saut de ligne explicite en HTML
    const formattedText = `De 1998 à 2023, l'agenda d'histoire de La Réunion a connu des tirages records. Chaque année, pendant plus de 25 ans, son éditeur a invité des auteurs locaux à travailler sur un thème.<br/><br/>L'édition 2010 était consacrée aux pratiques du changement d'air qui se sont développées à partir du XIXe siècle dans l'île. D'Hell Bourg à Cilaos en passant par l'Étang-Salé ou St-Gilles-les-Bains, ce tourisme intérieur a connu un essor important à une époque où sortir de l'île n'était pas chose simple. Réservé à une élite, cette pratique a toutefois permis le développement d'une première économie touristique, d'une architecture singulière... et très vite de la photographie souvenir. Toutes ces images constituent aujourd'hui un patrimoine inestimable, car elles ont permis d'immortaliser les grands paysages et surtout la vie quotidienne des Réunionnais.`;
    
    // Utiliser dangerouslySetInnerHTML pour interpréter les balises HTML
    return (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} className="text-gray-700 text-base md:text-lg space-y-4" />
    );
  }
  
  // Cas spécial pour ENTRE JARDIN ET COUR, L'ARCHITECTURE CREOLE
  if (isEntreJardinEtCour && description) {
    // Créer le texte avec saut de ligne explicite en HTML
    const formattedText = `De 1998 à 2023, l'agenda d'histoire de La Réunion a connu des tirages records. Chaque année, pendant plus de 25 ans, son éditeur a invité des auteurs locaux à travailler sur un thème. L'édition 2005 était consacrée à l'architecture créole. 55 textes pour donner à voir les mille et une facettes d'une architecture métissée à la croisée de diverses influences principalement importées d'Europe et d'Inde. De la paille au béton en passant par le bois et la pierre, de la varangue au lambrequin, de la petite case rurale au grand domaine via les belles citadines, cet itinéraire vous invite à découvrir l'un des aspects les plus visibles et les plus inconnus de notre histoire.`;
    
    // Utiliser dangerouslySetInnerHTML pour interpréter les balises HTML
    return (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} className="text-gray-700 text-base md:text-lg space-y-4" />
    );
  }
  
  // Cas par défaut: retourner la description telle quelle
  return renderDescription(description);
};
