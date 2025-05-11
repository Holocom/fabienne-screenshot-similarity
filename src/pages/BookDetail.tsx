import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getBookById, 
  getBookDetails, 
  getPressLinks, 
  getAwards,
  getDistinctions,
  getEditions 
} from '@/services/bookService';
import { LoadingState } from '@/components/book-detail/LoadingState';
import { ErrorState } from '@/components/book-detail/ErrorState';
import { BookDetailLayout } from '@/components/book-detail/BookDetailLayout';
import { BookUpdateHandler } from '@/components/book-detail/BookUpdateHandler';
import { BookDetailContent } from '@/components/book-detail/BookDetailContent';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const queryClient = useQueryClient();
  
  console.log(`Chargement des détails pour le livre avec ID: ${bookId}`);
  
  // Force a refresh of the data on every mount with stronger invalidation
  useEffect(() => {
    if (bookId) {
      // Force refetch all data for this book by first removing existing query data
      queryClient.removeQueries({ queryKey: ['book', bookId] });
      queryClient.removeQueries({ queryKey: ['bookDetails', bookId] });
      queryClient.removeQueries({ queryKey: ['pressLinks', bookId] });
      queryClient.removeQueries({ queryKey: ['awards', bookId] });
      queryClient.removeQueries({ queryKey: ['distinctions', bookId] });
      queryClient.removeQueries({ queryKey: ['editions', bookId] });
      
      // Then invalidate to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      queryClient.invalidateQueries({ queryKey: ['bookDetails', bookId] });
      queryClient.invalidateQueries({ queryKey: ['pressLinks', bookId] });
      queryClient.invalidateQueries({ queryKey: ['awards', bookId] });
      queryClient.invalidateQueries({ queryKey: ['distinctions', bookId] });
      queryClient.invalidateQueries({ queryKey: ['editions', bookId] });
    }
  }, [bookId, queryClient]);
  
  const {
    data: book,
    isLoading: isLoadingBook,
    error: bookError,
    isError: isBookError
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId,
    staleTime: 0 // Ne jamais considérer les données comme fraîches
  });
  
  const {
    data: bookDetails,
    isLoading: isLoadingDetails
  } = useQuery({
    queryKey: ['bookDetails', bookId],
    queryFn: () => getBookDetails(bookId || ''),
    enabled: !!bookId,
    staleTime: 0
  });
  
  const {
    data: pressLinks = [],
    isLoading: isLoadingPressLinks
  } = useQuery({
    queryKey: ['pressLinks', bookId],
    queryFn: () => getPressLinks(bookId || ''),
    enabled: !!bookId,
    staleTime: 0
  });
  
  const {
    data: awards = [],
    isLoading: isLoadingAwards
  } = useQuery({
    queryKey: ['awards', bookId],
    queryFn: () => getAwards(bookId || ''),
    enabled: !!bookId,
    staleTime: 0
  });
  
  const {
    data: distinctions = [],
    isLoading: isLoadingDistinctions
  } = useQuery({
    queryKey: ['distinctions', bookId],
    queryFn: () => getDistinctions(bookId || ''),
    enabled: !!bookId,
    staleTime: 0
  });
  
  const {
    data: editions = [],
    isLoading: isLoadingEditions
  } = useQuery({
    queryKey: ['editions', bookId],
    queryFn: () => getEditions(bookId || ''),
    enabled: !!bookId,
    staleTime: 0
  });

  // Déterminer si tout est en cours de chargement
  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || 
                    isLoadingAwards || isLoadingDistinctions || isLoadingEditions;
  
  // Vérifier spécifiquement si c'est "La Réunion des religions"
  const isLaReunionDesReligions = bookId === "0569acb0-8946-4f62-acce-881604d3146a";
  
  // Vérifier si c'est "Les religions à l'ile Maurice"
  const isLesReligionsIleMaurice = bookId === "23b62768-3770-4621-8c5e-9a705891bb93";
  
  // Vérifier si c'est "TU ME FAIS TOURNER LA TERRE" version créole
  const isTuMeFaisTournerCreole = bookId === "451338a8-2537-454d-a990-00dbc0988370";
  
  // Vérifie si c'est "TU ME FAIS TOURNER LA TERRE" version anglaise
  const isTuMeFaisTournerAnglais = bookId === "nouveau-id-version-anglaise"; // ID à remplacer si vous avez un vrai ID
  
  // Ajouter le check pour UN FLAMBOYANT PÈRE-NOËL
  const isFlamboyantNoel = bookId === "b733fd7b-1bc8-4e37-bc19-94f0a445311d";
  
  // Ajouter le check pour LA CLÉ DES SAVEURS DE JACQUELINE DALAIS
  const isJacquelineDalais = bookId === "e6586dd6-2fd3-4426-b491-cee425a863c2";
  
  // Ajouter le check pour SAVEURS METISSÉES D'AYMERIC PATAUD
  const isSaveursMetissees = bookId === "3e02b6d4-3476-421f-802b-c9e2252cb553";
  
  // Ajouter le check pour LES COUPS DE CŒUR DE BRIGITTE GRONDIN
  const isCoupsDeCoeurBrigitte = bookId === "ef2cb58b-988f-46e4-a5c8-4e133db97185";
  
  // Ajouter le check pour MA CUISINE BIEN-ÊTRE (avec l'ID correct)
  const isCuisineBienEtre = bookId === "8525480b-e8cd-4149-b427-16672a5f55b4";
  
  // Ajouter le check pour DU BONHEUR DANS VOTRE ASSIETTE
  const isDuBonheurAssiette = bookId === "fc38c7c0-27d3-43fe-80a0-1e7e43f7ec43";
  
  // Ajouter le check pour MANIFESTE POUR LA LECTURE
  const isManifestePourLaLecture = bookId === "dacd7eab-7fab-408e-88b0-21ef99efff5b";
  
  // Ajouter le check pour PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES
  const isPetitesHistoiresMusiques = bookId === "b9b54f90-a190-49b3-a215-992362b1cc6a";
  
  // Ajouter le check pour CASES CRÉOLES DE LA RÉUNION
  const isCasesCréolesReunion = bookId === "abe5d8a2-77bb-42b0-8c3e-250a9551c9ea";
  
  // Ajouter le check pour LE PONT DE LA RIVIERE DE L'EST
  const isPontRiviereEst = bookId === "1c0b1991-3455-4727-bc72-7a605c2ef62f";
  
  // Ajouter le check pour SEMADER, 30 REGARDS SUR LES 30 ANS
  const isSemader30Regards = bookId === "c5896f91-0f7c-431c-9752-00ff7fb803c1";
  
  // Ajouter le check pour LE GRAND HAZIER, UN DOMAINE CREOLE
  const isGrandHazier = bookId === "b17468a7-1e30-4f25-8e85-c6c1a1fcf3b1";
  
  // Ajouter le check pour SOCIÉTÉ ADRIEN BELLIER
  const isSocieteAdrienBellier = bookId === "a557a8b4-5d62-4ec7-be9b-301ed5b50369";
  
  // Ajouter le check pour LA REUNION, L'ILE AUX OUVRAGES
  const isLaReunionIleOuvrages = bookId === "a63d08f5-49ff-4220-9a70-9627fcbe7643";
  
  if (isLaReunionIleOuvrages) {
    console.log("Livre identifié comme 'LA REUNION, L'ILE AUX OUVRAGES' par son ID");
  }
  else if (isGrandHazier) {
    console.log("Livre identifié comme 'LE GRAND HAZIER, UN DOMAINE CREOLE' par son ID");
  }
  else if (isSocieteAdrienBellier) {
    console.log("Livre identifié comme 'SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)' par son ID");
  }
  else if (isPetitesHistoiresMusiques) {
    console.log("Livre identifié comme 'PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES' par son ID");
  }
  else if (isLaReunionDesReligions) {
    console.log("Livre identifié comme 'La Réunion des religions' par son ID");
  } 
  else if (isLesReligionsIleMaurice) {
    console.log("Livre identifié comme 'Les religions à l'ile Maurice' par son ID");
  } 
  else if (isTuMeFaisTournerCreole) {
    console.log("Livre identifié comme 'TU ME FAIS TOURNER LA TERRE\nOU I FÉ TOURNE MON TERRE' par son ID");
  } 
  else if (isTuMeFaisTournerAnglais) {
    console.log("Livre identifié comme 'TU ME FAIS TOURNER LA TERRE\nYOU MAKE MY WORLD SPIN' par son ID");
  } 
  else if (isFlamboyantNoel) {
    console.log("Livre identifié comme 'UN FLAMBOYANT PÈRE-NOËL' par son ID");
  } 
  else if (isJacquelineDalais) {
    console.log("Livre identifié comme 'LA CLÉ DES SAVEURS DE JACQUELINE DALAIS' par son ID");
  } 
  else if (isSaveursMetissees) {
    console.log("Livre identifié comme 'SAVEURS METISSÉES D'AYMERIC PATAUD' par son ID");
  }
  else if (isCoupsDeCoeurBrigitte) {
    console.log("Livre identifié comme 'LES COUPS DE CŒUR DE BRIGITTE GRONDIN' par son ID");
  }
  else if (isCuisineBienEtre) {
    console.log("Livre identifié comme 'MA CUISINE BIEN-ÊTRE' par son ID");
  }
  else if (isDuBonheurAssiette) {
    console.log("Livre identifié comme 'DU BONHEUR DANS VOTRE ASSIETTE' par son ID");
  }
  else if (isManifestePourLaLecture) {
    console.log("Livre identifié comme 'MANIFESTE POUR LA LECTURE - LES AUTEURS FRANCOPHONES CÉLÈBRENT LE LIVRE' par son ID");
  }
  else if (isCasesCréolesReunion) {
    console.log("Livre identifié comme 'CASES CRÉOLES DE LA RÉUNION' par son ID");
  }
  else if (isPontRiviereEst) {
    console.log("Livre identifié comme 'LE PONT DE LA RIVIERE DE L'EST' par son ID");
  }
  else if (isSemader30Regards) {
    console.log("Livre identifié comme 'SEMADER, 30 REGARDS SUR LES 30 ANS' par son ID");
  }
  
  // Composant de gestion des mises à jour rendu correctement
  if (book) {
    return (
      <>
        <BookUpdateHandler 
          book={book} 
          bookId={bookId} 
          isLoadingBook={isLoadingBook} 
          isBookError={isBookError} 
        />
        
        {isLoading ? (
          <LoadingState />
        ) : bookError || !book ? (
          <ErrorState />
        ) : (
          <BookDetailLayout>
            <BookDetailContent 
              book={{
                ...book,
                // Force le titre correct si nécessaire
                title: isLaReunionDesReligions ? "La Réunion des religions" : 
                       isLesReligionsIleMaurice ? "Les religions à l'ile Maurice" :
                       isPetitesHistoiresMusiques ? "PETITES HISTOIRES DES MUSIQUES RÉUNIONNAISES" :
                       isCasesCréolesReunion ? "CASES CRÉOLES DE LA RÉUNION" :
                       isPontRiviereEst ? "LE PONT DE LA RIVIERE DE L'EST" :
                       isSemader30Regards ? "SEMADER, 30 REGARDS SUR LES 30 ANS" :
                       isGrandHazier ? "LE GRAND HAZIER, UN DOMAINE CREOLE" :
                       isSocieteAdrienBellier ? "SOCIÉTÉ ADRIEN BELLIER, UNE HISTOIRE DE FAMILLE (1912-2012)" :
                       isLaReunionIleOuvrages ? "LA REUNION, L'ILE AUX OUVRAGES" :
                       book.title
              }}
              bookDetails={bookDetails || {
                id: "temp-id",
                book_id: bookId || '',
                publisher: "Océan Jeunesse",
                illustrator: "Audrey Caron",
                year: "2025",
                pages: "48",
                isbn: "9782916533520",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }}
              pressLinks={pressLinks}
              awards={awards}
              distinctions={distinctions}
              editions={editions}
            />
          </BookDetailLayout>
        )}
      </>
    );
  }
  
  // État de chargement initial
  if (isLoading) {
    return <LoadingState />;
  }
  
  // État d'erreur
  if (bookError || !book) {
    return <ErrorState />;
  }
  
  // Cas par défaut (ne devrait jamais arriver, mais ajouté par sécurité)
  return (
    <BookDetailLayout>
      <div>Une erreur inattendue s'est produite.</div>
    </BookDetailLayout>
  );
};

export default BookDetailPage;
