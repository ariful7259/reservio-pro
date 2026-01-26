import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'react-qr-code';
import { Camera, Image, QrCode } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

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
  const [scanning, setScanning] = useState(false);
  const [myQrData, setMyQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerContainerId = 'qr-reader';

  useEffect(() => {
    if (open && activeTab === 'scan') {
      startScanner();
    }
    return () => {
      stopScanner();
    };
  }, [open, activeTab]);

  useEffect(() => {
    if (open && activeTab === 'myqr') {
      generateMyQR();
    }
  }, [open, activeTab]);

  const startScanner = async () => {
    try {
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const container = document.getElementById(scannerContainerId);
      if (!container) return;

      // Clean up existing scanner
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch (e) {
          // Ignore stop errors
        }
      }

      scannerRef.current = new Html5Qrcode(scannerContainerId);
      
      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // QR code not found - ignore
        }
      );
      
      setScanning(true);
    } catch (error) {
      console.error('Scanner error:', error);
      toast({
        title: 'ক্যামেরা অ্যাক্সেস',
        description: 'ক্যামেরা অ্যাক্সেস করতে অনুমতি দিন',
        variant: 'destructive'
      });
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        // Ignore errors on cleanup
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleScanSuccess = async (decodedText: string) => {
    // Stop scanner after successful scan
    await stopScanner();
    
    toast({
      title: 'QR কোড স্ক্যান সফল!',
      description: 'ডেটা পাওয়া গেছে'
    });

    try {
      const data = JSON.parse(decodedText);
      onScanSuccess?.(data);
    } catch {
      // Not JSON, treat as plain text
      onScanSuccess?.({ type: 'text', data: decodedText });
    }
    
    onOpenChange(false);
  };

  const handleClose = () => {
    stopScanner();
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

    try {
      // Stop camera scanner first
      await stopScanner();
      
      const html5QrCode = new Html5Qrcode('qr-file-reader');
      
      const result = await html5QrCode.scanFile(file, true);
      
      toast({
        title: 'QR কোড স্ক্যান সফল!',
        description: 'গ্যালারি থেকে QR কোড রিড হয়েছে'
      });

      try {
        const data = JSON.parse(result);
        onScanSuccess?.(data);
      } catch {
        onScanSuccess?.({ type: 'text', data: result });
      }
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'স্ক্যান ব্যর্থ',
        description: 'এই ছবিতে কোনো QR কোড পাওয়া যায়নি',
        variant: 'destructive'
      });
    }
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
              {/* Scanner Container */}
              <div className="aspect-square bg-black relative overflow-hidden">
                <div id={scannerContainerId} className="w-full h-full" />
                
                {/* Scanning indicator */}
                {scanning && (
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-full inline-block animate-pulse">
                      QR কোড খুঁজছি...
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                  onClick={handleGallerySelect}
                >
                  <Image className="h-4 w-4" />
                  গ্যালারি থেকে
                </Button>
                <Button
                  className="flex-1 flex items-center gap-2"
                  onClick={() => {
                    if (!scanning) startScanner();
                  }}
                  disabled={scanning}
                >
                  <Camera className="h-4 w-4" />
                  {scanning ? 'স্ক্যানিং...' : 'স্ক্যান করুন'}
                </Button>
              </div>

              {/* Hidden elements for file scanning */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div id="qr-file-reader" className="hidden" />
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
    </Dialog>
  );
};

export default WalletQRScannerDialog;
