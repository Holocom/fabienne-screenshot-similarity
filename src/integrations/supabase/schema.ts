
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  category_id: string | null;
  cover_image: string | null;
  created_at: string;
  categories?: Category | null;
}
