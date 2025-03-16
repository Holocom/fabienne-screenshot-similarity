
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a-paraitre" element={<NotFound />} />
          <Route path="/biographie" element={<NotFound />} />
          <Route path="/actus" element={<NotFound />} />
          <Route path="/rencontres" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/albums" element={<NotFound />} />
          <Route path="/romans-illustres" element={<NotFound />} />
          <Route path="/romans-ados" element={<NotFound />} />
          <Route path="/collectifs" element={<NotFound />} />
          <Route path="/books/:bookId" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
