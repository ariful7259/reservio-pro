
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoAd {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  videoUrl: string;
  type: 'service' | 'product' | 'rent' | 'hire';
  serviceId?: string;
  productId?: string;
  rentalId?: string;
  isActive: boolean;
}

const VideoAdManagement = () => {
  const { toast } = useToast();
  const [videoAds, setVideoAds] = useState<VideoAd[]>([
    {
      id: '1',
      thumbnail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      title: "নতুন সার্ভিস উপলব্ধ",
      description: "আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "service",
      serviceId: "1",
      isActive: true
    },
    {
      id: '2',
      thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
      title: "সাপ্তাহিক অফার",
      description: "সাপ্তাহিক অফার শেষ হতে আর ২ দিন বাকি",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "product",
      productId: "1",
      isActive: true
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAd, setCurrentAd] = useState<Partial<VideoAd>>({
    type: 'service'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentAd.id) {
      // Update existing ad
      setVideoAds(prev => prev.map(ad => 
        ad.id === currentAd.id ? { ...ad, ...currentAd } as VideoAd : ad
      ));
      toast({
        title: "আপডেট সফল",
        description: "ভিডিও বিজ্ঞাপন আপডেট করা হয়েছে"
      });
    } else {
      // Add new ad
      const newAd: VideoAd = {
        ...currentAd,
        id: Date.now().toString(),
        isActive: true
      } as VideoAd;
      
      setVideoAds(prev => [...prev, newAd]);
      toast({
        title: "যোগ করা হয়েছে",
        description: "নতুন ভিডিও বিজ্ঞাপন যোগ করা হয়েছে"
      });
    }
    
    setCurrentAd({ type: 'service' });
    setIsEditing(false);
  };

  const handleEdit = (ad: VideoAd) => {
    setCurrentAd(ad);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setVideoAds(prev => prev.filter(ad => ad.id !== id));
    toast({
      title: "ডিলিট করা হয়েছে",
      description: "ভিডিও বিজ্ঞাপন ডিলিট করা হয়েছে"
    });
  };

  const toggleStatus = (id: string) => {
    setVideoAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ভিডিও বিজ্ঞাপন ব্যবস্থাপনা</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন বিজ্ঞাপন
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{currentAd.id ? 'বিজ্ঞাপন সম্পাদনা' : 'নতুন বিজ্ঞাপন'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">শিরোনাম</Label>
                  <Input
                    id="title"
                    value={currentAd.title || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">টাইপ</Label>
                  <Select 
                    value={currentAd.type} 
                    onValueChange={(value) => setCurrentAd(prev => ({ ...prev, type: value as VideoAd['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">সার্ভিস</SelectItem>
                      <SelectItem value="product">পণ্য</SelectItem>
                      <SelectItem value="rent">ভাড়া</SelectItem>
                      <SelectItem value="hire">হায়ার</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">বিবরণ</Label>
                <Textarea
                  id="description"
                  value={currentAd.description || ''}
                  onChange={(e) => setCurrentAd(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="thumbnail">থাম্বনেইল URL</Label>
                  <Input
                    id="thumbnail"
                    value={currentAd.thumbnail || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, thumbnail: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="videoUrl">ভিডিও URL</Label>
                  <Input
                    id="videoUrl"
                    value={currentAd.videoUrl || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, videoUrl: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Dynamic ID field based on type */}
              {currentAd.type === 'service' && (
                <div>
                  <Label htmlFor="serviceId">সার্ভিস ID</Label>
                  <Input
                    id="serviceId"
                    value={currentAd.serviceId || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, serviceId: e.target.value }))}
                  />
                </div>
              )}

              {currentAd.type === 'product' && (
                <div>
                  <Label htmlFor="productId">পণ্য ID</Label>
                  <Input
                    id="productId"
                    value={currentAd.productId || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, productId: e.target.value }))}
                  />
                </div>
              )}

              {currentAd.type === 'rent' && (
                <div>
                  <Label htmlFor="rentalId">ভাড়া ID</Label>
                  <Input
                    id="rentalId"
                    value={currentAd.rentalId || ''}
                    onChange={(e) => setCurrentAd(prev => ({ ...prev, rentalId: e.target.value }))}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit">
                  {currentAd.id ? 'আপডেট করুন' : 'যোগ করুন'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setCurrentAd({ type: 'service' });
                  setIsEditing(false);
                }}>
                  বাতিল
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Ads List */}
      <div className="grid gap-4">
        {videoAds.map((ad) => (
          <Card key={ad.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={ad.thumbnail} 
                    alt={ad.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{ad.title}</h3>
                    <p className="text-sm text-muted-foreground">{ad.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {ad.type === 'service' ? 'সার্ভিস' : 
                         ad.type === 'product' ? 'পণ্য' : 
                         ad.type === 'rent' ? 'ভাড়া' : 'হায়ার'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        ad.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {ad.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(ad.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(ad)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoAdManagement;
