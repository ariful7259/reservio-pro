import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfileManagement from './pages/ProfileManagement';
import CreatePost from './pages/CreatePost';
import Services from './pages/Services';
import Shopping from './pages/Shopping';
import AdminDashboard from './pages/AdminDashboard';
import Wallet from './pages/Wallet';
import SearchResults from './pages/SearchResults';
import ServiceDetails from './pages/ServiceDetails';
import Rentals from './pages/Rentals';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/use-toast';
import { AdminConfigProvider } from './context/AdminConfigContext';
import RentalItemDetail from './pages/RentalItemDetail';
import RentalConfirmation from './pages/RentalConfirmation';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AdminConfigProvider>
          <Router>
            <Navbar />
            <div style={{ marginTop: '64px', marginBottom: '64px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile-management" element={<ProfileManagement />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/services" element={<Services />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/rental/:id" element={<RentalItemDetail />} />
                <Route path="/rental-confirmation/:id" element={<RentalConfirmation />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </AdminConfigProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
