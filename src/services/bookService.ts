import { supabase } from "@/integrations/supabase/client";
import { Book, Category, BookDetail, PressLink, Award, Edition } from "@/integrations/supabase/schema";

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
    .single();
  
  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }
  
  if (!data) return null;
  
  return data as Book;
};

export const getBookDetails = async (bookId: string): Promise<BookDetail | null> => {
  const { data, error } = await supabase
    .from('book_details')
    .select('*')
    .eq('book_id', bookId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
  
  return data as BookDetail;
};

export const getPressLinks = async (bookId: string): Promise<PressLink[]> => {
  const { data, error } = await supabase
    .from('press_links')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at');
  
  if (error) {
    console.error('Error fetching press links:', error);
    return [];
  }
  
  return data as PressLink[];
};

export const getAwards = async (bookId: string): Promise<Award[]> => {
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at');
  
  if (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
  
  return data as Award[];
};

export const getEditions = async (bookId: string): Promise<Edition[]> => {
  const { data, error } = await supabase
    .from('editions')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at');
  
  if (error) {
    console.error('Error fetching editions:', error);
    return [];
  }
  
  return data as Edition[];
};

export const checkImageUrl = async (url: string): Promise<boolean> => {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking image URL:', error);
    return false;
  }
};

export const getAvailableBookCovers = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .storage
      .from('bookcovers')
      .list('', { sortBy: { column: 'name', order: 'asc' } });
    
    if (error) {
      console.error('Error fetching book covers:', error);
      return [];
    }
    
    return data
      .filter(item => !item.id.endsWith('/')) // Filter out folders
      .map(item => {
        const url = supabase.storage
          .from('bookcovers')
          .getPublicUrl(item.name).data.publicUrl;
        
        return url;
      });
  } catch (error) {
    console.error('Error getting available book covers:', error);
    return [];
  }
};
