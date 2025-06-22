
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingIcon } from './ai-assistant/components/FloatingIcon';
import { AssistantPanel } from './ai-assistant/components/AssistantPanel';
import { useSpeechRecognition } from './ai-assistant/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './ai-assistant/hooks/useSpeechSynthesis';
import { useDragging } from './ai-assistant/hooks/useDragging';
import { generateAIResponse } from './ai-assistant/utils/aiResponseGenerator';
import { useShoppingStateWithToast } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';
import { Message } from './ai-assistant/types';
import { INITIAL_MESSAGE } from './ai-assistant/constants';

// Mock data for demonstration
const mockSearchResults = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max',
    description: 'নতুন iPhone 14 Pro Max, ১২৮GB স্টোরেজ, অরিজিনাল',
    price: '৮৫,০০০ টাকা',
    image: '/placeholder.svg',
    category: 'মোবাইল',
    location: 'ঢাকা',
    rating: 4.8,
    type: 'product' as const
  },
  {
    id: 2,
    title: 'হোম ক্লিনিং সার্ভিস',
    description: 'প্রফেশনাল হোম ক্লিনিং সার্ভিস, দক্ষ কর্মী',
    price: '১,৫০০ টাকা',
    category: 'ক্লিনিং',
    location: 'ঢাকা',
    rating: 4.5,
    type: 'service' as const
  }
];

const mockRelatedItems = [
  {
    id: 3,
    title: 'Samsung Galaxy S23',
    description: 'Samsung Galaxy S23, ২৫৬GB',
    price: '৭৫,০০০ টাকা',
    image: '/placeholder.svg',
    category: 'মোবাইল',
    type: 'product' as const
  },
  {
    id: 4,
    title: 'OnePlus 11',
    description: 'OnePlus 11, ২৫৬GB স্টোরেজ',
    price: '৬৫,০০০ টাকা',
    image: '/placeholder.svg',
    category: 'মোবাইল',
    type: 'product' as const
  }
];

