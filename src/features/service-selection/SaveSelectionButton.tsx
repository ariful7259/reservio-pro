
import React from 'react';
import { Button } from '@/components/ui/button';

interface SaveSelectionButtonProps {
  onSave: () => void;
}

export const SaveSelectionButton: React.FC<SaveSelectionButtonProps> = ({ onSave }) => {
  return (
    <div className="sticky bottom-0 bg-white p-4 border-t">
      <Button 
        className="w-full" 
        onClick={onSave}
      >
        সিলেক্শন সেভ করুন
      </Button>
    </div>
  );
};
