
import { supabase } from "@/integrations/supabase/client";

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
