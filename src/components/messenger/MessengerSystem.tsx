import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Users, 
  Send, 
  Paperclip, 
  Mic, 
  Search,
  Phone,
  Video,
  Settings,
  Plus,
  UserPlus,
  Hash,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MessengerSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: Date;
  type: 'text' | 'file' | 'voice' | 'image';
  isRead: boolean;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
  lastMessage?: string;
  lastActivity?: Date;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatar?: string;
  lastMessage?: string;
  lastActivity?: Date;
  role: 'admin' | 'member';
}

export const MessengerSystem: React.FC<MessengerSystemProps> = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demo
  useEffect(() => {
    if (isOpen) {
      loadMockData();
    }
  }, [isOpen]);

  const loadMockData = () => {
    // Mock contacts
    setContacts([
      {
        id: '1',
        name: 'আহমেদ হাসান',
        avatar: '/placeholder.svg',
        isOnline: true,
        unreadCount: 3
      },
      {
        id: '2',
        name: 'ফাতিমা খান',
        avatar: '/placeholder.svg',
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 0
      },
      {
        id: '3',
        name: 'রহিম উদ্দিন',
        avatar: '/placeholder.svg',
        isOnline: true,
        unreadCount: 1
      }
    ]);

    // Mock groups
    setGroups([
      {
        id: 'g1',
        name: 'মোবাইল বিক্রেতা',
        description: 'মোবাইল ফোন বিক্রয়ের জন্য গ্রুপ',
        memberCount: 156,
        role: 'member',
        lastMessage: 'নতুন iPhone মডেল এসেছে',
        lastActivity: new Date()
      },
      {
        id: 'g2',
        name: 'ক্লিনিং সার্ভিস',
        description: 'বাসা অফিস পরিষ্কারের সেবা',
        memberCount: 89,
        role: 'admin',
        lastMessage: 'আজ বিশেষ ছাড়!',
        lastActivity: new Date(Date.now() - 1000 * 60 * 15)
      }
    ]);

    // Mock channels
    setChannels([
      {
        id: 'c1',
        name: 'সাধারণ ঘোষণা',
        description: 'প্ল্যাটফর্মের সাধারণ আপডেট',
        memberCount: 1250,
        isPublic: true,
        lastMessage: 'নতুন ফিচার যোগ করা হয়েছে',
        lastActivity: new Date()
      },
      {
        id: 'c2',
        name: 'দৈনিক অফার',
        description: 'প্রতিদিনের বিশেষ অফার',
        memberCount: 890,
        isPublic: true,
        lastMessage: 'আজকের স্পেশাল ডিল!',
        lastActivity: new Date(Date.now() - 1000 * 60 * 5)
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: 'current-user',
      recipientId: selectedContact?.id || selectedGroup?.id || selectedChannel?.id || '',
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'ধন্যবাদ! আমি আপনার মেসেজ পেয়েছি।',
        senderId: selectedContact?.id || 'system',
        recipientId: 'current-user',
        timestamp: new Date(),
        type: 'text',
        isRead: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderChatHeader = () => {
    const target = selectedContact || selectedGroup || selectedChannel;
    if (!target) return null;

    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={selectedContact?.avatar || selectedGroup?.avatar} />
            <AvatarFallback>
              {selectedContact ? target.name[0] : 
               selectedGroup ? <Users className="h-4 w-4" /> :
               <Hash className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{target.name}</h3>
            {selectedContact && (
              <p className="text-sm text-muted-foreground">
                {selectedContact.isOnline ? 'অনলাইন' : 'অফলাইন'}
              </p>
            )}
            {selectedGroup && (
              <p className="text-sm text-muted-foreground">
                {selectedGroup.memberCount} সদস্য
              </p>
            )}
            {selectedChannel && (
              <p className="text-sm text-muted-foreground">
                {selectedChannel.memberCount} সদস্য
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedContact && (
            <>
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderMessageList = () => (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderId === 'current-user'
                  ? 'bg-primary text-white'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );

  const renderMessageInput = () => (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="মেসেজ লিখুন..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button variant="ghost" size="sm">
          <Mic className="h-4 w-4" />
        </Button>
        <Button onClick={handleSendMessage} size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-80 border-r flex flex-col">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                মেসেঞ্জার
              </DialogTitle>
            </DialogHeader>

            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 m-4">
                <TabsTrigger value="chats">চ্যাট</TabsTrigger>
                <TabsTrigger value="groups">গ্রুপ</TabsTrigger>
                <TabsTrigger value="channels">চ্যানেল</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="chats" className="mt-0 h-full">
                  <ScrollArea className="h-full">
                    <div className="p-2">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => {
                            setSelectedContact(contact);
                            setSelectedGroup(null);
                            setSelectedChannel(null);
                            setMessages([]);
                          }}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                            selectedContact?.id === contact.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            {contact.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {contact.isOnline ? 'অনলাইন' : 'অফলাইন'}
                            </p>
                          </div>
                          {contact.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="groups" className="mt-0 h-full">
                  <ScrollArea className="h-full">
                    <div className="p-2">
                      <Button className="w-full mb-3" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        নতুন গ্রুপ
                      </Button>
                      {groups.map((group) => (
                        <div
                          key={group.id}
                          onClick={() => {
                            setSelectedGroup(group);
                            setSelectedContact(null);
                            setSelectedChannel(null);
                            setMessages([]);
                          }}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                            selectedGroup?.id === group.id ? 'bg-muted' : ''
                          }`}
                        >
                          <Avatar>
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>
                              <Users className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{group.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {group.lastMessage}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-xs">
                              {group.memberCount}
                            </Badge>
                            {group.role === 'admin' && (
                              <Badge variant="outline" className="text-xs mt-1">
                                অ্যাডমিন
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="channels" className="mt-0 h-full">
                  <ScrollArea className="h-full">
                    <div className="p-2">
                      <Button className="w-full mb-3" variant="outline">
                        <Hash className="h-4 w-4 mr-2" />
                        চ্যানেল খুঁজুন
                      </Button>
                      {channels.map((channel) => (
                        <div
                          key={channel.id}
                          onClick={() => {
                            setSelectedChannel(channel);
                            setSelectedContact(null);
                            setSelectedGroup(null);
                            setMessages([]);
                          }}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                            selectedChannel?.id === channel.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Hash className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{channel.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {channel.lastMessage}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {channel.memberCount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact || selectedGroup || selectedChannel ? (
              <>
                {renderChatHeader()}
                {renderMessageList()}
                {renderMessageInput()}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">কথোপকথন শুরু করুন</h3>
                  <p className="text-muted-foreground">
                    বামদিক থেকে একটি চ্যাট, গ্রুপ বা চ্যানেল নির্বাচন করুন
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};