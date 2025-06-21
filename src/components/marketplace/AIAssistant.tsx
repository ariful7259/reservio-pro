
import React, { useState } from 'react';
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
  ShoppingBag,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  onProductHelp?: (suggestion: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onProductHelp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'হ্যালো! আমি আপনার AI সহায়ক। মার্কেটপ্লেস ব্যবহার, প্রোডাক্ট লিস্টিং, বিক্রয় বৃদ্ধি - যেকোনো বিষয়ে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'ছবি': 'প্রোডাক্টের ছবি তোলার জন্য: ১) ভাল আলোতে তুলুন ২) সাদা ব্যাকগ্রাউন্ড ব্যবহার করুন ৩) বিভিন্ন অ্যাঙ্গেল থেকে তুলুন ৪) ছবির মান ভাল রাখুন। এতে বিক্রয় ৫০% পর্যন্ত বাড়তে পারে!',
      'বিক্রয়': 'বিক্রয় বাড়ানোর জন্য: ১) প্রতিযোগিতামূলক দাম রাখুন ২) নিয়মিত স্টক আপডেট করুন ৩) গ্রাহকদের দ্রুত রিপ্লাই দিন ৪) ভাল রিভিউ নিন ৫) প্রোমো অফার করুন।',
      'গ্রাহক': 'গ্রাহকদের সাথে কথা বলার সময়: ১) ভদ্র ও নম্র থাকুন ২) দ্রুত উত্তর দিন ৩) সৎ তথ্য দিন ৪) প্রোডাক্ট সম্পর্কে বিস্তারিত জানান ৫) অভিযোগ ধৈর্য নিয়ে শুনুন।',
      'ডিসক্রিপশন': 'ভাল প্রোডাক্ট ডিসক্রিপশনে থাকবে: ১) প্রোডাক্টের মূল বৈশিষ্ট্য ২) সাইজ ও রঙের তথ্য ৩) ব্যবহারের নিয়ম ৪) দাম ও ডেলিভারি তথ্য ৫) কিওয়ার্ড ব্যবহার।'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }

    return `আপনার প্রশ্নটি খুবই ভাল! ${selectedModel} মডেল ব্যবহার করে আমি আরও বিস্তারিত সাহায্য করতে পারি। অনুগ্রহ করে আরও নির্দিষ্ট প্রশ্ন করুন বা আমাদের সাজেশন ব্যবহার করুন।`;
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition functionality would be implemented here
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => {
        setInputMessage('ভয়েস রেকগনিশন চালু আছে...');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className={`fixed top-20 right-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute left-[-50px] top-4 bg-primary hover:bg-primary/90 text-white rounded-l-lg rounded-r-none h-12 w-12 flex items-center justify-center transition-all duration-300 ${isOpen ? 'shadow-lg' : ''}`}
        size="icon"
      >
        {isOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <>
            <ChevronLeft className="h-4 w-4 mr-1" />
            <Bot className="h-4 w-4" />
          </>
        )}
      </Button>

      {/* AI Assistant Panel */}
      <Card className="w-96 h-[600px] shadow-xl border-l-4 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-6 w-6 text-primary" />
            AI মার্কেটপ্লেস সহায়ক
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

        <CardContent className="p-0 flex flex-col h-[500px]">
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
                onClick={handleVoiceInput}
                size="icon"
                variant={isListening ? "default" : "outline"}
                className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
