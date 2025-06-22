
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QUICK_SUGGESTIONS } from '../constants';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSuggestionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayedSuggestions = isExpanded ? QUICK_SUGGESTIONS : QUICK_SUGGESTIONS.slice(0, 3);

  return (
    <div className="p-3 border-t bg-gray-50/50">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium flex items-center gap-1 text-gray-700">
          <Lightbulb className="h-3 w-3" />
          দ্রুত সাজেশন
        </p>
        {QUICK_SUGGESTIONS.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {displayedSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-auto p-2 text-left justify-start whitespace-normal border-gray-200 hover:bg-blue-50"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <HelpCircle className="h-3 w-3 mr-1 flex-shrink-0 text-blue-500" />
            <span className="truncate">{suggestion}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
