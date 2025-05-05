
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Book,
  Calendar,
  Heart,
  MapPin,
  List,
  ShoppingBag,
  Star,
  Store,
  File,
  Gavel,
  UserCheck,
  Building,
  Home,
  DollarSign,
  Calculator,
  FileText,
  Share2,
  HelpCircle,
  MessageCircle,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface MyServicesDropdownProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const MyServicesDropdown: React.FC<MyServicesDropdownProps> = ({ 
  variant = 'outline',
  className = ''
}) => {
  const navigate = useNavigate();
  
  const myServicesMenuItems = [
    {
      icon: <Book className="h-5 w-5" />,
      name: "আমার বুকিংস",
      path: "/my-services?tab=bookings"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      name: "আমার অ্যাপয়েন্টমেন্টস",
      path: "/my-services?tab=appointments"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      name: "আমার শর্টলিস্ট",
      path: "/my-services?tab=shortlists"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      name: "যোগাযোগকৃত প্রোপার্টি",
      path: "/my-services?tab=contactedProperties"
    },
    {
      icon: <List className="h-5 w-5" />,
      name: "আমার লিস্টিংস",
      path: "/my-services?tab=listings"
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      name: "আমার শপ",
      path: "/my-services?tab=shop"
    },
    {
      icon: <Star className="h-5 w-5" />,
      name: "স্মার্ট রেকমেন্ডেশন",
      path: "/my-services?tab=recommendations"
    },
    {
      icon: <Store className="h-5 w-5" />,
      name: "বিক্রেতা ড্যাশবোর্ড",
      path: "/my-services?tab=sellerDashboard"
    }
  ];

  const legalAssistanceMenuItems = [
    {
      icon: <File className="h-5 w-5 text-red-500" />,
      name: "রেন্টাল এগ্রিমেন্ট",
      path: "/services/rental-agreement"
    },
    {
      icon: <Gavel className="h-5 w-5 text-red-500" />,
      name: "পুলিশ ইনটিমেশন",
      path: "/services/police-intimation"
    },
    {
      icon: <UserCheck className="h-5 w-5 text-red-500" />,
      name: "টেনান্ট ভেরিফিকেশন",
      path: "/services/tenant-verification"
    },
    {
      icon: <Building className="h-5 w-5 text-red-500" />,
      name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
      path: "/services/property-legal-assistance"
    },
    {
      icon: <Home className="h-5 w-5 text-red-500" />,
      name: "হোম লোন",
      path: "/services/home-loan"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      name: "হোম ডিপোজিট লোন",
      path: "/services/home-deposit-loan"
    }
  ];

  const utilitiesMenuItems = [
    {
      icon: <Calculator className="h-5 w-5 text-red-500" />,
      name: "নো ইয়োর রেন্ট",
      path: "/utilities/know-your-rent"
    },
    {
      icon: <FileText className="h-5 w-5 text-red-500" />,
      name: "ক্রিয়েট রেন্ট রিসিপ্টস",
      path: "/utilities/create-rent-receipts"
    },
    {
      icon: <Share2 className="h-5 w-5 text-red-500" />,
      name: "ক্লিক এন্ড আর্ন",
      path: "/utilities/click-and-earn"
    }
  ];

  const helpAndSupportMenuItems = [
    {
      icon: <HelpCircle className="h-5 w-5 text-red-500" />,
      name: "সাপোর্ট টপিকস",
      path: "/help/support-topics"
    },
    {
      icon: <Book className="h-5 w-5 text-red-500" />,
      name: "ব্লগ",
      path: "/help/blog"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-red-500" />,
      name: "ফিডব্যাক",
      path: "/help/feedback"
    },
    {
      icon: <Info className="h-5 w-5 text-red-500" />,
      name: "অ্যাবাউট আস",
      path: "/help/about-us"
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className={`w-full flex items-center justify-between ${className}`}>
          <span>আমার সার্ভিস দেখুন</span>
          <span className="ml-2">▼</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>আমার সার্ভিসগুলো</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          {myServicesMenuItems.map((item, index) => (
            <DropdownMenuItem key={`service-${index}`} asChild>
              <Link to={item.path} className="flex items-center gap-2 py-2">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="py-2">
            <File className="h-5 w-5 mr-2 text-red-500" />
            <span>লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56">
            {legalAssistanceMenuItems.map((item, index) => (
              <DropdownMenuItem key={`legal-${index}`} asChild>
                <Link to={item.path} className="flex items-center gap-2 py-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="py-2">
            <Calculator className="h-5 w-5 mr-2 text-red-500" />
            <span>ইউটিলিটিস</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56">
            {utilitiesMenuItems.map((item, index) => (
              <DropdownMenuItem key={`utility-${index}`} asChild>
                <Link to={item.path} className="flex items-center gap-2 py-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="py-2">
            <HelpCircle className="h-5 w-5 mr-2 text-red-500" />
            <span>হেল্প এন্ড সাপোর্ট</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56">
            {helpAndSupportMenuItems.map((item, index) => (
              <DropdownMenuItem key={`help-${index}`} asChild>
                <Link to={item.path} className="flex items-center gap-2 py-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyServicesDropdown;
