
import { supabase } from "@/integrations/supabase/client";
import { Book, Category } from "@/integrations/supabase/schema";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
};

export const getBooks = async (categorySlug?: string): Promise<Book[]> => {
  let query = supabase
    .from('books')
    .select(`
      *,
      categories(slug)
    `);
  
  if (categorySlug && categorySlug !== 'all') {
    // Join with categories and filter by slug
    query = query.eq('categories.slug', categorySlug);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }
  
  // Traitement des livres - utiliser l'image téléchargée pour Brown Baby
  const books = data || [];
  return books.map(book => {
    if (book.title === 'Brown Baby') {
      return {
        ...book,
        cover_image: '/lovable-uploads/319be82b-86a9-4f0d-94d0-9c7355cf57f9.png'
      };
    }
    return book;
  });
};

export const getBookById = async (bookId: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();
  
  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }
  
  // Traitement spécial pour Brown Baby - utiliser l'image téléchargée
  if (data && data.title === 'Brown Baby') {
    return {
      ...data,
      cover_image: '/lovable-uploads/319be82b-86a9-4f0d-94d0-9c7355cf57f9.png'
    };
  }
  
  return data;
};
