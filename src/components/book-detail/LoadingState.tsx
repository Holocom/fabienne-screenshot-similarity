
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-[#ea384c] border-gray-200 rounded-full animate-spin"></div>
          <p className="text-lg font-sans">Chargement des informations...</p>
        </div>
      </div>
    </div>
  );
};
