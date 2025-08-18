import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Store, Users } from 'lucide-react';

interface ChatListProps {
  type: 'direct' | 'community';
  onSelectChat: (chat: any) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ type, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for different chat types
  const chats = type === 'direct' ? [
    {
      id: 1,
      name: 'আহমেদ ভাই',
      avatar: '/placeholder.svg',
      lastMessage: 'iPhone টা কবে ডেলিভারি হবে?',
      timestamp: '১০ মিনিট আগে',
      unreadCount: 2,
      type: 'buyer',
      isOnline: true
    },
    {
      id: 2,
      name: 'সারা আপু',
      avatar: '/placeholder.svg',
      lastMessage: 'ল্যাপটপের দাম কত?',
      timestamp: '৩০ মিনিট আগে',
      unreadCount: 0,
      type: 'seller',
      isOnline: false
    },
    {
      id: 3,
      name: 'করিম সাহেব',
      avatar: '/placeholder.svg',
      lastMessage: 'প্রোডাক্ট রিটার্ন করতে চাই',
      timestamp: '১ ঘন্টা আগে',
      unreadCount: 1,
      type: 'buyer',
      isOnline: true
    }
  ] : [
    {
      id: 4,
      name: 'রহিম উদ্দিন',
      avatar: '/placeholder.svg',
      lastMessage: 'নতুন অফার আছে?',
      timestamp: '৫ মিনিট আগে',
      unreadCount: 1,
      type: 'friend',
      isOnline: true
    },
    {
      id: 5,
      name: 'ফাতেমা খাতুন',
      avatar: '/placeholder.svg',
      lastMessage: 'আজ মার্কেট যাব?',
      timestamp: '২০ মিনিট আগে',
      unreadCount: 0,
      type: 'friend',
      isOnline: false
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="চ্যাট খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                  {chat.type === 'buyer' && <Store className="h-3 w-3 text-blue-500" />}
                  {chat.type === 'seller' && <Store className="h-3 w-3 text-green-500" />}
                  {chat.type === 'friend' && <Users className="h-3 w-3 text-purple-500" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">
                  {chat.timestamp}
                </span>
                {chat.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                    {chat.unreadCount}
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