
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookCategories from '../components/BookCategories';
import BookGrid from '../components/BookGrid';
import { useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryPage = () => {
  const location = useLocation();
  const isRomanCategory = location.pathname.includes('/roman');
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <Navigation />
      <main className="flex-1 w-full flex flex-col items-center pb-8">
        <BookCategories />
        
        {isRomanCategory && (
          <div className="w-full max-w-7xl mx-auto px-4 mb-8">
            <div className="flex flex-col md:flex-row gap-6 bg-beige p-6 rounded-lg">
              <div className="w-full md:w-1/3 flex justify-center">
                <img 
                  src="https://ygsqgosylxoiqikxlsil.supabase.co/storage/v1/object/public/bookcovers/brown-baby.jpg"
                  alt="Brown Baby"
                  className="w-auto h-auto max-h-[450px] object-contain"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col">
                <h2 className="text-2xl font-serif font-bold mb-2">Brown Baby</h2>
                <p className="text-[#ea384c] text-lg mb-4">
                  PRIX SELIGMANN CONTRE LE RACISME<br />
                  PRIX VANILLE 2024
                </p>
                <div className="prose max-w-none mb-4">
                  <p>
                    Brown Baby est le premier roman de Fabienne Jonca. Il dépeint avec sensibilité l'histoire d'une jeune femme à la recherche de ses origines, entre La Réunion et l'Inde.
                  </p>
                </div>
                <Link 
                  to="/books/brown-baby" 
                  className="inline-flex items-center text-[#ea384c] hover:underline mt-auto self-start"
                >
                  Voir plus de détails 
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <BookGrid />
      </main>
      <footer className="w-full py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fabienne Jonca. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default CategoryPage;
