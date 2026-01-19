import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Users, Gift, CheckCircle, Clock, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

interface Referral {
  id: string;
  referred_id: string;
  bonus_amount: number;
  bonus_paid: boolean;
  created_at: string;
  paid_at: string | null;
  referred_profile?: {
    full_name: string | null;
    email: string | null;
  };
}

interface ReferralSectionProps {
  userId: string;
  referralCode: string | null;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ userId, referralCode }) => {
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [code, setCode] = useState(referralCode);

  const referralLink = code ? `${window.location.origin}/reseller-registration?ref=${code}` : '';

  useEffect(() => {
    fetchReferrals();
  }, [userId]);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('reseller_referrals')
        .select(`
          id,
          referred_id,
          bonus_amount,
          bonus_paid,
          created_at,
          paid_at
        `)
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch referred user profiles
      if (data && data.length > 0) {
        const referredIds = data.map(r => r.referred_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', referredIds);

        const referralsWithProfiles = data.map(referral => ({
          ...referral,
          referred_profile: profiles?.find(p => p.id === referral.referred_id)
        }));

        setReferrals(referralsWithProfiles);
      } else {
        setReferrals([]);
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = async () => {
    if (code) return;
    
    setGeneratingCode(true);
    try {
      // Trigger the update to generate code
      const { error } = await supabase
        .from('profiles')
        .update({ referral_code: null }) // Trigger will generate new code
        .eq('id', userId);

      if (error) throw error;

      // Fetch the new code
      const { data } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', userId)
        .single();

      if (data?.referral_code) {
        setCode(data.referral_code);
        toast({
          title: "সফল!",
          description: "রেফারেল কোড তৈরি হয়েছে।",
        });
      }
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "ত্রুটি",
        description: "কোড তৈরি করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "কপি হয়েছে!",
        description: `${type} কপি করা হয়েছে।`,
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "কপি করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'রিসেলার হন!',
          text: 'আমার রেফারেল লিংক দিয়ে রিসেলার হয়ে বোনাস পান!',
          url: referralLink,
        });
      } catch (error) {
        copyToClipboard(referralLink, 'লিংক');
      }
    } else {
      copyToClipboard(referralLink, 'লিংক');
    }
  };

  const totalEarned = referrals
    .filter(r => r.bonus_paid)
    .reduce((sum, r) => sum + r.bonus_amount, 0);

  const pendingBonus = referrals
    .filter(r => !r.bonus_paid)
    .reduce((sum, r) => sum + r.bonus_amount, 0);

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট রেফারেল</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট বোনাস অর্জিত</p>
                <p className="text-2xl font-bold text-green-600">৳{totalEarned}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং বোনাস</p>
                <p className="text-2xl font-bold text-amber-600">৳{pendingBonus}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            আপনার রেফারেল লিংক
          </CardTitle>
          <CardDescription>
            বন্ধুদের রেফার করুন এবং প্রতি সফল রেফারেলে ৳১০০ বোনাস পান!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {code ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">রেফারেল কোড</p>
                  <div className="flex gap-2">
                    <Input value={code} readOnly className="font-mono text-lg" />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(code, 'কোড')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">রেফারেল লিংক</p>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="text-sm" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(referralLink, 'লিংক')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button onClick={shareLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    শেয়ার
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button onClick={generateReferralCode} disabled={generatingCode}>
              {generatingCode ? 'তৈরি হচ্ছে...' : 'রেফারেল কোড তৈরি করুন'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Referral List */}
      <Card>
        <CardHeader>
          <CardTitle>আপনার রেফারেলসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">লোড হচ্ছে...</p>
          ) : referrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">এখনও কোন রেফারেল নেই</p>
              <p className="text-sm text-muted-foreground mt-1">
                আপনার লিংক শেয়ার করে রেফারেল বোনাস পান!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {referral.referred_profile?.full_name || 
                         referral.referred_profile?.email || 
                         'অজানা ব্যবহারকারী'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(referral.created_at), 'dd MMM yyyy', { locale: bn })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">৳{referral.bonus_amount}</p>
                    {referral.bonus_paid ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        পেইড
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        পেন্ডিং
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSection;
