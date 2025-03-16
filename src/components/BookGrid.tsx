
import React from 'react';
import { Link } from 'react-router-dom';

// Structure pour les livres
interface Book {
  id: number;
  title: string;
  coverImage: string;
  path: string;
}

const BookGrid = () => {
  // Données fictives pour les livres
  const books: Book[] = [
    {
      id: 1,
      title: "Le Voyage de Norbert",
      coverImage: "https://via.placeholder.com/300x400/e0f0e0/000000?text=Le+Voyage+de+Norbert",
      path: "/books/le-voyage-de-norbert"
    },
    {
      id: 2,
      title: "Toute une Montagne",
      coverImage: "https://via.placeholder.com/300x400/f0e0e0/000000?text=Toute+une+Montagne",
      path: "/books/toute-une-montagne"
    },
    {
      id: 3,
      title: "L'Immense Petite Maison",
      coverImage: "https://via.placeholder.com/300x400/e0e0f0/000000?text=L'Immense+Petite+Maison",
      path: "/books/l-immense-petite-maison"
    },
    {
      id: 4,
      title: "La Ville en Fleurs",
      coverImage: "https://via.placeholder.com/300x400/f0f0e0/000000?text=La+Ville+en+Fleurs",
      path: "/books/la-ville-en-fleurs"
    },
    {
      id: 5,
      title: "Pom Pom Bo Bo",
      coverImage: "https://via.placeholder.com/300x400/e0f0f0/000000?text=Pom+Pom+Bo+Bo",
      path: "/books/pom-pom-bo-bo"
    },
    {
      id: 6,
      title: "Nos Violences",
      coverImage: "https://via.placeholder.com/300x400/f0e0f0/000000?text=Nos+Violences",
      path: "/books/nos-violences"
    },
    {
      id: 7,
      title: "Notre Première Fête",
      coverImage: "https://via.placeholder.com/300x400/e0e0e0/000000?text=Notre+Première+Fête",
      path: "/books/notre-premiere-fete"
    },
    {
      id: 8,
      title: "Le Soleil d'en Face",
      coverImage: "https://via.placeholder.com/300x400/f0f0f0/000000?text=Le+Soleil+d'en+Face",
      path: "/books/le-soleil-d-en-face"
    },
    {
      id: 9,
      title: "Nos Amies les Bêtes",
      coverImage: "https://via.placeholder.com/300x400/e0f0f0/000000?text=Nos+Amies+les+Bêtes",
      path: "/books/nos-amies-les-betes"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <Link key={book.id} to={book.path} className="block transition-transform hover:scale-105">
            <div className="book-cover aspect-[3/4] overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
