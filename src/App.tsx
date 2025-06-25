
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAIAssistant from "@/components/ai/GlobalAIAssistant";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import ProductOrder from "./pages/ProductOrder";
import SecurePay from "./pages/SecurePay";
import SecurePayBuyer from "./pages/SecurePayBuyer";
import ServiceBooking from "./pages/ServiceBooking";
import RentalBooking from "./pages/RentalBooking";
import ContentSubscription from "./pages/ContentSubscription";
import ProfileManagement from "./pages/ProfileManagement";
import BecomeSeller from "./pages/BecomeSeller";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import KYCVerification from "./pages/KYCVerification";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/order/:id" element={<ProductOrder />} />
                  <Route path="/securepay" element={<SecurePay />} />
                  <Route path="/securepay-buyer" element={<SecurePayBuyer />} />
                  <Route path="/service-booking" element={<ServiceBooking />} />
                  <Route path="/rental-booking" element={<RentalBooking />} />
                  <Route path="/content-subscription" element={<ContentSubscription />} />
                  <Route path="/profile-management" element={<ProfileManagement />} />
                  <Route path="/become-seller" element={<BecomeSeller />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/kyc-verification" element={<KYCVerification />} />
                </Routes>
                <Footer />
                <GlobalAIAssistant />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
