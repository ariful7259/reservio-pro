
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import WalletQRCode from '@/components/WalletQRCode';

const QrScanner = () => {
  const { language, isOnline } = useApp();
  const [scanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const navigate = useNavigate();

  const startScanner = async () => {
    if (!isOnline) {
      toast({
        title: language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode',
        description: language === 'bn' ? 'QR স্ক্যান করতে ইন্টারনেট সংযোগ প্রয়োজন' : 'Internet connection required for QR scanning',
        variant: "destructive",
      });
      return;
    }

    setScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasPermission(true);
      
      // In a real implementation, we'd initialize a QR code scanner library here
      // For demonstration, we'll simulate a successful scan after a delay
      setTimeout(() => {
        // Simulate a successful scan
        const mockQrData = JSON.stringify({
          walletId: 'wallet_12345',
          amount: 500,
          type: 'payment'
        });
        
        setScannedData(mockQrData);
        setScanning(false);
        
        // Clean up camera stream
        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: language === 'bn' ? 'QR স্ক্যান সফল' : 'QR Scan Successful',
          description: language === 'bn' ? 'পেমেন্ট তথ্য পাওয়া গেছে' : 'Payment information received',
        });
      }, 3000);
      
    } catch (err) {
      console.error('Error accessing camera', err);
      setHasPermission(false);
      setScanning(false);
      
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'ক্যামেরা অ্যাক্সেস করতে ব্যর্থ হয়েছে' : 'Failed to access camera',
        variant: "destructive",
      });
    }
  };

  const cancelScan = () => {
    setScanning(false);
    // If there's an active stream, we'd stop it here
  };

  const handlePayment = () => {
    if (scannedData) {
      // Process the scanned data
      toast({
        title: language === 'bn' ? 'প্রক্রিয়া করা হচ্ছে...' : 'Processing...',
        description: language === 'bn' ? 'পেমেন্ট প্রক্রিয়া করা হচ্ছে' : 'Processing payment',
      });
      
      // Simulate payment processing
      setTimeout(() => {
        toast({
          title: language === 'bn' ? 'পেমেন্ট সফল' : 'Payment Successful',
          description: language === 'bn' ? '৳500 পাঠানো হয়েছে' : '৳500 has been sent',
        });
        
        // Redirect to wallet page after successful payment
        navigate('/wallet');
      }, 2000);
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'bn' ? 'QR কোড স্ক্যান করুন' : 'Scan QR Code'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'bn' ? 'স্ক্যানার' : 'Scanner'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {!scanning && !scannedData ? (
              <div className="text-center">
                <div className="h-48 w-48 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <rect width="16" height="16" x="4" y="4" rx="2"/>
                    <rect width="4" height="4" x="6" y="6"/>
                    <rect width="4" height="4" x="14" y="6"/>
                    <rect width="4" height="4" x="14" y="14"/>
                    <rect width="4" height="4" x="6" y="14"/>
                  </svg>
                </div>
                <Button onClick={startScanner} className="w-full">
                  {language === 'bn' ? 'QR কোড স্ক্যান করুন' : 'Scan QR Code'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {language === 'bn' 
                    ? 'পেমেন্ট করতে বা তথ্য পেতে QR কোড স্ক্যান করুন'
                    : 'Scan a QR code to make payment or get information'}
                </p>
              </div>
            ) : scanning ? (
              <div className="text-center">
                <div className="h-48 w-48 mb-4 bg-gray-100 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-primary animate-pulse rounded-lg"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-full bg-primary animate-scan absolute"></div>
                  </div>
                </div>
                <p className="mb-4">
                  {language === 'bn' ? 'QR কোড স্ক্যান করা হচ্ছে...' : 'Scanning QR Code...'}
                </p>
                <Button onClick={cancelScan} variant="outline">
                  {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="h-48 w-48 mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="mb-4 font-medium">
                  {language === 'bn' ? 'QR কোড স্ক্যান সফল!' : 'QR Code Scan Successful!'}
                </p>
                <Button onClick={handlePayment} className="w-full mb-2">
                  {language === 'bn' ? 'পেমেন্ট করুন' : 'Make Payment'}
                </Button>
                <Button onClick={() => setScannedData(null)} variant="outline" className="w-full">
                  {language === 'bn' ? 'আবার স্ক্যান করুন' : 'Scan Again'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div>
          <WalletQRCode 
            walletId="wallet_67890"
            phoneNumber="01912345678"
            userName="রহিম আহমেদ"
          />
          
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'bn' ? 'কিভাবে ব্যবহার করবেন' : 'How to Use'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  {language === 'bn'
                    ? 'স্ক্যান বাটন ক্লিক করুন এবং ক্যামেরা অ্যাক্সেস অনুমতি দিন'
                    : 'Click the scan button and allow camera access'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'QR কোড স্ক্যান করার জন্য ক্যামেরা দিয়ে লক্ষ্য করুন'
                    : 'Point your camera at the QR code to scan'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'স্ক্যান সফল হলে, পেমেন্ট করুন বাটনে ক্লিক করুন'
                    : 'When scan is successful, click the Make Payment button'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'পেমেন্ট নিশ্চিত করতে PIN বা পাসওয়ার্ড ব্যবহার করুন'
                    : 'Use your PIN or password to confirm payment'}
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
