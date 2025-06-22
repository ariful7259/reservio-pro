
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { generateAIResponse } from '../utils/aiResponseGenerator';
import { useShoppingStateWithToast } from '@/hooks/useShoppingState';
import { Message } from '../types';
import { INITIAL_MESSAGE } from '../constants';

export const useAIAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [relatedItems, setRelatedItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showListingPreview, setShowListingPreview] = useState(false);
  const [listingPreviewData, setListingPreviewData] = useState<any>(null);
  
  const assistantRef = useRef<HTMLDivElement>(null);
  const { addToRecentlyViewed, addToSearchHistory } = useShoppingStateWithToast();

  // Add search functionality after AI response
  useEffect(() => {
    if (messages.length > 1) {
      const lastUserMessage = messages.filter(m => m.sender === 'user').slice(-1)[0];
      if (lastUserMessage) {
        addToSearchHistory(lastUserMessage.text);
      }
    }
  }, [messages, addToSearchHistory]);

  return {
    isOpen,
    setIsOpen,
    selectedModel,
    setSelectedModel,
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isListening,
    setIsListening,
    isSpeaking,
    setIsSpeaking,
    isGenerating,
    setIsGenerating,
    uploadedFiles,
    setUploadedFiles,
    searchResults,
    setSearchResults,
    relatedItems,
    setRelatedItems,
    searchQuery,
    setSearchQuery,
    showListingPreview,
    setShowListingPreview,
    listingPreviewData,
    setListingPreviewData,
    assistantRef,
    navigate,
    toast,
    addToRecentlyViewed
  };
};
