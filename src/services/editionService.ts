
import { supabase } from "@/integrations/supabase/client";
import { Edition } from "@/integrations/supabase/schema";

export const getEditions = async (bookId: string): Promise<Edition[]> => {
  try {
    console.log(`Fetching editions for book ID: ${bookId}`);
    
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('book_id', bookId)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching editions:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log(`No editions found for book ID: ${bookId}`);
      return [];
    }
    
    console.log(`Found ${data.length} editions for book ID: ${bookId}`);
    
    return data as Edition[];
  } catch (error) {
    console.error('Unexpected error in getEditions:', error);
    return [];
  }
};

export const addEdition = async (bookId: string, edition: Omit<Edition, 'id' | 'created_at'>): Promise<Edition | null> => {
  try {
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
        name: edition.name,
        publisher: edition.publisher,
        year: edition.year,
        language: edition.language
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
