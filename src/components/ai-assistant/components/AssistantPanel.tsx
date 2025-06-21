
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, X, Volume2 } from 'lucide-react';
import { MessageList } from './MessageList';
import { QuickSuggestions } from './QuickSuggestions';
import { InputArea } from './InputArea';
import { Message } from '../types';
import { AI_MODELS } from '../constants';

interface AssistantPanelProps {
  position: { x: number; y: number };
  messages: Message[];
  selectedModel: string;
  inputMessage: string;
  isListening: boolean;
  isSpeaking: boolean;
  onClose: () => void;
  onModelChange: (model: string) => void;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onStopSpeaking: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  position,
  messages,
  selectedModel,
  inputMessage,
  isListening,
  isSpeaking,
  onClose,
  onModelChange,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onStopSpeaking,
  onSuggestionClick,
  onKeyPress
}) => {
  return (
    <div 
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
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="ml-auto h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            {isSpeaking && (
              <Button 
                onClick={onStopSpeaking}
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0"
              >
                <Volume2 className="h-4 w-4 animate-pulse text-red-500" />
              </Button>
            )}
          </CardTitle>
          
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="AI মডেল নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100%-120px)] md:h-[500px]">
          <MessageList messages={messages} />
          <QuickSuggestions onSuggestionClick={onSuggestionClick} />
          <InputArea
            inputMessage={inputMessage}
            isListening={isListening}
            onInputChange={onInputChange}
            onSendMessage={onSendMessage}
            onToggleListening={onToggleListening}
            onKeyPress={onKeyPress}
          />
        </CardContent>
      </Card>
    </div>
  );
};
