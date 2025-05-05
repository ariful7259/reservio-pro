
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import pages
import PaymentAnalytics from './pages/PaymentAnalytics';
import TransactionHistory from './pages/TransactionHistory';
import Reviews from './pages/Reviews';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import DisputeCenter from './components/dispute/DisputeCenter';
import InvoiceGenerator from './components/invoice/InvoiceGenerator';
import PaymentLinkGenerator from './components/payment/PaymentLinkGenerator';
import LoyaltySystem from './components/loyalty/LoyaltySystem';

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Payment and Money Management */}
      <Route path="/payment/analytics" element={<PaymentAnalytics />} />
      <Route path="/payment/transaction-history" element={<TransactionHistory />} />
      <Route path="/payment/generate-invoice" element={<InvoiceGenerator />} />
      <Route path="/payment/payment-links" element={<PaymentLinkGenerator />} />
      
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
