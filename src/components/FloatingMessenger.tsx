import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { MessengerSystem } from './messenger/MessengerSystem';

export const FloatingMessenger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
        title="মেসেঞ্জার"
      >
        <MessageCircle className="h-6 w-6" />
      </div>

      <MessengerSystem
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};