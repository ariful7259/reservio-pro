import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Target, 
  Eye,
  MessageSquare,
  Percent
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { RetargetingCampaignForm } from './RetargetingCampaignForm';
import { WishlistAnalytics } from './WishlistAnalytics';

interface SellerInsight {
  id: string;
  seller_id: string;
  product_id?: string;
  service_id?: string;
  item_type: 'product' | 'service';
  wishlist_count: number;
  conversion_count: number;
  conversion_rate: number;
  last_updated: string;
}

export const SellerDashboard: React.FC = () => {
  const [insights, setInsights] = useState<SellerInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSellerInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('seller_insights')
        .select('*')
        .eq('seller_id', user.id)
        .order('wishlist_count', { ascending: false });

      if (error) throw error;
      setInsights((data as SellerInsight[]) || []);
    } catch (error) {
      console.error('Error fetching seller insights:', error);
      toast({
        title: "Error",
        description: "Failed to fetch seller insights",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerInsights();

    // Set up real-time subscription
    const channel = supabase
      .channel('seller-insights-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'seller_insights'
      }, () => {
        fetchSellerInsights();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalWishlistCount = insights.reduce((sum, insight) => sum + insight.wishlist_count, 0);
  const totalConversions = insights.reduce((sum, insight) => sum + insight.conversion_count, 0);
  const averageConversionRate = insights.length > 0 
    ? insights.reduce((sum, insight) => sum + insight.conversion_rate, 0) / insights.length 
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Badge variant="secondary" className="animate-pulse">
          Real-time Analytics
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Wishlisted</p>
                <p className="text-2xl font-bold">{totalWishlistCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">{totalConversions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Percent className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold">{averageConversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                <p className="text-2xl font-bold">{insights.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Product Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="retargeting">Retargeting</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Product Wishlist Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {insights.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No wishlist data available yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When customers add your products to their wishlist, insights will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                          {insight.item_type === 'product' ? (
                            <Eye className="h-6 w-6" />
                          ) : (
                            <Users className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {insight.item_type === 'product' ? 'Product' : 'Service'} ID: {insight.product_id || insight.service_id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date(insight.last_updated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-500">{insight.wishlist_count}</p>
                          <p className="text-xs text-muted-foreground">Wishlisted</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-500">{insight.conversion_count}</p>
                          <p className="text-xs text-muted-foreground">Conversions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-500">{insight.conversion_rate.toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">Rate</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <WishlistAnalytics insights={insights} />
        </TabsContent>

        <TabsContent value="retargeting">
          <RetargetingCampaignForm insights={insights} />
        </TabsContent>
      </Tabs>
    </div>
  );
};