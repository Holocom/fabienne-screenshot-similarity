
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

  // Séparer le texte en paragraphes (double saut de ligne)
  const paragraphs = description.split('\n\n');
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
      // Mettre en évidence certains mots pour Z'OISEAUX RARES
      .replace(/"ma ma"/g, '<strong>"ma ma"</strong>').replace(/"mu mu"/g, '<strong>"mu mu"</strong>').replace(/"gueu gueu"/g, '<strong>"gueu gueu"</strong>').replace(/"ga ga"/g, '<strong>"ga ga"</strong>').replace(/"papa"/g, '<strong>"papa"</strong>').replace(/"doudou"/g, '<strong>"doudou"</strong>').replace(/"joujou"/g, '<strong>"joujou"</strong>')
      // Gérer les doubles guillemets français qui peuvent venir du copier-coller
      .replace(/´/g, "'").replace(/""/g, '"');
      return <p key={index} className="mb-4 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{
        __html: formattedParagraph
      }} />;
    })}
    </div>;
};
