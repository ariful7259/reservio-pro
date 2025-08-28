import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, MessageSquare, Percent, Calendar, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface RetargetingCampaign {
  id: string;
  campaign_name: string;
  target_product_id?: string;
  target_service_id?: string;
  item_type: 'product' | 'service';
  discount_percentage?: number;
  discount_amount?: number;
  campaign_message: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  target_criteria: any;
}

interface SellerInsight {
  id: string;
  product_id?: string;
  service_id?: string;
  item_type: 'product' | 'service';
  wishlist_count: number;
  conversion_rate: number;
}

interface RetargetingCampaignFormProps {
  insights: SellerInsight[];
}

export const RetargetingCampaignForm: React.FC<RetargetingCampaignFormProps> = ({
  insights
}) => {
  const [campaigns, setCampaigns] = useState<RetargetingCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    campaign_name: '',
    target_product_id: '',
    target_service_id: '',
    item_type: 'product' as 'product' | 'service',
    discount_percentage: '',
    discount_amount: '',
    campaign_message: '',
    end_date: '',
    target_criteria: {}
  });

  const fetchCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('retargeting_campaigns')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns((data as RetargetingCampaign[]) || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const createCampaign = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('retargeting_campaigns')
        .insert({
          seller_id: user.id,
          campaign_name: formData.campaign_name,
          target_product_id: formData.item_type === 'product' ? formData.target_product_id : null,
          target_service_id: formData.item_type === 'service' ? formData.target_service_id : null,
          item_type: formData.item_type,
          discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : null,
          discount_amount: formData.discount_amount ? parseFloat(formData.discount_amount) : null,
          campaign_message: formData.campaign_message,
          end_date: formData.end_date || null,
          target_criteria: formData.target_criteria
        })
        .select()
        .single();

      if (error) throw error;

      setCampaigns(prev => [data as RetargetingCampaign, ...prev]);
      
      // Reset form
      setFormData({
        campaign_name: '',
        target_product_id: '',
        target_service_id: '',
        item_type: 'product',
        discount_percentage: '',
        discount_amount: '',
        campaign_message: '',
        end_date: '',
        target_criteria: {}
      });

      toast({
        title: "Campaign Created",
        description: "Your retargeting campaign has been created successfully",
      });

    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaign = async (campaignId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('retargeting_campaigns')
        .update({ is_active: !isActive })
        .eq('id', campaignId);

      if (error) throw error;

      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, is_active: !isActive }
            : campaign
        )
      );

      toast({
        title: isActive ? "Campaign Paused" : "Campaign Activated",
        description: `Campaign has been ${isActive ? 'paused' : 'activated'}`,
      });

    } catch (error: any) {
      console.error('Error toggling campaign:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update campaign",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const getAIRecommendations = () => {
    const highWishlistItems = insights
      .filter(insight => insight.wishlist_count > 5)
      .sort((a, b) => b.wishlist_count - a.wishlist_count);

    const lowConversionItems = insights
      .filter(insight => insight.conversion_rate < 10 && insight.wishlist_count > 0)
      .sort((a, b) => a.conversion_rate - b.conversion_rate);

    return { highWishlistItems, lowConversionItems };
  };

  const { highWishlistItems, lowConversionItems } = getAIRecommendations();

  return (
    <Tabs defaultValue="create" className="space-y-4">
      <TabsList>
        <TabsTrigger value="create">Create Campaign</TabsTrigger>
        <TabsTrigger value="active">Active Campaigns</TabsTrigger>
        <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Create Retargeting Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign_name">Campaign Name</Label>
                <Input
                  id="campaign_name"
                  value={formData.campaign_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                  placeholder="e.g., Summer Sale Retargeting"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item_type">Target Type</Label>
                <Select
                  value={formData.item_type}
                  onValueChange={(value: 'product' | 'service') => 
                    setFormData(prev => ({ ...prev, item_type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_item">Target {formData.item_type === 'product' ? 'Product' : 'Service'} ID</Label>
                <Select
                  value={formData.item_type === 'product' ? formData.target_product_id : formData.target_service_id}
                  onValueChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      [formData.item_type === 'product' ? 'target_product_id' : 'target_service_id']: value 
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item to target" />
                  </SelectTrigger>
                  <SelectContent>
                    {insights
                      .filter(insight => insight.item_type === formData.item_type)
                      .map(insight => (
                        <SelectItem 
                          key={insight.id} 
                          value={insight.product_id || insight.service_id || ''}
                        >
                          ID: {insight.product_id || insight.service_id} (Wishlist: {insight.wishlist_count})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_percentage">Discount Percentage (%)</Label>
                <Input
                  id="discount_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount_percentage: e.target.value }))}
                  placeholder="e.g., 20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_amount">Or Discount Amount (৳)</Label>
                <Input
                  id="discount_amount"
                  type="number"
                  min="0"
                  value={formData.discount_amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount_amount: e.target.value }))}
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">Campaign End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign_message">Campaign Message</Label>
              <Textarea
                id="campaign_message"
                value={formData.campaign_message}
                onChange={(e) => setFormData(prev => ({ ...prev, campaign_message: e.target.value }))}
                placeholder="Special offer just for you! Your wishlisted item is now available with a discount."
                rows={4}
              />
            </div>

            <Button onClick={createCampaign} disabled={loading} className="w-full">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No campaigns created yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map(campaign => (
                  <div 
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{campaign.campaign_name}</h3>
                        <Badge variant={campaign.is_active ? "default" : "secondary"}>
                          {campaign.is_active ? "Active" : "Paused"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {campaign.campaign_message}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Target: {campaign.item_type} {campaign.target_product_id || campaign.target_service_id}</span>
                        {campaign.discount_percentage && (
                          <span>Discount: {campaign.discount_percentage}%</span>
                        )}
                        {campaign.discount_amount && (
                          <span>Discount: ৳{campaign.discount_amount}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={campaign.is_active ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleCampaign(campaign.id, campaign.is_active)}
                    >
                      {campaign.is_active ? "Pause" : "Activate"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recommendations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">High Wishlist Items</CardTitle>
            </CardHeader>
            <CardContent>
              {highWishlistItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No high-wishlist items found</p>
              ) : (
                <div className="space-y-2">
                  {highWishlistItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.product_id || item.service_id}</span>
                      <Badge variant="secondary">{item.wishlist_count} wishlisted</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Low Conversion Items</CardTitle>
            </CardHeader>
            <CardContent>
              {lowConversionItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No low-conversion items found</p>
              ) : (
                <div className="space-y-2">
                  {lowConversionItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.product_id || item.service_id}</span>
                      <Badge variant="destructive">{item.conversion_rate.toFixed(1)}% rate</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};