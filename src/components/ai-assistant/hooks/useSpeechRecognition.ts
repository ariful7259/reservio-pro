
import { useRef, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export const useSpeechRecognition = () => {
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'bn-BD';
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  const startListening = useCallback((
    onResult: (transcript: string) => void,
    onStart: () => void,
    onEnd: () => void,
    onError: () => void
  ) => {
    if (!recognition.current) {
      toast({
        title: 'অসমর্থিত',
        description: 'আপনার ব্রাউজারে ভয়েস রেকগনিশন সমর্থিত নয়',
        variant: "destructive",
      });
      return false;
    }

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.current.onerror = () => {
      onError();
      toast({
        title: 'ত্রুটি',
        description: 'ভয়েস রেকগনিশন ব্যর্থ হয়েছে',
        variant: "destructive",
      });
    };

    recognition.current.onstart = onStart;
    recognition.current.onend = onEnd;

    try {
      recognition.current.start();
      return true;
    } catch (error) {
      console.error('Voice recognition error:', error);
      toast({
        title: 'ত্রুটি',
        description: 'ভয়েস রেকগনিশন শুরু করতে সমস্যা',
        variant: "destructive",
      });
      return false;
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
    }
  }, []);

  return { startListening, stopListening };
};
