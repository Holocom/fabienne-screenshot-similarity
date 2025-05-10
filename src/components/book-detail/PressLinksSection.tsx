
import React from 'react';
import { PressLink } from '@/integrations/supabase/schema';

// Interface simplifiée pour les liens hardcodés
interface SimplePressLink {
  url: string;
  label: string | null;
}

interface PressLinksSectionProps {
  pressLinks: PressLink[];
  bookTitle: string;
}

export const PressLinksSection: React.FC<PressLinksSectionProps> = ({ pressLinks, bookTitle }) => {
  // Book-specific press links
  const brownBabyPressLinks: SimplePressLink[] = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/brown-baby", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/brown-baby" },
    { url: "https://etlettres.com/la-couleur-du-coeur/", label: "https://etlettres.com/la-couleur-du-coeur/" },
    { url: "https://voya-g.com/fabienne-jonca-presente-brown-baby-roman-empreint-de-poesie-de-resistance-et-de-racines-afro-americaines/", label: "https://voya-g.com/fabienne-jonca-presente-brown-baby-roman-empreint-de-poesie-de-resistance-et-de-racines-afro-americaines/" },
    { url: "https://lexpress.mu/s/fabienne-jonca-blues-antiracisme-bleus-a-notre-humanite-540621", label: "https://lexpress.mu/s/fabienne-jonca-blues-antiracisme-bleus-a-notre-humanite-540621" }
  ];
  
  // Note: Pour "AS-TU LA LANGUE BIEN PENDUE ?", nous utilisons uniquement les liens de la base de données
  // et n'utilisons plus les liens hardcodés pour éviter les doublons
  
  const flamboyantPereNoelLinks: SimplePressLink[] = [
    { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122", label: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122" },
    { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html" },
    { url: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html", label: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html" }
  ];
                      
  // Determine which links to display
  let displayLinks: (PressLink | SimplePressLink)[] = pressLinks;
  
  if (bookTitle === "Brown Baby") {
    displayLinks = brownBabyPressLinks;
  } else if (bookTitle === "AS-TU LA LANGUE BIEN PENDUE ?") {
    // Pour ce livre spécifique, on utilise uniquement les liens de la base de données
    // Ne pas ajouter de liens hardcodés supplémentaires
    displayLinks = pressLinks;
  } else if (bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël")) {
    displayLinks = flamboyantPereNoelLinks;
  }
  
  // Créer une map pour stocker des liens uniques par URL
  // On utilise cette approche pour conserver le premier lien trouvé pour chaque URL
  const uniqueLinksMap = new Map<string, PressLink | SimplePressLink>();
  
  // Parcourir tous les liens et ne conserver que le premier pour chaque URL
  displayLinks.forEach(link => {
    if (!uniqueLinksMap.has(link.url)) {
      uniqueLinksMap.set(link.url, link);
    }
  });
  
  // Convertir la Map en tableau
  const uniqueLinks = Array.from(uniqueLinksMap.values());
  
  if (uniqueLinks.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="press-title text-[#4b9e5f] font-bold text-xl mb-4 uppercase">PRESSE</h3>
      <ul className="space-y-2 list-none pl-0">
        {uniqueLinks.map((link, index) => (
          <li key={`press-${index}`}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="press-link text-[#ea384c] hover:text-[#c82d3e] transition-colors"
            >
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
