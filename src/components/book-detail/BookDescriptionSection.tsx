
import React from 'react';
interface BookDescriptionProps {
  description: string | null;
  bookTitle?: string;
}
export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({
  description,
  bookTitle
}) => {
  // Vérifier si c'est MANIFESTE POUR LA LECTURE
  const isManifestePourLaLecture = 
    bookTitle === "MANIFESTE POUR LA LECTURE - LES AUTEURS FRANCOPHONES CÉLÈBRENT LE LIVRE" ||
    bookTitle === "MANIFESTE POUR LA LECTURE" ||
    bookTitle?.toLowerCase().includes("manifeste pour la lecture");
  
  if (isManifestePourLaLecture) {
    // Nous n'utilisons plus une description codée en dur, mais formatons la description de la base de données
    const manifesteDescription = description || 
      "Ce manifeste est destiné à ceux qui dévorent les livres, qui les picorent, qui ne lisent plus, aux enseignants, aux parents, aux jeunes. Il rassemble les témoignages, récits et histoires, de seize auteurs francophones, des îles de l'océan Indien, des Caraïbes, d'Afrique, d'Amérique du Nord et d'Europe. Ils confient leurs souvenirs d'enfance comme Nassuf Djailani qui se remémore depuis Mayotte « ce garçon du fond de la classe qui avait des mots plein le ventre et qui avait tant de mal à les sortir ». Ils font part de leurs rencontres comme Kenza Sefrioui qui, admirative, raconte cet homme de soixante-dix ans qui a tant remué les montagnes du Maroc pour faire lire les enfants de son village. Ces auteurs confient avec générosité, leurs expériences, le secret des mots et leur rapport intime au livre et à la lecture. Pour Jennifer Richard, le livre est « un port d'attache qui tient dans la poche » ; pour Ananda Devi, les livres sont des « compagnons de notre voyage de vie » ; pour Véronique Tadjo, « sans livres, le monde serait clos », et, pour Fabienne Jonca, lire, « c'est s'ouvrir aux autres et à soi-même être soi ».";
    
    // Mise en forme spéciale avec formatage de paragraphes - tout en noir
    const paragraphs = manifesteDescription.split(/\n\n|\n/);
    
    return (
      <div className="description mb-8 manifeste-lecture-width">
        {paragraphs.map((paragraph, index) => {
          // Plus de formatage en rouge, tout reste en noir
          // Mais on garde les citations en italique
          const formattedParagraph = paragraph
            // Citations en italique
            .replace(/« ce garçon du fond de la classe[^»]+»/g, '<em>$&</em>')
            .replace(/« un port d'attache qui tient dans la poche »/g, '<em>$&</em>')
            .replace(/« compagnons de notre voyage de vie »/g, '<em>$&</em>')
            .replace(/« sans livres, le monde serait clos »/g, '<em>$&</em>')
            // Correction pour éviter que le dernier guillemet ne tombe dans le vide
            .replace(/« c'est s'ouvrir aux autres et à soi-même être soi »\./g, '<em>« c\'est s\'ouvrir aux autres et à soi-même être soi »</em>.')
            .replace(/« c'est s'ouvrir aux autres et à soi-même être soi »(?!\.)/g, '<em>« c\'est s\'ouvrir aux autres et à soi-même être soi »</em>');
            
          return <p key={index} className="mb-4 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{
            __html: formattedParagraph
          }} />;
        })}
      </div>
    );
  }

  if (!description) {
    // Description par défaut pour les autres livres sans description
    return <p className="text-left mx-[2px]">En associant les voyelles aux consonnes, le bébé donne naissance dès le sixième mois à ses premières syllabes, qu´il double naturellement pour dire ""ma ma"", ""mu mu"" et parfois d´autres mots ""gueu gueu"", ""ga ga"". Vers neuf mois apparaissent ses premiers mots composés d´une syllabe ou de deux syllabes doublées ""papa"", ""doudou"", ""joujou"". C´est à l´imitation et de l´exploration. Cet ouvrage vous permet d´encourager votre bébé à les prononcer sur le thème des espèces protégées de l´Île de La Réunion.</p>;
  }

  // Vérifier si c'est le livre "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS"
  const isJacquelineDalais = 
    bookTitle === "LA CLÉ DES SAVEURS DE JACQUELINE DALAIS" || 
    bookTitle?.toLowerCase().includes("jacqueline dalais") ||
    bookTitle?.toLowerCase().includes("cle des saveurs");
    
  // Vérifier si c'est SAVEURS METISSÉES D'AYMERIC PATAUD
  const isSaveursMetissees = 
    bookTitle === "SAVEURS METISSÉES D'AYMERIC PATAUD" ||
    bookTitle?.toLowerCase().includes("saveurs metissees") ||
    bookTitle?.toLowerCase().includes("aymeric pataud");
    
  // Vérifier si c'est LES COUPS DE CŒUR DE BRIGITTE GRONDIN
  const isCoupsDeCoeurBrigitte = 
    bookTitle === "LES COUPS DE CŒUR DE BRIGITTE GRONDIN" ||
    bookTitle?.toLowerCase().includes("coups de cœur") ||
    bookTitle?.toLowerCase().includes("brigitte grondin");
    
  // Vérifier si c'est MA CUISINE BIEN-ÊTRE
  const isCuisineBienEtre = 
    bookTitle === "MA CUISINE BIEN-ÊTRE" ||
    bookTitle?.toLowerCase().includes("cuisine bien-être") ||
    bookTitle?.toLowerCase().includes("cuisine bien etre");
    
  // Vérifier si c'est DU BONHEUR DANS VOTRE ASSIETTE
  const isDuBonheurAssiette = 
    bookTitle === "DU BONHEUR DANS VOTRE ASSIETTE" ||
    bookTitle?.toLowerCase().includes("bonheur dans votre assiette");
    
  // Vérifier si c'est CASES CRÉOLES DE LA RÉUNION
  const isCasesCréolesReunion = 
    bookTitle === "CASES CRÉOLES DE LA RÉUNION" ||
    bookTitle?.toLowerCase().includes("cases créoles");
  
  // Pour Jacqueline Dalais, insérer un saut de ligne avant la dernière phrase
  if (isJacquelineDalais && description) {
    const lastSentencePattern = /Cet ouvrage est une invitation au voyage et au partage\./;
    const modifiedDescription = description.replace(
      lastSentencePattern, 
      "\n\nCet ouvrage est une invitation au voyage et au partage."
    );
    
    // Utiliser la description modifiée
    return renderDescription(modifiedDescription);
  }
  
  // Pour Saveurs Métissées, ne pas séparer la biographie de l'auteur
  if (isSaveursMetissees && description) {
    return renderDescription(description);
  }
  
  // Pour LES COUPS DE CŒUR DE BRIGITTE GRONDIN, on met certains passages en italique
  if (isCoupsDeCoeurBrigitte && description) {
    return renderDescription(description);
  }
  
  // Pour MA CUISINE BIEN-ÊTRE, on met certains passages en italique
  if (isCuisineBienEtre && description) {
    const cuisineBienEtreDescription = `Après <em>Du bonheur dans votre assiette</em>, best-seller de la cuisine réunionnaise, Brigitte Grondin propose ici des recettes simples qui permettent de concilier nutrition et plaisir. Ces 150 recettes sont réparties en trois grands chapitres : « <em>Vite fait, bien fait !</em> » pour les plus pressés, « <em>A table !</em> » pour recevoir sans faire d'excès et « <em>Côté jardin</em> » pour profiter des beaux jours. Métissant les influences et mettant en valeur les produits tropicaux, ces recettes allient originalité et bien-être. Grâce à de nombreuses astuces et variantes, elles sont réalisables par tous et partout, y compris dans l'<em>hémisphère nord</em>. Chaque recette est accompagnée d'une note « <em>intérêts nutritionnels</em> ». Le livre est préfacé par le médecin nutritionniste Patrick Sérog.`;
    
    return renderDescription(cuisineBienEtreDescription);
  }
  
  // Pour DU BONHEUR DANS VOTRE ASSIETTE, cas spécial avec formatage précis
  if (isDuBonheurAssiette && description) {
    // Formatage exact comme dans l'image de référence avec toute la dernière ligne en italique
    const customDescription = `Amateurs d'une cuisine créole authentique et préservée, les 300 recettes de cet ouvrage vous permettront de réaliser aussi bien quelques grands classiques (<em>rougail saucisses, cari bichique</em>) que de nombreuses recettes insolites (<em>soufflé de palmiste, magrets de canard aux goyaviers</em>). La sélection originale des recettes par rubriques : <em>"petit-déjeuner"</em>, <em>"pique-nique"</em>, <em>"goûter"</em>, <em>"apéritif"</em>, ou encore <em>"dîner entre amis"</em>, <em>"repas de fête"</em>, <em>"tête à tête"</em>, <em>"déjeuner en famille"</em>... propose une multitude d'entrées, de plats et de desserts.

<em>Best-seller de la cuisine réunionnaise, Du bonheur dans votre assiette s'est vendu à 40 000 exemplaires.</em>`;
    
    // Utiliser directement la description formatée
    return renderDescription(customDescription);
  }
  
  // Pour MANIFESTE POUR LA LECTURE, cas spécial avec formatage précis
  if (isManifestePourLaLecture && description) {
    const manifeste_description = `Ce manifeste est destiné à ceux qui dévorent les livres, qui les picorent, qui ne lisent plus, aux enseignants, aux parents, aux jeunes. Il rassemble les témoignages, récits et histoires, de seize auteurs francophones, des îles de l'océan Indien, des Caraïbes, d'Afrique, d'Amérique du Nord et d'Europe. Ils confient leurs souvenirs d'enfance comme Nassuf Djailani qui se remémore depuis Mayotte « ce garçon du fond de la classe qui avait des mots plein le ventre et qui avait tant de mal à les sortir ». Ils font part de leurs rencontres comme Kenza Sefrioui qui, admirative, raconte cet homme de soixante-dix ans qui a tant remué les montagnes du Maroc pour faire lire les enfants de son village. Ces auteurs confient avec générosité, leurs expériences, le secret des mots et leur rapport intime au livre et à la lecture. Pour Jennifer Richard, le livre est « un port d'attache qui tient dans la poche » ; pour Ananda Devi, les livres sont des « compagnons de notre voyage de vie » ; pour Véronique Tadjo, « sans livres, le monde serait clos », et, pour Fabienne Jonca, lire, « c'est s'ouvrir aux autres et à soi-même être soi ».`;
    
    return renderDescription(manifeste_description);
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
  
  // Séparer le texte en paragraphes (double saut de ligne)
  return renderDescription(description || "");
  
  // Fonction utilitaire pour rendre la description avec le formatage
  function renderDescription(text: string) {
    const paragraphs = text.split('\n\n');
    return <div className="description mb-8">
      {paragraphs.map((paragraph, index) => {
      // Pour le cas où il y aurait des sauts de ligne simples dans un paragraphe
      const formattedParagraph = paragraph
      // ... keep existing code (formatage des autres livres)
      
      return <p key={index} className="mb-4 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{
        __html: formattedParagraph
      }} />;
    })}
    </div>;
  }
};
