
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Rentals from '@/pages/Rentals';
import Services from '@/pages/Services';
import Shopping from '@/pages/Shopping';
import RentDetail from '@/pages/RentDetail';
import CreatePost from '@/pages/CreatePost';
import ProfileManagement from '@/pages/ProfileManagement';
import AdminDashboard from '@/pages/AdminDashboard';
import SellerDashboard from '@/pages/SellerDashboard';
import ServiceDetail from '@/pages/ServiceDetail';
import ProductDetail from '@/pages/ProductDetail';
import ProductOrder from '@/pages/ProductOrder';
import ServiceBooking from '@/pages/ServiceBooking';
import RentalBooking from '@/pages/RentalBooking';
import RentalConfirmation from '@/pages/RentalConfirmation';
import Wallet from '@/pages/Wallet';
import QrScanner from '@/pages/QrScanner';
import Stories from '@/pages/Stories';
import Forums from '@/pages/Forums';
import EventCalendar from '@/pages/EventCalendar';
import GroupBooking from '@/pages/GroupBooking';
import ReferralSystem from '@/pages/ReferralSystem';
import CreateStore from '@/pages/CreateStore';
import StoreDetails from '@/pages/StoreDetails';
import NotFound from '@/pages/NotFound';
import Feedback from '@/pages/Feedback';
import MyServices from '@/pages/MyServices';
import ChatPage from '@/pages/ChatPage';
import RentAnything from '@/pages/RentAnything';
import ServiceCategories from '@/pages/ServiceCategories';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import ContentDashboard from '@/pages/dashboard/content/ContentDashboard';
import ContentManagement from '@/pages/dashboard/content/ContentManagement';
import MarketplaceDashboard from '@/pages/dashboard/marketplace/MarketplaceDashboard';
import OrderTracking from '@/pages/dashboard/marketplace/OrderTracking';
import ProductManagement from '@/pages/dashboard/marketplace/ProductManagement';
import PropertyManagement from '@/pages/dashboard/rental/PropertyManagement';
import RentalDashboard from '@/pages/dashboard/rental/RentalDashboard';
import ServiceDashboard from '@/pages/dashboard/service/ServiceDashboard';
import ServiceManagement from '@/pages/dashboard/service/ServiceManagement';
import Notifications from '@/pages/Notifications';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="reservio-theme">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/services/category/:categoryId" element={<ServiceCategories />} />
            <Route path="/service-categories" element={<ServiceCategories />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/rent-details/:id" element={<RentDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product-order/:id" element={<ProductOrder />} />
            <Route path="/service-booking/:id" element={<ServiceBooking />} />
            <Route path="/rental-booking/:id" element={<RentalBooking />} />
            <Route path="/rental-confirmation/:id" element={<RentalConfirmation />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile-management" element={<ProfileManagement />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/qr-scanner" element={<QrScanner />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/events" element={<EventCalendar />} />
            <Route path="/group-booking" element={<GroupBooking />} />
            <Route path="/referral" element={<ReferralSystem />} />
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/store/:id" element={<StoreDetails />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my-services" element={<MyServices />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/rent-anything" element={<RentAnything />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="content" element={<ContentDashboard />} />
              <Route path="content/manage" element={<ContentManagement />} />
              <Route path="marketplace" element={<MarketplaceDashboard />} />
              <Route path="marketplace/orders" element={<OrderTracking />} />
              <Route path="marketplace/products" element={<ProductManagement />} />
              <Route path="rental" element={<RentalDashboard />} />
              <Route path="rental/properties" element={<PropertyManagement />} />
              <Route path="service" element={<ServiceDashboard />} />
              <Route path="service/manage" element={<ServiceManagement />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
