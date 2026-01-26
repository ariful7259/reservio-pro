import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera, Image, Loader2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface SendByQRTabProps {
  onScanSuccess: (data: any) => void;
  onClose: () => void;
}

export const SendByQRTab: React.FC<SendByQRTabProps> = ({
  onScanSuccess,
  onClose
}) => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerContainerId = 'send-qr-reader';

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const container = document.getElementById(scannerContainerId);
      if (!container) return;

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
    await stopScanner();
    
    toast({
      title: 'QR কোড স্ক্যান সফল!',
      description: 'ডেটা পাওয়া গেছে'
    });

    try {
      const data = JSON.parse(decodedText);
      onScanSuccess(data);
    } catch {
      onScanSuccess({ type: 'text', data: decodedText });
    }
    
    onClose();
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await stopScanner();
      
      const html5QrCode = new Html5Qrcode('send-qr-file-reader');
      
      const result = await html5QrCode.scanFile(file, true);
      
      toast({
        title: 'QR কোড স্ক্যান সফল!',
        description: 'গ্যালারি থেকে QR কোড রিড হয়েছে'
      });

      try {
        const data = JSON.parse(result);
        onScanSuccess(data);
      } catch {
        onScanSuccess({ type: 'text', data: result });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: 'স্ক্যান ব্যর্থ',
        description: 'এই ছবিতে কোনো QR কোড পাওয়া যায়নি',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="aspect-square bg-black relative overflow-hidden rounded-lg">
          <div id={scannerContainerId} className="w-full h-full" />
          
          {scanning && (
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-full inline-block animate-pulse">
                QR কোড খুঁজছি...
              </p>
            </div>
          )}
        </div>

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

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div id="send-qr-file-reader" className="hidden" />
      </div>

      <p className="text-xs text-muted-foreground text-center px-4 pb-4">
        প্রাপকের QR কোড স্ক্যান করে সরাসরি টাকা পাঠান
      </p>
    </div>
  );
};
