
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DrawerTitle } from '@/components/ui/drawer';
import { useAuth } from '@/hooks/useAuth';

interface ProfileMenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
  badge?: number;
  show?: boolean;
}

interface UserProfileSectionProps {
  profileMenuItems: ProfileMenuItem[];
}

export const UserProfileSection = ({ profileMenuItems }: UserProfileSectionProps) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user?.avatar || ""} alt={user?.name} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <DrawerTitle className="text-lg">{user?.name}</DrawerTitle>
        <p className="text-sm text-muted-foreground">{user?.phone || user?.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {profileMenuItems.filter(item => !item.hasOwnProperty('show') || item.show).map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link to={item.path} className="flex items-center gap-2 w-full">
                {item.icon}
                <span>{item.name}</span>
                {item.badge && <Badge variant="destructive" className="ml-auto">{item.badge}</Badge>}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
