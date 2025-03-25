
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

export const updateBookDetails = async (bookId: string, details: Partial<BookDetail>): Promise<BookDetail | null> => {
  // Vérifier si les détails existent déjà
  const { data: existingData } = await supabase
    .from('book_details')
    .select('*')
    .eq('book_id', bookId)
    .maybeSingle();

  let result;
  
  if (existingData) {
    // Mettre à jour les détails existants
    const { data, error } = await supabase
      .from('book_details')
      .update({
        ...details,
        updated_at: new Date().toISOString()
      })
      .eq('book_id', bookId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating book details:', error);
      return null;
    }
    
    result = data;
  } else {
    // Créer de nouveaux détails
    const { data, error } = await supabase
      .from('book_details')
      .insert({
        book_id: bookId,
        ...details,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating book details:', error);
      return null;
    }
    
    result = data;
  }
  
  return result as BookDetail;
};

export const updateBook = async (bookId: string, bookData: Partial<Book>): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .update(bookData)
    .eq('id', bookId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating book:', error);
    return null;
  }
  
  return data as Book;
};

export const addPressLink = async (bookId: string, link: Omit<PressLink, 'id' | 'created_at'>): Promise<PressLink | null> => {
  const { data, error } = await supabase
    .from('press_links')
    .insert({
      book_id: bookId,
      url: link.url,
      label: link.label
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding press link:', error);
    return null;
  }
  
  return data as PressLink;
};

export const addAward = async (bookId: string, award: Omit<Award, 'id' | 'created_at'>): Promise<Award | null> => {
  const { data, error } = await supabase
    .from('awards')
    .insert({
      book_id: bookId,
      name: award.name,
      year: award.year
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding award:', error);
    return null;
  }
  
  return data as Award;
};

export const addEdition = async (bookId: string, edition: Omit<Edition, 'id' | 'created_at'>): Promise<Edition | null> => {
  const { data, error } = await supabase
    .from('editions')
    .insert({
      book_id: bookId,
      name: edition.name,
      publisher: edition.publisher,
      year: edition.year,
      language: edition.language
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding edition:', error);
    return null;
  }
  
  return data as Edition;
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

// Fonction pour mettre à jour toutes les informations d'un livre à partir d'un seul appel
export const updateCompleteBookInfo = async (
  bookId: string, 
  bookData: Partial<Book>, 
  detailsData: Partial<BookDetail>,
  pressLinks: Array<Omit<PressLink, 'id' | 'created_at'>>,
  awards: Array<Omit<Award, 'id' | 'created_at'>>,
  editions: Array<Omit<Edition, 'id' | 'created_at'>>
): Promise<boolean> => {
  try {
    // Mise à jour des données principales du livre
    if (Object.keys(bookData).length > 0) {
      const bookUpdateResult = await updateBook(bookId, bookData);
      if (!bookUpdateResult) {
        console.error('Failed to update book data');
        return false;
      }
    }
    
    // Mise à jour des détails du livre
    if (Object.keys(detailsData).length > 0) {
      const detailsUpdateResult = await updateBookDetails(bookId, detailsData);
      if (!detailsUpdateResult) {
        console.error('Failed to update book details');
        return false;
      }
    }
    
    // Ajout des liens de presse
    for (const link of pressLinks) {
      const pressLinkResult = await addPressLink(bookId, link);
      if (!pressLinkResult) {
        console.error('Failed to add press link:', link);
        // Continue even if one fails
      }
    }
    
    // Ajout des prix et distinctions
    for (const award of awards) {
      const awardResult = await addAward(bookId, award);
      if (!awardResult) {
        console.error('Failed to add award:', award);
        // Continue even if one fails
      }
    }
    
    // Ajout des éditions
    for (const edition of editions) {
      const editionResult = await addEdition(bookId, edition);
      if (!editionResult) {
        console.error('Failed to add edition:', edition);
        // Continue even if one fails
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateCompleteBookInfo:', error);
    return false;
  }
};
