import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./hooks/useAuth";
import { AdminConfigProvider } from "./context/AdminConfigContext";
import OfflineIndicator from "./components/OfflineIndicator";
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
import ShoppingCategory from "./pages/ShoppingCategory";
import Favorites from "./pages/Favorites";
import Reviews from "./pages/Reviews";
import Rewards from "./pages/Rewards";
import Onboarding from "./pages/Onboarding";
import LanguageSettings from "./pages/LanguageSettings";
import OfflineMode from "./pages/OfflineMode";
import Feedback from "./pages/Feedback";
import AppointmentBooking from "./pages/AppointmentBooking";
import QrScanner from "./pages/QrScanner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileManagement from "./pages/ProfileManagement";
import ChatPage from "./pages/ChatPage";
import SearchPage from "./pages/SearchPage";
import PaymentDemo from "./pages/PaymentDemo";
import ReferralSystem from "./pages/ReferralSystem";
import Stories from "./pages/Stories";
import EventCalendar from "./pages/EventCalendar";
import Forums from "./pages/Forums";
import GroupBooking from "./pages/GroupBooking";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import RentDetail from "./pages/RentDetail";
import ProductOrder from "./pages/ProductOrder";
import RentalCategoryPage from "./pages/RentalCategoryPage";
import StoreDetails from "./pages/StoreDetails";
import SellerDashboard from "./pages/SellerDashboard";
import ServiceDetails from "./pages/ServiceDetail";

// Import dashboard components
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import MarketplaceDashboard from "./pages/dashboard/marketplace/MarketplaceDashboard";
import ProductManagement from "./pages/dashboard/marketplace/ProductManagement";
import OrderTracking from "./pages/dashboard/marketplace/OrderTracking";
import RentalDashboard from "./pages/dashboard/rental/RentalDashboard";
import PropertyManagement from "./pages/dashboard/rental/PropertyManagement";
import ServiceDashboard from "./pages/dashboard/service/ServiceDashboard";
import ServiceManagement from "./pages/dashboard/service/ServiceManagement";
import ContentDashboard from "./pages/dashboard/content/ContentDashboard";
import ContentManagement from "./pages/dashboard/content/ContentManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <AppProvider>
          <AdminConfigProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  
                  {/* Seller Dashboard Routes */}
                  <Route path="/seller-dashboard/*" element={<SellerDashboard />} />
                  <Route path="/dashboard/*" element={<DashboardLayout />}>
                    <Route path="marketplace/*" element={<MarketplaceDashboard />} />
                    <Route path="rental/*" element={<RentalDashboard />} />
                    <Route path="service/*" element={<ServiceDashboard />} />
                    <Route path="content/*" element={<ContentDashboard />} />
                  </Route>
                  
                  {/* Admin Dashboard Route */}
                  <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                  
                  {/* Regular Routes */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServiceDetails />} />
                  <Route path="/services/category/:id" element={<ServiceCategory />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/appointment-booking" element={<AppointmentBooking />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/security/2fa" element={<TwoFactorAuthentication />} />
                  <Route path="/kyc-verification" element={<KycVerification />} />
                  <Route path="/kyc-verification/:step" element={<KycVerification />} />
                  <Route path="/rentals" element={<Rentals />} />
                  <Route path="/rental-category/:categoryId" element={<RentalCategoryPage />} />
                  <Route path="/shopping" element={<Shopping />} />
                  <Route path="/shopping/category/:id" element={<ShoppingCategory />} />
                  <Route path="/marketplace" element={<Shopping />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/rent-anything" element={<RentAnything />} />
                  <Route path="/rent/apartment" element={<Housing />} />
                  <Route path="/rent/house" element={<Housing />} />
                  <Route path="/rent/car" element={<Housing />} />
                  <Route path="/rent/office" element={<Housing />} />
                  <Route path="/rent/event-space" element={<Housing />} />
                  <Route path="/rent/equipment" element={<Housing />} />
                  <Route path="/rent/shop" element={<Housing />} />
                  <Route path="/rent/others" element={<Housing />} />
                  <Route path="/my-services" element={<MyServices />} />
                  <Route path="/utilities" element={<Utilities />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/qr-scanner" element={<QrScanner />} />
                  
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile-management" element={<ProfileManagement />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <OfflineIndicator />
              </BrowserRouter>
            </TooltipProvider>
          </AdminConfigProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
