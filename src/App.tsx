import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Inspecoes from "./pages/Inspecoes";
import RNC from "./pages/RNC";
import OS from "./pages/OS";
import Chat from "./pages/Chat";
import IA from "./pages/IA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/inspecoes" element={<Layout title="Inspeções"><Inspecoes /></Layout>} />
          <Route path="/rnc" element={<Layout title="RNC"><RNC /></Layout>} />
          <Route path="/os" element={<Layout title="Ordens de Serviço"><OS /></Layout>} />
          <Route path="/chat" element={<Layout title="Chat da Equipe"><Chat /></Layout>} />
          <Route path="/ia" element={<Layout title="Análise com IA"><IA /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
