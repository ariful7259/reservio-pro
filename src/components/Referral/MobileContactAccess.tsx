
import React, { useState } from 'react';
import { useContactAnalysis, AnalyzedContact } from '@/hooks/useContactAnalysis';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Facebook, Instagram, Twitter, Award, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContactManagement } from '@/hooks/useContactManagement';

interface MobileContactAccessProps {
  onContactsAnalyzed?: (contacts: AnalyzedContact[]) => void;
}

const MobileContactAccess = ({ onContactsAnalyzed }: MobileContactAccessProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'permission' | 'loading' | 'results'>('permission');
  const { analyzing, analyzedContacts, totalReward, analyzeContacts } = useContactAnalysis();
  const { addBulkContacts } = useContactManagement();
  const { toast } = useToast();
  
  // মোবাইল কন্টাক্টগুলি সিমুলেট করার ফাংশন (বাস্তবে, এটি ফোনের কন্টাক্ট API ব্যবহার করবে)
  const simulateMobileContacts = async () => {
    // মক ডাটা - বাস্তবে এটি ফোনের কন্টাক্ট API থেকে আসবে
    return [
      { name: 'আব্দুল করিম', phone: '01712345001' },
      { name: 'ফারহানা আক্তার', phone: '01812345002' },
      { name: 'রাহাত হোসেন', phone: '01912345003' },
      { name: 'নাজমা বেগম', phone: '01612345004' },
      { name: 'কামরুল হাসান', phone: '01512345005' },
      { name: 'শাবনূর জাহান', phone: '01712345006' },
      { name: 'জাহিদ হাসান', phone: '01812345007' },
      { name: 'নাসরিন সুলতানা', phone: '01912345008' },
      { name: 'আরিফ আহমেদ', phone: '01612345009' },
      { name: 'সাদিয়া আক্তার', phone: '01512345010' },
    ];
  };

  const handleAccessContacts = async () => {
    setStep('loading');
    
    try {
      // মোবাইল কন্টাক্ট অ্যাক্সেস করুন
      const mobileContacts = await simulateMobileContacts();
      
      // কন্টাক্ট বিশ্লেষণ করুন
      const { analyzed } = await analyzeContacts(mobileContacts);
      
      if (onContactsAnalyzed) {
        onContactsAnalyzed(analyzed);
      }
      
      setStep('results');
      
    } catch (error) {
      toast({
        title: "সমস্যা হয়েছে",
        description: "কন্টাক্টগুলি অ্যাক্সেস করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
      setOpen(false);
    }
  };
  
  const handleAddContacts = async () => {
    try {
      // কন্টাক্টগুলি অ্যাপে যোগ করুন
      const newContacts = analyzedContacts.map(c => ({
        name: c.name,
        phone: c.phone,
        email: `${c.name.replace(/\s+/g, '').toLowerCase()}@example.com` // ডেমো উদাহরণ
      }));
      
      await addBulkContacts(newContacts);
      
      toast({
        title: "সফল!",
        description: `${analyzedContacts.length} জন কন্টাক্ট সফলভাবে যোগ করা হয়েছে।`,
      });
      
      setOpen(false);
      
    } catch (error) {
      toast({
        title: "সমস্যা হয়েছে",
        description: "কন্টাক্টগুলি যোগ করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };
  
  const getSocialMediaIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        className="w-full gap-2" 
        onClick={() => setOpen(true)}
      >
        <Smartphone className="h-4 w-4" />
        মোবাইল কন্টাক্ট
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          {step === 'permission' && (
            <>
              <DialogHeader>
                <DialogTitle>মোবাইল কন্টাক্ট অ্যাক্সেস</DialogTitle>
                <DialogDescription>
                  আপনার মোবাইল কন্টাক্টগুলি অ্যাক্সেস করতে অনুমতি দিন। আপনার প্রতিটি অনন্য কন্টাক্টের জন্য আপনি পুরস্কার পাবেন।
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 my-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h4 className="font-medium mb-2">পুরস্কারের নিয়ম</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      প্রতি নতুন ইউনিক কন্টাক্টের জন্য ৫-৮ টাকা পুরস্কার
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      আপনার কন্টাক্ট আগে থেকে না থাকলেই শুধু পুরস্কার পাবেন
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      সোশ্যাল মিডিয়া লিংকসহ কন্টাক্টের তথ্য দেখতে পারবেন
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      আমরা শুধুমাত্র নাম ও নম্বর সংগ্রহ করব
                    </li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  বাতিল করুন
                </Button>
                <Button type="button" onClick={handleAccessContacts}>
                  অনুমতি দিন
                </Button>
              </DialogFooter>
            </>
          )}
          
          {step === 'loading' && (
            <>
              <DialogHeader>
                <DialogTitle>কন্টাক্টগুলি আপলোড হচ্ছে</DialogTitle>
                <DialogDescription>
                  আপনার মোবাইল কন্টাক্টগুলি আপলোড ও বিশ্লেষণ করা হচ্ছে...
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center py-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                  <p className="text-muted-foreground">দয়া করে অপেক্ষা করুন</p>
                </div>
              </div>
            </>
          )}
          
          {step === 'results' && (
            <>
              <DialogHeader>
                <DialogTitle>কন্টাক্ট বিশ্লেষণ সম্পন্ন</DialogTitle>
                <DialogDescription>
                  আপনার {analyzedContacts.length} টি কন্টাক্ট বিশ্লেষণ করা হয়েছে, যার মধ্যে {analyzedContacts.filter(c => c.isNew).length} টি নতুন
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col gap-3 my-4 max-h-[300px] overflow-y-auto pr-2">
                {analyzedContacts.map((contact, index) => (
                  <Card key={index} className={contact.isNew ? "border-green-200 bg-green-50" : ""}>
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.phone}</div>
                        
                        {contact.socialMedia.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {contact.socialMedia.map((sm, i) => (
                              <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                                {getSocialMediaIcon(sm.platform)}
                                <span>{sm.username}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {contact.isNew ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          +{contact.reward} টাকা
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-500">ইতিমধ্যে আছে</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {totalReward > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">মোট পুরস্কার</h4>
                      <p className="text-sm text-muted-foreground">অনন্য কন্টাক্টের জন্য</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    +{totalReward} টাকা
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  বাতিল করুন
                </Button>
                <Button type="button" onClick={handleAddContacts}>
                  কন্টাক্টগুলি যোগ করুন
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileContactAccess;
