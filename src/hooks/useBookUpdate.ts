
import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompleteBookInfo } from '@/services/bookService';
import { toast } from 'sonner';

export const useBookUpdate = (bookId: string | undefined) => {
  const queryClient = useQueryClient();
  const hasUpdatedRef = useRef(false);
  const [preventUpdates, setPreventUpdates] = useState(false);
  const [updateAttempts, setUpdateAttempts] = useState(0);
  const MAX_UPDATE_ATTEMPTS = 3;
  
  useEffect(() => {
    // Dans un environnement de production, on vérifie si le livre a déjà été mis à jour
    // Pour le développement, on peut désactiver cette vérification en décommentant la ligne suivante
    // sessionStorage.removeItem('updatedBooks');
    
    const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
    const updatedBooksObj = JSON.parse(updatedBooks);
    
    if (bookId && updatedBooksObj[bookId]) {
      console.log(`Livre ${bookId} déjà mis à jour dans cette session`);
      setPreventUpdates(true);
      hasUpdatedRef.current = true;
    }
    
    return () => {
      if (bookId && hasUpdatedRef.current) {
        const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
        const updatedBooksObj = JSON.parse(updatedBooks);
        updatedBooksObj[bookId] = true;
        sessionStorage.setItem('updatedBooks', JSON.stringify(updatedBooksObj));
        console.log(`Marqué ${bookId} comme mis à jour dans la session`);
      }
    };
  }, [bookId]);
  
  const updateBookMutation = useMutation({
    mutationFn: (data: {
      bookId: string,
      bookData: {},
      detailsData: {},
      pressLinks: any[],
      awards: any[],
      editions: any[]
    }) => {
      console.log("Tentative de mise à jour pour le livre:", data.bookId);
      console.log("Données du livre à mettre à jour:", data.bookData);
      
      // Incrémenter le compteur de tentatives
      setUpdateAttempts(prev => prev + 1);
      
      // Si nous avons dépassé le nombre maximum de tentatives, annuler
      if (updateAttempts >= MAX_UPDATE_ATTEMPTS) {
        console.warn(`Nombre maximum de tentatives de mise à jour atteint pour ${data.bookId}`);
        return Promise.resolve(false);
      }
      
      return updateCompleteBookInfo(
        data.bookId,
        data.bookData,
        data.detailsData,
        data.pressLinks,
        data.awards,
        data.editions
      );
    },
    onSuccess: (success) => {
      if (!success) {
        console.warn("La mise à jour a été traitée mais a retourné une valeur d'échec");
        if (!hasUpdatedRef.current) {
          toast.error('Problème lors de la mise à jour des informations');
        }
        return;
      }
      
      if (bookId) {
        console.log("Mise à jour réussie, invalidation des requêtes pour:", bookId);
        
        // Utilisez une approche plus robuste avec des délais pour s'assurer que les requêtes sont invalidées
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['book', bookId] });
          queryClient.invalidateQueries({ queryKey: ['bookDetails', bookId] });
          queryClient.invalidateQueries({ queryKey: ['pressLinks', bookId] });
          queryClient.invalidateQueries({ queryKey: ['awards', bookId] });
          queryClient.invalidateQueries({ queryKey: ['editions', bookId] });
          
          if (!hasUpdatedRef.current) {
            console.log('Livre mis à jour avec succès');
            toast.success('Informations du livre mises à jour avec succès');
            hasUpdatedRef.current = true;
            setPreventUpdates(true);
          }
        }, 500);
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour des informations:', error);
      
      // Si l'erreur se produit avant le nombre maximum de tentatives, on peut réessayer
      if (updateAttempts < MAX_UPDATE_ATTEMPTS) {
        console.log(`Tentative de mise à jour échouée (${updateAttempts}/${MAX_UPDATE_ATTEMPTS}). Réessai...`);
        toast.info('Nouvelle tentative de mise à jour...');
        // La logique de réessai serait implémentée ici si nécessaire
      } else {
        if (!hasUpdatedRef.current) {
          toast.error('Erreur lors de la mise à jour des informations');
          hasUpdatedRef.current = true;
        }
        setPreventUpdates(true);
      }
    }
  });
  
  const forceUpdate = () => {
    // Réinitialise l'état pour permettre une nouvelle mise à jour
    hasUpdatedRef.current = false;
    setPreventUpdates(false);
    setUpdateAttempts(0);
    
    // Supprime ce livre des livres mis à jour dans la session
    if (bookId) {
      const updatedBooks = sessionStorage.getItem('updatedBooks') || '{}';
      const updatedBooksObj = JSON.parse(updatedBooks);
      delete updatedBooksObj[bookId];
      sessionStorage.setItem('updatedBooks', JSON.stringify(updatedBooksObj));
    }
  };
  
  return {
    updateBookMutation,
    preventUpdates,
    hasUpdatedRef,
    setPreventUpdates,
    forceUpdate
  };
};
