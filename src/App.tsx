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
import RiskRegulatoryMarketplace from "./pages/RiskRegulatoryMarketplace";
import RiskRegulatoryDetail from "./pages/RiskRegulatoryDetail";
import LearningMarketplace from "./pages/LearningMarketplace";
import LearningDetail from "./pages/LearningDetail";
import KnowledgeMarketplace from "./pages/KnowledgeMarketplace";
import KnowledgeDetail from "./pages/KnowledgeDetail";
import GlossaryMarketplace from "./pages/GlossaryMarketplace";
import GlossaryDetail from "./pages/GlossaryDetail";
import CommunityMarketplace from "./pages/CommunityMarketplace";
import CommunityDetail from "./pages/CommunityDetail";
import DriveMarketplace from "./pages/DriveMarketplace";
import DriveDetail from "./pages/DriveDetail";
import DesignMarketplace from "./pages/DesignMarketplace";
import DesignDetail from "./pages/DesignDetail";
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
          <Route path="/risk-regulatory" element={<RiskRegulatoryMarketplace />} />
          <Route path="/risk-regulatory/:id" element={<RiskRegulatoryDetail />} />
          <Route path="/learning" element={<LearningMarketplace />} />
          <Route path="/learning/:id" element={<LearningDetail />} />
          <Route path="/knowledge" element={<KnowledgeMarketplace />} />
          <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
          <Route path="/glossary" element={<GlossaryMarketplace />} />
          <Route path="/glossary/:id" element={<GlossaryDetail />} />
          <Route path="/community" element={<CommunityMarketplace />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/drive" element={<DriveMarketplace />} />
          <Route path="/drive/:id" element={<DriveDetail />} />
          <Route path="/design" element={<DesignMarketplace />} />
          <Route path="/design/:id" element={<DesignDetail />} />
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
