import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WifiOff, Database, ArrowDownToLine, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';

interface OfflineItem {
  id: string;
  type: 'service' | 'product' | 'favorite' | 'page';
  name: string;
  size: number;
  synced: boolean;
}

const OfflineModeManager: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isOnline, language } = useApp();
  
  const [offlineItems, setOfflineItems] = useState<OfflineItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit] = useState(50); // MB
  
  useEffect(() => {
    const mockItems: OfflineItem[] = [
      { id: '1', type: 'service', name: language === 'bn' ? 'প্লাম্বিং সার্ভিস' : 'Plumbing Service', size: 0.5, synced: true },
      { id: '2', type: 'product', name: language === 'bn' ? 'স্মার্ট হোম গ্যাজেট' : 'Smart Home Gadget', size: 1.2, synced: true },
      { id: '3', type: 'favorite', name: language === 'bn' ? 'পছন্দের তালিকা' : 'Favorites List', size: 0.3, synced: true },
      { id: '4', type: 'page', name: language === 'bn' ? 'হোম পেইজ' : 'Home Page', size: 1.8, synced: true },
      { id: '5', type: 'service', name: language === 'bn' ? 'ইলেক্ট্রিশিয়ান' : 'Electrician', size: 0.7, synced: false },
      { id: '6', type: 'product', name: language === 'bn' ? 'মোবাইল অ্যাকসেসরিজ' : 'Mobile Accessories', size: 2.1, synced: false },
    ];
    
    setOfflineItems(mockItems);
    
    const total = mockItems.reduce((acc, item) => acc + item.size, 0);
    setStorageUsed(total);
  }, [language]);
  
  const syncOfflineData = () => {
    if (!isOnline) {
      toast({
        title: language === 'bn' ? 'অফলাইন!' : 'You are offline!',
        description: language === 'bn' ? 'সিঙ্ক করতে ইন্টারনেট সংযোগ প্রয়োজন' : 'Internet connection required for syncing',
        variant: "destructive",
      });
      return;
    }
    
    setIsSyncing(true);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSyncProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        setOfflineItems(items => 
          items.map(item => ({ ...item, synced: true }))
        );
        
        setIsSyncing(false);
        
        toast({
          title: language === 'bn' ? 'সিঙ্ক সম্পন্ন হয়েছে' : 'Sync completed',
          description: language === 'bn' ? 'সমস্ত অফলাইন ডাটা সিঙ্ক করা হয়েছে' : 'All offline data has been synced',
        });
      }
    }, 200);
    
    return () => clearInterval(interval);
  };
  
  const toggleOfflineSync = (id: string) => {
    setOfflineItems(items => 
      items.map(item => 
        item.id === id ? { ...item, synced: !item.synced } : item
      )
    );
    
    setTimeout(() => {
      const syncedItems = offlineItems.filter(item => item.synced || item.id === id);
      const total = syncedItems.reduce((acc, item) => acc + item.size, 0);
      setStorageUsed(total);
    }, 0);
  };
  
  return (
    <div className="mb-6 px-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">
            {language === 'bn' ? 'অফলাইন ডাটা ম্যানেজমেন্ট' : 'Offline Data Management'}
          </h2>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/offline-mode')}
        >
          {language === 'bn' ? 'সেটিংস' : 'Settings'}
        </Button>
      </div>
      
      <div className="p-3 rounded-lg bg-muted/50 mb-3">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">
            {language === 'bn' ? 'স্টোরেজ ব্যবহার' : 'Storage Usage'}
          </div>
          <div className="text-sm text-muted-foreground">
            {storageUsed !== undefined ? storageUsed.toFixed(1) : '0.0'}/{storageLimit} MB
          </div>
        </div>
        <Progress 
          value={(storageUsed / storageLimit) * 100} 
          className="h-2"
        />
      </div>
      
      {!isOnline && !isSyncing && offlineItems.some(item => !item.synced) && (
        <div className="flex items-center justify-between p-2 mb-2 rounded-md bg-amber-50 border border-amber-200">
          <div className="flex items-center text-amber-700 text-sm">
            <WifiOff className="h-4 w-4 mr-2" />
            <span>
              {language === 'bn' 
                ? 'কিছু আইটেম সিঙ্ক করা হয়নি' 
                : 'Some items are not synced'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-amber-200 text-amber-700 text-xs h-7"
            disabled={true}
          >
            {language === 'bn' ? 'অফলাইন' : 'Offline'}
          </Button>
        </div>
      )}
      
      {isOnline && !isSyncing && offlineItems.some(item => !item.synced) && (
        <div className="flex items-center justify-between p-2 mb-2 rounded-md bg-blue-50 border border-blue-200">
          <div className="flex items-center text-blue-700 text-sm">
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            <span>
              {language === 'bn' 
                ? 'আপডেট ডাউনলোড করতে সিঙ্ক করুন' 
                : 'Sync to download updates'}
            </span>
          </div>
          
          <Button 
            size="sm" 
            className="bg-blue-500 text-white text-xs h-7"
            onClick={syncOfflineData}
          >
            {language === 'bn' ? 'সিঙ্ক করুন' : 'Sync Now'}
          </Button>
        </div>
      )}
      
      {isSyncing && (
        <div className="p-2 mb-2 rounded-md bg-blue-50 border border-blue-200">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-blue-700">
              {language === 'bn' ? 'সিঙ্ক হচ্ছে...' : 'Syncing...'}
            </div>
            <div className="text-xs text-blue-700">
              {syncProgress}%
            </div>
          </div>
          <Progress value={syncProgress} className="h-1 bg-blue-100" />
        </div>
      )}
      
      <div>
        {offlineItems.slice(0, 3).map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div>
              <div className="font-medium text-sm">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {item.size !== undefined ? item.size.toFixed(1) : '0.0'} MB • {item.synced 
                  ? language === 'bn' ? 'অফলাইনে উপলব্ধ' : 'Available offline'
                  : language === 'bn' ? 'শুধু অনলাইনে' : 'Online only'
                }
              </div>
            </div>
            
            <Button
              variant={item.synced ? "default" : "outline"}
              size="sm"
              className={`text-xs h-7 ${item.synced ? 'bg-green-500' : ''}`}
              onClick={() => toggleOfflineSync(item.id)}
            >
              {item.synced ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  {language === 'bn' ? 'সিঙ্কড' : 'Synced'}
                </>
              ) : (
                <>
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  {language === 'bn' ? 'সিঙ্ক' : 'Sync'}
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-2">
        <Button 
          variant="ghost"
          size="sm"
          className="w-full text-center text-xs text-muted-foreground"
          onClick={() => navigate('/offline-mode')}
        >
          {language === 'bn' ? 'সব অফলাইন আইটেম দেখুন' : 'View all offline items'} ({offlineItems.length})
        </Button>
      </div>
    </div>
  );
};

export default OfflineModeManager;
