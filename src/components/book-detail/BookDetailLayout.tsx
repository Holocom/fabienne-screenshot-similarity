
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';

interface BookDetailLayoutProps {
  children: React.ReactNode;
}

export const BookDetailLayout: React.FC<BookDetailLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container max-w-3xl mx-auto px-6 pt-2 pb-20 book-detail">
        <div className="mt-4">
          <div className="mb-6 mt-0">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#ea384c] transition-colors group">
              <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Retour aux livres
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