const GlobalAIAssistant: React.FC = () => {
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
  
  const initialPosition = { 
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 300, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 50 : 100 
  };
  
  const { isDragging, position, handleMouseDown } = useDragging(initialPosition);
  const { startListening, stopListening } = useSpeechRecognition();
  const { speak, stop: stopSpeaking } = useSpeechSynthesis();

  // Add search functionality after AI response
  useEffect(() => {
    if (messages.length > 1) {
      const lastUserMessage = messages.filter(m => m.sender === 'user').slice(-1)[0];
      if (lastUserMessage) {
        addToSearchHistory(lastUserMessage.text);
      }
    }
  }, [messages, addToSearchHistory]);

  const analyzeUploadedFiles = async (files: File[]): Promise<any> => {
    // Mock AI analysis for uploaded images/videos
    const imageFile = files.find(f => f.type.startsWith('image/'));
    if (imageFile) {
      return {
        title: 'স্মার্টফোন - প্রিমিয়াম মডেল',
        description: 'উন্নত ক্যামেরা এবং দ্রুত প্রসেসর সহ স্মার্টফোন। অরিজিনাল প্যাকেজিং এবং ওয়ারেন্টি সহ।',
        category: 'ইলেকট্রনিক্স',
        subcategory: 'মোবাইল ফোন',
        price: '৮৫,০০০ টাকা',
        features: ['৬.৭" ডিসপ্লে', '১২৮GB স্টোরেজ', '৪৮MP ক্যামেরা', '৫G সাপোর্ট'],
        location: 'ঢাকা',
        images: files.map(f => URL.createObjectURL(f)),
        type: 'product' as const
      };
    }
    return null;
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage;
    const hasFiles = uploadedFiles.length > 0;
    
    if ((!text || typeof text !== 'string' || !text.trim()) && !hasFiles) return;
    if (isGenerating) return;

    let newMessage: Message;
    
    if (hasFiles) {
      // Handle file upload with AI analysis
      const analysisData = await analyzeUploadedFiles(uploadedFiles);
      if (analysisData) {
        setListingPreviewData(analysisData);
        setShowListingPreview(true);
        
        newMessage = {
          id: messages.length + 1,
          text: text.trim() || 'ফাইল আপলোড করেছি',
          sender: 'user',
          timestamp: new Date()
        };
      } else {
        newMessage = {
          id: messages.length + 1,
          text: text.trim() || 'ফাইল আপলোড করেছি',
          sender: 'user',
          timestamp: new Date()
        };
      }
    } else {
      newMessage = {
        id: messages.length + 1,
        text: text.trim(),
        sender: 'user',
        timestamp: new Date()
      };
    }

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setUploadedFiles([]);
    setIsGenerating(true);

    // Check if it's a search query
    const searchKeywords = ['খুঁজছি', 'চাই', 'কিনতে', 'ভাড়া', 'সার্ভিস', 'দরকার'];
    const isSearchQuery = searchKeywords.some(keyword => text.toLowerCase().includes(keyword));
    
    if (isSearchQuery) {
      setSearchQuery(text);
      setSearchResults(mockSearchResults);
      setRelatedItems(mockRelatedItems);
    }

    try {
      // Generate AI response using Gemini API
      const aiResponseText = await generateAIResponse(text.trim(), selectedModel);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the response (only first 100 characters to avoid long speech)
      const shortResponse = aiResponseText.length > 100 ? 
        aiResponseText.substring(0, 100) + '...' : aiResponseText;
      
      speak(
        shortResponse,
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

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearMessages = () => {
    setMessages([INITIAL_MESSAGE]);
    setSearchResults([]);
    setRelatedItems([]);
    setSearchQuery('');
    setShowListingPreview(false);
    setListingPreviewData(null);
    toast({
      title: "মেসেজ ক্লিয়ার",
      description: "সব মেসেজ ক্লিয়ার করা হয়েছে",
    });
  };

  const handleSearchItemClick = (item: any) => {
    addToRecentlyViewed(item);
    if (item.type === 'product') {
      navigate(`/product-detail/${item.id}`);
    } else if (item.type === 'service') {
      navigate(`/service-detail/${item.id}`);
    } else if (item.type === 'rental') {
      navigate(`/rent-detail/${item.id}`);
    }
  };

  const handleBookmark = (item: any) => {
    toast({
      title: "সংরক্ষিত",
      description: `${item.title} আপনার পছন্দের তালিকায় যোগ করা হয়েছে`,
    });
  };

  const handleShare = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.origin
      });
    } else {
      toast({
        title: "শেয়ার",
        description: "শেয়ার লিংক কপি করা হয়েছে",
      });
    }
  };

  const handleConfirmListing = (data: any) => {
    // Navigate to create post with pre-filled data
    navigate('/create-post', { state: { prefilledData: data } });
    setShowListingPreview(false);
    setListingPreviewData(null);
    toast({
      title: "পোস্ট তৈরি",
      description: "আপনার লিস্টিং তৈরি করা হচ্ছে",
    });
  };

  const handleEditListing = (data: any) => {
    // Allow editing - could open a form or modify current data
    toast({
      title: "এডিট মোড",
      description: "লিস্টিং এডিট করার জন্য প্রস্তুত",
    });
  };

  const handleCancelListing = () => {
    setShowListingPreview(false);
    setListingPreviewData(null);
  };

  // Calculate panel position based on floating icon position
  const getPanelPosition = () => {
    const panelWidth = 384; // w-96 = 384px
    const panelHeight = 600;
    const margin = 20;
    
    let panelX = position.x;
    let panelY = position.y;
    
    // Adjust horizontal position if panel would go off screen
    if (typeof window !== 'undefined') {
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
        isGenerating={isGenerating}
        uploadedFiles={uploadedFiles}
        searchResults={searchResults}
        relatedItems={relatedItems}
        showListingPreview={showListingPreview}
        listingPreviewData={listingPreviewData}
        searchQuery={searchQuery}
        onClose={() => setIsOpen(false)}
        onModelChange={setSelectedModel}
        onInputChange={setInputMessage}
        onSendMessage={handleSendMessage}
        onToggleListening={toggleListening}
        onStopSpeaking={handleStopSpeaking}
        onKeyPress={handleKeyPress}
        onFileUpload={handleFileUpload}
        onRemoveFile={handleRemoveFile}
        onClearMessages={handleClearMessages}
        onSearchItemClick={handleSearchItemClick}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onConfirmListing={handleConfirmListing}
        onEditListing={handleEditListing}
        onCancelListing={handleCancelListing}
      />
    </div>
  );
};

export default GlobalAIAssistant;
