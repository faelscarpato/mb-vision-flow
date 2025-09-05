import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Inspecoes from "./pages/Inspecoes";
import RNC from "./pages/RNC";
import OS from "./pages/OS";
import Chat from "./pages/Chat";
import IA from "./pages/IA";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/inspecoes" element={
        <ProtectedRoute>
          <Layout title="Inspeções"><Inspecoes /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/rnc" element={
        <ProtectedRoute>
          <Layout title="RNC"><RNC /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/os" element={
        <ProtectedRoute>
          <Layout title="Ordens de Serviço"><OS /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <Layout title="Chat da Equipe"><Chat /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/ia" element={
        <ProtectedRoute>
          <Layout title="Análise com IA"><IA /></Layout>
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
