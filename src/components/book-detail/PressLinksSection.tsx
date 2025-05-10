
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
  
  const flamboyantPereNoelLinks: SimplePressLink[] = [
    { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122", label: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122" },
    { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html" },
    { url: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html", label: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html" }
  ];
  
  const langueBienPendueLinks: SimplePressLink[] = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue" },
    { url: "http://www.encres-vagabondes.com/magazine/jonca.htm", label: "http://www.encres-vagabondes.com/magazine/jonca.htm" }
  ];
  
  const zOiseauxRaresLinks: SimplePressLink[] = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/z-oiseaux-rares", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/z-oiseaux-rares" },
    { url: "https://www.babelio.com/livres/Jonca-ZOiseaux-rares/1257825", label: "https://www.babelio.com/livres/Jonca-ZOiseaux-rares/1257825" },
    { url: "https://comj.fr/zoiseaux-rares-fabienne-jonca-julie-bernard/", label: "https://comj.fr/zoiseaux-rares-fabienne-jonca-julie-bernard/" }
  ];
  
  const edgarChatSourisLinks: SimplePressLink[] = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris" },
    { url: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839", label: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839" },
    { url: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html", label: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html" },
    { url: "https://la1ere.francetvinfo.fr/reunion/2013/08/20/la-reunion-primee-au-15eme-salon-du-livre-d-ouessant-56299.html", label: "https://la1ere.francetvinfo.fr/reunion/2013/08/20/la-reunion-primee-au-15eme-salon-du-livre-d-ouessant-56299.html" },
    { url: "https://imazpress.com/actus-reunion/la-reunion-primee-au-salon-du-livre-insulaire-douessant", label: "https://imazpress.com/actus-reunion/la-reunion-primee-au-salon-du-livre-insulaire-douessant" }
  ];
  
  const reunionDesReligionsLinks: SimplePressLink[] = [
    { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/la-reunion-des-religions", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/la-reunion-des-religions" },
    { url: "https://www.ricochet-jeunes.org/livres/la-reunion-des-religions", label: "https://www.ricochet-jeunes.org/livres/la-reunion-des-religions" },
    { url: "https://www.encres-vagabondes.com/magazine/jonca3.htm", label: "https://www.encres-vagabondes.com/magazine/jonca3.htm" },
    { url: "https://www.les-notes.fr/analyse/la-reunion-des-religions/", label: "https://www.les-notes.fr/analyse/la-reunion-des-religions/" }
  ];
  
  // Add new press links for "Les religions à l'ile Maurice"
  const lesReligionsIleMauriceLinks: SimplePressLink[] = [
    { url: "https://sabariscon.com/2016/06/20/les-religions-a-lile-maurice-fabienne-jonca-et-helene-moreau-vizavi-2015/", label: "https://sabariscon.com/2016/06/20/les-religions-a-lile-maurice-fabienne-jonca-et-helene-moreau-vizavi-2015/" }
  ];
                      
  // Determine which links to display
  let displayLinks: (PressLink | SimplePressLink)[] = pressLinks;
  
  if (bookTitle === "Brown Baby") {
    displayLinks = brownBabyPressLinks;
  } else if (bookTitle.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
    displayLinks = langueBienPendueLinks;
  } else if (bookTitle?.toLowerCase().includes("flamboyant") && bookTitle?.toLowerCase().includes("noël")) {
    displayLinks = flamboyantPereNoelLinks;
  } else if (bookTitle === "Z'OISEAUX RARES" || bookTitle === "Z'oiseaux rares" || bookTitle === "ZOISEAUX RARES") {
    displayLinks = zOiseauxRaresLinks;
  } else if (bookTitle === "EDGAR, LE CHAT SOURIS" || bookTitle === "Edgar, le chat souris") {
    displayLinks = edgarChatSourisLinks;
  } else if (bookTitle === "La Réunion des religions" || bookTitle === "LA RÉUNION DES RELIGIONS") {
    displayLinks = reunionDesReligionsLinks;
  } else if (bookTitle === "Les religions à l'ile Maurice" || bookTitle === "Les religions à l'île Maurice" || bookTitle.toLowerCase().includes("religions") && bookTitle.toLowerCase().includes("maurice")) {
    displayLinks = lesReligionsIleMauriceLinks;
  }
  
  // Créer une map pour stocker des liens uniques par URL
  // On utilise cette approche pour conserver le premier lien trouvé pour chaque URL
  const uniqueLinksMap = new Map<string, PressLink | SimplePressLink>();
  
  // Ajouter la normalisation des URL pour une déduplication plus robuste
  const normalizeUrl = (url: string): string => {
    // Supprime les espaces, rend tout en minuscule et supprime les barres obliques finales
    return url.trim().toLowerCase().replace(/\/+$/, '');
  };
  
  // Parcourir tous les liens et ne conserver que le premier pour chaque URL normalisée
  displayLinks.forEach(link => {
    const normalizedUrl = normalizeUrl(link.url);
    if (!uniqueLinksMap.has(normalizedUrl)) {
      uniqueLinksMap.set(normalizedUrl, link);
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
