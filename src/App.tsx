
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BookingConfirmation from './pages/BookingConfirmation';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProfileManagement = lazy(() => import('./pages/ProfileManagement'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const Services = lazy(() => import('./pages/Services'));
const Shopping = lazy(() => import('./pages/Shopping'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const DigitalProduct = lazy(() => import('./pages/DigitalProduct'));
const RentalListings = lazy(() => import('./pages/RentalListings'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ReferralPage = lazy(() => import('./pages/ReferralPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile-management" element={<ProfileManagement />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/shopping/product/:id" element={<ProductDetail />} />
            <Route path="/digital-product/:id" element={<DigitalProduct />} />
            <Route path="/rentals" element={<RentalListings />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/referral" element={<ReferralPage />} />
    
            {/* Add new routes for booking and payment */}
            <Route path="/book-appointment/:id" element={<BookingConfirmation />} />
            <Route path="/service-booking/:id" element={<BookingConfirmation />} />
            <Route path="/contact/:sellerId" element={<BookingConfirmation />} />
            <Route path="/checkout" element={<BookingConfirmation />} />
            <Route path="/shopping/cart" element={<BookingConfirmation />} />
            <Route path="/digital-products/cart" element={<BookingConfirmation />} />
          </Routes>
        </Suspense>
        <Footer />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
