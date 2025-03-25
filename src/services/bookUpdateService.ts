
import { Book, BookDetail, PressLink, Award, Edition } from "@/integrations/supabase/schema";
import { updateBook } from "./bookService";
import { updateBookDetails } from "./bookDetailService";
import { addPressLink } from "./pressLinkService";
import { addAward } from "./awardService";
import { addEdition } from "./editionService";

export const updateCompleteBookInfo = async (
  bookId: string, 
  bookData: Partial<Book>, 
  detailsData: Partial<BookDetail>,
  pressLinks: Array<Omit<PressLink, 'id' | 'created_at'>>,
  awards: Array<Omit<Award, 'id' | 'created_at'>>,
  editions: Array<Omit<Edition, 'id' | 'created_at'>>
): Promise<boolean> => {
  try {
    if (Object.keys(bookData).length > 0) {
      const bookUpdateResult = await updateBook(bookId, bookData);
      if (!bookUpdateResult) {
        console.warn('Failed to update book data for ID:', bookId);
      }
    }
    
    if (Object.keys(detailsData).length > 0) {
      const detailsUpdateResult = await updateBookDetails(bookId, detailsData);
      if (!detailsUpdateResult) {
        console.warn('Failed to update book details for ID:', bookId);
      }
    }
    
    let addedPressLinks = 0;
    for (const link of pressLinks) {
      const pressLinkResult = await addPressLink(bookId, link);
      if (pressLinkResult) addedPressLinks++;
    }
    console.log(`Added ${addedPressLinks}/${pressLinks.length} press links`);
    
    let addedAwards = 0;
    for (const award of awards) {
      const awardResult = await addAward(bookId, award);
      if (awardResult) addedAwards++;
    }
    console.log(`Added ${addedAwards}/${awards.length} awards`);
    
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
