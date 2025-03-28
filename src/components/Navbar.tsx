
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  User, 
  Wallet, 
  Calendar, 
  Search, 
  ShieldCheck 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Calendar className="h-5 w-5" /> },
    { title: 'অ্যাপয়েন্টমেন্ট', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
    { title: 'সার্ভিস', path: '/services', icon: <Search className="h-5 w-5" /> },
    { title: 'ওয়ালেট', path: '/wallet', icon: <Wallet className="h-5 w-5" /> },
    { title: 'প্রোফাইল', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Reservio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0">
              2
            </Badge>
          </button>
          <Link to="/security" className="hidden md:block">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <ShieldCheck className="h-5 w-5" />
            </button>
          </Link>
          <Link to="/profile" className="hidden md:block">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </header>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
        <div className="grid grid-cols-5 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {link.icon}
                <span className="text-xs mt-1">{link.title}</span>
                {isActive && (
                  <div className="absolute top-0 h-1 w-10 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
