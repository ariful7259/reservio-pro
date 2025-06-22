
import React from 'react';
import { FloatingIcon } from './ai-assistant/components/FloatingIcon';
import { AssistantPanel } from './ai-assistant/components/AssistantPanel';
import { useSpeechRecognition } from './ai-assistant/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './ai-assistant/hooks/useSpeechSynthesis';
import { useDragging } from './ai-assistant/hooks/useDragging';
import { useAIAssistant } from './ai-assistant/hooks/useAIAssistant';
import { useAIAssistantActions } from './ai-assistant/hooks/useAIAssistantActions';
import { calculatePanelPosition, getInitialPosition } from './ai-assistant/utils/positionUtils';

const GlobalAIAssistant: React.FC = () => {
  const {
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
  } = useAIAssistant();

  const initialPosition = getInitialPosition();
  const { isDragging, position, handleMouseDown } = useDragging(initialPosition);
  const { startListening, stopListening } = useSpeechRecognition();
  const { speak, stop: stopSpeaking } = useSpeechSynthesis();

  const {
    handleSendMessage,
    handleClearMessages,
    handleSearchItemClick,
    handleBookmark,
    handleShare,
    handleConfirmListing,
    handleEditListing,
    handleCancelListing
  } = useAIAssistantActions({
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    uploadedFiles,
    setUploadedFiles,
    isGenerating,
    setIsGenerating,
    selectedModel,
    setSearchQuery,
    setSearchResults,
    setRelatedItems,
    setListingPreviewData,
    setShowListingPreview,
    isSpeaking,
    setIsSpeaking,
    toast,
    navigate,
    addToRecentlyViewed,
    speak
  });

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

  const panelPosition = isOpen ? calculatePanelPosition(position) : position;

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
