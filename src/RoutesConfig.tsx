import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceBooking from "./pages/ServiceBooking";
import Marketplace from "./pages/Marketplace";
import MarketplaceCategoryPage from "./pages/MarketplaceCategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Rentals from "./pages/Rentals";
import RentalCategoryPage from "./pages/RentalCategoryPage";
import RentDetail from "./pages/RentDetail";
import RentAnything from "./pages/RentAnything";
import Housing from "./pages/Housing";
import BasaBari from "./pages/BasaBari";
import MyServices from "./pages/MyServices";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import Notifications from "./pages/Notifications";
import SearchPage from "./pages/SearchPage";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Rewards from "./pages/Rewards";
import Reviews from "./pages/Reviews";
import Onboarding from "./pages/Onboarding";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePost from "./pages/CreatePost";
import Stories from "./pages/Stories";
import Forums from "./pages/Forums";
import CreateStore from "./pages/CreateStore";
import CreateStoreNew from "./pages/CreateStoreNew";
import StoreDemo from "./pages/StoreDemo";
import StoreDetails from "./pages/StoreDetails";
import CreateDigitalProduct from "./pages/CreateDigitalProduct";
import DigitalProductsMarketplace from "./pages/DigitalProductsMarketplace";
import DigitalProductDetail from "./pages/DigitalProductDetail";
import DigitalProduct from "./pages/DigitalProduct";
import SellerDashboard from "./pages/SellerDashboard";
import BecomeSeller from "./pages/BecomeSeller";
import Appointments from "./pages/Appointments";
import AppointmentBooking from "./pages/AppointmentBooking";
import PaymentMethods from "./pages/PaymentMethods";
import PaymentGateway from "./pages/PaymentGateway";
import PaymentDemo from "./pages/PaymentDemo";
import PaymentAnalytics from "./pages/PaymentAnalytics";
import Utilities from "./pages/Utilities";
import TransactionHistory from "./pages/TransactionHistory";
import MultiCurrencySupport from "./pages/MultiCurrencySupport";
import LanguageSettings from "./pages/LanguageSettings";
import Security from "./pages/Security";
import TwoFactorAuthentication from "./pages/TwoFactorAuthentication";
import KycVerification from "./pages/KycVerification";
import OfflineMode from "./pages/OfflineMode";
import QrScanner from "./pages/QrScanner";
import RentalBooking from "./pages/RentalBooking";
import RentalConfirmation from "./pages/RentalConfirmation";
import GroupBooking from "./pages/GroupBooking";
import EventCalendar from "./pages/EventCalendar";
import ChatPage from "./pages/ChatPage";
import DisputeCenter from "./pages/DisputeCenter";
import EscrowStatus from "./pages/EscrowStatus";
import AutomaticRefund from "./pages/AutomaticRefund";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import CommissionCalculator from "./pages/CommissionCalculator";
import MarketplaceHub from "./pages/MarketplaceHub";
import ContactOwner from "./pages/ContactOwner";
import ProfileManagement from "./pages/ProfileManagement";
import ServiceCategory from "./pages/ServiceCategory";
import ServiceDetails from "./pages/ServiceDetails";
import ShoppingCategory from "./pages/ShoppingCategory";
import Shopping from "./pages/Shopping";
import ProductOrder from "./pages/ProductOrder";
import ReferralSystem from "./pages/ReferralSystem";
import Wish2Earn from "./pages/Wish2Earn";
import SecurePay from "./pages/SecurePay";
import SecurePayCreator from "./pages/SecurePayCreator";
import SecurePayBuyer from "./pages/SecurePayBuyer";
import SecurePayAdmin from "./pages/SecurePayAdmin";
import CreatorPaymentGateway from "./pages/CreatorPaymentGateway";
import PaidCommunity from "./pages/PaidCommunity";
import CourseBuilder from "./pages/CourseBuilder";
import CreateLinkInBio from "./pages/CreateLinkInBio";
import FeatureSelectionPage from "./pages/FeatureSelectionPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ContentDashboard from "./pages/dashboard/content/ContentDashboard";
import MarketplaceDashboard from "./pages/dashboard/marketplace/MarketplaceDashboard";
import RentalDashboard from "./pages/dashboard/rental/RentalDashboard";
import ServiceDashboard from "./pages/dashboard/service/ServiceDashboard";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/category/:categoryId",
        element: <ServiceCategoryPage />,
      },
      {
        path: "services/:serviceId",
        element: <ServiceDetail />,
      },
      {
        path: "services/:serviceId/book",
        element: <ServiceBooking />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "marketplace/category/:categoryId",
        element: <MarketplaceCategoryPage />,
      },
      {
        path: "marketplace/product/:productId", 
        element: <ProductDetail />,
      },
      {
        path: "rentals",
        element: <Rentals />,
      },
      {
        path: "rentals/category/:categoryId",
        element: <RentalCategoryPage />,
      },
      {
        path: "rent/:id",
        element: <RentDetail />,
      },
      {
        path: "rent-anything",
        element: <RentAnything />,
      },
      {
        path: "housing",
        element: <Housing />,
      },
      {
        path: "housing/:id",
        element: <BasaBari />,
      },
      {
        path: "my-services",
        element: <MyServices />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "rewards",
        element: <Rewards />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "onboarding",
        element: <Onboarding />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
      {
        path: "forums",
        element: <Forums />,
      },
      {
        path: "create-store",
        element: <CreateStore />,
      },
      {
        path: "create-store-new",
        element: <CreateStoreNew />,
      },
      {
        path: "store-demo",
        element: <StoreDemo />,
      },
      {
        path: "store/:storeId",
        element: <StoreDetails />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "create-digital-product",
        element: <CreateDigitalProduct />,
      },
      {
        path: "digital-products",
        element: <DigitalProductsMarketplace />,
      },
      {
        path: "digital-product/:productId",
        element: <DigitalProductDetail />,
      },
      {
        path: "digital-product",
        element: <DigitalProduct />,
      },
      {
        path: "seller-dashboard",
        element: <SellerDashboard />,
      },
      {
        path: "become-seller",
        element: <BecomeSeller />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "appointment-booking",
        element: <AppointmentBooking />,
      },
      {
        path: "payment-methods",
        element: <PaymentMethods />,
      },
      {
        path: "payment-gateway",
        element: <PaymentGateway />,
      },
      {
        path: "payment-demo",
        element: <PaymentDemo />,
      },
      {
        path: "payment-analytics",
        element: <PaymentAnalytics />,
      },
      {
        path: "utilities",
        element: <Utilities />,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory />,
      },
      {
        path: "multi-currency-support",
        element: <MultiCurrencySupport />,
      },
      {
        path: "language-settings",
        element: <LanguageSettings />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "two-factor-authentication",
        element: <TwoFactorAuthentication />,
      },
      {
        path: "kyc-verification",
        element: <KycVerification />,
      },
      {
        path: "offline-mode",
        element: <OfflineMode />,
      },
      {
        path: "qr-scanner",
        element: <QrScanner />,
      },
      {
        path: "rental-booking",
        element: <RentalBooking />,
      },
      {
        path: "rental-confirmation",
        element: <RentalConfirmation />,
      },
      {
        path: "group-booking",
        element: <GroupBooking />,
      },
      {
        path: "event-calendar",
        element: <EventCalendar />,
      },
      {
        path: "chat/:userId",
        element: <ChatPage />,
      },
      {
        path: "dispute-center",
        element: <DisputeCenter />,
      },
      {
        path: "escrow-status",
        element: <EscrowStatus />,
      },
      {
        path: "automatic-refund",
        element: <AutomaticRefund />,
      },
      {
        path: "invoice-generator",
        element: <InvoiceGenerator />,
      },
      {
        path: "commission-calculator",
        element: <CommissionCalculator />,
      },
      {
        path: "marketplace-hub",
        element: <MarketplaceHub />,
      },
      {
        path: "contact-owner",
        element: <ContactOwner />,
      },
      {
        path: "profile-management",
        element: <ProfileManagement />,
      },
      {
        path: "service-category",
        element: <ServiceCategory />,
      },
      {
        path: "service-details",
        element: <ServiceDetails />,
      },
      {
        path: "shopping-category",
        element: <ShoppingCategory />,
      },
      {
        path: "shopping",
        element: <Shopping />,
      },
      {
        path: "product-order",
        element: <ProductOrder />,
      },
      {
        path: "referral-system",
        element: <ReferralSystem />,
      },
      {
        path: "wish2earn",
        element: <Wish2Earn />,
      },
      {
        path: "secure-pay",
        element: <SecurePay />,
      },
      {
        path: "secure-pay-creator",
        element: <SecurePayCreator />,
      },
      {
        path: "secure-pay-buyer",
        element: <SecurePayBuyer />,
      },
      {
        path: "secure-pay-admin",
        element: <SecurePayAdmin />,
      },
      {
        path: "creator-payment-gateway",
        element: <CreatorPaymentGateway />,
      },
      {
        path: "paid-community",
        element: <PaidCommunity />,
      },
      {
        path: "course-builder",
        element: <CourseBuilder />,
      },
      {
        path: "create-link-in-bio",
        element: <CreateLinkInBio />,
      },
      {
        path: "feature-selection",
        element: <FeatureSelectionPage />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/dashboard/content" replace />,
          },
          {
            path: "content",
            element: <ContentDashboard />,
          },
          {
            path: "marketplace",
            element: <MarketplaceDashboard />,
          },
          {
            path: "rental",
            element: <RentalDashboard />,
          },
          {
            path: "service",
            element: <ServiceDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
