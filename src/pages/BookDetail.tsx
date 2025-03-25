
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById, getBookDetails, getPressLinks, getAwards, getEditions } from '@/services/bookService';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { BookDetail, PressLink, Award, Edition } from '@/integrations/supabase/schema';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  
  const { data: book, isLoading: isLoadingBook, error: bookError } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId
  });

  const { data: bookDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['bookDetails', bookId],
    queryFn: () => getBookDetails(bookId || ''),
    enabled: !!bookId
  });

  const { data: pressLinks = [], isLoading: isLoadingPressLinks } = useQuery({
    queryKey: ['pressLinks', bookId],
    queryFn: () => getPressLinks(bookId || ''),
    enabled: !!bookId
  });

  const { data: awards = [], isLoading: isLoadingAwards } = useQuery({
    queryKey: ['awards', bookId],
    queryFn: () => getAwards(bookId || ''),
    enabled: !!bookId
  });

  const { data: editions = [], isLoading: isLoadingEditions } = useQuery({
    queryKey: ['editions', bookId],
    queryFn: () => getEditions(bookId || ''),
    enabled: !!bookId
  });

  const isLoading = isLoadingBook || isLoadingDetails || isLoadingPressLinks || isLoadingAwards || isLoadingEditions;

  const fallbackDetails: BookDetail = {
    id: "temp-id",
    book_id: bookId || '',
    publisher: "Océan Jeunesse",
    illustrator: "Audrey Caron",
    year: "2025",
    pages: "48",
    isbn: "9782916533520",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const fallbackPressLinks: PressLink[] = [
    {
      id: "press-1",
      book_id: bookId || '',
      url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue",
      label: "Takamtikou - BNF",
      created_at: new Date().toISOString()
    },
    {
      id: "press-2",
      book_id: bookId || '',
      url: "http://www.encres-vagabondes.com/magazine/jonca.htm",
      label: "Encres Vagabondes",
      created_at: new Date().toISOString()
    }
  ];

  const details = bookDetails || fallbackDetails;
  const linksList = pressLinks.length > 0 ? pressLinks : fallbackPressLinks;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (bookError || !book) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Ce livre n'existe pas ou une erreur est survenue.</p>
          <Link to="/" className="mt-4 inline-block underline">
            Retour aux livres
          </Link>
        </div>
      </div>
    );
  }

  const updatedDescription = book.description || "Des dessins qui cachent des expressions et un jeu du pendu pour les retrouver en deux temps trois mouvements. Ce livre est une invitation aux jeux de mots. Un voyage au pays des expressions qui font le charme de notre langue. Langue que tu pourras donner au chat, si tu sèches sur la réponse.";

  const editorialText = `${book.categories?.name || "Jeunesse"} – illustré par ${details.illustrator || "Non spécifié"} – ${details.publisher || "Non spécifié"} – ${details.year || "2024"} – ${details.pages || "0"} pages`;

  const renderDescription = () => {
    if (!updatedDescription) return <p>Aucune description disponible pour ce livre.</p>;
    
    const paragraphs = updatedDescription.split('\n\n');
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 whitespace-pre-line">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 pt-2 pb-20 book-detail">
        <div className="mb-6 mt-0">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-[#ea384c] transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour aux livres
          </Link>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase mb-6 break-words hyphens-auto leading-tight">
            {book.title?.toUpperCase()}
          </h1>
          
          <div className="mb-10">
            <p className="editorial-info mb-0">
              {editorialText}
              {details.isbn && (
                <span className="block mt-0">
                  ISBN : {details.isbn}
                </span>
              )}
            </p>
          </div>
          
          <div className="description">
            {renderDescription()}
          </div>
          
          {linksList.length > 0 && (
            <div>
              <h3 className="press-title">PRESSE</h3>
              <ul className="space-y-2 list-none pl-0">
                {linksList.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="press-link"
                    >
                      {link.label || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {awards.length > 0 && (
            <div>
              <h3 className="awards-title">PRIX ET DISTINCTIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {awards.map((award, index) => (
                  <li key={index} className="award-item">
                    {award.name}{award.year ? ` (${award.year})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {editions.length > 0 && (
            <div>
              <h3 className="editions-title">ÉDITIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {editions.map((edition, index) => (
                  <li key={index} className="edition-item">
                    {edition.name}{edition.publisher ? `, ${edition.publisher}` : ''}{edition.year ? `, ${edition.year}` : ''}
                    {edition.language ? ` (${edition.language})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
