
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import GlobalAIAssistant from './components/GlobalAIAssistant';
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import RentalCategoryPage from './pages/RentalCategoryPage';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/rental-category/:categoryId" element={<RentalCategoryPage />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/services" element={<Services />} />
              </Routes>
            </main>
            <GlobalAIAssistant />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
