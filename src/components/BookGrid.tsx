
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Structure pour les livres
interface Book {
  id: number;
  title: string;
  coverImage: string;
  path: string;
  category: string;
}

const BookGrid = () => {
  const location = useLocation();
  const currentCategory = location.pathname.substring(1) || 'all';

  // Données fictives pour les livres - gardons uniquement Brown Baby
  const books: Book[] = [
    {
      id: 10,
      title: "Brown Baby",
      coverImage: "/lovable-uploads/6f865865-87e4-46f2-80e6-17ca6e53b868.png",
      path: "/books/brown-baby",
      category: "roman"
    }
  ];

  // Filtrer les livres en fonction de la catégorie actuelle
  const filteredBooks = currentCategory === 'all' 
    ? books 
    : books.filter(book => book.category === currentCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {filteredBooks.map((book) => (
          <Link key={book.id} to={book.path} className="block transition-transform hover:scale-105">
            <div className="book-cover aspect-[3/4] overflow-hidden relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="text-white text-sm md:text-base font-medium">{book.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
