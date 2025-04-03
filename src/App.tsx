
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
import KycVerification from "./pages/KycVerification";
import TwoFactorAuthentication from "./pages/TwoFactorAuthentication";
import Housing from "./pages/Housing";
import Shopping from "./pages/Shopping";
import RentAnything from "./pages/RentAnything";
import Navbar from "./components/Navbar";
import MyServices from "./pages/MyServices";
import Rentals from "./pages/Rentals";
import Utilities from "./pages/Utilities";
import Help from "./pages/Help";
import Notifications from "./pages/Notifications";
import CreatePost from "./pages/CreatePost";
import PaidCommunity from "./pages/PaidCommunity";
import CreateStore from "./pages/CreateStore";
import CourseBuilder from "./pages/CourseBuilder";
import DigitalProduct from "./pages/DigitalProduct";
import ServiceCategory from "./pages/ServiceCategory";

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
          <Route path="/services/category/:id" element={<ServiceCategory />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/security/2fa" element={<TwoFactorAuthentication />} />
          <Route path="/kyc-verification" element={<KycVerification />} />
          <Route path="/kyc-verification/:step" element={<KycVerification />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/marketplace" element={<Shopping />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/rent-anything" element={<RentAnything />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/help" element={<Help />} />
          <Route path="/create-post" element={<CreatePost />} />
          
          {/* Digital Creator Solution Routes - Enhanced with Monetization */}
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/course-builder" element={<CourseBuilder />} />
          <Route path="/email-automation" element={<NotFound />} />
          <Route path="/event-hosting" element={<NotFound />} />
          <Route path="/one-on-one" element={<NotFound />} />
          <Route path="/digital-products" element={<NotFound />} />
          <Route path="/paid-community" element={<PaidCommunity />} />
          <Route path="/audience-analytics" element={<NotFound />} />
          <Route path="/multi-channel" element={<NotFound />} />
          <Route path="/reseller-program" element={<NotFound />} />
          <Route path="/content-planner" element={<NotFound />} />
          <Route path="/payment-gateway" element={<NotFound />} />
          <Route path="/drm" element={<NotFound />} />
          <Route path="/video-hosting" element={<NotFound />} />
          <Route path="/affiliate" element={<NotFound />} />
          <Route path="/social-media" element={<NotFound />} />
          <Route path="/product/:id" element={<DigitalProduct />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
