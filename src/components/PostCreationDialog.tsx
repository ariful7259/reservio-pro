
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building,
  ShoppingBag,
  Search,
  Rocket
} from 'lucide-react';
import PostDigitalProduct from './product/PostDigitalProduct';

interface PostCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostCreationDialog = ({ isOpen, onClose }: PostCreationDialogProps) => {
  const [activeTab, setActiveTab] = useState('rental');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>পোস্ট করুন</DialogTitle>
          <DialogDescription>
            আপনি যে ধরনের বিজ্ঞাপন বা কন্টেন্ট পোস্ট করতে চান, তা বেছে নিন
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="rental" className="flex flex-col items-center gap-1 py-2">
              <Building className="h-5 w-5" />
              <span className="text-xs">রেন্টাল</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex flex-col items-center gap-1 py-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs">প্রোডাক্ট</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex flex-col items-center gap-1 py-2">
              <Search className="h-5 w-5" />
              <span className="text-xs">সার্ভিস</span>
            </TabsTrigger>
            <TabsTrigger value="digital" className="flex flex-col items-center gap-1 py-2">
              <Rocket className="h-5 w-5" />
              <span className="text-xs">ডিজিটাল</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rental">
            <div className="p-4">
              <h3 className="font-medium mb-2">রেন্টাল পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার প্রোপার্টি (বাসা, দোকান, অফিস, গাড়ি ইত্যাদি) ভাড়া দিতে পোস্ট করুন
              </p>
              {/* Rental posting form would go here */}
              <Button className="w-full">রেন্টাল পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="marketplace">
            <div className="p-4">
              <h3 className="font-medium mb-2">প্রোডাক্ট পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার প্রোডাক্ট বিক্রি করতে পোস্ট করুন
              </p>
              {/* Marketplace posting form would go here */}
              <Button className="w-full">প্রোডাক্ট পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="service">
            <div className="p-4">
              <h3 className="font-medium mb-2">সার্ভিস পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার সেবা বা পরামর্শ প্রদান করার বিজ্ঞাপন পোস্ট করুন
              </p>
              {/* Service posting form would go here */}
              <Button className="w-full">সার্ভিস পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="digital">
            <div className="p-4">
              <PostDigitalProduct />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreationDialog;
