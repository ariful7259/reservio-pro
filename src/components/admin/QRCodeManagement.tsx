
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import QRCode from 'react-qr-code';
import { Download, Copy, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const QRCodeManagement = () => {
  const [qrValue, setQrValue] = React.useState('https://example.com/referral');

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    toast({
      title: 'কপি করা হয়েছে',
      description: 'QR কোড লিংক কপি করা হয়েছে।',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">QR কোড ম্যানেজমেন্ট</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>QR কোড জেনারেটর</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">QR কোড লিংক</label>
              <Input 
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                placeholder="লিংক দিন"
                className="w-full"
              />
            </div>

            <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg">
              <QRCode 
                value={qrValue}
                size={200}
                level="H"
                className="animate-fade-in"
              />
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  লিংক কপি
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  QR ডাউনলোড
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setQrValue(`https://example.com/referral?t=${Date.now()}`)}
                >
                  <RefreshCw className="h-4 w-4" />
                  নতুন QR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR কোড স্ট্যাটিসটিক্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">মোট স্ক্যান</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">আজকের স্ক্যান</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">সফল রেজিস্ট্রেশন</p>
                  <p className="text-2xl font-bold">892</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">কনভার্সন রেট</p>
                  <p className="text-2xl font-bold">72.3%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeManagement;
