
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
import RefundManagementPage from './pages/RefundManagementPage';
import RefundManagement from './pages/RefundManagement';

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
      <Route path="/payment/refund-management" element={<RefundManagementPage />} />
      <Route path="/refund-management" element={<RefundManagementPage />} />
      
      {/* Service Related */}
      <Route path="/service/:id" element={<ServiceDetails />} />
      <Route path="/ratings-reviews" element={<Reviews />} />
      
      {/* Support and Dispute */}
      <Route path="/help/dispute-center" element={<DisputeCenter />} />
      <Route path="/loyalty-program" element={<LoyaltySystem />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
