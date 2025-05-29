
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Plus, Building, Search, ShoppingBag, Rocket, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { creatorSolutionsData } from './navbarData';

export const CreatePostPopover: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center justify-center relative cursor-pointer">
          <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center mb-1">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs mt-1 text-primary font-medium">পোস্ট করুন</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="center">
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="col-span-2">
            <h3 className="font-semibold text-center mb-2">পোস্ট করুন</h3>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/create-post')} 
            className="flex flex-col items-center justify-center h-24 gap-2"
          >
            <Building className="h-8 w-8 text-primary" />
            <span className="text-sm">রেন্টাল পোস্ট</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/create-post?type=service')} 
            className="flex flex-col items-center justify-center h-24 gap-2"
          >
            <Search className="h-8 w-8 text-blue-500" />
            <span className="text-sm">সার্ভিস পোস্ট</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/create-post?type=marketplace')} 
            className="flex flex-col items-center justify-center h-24 gap-2"
          >
            <ShoppingBag className="h-8 w-8 text-green-500" />
            <span className="text-sm">প্রোডাক্ট পোস্ট</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/creator-payment-gateway')} 
            className="flex flex-col items-center justify-center h-24 gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
          >
            <CreditCard className="h-8 w-8 text-purple-600" />
            <span className="text-sm">পেমেন্ট গেটওয়ে</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 gap-2"
              >
                <Rocket className="h-8 w-8 text-purple-500" />
                <span className="text-sm">ডিজিটাল ক্রিয়েটর</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[70vh] overflow-auto">
              <div className="grid grid-cols-1 gap-1 p-1">
                {creatorSolutionsData.map((solution, index) => (
                  <DropdownMenuItem key={index} asChild className="p-2">
                    <Link to={solution.path} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {solution.icon}
                        <span className="font-medium">{solution.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
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
