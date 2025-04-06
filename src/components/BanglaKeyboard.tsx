
import React, { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

interface BanglaKeyboardProps {
  onInput: (text: string) => void;
  currentText?: string;
  isOpen: boolean;
  onClose: () => void;
}

const BanglaKeyboard: React.FC<BanglaKeyboardProps> = ({ 
  onInput, 
  currentText = '',
  isOpen,
  onClose
}) => {
  const { language } = useApp();
  const [text, setText] = useState(currentText);
  
  useEffect(() => {
    setText(currentText);
  }, [currentText]);
  
  const banglaConsonants = [
    'ক', 'খ', 'গ', 'ঘ', 'ঙ',
    'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
    'ট', 'ঠ', 'ড', 'ঢ', 'ণ',
    'ত', 'থ', 'দ', 'ধ', 'ন',
    'প', 'ফ', 'ব', 'ভ', 'ম',
    'য', 'র', 'ল', 'শ', 'ষ',
    'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ'
  ];
  
  const banglaVowels = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'এ', 'ঐ', 'ও', 'ঔ', 'ঋ'];
  
  const banglaDiacritics = ['া', 'ি', 'ী', 'ু', 'ূ', 'ে', 'ৈ', 'ো', 'ৌ', 'ৃ', '্'];
  
  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  const specialChars = ['।', ',', '?', '!', '-', '(', ')', '"', '\'', ':', ';', ' '];
  
  const handleKeyPress = (char: string) => {
    const newText = text + char;
    setText(newText);
    onInput(newText);
  };
  
  const handleBackspace = () => {
    const newText = text.slice(0, -1);
    setText(newText);
    onInput(newText);
  };
  
  const handleSpace = () => {
    const newText = text + ' ';
    setText(newText);
    onInput(newText);
  };
  
  const handleClear = () => {
    setText('');
    onInput('');
  };
  
  const handleDone = () => {
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 z-50 pb-safe">
      <div className="flex justify-between items-center p-2 bg-gray-200">
        <div className="text-sm font-medium">{language === 'bn' ? 'বাংলা কীবোর্ড' : 'Bengali Keyboard'}</div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleDone}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-2 text-xl overflow-x-auto whitespace-nowrap bg-white border-b">
        {text || <span className="text-muted-foreground text-base">{language === 'bn' ? 'এখানে টাইপ করুন...' : 'Type here...'}</span>}
      </div>
      
      <div className="p-1">
        <div className="mb-1 flex flex-wrap">
          {banglaVowels.map((char, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-1 h-10 min-w-[2rem] m-0.5"
              onClick={() => handleKeyPress(char)}
            >
              {char}
            </Button>
          ))}
        </div>
        
        <div className="mb-1 flex flex-wrap">
          {banglaDiacritics.map((char, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-1 h-10 min-w-[2rem] m-0.5"
              onClick={() => handleKeyPress(char)}
            >
              {char}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap">
          {banglaConsonants.map((char, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-1 h-10 min-w-[2rem] m-0.5"
              onClick={() => handleKeyPress(char)}
            >
              {char}
            </Button>
          ))}
        </div>
        
        <div className="mb-1 flex flex-wrap">
          {banglaNumbers.map((char, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-1 h-10 min-w-[2rem] m-0.5"
              onClick={() => handleKeyPress(char)}
            >
              {char}
            </Button>
          ))}
        </div>
        
        <div className="mb-1 flex flex-wrap">
          {specialChars.map((char, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-1 h-10 min-w-[2rem] m-0.5"
              onClick={() => handleKeyPress(char)}
            >
              {char === ' ' ? '␣' : char}
            </Button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            className="flex-1 m-0.5"
            onClick={handleClear}
          >
            {language === 'bn' ? 'মুছুন' : 'Clear'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 m-0.5"
            onClick={handleBackspace}
          >
            {language === 'bn' ? '←' : 'Backspace'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-2 m-0.5 flex-grow-[2]"
            onClick={handleSpace}
          >
            {language === 'bn' ? 'স্পেস' : 'Space'}
          </Button>
          <Button 
            variant="default" 
            className="flex-1 m-0.5"
            onClick={handleDone}
          >
            {language === 'bn' ? 'সম্পন্ন' : 'Done'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BanglaKeyboard;
