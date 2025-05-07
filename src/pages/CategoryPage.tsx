
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookCategories from '../components/BookCategories';
import BookGrid from '../components/BookGrid';

const CategoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <Navigation />
      <main className="flex-1 w-full max-w-7xl flex flex-col items-center px-3">
        <BookCategories />
        <BookGrid />
      </main>
      <footer className="w-full py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fabienne Jonca. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default CategoryPage;
