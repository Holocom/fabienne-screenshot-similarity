
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/services/bookService';
import { Book } from '@/integrations/supabase/schema';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import BookForm from '@/components/BookForm';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Pencil, Plus, Trash2, ExternalLink, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BookManagement = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCoverUrl, setEditingCoverUrl] = useState<{id: string, url: string} | null>(null);
  const { toast } = useToast();

  const { data: books = [], isLoading, refetch } = useQuery({
    queryKey: ['books', 'all'],
    queryFn: () => getBooks('all')
  });

  const openAddForm = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  const openEditForm = (book: Book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const confirmDelete = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedBook) return;

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', selectedBook.id);

      if (error) throw error;

      toast({
        title: 'Livre supprimé',
        description: 'Le livre a été supprimé avec succès',
      });

      refetch();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression du livre',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const startEditingCoverUrl = (book: Book) => {
    setEditingCoverUrl({
      id: book.id,
      url: book.cover_image || ''
    });
  };

  const cancelEditingCoverUrl = () => {
    setEditingCoverUrl(null);
  };

  const saveCoverUrl = async () => {
    if (!editingCoverUrl) return;

    try {
      const { error } = await supabase
        .from('books')
        .update({ cover_image: editingCoverUrl.url })
        .eq('id', editingCoverUrl.id);

      if (error) throw error;

      toast({
        title: 'URL modifiée',
        description: 'L\'URL de l\'image a été modifiée avec succès',
      });

      refetch();
      setEditingCoverUrl(null);
    } catch (error) {
      console.error('Error updating cover URL:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la modification de l\'URL',
        variant: 'destructive',
      });
    }
  };

  const formatImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg";
    return url;
  };

  const getCategoryName = (book: Book) => {
    if (!book.categories) return '-';
    return book.categories.name;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des livres</h1>
          <Button onClick={openAddForm} className="flex items-center gap-2">
            <Plus size={16} /> Ajouter un livre
          </Button>
        </div>

        {isLoading ? (
          <p className="text-center py-8">Chargement des livres...</p>
        ) : books.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-4">Aucun livre trouvé</p>
            <Button onClick={openAddForm} variant="outline">Ajouter un livre</Button>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                  <TableHead className="w-1/3">URL de l'image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="w-12 h-16 overflow-hidden rounded">
                        <img 
                          src={formatImageUrl(book.cover_image)} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getCategoryName(book)}
                    </TableCell>
                    <TableCell>
                      {editingCoverUrl && editingCoverUrl.id === book.id ? (
                        <div className="flex items-center gap-2">
                          <Input 
                            value={editingCoverUrl.url} 
                            onChange={(e) => setEditingCoverUrl({...editingCoverUrl, url: e.target.value})}
                            className="text-xs font-mono"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={saveCoverUrl}
                            title="Enregistrer"
                          >
                            <Save size={16} className="text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={cancelEditingCoverUrl}
                            title="Annuler"
                          >
                            <X size={16} className="text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="truncate w-full text-xs font-mono">
                            {book.cover_image || '-'}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => startEditingCoverUrl(book)}
                            title="Modifier l'URL"
                          >
                            <Pencil size={14} className="text-blue-600" />
                          </Button>
                          {book.cover_image && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => navigator.clipboard.writeText(book.cover_image || '')}
                                  >
                                    <ExternalLink size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copier l'URL</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => openEditForm(book)}
                        title="Éditer"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => confirmDelete(book)}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-md md:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {selectedBook ? 'Modifier le livre' : 'Ajouter un livre'}
              </DialogTitle>
            </DialogHeader>
            <BookForm 
              book={selectedBook || undefined} 
              onSuccess={() => {
                setIsFormOpen(false);
                refetch();
              }} 
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Êtes-vous sûr de vouloir supprimer "{selectedBook?.title}" ?</p>
              <p className="text-sm text-muted-foreground mt-1">Cette action est irréversible.</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Supprimer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookManagement;
