
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

// Map of route paths to display names in English and Bengali
const routeNameMap: Record<string, { en: string; bn: string }> = {
  'services': { en: 'Services', bn: 'সেবাসমূহ' },
  'services/category': { en: 'Category', bn: 'ক্যাটাগরি' },
  'appointments': { en: 'Appointments', bn: 'অ্যাপয়েন্টমেন্ট' },
  'appointment-booking': { en: 'Booking', bn: 'বুকিং' },
  'wallet': { en: 'Wallet', bn: 'ওয়ালেট' },
  'profile': { en: 'Profile', bn: 'প্রোফাইল' },
  'security': { en: 'Security', bn: 'সিকিউরিটি' },
  'security/2fa': { en: '2FA', bn: 'দুই ফ্যাক্টর' },
  'kyc-verification': { en: 'KYC Verification', bn: 'কেওয়াইসি' },
  'rentals': { en: 'Rentals', bn: 'ভাড়া' },
  'shopping': { en: 'Shopping', bn: 'শপিং' },
  'shopping/category': { en: 'Category', bn: 'ক্যাটাগরি' },
  'marketplace': { en: 'Marketplace', bn: 'মার্কেটপ্লেস' },
  'notifications': { en: 'Notifications', bn: 'নোটিফিকেশন' },
  'rent-anything': { en: 'Rent Anything', bn: 'যেকোনো ভাড়া' },
  'rent': { en: 'Rent', bn: 'ভাড়া' },
  'rent/apartment': { en: 'Apartment', bn: 'অ্যাপার্টমেন্ট' },
  'rent/house': { en: 'House', bn: 'বাড়ি' },
  'rent/car': { en: 'Car', bn: 'গাড়ি' },
  'rent/office': { en: 'Office', bn: 'অফিস' },
  'rent/event-space': { en: 'Event Space', bn: 'ইভেন্ট স্পেস' },
  'rent/equipment': { en: 'Equipment', bn: 'সরঞ্জাম' },
  'rent/shop': { en: 'Shop', bn: 'দোকান' },
  'rent/others': { en: 'Others', bn: 'অন্যান্য' },
  'my-services': { en: 'My Services', bn: 'আমার সেবাসমূহ' },
  'utilities': { en: 'Utilities', bn: 'উটিলিটি' },
  'help': { en: 'Help', bn: 'সাহায্য' },
  'create-post': { en: 'Create Post', bn: 'পোস্ট তৈরি' },
  'feedback': { en: 'Feedback', bn: 'প্রতিক্রিয়া' },
  'qr-scanner': { en: 'QR Scanner', bn: 'কিউআর স্ক্যানার' },
  'login': { en: 'Login', bn: 'লগইন' },
  'signup': { en: 'Sign Up', bn: 'সাইন আপ' },
  'profile-management': { en: 'Profile Management', bn: 'প্রোফাইল ম্যানেজমেন্ট' },
  'messages': { en: 'Messages', bn: 'মেসেজ' },
  'search': { en: 'Search', bn: 'সার্চ' },
  'payment': { en: 'Payment', bn: 'পেমেন্ট' },
  'referral': { en: 'Referral', bn: 'রেফারাল' },
  'favorites': { en: 'Favorites', bn: 'পছন্দ' },
  'reviews': { en: 'Reviews', bn: 'রিভিউ' },
  'rewards': { en: 'Rewards', bn: 'রিওয়ার্ড' },
  'language-settings': { en: 'Language Settings', bn: 'ভাষা সেটিংস' },
  'offline-mode': { en: 'Offline Mode', bn: 'অফলাইন মোড' }
};

interface BreadcrumbTrailProps {
  className?: string;
}

export const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ className }) => {
  const location = useLocation();
  const { language } = useApp();
  
  // Skip rendering breadcrumbs on the home page
  if (location.pathname === '/') {
    return null;
  }
  
  // Create breadcrumbs array from pathname
  const pathnames = location.pathname.split('/').filter(p => p);
  
  const getNameForPath = (path: string, index: number) => {
    // Check if it's a dynamic segment (like an ID)
    if (path.match(/^[0-9a-fA-F-]+$/)) {
      return language === 'bn' ? 'বিবরণ' : 'Details';
    }
    
    // For non-dynamic segments, look up in the map
    const key = pathnames.slice(0, index + 1).join('/');
    const fallbackKey = path;
    
    if (routeNameMap[key]) {
      return language === 'bn' ? routeNameMap[key].bn : routeNameMap[key].en;
    } else if (routeNameMap[fallbackKey]) {
      return language === 'bn' ? routeNameMap[fallbackKey].bn : routeNameMap[fallbackKey].en;
    }
    
    // Default case if no matching key found
    return path;
  };

  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-1">
        <li>
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">
              {language === 'bn' ? 'হোম' : 'Home'}
            </span>
          </Link>
        </li>
        
        {pathnames.map((path, index) => {
          const isLast = index === pathnames.length - 1;
          // Build up the path for the link
          const url = `/${pathnames.slice(0, index + 1).join('/')}`;
          const displayName = getNameForPath(path, index);
          
          return (
            <li key={url} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              
              {isLast ? (
                <span className="font-medium">{displayName}</span>
              ) : (
                <Link
                  to={url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
