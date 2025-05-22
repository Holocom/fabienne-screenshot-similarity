
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/integrations/supabase/schema";
import { BookCover } from "./BookCover";

interface BookCardProps {
  book: Book;
  onImageError: (bookId: string, bookTitle: string, coverUrl: string | null) => string;
  coverErrors: Record<string, boolean>;
}

const BookCard: React.FC<BookCardProps> = ({ book, onImageError, coverErrors }) => (
  <div className="mb-5 break-inside-avoid">
    <Link
      to={`/books/${book.id}`}
      className="block relative group overflow-hidden bg-transparent rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full overflow-hidden">
        <BookCover
          src={book.cover_image}
          alt={book.title}
          bookId={book.id}
          bookTitle={book.title}
          onError={onImageError}
          coverErrors={coverErrors}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-serif text-base md:text-lg font-medium tracking-tight text-white mb-1 drop-shadow-md line-clamp-3">
          {book.title}
        </h3>
        {book.categories && (
          <p className="text-xs text-white/80 mt-1 drop-shadow-md">
            {book.categories.name}
          </p>
        )}
      </div>
    </Link>
  </div>
);

export default BookCard;
