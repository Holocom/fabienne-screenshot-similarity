
import React, { useEffect } from 'react';
import { Book } from '@/integrations/supabase/schema';
import { useBookUpdate } from '@/hooks/useBookUpdate';
import { toast } from 'sonner';

interface BookUpdateHandlerProps {
  book: Book;
  bookId: string | undefined;
  isLoadingBook: boolean;
  isBookError: boolean;
}

export const BookUpdateHandler: React.FC<BookUpdateHandlerProps> = ({ 
  book, 
  bookId,
  isLoadingBook,
  isBookError
}) => {
  const { 
    updateBookMutation, 
    preventUpdates, 
    hasUpdatedRef 
  } = useBookUpdate(bookId);
  
  useEffect(() => {
    if (preventUpdates || !bookId || hasUpdatedRef.current) {
      return;
    }
    
    console.log("Checking if book needs update:", bookId);
    console.log("Book info:", book?.title, bookId);
    
    if (
      updateBookMutation.isPending || 
      isLoadingBook || 
      !book || 
      isBookError ||
      !book.title
    ) {
      return;
    }
    
    // Special case for Ambroise Vollard book
    if (book.title === "AMBROISE VOLLARD, UN DON SINGULIER" || book.title === "Ambroise Vollard, un don singulier") {
      try {
        hasUpdatedRef.current = true;
        
        const newDescription = "Le premier ouvrage à rendre hommage à Vollard le Réunionnais et au don exceptionnel fait à son île en 1947, exposé au musée Léon Dierx. Ces 157 œuvres initiales, complétées depuis 70 ans, forment la plus grande collection d'art moderne française en dehors de la métropole. Né à La Réunion en 1866 et mort en France métropolitaine à la veille de la Seconde Guerre mondiale, Ambroise Vollard a eu une influence décisive sur l'art au tournant des XIXe et XXe siècles. Paul Cézanne, Pablo Picasso, Auguste Renoir, Georges Rouault, Paul Gauguin, Berthe Morisot, Edgar Degas, Émile Bernard... En cinquante ans, il découvrit ou accompagna les plus grands artistes de son temps. Marchand, éditeur d'art et écrivain, Vollard avait un talent unique pour repérer les artistes. Comment, alors qu'il n'est jamais revenu dans son île natale, a-t-il participé à former le regard de nombreux Réunionnais ? Comment, alors qu'il ne cachait pas son aversion pour les institutions muséales, a-t-il participé à la création du premier musée des beaux-arts des Outre-mers français ? À l'occasion du 70e anniversaire du don Vollard au musée Léon Dierx, cet ouvrage retrace le parcours de ce réunionnais au don singulier.";
        
        const newDetails = {
          publisher: "Ed. 4 Épices",
          illustrator: "Non spécifié", 
          year: "2017",
          pages: "216",
          isbn: "9782952720496"
        };
        
        const newPressLinks = [
          { url: "https://imazpress.com/culture/le-livre-qui-veut-faire-decouvrir-ce-reunionnais-qui-a-revele-picasso", label: "https://imazpress.com/culture/le-livre-veut-faire-decouvrir-ce-reunionnais-qui-a-revele-picasso" },
          { url: "https://la1ere.francetvinfo.fr/reunion/culture-1ere-539729.html", label: "https://la1ere.francetvinfo.fr/reunion/culture-1ere-539729.html" }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: [],
          editions: []
        });
      } catch (error) {
        console.error("Error in update effect for Ambroise Vollard book:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël") && book.id) {
      // Update for Flamboyant Père Noël book
      try {
        hasUpdatedRef.current = true;
        
        const newDescription = "Dès le mois de janvier, le très élégant père Noël décide d'explorer la Terre, à la recherche de sa tenue de fin d'année. Il s'envole sur son traîneau pour l'Écosse, le Japon, la Côte d'Ivoire et bien d'autres pays encore.\n\nPendant son tour du monde, il essaie des vêtements, du plus sobre au plus étincelant.\n\nQuelle tenue choisira-t-il cette année ? Un kilt écossais ou un boubou africain ?";
        
        const newDetails = {
          publisher: "Atelier des nomades",
          illustrator: "Iloë", 
          year: "2020",
          pages: "24",
          isbn: "9782919300297"
        };
        
        // Liens de presse pour ce livre - on laisse la déduplication au composant PressLinksSection
        const newPressLinks = [
          { url: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122", label: "https://www.babelio.com/livres/Jonca-Un-flamboyant-pere-Noel/1282122" },
          { url: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html", label: "https://www.super-chouette.net/2020/12/un-flamboyant-pere-noel.html" },
          { url: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html", label: "https://lepetitmondedulivrejeunesse.over-blog.fr/2020/12/album-noel-et-vetements.html" }
        ];
        
        const newAwards = [
          { name: "Prix Afrilivres 2020", year: "2020" },
          { name: "Prix Jeanne de Cavally 2022", year: "2022" },
          { name: "Finaliste du Prix Vanille Illustration 2020", year: "2020" },
          { name: "Finaliste du Prix Vanille Illustration 2024", year: "2024" }
        ];
        
        const newEditions = [
          { name: "Edition anglaise Ile Maurice", publisher: null, year: null, language: "Anglais" },
          { name: "Edition française spéciale Côte d'Ivoire", publisher: null, year: null, language: "Français" },
          { name: "Edition bilingue français-malgache 2024", publisher: null, year: "2024", language: "Français/Malgache" },
          { name: "Atelier des nomades", publisher: "Atelier des nomades", year: null, language: null },
          { name: "Edition Vallesse", publisher: "Vallesse", year: null, language: null },
          { name: "Edition Filigrane", publisher: "Filigrane", year: null, language: null }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: newEditions
        });
      } catch (error) {
        console.error("Error in update effect:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || book.title.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
      // Add specific update case for "AS-TU LA LANGUE BIEN PENDUE ?"
      try {
        console.log("Updating AS-TU LA LANGUE BIEN PENDUE ?");
        
        const newDescription = "Des dessins qui cachent des expressions et un jeu du pendu pour les retrouver en deux temps trois mouvements. Ce livre est une invitation aux jeux de mots. Un voyage au pays des expressions qui font le charme de notre langue. Langue que tu pourras donner au chat, si tu sèches sur la réponse.";
        
        const newDetails = {
          publisher: "Océan Jeunesse",
          illustrator: "Audrey Caron", 
          year: "2025",
          pages: "48",
          isbn: "9782916533520"
        };
        
        // Liens de presse pour ce livre - on laisse la déduplication au composant PressLinksSection
        const newPressLinks = [
          { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue" },
          { url: "http://www.encres-vagabondes.com/magazine/jonca.htm", label: "http://www.encres-vagabondes.com/magazine/jonca.htm" }
        ];
        
        // Force an update to the database
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: [],
          editions: []
        });
      } catch (error) {
        console.error("Error updating AS-TU LA LANGUE BIEN PENDUE ?:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book.title === "EXPRESSIONS MÉLANZÉ" || book.title === "Expressions Mélanzé" || book.title === "Expressions Melanze") {
      // Add specific update case for "EXPRESSIONS MÉLANZÉ"
      try {
        console.log("Updating EXPRESSIONS MÉLANZÉ");
        
        const newDescription = "Alon dékouvé bann lésprésyon kréol ék fransé, shakinn néna son lima-maziné. Bann lésprésyon i maive-maive ansanm, i yativien avèk po mète anlèr lo gouté nout deu lang. Ek le bann paj lo jeu, alé pran out plézir vavangue koté in lang épila l'ot lang dann in gavar ou i oubli'arpa.\n\nDécouvre des expressions créoles et françaises aussi imagées les unes que les autres. Les expressions s'entremêlent et se répondent pour révéler la saveur de nos deux langues. Et avec les pages de jeux, amuse-toi à passer d'une langue à l'autre avec délectation.";
        
        const newDetails = {
          publisher: "Ed. 4 Épices",
          illustrator: "Flo Vandermeersch", 
          year: "2024",
          pages: "44",
          isbn: "9782956127741"
        };
        
        // Specific awards for this book
        const newAwards = [
          { name: "Finaliste du Prix Vanille Illustration (2024)", year: "2024" }
        ];
        
        // Force an update to the database
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: [],
          awards: newAwards,
          editions: []
        });
      } catch (error) {
        console.error("Error updating EXPRESSIONS MÉLANZÉ:", error);
        hasUpdatedRef.current = true;
      }
    } else if (book.title === "Z'OISEAUX RARES" || book.title === "Z'oiseaux rares" || book.title === "ZOISEAUX RARES" || book.id === "ed5bd9ea-ad20-4426-b48b-19e4ed5b5356") {
      // Mise à jour spécifique pour "Z'OISEAUX RARES"
      try {
        console.log("Updating Z'OISEAUX RARES with ID:", book.id);
        
        // Mise à jour avec la nouvelle description de l'image
        const newDescription = "En associant les voyelles aux consonnes, le bébé donne naissance dès le sixième mois à ses premières syllabes, qu'il double naturellement pour dire \"ma ma\", \"mu mu\" et parfois d'autres mots \"gueu gueu\", \"ga ga\".\n\nVers neuf mois apparaissent ses premiers mots composés d'une syllabe ou de deux syllabes doublées \"papa\", \"doudou\", \"joujou\". C'est à la fois de l'imitation et de l'exploration. Cet ouvrage vous permet d'encourager votre bébé à les prononcer sur le thème des espèces protégées de l'Île de La Réunion.";
        
        const newDetails = {
          publisher: "Zébulo Éditions",
          illustrator: "Julie Bernard", 
          year: "2019",
          pages: "20",
          isbn: "9791096163069"
        };
        
        // Liens de presse pour ce livre
        const newPressLinks = [
          { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/z-oiseaux-rares", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/z-oiseaux-rares" },
          { url: "https://www.babelio.com/livres/Jonca-ZOiseaux-rares/1257825", label: "https://www.babelio.com/livres/Jonca-ZOiseaux-rares/1257825" },
          { url: "https://comj.fr/zoiseaux-rares-fabienne-jonca-julie-bernard/", label: "https://comj.fr/zoiseaux-rares-fabienne-jonca-julie-bernard/" }
        ];
        
        // Awards pour ce livre
        const newAwards = [
          { name: "Sélection Kibookin - Salon du livre de Montreuil 2019", year: "2019" },
          { name: "Sélection Festival du livre jeunesse et de la bande dessinée de Cherbourg-en-Cotentin", year: null },
          { name: "Coup de cœur Takam Tikou 2020", year: "2020" }
        ];
        
        // Force an update to the database
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: []
        });
      } catch (error) {
        console.error("Error updating Z'OISEAUX RARES:", error);
        hasUpdatedRef.current = true;
      }
    } else {
      hasUpdatedRef.current = true;
    }
  }, [book, bookId, isLoadingBook, isBookError, updateBookMutation, preventUpdates]);

  return null; // Ce composant ne rend rien, il gère uniquement les effets de bord
};
