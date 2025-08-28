
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, X, Volume2, Trash2, Settings } from 'lucide-react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { SearchResults } from './SearchResults';
import { ListingPreview } from './ListingPreview';
import { APIIntegrationModal } from './APIIntegrationModal';
import { Message } from '../types';
import { AI_MODELS } from '../constants';

interface AssistantPanelProps {
  position: { x: number; y: number };
  messages: Message[];
  selectedModel: string;
  inputMessage: string;
  isListening: boolean;
  isSpeaking: boolean;
  isGenerating?: boolean;
  uploadedFiles: File[];
  searchResults: any[];
  relatedItems: any[];
  showListingPreview: boolean;
  listingPreviewData: any;
  searchQuery: string;
  onClose: () => void;
  onModelChange: (model: string) => void;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onStopSpeaking: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFileUpload: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onClearMessages: () => void;
  onSearchItemClick: (item: any) => void;
  onBookmark: (item: any) => void;
  onShare: (item: any) => void;
  onConfirmListing: (data: any) => void;
  onEditListing: (data: any) => void;
  onCancelListing: () => void;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  position,
  messages,
  selectedModel,
  inputMessage,
  isListening,
  isSpeaking,
  isGenerating = false,
  uploadedFiles,
  searchResults,
  relatedItems,
  showListingPreview,
  listingPreviewData,
  searchQuery,
  onClose,
  onModelChange,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onStopSpeaking,
  onKeyPress,
  onFileUpload,
  onRemoveFile,
  onClearMessages,
  onSearchItemClick,
  onBookmark,
  onShare,
  onConfirmListing,
  onEditListing,
  onCancelListing
}) => {
  const [showAPIModal, setShowAPIModal] = React.useState(false);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 md:bg-transparent md:inset-auto md:top-4 md:right-4"
      style={{ 
        left: typeof window !== 'undefined' && window.innerWidth >= 768 ? position.x - 320 : 0, 
        top: typeof window !== 'undefined' && window.innerWidth >= 768 ? position.y : 0,
      }}
    >
      <Card className="w-full h-full md:w-96 md:h-[600px] shadow-xl border-l-4 border-primary bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5 text-primary" />
            AI সহায়ক
            <div className="ml-auto flex items-center gap-1">
              <Button
                onClick={() => setShowAPIModal(true)}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="API সেটিংস"
              >
                <Settings className="h-3 w-3" />
              </Button>
              <Button
                onClick={onClearMessages}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="মেসেজ ক্লিয়ার করুন"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <Button
                onClick={onClose}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
              {isSpeaking && (
                <Button 
                  onClick={onStopSpeaking}
                  size="sm" 
                  variant="outline" 
                  className="h-7 w-7 p-0"
                >
                  <Volume2 className="h-3 w-3 animate-pulse text-red-500" />
                </Button>
              )}
            </div>
          </CardTitle>
          
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue placeholder="AI মডেল নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value} className="text-xs">
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100%-100px)] md:h-[500px]">
          <MessageList messages={messages} />
          
          {/* Search Results */}
          {searchQuery && (searchResults.length > 0 || relatedItems.length > 0) && (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              relatedItems={relatedItems}
              onItemClick={onSearchItemClick}
              onBookmark={onBookmark}
              onShare={onShare}
            />
          )}

          {/* Listing Preview */}
          {showListingPreview && listingPreviewData && (
            <ListingPreview
              listingData={listingPreviewData}
              onConfirm={onConfirmListing}
              onEdit={onEditListing}
              onCancel={onCancelListing}
            />
          )}

          <InputArea
            inputMessage={inputMessage}
            isListening={isListening}
            isGenerating={isGenerating}
            uploadedFiles={uploadedFiles}
            onInputChange={onInputChange}
            onSendMessage={onSendMessage}
            onToggleListening={onToggleListening}
            onKeyPress={onKeyPress}
            onFileUpload={onFileUpload}
            onRemoveFile={onRemoveFile}
          />
        </CardContent>
      </Card>

      <APIIntegrationModal
        isOpen={showAPIModal}
        onClose={() => setShowAPIModal(false)}
      />
    </div>
  );
};
