
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  category_id: string | null;
  cover_image: string | null;
  created_at: string;
  slug?: string | null; // <-- Added slug here
  categories?: Category | null;
}

export interface BookDetail {
  id: string;
  book_id: string;
  publisher: string | null;
  illustrator: string | null;
  year: string | null;
  pages: string | null;
  isbn: string | null;
  created_at: string;
  updated_at: string;
}

export interface PressLink {
  id: string;
  book_id: string;
  url: string;
  label: string | null;
  created_at: string;
}

export interface Award {
  id: string;
  book_id: string;
  name: string;
  year: string | null;
  created_at: string;
}

export interface Edition {
  id: string;
  book_id: string;
  name: string;
  created_at: string;
}
