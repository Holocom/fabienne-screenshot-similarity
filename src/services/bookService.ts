
import { supabase } from "@/integrations/supabase/client";
import { Book, Category } from "@/integrations/supabase/schema";

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
  let query = supabase
    .from('books')
    .select(`
      *,
      categories(id, name, slug)
    `);
  
  if (categorySlug && categorySlug !== 'all') {
    // Joindre les tables books et categories pour filtrer par le slug de la catégorie
    query = query.eq('categories.slug', categorySlug);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }
  
  // Vérifier si les livres ont la bonne catégorie (filtrage côté client supplémentaire)
  let filteredBooks = data || [];
  
  if (categorySlug && categorySlug !== 'all') {
    filteredBooks = filteredBooks.filter(book => 
      book.categories && book.categories.slug === categorySlug
    );
  }
  
  // Traiter les livres pour s'assurer qu'ils sont conformes à notre interface
  return filteredBooks.map(book => {
    // Formater l'URL de l'image de couverture
    const coverImage = formatImageUrl(book.cover_image, book.categories?.slug);
    
    return {
      ...book,
      cover_image: coverImage
    } as Book;
  });
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
  
  // Format the cover image URL
  const coverImage = formatImageUrl(data.cover_image, data.categories?.slug);
  
  return {
    ...data,
    cover_image: coverImage
  } as Book;
};

// Helper function to format image URLs
const formatImageUrl = (url: string | null, categorySlug?: string | null): string | null => {
  if (!url) return null;
  
  // Pour les URLs correctes venant de Supabase Storage
  if (url.includes('supabase.co/storage/v1/object/public/')) {
    // Si l'URL ne contient pas déjà le segment "JEUNESSE" et que la catégorie est "jeunesse"
    if (categorySlug && categorySlug.toLowerCase() === 'jeunesse' && !url.includes('/JEUNESSE/')) {
      // Ajouter le segment "JEUNESSE" avant le nom du fichier
      const urlParts = url.split('/bookcovers/');
      if (urlParts.length === 2) {
        return `${urlParts[0]}/bookcovers/JEUNESSE/${urlParts[1]}`;
      }
    }
    return url;
  }
  
  // Handle different URL patterns
  if (url.startsWith('public/') || url.startsWith('/public/')) {
    // Remove 'public/' prefix for storage URLs
    const cleanedUrl = url.replace(/^(\/)?public\//, '');
    return cleanedUrl;
  }
  
  // Handle fully formed URLs or special cases like Lovable uploads
  if (url.startsWith('/lovable-uploads/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Default case
  return url;
};
