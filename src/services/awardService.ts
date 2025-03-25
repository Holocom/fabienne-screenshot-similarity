
import { supabase } from "@/integrations/supabase/client";
import { Award } from "@/integrations/supabase/schema";

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

export const addAward = async (bookId: string, award: Omit<Award, 'id' | 'created_at'>): Promise<Award | null> => {
  try {
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
