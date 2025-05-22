import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import BookDetail from "./pages/BookDetail";
import BookManagement from "./pages/BookManagement";
import UnderConstruction from "./components/UnderConstruction";
import { useEffect } from "react";
import { getBookById, getBookBySlug } from "@/services/bookService";

const queryClient = new QueryClient();

// Helper pour détecter un UUID v4
function isUuid(input: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}

// Redirection automatique de /books/:id(UUID) vers /books/:slug
function BookIdRedirect() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId && isUuid(bookId)) {
      // Cherche le slug du livre correspondant
      getBookById(bookId).then((book) => {
        if (book?.slug) {
          navigate(`/books/${book.slug}`, { replace: true });
        } else {
          navigate("/not-found", { replace: true });
        }
      });
    } else {
      // Si ce n’est pas un UUID, probablement une erreur, aller vers 404
      navigate("/not-found", { replace: true });
    }
    // eslint-disable-next-line
  }, [bookId]);

  return null; // Rien à afficher
}

const brownBabyBookSlug = "brown-baby"; // Slug par défaut (à ajuster si besoin)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:categorySlug" element={<CategoryPage />} />
            
            {/* SUPPRESSION DE CETTE LIGNE, pour remettre la page /roman normale : */}
            {/* <Route path="/roman" element={<Navigate to={`/books/${brownBabyBookSlug}`} replace />} /> */}
            <Route path="/art" element={<CategoryPage />} />
            <Route path="/jeunesse" element={<CategoryPage />} />
            <Route path="/cuisine" element={<CategoryPage />} />
            <Route path="/collectifs" element={<CategoryPage />} />
            <Route path="/commandes" element={<CategoryPage />} />
            
            {/* Nouvelle route slug : /books/:slug */}
            <Route path="/books/:bookSlug" element={<BookDetail />} />

            {/* Ancienne route : /books/:uuid → redirection vers slug */}
            <Route path="/books/:bookId" element={<BookIdRedirect />} />

            <Route path="/admin/books" element={<BookManagement />} />

            {/* Pages en construction */}
            <Route path="/biographie" element={<UnderConstruction pageName="Biographie" />} />
            <Route path="/rencontres" element={<UnderConstruction pageName="Rencontres" />} />
            <Route path="/formations" element={<UnderConstruction pageName="Formations" />} />
            <Route path="/hors-champ" element={<UnderConstruction pageName="Hors-champ" />} />
            <Route path="/contact" element={<UnderConstruction pageName="Contact" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
