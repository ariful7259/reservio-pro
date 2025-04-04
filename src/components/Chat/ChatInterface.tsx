
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Send, Image, PaperclipIcon, Smile, Mic } from 'lucide-react';

// Type for chat messages
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
}

// Mock chat data for demo
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'রহিম মিয়া',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
    receiverId: '1',
    content: 'আপনার সার্ভিসটি কি এখনও অ্যাভেইলেবল?',
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    isRead: true,
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'আকাশ আহমেদ',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
    receiverId: '2',
    content: 'জি, এখনও অ্যাভেইলেবল আছে। আপনি কবে বুক করতে চান?',
    timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
    isRead: true,
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'রহিম মিয়া',
    senderAvatar: 'https://i.pravatar.cc/150?img=2',
    receiverId: '1',
    content: 'আমি আগামীকাল বিকাল ৪টায় বুক করতে চাই।',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    isRead: false,
  },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ recipientId, recipientName, recipientAvatar }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Load messages on component mount
  useEffect(() => {
    if (!user) return;
    
    // Filter messages between current user and recipient
    const filteredMessages = MOCK_MESSAGES.filter(
      (msg) => 
        (msg.senderId === user.id && msg.receiverId === recipientId) || 
        (msg.senderId === recipientId && msg.receiverId === user.id)
    );
    
    // Sort by timestamp
    const sortedMessages = [...filteredMessages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    setMessages(sortedMessages);
    
    // Mark messages as read
    const unreadMessages = sortedMessages.filter(
      (msg) => msg.senderId === recipientId && !msg.isRead
    );
    
    if (unreadMessages.length > 0) {
      // In a real app, you'd make an API call to mark these as read
      const updatedMessages = sortedMessages.map((msg) => 
        msg.senderId === recipientId && !msg.isRead
          ? { ...msg, isRead: true }
          : msg
      );
      setMessages(updatedMessages);
    }
  }, [user, recipientId]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      receiverId: recipientId,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate recipient typing
    setTimeout(() => {
      setIsTyping(true);
      
      // Simulate response after 2-3 seconds
      setTimeout(() => {
        setIsTyping(false);
        
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: recipientId,
          senderName: recipientName,
          senderAvatar: recipientAvatar,
          receiverId: user.id,
          content: 'ঠিক আছে, আমি আপনার বুকিং কনফার্ম করলাম। ধন্যবাদ!',
          timestamp: new Date(),
          isRead: false,
        };
        
        setMessages((prev) => [...prev, response]);
      }, 2000 + Math.random() * 1000);
    }, 500);
  };
  
  // Format the time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  // Format the date (for message groups)
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bn-BD', { 
      day: 'numeric',
      month: 'long'
    });
  };
  
  if (!user) return null;

  return (
    <Card className="flex flex-col h-[500px]">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback>{recipientName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{recipientName}</h3>
            <p className="text-xs text-muted-foreground">
              {isTyping ? 'টাইপিং...' : 'অনলাইন'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        {messages.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === user.id;
              const showDate = index === 0 || 
                formatDate(messages[index-1].timestamp) !== formatDate(message.timestamp);
              
              return (
                <React.Fragment key={message.id}>
                  {showDate && (
                    <div className="flex justify-center my-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded-md">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div>
                        <div 
                          className={`px-3 py-2 rounded-lg ${
                            isCurrentUser 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <div className={`text-xs text-muted-foreground mt-1 flex items-center gap-1 ${
                          isCurrentUser ? 'justify-end' : ''
                        }`}>
                          {formatTime(message.timestamp)}
                          {isCurrentUser && (
                            <span className={message.isRead ? 'text-blue-500' : ''}>
                              {message.isRead ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={recipientAvatar} />
                    <AvatarFallback>{recipientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="px-3 py-2 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            এখানে কোন মেসেজ নেই। প্রথম মেসেজ পাঠাতে শুরু করুন।
          </div>
        )}
      </ScrollArea>
      
      {/* Message input */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" type="button">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" type="button">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="মেসেজ লিখুন..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
