import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  Mic, 
  Send, 
  Bot,
  Move,
  Volume2,
  MicOff,
  Lightbulb,
  HelpCircle,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Position {
  x: number;
  y: number;
}

const GlobalAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'হ্যালো! আমি আপনার AI সহায়ক। আপনার অ্যাপ ব্যবহার, প্রোডাক্ট লিস্টিং, বিক্রয় বৃদ্ধি - যেকোনো বিষয়ে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ 
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 300, 
    y: typeof window !== 'undefined' ? window.innerHeight - 150 : 100 
  });
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const assistantRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  const aiModels = [
    { value: 'gpt-4', label: 'GPT-4 (সবচেয়ে বুদ্ধিমান)' },
    { value: 'gpt-3.5', label: 'GPT-3.5 (দ্রুত)' },
    { value: 'claude', label: 'Claude (সৃজনশীল)' },
    { value: 'gemini', label: 'Gemini (বিশ্লেষণধর্মী)' }
  ];

  const quickSuggestions = [
    'কিভাবে ভাল প্রোডাক্ট ছবি তুলব?',
    'বিক্রয় বাড়ানোর টিপস দিন',
    'গ্রাহকদের সাথে কিভাবে কথা বলব?',
    'প্রোডাক্ট ডিসক্রিপশন লিখতে সাহায্য করুন'
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'bn-BD';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: 'ত্রুটি',
          description: 'ভয়েস রেকগনিশন ব্যর্থ হয়েছে',
          variant: "destructive",
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isOpen && (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle'))) {
      setIsDragging(true);
      const rect = assistantRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isOpen) {
      const maxX = window.innerWidth - 64;
      const maxY = window.innerHeight - 64;
      const newX = Math.max(0, Math.min(maxX, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(maxY, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(text),
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the response
      speakText(aiResponse.text);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const currentPage = window.location.pathname;
    const responses = {
      'ছবি': `প্রোডাক্টের ছবি তোলার জন্য: ১) ভাল আলোতে তুলুন ২) সাদা ব্যাকগ্রাউন্ড ব্যবহার করুন ৩) বিভিন্ন অ্যাঙ্গেল থেকে তুলুন ৪) ছবির মান ভাল রাখুন। ${currentPage === '/marketplace' ? 'আপনি এখানেই নতুন প্রোডাক্ট যোগ করতে পারেন!' : ''}`,
      'বিক্রয়': `বিক্রয় বাড়ানোর জন্য: ১) প্রতিযোগিতামূলক দাম রাখুন ২) নিয়মিত স্টক আপডেট করুন ৩) গ্রাহকদের দ্রুত রিপ্লাই দিন ৪) ভাল রিভিউ নিন ৫) প্রোমো অফার করুন। ${currentPage === '/seller-dashboard' ? 'আপনার ড্যাশবোর্ডে বিক্রয় ডেটা দেখুন!' : ''}`,
      'গ্রাহক': 'গ্রাহকদের সাথে কথা বলার সময়: ১) ভদ্র ও নম্র থাকুন ২) দ্রুত উত্তর দিন ৩) সৎ তথ্য দিন ৪) প্রোডাক্ট সম্পর্কে বিস্তারিত জানান ৫) অভিযোগ ধৈর্য নিয়ে শুনুন।',
      'ডিসক্রিপশন': 'ভাল প্রোডাক্ট ডিসক্রিপশনে থাকবে: ১) প্রোডাক্টের মূল বৈশিষ্ট্য ২) সাইজ ও রঙের তথ্য ৩) ব্যবহারের নিয়ম ৪) দাম ও ডেলিভারি তথ্য ৫) কিওয়ার্ড ব্যবহার।'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }

    const pageContext = currentPage === '/marketplace' ? 'মার্কেটপ্লেসে' : 
                       currentPage === '/seller-dashboard' ? 'ড্যাশবোর্ডে' :
                       currentPage === '/rentals' ? 'রেন্টাল সেকশনে' : 'এই পেজে';

    return `আপনার প্রশ্নটি খুবই ভাল! আপনি এখন ${pageContext} আছেন। ${selectedModel} মডেল ব্যবহার করে আমি আরও বিস্তারিত সাহায্য করতে পারি। অনুগ্রহ করে আরও নির্দিষ্ট প্রশ্ন করুন।`;
  };

  const speakText = (text: string) => {
    if (synthesis.current && 'speechSynthesis' in window) {
      synthesis.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesis.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition.current) {
      toast({
        title: 'অসমর্থিত',
        description: 'আপনার ব্রাউজারে ভয়েস রেকগনিশন সমর্থিত নয়',
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      try {
        recognition.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Voice recognition error:', error);
        toast({
          title: 'ত্রুটি',
          description: 'ভয়েস রেকগনিশন শুরু করতে সমস্যা',
          variant: "destructive",
        });
      }
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isOpen) {
    // Floating AI Assistant Icon
    return (
      <div 
        ref={assistantRef}
        className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          left: position.x, 
          top: position.y,
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 drag-handle"
          size="icon"
        >
          <Bot className="h-5 w-5 md:h-6 md:w-6" />
          {isSpeaking && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </Button>
      </div>
    );
  }

  // Full AI Assistant Panel
  return (
    <div 
      ref={assistantRef}
      className="fixed inset-0 z-50 bg-black/50 md:bg-transparent md:inset-auto md:top-4 md:right-4"
      style={{ 
        left: typeof window !== 'undefined' && window.innerWidth >= 768 ? position.x - 320 : 0, 
        top: typeof window !== 'undefined' && window.innerWidth >= 768 ? position.y : 0,
      }}
    >
      <Card className="w-full h-full md:w-96 md:h-[600px] shadow-xl border-l-4 border-primary bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-6 w-6 text-primary" />
            AI সহায়ক
            <Button
              onClick={() => setIsOpen(false)}
              size="sm"
              variant="ghost"
              className="ml-auto h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            {isSpeaking && (
              <Button 
                onClick={stopSpeaking}
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0"
              >
                <Volume2 className="h-4 w-4 animate-pulse text-red-500" />
              </Button>
            )}
          </CardTitle>
          
          {/* AI Model Selector */}
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="AI মডেল নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100%-120px)] md:h-[500px]">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          <div className="p-4 border-t">
            <p className="text-sm font-medium mb-2 flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              দ্রুত সাজেশন:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto p-2 text-left justify-start whitespace-normal"
                  onClick={() => handleQuickSuggestion(suggestion)}
                >
                  <HelpCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="আপনার প্রশ্ন লিখুন..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={toggleListening}
                size="icon"
                variant={isListening ? "default" : "outline"}
                className={isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={() => handleSendMessage()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalAIAssistant;
