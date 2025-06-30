
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import Services from './pages/Services';
import Rentals from './pages/Rentals';
import Shopping from './pages/Shopping';
import Marketplace from './pages/Marketplace';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import ServiceBooking from './pages/ServiceBooking';
import ProductOrder from './pages/ProductOrder';
import RentalBooking from './pages/RentalBooking';
import RentalConfirmation from './pages/RentalConfirmation';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardPage from './pages/dashboard/DashboardLayout';
import ServiceManagement from './pages/dashboard/service/ServiceManagement';
import ProductManagement from './pages/dashboard/marketplace/ProductManagement';
import PropertyManagement from './pages/dashboard/rental/PropertyManagement';
import RentalCategoriesPage from './pages/RentalCategoriesPage';
import RentalBookingDynamic from './pages/RentalBookingDynamic';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/service-booking" element={<ServiceBooking />} />
            <Route path="/product-order" element={<ProductOrder />} />
            <Route path="/rental-booking" element={<RentalBooking />} />
            <Route path="/rental-confirmation" element={<RentalConfirmation />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/services" element={<ServiceManagement />} />
            <Route path="/dashboard/products" element={<ProductManagement />} />
            <Route path="/dashboard/property" element={<PropertyManagement />} />
            <Route path="/rental-categories" element={<RentalCategoriesPage />} />
            <Route path="/rental-booking/:categoryId" element={<RentalBookingDynamic />} />
          </Routes>
          <Toaster />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
