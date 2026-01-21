import React from 'react';
import { 
  Smartphone, 
  Zap, 
  Droplets, 
  Wifi, 
  Building, 
  Car, 
  GraduationCap,
  Plane,
  Globe,
  Hotel,
  Bus,
  Film,
  Cable,
  Calendar,
  Shield
} from 'lucide-react';
import WalletServiceGrid from './WalletServiceGrid';

interface WalletServiceCategoriesProps {
  onServiceClick?: (service: string) => void;
}

const WalletServiceCategories: React.FC<WalletServiceCategoriesProps> = ({
  onServiceClick
}) => {
  const utilityServices = [
    { title: 'টপআপ ও ডাটা', icon: <Smartphone className="h-5 w-5" />, onClick: () => onServiceClick?.('topup') },
    { title: 'বিদ্যুৎ বিল', icon: <Zap className="h-5 w-5" />, onClick: () => onServiceClick?.('electricity') },
    { title: 'পানি বিল', icon: <Droplets className="h-5 w-5" />, onClick: () => onServiceClick?.('water') },
    { title: 'ইন্টারনেট', icon: <Wifi className="h-5 w-5" />, onClick: () => onServiceClick?.('internet') },
    { title: 'সরকারি পেমেন্ট', icon: <Building className="h-5 w-5" />, onClick: () => onServiceClick?.('govt') },
    { title: 'ট্রাফিক জরিমানা', icon: <Car className="h-5 w-5" />, onClick: () => onServiceClick?.('traffic') },
    { title: 'শিক্ষা ফি', icon: <GraduationCap className="h-5 w-5" />, onClick: () => onServiceClick?.('education') },
    { title: 'গ্যাস বিল', icon: <Zap className="h-5 w-5" />, onClick: () => onServiceClick?.('gas') },
  ];

  const travelServices = [
    { title: 'এয়ারলাইন্স', icon: <Plane className="h-5 w-5" />, onClick: () => onServiceClick?.('airlines') },
    { title: 'আন্তর্জাতিক এয়ারলাইন্স', icon: <Globe className="h-5 w-5" />, onClick: () => onServiceClick?.('intl-airlines') },
    { title: 'হোটেল', icon: <Hotel className="h-5 w-5" />, onClick: () => onServiceClick?.('hotels') },
    { title: 'বাস টিকেট', icon: <Bus className="h-5 w-5" />, onClick: () => onServiceClick?.('bus') },
    { title: 'মুভি', icon: <Film className="h-5 w-5" />, onClick: () => onServiceClick?.('movies') },
    { title: 'কেবল কার', icon: <Cable className="h-5 w-5" />, onClick: () => onServiceClick?.('cable-car') },
    { title: 'ইভেন্টস', icon: <Calendar className="h-5 w-5" />, onClick: () => onServiceClick?.('events') },
    { title: 'ট্রেন টিকেট', icon: <Bus className="h-5 w-5" />, onClick: () => onServiceClick?.('train') },
  ];

  const insuranceServices = [
    { title: 'লাইফ ইন্স্যুরেন্স', icon: <Shield className="h-5 w-5" />, onClick: () => onServiceClick?.('life-insurance') },
    { title: 'হেলথ ইন্স্যুরেন্স', icon: <Shield className="h-5 w-5" />, onClick: () => onServiceClick?.('health-insurance') },
    { title: 'গাড়ি ইন্স্যুরেন্স', icon: <Car className="h-5 w-5" />, onClick: () => onServiceClick?.('car-insurance') },
  ];

  return (
    <div className="px-4 py-4 bg-gray-50">
      <WalletServiceGrid 
        title="ইউটিলিটি ও বিল পেমেন্ট" 
        services={utilityServices}
        onViewMore={() => onServiceClick?.('utility-more')}
      />
      
      <WalletServiceGrid 
        title="ট্রাভেল ও টিকেটিং" 
        services={travelServices}
        onViewMore={() => onServiceClick?.('travel-more')}
      />
      
      <WalletServiceGrid 
        title="ইন্স্যুরেন্স" 
        services={insuranceServices}
      />
    </div>
  );
};

export default WalletServiceCategories;
