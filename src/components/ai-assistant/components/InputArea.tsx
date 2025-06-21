
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, MicOff } from 'lucide-react';

interface InputAreaProps {
  inputMessage: string;
  isListening: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  inputMessage,
  isListening,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onKeyPress
}) => {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="আপনার প্রশ্ন লিখুন..."
          onKeyPress={onKeyPress}
          className="flex-1"
        />
        <Button
          onClick={onToggleListening}
          size="icon"
          variant={isListening ? "default" : "outline"}
          className={isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button onClick={onSendMessage} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
