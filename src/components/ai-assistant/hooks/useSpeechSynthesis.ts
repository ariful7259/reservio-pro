
import { useRef, useEffect, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((
    text: string,
    onStart: () => void,
    onEnd: () => void,
    onError: () => void
  ) => {
    if (synthesis.current && 'speechSynthesis' in window) {
      synthesis.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = onStart;
      utterance.onend = onEnd;
      utterance.onerror = onError;
      
      synthesis.current.speak(utterance);
    }
  }, []);

  const stop = useCallback(() => {
    if (synthesis.current) {
      synthesis.current.cancel();
    }
  }, []);

  return { speak, stop };
};
