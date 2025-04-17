
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  ChevronDown,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ searchTerm, onSearchChange }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`gap-4 ${isMobile ? 'flex flex-col' : 'flex flex-col md:flex-row justify-between'}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="সার্ভিস খুঁজুন"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4" />
              ফিল্টার
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Check className="h-4 w-4 mr-2" />
              ক্যাটেগরি: রিপেয়ার
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="h-4 w-4 mr-2" />
              ক্যাটেগরি: ক্লিনিং
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="h-4 w-4 mr-2" />
              স্ট্যাটাস: অ্যাকটিভ
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check className="h-4 w-4 mr-2" />
              মূল্য: ১০০০ - ২০০০
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ServiceSearch;
