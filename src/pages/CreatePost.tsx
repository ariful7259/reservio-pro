
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { usePostStore, Post } from '@/store/usePostStore';
import { useCreatePostForm } from '@/hooks/useCreatePostForm';
import { CategorySelector } from '@/components/create-post/CategorySelector';
import { LocationSelector } from '@/components/create-post/LocationSelector';
import { ImageUpload } from '@/components/create-post/ImageUpload';
import { VideoUpload } from '@/components/create-post/VideoUpload';
import { PostTypeFields } from '@/components/create-post/PostTypeFields';
import { 
  Building, 
  ShoppingBag, 
  Search, 
  Upload
} from 'lucide-react';

const CreatePost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPost } = usePostStore();
  
  const postType = searchParams.get('type') || 'rental';
  const { formData, updateFormData } = useCreatePostForm();

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const getIcon = () => {
    switch (postType) {
      case 'rental': return <Building className="h-6 w-6" />;
      case 'service': return <Search className="h-6 w-6" />;
      case 'marketplace': return <ShoppingBag className="h-6 w-6" />;
      default: return <Building className="h-6 w-6" />;
    }
  };

  const getTitle = () => {
    switch (postType) {
      case 'rental': return 'রেন্টাল পোস্ট করুন';
      case 'service': return 'সার্ভিস পোস্ট করুন';
      case 'marketplace': return 'প্রোডাক্ট পোস্ট করুন';
      default: return 'পোস্ট করুন';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedVideos(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index));
    if (currentVideoIndex >= uploadedVideos.length - 1) {
      setCurrentVideoIndex(0);
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex(prev => (prev + 1) % uploadedVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex(prev => (prev - 1 + uploadedVideos.length) % uploadedVideos.length);
  };

  const handleCategoryChange = (category: string) => {
    updateFormData({ category, subcategory: '' });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    updateFormData({ subcategory });
  };

  const handleLocationChange = (location: string) => {
    updateFormData({ location });
  };

  const handleCoordinatesChange = (lat: number, lng: number) => {
    updateFormData({ latitude: lat, longitude: lng });
  };

  const handleFieldChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    const basePost = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      location: formData.location,
      latitude: formData.latitude,
      longitude: formData.longitude,
      price: formData.price,
      images: uploadedImages.map(img => URL.createObjectURL(img)),
      videos: uploadedVideos.map(video => URL.createObjectURL(video)),
      createdAt: new Date()
    };

    let newPost: Post;

    switch (postType) {
      case 'rental':
        newPost = {
          ...basePost,
          type: 'rent',
          period: formData.period
        };
        break;
      case 'service':
        newPost = {
          ...basePost,
          type: 'service',
          duration: formData.duration,
          timeUnit: formData.timeUnit
        };
        break;
      case 'marketplace':
        newPost = {
          ...basePost,
          type: 'marketplace',
          discountPrice: formData.discountPrice,
          tags: formData.tags
        };
        break;
      default:
        newPost = {
          ...basePost,
          type: 'rent',
          period: formData.period
        };
    }

    addPost(newPost);

    toast({
      title: "সফল",
      description: `আপনার ${postType === 'rental' ? 'রেন্টাল' : postType === 'service' ? 'সার্ভিস' : 'প্রোডাক্ট'} পোস্ট সফলভাবে যুক্ত হয়েছে`,
      variant: "default"
    });

    // Navigate to appropriate page
    switch (postType) {
      case 'rental':
        navigate('/rentals');
        break;
      case 'service':
        navigate('/services');
        break;
      case 'marketplace':
        navigate('/marketplace');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getIcon()}
              {getTitle()}
            </CardTitle>
            <p className="text-muted-foreground">
              আপনার {postType === 'rental' ? 'প্রোপার্টি' : postType === 'service' ? 'সেবা' : 'প্রোডাক্ট'} এর বিস্তারিত তথ্য দিন
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="আকর্ষণীয় শিরোনাম লিখুন"
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="বিস্তারিত বিবরণ লিখুন"
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <CategorySelector
                  postType={postType}
                  formData={formData}
                  onCategoryChange={handleCategoryChange}
                  onSubcategoryChange={handleSubcategoryChange}
                />

                <LocationSelector
                  location={formData.location}
                  onLocationChange={handleLocationChange}
                  onCoordinatesChange={handleCoordinatesChange}
                />

                <PostTypeFields
                  postType={postType}
                  formData={formData}
                  onFieldChange={handleFieldChange}
                />

                <div className="space-y-4">
                  <ImageUpload
                    uploadedImages={uploadedImages}
                    onImageUpload={handleImageUpload}
                    onRemoveImage={removeImage}
                  />

                  <VideoUpload
                    uploadedVideos={uploadedVideos}
                    currentVideoIndex={currentVideoIndex}
                    onVideoUpload={handleVideoUpload}
                    onRemoveVideo={removeVideo}
                    onNextVideo={nextVideo}
                    onPrevVideo={prevVideo}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  বাতিল
                </Button>
                <Button type="submit" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  পোস্ট প্রকাশ করুন
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
