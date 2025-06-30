
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User as UserIcon, ShoppingBag, Wallet, Settings, ShieldCheck, Languages, SunMoon, Store } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DrawerTitle } from '@/components/ui/drawer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export const UserProfileSection = () => {
  const { user, isSeller, logout } = useAuth();
  const { language, setLanguage, t } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'bn' | 'en') => {
    setLanguage(newLanguage);
    toast({
      title: newLanguage === 'bn' ? "ভাষা পরিবর্তিত হয়েছে" : "Language Changed",
      description: newLanguage === 'bn' ? "বাংলা ভাষায় সেট করা হয়েছে" : "Set to English language"
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: language === 'bn' ? "লগআউট সফল" : "Logout Successful",
      description: language === 'bn' ? "আপনি সফলভাবে লগআউট হয়েছেন" : "You have been logged out successfully"
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
              <UserIcon className="h-4 w-4" /> 
              <span>{language === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}</span>
            </Link>
          </DropdownMenuItem>
          {isSeller ? (
            <DropdownMenuItem asChild>
              <Link to="/seller-dashboard" className="flex items-center gap-2 w-full">
                <Store className="h-4 w-4" /> 
                <span>{language === 'bn' ? 'সেলার ড্যাশবোর্ড' : 'Seller Dashboard'}</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link to="/become-seller" className="flex items-center gap-2 w-full">
                <Store className="h-4 w-4" /> 
                <span>{language === 'bn' ? 'সেলার হন' : 'Become a Seller'}</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />

          {/* আগে থেকে থাকা অপশনগুলো নিচে */}
          <DropdownMenuItem asChild>
            <Link to="/orders" className="flex items-center gap-2 w-full">
              <ShoppingBag className="h-4 w-4" /> 
              <span>{language === 'bn' ? 'অর্ডারসমূহ' : 'Orders'}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/wallet" className="flex items-center gap-2 w-full">
              <Wallet className="h-4 w-4" /> 
              <span>{language === 'bn' ? 'ওয়ালেট / লেনদেনের ইতিহাস' : 'Wallet / Transaction History'}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center gap-2 w-full">
              <Settings className="h-4 w-4" /> 
              <span>{language === 'bn' ? 'সেটিংস' : 'Settings'}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/kyc-verification" className="flex items-center gap-2 w-full">
              <ShieldCheck className="h-4 w-4" /> 
              <span>{language === 'bn' ? 'KYC / নিরাপত্তা' : 'KYC / Security'}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          {/* Language Submenu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="h-4 w-4 mr-2" /> 
              {language === 'bn' ? 'ভাষা পরিবর্তন' : 'Change Language'}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('bn')}
                className={language === 'bn' ? 'bg-accent' : ''}
              >
                🇧🇩 বাংলা
                {language === 'bn' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className={language === 'en' ? 'bg-accent' : ''}
              >
                🇺🇸 English
                {language === 'en' && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuItem>
            <span className="flex items-center gap-2 w-full">
              <SunMoon className="h-4 w-4 mr-2" /> <ThemeToggle />
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOut className="h-4 w-4 mr-2" /> 
            {language === 'bn' ? 'লগআউট' : 'Logout'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
