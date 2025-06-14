
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User as UserIcon, ShoppingBag, Wallet, Settings, ShieldCheck, Languages, SunMoon, Store } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DrawerTitle } from '@/components/ui/drawer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

export const UserProfileSection = () => {
  const { user, isSeller, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock language switcher (replace with actual logic as needed)
  const handleLanguageSwitch = () => {
    toast({
      title: "ভাষা পরিবর্তন",
      description: "ল্যাঙ্গুয়েজ সুইচার কাজ করছে (ডেমো)"
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন"
    });
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* ইউজার অবতার */}
      <Avatar>
        <AvatarImage src={user?.avatar || ""} alt={user?.name} />
        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      {/* ইউজার ইনফো */}
      <div className="flex flex-col min-w-0">
        <DrawerTitle className="text-lg truncate">{user?.name}</DrawerTitle>
        <p className="text-sm text-muted-foreground truncate">{user?.phone || user?.email}</p>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-3 font-normal"
            asChild
          >
            <Link to="/profile-management">প্রোফাইল দেখুন</Link>
          </Button>
          {isSeller ? (
            <Button
              variant="default"
              size="sm"
              className="h-7 px-3 font-normal bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link to="/seller-dashboard">
                <Store className="h-4 w-4 mr-1" /> Seller Dashboard
              </Link>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-3 font-normal"
              asChild
            >
              <Link to="/become-seller">Become a Seller</Link>
            </Button>
          )}
        </div>
      </div>
      {/* ড্রপডাউন -- ন্যাভিগেশন ও অ্যাকশনসমূহ */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/orders" className="flex items-center gap-2 w-full">
              <ShoppingBag className="h-4 w-4" /> <span>অর্ডারসমূহ</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/wallet" className="flex items-center gap-2 w-full">
              <Wallet className="h-4 w-4" /> <span>Wallet / Transaction History</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center gap-2 w-full">
              <Settings className="h-4 w-4" /> <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/kyc-verification" className="flex items-center gap-2 w-full">
              <ShieldCheck className="h-4 w-4" /> <span>KYC / Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLanguageSwitch}>
            <Languages className="h-4 w-4 mr-2" /> ভাষা পরিবর্তন
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex items-center gap-2 w-full">
              <SunMoon className="h-4 w-4 mr-2" /> <ThemeToggle />
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOut className="h-4 w-4 mr-2" /> লগআউট
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
