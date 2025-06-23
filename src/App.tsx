
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import GlobalAIAssistant from './components/GlobalAIAssistant';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<div className="container px-4 pt-20 pb-20"><h1 className="text-2xl font-bold">স্বাগতম</h1><p className="text-muted-foreground">আপনার প্রয়োজনীয় সেবা খুঁজে নিন</p></div>} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </main>
          <GlobalAIAssistant />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
