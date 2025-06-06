
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import BookDetail from "./pages/BookDetail";
import BookManagement from "./pages/BookManagement";
import UnderConstruction from "./components/UnderConstruction";

const queryClient = new QueryClient();

const App = () => {
  // ID du livre Brown Baby
  const brownBabyBookId = '0e2076f3-db50-4b64-ad3e-a8fb3d5b3308';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:categorySlug" element={<CategoryPage />} />
            
            {/* Rediriger directement "roman" vers la page du livre Brown Baby */}
            <Route path="/roman" element={<Navigate to={`/books/${brownBabyBookId}`} replace />} />
            
            <Route path="/art" element={<CategoryPage />} />
            <Route path="/jeunesse" element={<CategoryPage />} />
            <Route path="/cuisine" element={<CategoryPage />} />
            <Route path="/collectifs" element={<CategoryPage />} />
            <Route path="/commandes" element={<CategoryPage />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
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
