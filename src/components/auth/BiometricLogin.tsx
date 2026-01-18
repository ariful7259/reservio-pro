
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint, Loader2, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface BiometricLoginProps {
  biometricAvailable: boolean;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({ biometricAvailable }) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [storedEmail, setStoredEmail] = useState('');

  // Check if user has saved biometric credentials
  const hasSavedCredentials = () => {
    const savedCreds = localStorage.getItem('biometric_credentials');
    return savedCreds !== null;
  };

  const handleBiometricLogin = async () => {
    try {
      setIsAuthenticating(true);

      // Check if we have saved credentials
      const savedCredsStr = localStorage.getItem('biometric_credentials');
      
      if (!savedCredsStr) {
        toast({
          title: "বায়োমেট্রিক সেটআপ প্রয়োজন",
          description: "প্রথমে পাসওয়ার্ড দিয়ে লগইন করে সিকিউরিটি সেটিংস থেকে বায়োমেট্রিক সক্রিয় করুন",
          variant: "destructive",
        });
        setIsAuthenticating(false);
        return;
      }

      const savedCreds = JSON.parse(savedCredsStr);
      setStoredEmail(savedCreds.email);

      // Try to use Web Authentication API if available and in secure context
      if (window.isSecureContext && 'credentials' in navigator && 'PublicKeyCredential' in window) {
        try {
          // Use userVerification to trigger device biometric/PIN
          const publicKeyCredentialRequestOptions = {
            challenge: new Uint8Array(32),
            rpId: window.location.hostname,
            userVerification: "required" as UserVerificationRequirement,
            timeout: 60000,
          };
          
          // This will trigger device authentication (fingerprint, face, or PIN)
          await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions
          });
          
          // If we get here, authentication was successful
          await performLogin(savedCreds.email, savedCreds.password);
        } catch (webAuthnError) {
          console.log("WebAuthn not available, falling back to PIN:", webAuthnError);
          // Fall back to PIN verification
          setShowPinDialog(true);
          setIsAuthenticating(false);
        }
      } else {
        // Fallback: Use PIN verification
        setShowPinDialog(true);
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error("Biometric login error:", error);
      toast({
        title: "বায়োমেট্রিক লগইন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন বা পাসওয়ার্ড ব্যবহার করুন",
        variant: "destructive",
      });
      setIsAuthenticating(false);
    }
  };

  const handlePinVerify = async () => {
    try {
      setIsAuthenticating(true);
      
      const savedCredsStr = localStorage.getItem('biometric_credentials');
      if (!savedCredsStr) {
        toast({
          title: "ত্রুটি",
          description: "সংরক্ষিত তথ্য পাওয়া যায়নি",
          variant: "destructive",
        });
        return;
      }

      const savedCreds = JSON.parse(savedCredsStr);
      
      // Verify PIN
      if (pin === savedCreds.pin) {
        await performLogin(savedCreds.email, savedCreds.password);
        setShowPinDialog(false);
        setPin('');
      } else {
        toast({
          title: "ভুল পিন",
          description: "সঠিক পিন প্রদান করুন",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("PIN verification error:", error);
      toast({
        title: "যাচাইকরণ ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const performLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: "বায়োমেট্রিক লগইন সফল",
        description: "আপনি সফলভাবে লগইন করেছেন",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "লগইন ব্যর্থ",
        description: "দয়া করে পাসওয়ার্ড ব্যবহার করুন",
        variant: "destructive",
      });
    }
  };

  // Only show if biometric is available OR user has saved credentials
  if (!biometricAvailable && !hasSavedCredentials()) return null;

  return (
    <>
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
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
          ) : (
            <Fingerprint className="mr-2 h-5 w-5 text-primary" />
          )}
          {isAuthenticating ? "যাচাই করা হচ্ছে..." : "বায়োমেট্রিক লগইন"}
        </Button>
        {hasSavedCredentials() && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            <Smartphone className="inline-block h-3 w-3 mr-1" />
            সংরক্ষিত অ্যাকাউন্ট দিয়ে দ্রুত লগইন
          </p>
        )}
      </div>

      {/* PIN Verification Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">পিন যাচাইকরণ</DialogTitle>
            <DialogDescription className="text-center">
              {storedEmail && (
                <span className="block text-primary font-medium mt-1">{storedEmail}</span>
              )}
              আপনার ৬ সংখ্যার পিন প্রদান করুন
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={setPin}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button 
              onClick={handlePinVerify} 
              disabled={pin.length !== 6 || isAuthenticating}
              className="w-full"
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  যাচাই করা হচ্ছে...
                </>
              ) : (
                "যাচাই করুন"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
