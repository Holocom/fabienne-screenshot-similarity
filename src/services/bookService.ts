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
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }
  
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
  try {
    const { data, error } = await supabase
      .from('press_links')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at');
    
    if (error) {
      console.error('Error fetching press links:', error);
      return [];
    }
    
    // Déduplication par URL pour éviter les doublons en base de données
    const uniqueUrls = new Set();
    const uniqueData = data.filter(link => {
      if (uniqueUrls.has(link.url)) {
        return false;
      }
      uniqueUrls.add(link.url);
      return true;
    });
    
    return uniqueData as PressLink[];
  } catch (error) {
    console.error('Unexpected error in getPressLinks:', error);
    return [];
  }
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
      .maybeSingle();
    
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

export const addPressLink = async (bookId: string, link: Omit<PressLink, 'id' | 'created_at'>): Promise<PressLink | null> => {
  try {
    // Vérifier si un lien avec la même URL existe déjà
    const { data: existingLinks } = await supabase
      .from('press_links')
      .select('*')
      .eq('book_id', bookId)
      .eq('url', link.url);
    
    if (existingLinks && existingLinks.length > 0) {
      console.log(`Press link with URL ${link.url} already exists, skipping.`);
      return existingLinks[0] as PressLink;
    }
    
    const { data, error } = await supabase
      .from('press_links')
      .insert({
        book_id: bookId,
        url: link.url,
        label: link.label
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error adding press link:', error);
      return null;
    }
    
    return data as PressLink;
  } catch (error) {
    console.error('Unexpected error in addPressLink:', error);
    return null;
  }
};

export const addAward = async (bookId: string, award: Omit<Award, 'id' | 'created_at'>): Promise<Award | null> => {
  try {
    // Vérifier si un prix avec le même nom et la même année existe déjà
    const { data: existingAwards } = await supabase
      .from('awards')
      .select('*')
      .eq('book_id', bookId)
      .eq('name', award.name);
    
    const awardExists = existingAwards?.some(
      existing => existing.year === award.year
    );
    
    if (awardExists) {
      console.log(`Award "${award.name}" (${award.year}) already exists, skipping.`);
      return existingAwards.find(
        existing => existing.year === award.year
      ) as Award;
    }
    
    const { data, error } = await supabase
      .from('awards')
      .insert({
        book_id: bookId,
        name: award.name,
        year: award.year
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error adding award:', error);
      return null;
    }
    
    return data as Award;
  } catch (error) {
    console.error('Unexpected error in addAward:', error);
    return null;
  }
};

export const addEdition = async (bookId: string, edition: Omit<Edition, 'id' | 'created_at'>): Promise<Edition | null> => {
  try {
    // Vérifier si une édition avec le même nom existe déjà
    const { data: existingEditions } = await supabase
      .from('editions')
      .select('*')
      .eq('book_id', bookId)
      .eq('name', edition.name);
    
    if (existingEditions && existingEditions.length > 0) {
      console.log(`Edition "${edition.name}" already exists, skipping.`);
      return existingEditions[0] as Edition;
    }
    
    const { data, error } = await supabase
      .from('editions')
      .insert({
        book_id: bookId,
        name: edition.name
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('Error adding edition:', error);
      return null;
    }
    
    return data as Edition;
  } catch (error) {
    console.error('Unexpected error in addEdition:', error);
    return null;
  }
};

export const getAwards = async (bookId: string): Promise<Award[]> => {
  try {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at');
    
    if (error) {
      console.error('Error fetching awards:', error);
      return [];
    }
    
    // Déduplication par nom et année pour éviter les doublons en base de données
    const uniqueKeys = new Set();
    const uniqueData = data.filter(award => {
      const key = `${award.name}-${award.year}`;
      if (uniqueKeys.has(key)) {
        return false;
      }
      uniqueKeys.add(key);
      return true;
    });
    
    return uniqueData as Award[];
  } catch (error) {
    console.error('Unexpected error in getAwards:', error);
    return [];
  }
};

export const getEditions = async (bookId: string): Promise<Edition[]> => {
  try {
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at');
    
    if (error) {
      console.error('Error fetching editions:', error);
      return [];
    }
    
    // Déduplication par nom pour éviter les doublons en base de données
    const uniqueNames = new Set();
    const uniqueData = data.filter(edition => {
      if (uniqueNames.has(edition.name)) {
        return false;
      }
      uniqueNames.add(edition.name);
      return true;
    });
    
    return uniqueData as Edition[];
  } catch (error) {
    console.error('Unexpected error in getEditions:', error);
    return [];
  }
};

export const checkImageUrl = async (url: string): Promise<boolean> => {
  if (!url) return false;
  
  try {
    // Pour les URLs locales commençant par 'public/', ajuster le chemin
    const adjustedUrl = url.startsWith('public/') 
      ? url.replace('public/', '/') 
      : url;
    
    const response = await fetch(adjustedUrl, { method: 'HEAD' });
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

export const updateCompleteBookInfo = async (
  bookId: string, 
  bookData: Partial<Book>, 
  detailsData: Partial<BookDetail>,
  pressLinks: Array<Omit<PressLink, 'id' | 'created_at'>>,
  awards: Array<Omit<Award, 'id' | 'created_at'>>,
  editions: Array<Omit<Edition, 'id' | 'created_at'>>
): Promise<boolean> => {
  try {
    console.log("Updating book info for:", bookId);
    console.log("Book data:", bookData);
    console.log("Details data:", detailsData);
    console.log("Press links:", pressLinks);
    
    // Mise à jour des données principales du livre
    if (Object.keys(bookData).length > 0) {
      const bookUpdateResult = await updateBook(bookId, bookData);
      if (!bookUpdateResult) {
        console.warn('Failed to update book data for ID:', bookId);
        // Continue processing rather than failing completely
      } else {
        console.log("Book data updated successfully");
      }
    }
    
    // Mise à jour des détails du livre
    if (Object.keys(detailsData).length > 0) {
      const detailsUpdateResult = await updateBookDetails(bookId, detailsData);
      if (!detailsUpdateResult) {
        console.warn('Failed to update book details for ID:', bookId);
        // Continue processing
      } else {
        console.log("Book details updated successfully");
      }
    }
    
    // Suppression des liens de presse existants pour le livre "AS-TU LA LANGUE BIEN PENDUE ?"
    // et uniquement pour ce livre, afin d'éviter les doublons
    if (pressLinks.length > 0) {
      const { data: existingLinks } = await supabase
        .from('press_links')
        .select('*')
        .eq('book_id', bookId);
      
      console.log("Existing press links:", existingLinks?.length || 0);
      
      // Ajout des liens de presse
      let addedPressLinks = 0;
      for (const link of pressLinks) {
        const pressLinkResult = await addPressLink(bookId, link);
        if (pressLinkResult) addedPressLinks++;
      }
      console.log(`Added ${addedPressLinks}/${pressLinks.length} press links`);
    }
    
    // Ajout des prix et distinctions
    let addedAwards = 0;
    for (const award of awards) {
      const awardResult = await addAward(bookId, award);
      if (awardResult) addedAwards++;
    }
    console.log(`Added ${addedAwards}/${awards.length} awards`);
    
    // Ajout des éditions
    let addedEditions = 0;
    for (const edition of editions) {
      const editionResult = await addEdition(bookId, edition);
      if (editionResult) addedEditions++;
    }
    console.log(`Added ${addedEditions}/${editions.length} editions`);
    
    return true;
  } catch (error) {
    console.error('Error in updateCompleteBookInfo:', error);
    return false;
  }
};
