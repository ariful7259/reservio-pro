
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GripVertical, 
  Check, 
  X, 
  Edit, 
  Home, 
  ShoppingBag, 
  Calendar, 
  Heart, 
  Star, 
  Bookmark,
  MessageSquare,
  Store,
  User,
  Wallet,
  Settings,
  Wrench,
  Building,
  Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: { bn: string; en: string };
  path: string;
  count?: number;
}

const CustomizableNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Default nav items pool
  const allNavItems: NavItem[] = [
    { id: 'home', icon: Home, label: { bn: 'হোম', en: 'Home' }, path: '/' },
    { id: 'services', icon: Wrench, label: { bn: 'সার্ভিসেস', en: 'Services' }, path: '/services' },
    { id: 'shopping', icon: ShoppingBag, label: { bn: 'শপিং', en: 'Shopping' }, path: '/shopping' },
    { id: 'appointments', icon: Calendar, label: { bn: 'অ্যাপয়েন্টমেন্ট', en: 'Appointments' }, path: '/appointments', count: 3 },
    { id: 'rentals', icon: Building, label: { bn: 'রেন্টালস', en: 'Rentals' }, path: '/rentals' },
    { id: 'favorites', icon: Heart, label: { bn: 'ফেভারিট', en: 'Favorites' }, path: '/favorites' },
    { id: 'wallet', icon: Wallet, label: { bn: 'ওয়ালেট', en: 'Wallet' }, path: '/wallet' },
    { id: 'store', icon: Store, label: { bn: 'স্টোর', en: 'Store' }, path: '/create-store' },
    { id: 'profile', icon: User, label: { bn: 'প্রোফাইল', en: 'Profile' }, path: '/profile' },
    { id: 'messages', icon: MessageSquare, label: { bn: 'মেসেজ', en: 'Messages' }, path: '/messages', count: 5 },
    { id: 'reviews', icon: Star, label: { bn: 'রিভিউস', en: 'Reviews' }, path: '/reviews' },
    { id: 'rewards', icon: Bookmark, label: { bn: 'রিওয়ার্ডস', en: 'Rewards' }, path: '/rewards', count: 2 },
    { id: 'community', icon: Book, label: { bn: 'কমিউনিটি', en: 'Community' }, path: '/community' },
  ];

  // Get user's custom navigation or use default
  const getStoredNavItems = () => {
    if (!isAuthenticated) {
      // For non-authenticated users, return a default set
      return allNavItems.slice(0, 5);
    }
    
    const stored = localStorage.getItem('customNavItems');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default items if nothing stored yet
    return allNavItems.slice(0, 7);
  };

  const [activeNavItems, setActiveNavItems] = useState<NavItem[]>(getStoredNavItems());
  const [tempNavItems, setTempNavItems] = useState<NavItem[]>([]);
  
  useEffect(() => {
    if (isAuthenticated) {
      setActiveNavItems(getStoredNavItems());
    } else {
      setActiveNavItems(allNavItems.slice(0, 5));
    }
  }, [isAuthenticated]);
  
  const startEditing = () => {
    setTempNavItems([...activeNavItems]);
    setIsEditing(true);
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
  };
  
  const saveChanges = () => {
    setActiveNavItems([...tempNavItems]);
    
    if (isAuthenticated) {
      localStorage.setItem('customNavItems', JSON.stringify(tempNavItems));
    }
    
    setIsEditing(false);
  };
  
  const toggleNavItem = (item: NavItem) => {
    if (tempNavItems.some(navItem => navItem.id === item.id)) {
      // Remove item
      setTempNavItems(tempNavItems.filter(navItem => navItem.id !== item.id));
    } else {
      // Add item (limit to max 8 items)
      if (tempNavItems.length < 8) {
        setTempNavItems([...tempNavItems, item]);
      }
    }
  };
  
  const handleNavClick = (path: string) => {
    if (!isEditing) {
      navigate(path);
    }
  };
  
  const isItemActive = (item: NavItem, items: NavItem[]) => {
    return items.some(navItem => navItem.id === item.id);
  };

  return (
    <div className="mb-6">
      <Card className="bg-background border rounded-xl p-2">
        <div className="flex justify-between items-center px-2 py-1">
          <h3 className="text-sm font-medium">
            {language === 'bn' ? 'নেভিগেশন বার' : 'Navigation Bar'}
          </h3>
          
          {isAuthenticated && (
            isEditing ? (
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={cancelEditing} className="h-7 w-7">
                  <X className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={saveChanges} className="h-7 w-7">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="icon" variant="ghost" onClick={startEditing} className="h-7 w-7">
                <Edit className="h-4 w-4" />
              </Button>
            )
          )}
        </div>
        
        {isEditing ? (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground px-2 mb-2">
              {language === 'bn' 
                ? 'আপনি সর্বাধিক ৮টি আইটেম রাখতে পারবেন।'
                : 'You can have up to 8 items.'}
            </p>
            
            <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto p-1">
              {allNavItems.map(item => (
                <Button
                  key={item.id}
                  variant={isItemActive(item, tempNavItems) ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 p-1"
                  onClick={() => toggleNavItem(item)}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">
                    {language === 'bn' ? item.label.bn : item.label.en}
                  </span>
                  {isItemActive(item, tempNavItems) && (
                    <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pt-1">
            {activeNavItems.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 relative"
                onClick={() => handleNavClick(item.path)}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-[10px] text-center">
                  {language === 'bn' ? item.label.bn : item.label.en}
                </span>
                {item.count && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomizableNavigation;
