
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Appointments from "./pages/Appointments";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Housing from "./pages/Housing";
import Shopping from "./pages/Shopping";
import RentAnything from "./pages/RentAnything";
import Navbar from "./components/Navbar";
import MyServices from "./pages/MyServices";
import Rentals from "./pages/Rentals";
import Utilities from "./pages/Utilities";
import Help from "./pages/Help";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/marketplace" element={<Shopping />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/rent-anything" element={<RentAnything />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/help" element={<Help />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
