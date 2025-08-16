import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Pool from "./pages/services/Pool";
import Pest from "./pages/services/Pest";
import DeepClean from "./pages/services/DeepClean";
import Emirates from "./pages/locations/Emirates";
import Dubai from "./pages/locations/Dubai";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/pool" element={<Pool />} />
            <Route path="/services/pest" element={<Pest />} />
            <Route path="/services/deep-clean" element={<DeepClean />} />
            <Route path="/locations/emirates" element={<Emirates />} />
            <Route path="/locations/dubai" element={<Dubai />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            {/* Stub routes - to be implemented */}
            <Route path="/blog" element={<div className="min-h-screen pt-16 py-20 text-center"><h1 className="text-4xl font-display font-bold">Blog Coming Soon</h1></div>} />
            <Route path="/legal/*" element={<div className="min-h-screen pt-16 py-20 text-center"><h1 className="text-4xl font-display font-bold">Legal Pages Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
