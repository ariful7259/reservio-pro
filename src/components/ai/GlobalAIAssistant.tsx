
import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GlobalAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'ai'}>>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `আমি আপনার "${inputText}" প্রশ্নের উত্তর দিতে সাহায্য করতে পারি। আপনি কোন সেবার জন্য খোঁজ করছেন?`,
        sender: 'ai' as const
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setInputText('');
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition logic would go here
  };

  const quickSuggestions = [
    'পণ্য খুঁজে দিন',
    'সেবা খুঁজে দিন', 
    'বাসা খুঁজে দিন',
    'সাহায্য চাই'
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg">AI সহায়ক</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>আমি কিভাবে সাহায্য করতে পারি?</p>
                <div className="mt-4 space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer block"
                      onClick={() => setInputText(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleVoiceInput}
              className={isListening ? 'bg-red-100' : ''}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalAIAssistant;
