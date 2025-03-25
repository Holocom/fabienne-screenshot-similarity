
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

const BookNotFound = () => {
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
};

export default BookNotFound;
