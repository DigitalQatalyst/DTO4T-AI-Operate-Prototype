import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DiscernMarketplace from "./pages/DiscernMarketplace";
import DiscernDetail from "./pages/DiscernDetail";
import AIOpsFrameworkMarketplace from "./pages/AIOpsFrameworkMarketplace";
import AIOpsFrameworkDetail from "./pages/AIOpsFrameworkDetail";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";

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
          <Route path="/discern/:id" element={<DiscernDetail />} />
          <Route path="/aiops-framework" element={<AIOpsFrameworkMarketplace />} />
          <Route path="/aiops-framework/:id" element={<AIOpsFrameworkDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspace" element={<Workspace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
