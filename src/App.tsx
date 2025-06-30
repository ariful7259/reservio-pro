
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RentalsPage from './pages/RentalsPage';
import ShoppingPage from './pages/ShoppingPage';
import MarketplacePage from './pages/MarketplacePage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import ServiceBooking from './pages/ServiceBooking';
import ProductOrder from './pages/ProductOrder';
import RentalBooking from './pages/RentalBooking';
import RentalConfirmation from './pages/RentalConfirmation';
import CreatePost from './pages/CreatePost';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ServiceManagement from './pages/dashboard/service/ServiceManagement';
import ProductManagement from './pages/dashboard/product/ProductManagement';
import RentalManagement from './pages/dashboard/rental/RentalManagement';
import PropertyManagement from './pages/dashboard/rental/PropertyManagement';
import RentalCategoriesPage from './pages/RentalCategoriesPage';
import RentalBookingDynamic from './pages/RentalBookingDynamic';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/rentals" element={<RentalsPage />} />
              <Route path="/shopping" element={<ShoppingPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/service-booking" element={<ServiceBooking />} />
              <Route path="/product-order" element={<ProductOrder />} />
              <Route path="/rental-booking" element={<RentalBooking />} />
              <Route path="/rental-confirmation" element={<RentalConfirmation />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/services" element={<ServiceManagement />} />
              <Route path="/dashboard/products" element={<ProductManagement />} />
              <Route path="/dashboard/rentals" element={<RentalManagement />} />
              <Route path="/dashboard/property" element={<PropertyManagement />} />
              <Route path="/rental-categories" element={<RentalCategoriesPage />} />
              <Route path="/rental-booking/:categoryId" element={<RentalBookingDynamic />} />
            </Routes>
            <Toaster />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
