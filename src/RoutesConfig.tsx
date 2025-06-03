
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import pages
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
import Housing from './pages/Housing';
import Rentals from './pages/Rentals';
import RentAnything from './pages/RentAnything';
import BasaBari from './pages/BasaBari';
import { FeatureSelectionPage } from './pages/FeatureSelectionPage';
import CreateLinkInBio from './pages/CreateLinkInBio';
import CreatorPaymentGateway from '@/pages/CreatorPaymentGateway';
import PaymentGateway from '@/pages/PaymentGateway';

const RoutesConfig = () => {
  return (
    <Routes>
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
      <Route path="/create-store/new" element={<CreateStore />} />
      <Route path="/create-linkinbio" element={<CreateLinkInBio />} />
      <Route path="/multi-channel" element={<OnlineStoreFeatures />} />
      
      {/* Digital Products Marketplace */}
      <Route path="/digital-products" element={<DigitalProductsMarketplace />} />
      <Route path="/digital-products/:productId" element={<DigitalProductDetail />} />
      <Route path="/create-digital-product" element={<CreateDigitalProduct />} />
      
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
