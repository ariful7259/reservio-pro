import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  TrendingUp, 
  Wallet, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Gift,
  Target,
  Loader2,
  UserPlus
} from 'lucide-react';

const ResellerRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isReseller, setIsReseller] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [referralCode, setReferralCode] = useState(searchParams.get('ref') || '');
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    min_margin: 0,
    max_margin: 100,
    cod_enabled: true,
    payout_delay_days: 3
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    checkResellerStatus();
    fetchSettings();
    if (referralCode) {
      validateReferralCode();
    }
  }, [isAuthenticated, user]);

  const validateReferralCode = async () => {
    if (!referralCode) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, id')
        .eq('referral_code', referralCode.toUpperCase())
        .eq('is_reseller', true)
        .single();
      
      if (!error && data) {
        setReferrerName(data.full_name);
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
    }
  };

  const checkResellerStatus = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_reseller, reseller_balance')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setIsReseller(data?.is_reseller || false);
    } catch (error) {
      console.error('Error checking reseller status:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('reseller_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      if (data) {
        setSettings({
          min_margin: data.min_margin || 0,
          max_margin: data.max_margin || 100,
          cod_enabled: data.cod_enabled ?? true,
          payout_delay_days: data.payout_delay_days || 3
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleJoinReseller = async () => {
    if (!user?.id) return;
    if (!acceptTerms) {
      toast({
        title: "শর্তাবলী মেনে নিন",
        description: "রিসেলার প্রোগ্রামে যোগ দিতে শর্তাবলী মেনে নিতে হবে।",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // First, get referrer id if referral code provided
      let referrerId: string | null = null;
      if (referralCode) {
        const { data: referrerData } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', referralCode.toUpperCase())
          .eq('is_reseller', true)
          .single();
        
        referrerId = referrerData?.id || null;
      }

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_reseller: true,
          reseller_balance: 0,
          referred_by: referrerId
        })
        .eq('id', user.id);
      
      if (error) throw error;

      // Process referral bonus if valid referrer
      if (referrerId) {
        await supabase.rpc('process_referral_bonus', {
          p_referrer_id: referrerId,
          p_referred_id: user.id,
          p_bonus_amount: 100
        });
      }

      toast({
        title: "সফলভাবে যোগ দিয়েছেন!",
        description: "আপনি এখন রিসেলার প্রোগ্রামের সদস্য।",
      });
      
      setIsReseller(true);
    } catch (error) {
      console.error('Error joining reseller:', error);
      toast({
        title: "ত্রুটি হয়েছে",
        description: "রিসেলার প্রোগ্রামে যোগ দিতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isReseller) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              আপনি ইতিমধ্যে রিসেলার!
            </CardTitle>
            <CardDescription className="text-green-600">
              আপনি রিসেলার প্রোগ্রামের সদস্য। এখন প্রোডাক্ট রিসেল করে আয় করুন।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => navigate('/reseller-dashboard')}
                className="w-full"
              >
                <Wallet className="mr-2 h-4 w-4" />
                রিসেলার ড্যাশবোর্ড
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="w-full"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                প্রোডাক্ট ব্রাউজ করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">রিসেলার প্রোগ্রামে যোগ দিন</h1>
        <p className="text-muted-foreground">
          প্রোডাক্ট রিসেল করে আয় করুন - কোন বিনিয়োগ ছাড়াই!
        </p>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">কোন বিনিয়োগ নেই</h3>
          <p className="text-sm text-muted-foreground">
            শুধু শেয়ার করুন এবং বিক্রি করুন, কোন স্টক রাখার দরকার নেই
          </p>
        </Card>
        
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">নিজের মার্জিন সেট করুন</h3>
          <p className="text-sm text-muted-foreground">
            ৳{settings.min_margin} - ৳{settings.max_margin} পর্যন্ত মার্জিন যোগ করুন
          </p>
        </Card>
        
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="font-semibold mb-2">দ্রুত পেমেন্ট</h3>
          <p className="text-sm text-muted-foreground">
            অর্ডার সম্পন্ন হলে {settings.payout_delay_days}-৫ দিনে ব্যালেন্স আপডেট
          </p>
        </Card>
      </div>

      {/* Registration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            রিসেলার রেজিস্ট্রেশন
          </CardTitle>
          <CardDescription>
            নিচের শর্তাবলী পড়ে সম্মতি দিন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Terms & Conditions */}
          <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
            <h4 className="font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              শর্তাবলী
            </h4>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>আপনি প্রোডাক্টে ৳{settings.min_margin} - ৳{settings.max_margin} মার্জিন যোগ করতে পারবেন</li>
              <li>অর্ডার ডেলিভারি সম্পন্ন হলে {settings.payout_delay_days}-৫ কার্যদিবসের মধ্যে ব্যালেন্স আপডেট হবে</li>
              <li>অর্ডার ক্যান্সেল হলে মার্জিন ব্লক করা হবে (Fraud Prevention)</li>
              {settings.cod_enabled && <li>ক্যাশ অন ডেলিভারি (COD) অপশন উপলব্ধ</li>}
              <li>উইথড্রয়াল রিকোয়েস্ট অ্যাডমিন অনুমোদন সাপেক্ষে প্রসেস হবে</li>
              <li>প্রতারণামূলক কার্যকলাপে অ্যাকাউন্ট সাসপেন্ড করা হবে</li>
            </ul>
          </div>

          {/* Referral Code Input */}
          <div className="space-y-2">
            <Label htmlFor="referral-code" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              রেফারেল কোড (ঐচ্ছিক)
            </Label>
            <Input
              id="referral-code"
              placeholder="রেফারেল কোড থাকলে লিখুন"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              className="uppercase"
            />
            {referrerName && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                রেফার করেছেন: {referrerName}
              </p>
            )}
          </div>

          {/* Accept Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="cursor-pointer">
              আমি উপরের সমস্ত শর্তাবলী পড়েছি এবং মেনে নিচ্ছি
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleJoinReseller}
            disabled={loading || !acceptTerms}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                প্রসেসিং...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                রিসেলার প্রোগ্রামে যোগ দিন
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResellerRegistration;
