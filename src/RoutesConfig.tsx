import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import pages
import Index from './pages/Index';
import CreatePost from './pages/CreatePost';
import PaymentAnalytics from './pages/PaymentAnalytics';
import TransactionHistory from './pages/TransactionHistory';
import Reviews from './pages/Reviews';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import DisputeCenter from './components/dispute/DisputeCenter';
import InvoiceGenerator from './pages/InvoiceGenerator';
import PaymentLinkGenerator from './components/payment/PaymentLinkGenerator';
import LoyaltySystem from './components/loyalty/LoyaltySystem';
import MultiCurrencySupport from './pages/MultiCurrencySupport';
import PaymentMethods from './pages/PaymentMethods';
import EscrowStatus from './pages/EscrowStatus';
import CommissionCalculator from './pages/CommissionCalculator';
import AutomaticRefund from './pages/AutomaticRefund';
import IndustryTemplates from './components/store/IndustryTemplates';
import DigitalProductsMarketplace from './pages/DigitalProductsMarketplace';
import DigitalProductDetail from './pages/DigitalProductDetail';
import CreateDigitalProduct from './pages/CreateDigitalProduct';
import SellerDashboard from './pages/SellerDashboard';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ReferralSystem from './pages/ReferralSystem';
import OnlineStoreFeatures from './components/product/OnlineStoreFeatures';
import CreateStore from './pages/CreateStore';
import StoreDemo from './pages/StoreDemo';
import Housing from './pages/Housing';
import Rentals from './pages/Rentals';
import RentAnything from './pages/RentAnything';
import BasaBari from './pages/BasaBari';
import { FeatureSelectionPage } from './pages/FeatureSelectionPage';
import CreateLinkInBio from './pages/CreateLinkInBio';
import CreatorPaymentGateway from '@/pages/CreatorPaymentGateway';
import PaymentGateway from '@/pages/PaymentGateway';
import SecurePay from '@/pages/SecurePay';
import SecurePayCreator from '@/pages/SecurePayCreator';
import SecurePayBuyer from '@/pages/SecurePayBuyer';
import SecurePayAdmin from '@/pages/SecurePayAdmin';
import Wish2Earn from './pages/Wish2Earn';
import CreateStoreNew from "@/pages/CreateStoreNew";
import Services from './pages/Services';
import Marketplace from './pages/Marketplace';
import MarketplaceHub from './pages/MarketplaceHub';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import MyServices from './pages/MyServices';

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Index />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin Dashboard Route */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/:section" element={<AdminDashboard />} />
      
      {/* Create Post Route */}
      <Route path="/create-post" element={<CreatePost />} />
      
      {/* Main Navigation Routes */}
      <Route path="/services" element={<Services />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace-hub" element={<MarketplaceHub />} />
      <Route path="/shopping" element={<Marketplace />} />
      <Route path="/wallet" element={<Wallet />} />
      
      {/* My Services Route */}
      <Route path="/my-services" element={<MyServices />} />
      
      {/* SecurePay Routes */}
      <Route path="/securepay" element={<SecurePay />} />
      <Route path="/securepay/creator" element={<SecurePayCreator />} />
      <Route path="/securepay/buyer" element={<SecurePayBuyer />} />
      <Route path="/securepay/admin" element={<SecurePayAdmin />} />
      
      {/* Payment Gateway Routes */}
      <Route path="/payment-gateway" element={<PaymentGateway />} />
      <Route path="/creator-payment-gateway" element={<CreatorPaymentGateway />} />
      
      {/* Payment and Money Management */}
      <Route path="/payment/analytics" element={<PaymentAnalytics />} />
      <Route path="/payment/transaction-history" element={<TransactionHistory />} />
      <Route path="/payment/generate-invoice" element={<InvoiceGenerator />} />
      <Route path="/payment/payment-links" element={<PaymentLinkGenerator />} />
      <Route path="/payment/multi-currency" element={<MultiCurrencySupport />} />
      <Route path="/payment/payment-methods" element={<PaymentMethods />} />
      <Route path="/payment/escrow-status" element={<EscrowStatus />} />
      <Route path="/payment/commission-calculator" element={<CommissionCalculator />} />
      <Route path="/payment/auto-refund" element={<AutomaticRefund />} />
      
      {/* Service Related */}
      <Route path="/service/:id" element={<ServiceDetails />} />
      <Route path="/ratings-reviews" element={<Reviews />} />
      <Route path="/feature-selection" element={<FeatureSelectionPage />} />
      
      {/* Housing and Rentals */}
      <Route path="/housing" element={<Housing />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/rent-anything" element={<RentAnything />} />
      <Route path="/rental-category/:category" element={<BasaBari />} />
      <Route path="/basa-bari" element={<BasaBari />} />
      
      {/* Support and Dispute */}
      <Route path="/help/dispute-center" element={<DisputeCenter />} />
      <Route path="/loyalty-program" element={<LoyaltySystem />} />
      <Route path="/referral" element={<ReferralSystem />} />
      
      {/* Digital Creator */}
      <Route path="/digital-creator/store-templates" element={<IndustryTemplates />} />
      <Route path="/create-store" element={<CreateStore />} />
      <Route path="/create-store/new" element={<CreateStoreNew />} />
      <Route path="/store-demo" element={<StoreDemo />} />
      <Route path="/create-linkinbio" element={<CreateLinkInBio />} />
      <Route path="/multi-channel" element={<OnlineStoreFeatures />} />
      
      {/* Digital Products Marketplace */}
      <Route path="/digital-products" element={<DigitalProductsMarketplace />} />
      <Route path="/digital-products/:productId" element={<DigitalProductDetail />} />
      <Route path="/create-digital-product" element={<CreateDigitalProduct />} />
      
      {/* Wish2Earn Full Page */}
      <Route path="/wish2earn" element={<Wish2Earn />} />
      
      {/* Seller Dashboard */}
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      
      {/* Seller Dashboard Sections */}
      <Route path="/dashboard/*" element={<DashboardLayout />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
