
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User,
  HelpCircle,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Message {
  id: string;
  sender: 'user' | 'support' | 'bot';
  message: string;
  timestamp: Date;
  senderName?: string;
}

const LiveChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'নমস্কার! আমি আপনার সহায়তার জন্য এখানে আছি। কিভাবে সাহায্য করতে পারি?',
      timestamp: new Date(),
      senderName: 'সাপোর্ট বট'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      senderName: 'আপনি'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // সিমুলেট রেসপন্স
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: 'ধন্যবাদ! আমি আপনার বার্তা পেয়েছি। একজন সাপোর্ট এজেন্ট শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
        timestamp: new Date(),
        senderName: 'সাপোর্ট টিম'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const faqData = [
    {
      question: 'অর্ডার কিভাবে ট্র্যাক করব?',
      answer: 'আপনার অর্ডার ট্র্যাক করতে "আমার অর্ডার" সেকশনে যান এবং অর্ডার নম্বর দিয়ে সার্চ করুন। আপনি রিয়েল-টাইম আপডেট পাবেন।'
    },
    {
      question: 'রিটার্ন পলিসি কি?',
      answer: 'আমাদের ৭ দিনের রিটার্ন পলিসি আছে। পণ্য অবিকল অবস্থায় থাকতে হবে। বিস্তারিত জানতে "রিটার্ন পলিসি" পেজ দেখুন।'
    },
    {
      question: 'পেমেন্ট মেথড কি কি?',
      answer: 'আমরা বিকাশ, নগদ, রকেট, ক্রেডিট/ডেবিট কার্ড এবং ক্যাশ অন ডেলিভারি সাপোর্ট করি।'
    },
    {
      question: 'ডেলিভারি সময় কত?',
      answer: 'ঢাকার ভিতরে ২৪-৪৮ ঘন্টা, ঢাকার বাইরে ৩-৭ কার্যদিবস সময় লাগে।'
    },
    {
      question: 'কাস্টমার সাপোর্ট কিভাবে যোগাযোগ করব?',
      answer: 'আপনি এই লাইভ চ্যাট, ইমেইল (support@example.com) অথবা ফোনে (+৮৮০১৭XXXXXXXX) যোগাযোগ করতে পারেন।'
    }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            1
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 sm:w-96 ${isMinimized ? 'h-16' : 'h-[500px]'} shadow-2xl transition-all duration-300`}>
        <CardHeader className="pb-3 bg-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {isMinimized ? 'সাপোর্ট চ্যাট' : 'লাইভ সাপোর্ট'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>অনলাইন - সাধারণত ৫ মিনিটে উত্তর দেই</span>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[440px]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-2">
                <TabsTrigger value="chat" className="text-xs">চ্যাট</TabsTrigger>
                <TabsTrigger value="faq" className="text-xs">FAQ</TabsTrigger>
                <TabsTrigger value="contact" className="text-xs">যোগাযোগ</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted'
                      } rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                          <span className="text-xs opacity-70">{message.senderName}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {message.timestamp.toLocaleTimeString('bn-BD', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="h-3 w-3" />
                          <span className="text-xs">টাইপ করছে...</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="আপনার বার্তা লিখুন..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h3>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left text-sm">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-medium mb-2">অন্যান্য যোগাযোগ মাধ্যম</h3>
                    <p className="text-sm text-muted-foreground">
                      আমরা সর্বদা আপনার সেবায় নিয়োজিত
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">ফোন</p>
                        <p className="text-sm text-muted-foreground">+৮৮০১৭XXXXXXXX</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">ইমেইল</p>
                        <p className="text-sm text-muted-foreground">support@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">কার্যসময়</p>
                        <p className="text-sm text-muted-foreground">সকাল ৯টা - রাত ৯টা (৭ দিন)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">দ্রুত সাহায্য</h4>
                    <p className="text-sm text-blue-700">
                      জরুরি সমস্যার জন্য আমাদের হটলাইনে কল করুন। আমরা ২৪/৭ পাওয়া যাই।
                    </p>
                    <Button className="mt-3 w-full" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      এখনই কল করুন
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LiveChatSupport;
