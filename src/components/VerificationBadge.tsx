
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, BadgeCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  type: 'seller' | 'identity' | 'payment';
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  type, 
  size = 'md',
  showTooltip = true 
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const badgeContent = () => {
    switch (type) {
      case 'seller':
        return (
          <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 flex items-center gap-1">
            <Shield className={`${sizeClasses[size]} text-blue-600`} />
            <span>ভেরিফাইড বিক্রেতা</span>
          </Badge>
        );
      case 'identity':
        return (
          <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 flex items-center gap-1">
            <BadgeCheck className={`${sizeClasses[size]} text-green-600`} />
            <span>আইডি ভেরিফাইড</span>
          </Badge>
        );
      case 'payment':
        return (
          <Badge variant="outline" className="text-purple-600 bg-purple-50 border-purple-200 flex items-center gap-1">
            <Shield className={`${sizeClasses[size]} text-purple-600`} />
            <span>পেমেন্ট ভেরিফাইড</span>
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const tooltipContent = () => {
    switch (type) {
      case 'seller':
        return "এই বিক্রেতা আমাদের সিস্টেমে পূর্ণরূপে যাচাই করা হয়েছে";
      case 'identity':
        return "এই ব্যবহারকারীর পরিচয় যাচাই করা হয়েছে";
      case 'payment':
        return "এই বিক্রেতার সমস্ত পেমেন্ট মেথড যাচাই করা হয়েছে";
      default:
        return "";
    }
  };
  
  if (!showTooltip) {
    return badgeContent();
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent()}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
