
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
      categories(id, name, slug)
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
        cover_image: '/lovable-uploads/e68e18f1-3f5f-4aeb-8962-c6981d55dca7.png'
      };
    }
    return book;
  });
};

export const getBookById = async (bookId: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      categories(id, name, slug)
    `)
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
      cover_image: '/lovable-uploads/e68e18f1-3f5f-4aeb-8962-c6981d55dca7.png'
    };
  }
  
  return data;
};
