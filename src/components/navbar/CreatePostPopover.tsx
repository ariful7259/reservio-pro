
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Plus, Building, Search, ShoppingBag, Rocket, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { creatorSolutionsData } from './navbarData';

export const CreatePostPopover: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Wrapper to close popover first, then navigate
  const handleNavigate = (url: string) => {
    setOpen(false);
    setTimeout(() => {
      navigate(url);
    }, 120); // Slight delay for animation/smooth closing (optional)
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center justify-center relative cursor-pointer px-2 py-2 min-w-[60px] min-h-[56px] gap-1 touch-manipulation tap-highlight-none hover:scale-105 active:scale-95 transition-transform duration-200 rounded-md">
          <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs text-primary font-semibold leading-tight text-center">পোস্ট করুন</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-80 p-0 z-50" align="center" side="top" sideOffset={8}>
        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
          <div className="col-span-2">
            <h3 className="font-semibold text-center mb-3 text-responsive-base">পোস্ট করুন</h3>
          </div>
          <Button
            variant="outline"
            onClick={() => handleNavigate('/create-post')}
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-2 touch-manipulation tap-highlight-none hover-lift-mobile"
          >
            <Building className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-xs sm:text-sm text-center leading-tight">রেন্টাল পোস্ট</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNavigate('/create-post?type=service')}
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-2 touch-manipulation tap-highlight-none hover-lift-mobile"
          >
            <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            <span className="text-xs sm:text-sm text-center leading-tight">সার্ভিস পোস্ট</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNavigate('/create-post?type=marketplace')}
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-2 touch-manipulation tap-highlight-none hover-lift-mobile"
          >
            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            <span className="text-xs sm:text-sm text-center leading-tight">প্রোডাক্ট পোস্ট</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20 sm:h-24 gap-2 touch-manipulation tap-highlight-none hover-lift-mobile">
                <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                <span className="text-xs sm:text-sm text-center leading-tight">ডিজিটাল ক্রিয়েটর</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 sm:w-56 max-h-[60vh] overflow-auto z-50 bg-white shadow-lg border">
              <div className="grid grid-cols-1 gap-1 p-1">
                {creatorSolutionsData.map((solution, index) => (
                  <DropdownMenuItem key={index} asChild className="p-2 touch-manipulation tap-highlight-none">
                    <Link
                      to={solution.path}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        {solution.icon}
                        <span className="font-medium text-responsive-sm">{solution.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6 leading-relaxed">
                        {solution.description}
                      </p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PopoverContent>
    </Popover>
  );
};
