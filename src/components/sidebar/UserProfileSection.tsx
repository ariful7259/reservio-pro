
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
      </div>
      {/* ড্রপডাউন -- সব বাটন ও ন্যাভিগেশন */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">

          {/* দুইটা বাটন drop down menu-র একদম উপরে */}
          <DropdownMenuItem asChild>
            <Link to="/profile-management" className="flex items-center gap-2 w-full">
              <UserIcon className="h-4 w-4" /> <span>প্রোফাইল দেখুন</span>
            </Link>
          </DropdownMenuItem>
          {isSeller ? (
            <DropdownMenuItem asChild>
              <Link to="/seller-dashboard" className="flex items-center gap-2 w-full">
                <Store className="h-4 w-4" /> <span>Seller Dashboard</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link to="/become-seller" className="flex items-center gap-2 w-full">
                <Store className="h-4 w-4" /> <span>Become a Seller</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />

          {/* আগে থেকে থাকা অপশনগুলো নিচে */}
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

