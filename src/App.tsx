import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ServicesPage from './pages/ServicesPage';
import LegalAssistance from './pages/LegalAssistance';
import ProfileManagement from './pages/ProfileManagement';
import Notifications from './pages/Notifications';
import Wallet from './pages/Wallet';
import Security from './pages/Security';
import KycVerification from './pages/KycVerification';
import Utilities from './pages/Utilities';
import HelpAndSupport from './pages/HelpAndSupport';
import AdminDashboard from './pages/AdminDashboard';
import RentAgreement from './pages/RentAgreement';
import PoliceIntimation from './pages/PoliceIntimation';
import TenantVerification from './pages/TenantVerification';
import PropertyLegalAssistance from './pages/PropertyLegalAssistance';
import HomeLoan from './pages/HomeLoan';
import HomeDepositLoan from './pages/HomeDepositLoan';
import KnowYourRent from './pages/KnowYourRent';
import CreateRentReceipts from './pages/CreateRentReceipts';
import ClickAndEarn from './pages/ClickAndEarn';
import TransactionHistory from './pages/TransactionHistory';
import RatingsReviews from './pages/RatingsReviews';
import PaymentLinks from './pages/PaymentLinks';
import LoyaltyProgram from './pages/LoyaltyProgram';
import SupportTopics from './pages/SupportTopics';
import Blog from './pages/Blog';
import Feedback from './pages/Feedback';
import AboutUs from './pages/AboutUs';
import DisputeCenter from './pages/DisputeCenter';
import PaymentAnalytics from './pages/PaymentAnalytics';
import PaymentMethods from './pages/PaymentMethods';
import EscrowStatus from './pages/EscrowStatus';
import GenerateInvoice from './pages/GenerateInvoice';
import CommissionCalculator from './pages/CommissionCalculator';
import AutoRefund from './pages/AutoRefund';
import MultiCurrency from './pages/MultiCurrency';
import MerchantAnalytics from './pages/MerchantAnalytics';
import OrderManagement from './pages/OrderManagement';
import SalesReport from './pages/SalesReport';
import MerchantRatings from './pages/MerchantRatings';
import MerchantVerification from './pages/MerchantVerification';
import ProductDetail from './pages/ProductDetail';
import ServiceDetail from './pages/ServiceDetail';
import RentDetail from './pages/RentDetail';
import CreatePost from './pages/CreatePost';
import MarketplaceHub from './pages/MarketplaceHub';
import SellerDashboard from './pages/SellerDashboard';
import MarketplaceDashboard from './pages/dashboard/marketplace/MarketplaceDashboard';
import RentalManagement from './pages/dashboard/rental/RentalManagement';
import ServiceManagement from './pages/dashboard/service/ServiceManagement';
import ContentManagement from './pages/dashboard/content/ContentManagement';
import OrderTrackingPage from './pages/dashboard/order/OrderTrackingPage';
import RevenueReports from './pages/dashboard/report/RevenueReports';
import CustomerManagement from './pages/dashboard/customer/CustomerManagement';
import BusinessAnalytics from './pages/dashboard/analytics/BusinessAnalytics';
import ServiceDashboard from './pages/dashboard/service/ServiceDashboard';
import RentalDashboard from './pages/dashboard/rental/RentalDashboard';
import GlobalAIAssistant from './components/GlobalAIAssistant';
import DigitalProductsMarketplace from './pages/DigitalProductsMarketplace';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services-page" element={<ServicesPage />} />
            <Route path="/legal-assistance" element={<LegalAssistance />} />
            <Route path="/profile-management" element={<ProfileManagement />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/security" element={<Security />} />
            <Route path="/kyc-verification" element={<KycVerification />} />
            <Route path="/utilities" element={<Utilities />} />
            <Route path="/help" element={<HelpAndSupport />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/services/rental-agreement" element={<RentAgreement />} />
            <Route path="/services/police-intimation" element={<PoliceIntimation />} />
            <Route path="/services/tenant-verification" element={<TenantVerification />} />
            <Route path="/services/property-legal-assistance" element={<PropertyLegalAssistance />} />
            <Route path="/services/home-loan" element={<HomeLoan />} />
            <Route path="/services/home-deposit-loan" element={<HomeDepositLoan />} />
            <Route path="/utilities/know-your-rent" element={<KnowYourRent />} />
            <Route path="/utilities/create-rent-receipts" element={<CreateRentReceipts />} />
            <Route path="/utilities/click-and-earn" element={<ClickAndEarn />} />
            <Route path="/payment/transaction-history" element={<TransactionHistory />} />
            <Route path="/ratings-reviews" element={<RatingsReviews />} />
            <Route path="/payment/payment-links" element={<PaymentLinks />} />
            <Route path="/loyalty-program" element={<LoyaltyProgram />} />
            <Route path="/help/support-topics" element={<SupportTopics />} />
            <Route path="/help/blog" element={<Blog />} />
            <Route path="/help/feedback" element={<Feedback />} />
            <Route path="/help/about-us" element={<AboutUs />} />
            <Route path="/help/dispute-center" element={<DisputeCenter />} />
            <Route path="/payment/analytics" element={<PaymentAnalytics />} />
            <Route path="/payment/payment-methods" element={<PaymentMethods />} />
            <Route path="/payment/escrow-status" element={<EscrowStatus />} />
            <Route path="/payment/generate-invoice" element={<GenerateInvoice />} />
            <Route path="/payment/commission-calculator" element={<CommissionCalculator />} />
            <Route path="/payment/auto-refund" element={<AutoRefund />} />
            <Route path="/payment/multi-currency" element={<MultiCurrency />} />
            <Route path="/merchant/analytics" element={<MerchantAnalytics />} />
            <Route path="/merchant/orders" element={<OrderManagement />} />
            <Route path="/merchant/sales-report" element={<SalesReport />} />
            <Route path="/merchant/ratings" element={<MerchantRatings />} />
            <Route path="/merchant/verification" element={<MerchantVerification />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/service-detail/:id" element={<ServiceDetail />} />
            <Route path="/rent-detail/:id" element={<RentDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/marketplace-hub" element={<MarketplaceHub />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-dashboard/marketplace" element={<MarketplaceDashboard />} />
            <Route path="/seller-dashboard/rental" element={<RentalManagement />} />
            <Route path="/seller-dashboard/services" element={<ServiceManagement />} />
            <Route path="/seller-dashboard/content" element={<ContentManagement />} />
            <Route path="/seller-dashboard/orders" element={<OrderTrackingPage />} />
            <Route path="/seller-dashboard/reports" element={<RevenueReports />} />
            <Route path="/seller-dashboard/customers" element={<CustomerManagement />} />
            <Route path="/seller-dashboard/analytics" element={<BusinessAnalytics />} />
            <Route path="/dashboard/service" element={<ServiceDashboard />} />
            <Route path="/dashboard/rental" element={<RentalDashboard />} />
            <Route path="/digital-products" element={<DigitalProductsMarketplace />} />
          </Routes>
        </main>
        <BottomNavigation />
        <GlobalAIAssistant />
      </div>
    </Router>
  );
}

export default App;
