
import { supabase } from "@/integrations/supabase/client";
import { PressLink } from "@/integrations/supabase/schema";

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

export const addPressLink = async (bookId: string, link: Omit<PressLink, 'id' | 'created_at'>): Promise<PressLink | null> => {
  try {
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
