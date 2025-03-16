
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import BookDetail from "./pages/BookDetail";
import BookManagement from "./pages/BookManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/roman" element={<CategoryPage />} />
          <Route path="/art" element={<CategoryPage />} />
          <Route path="/jeunesse" element={<CategoryPage />} />
          <Route path="/cuisine" element={<CategoryPage />} />
          <Route path="/collectifs" element={<CategoryPage />} />
          <Route path="/commandes" element={<CategoryPage />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/admin/books" element={<BookManagement />} />
          <Route path="/biographie" element={<NotFound />} />
          <Route path="/rencontres" element={<NotFound />} />
          <Route path="/formations" element={<NotFound />} />
          <Route path="/hors-champ" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
