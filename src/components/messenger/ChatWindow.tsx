import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatWindowProps {
  chat: any;
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onBack }) => {
  const [message, setMessage] = useState('');

  // Mock messages
  const messages = [
    {
      id: 1,
      text: 'আসসালামু আলাইকুম',
      sender: 'other',
      timestamp: '১০:৩০ AM'
    },
    {
      id: 2,
      text: 'ওয়ালাইকুম আসসালাম',
      sender: 'me',
      timestamp: '১০:৩১ AM'
    },
    {
      id: 3,
      text: 'আপনার iPhone টার দাম কত?',
      sender: 'other',
      timestamp: '১০:৩২ AM'
    },
    {
      id: 4,
      text: '৮৫,০০০ টাকা। একদম নতুন কন্ডিশন।',
      sender: 'me',
      timestamp: '১০:৩৩ AM'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button
          onClick={onBack}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-medium text-sm">{chat.name}</h3>
          <p className="text-xs text-muted-foreground">
            {chat.isOnline ? 'অনলাইনে আছেন' : 'সর্বশেষ ১ ঘন্টা আগে'}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === 'me'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="মেসেজ লিখুন..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};