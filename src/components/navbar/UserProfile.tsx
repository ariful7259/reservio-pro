
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Shield, LogOut, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

interface MenuItem {
  icon: JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
  show?: boolean;
}

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { language, t } = useApp();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: language === 'bn' ? "লগআউট সফল" : "Logout Successful",
      description: language === 'bn' ? "আপনি সফলভাবে লগআউট হয়েছেন" : "You have been logged out successfully"
    });
    navigate("/login");
  };

  const profileMenuItems: MenuItem[] = isAuthenticated ? [
    {
      icon: <User className="h-5 w-5" />,
      name: language === 'bn' ? "প্রোফাইল" : "Profile",
      path: "/profile"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      name: language === 'bn' ? "অ্যাডমিন ড্যাশবোর্ড" : "Admin Dashboard",
      path: "/admin-dashboard",
      show: isAdmin
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      name: language === 'bn' ? "লগআউট" : "Logout",
      path: "#",
      onClick: handleLogout
    }
  ] : [
    {
      icon: <LogIn className="h-5 w-5" />,
      name: language === 'bn' ? "লগইন" : "Login",
      path: "/login"
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      name: language === 'bn' ? "রেজিস্ট্রেশন" : "Sign Up",
      path: "/signup"
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
          {user ? 
            <img 
              src={user.avatar || "https://i.pravatar.cc/150?img=1"} 
              alt={user.name} 
              className="h-full w-full object-cover" 
            /> : 
            <User className="h-5 w-5" />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {user ? user.name : (language === 'bn' ? "অ্যাকাউন্ট" : "Account")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuItems
          .filter(item => !item.hasOwnProperty('show') || item.show)
          .map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              {item.onClick ? 
                <button 
                  onClick={item.onClick} 
                  className="flex items-center gap-2 w-full"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button> : 
                <Link to={item.path} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              }
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
