
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Shield, LogOut, LogIn } from 'lucide-react';
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

interface MenuItem {
  icon: JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
  show?: boolean;
}

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন"
    });
    navigate("/login");
  };

  const profileMenuItems: MenuItem[] = isAuthenticated ? [
    {
      icon: <User className="h-5 w-5" />,
      name: "প্রোফাইল",
      path: "/profile-management"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      name: "অ্যাডমিন ড্যাশবোর্ড",
      path: "/admin-dashboard",
      show: isAdmin
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      name: "লগআউট",
      path: "#",
      onClick: handleLogout
    }
  ] : [
    {
      icon: <LogIn className="h-5 w-5" />,
      name: "লগইন",
      path: "/login"
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
          {user ? user.name : "অ্যাকাউন্ট"}
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
