
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, Send, MessageCircle, Calendar, MapPin, 
  Clock, Star, Phone, User, Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  serviceData?: any;
}

const AIBookingAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'আস্সালামু আলাইকুম! আমি আপনার AI বুকিং অ্যাসিস্ট্যান্ট। আজ কোন সার্ভিস বুক করতে চান?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['হোম ক্লিনিং', 'ইলেকট্রিশিয়ান', 'প্লাম্বার', 'AC রিপেয়ার']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: Record<string, { text: string; suggestions: string[]; serviceData?: any }> = {
    'হোম ক্লিনিং': {
      text: 'দুর্দান্ত! হোম ক্লিনিং সার্ভিসের জন্য আপনার এলাকা কোনটি? আমরা ঢাকার সব এলাকায় পেশাদার ক্লিনার পাঠাই।',
      suggestions: ['ধানমন্ডি', 'গুলশান', 'বনানী', 'উত্তরা', 'মিরপুর'],
      serviceData: { type: 'cleaning', price: '১৫০০-৩০০০ টাকা' }
    },
    'ইলেকট্রিশিয়ান': {
      text: 'ইলেকট্রিক্যাল সমস্যার জন্য আমাদের দক্ষ ইলেকট্রিশিয়ান রয়েছে। কি ধরনের সমস্যা হয়েছে?',
      suggestions: ['ফ্যান মেরামত', 'লাইট ইনস্টল', 'সুইচ বোর্ড', 'ওয়্যারিং'],
      serviceData: { type: 'electrical', price: '৫০০-২০০০ টাকা' }
    },
    'প্লাম্বার': {
      text: 'প্লাম্বিং সমস্যার জন্য আমাদের অভিজ্ঞ প্লাম্বার আছে। জরুরি নাকি নর্মাল সার্ভিস?',
      suggestions: ['পাইপ লিকেজ', 'ড্রেইন ব্লক', 'ট্যাপ মেরামত', 'বাথরুম ফিটিং'],
      serviceData: { type: 'plumbing', price: '৮০০-২৫০০ টাকা' }
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[inputMessage] || {
        text: 'আপনার অনুরোধটি বুঝতে পারছি। আমাদের কাস্টমার সার্ভিস টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
        suggestions: ['অন্য সার্ভিস দেখুন', 'কল করুন', 'লাইভ চ্যাট']
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions,
        serviceData: response.serviceData
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleBookService = (serviceData: any) => {
    toast({
      title: "বুকিং প্রক্রিয়া শুরু",
      description: "আপনার সার্ভিস বুকিং প্রক্রিয়া শুরু হয়েছে",
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Bot className="h-6 w-6 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          AI বুকিং অ্যাসিস্ট্যান্ট
          <Badge variant="outline" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            স্মার্ট
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('bn-BD')}
                  </p>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {message.serviceData && (
                    <div className="mt-3 p-2 bg-white rounded border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800">
                          {message.serviceData.price}
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">৪.৮</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleBookService(message.serviceData)}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        এখনই বুক করুন
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              গড় উত্তর সময়: ৩০ সেকেন্ড
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              ২৪/৭ উপলব্ধ
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIBookingAssistant;
