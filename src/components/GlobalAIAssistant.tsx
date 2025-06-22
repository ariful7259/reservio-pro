import React, { useState, useRef } from 'react';
import { FloatingIcon } from './ai-assistant/components/FloatingIcon';
import { AssistantPanel } from './ai-assistant/components/AssistantPanel';
import { useSpeechRecognition } from './ai-assistant/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './ai-assistant/hooks/useSpeechSynthesis';
import { useDragging } from './ai-assistant/hooks/useDragging';
import { generateAIResponse } from './ai-assistant/utils/aiResponseGenerator';
import { Message } from './ai-assistant/types';
import { INITIAL_MESSAGE } from './ai-assistant/constants';

const GlobalAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const assistantRef = useRef<HTMLDivElement>(null);
  
  const initialPosition = { 
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 300, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 50 : 100 
  };
  
  const { isDragging, position, handleMouseDown } = useDragging(initialPosition);
  const { startListening, stopListening } = useSpeechRecognition();
  const { speak, stop: stopSpeaking } = useSpeechSynthesis();

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim() || isGenerating) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsGenerating(true);

    try {
      // Generate AI response using Gemini API
      const aiResponseText = await generateAIResponse(text, selectedModel);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the response
      speak(
        aiResponseText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: messages.length + 2,
        text: 'দুঃখিত, এই মুহূর্তে আমি সাহায্য করতে পারছি না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      const success = startListening(
        (transcript) => {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        },
        () => setIsListening(true),
        () => setIsListening(false),
        () => setIsListening(false)
      );
      if (!success) {
        setIsListening(false);
      }
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Calculate panel position based on floating icon position
  const getPanelPosition = () => {
    const panelWidth = 384; // w-96 = 384px
    const panelHeight = 600;
    const margin = 20;
    
    let panelX = position.x;
    let panelY = position.y;
    
    // Adjust horizontal position if panel would go off screen
    if (position.x + panelWidth > window.innerWidth) {
      panelX = position.x - panelWidth - 70; // Move to left of icon
    } else {
      panelX = position.x + 70; // Move to right of icon
    }
    
    // Adjust vertical position if panel would go off screen
    if (position.y + panelHeight > window.innerHeight) {
      panelY = window.innerHeight - panelHeight - margin;
    }
    
    if (panelY < margin) {
      panelY = margin;
    }
    
    return { x: panelX, y: panelY };
  };

  const panelPosition = isOpen ? getPanelPosition() : position;

  if (!isOpen) {
    return (
      <FloatingIcon
        position={position}
        isDragging={isDragging}
        isSpeaking={isSpeaking}
        onMouseDown={(e) => handleMouseDown(e, assistantRef)}
        onClick={() => setIsOpen(true)}
      />
    );
  }

  return (
    <div ref={assistantRef}>
      <AssistantPanel
        position={panelPosition}
        messages={messages}
        selectedModel={selectedModel}
        inputMessage={inputMessage}
        isListening={isListening}
        isSpeaking={isSpeaking}
        onClose={() => setIsOpen(false)}
        onModelChange={setSelectedModel}
        onInputChange={setInputMessage}
        onSendMessage={handleSendMessage}
        onToggleListening={toggleListening}
        onStopSpeaking={handleStopSpeaking}
        onSuggestionClick={handleQuickSuggestion}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default GlobalAIAssistant;
