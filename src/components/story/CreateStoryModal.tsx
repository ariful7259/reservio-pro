
import React, { useState } from 'react';
import { Camera, X, FileImage, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storyData: any) => void;
}

const predefinedCategories = [
  'অভিজ্ঞতা', 'টিপস', 'রিভিউ', 'সার্ভিস', 'ইভেন্ট', 'ক্যারিয়ার', 'শিক্ষা', 'ভ্রমণ'
];

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // In a real app, you would upload these to a server or cloud storage
    // For now, we'll just create object URLs for the demo
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newStory = {
      title,
      content,
      categories: selectedCategories,
      images
    };
    
    // Simulate async operation
    setTimeout(() => {
      onSubmit(newStory);
      setIsLoading(false);
      resetForm();
    }, 1000);
  };
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedCategories([]);
    setImages([]);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>নতুন স্টোরি শেয়ার করুন</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="title">স্টোরির শিরোনাম</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="আপনার স্টোরির একটি আকর্ষণীয় শিরোনাম লিখুন" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">স্টোরি বিবরণ</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..." 
              rows={5} 
              required
            />
          </div>
          
          <div>
            <Label>ক্যাটাগরি (সর্বোচ্চ ৩টি)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedCategories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSelectCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label>ছবি যোগ করুন (ঐচ্ছিক)</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <Label 
                htmlFor="image-upload" 
                className="flex flex-col items-center cursor-pointer"
              >
                <FileImage className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</span>
              </Label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Uploaded ${index}`} 
                      className="h-20 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              বাতিল
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'পোস্ট হচ্ছে...' : 'পোস্ট করুন'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStoryModal;
