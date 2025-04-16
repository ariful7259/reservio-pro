
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export type SellerType = 'marketplace' | 'rental' | 'service' | 'content';

const CreateStore = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [businessName, setBusinessName] = useState('');
  const [sellerType, setSellerType] = useState<SellerType>('marketplace');

  const handleCreateStore = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "লগইন করুন",
        description: "দয়া করে প্রথমে লগইন করুন",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('seller_profiles')
        .insert({
          id: user.id,
          seller_type: sellerType,
          business_name: businessName
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "সফল",
        description: "আপনার ব্যবসা তৈরি হয়েছে",
        variant: "default"
      });

      // Redirect based on seller type
      switch(sellerType) {
        case 'marketplace':
          navigate('/seller-dashboard/marketplace');
          break;
        case 'rental':
          navigate('/seller-dashboard/rental');
          break;
        case 'service':
          navigate('/seller-dashboard/services');
          break;
        case 'content':
          navigate('/seller-dashboard/content');
          break;
      }
    } catch (error) {
      console.error('ব্যবসা তৈরি ব্যর্থ:', error);
      toast({
        title: "ত্রুটি",
        description: "ব্যবসা তৈরিতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>আপনার ব্যবসা তৈরি করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                ব্যবসার নাম
              </label>
              <Input 
                placeholder="আপনার ব্যবসার নাম লিখুন" 
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                ব্যবসার ধরন
              </label>
              <Select 
                value={sellerType} 
                onValueChange={(value: SellerType) => setSellerType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ব্যবসার ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                  <SelectItem value="rental">রেন্টাল</SelectItem>
                  <SelectItem value="service">সার্ভিস</SelectItem>
                  <SelectItem value="content">কনটেন্ট</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCreateStore} 
              className="w-full"
              disabled={!businessName}
            >
              ব্যবসা তৈরি করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStore;
