
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SaveSelectionButtonProps {
  onSave: () => void;
}

export const SaveSelectionButton: React.FC<SaveSelectionButtonProps> = ({ onSave }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md">
      <div className="container mx-auto max-w-4xl">
        <Button 
          className="w-full py-6"
          onClick={onSave}
        >
          <Check className="h-5 w-5 mr-2" />
          সিলেক্শন সেভ করুন
        </Button>
      </div>
    </div>
  );
};
