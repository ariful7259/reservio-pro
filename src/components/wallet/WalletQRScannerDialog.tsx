import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'react-qr-code';
import { Camera, Image, QrCode, X, SwitchCamera } from 'lucide-react';

interface WalletQRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess?: (data: any) => void;
}

export const WalletQRScannerDialog: React.FC<WalletQRScannerDialogProps> = ({
  open,
  onOpenChange,
  onScanSuccess
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'scan' | 'myqr'>('scan');
  const [cameraActive, setCameraActive] = useState(false);
  const [myQrData, setMyQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && activeTab === 'scan') {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [open, activeTab]);

  useEffect(() => {
    if (open && activeTab === 'myqr') {
      generateMyQR();
    }
  }, [open, activeTab]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: 'ক্যামেরা অ্যাক্সেস',
        description: 'ক্যামেরা অ্যাক্সেস করতে অনুমতি দিন',
        variant: 'destructive'
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleClose = () => {
    stopCamera();
    onOpenChange(false);
  };

  const generateMyQR = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'লগইন করুন',
          description: 'QR কোড দেখতে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();

      const qrPayload = JSON.stringify({
        type: 'wallet_receive',
        user_id: user.id,
        name: profile?.full_name || 'User',
        phone: profile?.phone || '',
        timestamp: new Date().toISOString()
      });

      setMyQrData(qrPayload);
    } catch (error) {
      console.error('QR generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real implementation, you'd use a QR code reader library like jsQR
    // For now, we'll simulate reading QR from image
    toast({
      title: 'QR কোড স্ক্যান হচ্ছে',
      description: 'গ্যালারি থেকে QR কোড রিড করা হচ্ছে...'
    });

    // Simulate scan delay
    setTimeout(() => {
      toast({
        title: 'স্ক্যান সফল',
        description: 'QR কোড থেকে ডেটা পাওয়া গেছে'
      });
      onScanSuccess?.({ type: 'gallery_scan', data: 'sample_qr_data' });
    }, 1500);
  };

  const simulateScan = () => {
    // In production, use a library like html5-qrcode or jsQR for real scanning
    toast({
      title: 'স্ক্যান করা হচ্ছে',
      description: 'QR কোড সনাক্ত করা হচ্ছে...'
    });
    
    setTimeout(() => {
      const mockData = {
        type: 'payment_request',
        amount: 100,
        user_id: 'mock_user',
        description: 'টেস্ট পেমেন্ট'
      };
      toast({
        title: 'QR কোড পাওয়া গেছে!',
        description: 'পেমেন্ট রিকোয়েস্ট: ৳100'
      });
      onScanSuccess?.(mockData);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            QR স্ক্যান / My QR
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'scan' | 'myqr')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-2" style={{ width: 'calc(100% - 32px)' }}>
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              স্ক্যান করুন
            </TabsTrigger>
            <TabsTrigger value="myqr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              My QR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-0">
            <div className="relative">
              {/* Camera View */}
              <div className="aspect-square bg-black relative overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scan Frame Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 border-2 border-white rounded-lg relative">
                    {/* Corner decorations */}
                    <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                    <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    
                    {/* Scanning line animation */}
                    <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" 
                         style={{ animation: 'scanLine 2s ease-in-out infinite' }} />
                  </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-full inline-block">
                    QR কোড ফ্রেমের মধ্যে রাখুন
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                  onClick={handleGallerySelect}
                >
                  <Image className="h-4 w-4" />
                  গ্যালারি
                </Button>
                <Button
                  className="flex-1 flex items-center gap-2"
                  onClick={simulateScan}
                >
                  <Camera className="h-4 w-4" />
                  স্ক্যান করুন
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="myqr" className="mt-0">
            <div className="p-6 flex flex-col items-center">
              {loading ? (
                <div className="h-64 w-64 bg-muted animate-pulse rounded-lg" />
              ) : myQrData ? (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <QRCode
                      value={myQrData}
                      size={200}
                      level="H"
                      className="rounded"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    এই QR কোড স্ক্যান করে আপনার কাছে টাকা পাঠানো যাবে
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      navigator.clipboard.writeText(myQrData);
                      toast({
                        title: 'কপি হয়েছে',
                        description: 'QR ডেটা ক্লিপবোর্ডে কপি হয়েছে'
                      });
                    }}
                  >
                    QR ডেটা কপি করুন
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">লগইন করুন QR দেখতে</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>

      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </Dialog>
  );
};

export default WalletQRScannerDialog;
