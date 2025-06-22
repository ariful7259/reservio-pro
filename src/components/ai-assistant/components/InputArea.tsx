
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, MicOff } from 'lucide-react';

interface InputAreaProps {
  inputMessage: string;
  isListening: boolean;
  isGenerating?: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  inputMessage,
  isListening,
  isGenerating = false,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onKeyPress
}) => {
  const handleSend = () => {
    if (inputMessage.trim() && !isGenerating) {
      onSendMessage();
    }
  };

  return (
    <div className="p-3 border-t bg-white">
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="আপনার প্রশ্ন লিখুন..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 text-sm"
          disabled={isGenerating}
        />
        <Button
          onClick={onToggleListening}
          size="icon"
          variant={isListening ? "default" : "outline"}
          className={`h-9 w-9 ${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}`}
          disabled={isGenerating}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button 
          onClick={handleSend} 
          size="icon"
          disabled={!inputMessage.trim() || isGenerating}
          className="h-9 w-9"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {isGenerating && (
        <div className="flex items-center justify-center mt-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="ml-2 text-xs text-gray-600">AI উত্তর তৈরি করছে...</span>
        </div>
      )}
    </div>
  );
};
