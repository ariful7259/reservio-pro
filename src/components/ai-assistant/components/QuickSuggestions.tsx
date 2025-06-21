
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, HelpCircle } from 'lucide-react';
import { QUICK_SUGGESTIONS } from '../constants';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div className="p-4 border-t">
      <p className="text-sm font-medium mb-2 flex items-center gap-1">
        <Lightbulb className="h-4 w-4" />
        দ্রুত সাজেশন:
      </p>
      <div className="grid grid-cols-1 gap-2">
        {QUICK_SUGGESTIONS.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-auto p-2 text-left justify-start whitespace-normal"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <HelpCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
