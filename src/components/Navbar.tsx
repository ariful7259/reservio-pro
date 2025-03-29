
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  User, 
  Wallet, 
  Calendar, 
  Search, 
  Home,
  Building,
  ShoppingBag,
  Settings,
  Menu,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Home className="h-5 w-5" /> },
    { title: 'রেন্ট', path: '/housing', icon: <Building className="h-5 w-5" /> },
    { title: 'সার্ভিস', path: '/services', icon: <Search className="h-5 w-5" /> },
    { title: 'শপিং', path: '/shopping', icon: <ShoppingBag className="h-5 w-5" /> },
    { title: 'প্রোফাইল', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Reservio</span>
        </Link>
        
        <div className="hidden md:flex items-center">
          <span className="text-sm font-medium mr-2">Ariful Islam</span>
          <Button variant="outline" size="sm" className="mr-4 flex items-center gap-1">
            <Plus className="h-3 w-3" />
            প্রপার্টি পোস্ট করুন
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>নোটিফিকেশন</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[
                  { title: 'আপনার অ্যাপয়েন্টমেন্ট ৩০ মিনিট পরে', time: '১০ মিনিট আগে' },
                  { title: 'সাপ্তাহিক অফারঃ ২০% ছাড় সকল সার্ভিসে', time: '২ ঘন্টা আগে' },
                  { title: 'আপনার ওয়ালেট রিচার্জ সফল হয়েছে', time: '১ দিন আগে' },
                ].map((notification, i) => (
                  <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                সব দেখুন
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/wallet" className="hidden md:block">
            <Button variant="outline" size="icon">
              <Wallet className="h-5 w-5" />
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ariful Islam</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>প্রোফাইল</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/appointments">
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>অ্যাপয়েন্টমেন্ট</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/wallet">
                <DropdownMenuItem>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>ওয়ালেট</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/security">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>সেটিংস</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <span>লগআউট</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
