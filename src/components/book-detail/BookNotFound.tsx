
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { BookX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookNotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <BookX size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Livre introuvable</h2>
          <p className="text-gray-600 mb-6">
            Ce livre n'existe pas ou une erreur est survenue lors du chargement des données.
          </p>
          <Button asChild>
            <Link to="/">
              Retour à la bibliothèque
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookNotFound;
