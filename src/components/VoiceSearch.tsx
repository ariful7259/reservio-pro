
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';

interface VoiceSearchProps {
  onSearch: (term: string) => void;
  className?: string;
  placeholder?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({
  onSearch,
  className = '',
  placeholder = 'সার্চ করুন...'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [supported, setSupported] = useState(true);
  const { language, isOnline } = useApp();

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'bn' ? 'bn-BD' : 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        onSearch(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: language === 'bn' ? 'ত্রুটি হয়েছে' : 'Error occurred',
          description: language === 'bn' ? 'ভয়েস রেকগনিশন ব্যর্থ হয়েছে' : 'Voice recognition failed',
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setSupported(false);
      console.error('Speech recognition not supported');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [language, onSearch]);

  useEffect(() => {
    if (recognition) {
      recognition.lang = language === 'bn' ? 'bn-BD' : 'en-US';
    }
  }, [language, recognition]);

  const toggleListening = () => {
    if (!isOnline) {
      toast({
        title: language === 'bn' ? 'অফলাইন' : 'Offline',
        description: language === 'bn' ? 'ভয়েস সার্চের জন্য ইন্টারনেট সংযোগ প্রয়োজন' : 'Internet connection required for voice search',
        variant: "destructive",
      });
      return;
    }

    if (!supported) {
      toast({
        title: language === 'bn' ? 'অসমর্থিত' : 'Unsupported',
        description: language === 'bn' ? 'আপনার ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়' : 'Voice search is not supported in your browser',
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition?.abort();
      setIsListening(false);
    } else {
      try {
        recognition?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative flex w-full items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-20"
        />
        <div className="absolute right-1 flex space-x-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={`h-8 w-8 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
            onClick={toggleListening}
            disabled={!supported}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button type="submit" size="icon" variant="ghost" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {isListening && (
        <div className="mt-2 text-center">
          <Badge variant="outline" className="animate-pulse bg-red-100 text-red-500">
            {language === 'bn' ? 'শুনছি...' : 'Listening...'}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
