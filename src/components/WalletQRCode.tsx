
import React from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface WalletQRCodeProps {
  walletId: string;
  phoneNumber: string;
  userName: string;
}

const WalletQRCode: React.FC<WalletQRCodeProps> = ({ walletId, phoneNumber, userName }) => {
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
    }
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
        <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          শেয়ার করুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletQRCode;
