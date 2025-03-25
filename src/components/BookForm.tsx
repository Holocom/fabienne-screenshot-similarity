
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book, Category } from '@/integrations/supabase/schema';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '@/services/bookService';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookFormProps {
  book?: Book;
  onSuccess?: () => void;
}

const BookForm = ({ book, onSuccess }: BookFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(book?.cover_image || null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const form = useForm({
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      description: book?.description || '',
      category_id: book?.category_id || '',
      cover_image_url: book?.cover_image || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Mettre à jour la prévisualisation lorsque l'URL de l'image change
  const handleImageUrlChange = (url: string) => {
    setImageFile(null); // Réinitialiser le fichier, car nous utilisons une URL
    setImagePreview(url.trim() || null);
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      let coverImagePath = values.cover_image_url || null;
      
      // Upload image if a new one was selected
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('books')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('books')
          .getPublicUrl(fileName);

        coverImagePath = publicUrl;
      }

      // Update or create book
      const bookData = {
        title: values.title,
        author: values.author,
        description: values.description,
        category_id: values.category_id || null,
        cover_image: coverImagePath,
      };

      let error;
      if (book?.id) {
        // Update existing book
        const { error: updateError } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', book.id);
        error = updateError;
      } else {
        // Create new book
        const { error: insertError } = await supabase
          .from('books')
          .insert(bookData);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: book?.id ? 'Livre mis à jour' : 'Livre ajouté',
        description: book?.id 
          ? 'Le livre a été mis à jour avec succès' 
          : 'Un nouveau livre a été ajouté avec succès',
      });

      // Invalidate queries to refetch book data
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', book?.id] });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving book:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde du livre',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre du livre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auteur</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'auteur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description du livre" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Image de couverture</FormLabel>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Téléverser une image</TabsTrigger>
              <TabsTrigger value="url">Utiliser une URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {imagePreview && !form.watch('cover_image_url') && (
                  <div className="w-40 h-52 overflow-hidden border rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG ou GIF. Max 2MB.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="url">
              <FormField
                control={form.control}
                name="cover_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="https://exemple.com/image.jpg" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      Entrez l'URL complète de l'image
                    </p>
                  </FormItem>
                )}
              />
              
              {imagePreview && form.watch('cover_image_url') && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Aperçu :</p>
                  <div className="w-40 h-52 overflow-hidden border rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover" 
                      onError={() => setImagePreview("/placeholder.svg")}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Enregistrement...' : book?.id ? 'Mettre à jour' : 'Ajouter un livre'}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
