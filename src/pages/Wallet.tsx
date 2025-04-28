
import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Zap,
  History,
  Copy,
  Settings,
  Wallet as WalletIcon,
  Download,
  SendHorizontal,
  Smartphone,
  DollarSign,
  RefreshCcw,
  TimerReset,
  Users,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [walletId] = useState('200 008 794');

  const handleCopyId = () => {
    navigator.clipboard.writeText(walletId);
    toast({
      title: "ওয়ালেট আইডি কপি করা হয়েছে",
      description: `${walletId} আইডি ক্লিপবোর্ডে কপি করা হয়েছে`,
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="container px-4 pt-20 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Pay</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Binance ID: {walletId}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 text-gray-400"
                  onClick={handleCopyId}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: <SendHorizontal className="h-6 w-6" />, label: "Send" },
            { icon: <Download className="h-6 w-6" />, label: "Receive" },
            { icon: <Gift className="h-6 w-6" />, label: "Red\nPacket" },
            { icon: <WalletIcon className="h-6 w-6" />, label: "Send\nCash" },
            { icon: <Smartphone className="h-6 w-6" />, label: "Mobile\nTop Up" },
            { icon: <DollarSign className="h-6 w-6" />, label: "$1 Game" },
            { icon: <RefreshCcw className="h-6 w-6" />, label: "Convert" },
            { icon: <TimerReset className="h-6 w-6" />, label: "Flexible\nEarn" },
            { icon: <Users className="h-6 w-6" />, label: "Send\nMultiple" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col items-center justify-center h-24 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-xs text-center whitespace-pre-line">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Get Rewarded Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Get Rewarded</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Red Packet Giveaway", icon: <Gift className="h-6 w-6 text-primary" /> },
              { title: "Share Red Packet", icon: <Gift className="h-6 w-6 text-primary" /> },
              { title: "Hot Deals", icon: <Flame className="h-6 w-6 text-primary" /> },
              { title: "Send Campaign", icon: <Gift className="h-6 w-6 text-primary" /> },
            ].map((item, index) => (
              <Card key={index} className="bg-[#1F2937] border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transactions Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-between py-6 text-lg font-medium bg-[#1F2937] hover:bg-[#1F2937]/90"
        >
          <span>Transactions</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
