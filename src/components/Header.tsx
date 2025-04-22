
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Package, Building, Wrench, Video } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">ডিজিটাল মার্কেটপ্লেস</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>হোম</span>
            </Link>
            <Link to="/dashboard/marketplace" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Package className="h-4 w-4" />
              <span>মার্কেটপ্লেস</span>
            </Link>
            <Link to="/dashboard/rental" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Building className="h-4 w-4" />
              <span>রেন্টাল</span>
            </Link>
            <Link to="/dashboard/service" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Wrench className="h-4 w-4" />
              <span>সার্ভিস</span>
            </Link>
            <Link to="/dashboard/content" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Video className="h-4 w-4" />
              <span>কন্টেন্ট</span>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/my-services">আমার সার্ভিস</Link>
            </Button>
            <Button asChild>
              <Link to="/login">লগইন</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
