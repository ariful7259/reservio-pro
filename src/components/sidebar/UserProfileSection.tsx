
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  ShoppingBag, 
  Store, 
  Shield, 
  LogOut,
  Bell,
  Heart,
  Wallet
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const UserProfileSection = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileMenuItems = [
    { 
      icon: <User className="h-4 w-4" />, 
      label: 'প্রোফাইল ম্যানেজমেন্ট', 
      path: '/profile-management',
      description: 'আপনার ব্যক্তিগত তথ্য আপডেট করুন'
    },
    { 
      icon: <Store className="h-4 w-4" />, 
      label: 'বিক্রেতা হন', 
      path: '/become-seller',
      description: 'আপনার নিজস্ব দোকান শুরু করুন'
    },
    { 
      icon: <ShoppingBag className="h-4 w-4" />, 
      label: 'আমার অর্ডার', 
      path: '/orders',
      description: 'আপনার সকল অর্ডার দেখুন'
    },
    { 
      icon: <Wallet className="h-4 w-4" />, 
      label: 'ওয়ালেট', 
      path: '/wallet',
      description: 'আপনার ব্যালেন্স ও লেনদেন'
    },
    { 
      icon: <Heart className="h-4 w-4" />, 
      label: 'উইশলিস্ট', 
      path: '/wishlist',
      description: 'আপনার পছন্দের আইটেম'
    },
    { 
      icon: <Bell className="h-4 w-4" />, 
      label: 'নোটিফিকেশন', 
      path: '/notifications',
      description: 'সকল আপডেট দেখুন'
    },
    { 
      icon: <Settings className="h-4 w-4" />, 
      label: 'সেটিংস', 
      path: '/settings',
      description: 'অ্যাপ সেটিংস পরিবর্তন করুন'
    },
    { 
      icon: <Shield className="h-4 w-4" />, 
      label: 'KYC ভেরিফিকেশন', 
      path: '/kyc-verification',
      description: 'আপনার পরিচয় সত্যায়ন করুন'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {user.email}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {user.verified && (
              <Badge variant="secondary" className="text-xs">
                ভেরিফাইড
              </Badge>
            )}
            {user.role === 'admin' && (
              <Badge variant="destructive" className="text-xs">
                অ্যাডমিন
              </Badge>
            )}
            {user.role === 'seller' && (
              <Badge variant="default" className="text-xs">
                সেলার
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Profile Menu Items */}
      <div className="space-y-1">
        {profileMenuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start h-auto p-3 text-left"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        লগআউট
      </Button>
    </div>
  );
};
