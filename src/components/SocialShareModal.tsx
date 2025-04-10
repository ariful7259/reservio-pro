
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Twitter, WhatsApp, Link as LinkIcon, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SocialShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: string | number;
    title: string;
    price: string | number;
    image: string;
    description?: string;
    location?: string;
    type: 'product' | 'service' | 'rental';
  };
}

const SocialShareModal = ({ open, onOpenChange, item }: SocialShareModalProps) => {
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState<string>('');
  
  // Generate the share URL based on item type and ID
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    
    switch (item.type) {
      case 'product':
        return `${baseUrl}/shopping/product/${item.id}`;
      case 'service':
        return `${baseUrl}/service-detail/${item.id}`;
      case 'rental':
        return `${baseUrl}/rent-details/${item.id}`;
      default:
        return `${baseUrl}`;
    }
  };

  // Generate formatted text for sharing
  const getShareText = () => {
    const baseText = `${item.title} - ${item.price}`;
    
    if (item.location) {
      return `${baseText}\nঅবস্থান: ${item.location}`;
    }
    
    return baseText;
  };
  
  // Generate full description for FB marketplace/page sharing
  const getFullDescription = () => {
    const baseText = `${item.title}\nমূল্য: ${item.price}`;
    const locationText = item.location ? `\nঅবস্থান: ${item.location}` : '';
    const descriptionText = item.description ? `\n\n${item.description}` : '';
    const customText = customMessage ? `\n\n${customMessage}` : '';
    const linkText = `\n\nবিস্তারিত দেখুন: ${getShareUrl()}`;
    
    return `${baseText}${locationText}${descriptionText}${customText}${linkText}`;
  };
  
  // Share handlers for different platforms
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}&quote=${encodeURIComponent(getFullDescription())}`;
    window.open(url, '_blank', 'width=600,height=400');
    toast({
      title: "ফেসবুকে শেয়ার করুন",
      description: "আপনার ফেসবুক পেইজে শেয়ার করার জন্য ওয়েবসাইট খোলা হয়েছে।",
    });
  };
  
  const handleFacebookMarketplaceShare = () => {
    // Since direct Marketplace API isn't publicly available, we'll open Facebook and suggest copy-paste
    toast({
      title: "ফেসবুক মার্কেটপ্লেসে পোস্ট করুন",
      description: "সম্পূর্ণ বিবরণ কপি করা হয়েছে। ফেসবুক মার্কেটপ্লেসে পেস্ট করুন।",
    });
    
    navigator.clipboard.writeText(getFullDescription());
    window.open('https://www.facebook.com/marketplace/create/item', '_blank');
  };
  
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${getShareText()}\n${getShareUrl()}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    toast({
      title: "হোয়াটসঅ্যাপে শেয়ার করুন",
      description: "আপনার হোয়াটসঅ্যাপে শেয়ার করার জন্য পেইজ খোলা হয়েছে।",
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    toast({
      title: "লিংক কপি করা হয়েছে",
      description: "আপনি এখন এটি যেকোনো জায়গায় শেয়ার করতে পারেন।",
    });
  };
  
  const handleCopyFullDescription = () => {
    navigator.clipboard.writeText(getFullDescription());
    toast({
      title: "পূর্ণ বিবরণ কপি করা হয়েছে",
      description: "আপনি এখন এটি যেকোনো জায়গায় পেস্ট করতে পারেন।",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>শেয়ার করুন</DialogTitle>
          <DialogDescription>
            এই {
              item.type === 'product' ? 'প্রোডাক্টটি' : 
              item.type === 'service' ? 'সার্ভিসটি' : 
              'রেন্টাল আইটেমটি'
            } শেয়ার করুন
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.price}</p>
              {item.location && (
                <p className="text-xs text-muted-foreground">{item.location}</p>
              )}
            </div>
          </div>
          
          <Textarea
            placeholder="আপনার নিজের মেসেজ যোগ করুন (ঐচ্ছিক)"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="min-h-[80px]"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleFacebookShare}
            >
              <Facebook className="h-4 w-4" /> ফেসবুক
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleFacebookMarketplaceShare}
            >
              <Facebook className="h-4 w-4" /> মার্কেটপ্লেস
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleWhatsAppShare}
            >
              <WhatsApp className="h-4 w-4" /> হোয়াটসঅ্যাপ
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleCopyLink}
            >
              <LinkIcon className="h-4 w-4" /> লিংক কপি
            </Button>
          </div>
          
          <Button 
            variant="secondary" 
            className="flex items-center gap-2" 
            onClick={handleCopyFullDescription}
          >
            <Copy className="h-4 w-4" /> সম্পূর্ণ বিবরণ কপি করুন
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            বাতিল
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;
