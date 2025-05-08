
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

const RoutesConfig = () => {
  return (
    <Routes>
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
      
      {/* Support and Dispute */}
      <Route path="/help/dispute-center" element={<DisputeCenter />} />
      <Route path="/loyalty-program" element={<LoyaltySystem />} />
      <Route path="/referral" element={<ReferralSystem />} />
      
      {/* Digital Creator */}
      <Route path="/digital-creator/store-templates" element={<IndustryTemplates />} />
      <Route path="/create-store" element={<OnlineStoreFeatures />} />
      <Route path="/multi-channel" element={<OnlineStoreFeatures />} />
      
      {/* Digital Products Marketplace */}
      <Route path="/digital-products" element={<DigitalProductsMarketplace />} />
      <Route path="/digital-products/:productId" element={<DigitalProductDetail />} />
      <Route path="/create-digital-product" element={<CreateDigitalProduct />} />
      
      {/* Seller Dashboard */}
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      
      {/* Seller Dashboard Sections */}
      <Route path="/seller-dashboard/marketplace/*" element={<DashboardLayout type="marketplace" />} />
      <Route path="/seller-dashboard/rental/*" element={<DashboardLayout type="rental" />} />
      <Route path="/seller-dashboard/services/*" element={<DashboardLayout type="service" />} />
      <Route path="/seller-dashboard/content/*" element={<DashboardLayout type="content" />} />
      <Route path="/dashboard/marketplace/*" element={<DashboardLayout type="marketplace" />} />
      <Route path="/dashboard/rental/*" element={<DashboardLayout type="rental" />} />
      <Route path="/dashboard/service/*" element={<DashboardLayout type="service" />} />
      <Route path="/dashboard/content/*" element={<DashboardLayout type="content" />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
