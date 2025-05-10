
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
    hasUpdatedRef,
    forceUpdate
  } = useBookUpdate(bookId);
  
  // Fonction pour gérer les cas spécifiques de mise à jour
  const handleBookSpecificUpdates = () => {
    if (!bookId || !book?.title) return false;
    
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
        return true;
      } catch (error) {
        console.error("Error in update effect for Ambroise Vollard book:", error);
        return false;
      }
    } 
    // Update for Flamboyant Père Noël book
    else if (book?.title?.toLowerCase().includes("flamboyant") && book?.title?.toLowerCase().includes("noël")) {
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
        
        // Liens de presse pour ce livre
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
        return true;
      } catch (error) {
        console.error("Error in update effect:", error);
        return false;
      }
    } 
    // Add specific update case for "AS-TU LA LANGUE BIEN PENDUE ?"
    else if (book.id === "d100f128-ae83-44e7-b468-3aa6466b6e31" || book.title?.toUpperCase() === "AS-TU LA LANGUE BIEN PENDUE ?") {
      try {
        console.log("Updating AS-TU LA LANGUE BIEN PENDUE ?");
        hasUpdatedRef.current = true;
        
        const newDescription = "Des dessins qui cachent des expressions et un jeu du pendu pour les retrouver en deux temps trois mouvements. Ce livre est une invitation aux jeux de mots. Un voyage au pays des expressions qui font le charme de notre langue. Langue que tu pourras donner au chat, si tu sèches sur la réponse.";
        
        const newDetails = {
          publisher: "Océan Jeunesse",
          illustrator: "Audrey Caron", 
          year: "2025",
          pages: "48",
          isbn: "9782916533520"
        };
        
        // Liens de presse pour ce livre
        const newPressLinks = [
          { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue" },
          { url: "http://www.encres-vagabondes.com/magazine/jonca.htm", label: "http://www.encres-vagabondes.com/magazine/jonca.htm" }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: [],
          editions: []
        });
        return true;
      } catch (error) {
        console.error("Error updating AS-TU LA LANGUE BIEN PENDUE ?:", error);
        return false;
      }
    } 
    // Update for "EXPRESSIONS MÉLANZÉ"
    else if (book.title === "EXPRESSIONS MÉLANZÉ" || book.title === "Expressions Mélanzé" || book.title === "Expressions Melanze") {
      try {
        console.log("Updating EXPRESSIONS MÉLANZÉ");
        hasUpdatedRef.current = true;
        
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
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: [],
          awards: newAwards,
          editions: []
        });
        return true;
      } catch (error) {
        console.error("Error updating EXPRESSIONS MÉLANZÉ:", error);
        return false;
      }
    } 
    // Mise à jour spécifique pour "Z'OISEAUX RARES"
    else if (book.title === "Z'OISEAUX RARES" || book.title === "Z'oiseaux rares" || book.title === "ZOISEAUX RARES" || book.title?.toLowerCase() === "zoiseaux rares" || book.id === "ed5bd9ea-ad20-4426-b48b-19e4ed5b5356") {
      try {
        console.log("Mise à jour des informations de Z'OISEAUX RARES avec ID:", book.id);
        hasUpdatedRef.current = true;
        
        const newDescription = "En associant les voyelles aux consonnes, le bébé donne naissance dès le sixième mois à ses premières syllabes, qu'il double naturellement pour dire \"ma ma\", \"mu mu\" et parfois d'autres mots \"gueu gueu\", \"ga ga\".\n\nVers neuf mois apparaissent ses premiers mots composés d'une syllabe ou de deux syllabes doublées \"papa\", \"doudou\", \"joujou\". C'est à l'imitation et à l'exploration. Cet ouvrage vous permet d'encourager votre bébé à les prononcer sur le thème des espèces protégées de l'Île de La Réunion.";
        
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
        
        console.log("Données complètes à envoyer pour Z'OISEAUX RARES:");
        console.log("Description:", newDescription);
        console.log("Détails:", newDetails);
        console.log("ID du livre:", bookId);
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: []
        });
        
        return true;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de Z'OISEAUX RARES:", error);
        toast.error("Erreur lors de la mise à jour de Z'OISEAUX RARES");
        return false;
      }
    }
    // Update for "EDGAR, LE CHAT SOURIS"
    else if (book.title === "EDGAR, LE CHAT SOURIS" || book.title === "Edgar, le chat souris" || book.id === "59a9689a-3484-4977-b0bf-4026e3438ab9") {
      try {
        console.log("Mise à jour des informations de EDGAR, LE CHAT SOURIS");
        hasUpdatedRef.current = true;
        
        const newDescription = "Parfois en s'endormant, le chat Edgar pense à sa vie d'avant, au grand bureau sur lequel il s'allongeait pendant que sa maîtresse écrivait. Aux délicieuses pâtées qu'elle lui préparait. À ses interminables caresses. Tout cela, c'était avant le décès de sa protectrice. Les héritiers l'ayant mis dehors, le voici à présent contraint d'affronter le froid qui le mord si fort et la faim qui étreint ses entrailles ! Mais Edgar ne veut pas baisser les pattes, alors il se donne un défi : trouver un travail ! Mais comment s'y prendre ? Suivre les conseils de deux souris, pourquoi pas !\n\nUne histoire optimiste sur les rencontres inattendues qui permettent aux uns et aux autres de s'enrichir de leurs différences, d'apprendre à jouer avec de nouveaux codes et surtout d'oser s'affranchir des idées reçues.";
        
        const newDetails = {
          publisher: "Éditions Orphie",
          illustrator: "Nancy Ribard", 
          year: "2013",
          pages: "48",
          isbn: "9782912949509"
        };
        
        // Ajout des liens de presse spécifiques
        const newPressLinks = [
          { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris", label: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/edgar-le-chat-souris" },
          { url: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839", label: "https://www.babelio.com/livres/Jonca-Edgar-le-chat-souris/435839" },
          { url: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html", label: "http://coupdecœurlecteurs.blogspot.com/2013/09/edgar-le-chat-souris.html" }
        ];
        
        // Ajout des distinctions et prix spécifiques
        const newAwards = [
          { name: "Prix de l'album Jeunesse au Salon du livre insulaire d'Ouessant 2013", year: "2013" },
          { name: "Sélection Coup de cœur des lecteurs saint-paulois 2013", year: "2013" },
          { name: "Sélection Prix du Paille-en-queue 2014", year: "2014" },
          { name: "Coup de cœur Takam Tikou", year: null }
        ];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: []
        });
        
        return true;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de EDGAR, LE CHAT SOURIS:", error);
        toast.error("Erreur lors de la mise à jour de EDGAR, LE CHAT SOURIS");
        return false;
      }
    }
    // Update for "MA CUISINE MARMAILLE"
    else if (book.title === "MA CUISINE MARMAILLE" || book.title === "Ma Cuisine Marmaille" || book.id === "31bd8bad-b180-4f39-bc59-a40b3e367975") {
      try {
        console.log("Mise à jour des informations de MA CUISINE MARMAILLE");
        hasUpdatedRef.current = true;
        
        const newDescription = "Prenez une grande cuisinière. Ajoutez des enfants passionnés, des parents et des amis gourmands. Mixez le tout avec des recettes faciles, saines et variées. Et vous obtiendrez « Ma cuisine marmailles », un livre qui permet à tous, dès 6 ans, de s'en donner à cœur joie. Cet ouvrage contient une centaine de recettes spécialement conçues pour être réalisées par les enfants. Au sommaire, trois chapitres, selon l'âge des cuisiniers en herbe : moins de 7 ans, 7-10 ans, plus de 10 ans. Les recettes sont rédigées dans un style spécialement adapté à de jeunes lecteurs. Les pages sont émaillées d'astuces et de conseils. Les photographies privilégient les couleurs vives. Des illustrations amusantes complètent l'ensemble.";
        
        const newDetails = {
          publisher: "Epsilon Éditions – 4 Épices",
          illustrator: "Caroline Grondin", 
          year: "2016",
          pages: "160",
          isbn: "9782912949721"
        };
        
        // Pas de liens de presse spécifiques pour ce livre
        const newPressLinks = [];
        
        // Pas de prix ou distinctions pour ce livre
        const newAwards = [];
        
        updateBookMutation.mutate({
          bookId,
          bookData: { description: newDescription },
          detailsData: newDetails,
          pressLinks: newPressLinks,
          awards: newAwards,
          editions: []
        });
        
        return true;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de MA CUISINE MARMAILLE:", error);
        toast.error("Erreur lors de la mise à jour de MA CUISINE MARMAILLE");
        return false;
      }
    }
    
    return false; // Aucune mise à jour spécifique n'a été effectuée
  };
  
  useEffect(() => {
    if (preventUpdates || !bookId || hasUpdatedRef.current) {
      return;
    }
    
    console.log("Vérification si le livre a besoin d'une mise à jour:", bookId);
    console.log("Informations du livre:", book?.title, bookId, book?.description);
    
    if (
      updateBookMutation.isPending || 
      isLoadingBook || 
      !book || 
      isBookError ||
      !book.title
    ) {
      return;
    }

    // Spécifiquement pour Edgar, le chat souris, force la mise à jour (même si déjà mis à jour)
    if (book.id === "59a9689a-3484-4977-b0bf-4026e3438ab9" || 
        book.title === "EDGAR, LE CHAT SOURIS" ||
        book.title === "Edgar, le chat souris") {
      console.log("Force la mise à jour d'Edgar, le chat souris");
      hasUpdatedRef.current = false; // Réinitialiser pour permettre la mise à jour
      forceUpdate();
    }
    
    // Force la mise à jour pour TU ME FAIS TOURNER LA TERRE aussi
    if (book.id === "451338a8-2537-454d-a990-00dbc0988370" || 
        book.title === "TU ME FAIS TOURNER LA TERRE" ||
        book.title === "Tu me fais tourner la terre") {
      console.log("Force la mise à jour de TU ME FAIS TOURNER LA TERRE");
      hasUpdatedRef.current = false; // Réinitialiser pour permettre la mise à jour
      forceUpdate();
    }
    
    // Force la mise à jour pour MA CUISINE MARMAILLE aussi
    if (book.id === "31bd8bad-b180-4f39-bc59-a40b3e367975" || 
        book.title === "MA CUISINE MARMAILLE" ||
        book.title === "Ma Cuisine Marmaille") {
      console.log("Force la mise à jour de MA CUISINE MARMAILLE");
      hasUpdatedRef.current = false; // Réinitialiser pour permettre la mise à jour
      forceUpdate();
    }

    // Tenter de mettre à jour le livre avec les informations spécifiques
    const wasUpdated = handleBookSpecificUpdates();
    
    if (!wasUpdated) {
      hasUpdatedRef.current = true;
      console.log("Aucune mise à jour spécifique disponible pour ce livre");
    }
  }, [book, bookId, isLoadingBook, isBookError, updateBookMutation.isPending, preventUpdates, forceUpdate]);

  return null; // Ce composant ne rend rien, il gère uniquement les effets de bord
};
