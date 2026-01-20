import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Search, 
  RefreshCw, 
  UserPlus, 
  Trash2, 
  Edit, 
  ShieldCheck, 
  ShieldX, 
  Bell, 
  Eye,
  Filter,
  Clock
} from 'lucide-react';
import { useSellerActivityLog, ActivityLog } from '@/hooks/useSellerActivityLog';
import { supabase } from '@/integrations/supabase/client';

interface SellerInfo {
  id: string;
  business_name: string | null;
}

const SellerActivityLog = () => {
  const { getActivityLogs } = useSellerActivityLog();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sellers, setSellers] = useState<Record<string, SellerInfo>>({});

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getActivityLogs(undefined, 100);
      setLogs(data);

      // Fetch seller names
      const sellerIds = [...new Set(data.map(log => log.seller_id))];
      if (sellerIds.length > 0) {
        const { data: sellersData } = await supabase
          .from('seller_profiles')
          .select('id, business_name')
          .in('id', sellerIds);

        const sellersMap: Record<string, SellerInfo> = {};
        (sellersData || []).forEach(seller => {
          sellersMap[seller.id] = seller;
        });
        setSellers(sellersMap);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'seller_created': return <UserPlus className="h-4 w-4" />;
      case 'seller_updated': return <Edit className="h-4 w-4" />;
      case 'seller_deleted': return <Trash2 className="h-4 w-4" />;
      case 'seller_verified': return <ShieldCheck className="h-4 w-4" />;
      case 'seller_unverified': return <ShieldX className="h-4 w-4" />;
      case 'notification_sent': return <Bell className="h-4 w-4" />;
      case 'bulk_notification_sent': return <Bell className="h-4 w-4" />;
      case 'seller_viewed': return <Eye className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionBadge = (actionType: string) => {
    const actionMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      seller_created: { label: 'সেলার তৈরি', variant: 'default' },
      seller_updated: { label: 'আপডেট', variant: 'secondary' },
      seller_deleted: { label: 'মুছে ফেলা', variant: 'destructive' },
      seller_verified: { label: 'ভেরিফাই', variant: 'default' },
      seller_unverified: { label: 'আনভেরিফাই', variant: 'outline' },
      notification_sent: { label: 'নোটিফিকেশন', variant: 'secondary' },
      bulk_notification_sent: { label: 'বাল্ক নোটিফিকেশন', variant: 'secondary' },
      seller_viewed: { label: 'দেখা হয়েছে', variant: 'outline' }
    };

    const action = actionMap[actionType] || { label: actionType, variant: 'outline' as const };
    return <Badge variant={action.variant}>{action.label}</Badge>;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'এইমাত্র';
    if (diffMins < 60) return `${diffMins} মিনিট আগে`;
    if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
    if (diffDays < 7) return `${diffDays} দিন আগে`;
    return date.toLocaleDateString('bn-BD');
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      sellers[log.seller_id]?.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || log.action_type === filterType;

    return matchesSearch && matchesType;
  });

  const actionTypes = [...new Set(logs.map(log => log.action_type))];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              অ্যাক্টিভিটি লগ
            </CardTitle>
            <CardDescription>
              সেলার সম্পর্কিত সকল কার্যক্রমের ইতিহাস
            </CardDescription>
          </div>
          <Button variant="outline" onClick={fetchLogs} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="সেলার বা অ্যাকশন খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব অ্যাকশন</SelectItem>
              {actionTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">কোনো অ্যাক্টিভিটি পাওয়া যায়নি</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {getActionIcon(log.action_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getActionBadge(log.action_type)}
                      <span className="font-medium truncate">
                        {sellers[log.seller_id]?.business_name || 'অজানা সেলার'}
                      </span>
                    </div>
                    {log.action_details && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {JSON.stringify(log.action_details)}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(log.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerActivityLog;
