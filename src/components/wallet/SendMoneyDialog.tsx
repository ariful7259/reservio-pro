import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Phone, Mail, Link2, QrCode } from 'lucide-react';
import { SendByPhoneTab } from './send-money/SendByPhoneTab';
import { SendByEmailTab } from './send-money/SendByEmailTab';
import { SendByLinkTab } from './send-money/SendByLinkTab';
import { SendByQRTab } from './send-money/SendByQRTab';

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
  onSuccess: () => void;
  onQrScanSuccess?: (data: any) => void;
}

export const SendMoneyDialog: React.FC<SendMoneyDialogProps> = ({
  open,
  onOpenChange,
  currentBalance,
  onSuccess,
  onQrScanSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email' | 'link' | 'qr'>('phone');

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleQrScan = (data: any) => {
    onOpenChange(false);
    onQrScanSuccess?.(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            টাকা পাঠান
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mx-4 mb-2" style={{ width: 'calc(100% - 32px)' }}>
            <TabsTrigger value="phone" className="flex items-center gap-1 text-xs px-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ফোন</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-1 text-xs px-2">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ইমেইল</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-1 text-xs px-2">
              <Link2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">লিংক</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-1 text-xs px-2">
              <QrCode className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">QR</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="mt-0">
            <SendByPhoneTab
              currentBalance={currentBalance}
              onSuccess={onSuccess}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="email" className="mt-0">
            <SendByEmailTab
              currentBalance={currentBalance}
              onSuccess={onSuccess}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="link" className="mt-0">
            <SendByLinkTab currentBalance={currentBalance} />
          </TabsContent>

          <TabsContent value="qr" className="mt-0">
            <SendByQRTab
              onScanSuccess={handleQrScan}
              onClose={handleClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
