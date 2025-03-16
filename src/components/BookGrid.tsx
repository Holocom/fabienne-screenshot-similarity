
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

  // Données fictives pour les livres - gardez uniquement ceux avec des images similaires à "Le Voyage de Norbert"
  const books: Book[] = [
    {
      id: 1,
      title: "Le Voyage de Norbert",
      coverImage: "https://via.placeholder.com/300x400/e0f0e0/000000?text=Le+Voyage+de+Norbert",
      path: "/books/le-voyage-de-norbert",
      category: "jeunesse"
    },
    {
      id: 2,
      title: "Toute une Montagne",
      coverImage: "https://via.placeholder.com/300x400/f0e0e0/000000?text=Toute+une+Montagne",
      path: "/books/toute-une-montagne",
      category: "jeunesse"
    },
    {
      id: 3,
      title: "L'Immense Petite Maison",
      coverImage: "https://via.placeholder.com/300x400/e0e0f0/000000?text=L'Immense+Petite+Maison",
      path: "/books/l-immense-petite-maison",
      category: "art"
    },
    {
      id: 4,
      title: "La Ville en Fleurs",
      coverImage: "https://via.placeholder.com/300x400/f0f0e0/000000?text=La+Ville+en+Fleurs",
      path: "/books/la-ville-en-fleurs",
      category: "cuisine"
    },
    {
      id: 5,
      title: "Pom Pom Bo Bo",
      coverImage: "https://via.placeholder.com/300x400/e0f0f0/000000?text=Pom+Pom+Bo+Bo",
      path: "/books/pom-pom-bo-bo",
      category: "jeunesse"
    },
    {
      id: 6,
      title: "Nos Violences",
      coverImage: "https://via.placeholder.com/300x400/f0e0f0/000000?text=Nos+Violences",
      path: "/books/nos-violences",
      category: "collectifs"
    },
    {
      id: 7,
      title: "Notre Première Fête",
      coverImage: "https://via.placeholder.com/300x400/e0e0e0/000000?text=Notre+Première+Fête",
      path: "/books/notre-premiere-fete",
      category: "commandes"
    },
    {
      id: 8,
      title: "Le Soleil d'en Face",
      coverImage: "https://via.placeholder.com/300x400/f0f0f0/000000?text=Le+Soleil+d'en+Face",
      path: "/books/le-soleil-d-en-face",
      category: "roman"
    },
    {
      id: 9,
      title: "Nos Amies les Bêtes",
      coverImage: "https://via.placeholder.com/300x400/e0f0f0/000000?text=Nos+Amies+les+Bêtes",
      path: "/books/nos-amies-les-betes",
      category: "jeunesse"
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
