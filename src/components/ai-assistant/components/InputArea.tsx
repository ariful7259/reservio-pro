
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, MicOff, Plus, X } from 'lucide-react';

interface InputAreaProps {
  inputMessage: string;
  isListening: boolean;
  isGenerating?: boolean;
  uploadedFiles: File[];
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFileUpload: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  inputMessage,
  isListening,
  isGenerating = false,
  uploadedFiles,
  onInputChange,
  onSendMessage,
  onToggleListening,
  onKeyPress,
  onFileUpload,
  onRemoveFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((inputMessage.trim() || uploadedFiles.length > 0) && !isGenerating) {
      onSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-3 border-t bg-white">
      {/* File Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative">
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">Video</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <X className="h-2 w-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
        
        {/* File Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="icon"
          variant="outline"
          className="h-9 w-9"
          disabled={isGenerating}
        >
          <Plus className="h-4 w-4" />
        </Button>

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
          disabled={(!inputMessage.trim() && uploadedFiles.length === 0) || isGenerating}
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
          <span className="ml-2 text-xs text-gray-600">AI বিশ্লেষণ করছে...</span>
        </div>
      )}
    </div>
  );
};
