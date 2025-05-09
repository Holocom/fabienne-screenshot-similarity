
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export const ErrorState: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-[#ea384c] text-5xl font-bold">!</div>
          <p className="text-lg">Ce livre n'existe pas ou une erreur est survenue.</p>
          <Link to="/" className="mt-4 inline-block underline text-[#ea384c] hover:text-[#c82d3e] transition-colors">
            Retour aux livres
          </Link>
        </div>
      </div>
    </div>
  );
};
