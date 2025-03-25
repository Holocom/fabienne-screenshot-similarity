
import { supabase } from "@/integrations/supabase/client";
import { Book } from "@/integrations/supabase/schema";

export const getBooks = async (categorySlug?: string): Promise<Book[]> => {
  console.log('Fetching books with category slug:', categorySlug);
  
  try {
    const { data: booksData, error: booksError } = await supabase
      .from('books')
      .select('*, categories(id, name, slug)');
    
    if (booksError) {
      console.error('Error fetching books:', booksError);
      return [];
    }

    let filteredBooks = booksData || [];
    console.log('Total books fetched:', filteredBooks.length);
    console.log('Books with cover images:', filteredBooks.filter(book => book.cover_image).length);
    
    if (categorySlug && categorySlug !== 'all') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      const categoryId = categoryData?.id;
      console.log('Category ID for slug', categorySlug, ':', categoryId);
      
      if (categoryId) {
        filteredBooks = filteredBooks.filter(book => book.category_id === categoryId);
        console.log('Books after category filtering:', filteredBooks.length);
      }
    }
    
    return filteredBooks as Book[];
  } catch (error) {
    console.error('Unexpected error in getBooks:', error);
    return [];
  }
};

export const getBookById = async (bookId: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq('id', bookId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }
  
  return data as Book;
};

export const updateBook = async (bookId: string, bookData: Partial<Book>): Promise<Book | null> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update(bookData)
      .eq('id', bookId)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error updating book:', error);
      return null;
    }
    
    if (!data) {
      console.warn(`No book found with ID: ${bookId}`);
      return null;
    }
    
    return data as Book;
  } catch (error) {
    console.error('Unexpected error in updateBook:', error);
    return null;
  }
};
