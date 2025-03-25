
import { supabase } from "@/integrations/supabase/client";
import { BookDetail } from "@/integrations/supabase/schema";

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

export const updateBookDetails = async (bookId: string, details: Partial<BookDetail>): Promise<BookDetail | null> => {
  const { data: existingData } = await supabase
    .from('book_details')
    .select('*')
    .eq('book_id', bookId)
    .maybeSingle();

  let result;
  
  if (existingData) {
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
