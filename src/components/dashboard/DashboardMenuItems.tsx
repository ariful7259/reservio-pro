
import React from 'react';
import { 
  Store, 
  Package, 
  BarChart3, 
  Users, 
  Calendar, 
  Home, 
  Settings, 
  MessageSquare, 
  Building, 
  Wrench, 
  Video
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface DashboardMenuItemsProps {
  type: 'marketplace' | 'rental' | 'service' | 'content';
  onItemClick?: () => void;
}

export const DashboardMenuItems: React.FC<DashboardMenuItemsProps> = ({ 
  type,
  onItemClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems(type);
  
  return menuItems.map((item) => (
    <MenuItem 
      key={item.path}
      item={item}
      isActive={location.pathname === item.path}
      onClick={() => {
        navigate(item.path);
        if (onItemClick) onItemClick();
      }}
    />
  ));
};

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onClick }) => {
  return (
    <li className="w-full">
      <button
        className={`flex items-center w-full gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary justify-start ${
          isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
        }`}
        onClick={onClick}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.title}</span>
      </button>
    </li>
  );
};

export const getMenuItems = (dashboardType: string): MenuItem[] => {
  const commonItems = [
    {
      title: 'হোম',
      icon: Home,
      path: `/dashboard/${dashboardType}`,
    },
    {
      title: 'অ্যানালিটিক্স',
      icon: BarChart3,
      path: `/dashboard/${dashboardType}/analytics`,
    },
    {
      title: 'গ্রাহক ব্যবস্থাপনা',
      icon: Users,
      path: `/dashboard/${dashboardType}/customers`,
    },
    {
      title: 'সেটিংস',
      icon: Settings,
      path: `/dashboard/${dashboardType}/settings`,
    },
  ];
  
  let specificItems: MenuItem[] = [];
  
  switch (dashboardType) {
    case 'marketplace':
      specificItems = [
        {
          title: 'প্রোডাক্ট ম্যানেজমেন্ট',
          icon: Package,
          path: `/dashboard/${dashboardType}/products`,
        },
        {
          title: 'অর্ডার ট্র্যাকিং',
          icon: Package,
          path: `/dashboard/${dashboardType}/orders`,
        },
        {
          title: 'ইনভেন্টরি',
          icon: Package,
          path: `/dashboard/${dashboardType}/inventory`,
        },
        {
          title: 'রিভিউ ম্যানেজমেন্ট',
          icon: MessageSquare,
          path: `/dashboard/${dashboardType}/reviews`,
        },
        {
          title: 'প্রোমোশন টুলস',
          icon: MessageSquare,
          path: `/dashboard/${dashboardType}/promotions`,
        },
      ];
      break;
    case 'rental':
      specificItems = [
        {
          title: 'প্রপার্টি ম্যানেজমেন্ট',
          icon: Building,
          path: `/dashboard/${dashboardType}/properties`,
        },
        {
          title: 'বুকিং ম্যানেজমেন্ট',
          icon: Calendar,
          path: `/dashboard/${dashboardType}/bookings`,
        },
        {
          title: 'পেমেন্ট ট্র্যাকিং',
          icon: Package,
          path: `/dashboard/${dashboardType}/payments`,
        },
        {
          title: 'মেইনটেনেন্স রিকোয়েস্ট',
          icon: Wrench,
          path: `/dashboard/${dashboardType}/maintenance`,
        },
        {
          title: 'অকুপেন্সি রেট',
          icon: BarChart3,
          path: `/dashboard/${dashboardType}/occupancy`,
        },
        {
          title: 'রেটিং এবং রিভিউ',
          icon: MessageSquare,
          path: `/dashboard/${dashboardType}/reviews`,
        },
      ];
      break;
    case 'service':
      specificItems = [
        {
          title: 'সার্ভিস ম্যানেজমেন্ট',
          icon: Wrench,
          path: `/dashboard/${dashboardType}/services`,
        },
        {
          title: 'অ্যাপয়েন্টমেন্ট শিডিউল',
          icon: Calendar,
          path: `/dashboard/${dashboardType}/appointments`,
        },
        {
          title: 'ক্লায়েন্ট ম্যানেজমেন্ট',
          icon: Users,
          path: `/dashboard/${dashboardType}/clients`,
        },
        {
          title: 'পেমেন্ট ট্র্যাকিং',
          icon: Package,
          path: `/dashboard/${dashboardType}/payments`,
        },
        {
          title: 'সার্ভিস পারফরম্যান্স',
          icon: BarChart3,
          path: `/dashboard/${dashboardType}/performance`,
        },
        {
          title: 'প্রমোশন টুলস',
          icon: MessageSquare,
          path: `/dashboard/${dashboardType}/promotions`,
        },
      ];
      break;
    case 'content':
      specificItems = [
        {
          title: 'কন্টেন্ট ম্যানেজমেন্ট',
          icon: Video,
          path: `/dashboard/${dashboardType}/contents`,
        },
        {
          title: 'অডিয়েন্স অ্যানালিটিক্স',
          icon: BarChart3,
          path: `/dashboard/${dashboardType}/audience`,
        },
        {
          title: 'মানিটাইজেশন ট্র্যাকিং',
          icon: Package,
          path: `/dashboard/${dashboardType}/monetization`,
        },
        {
          title: 'কমেন্ট এবং ফিডব্যাক',
          icon: MessageSquare,
          path: `/dashboard/${dashboardType}/comments`,
        },
        {
          title: 'ট্রেন্ড অ্যানালিসিস',
          icon: BarChart3,
          path: `/dashboard/${dashboardType}/trends`,
        },
        {
          title: 'কলাবোরেশন টুলস',
          icon: Users,
          path: `/dashboard/${dashboardType}/collaboration`,
        },
      ];
      break;
    default:
      break;
  }
  
  return [...specificItems, ...commonItems];
};
