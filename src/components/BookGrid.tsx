
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
  // Données fictives pour les livres avec des images d'Unsplash
  const books: Book[] = [
    {
      id: 1,
      title: "Le Voyage de Norbert",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/le-voyage-de-norbert"
    },
    {
      id: 2,
      title: "Toute une Montagne",
      coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/toute-une-montagne"
    },
    {
      id: 3,
      title: "L'Immense Petite Maison",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/l-immense-petite-maison"
    },
    {
      id: 4,
      title: "La Ville en Fleurs",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/la-ville-en-fleurs"
    },
    {
      id: 5,
      title: "Pom Pom Bo Bo",
      coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/pom-pom-bo-bo"
    },
    {
      id: 6,
      title: "Nos Violences",
      coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/nos-violences"
    },
    {
      id: 7,
      title: "Notre Première Fête",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/notre-premiere-fete"
    },
    {
      id: 8,
      title: "Le Soleil d'en Face",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/le-soleil-d-en-face"
    },
    {
      id: 9,
      title: "Nos Amies les Bêtes",
      coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop&crop=faces,center",
      path: "/books/nos-amies-les-betes"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <Link key={book.id} to={book.path} className="block transition-transform hover:scale-105">
            <div className="book-cover aspect-[3/4] overflow-hidden rounded shadow-md">
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
