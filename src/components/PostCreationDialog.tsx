
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Building,
  ShoppingBag,
  Search,
  Rocket,
  Upload,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import PostDigitalProduct from './product/PostDigitalProduct';
import CategorySelector from './CategorySelector';

interface PostCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostCreationDialog = ({ isOpen, onClose }: PostCreationDialogProps) => {
  const [activeTab, setActiveTab] = useState('rental');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const MediaUploadSection = () => (
    <div className="space-y-4">
      {/* Image Upload */}
      <div>
        <Label htmlFor="images" className="text-sm font-medium">ছবি আপলোড করুন</Label>
        <div className="mt-2">
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">একাধিক ছবি নির্বাচন করুন</span>
          </label>
        </div>
        
        {/* Uploaded Images Preview */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div>
        <Label htmlFor="videos" className="text-sm font-medium">ভিডিও আপলোড করুন</Label>
        <div className="mt-2">
          <input
            id="videos"
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
          <label
            htmlFor="videos"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <Video className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">একাধিক ভিডিও নির্বাচন করুন</span>
          </label>
        </div>

        {/* Video Player with Navigation */}
        {uploadedVideos.length > 0 && (
          <div className="mt-3">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                src={URL.createObjectURL(uploadedVideos[currentVideoIndex])}
                className="w-full h-48 object-cover"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video Navigation */}
              {uploadedVideos.length > 1 && (
                <>
                  <button
                    onClick={prevVideo}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextVideo}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Video Counter */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {currentVideoIndex + 1}/{uploadedVideos.length}
              </div>

              {/* Remove Video Button */}
              <button
                onClick={() => removeVideo(currentVideoIndex)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>পোস্ট করুন</DialogTitle>
          <DialogDescription>
            আপনি যে ধরনের বিজ্ঞাপন বা কন্টেন্ট পোস্ট করতে চান, তা বেছে নিন
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="rental" className="flex flex-col items-center gap-1 py-2">
              <Building className="h-5 w-5" />
              <span className="text-xs">রেন্টাল</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex flex-col items-center gap-1 py-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs">প্রোডাক্ট</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex flex-col items-center gap-1 py-2">
              <Search className="h-5 w-5" />
              <span className="text-xs">সার্ভিস</span>
            </TabsTrigger>
            <TabsTrigger value="digital" className="flex flex-col items-center gap-1 py-2">
              <Rocket className="h-5 w-5" />
              <span className="text-xs">ডিজিটাল</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rental">
            <div className="p-4 space-y-4">
              <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
              <h3 className="font-medium mb-2">রেন্টাল পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার প্রোপার্টি (বাসা, দোকান, অফিস, গাড়ি ইত্যাদি) ভাড়া দিতে পোস্ট করুন
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">শিরোনাম</Label>
                  <Input id="title" placeholder="আপনার প্রোপার্টির শিরোনাম লিখুন" />
                </div>
                <div>
                  <Label htmlFor="description">বিবরণ</Label>
                  <Textarea id="description" placeholder="প্রোপার্টির বিস্তারিত বিবরণ লিখুন" />
                </div>
                <div>
                  <Label htmlFor="price">মূল্য</Label>
                  <Input id="price" placeholder="৳ মাসিক ভাড়া" />
                </div>
              </div>

              <MediaUploadSection />
              
              <Button className="w-full" disabled={!selectedCategory}>রেন্টাল পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="marketplace">
            <div className="p-4 space-y-4">
              <h3 className="font-medium mb-2">প্রোডাক্ট পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার প্রোডাক্ট বিক্রি করতে পোস্ট করুন
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="product-title">প্রোডাক্টের নাম</Label>
                  <Input id="product-title" placeholder="প্রোডাক্টের নাম লিখুন" />
                </div>
                <div>
                  <Label htmlFor="product-description">বিবরণ</Label>
                  <Textarea id="product-description" placeholder="প্রোডাক্টের বিস্তারিত বিবরণ লিখুন" />
                </div>
                <div>
                  <Label htmlFor="product-price">মূল্য</Label>
                  <Input id="product-price" placeholder="৳ বিক্রয় মূল্য" />
                </div>
              </div>

              <MediaUploadSection />
              
              <Button className="w-full">প্রোডাক্ট পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="service">
            <div className="p-4 space-y-4">
              <h3 className="font-medium mb-2">সার্ভিস পোস্ট</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার সেবা বা পরামর্শ প্রদান করার বিজ্ঞাপন পোস্ট করুন
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="service-title">সার্ভিসের নাম</Label>
                  <Input id="service-title" placeholder="সার্ভিসের নাম লিখুন" />
                </div>
                <div>
                  <Label htmlFor="service-description">বিবরণ</Label>
                  <Textarea id="service-description" placeholder="সার্ভিসের বিস্তারিত বিবরণ লিখুন" />
                </div>
                <div>
                  <Label htmlFor="service-price">মূল্য</Label>
                  <Input id="service-price" placeholder="৳ সার্ভিস ফি" />
                </div>
              </div>

              <MediaUploadSection />
              
              <Button className="w-full">সার্ভিস পোস্ট করুন</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="digital">
            <div className="p-4">
              <PostDigitalProduct />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreationDialog;
