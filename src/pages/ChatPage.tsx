
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/Chat/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
}

// Mock contacts
const MOCK_CONTACTS: Contact[] = [
  {
    id: '2',
    name: 'রহিম মিয়া',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'আমি আগামীকাল বিকাল ৪টায় বুক করতে চাই।',
    lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '3',
    name: 'করিম আলী',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'আপনার সার্ভিসটি কবে থেকে শুরু হবে?',
    lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '4',
    name: 'তাসনিম জাহান',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'ধন্যবাদ আপনার সহযোগিতার জন্য।',
    lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
    unreadCount: 0,
    isOnline: true,
  },
];

const ChatPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const selectedContact = MOCK_CONTACTS.find((c) => c.id === selectedContactId);
  
  const filteredContacts = MOCK_CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format time relative to now
  const formatRelativeTime = (date: Date | undefined) => {
    if (!date) return '';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('bn-BD', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffInHours < 48) {
      return 'গতকাল';
    } else {
      return date.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'short'
      });
    }
  };
  
  if (!user) return null;

  return (
    <div className="container px-4 pt-20 pb-24">
      <h1 className="text-2xl font-bold mb-6">মেসেজ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Contacts list */}
        <Card className="md:col-span-1 overflow-hidden">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="কন্টাক্ট খুঁজুন..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-auto max-h-[450px]">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedContactId === contact.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedContactId(contact.id)}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="font-medium truncate">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatRelativeTime(contact.lastMessageTime)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </div>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge variant="default" className="rounded-full h-5 min-w-5 flex items-center justify-center p-1">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                কোন কন্টাক্ট পাওয়া যায়নি
              </div>
            )}
          </div>
        </Card>
        
        {/* Chat interface */}
        <Card className="md:col-span-2 overflow-hidden">
          {selectedContact ? (
            <ChatInterface
              recipientId={selectedContact.id}
              recipientName={selectedContact.name}
              recipientAvatar={selectedContact.avatar}
            />
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              </div>
              <h3 className="text-lg font-medium mb-1">চ্যাট শুরু করুন</h3>
              <p className="text-sm text-muted-foreground">
                বার্তা পাঠানোর জন্য বাম পাশ থেকে একটি কন্টাক্ট নির্বাচন করুন
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
