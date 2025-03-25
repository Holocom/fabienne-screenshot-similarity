
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/services/bookService';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

type BookInfo = {
  publisher?: string;
  illustrator?: string;
  year?: string;
  pages?: string;
  isbn?: string;
  press_links?: { url: string; label: string }[];
  awards?: string[];
};

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId || ''),
    enabled: !!bookId
  });

  // Information éditoriale fictive pour la démonstration
  // Dans une version réelle, ces données viendraient de la base de données
  const bookInfo: BookInfo = {
    publisher: "Océan Jeunesse",
    illustrator: "Audrey Caron",
    year: "2025",
    pages: "48",
    isbn: "9782916533520",
    press_links: [
      { url: "https://takamtikou.bnf.fr/bibliographies/notices/ocean-indien/tu-la-langue-bien-pendue", label: "Takamtikou BnF" },
      { url: "http://www.encres-vagabondes.com/magazine/jonca.htm", label: "Encres Vagabondes" }
    ],
    awards: ["Prix Vanille 2025"]
  };

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

  if (error || !book) {
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

  // Construction du texte éditorial
  const editorialText = `${book.categories?.name || "Jeunesse"} – illustré par ${bookInfo.illustrator || "Non spécifié"} – ${bookInfo.publisher || "Non spécifié"} – ${bookInfo.year || "2024"} – ${bookInfo.pages || "0"} pages`;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 py-20 book-detail">
        <Link to="/" className="mb-8 inline-block text-sm hover:underline">
          &larr; Retour aux livres
        </Link>
        
        <div className="mt-12">
          <h1>{book.title?.toUpperCase()}</h1>
          
          <div className="mb-10">
            <p className="editorial-info mb-0">
              {editorialText}
            </p>
            
            {bookInfo.isbn && (
              <p className="editorial-info mt-1">
                ISBN : {bookInfo.isbn}
              </p>
            )}
          </div>
          
          <div className="description">
            <p>{book.description || "Aucune description disponible pour ce livre."}</p>
          </div>
          
          {(bookInfo.press_links && bookInfo.press_links.length > 0) && (
            <div>
              <h3 className="press-title">PRESSE</h3>
              <ul className="space-y-2 list-none pl-0">
                {bookInfo.press_links.map((link, index) => (
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
          
          {(bookInfo.awards && bookInfo.awards.length > 0) && (
            <div>
              <h3 className="awards-title">PRIX ET DISTINCTIONS</h3>
              <ul className="space-y-1 list-none pl-0">
                {bookInfo.awards.map((award, index) => (
                  <li key={index} className="award-item">
                    {award}
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

export default BookDetail;
