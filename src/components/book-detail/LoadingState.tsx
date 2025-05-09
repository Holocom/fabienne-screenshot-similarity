
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Chargement...</p>
      </div>
    </div>
  );
};
