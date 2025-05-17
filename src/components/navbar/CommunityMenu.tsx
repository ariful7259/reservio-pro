
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileIcon, CalendarIcon, MessageCircle, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const CommunityMenu: React.FC = () => {
  const communityFeatures = [
    {
      icon: <FileIcon className="h-4 w-4 text-blue-500" />,
      name: "স্টোরি শেয়ারিং",
      path: "/stories",
      description: "অভিজ্ঞতা শেয়ার করুন"
    },
    {
      icon: <CalendarIcon className="h-4 w-4 text-green-500" />,
      name: "ইভেন্ট ক্যালেন্ডার",
      path: "/events",
      description: "কমিউনিটি ইভেন্টগুলো দেখুন"
    },
    {
      icon: <MessageCircle className="h-4 w-4 text-purple-500" />,
      name: "ফোরাম",
      path: "/forums",
      description: "কমিউনিটি আলোচনা"
    },
    {
      icon: <UsersRound className="h-4 w-4 text-orange-500" />,
      name: "গ্রুপ বুকিং",
      path: "/group-booking",
      description: "একসাথে সার্ভিস/প্রোডাক্ট নিন"
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">কমিউনিটি</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>কমিউনিটি ফিচার</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {communityFeatures.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link to={item.path} className="flex flex-col gap-1 py-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              <p className="text-xs text-muted-foreground pl-6">{item.description}</p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
