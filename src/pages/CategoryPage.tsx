
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookCategories from '../components/BookCategories';
import BookGrid from '../components/BookGrid';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/services/bookService';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const location = useLocation();
  const currentCategory = location.pathname.substring(1);
  
  // Check if we're on the Roman category page
  const isRomanCategoryPage = currentCategory === 'roman';
  
  // If we're on the Roman category page, fetch Brown Baby book data
  const {
    data: brownBabyBook,
    isLoading: isLoadingBrownBaby,
  } = useQuery({
    queryKey: ['book', 'brownBaby'],
    queryFn: () => getBookById('0e2076f3-db50-4b64-ad3e-a8fb3d5b3308'), // Brown Baby book ID
    enabled: isRomanCategoryPage
  });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <Navigation />
      <main className="flex-1 w-full flex flex-col items-center pb-8">
        <BookCategories />
        
        {/* Show Brown Baby featured section for Roman category */}
        {isRomanCategoryPage && brownBabyBook && (
          <div className="w-full max-w-6xl mx-auto px-4 mb-12 mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/lovable-uploads/b0c162d3-58ba-40a7-842d-f0082b0b094f.png"
                    alt="Couverture Brown Baby"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
                <h2 className="text-2xl font-serif font-medium mb-2">{brownBabyBook.title}</h2>
                <p className="text-red-500 mb-4">Roman - Atelier des Nomades - 2024 - 264 pages<br />EAN : 9782919300716</p>
                <div className="mb-4 prose prose-sm max-w-none">
                  <p>{brownBabyBook.description?.substring(0, 300)}...</p>
                </div>
                <div className="mt-auto">
                  <div className="mb-2">
                    <strong>Prix et distinctions :</strong>
                    <p>Prix Seligmann contre le racisme 2024</p>
                  </div>
                  <Link 
                    to={`/books/${brownBabyBook.id}`} 
                    className="inline-block text-sm text-white bg-[#ea384c] hover:bg-[#d41d31] transition-colors px-4 py-2 rounded"
                  >
                    Voir plus de détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Regular book grid - exclude Brown Baby from the Roman category */}
        <BookGrid excludeBookId={isRomanCategoryPage ? '0e2076f3-db50-4b64-ad3e-a8fb3d5b3308' : undefined} />
      </main>
      <footer className="w-full py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fabienne Jonca. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default CategoryPage;
