
import React from 'react';
interface BookDescriptionProps {
  description: string | null;
  bookTitle?: string;
}
export const BookDescriptionSection: React.FC<BookDescriptionProps> = ({
  description,
  bookTitle
}) => {
  if (!description) return <p className="text-left mx-[2px]">En associant les voyelles aux consonnes, le bébé donne naissance dès le sixième mois à ses premières syllabes, qu´il double naturellement pour dire ""ma ma"", ""mu mu"" et parfois d´autres mots ""gueu gueu"", ""ga ga"". Vers neuf mois apparaissent ses premiers mots composés d´une syllabe ou de deux syllabes doublées ""papa"", ""doudou"", ""joujou"". C´est à la fois de l´imitation et de l´exploration. Cet ouvrage vous permet d´encourager votre bébé à les prononcer sur le thème des espèces protégées de l´Île de La Réunion.</p>;

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
  
  // Pour Saveurs Métissées, séparer la biographie de l'auteur
  if (isSaveursMetissees && description) {
    const biographyPattern = /Aymeric Pataud est issu de l'école Ritz Escoffier à Paris/;
    const parts = description.split(biographyPattern);
    
    if (parts.length === 2) {
      // Si la biographie est trouvée
      return (
        <div className="description mb-8">
          {/* Première partie - description du livre */}
          {renderDescription(parts[0])}
          
          {/* Biographie de l'auteur */}
          <div className="mt-6">
            {renderDescription("Aymeric Pataud est issu de l'école Ritz Escoffier à Paris" + parts[1])}
          </div>
        </div>
      );
    }
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
      // Remplacer les sauts de ligne simples par des balises <br />
      .replace(/\n/g, '<br />')
      // Appliquer les mises en forme spécifiques comme "Brown Baby" en italique
      .replace(/Brown Baby/g, '<em>Brown Baby</em>')
      // Mettre "Les religions à l'île Maurice" en italique quand il apparaît dans le texte
      .replace(/Les religions à l['']île Maurice/g, '<em>Les religions à l\'île Maurice</em>')
      // Mettre "LA RÉUNION DES ENFANTS" en italique quand il apparaît dans le texte
      .replace(/LA RÉUNION DES ENFANTS/g, '<em>LA RÉUNION DES ENFANTS</em>')
      .replace(/La Réunion des enfants/g, '<em>La Réunion des enfants</em>')
      // Mettre "Le petit garçon qui ne souriait jamais" en italique
      .replace(/Le petit garçon qui ne souriait jamais/gi, '<em>Le petit garçon qui ne souriait jamais</em>')
      // Mettre "TU ME FAIS TOURNER LA TERRE" en italique
      .replace(/TU ME FAIS TOURNER LA TERRE/g, '<em>TU ME FAIS TOURNER LA TERRE</em>')
      .replace(/Tu me fais tourner la terre/gi, '<em>Tu me fais tourner la terre</em>')
      // Ajouter une règle pour mettre "YOU MAKE MY WORLD SPIN" en italique
      .replace(/YOU MAKE MY WORLD SPIN/g, '<em>YOU MAKE MY WORLD SPIN</em>')
      // Mettre en italique les mots "Signature" et "Tradition" pour Jacqueline Dalais
      .replace(/Signature(?!<\/em>)/g, '<em>Signature</em>')
      .replace(/Tradition(?!<\/em>)/g, '<em>Tradition</em>')
      // Mettre en italique "Saveurs métissées" pour SAVEURS METISSÉES D'AYMERIC PATAUD
      .replace(/Saveurs métissées(?!<\/em>)/g, '<em>Saveurs métissées</em>')
      // Mettre en évidence certains mots pour Z'OISEAUX RARES
      .replace(/"ma ma"/g, '<strong>"ma ma"</strong>').replace(/"mu mu"/g, '<strong>"mu mu"</strong>').replace(/"gueu gueu"/g, '<strong>"gueu gueu"</strong>').replace(/"ga ga"/g, '<strong>"ga ga"</strong>').replace(/"papa"/g, '<strong>"papa"</strong>').replace(/"doudou"/g, '<strong>"doudou"</strong>').replace(/"joujou"/g, '<strong>"joujou"</strong>')
      // Gérer les doubles guillemets français qui peuvent venir du copier-coller
      .replace(/´/g, "'").replace(/""/g, '"');
      return <p key={index} className="mb-4 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{
        __html: formattedParagraph
      }} />;
    })}
    </div>;
  }
};
