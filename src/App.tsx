
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Index from './pages/Index';
import MyServices from './pages/MyServices';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import MarketplaceDashboard from './pages/dashboard/marketplace/MarketplaceDashboard';
import RentalDashboard from './pages/dashboard/rental/RentalDashboard';
import ServiceDashboard from './pages/dashboard/service/ServiceDashboard';
import ContentDashboard from './pages/dashboard/content/ContentDashboard';
import ServiceManagement from './pages/dashboard/service/ServiceManagement';
import ProductManagement from './components/marketplace/ProductManagement';
import ContentManagement from './components/content/ContentManagement';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Redirect route for /profile when it's not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
        {/* Marketplace Dashboard Routes */}
        <Route path="/dashboard/marketplace" element={<DashboardLayout type="marketplace" />}>
          <Route index element={<MarketplaceDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          {/* Other marketplace routes */}
        </Route>
        
        {/* Rental Dashboard Routes */}
        <Route path="/dashboard/rental" element={<DashboardLayout type="rental" />}>
          <Route index element={<RentalDashboard />} />
          {/* Rental dashboard subroutes */}
        </Route>
        
        {/* Service Dashboard Routes */}
        <Route path="/dashboard/service" element={<DashboardLayout type="service" />}>
          <Route index element={<ServiceDashboard />} />
          <Route path="services" element={<ServiceManagement />} />
          {/* Other service routes */}
        </Route>
        
        {/* Content Dashboard Routes */}
        <Route path="/dashboard/content" element={<DashboardLayout type="content" />}>
          <Route index element={<ContentDashboard />} />
          <Route path="contents" element={<ContentManagement />} />
          {/* Other content routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
