
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
  
  // Process the books to ensure they conform to our interface
  return (data || []).map(book => {
    // Format the cover image URL
    const coverImage = formatImageUrl(book.cover_image);
    
    return {
      ...book,
      cover_image: coverImage
    } as Book;
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
  
  if (!data) return null;
  
  // Format the cover image URL
  const coverImage = formatImageUrl(data.cover_image);
  
  return {
    ...data,
    cover_image: coverImage
  } as Book;
};

// Helper function to format image URLs
const formatImageUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // Handle different URL patterns
  if (url.startsWith('public/') || url.startsWith('/public/')) {
    // Remove 'public/' prefix for storage URLs
    const cleanedUrl = url.replace(/^(\/)?public\//, '');
    return cleanedUrl;
  }
  
  // Handle fully formed URLs or special cases like Lovable uploads
  if (url.startsWith('/lovable-uploads/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Default case
  return url;
};
