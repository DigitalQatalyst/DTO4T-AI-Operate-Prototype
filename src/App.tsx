import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import DiscernMarketplace from "./pages/DiscernMarketplace";
import AIOpsFrameworkMarketplace from "./pages/AIOpsFrameworkMarketplace";
import DiscernLearning from "./pages/DiscernLearning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discern" element={<DiscernMarketplace />} />
          <Route path="/aiops-framework" element={<AIOpsFrameworkMarketplace />} />
          <Route path="/knowledge" element={<KnowledgeCenter />} />
          <Route path="/learning" element={<DiscernLearning />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
