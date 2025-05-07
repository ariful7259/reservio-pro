
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileUp, 
  Plus, 
  Trash2, 
  Upload, 
  DollarSign, 
  Tag, 
  BookOpen, 
  FileText, 
  Code, 
  Headphones, 
  Video as VideoIcon 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface DigitalProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  coverImage: File | null;
  productFiles: File[];
  previewContent: File | null;
}

const initialFormData: DigitalProductFormData = {
  title: '',
  description: '',
  price: '',
  category: '',
  tags: [],
  coverImage: null,
  productFiles: [],
  previewContent: null
};

const CreateDigitalProductForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<DigitalProductFormData>(initialFormData);
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);

  const productCategories = [
    { value: 'course', label: 'কোর্স', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'ebook', label: 'ইবুক', icon: <FileText className="h-4 w-4" /> },
    { value: 'template', label: 'টেম্পলেট', icon: <FileText className="h-4 w-4" /> },
    { value: 'software', label: 'সফটওয়্যার', icon: <Code className="h-4 w-4" /> },
    { value: 'audio', label: 'অডিও', icon: <Headphones className="h-4 w-4" /> },
    { value: 'video', label: 'ভিডিও', icon: <VideoIcon className="h-4 w-4" /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ 
        ...formData, 
        productFiles: [...formData.productFiles, ...Array.from(e.target.files)] 
      });
    }
  };

  const handlePreviewContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, previewContent: e.target.files[0] });
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formData.productFiles];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, productFiles: updatedFiles });
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ 
        ...formData, 
        tags: [...formData.tags, currentTag.trim()] 
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.coverImage) {
      toast({
        title: "ফর্ম সম্পূর্ণ করুন",
        description: "সব প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, here you would upload the files and form data to your backend
      // using FormData or another appropriate format
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "সফলভাবে সম্পন্ন হয়েছে",
        description: "আপনার ডিজিটাল প্রোডাক্ট আপলোড করা হয়েছে এবং রিভিউ প্রসেসে আছে।"
      });
      
      navigate('/digital-products');
    } catch (error) {
      toast({
        title: "একটি ত্রুটি হয়েছে",
        description: "প্রোডাক্ট আপলোড করতে সমস্যা। দয়া করে আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">প্রোডাক্টের নাম</Label>
          <Input 
            id="title" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="আকর্ষণীয় ও বর্ণনামূলক শিরোনাম দিন" 
            required
          />
        </div>

        <div>
          <Label htmlFor="category">প্রোডাক্টের ধরন</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="প্রোডাক্টের ধরন বাছাই করুন" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">বিবরণ</Label>
          <Textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="আপনার প্রোডাক্ট সম্পর্কে বিস্তারিত লিখুন" 
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">মূল্য (টাকা)</Label>
          <div className="relative">
            <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              id="price" 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              type="number"
              className="pl-10" 
              placeholder="500" 
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags">ট্যাগসমূহ</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                id="tags" 
                className="pl-10" 
                placeholder="ট্যাগ লিখুন এবং + বাটনে ক্লিক করুন" 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
            </div>
            <Button type="button" variant="secondary" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <Trash2 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)} 
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="cover-image" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="cover-image">কভার ইমেজ</TabsTrigger>
          <TabsTrigger value="product-files">প্রোডাক্ট ফাইল</TabsTrigger>
          <TabsTrigger value="preview">প্রিভিউ কন্টেন্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="cover-image">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-12">
                {formData.coverImage ? (
                  <div className="text-center">
                    <img 
                      src={URL.createObjectURL(formData.coverImage)} 
                      alt="Cover preview" 
                      className="h-40 object-contain mx-auto mb-4"
                    />
                    <p className="text-sm text-muted-foreground mb-4">{formData.coverImage.name}</p>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, coverImage: null })}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      বাদ দিন
                    </Button>
                  </div>
                ) : (
                  <>
                    <FileUp className="h-10 w-10 mb-3 text-gray-400" />
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">কভার ইমেজ আপলোড করুন</p>
                      <p className="text-xs text-muted-foreground">আকর্ষণীয় কভার ইমেজ আপনার প্রোডাক্টের বিক্রি বাড়াতে সাহায্য করবে</p>
                      <Button type="button" variant="secondary" size="sm" asChild>
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          ইমেজ বাছাই করুন
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleCoverImageChange}
                            className="hidden" 
                          />
                        </label>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product-files">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6">
                <FileUp className="h-10 w-10 mb-3 text-gray-400" />
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">প্রোডাক্ট ফাইল আপলোড করুন</p>
                  <p className="text-xs text-muted-foreground">PDF, ZIP, MP3, MP4, এবং অন্যান্য ফাইল আপলোড করুন</p>
                  <Button type="button" variant="secondary" size="sm" asChild>
                    <label className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      ফাইল বাছাই করুন
                      <input 
                        type="file" 
                        multiple
                        onChange={handleProductFileChange}
                        className="hidden" 
                      />
                    </label>
                  </Button>
                </div>
              </div>

              {formData.productFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">আপলোডকৃত ফাইলসমূহ</p>
                  {formData.productFiles.map((file, index) => (
                    <div 
                      key={`${file.name}-${index}`} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(file.size / 1024)} KB
                        </Badge>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-12">
                {formData.previewContent ? (
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium mb-1">{formData.previewContent.name}</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {Math.round(formData.previewContent.size / 1024)} KB
                    </p>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, previewContent: null })}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      বাদ দিন
                    </Button>
                  </div>
                ) : (
                  <>
                    <FileUp className="h-10 w-10 mb-3 text-gray-400" />
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">প্রিভিউ কন্টেন্ট আপলোড করুন</p>
                      <p className="text-xs text-muted-foreground">যেকোনো ফাইল আপলোড করুন যা আপনার প্রোডাক্টের একটি সংক্ষিপ্ত ধারণা দেয়</p>
                      <Button type="button" variant="secondary" size="sm" asChild>
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          ফাইল বাছাই করুন
                          <input 
                            type="file" 
                            onChange={handlePreviewContentChange}
                            className="hidden" 
                          />
                        </label>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate('/digital-products')}
        >
          বাতিল
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="min-w-[120px]"
        >
          {loading ? 'প্রক্রিয়াধীন...' : 'পোস্ট করুন'}
        </Button>
      </div>
    </form>
  );
};

export default CreateDigitalProductForm;
