
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
  
  // Set the image URL for Brown Baby book
  const books = data || [];
  return books.map(book => {
    if (book.title === 'Brown Baby') {
      return {
        ...book,
        cover_image: '/lovable-uploads/6b9a47af-28b2-4799-9bf9-7416b5ff225b.png'
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
  
  // Set the image URL for Brown Baby book
  if (data && data.title === 'Brown Baby') {
    return {
      ...data,
      cover_image: '/lovable-uploads/6b9a47af-28b2-4799-9bf9-7416b5ff225b.png'
    };
  }
  
  return data;
};
