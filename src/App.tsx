
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/Navbar';
import OfflineIndicator from '@/components/OfflineIndicator';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import OfflineMode from '@/pages/OfflineMode';
import QrScanner from '@/pages/QrScanner';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import ServiceCategory from '@/pages/ServiceCategory';
import Shopping from '@/pages/Shopping';
import ShoppingCategory from '@/pages/ShoppingCategory';
import ProductDetail from '@/pages/ProductDetail';
import RentAnything from '@/pages/RentAnything';
import RentDetail from '@/pages/RentDetail';
import Wallet from '@/pages/Wallet';
import Rentals from '@/pages/Rentals';
import RentalCategoryPage from '@/pages/RentalCategoryPage';
import Housing from '@/pages/Housing';
import Help from '@/pages/Help';
import Favorites from '@/pages/Favorites';
import Feedback from '@/pages/Feedback';
import Profile from '@/pages/Profile';
import ProfileManagement from '@/pages/ProfileManagement';
import CreatePost from '@/pages/CreatePost';
import TwoFactorAuthentication from '@/pages/TwoFactorAuthentication';
import Security from '@/pages/Security';
import LanguageSettings from '@/pages/LanguageSettings';
import Rewards from '@/pages/Rewards';
import ProductOrder from '@/pages/ProductOrder';
import ReferralSystem from '@/pages/ReferralSystem';
import Notifications from '@/pages/Notifications';
import ChatPage from '@/pages/ChatPage';
import DigitalProduct from '@/pages/DigitalProduct';
import AppointmentBooking from '@/pages/AppointmentBooking';
import Appointments from '@/pages/Appointments';
import GroupBooking from '@/pages/GroupBooking';
import StoreDetails from '@/pages/StoreDetails';
import CreateStore from '@/pages/CreateStore';
import KycVerification from '@/pages/KycVerification';
import Forums from '@/pages/Forums';
import EventCalendar from '@/pages/EventCalendar';
import CourseBuilder from '@/pages/CourseBuilder';
import PaidCommunity from '@/pages/PaidCommunity';
import PaymentDemo from '@/pages/PaymentDemo';
import AdminDashboard from '@/pages/AdminDashboard';
import Stories from '@/pages/Stories';
import SearchPage from '@/pages/SearchPage';
import MyServices from '@/pages/MyServices';
import Utilities from '@/pages/Utilities';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { PostProvider } from '@/context/PostContext';

import '@/App.css';

const App = () => {
  const [isOffline, setIsOffline] = React.useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <PostProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {isOffline && <OfflineIndicator />}
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/offline" element={<OfflineMode />} />
                <Route path="/qr-scanner" element={<QrScanner />} />
                <Route path="/services" element={<Services />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
                <Route path="/service-category/:category" element={<ServiceCategory />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/shopping-category/:category" element={<ShoppingCategory />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/rent-anything" element={<RentAnything />} />
                <Route path="/rent-details/:id" element={<RentDetail />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/rental-category/:categoryId" element={<RentalCategoryPage />} />
                <Route path="/housing" element={<Housing />} />
                <Route path="/help" element={<Help />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile-management" element={<ProfileManagement />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/2fa" element={<TwoFactorAuthentication />} />
                <Route path="/security" element={<Security />} />
                <Route path="/language" element={<LanguageSettings />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/order/:id" element={<ProductOrder />} />
                <Route path="/referral" element={<ReferralSystem />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/digital-product/:id" element={<DigitalProduct />} />
                <Route path="/appointment-booking/:id" element={<AppointmentBooking />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/group-booking/:id" element={<GroupBooking />} />
                <Route path="/store/:id" element={<StoreDetails />} />
                <Route path="/create-store" element={<CreateStore />} />
                <Route path="/kyc" element={<KycVerification />} />
                <Route path="/forums" element={<Forums />} />
                <Route path="/events" element={<EventCalendar />} />
                <Route path="/course-builder" element={<CourseBuilder />} />
                <Route path="/community/:id" element={<PaidCommunity />} />
                <Route path="/payment-demo" element={<PaymentDemo />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/my-services" element={<MyServices />} />
                <Route path="/utilities" element={<Utilities />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </Router>
      </PostProvider>
    </ThemeProvider>
  );
};

export default App;
