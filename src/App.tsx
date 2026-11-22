import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Terms from "./pages/Terms.tsx";
import TermosECondicoes from "./pages/TermosECondicoes.tsx";
import PoliticaDeCookies from "./pages/PoliticaDeCookies.tsx";
import Suporte from "./pages/Suporte.tsx";
import GoogleAnalytics from "./components/GoogleAnalytics.tsx";

const queryClient = new QueryClient();

/**
 * A página inicial agora é o site estático em /index.html (fora do React).
 * Quando algum link interno do app leva para "/", recarrega a página inteira para abrir esse site.
 */
const GoHome = () => {
  useEffect(() => {
    window.location.replace("/" + window.location.hash);
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<GoHome />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/support" element={<Navigate to="/suporte" replace />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sobre" element={<GoHome />} />
          <Route path="/funcionalidades" element={<GoHome />} />
          <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
          <Route path="/termos-e-condicoes" element={<TermosECondicoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
