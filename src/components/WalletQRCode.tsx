
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Scan, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface WalletQRCodeProps {
  walletId: string;
  phoneNumber: string;
  userName: string;
}

const WalletQRCode: React.FC<WalletQRCodeProps> = ({ walletId, phoneNumber, userName }) => {
  const { toast } = useToast();
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  
  const qrValue = JSON.stringify({
    walletId,
    phoneNumber,
    userName,
    type: 'wallet'
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'আমার পেমেন্ট QR কোড',
          text: `${userName} (${phoneNumber}) এর পেমেন্ট QR কোড স্ক্যান করুন`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      toast({
        title: "শেয়ার করার বিকল্প",
        description: "আপনার ডিভাইসে শেয়ারিং সাপোর্ট করে না। QR কোড স্ক্রিনশট নিন।",
      });
    }
  };

  const handleScanQR = () => {
    setScanDialogOpen(true);
    // In a real app, this would activate the device camera
    // For demo purposes, we'll just show a message
    setTimeout(() => {
      toast({
        title: "ক্যামেরা অ্যাক্সেস",
        description: "QR কোড স্ক্যান করতে আপনার ক্যামেরা অ্যাক্সেস দিন",
      });
    }, 1000);
  };

  return (
    <Card className="border mb-6">
      <CardContent className="p-5 flex flex-col items-center">
        <h3 className="font-semibold text-lg mb-4">আমার QR কোড</h3>
        <div className="bg-white p-3 rounded-lg mb-4">
          <QRCode value={qrValue} size={180} />
        </div>
        <p className="text-sm text-center mb-2">এই QR কোড স্ক্যান করে টাকা পাঠান</p>
        <p className="font-medium text-primary mb-4">{walletId}</p>
        
        <div className="flex items-center gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShare} 
            className="flex items-center gap-2 flex-1"
          >
            <Share2 className="h-4 w-4" />
            শেয়ার করুন
          </Button>
          
          <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleScanQR} 
                className="flex items-center gap-2 flex-1"
              >
                <Scan className="h-4 w-4" />
                স্ক্যান করুন
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>QR কোড স্ক্যান করুন</DialogTitle>
              </DialogHeader>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <QrCode className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">QR কোড স্ক্যানারে রাখুন</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                অন্য ব্যবহারকারীর QR কোড স্ক্যান করে টাকা পাঠান বা লিস্টিং দেখুন
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletQRCode;
