
import React from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface BiometricLoginProps {
  biometricAvailable: boolean;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({ biometricAvailable }) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleBiometricLogin = async () => {
    try {
      if (!biometricAvailable) {
        toast({
          title: "বায়োমেট্রিক অনুপলব্ধ",
          description: "আপনার ডিভাইসে বায়োমেট্রিক লগইন সাপোর্ট করে না",
          variant: "destructive",
        });
        return;
      }

      // Simulate biometric authentication
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: "required"
        }
      });

      if (credential) {
        // For demo purposes, auto-login as user
        await login("akash@example.com", "password123");
        toast({
          title: "বায়োমেট্রিক লগইন সফল",
          description: "আপনি সফলভাবে বায়োমেট্রিক দিয়ে লগইন করেছেন",
        });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Biometric login error:", error);
      toast({
        title: "বায়োমেট্রিক লগইন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন বা পাসওয়ার্ড ব্যবহার করুন",
        variant: "destructive",
      });
    }
  };

  if (!biometricAvailable) return null;

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            অথবা
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full mt-4 border-primary/20 hover:bg-primary/5"
        onClick={handleBiometricLogin}
      >
        <Fingerprint className="mr-2 h-5 w-5 text-primary" />
        বায়োমেট্রিক লগইন
      </Button>
    </div>
  );
};
