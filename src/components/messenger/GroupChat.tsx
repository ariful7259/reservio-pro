import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Users } from 'lucide-react';

interface GroupChatProps {
  onSelectChat: (chat: any) => void;
}

export const GroupChat: React.FC<GroupChatProps> = ({ onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock group data
  const groups = [
    {
      id: 1,
      name: 'ইলেকট্রনিক্স বিক্রেতা',
      avatar: '/placeholder.svg',
      lastMessage: 'নতুন স্টক এসেছে',
      timestamp: '৫ মিনিট আগে',
      unreadCount: 3,
      memberCount: 25,
      type: 'seller'
    },
    {
      id: 2,
      name: 'ক্রেতা সমিতি',
      avatar: '/placeholder.svg',
      lastMessage: 'কোথায় ভালো ডিল পাবো?',
      timestamp: '১৫ মিনিট আগে',
      unreadCount: 1,
      memberCount: 150,
      type: 'buyer'
    },
    {
      id: 3,
      name: 'ফ্যাশন গ্রুপ',
      avatar: '/placeholder.svg',
      lastMessage: 'নতুন কালেকশন দেখুন',
      timestamp: '১ ঘন্টা আগে',
      unreadCount: 0,
      memberCount: 75,
      type: 'community'
    },
    {
      id: 4,
      name: 'গেমিং কমিউনিটি',
      avatar: '/placeholder.svg',
      lastMessage: 'কে গেম খেলবো?',
      timestamp: '২ ঘন্টা আগে',
      unreadCount: 5,
      memberCount: 200,
      type: 'community'
    }
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="গ্রুপ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectChat(group)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={group.avatar} />
                <AvatarFallback>
                  <Users className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm truncate">{group.name}</h4>
                  <Badge 
                    variant={group.type === 'seller' ? 'default' : group.type === 'buyer' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {group.memberCount}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {group.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">
                  {group.timestamp}
                </span>
                {group.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                    {group.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};