
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Folder, 
  FolderPlus, 
  FolderX, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Tag, 
  Search, 
  SlidersHorizontal,
  Check,
  X,
  ArrowUpDown,
  MoveDown,
  MoveUp,
  Eye,
  FilterX,
  Palette
} from 'lucide-react';

// ক্যাটাগরি টাইপ ডিফাইন
interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  featured: boolean;
  productsCount: number;
  parent?: string;
  children?: Category[];
  attributes?: CategoryAttribute[];
}

interface CategoryAttribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'color';
  isRequired: boolean;
  options?: string[];
}

// স্যাম্পল ক্যাটাগরি ডেটা
const initialCategories: Category[] = [
  {
    id: 'c1',
    name: 'ইলেকট্রনিক্স',
    slug: 'electronics',
    icon: 'Smartphone',
    description: 'সমস্ত ইলেকট্রনিক্স প্রোডাক্ট',
    isActive: true,
    featured: true,
    productsCount: 245,
    children: [
      {
        id: 'c1-1',
        name: 'মোবাইল ফোন',
        slug: 'mobile-phones',
        icon: 'Smartphone',
        description: 'সমস্ত মোবাইল ফোন',
        isActive: true,
        featured: true,
        productsCount: 120,
        parent: 'c1',
        attributes: [
          {
            id: 'attr1',
            name: 'র‍্যাম',
            type: 'select',
            isRequired: true,
            options: ['2GB', '4GB', '6GB', '8GB', '12GB']
          },
          {
            id: 'attr2',
            name: 'স্টোরেজ',
            type: 'select',
            isRequired: true,
            options: ['32GB', '64GB', '128GB', '256GB', '512GB']
          },
          {
            id: 'attr3',
            name: 'কালার',
            type: 'color',
            isRequired: false
          }
        ]
      },
      {
        id: 'c1-2',
        name: 'ল্যাপটপ',
        slug: 'laptops',
        icon: 'Laptop',
        description: 'সমস্ত ল্যাপটপ ও নোটবুক',
        isActive: true,
        featured: true,
        productsCount: 85,
        parent: 'c1'
      },
      {
        id: 'c1-3',
        name: 'ক্যামেরা',
        slug: 'cameras',
        icon: 'Camera',
        description: 'সমস্ত ক্যামেরা এবং ফটোগ্রাফি গিয়ার',
        isActive: true,
        featured: false,
        productsCount: 40,
        parent: 'c1'
      }
    ]
  },
  {
    id: 'c2',
    name: 'ফ্যাশন',
    slug: 'fashion',
    icon: 'Shirt',
    description: 'সমস্ত ফ্যাশন আইটেম',
    isActive: true,
    featured: true,
    productsCount: 350,
    children: [
      {
        id: 'c2-1',
        name: 'পুরুষদের পোশাক',
        slug: 'mens-clothing',
        icon: 'Shirt',
        description: 'পুরুষদের পোশাক',
        isActive: true,
        featured: true,
        productsCount: 150,
        parent: 'c2'
      },
      {
        id: 'c2-2',
        name: 'মহিলাদের পোশাক',
        slug: 'womens-clothing',
        icon: 'Shirt',
        description: 'মহিলাদের পোশাক',
        isActive: true,
        featured: true,
        productsCount: 180,
        parent: 'c2'
      }
    ]
  },
  {
    id: 'c3',
    name: 'গৃহস্থালী',
    slug: 'home-appliances',
    icon: 'Home',
    description: 'সমস্ত গৃহস্থালী সামগ্রী',
    isActive: true,
    featured: false,
    productsCount: 120
  }
];

const CategoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['c1']);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    isActive: true,
    featured: false,
    parent: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editAttributesOpen, setEditAttributesOpen] = useState(false);
  
  // ক্যাটাগরিতে টগল করুন
  const toggleExpand = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };
  
  // নতুন ক্যাটাগরি তৈরি করা
  const createCategory = () => {
    const newId = `c${Date.now()}`;
    const newCat: Category = {
      id: newId,
      name: newCategory.name || '',
      slug: newCategory.slug || newCategory.name?.toLowerCase().replace(/\s+/g, '-') || '',
      icon: newCategory.icon || 'Tag',
      description: newCategory.description || '',
      isActive: newCategory.isActive || true,
      featured: newCategory.featured || false,
      productsCount: 0,
      parent: newCategory.parent || undefined
    };
    
    let updatedCategories = [...categories];
    
    if (newCategory.parent) {
      updatedCategories = updatedCategories.map(cat => {
        if (cat.id === newCategory.parent) {
          return {
            ...cat,
            children: [...(cat.children || []), newCat]
          };
        } else if (cat.children) {
          return {
            ...cat,
            children: cat.children.map(child => {
              if (child.id === newCategory.parent) {
                return {
                  ...child,
                  children: [...(child.children || []), newCat]
                };
              }
              return child;
            })
          };
        }
        return cat;
      });
    } else {
      updatedCategories.push(newCat);
    }
    
    setCategories(updatedCategories);
    setNewCategoryOpen(false);
    setNewCategory({
      name: '',
      slug: '',
      description: '',
      isActive: true,
      featured: false,
      parent: ''
    });
    
    toast({
      title: "ক্যাটাগরি যোগ করা হয়েছে",
      description: `"${newCat.name}" ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।`,
    });
  };
  
  // ক্যাটাগরি ডিলিট করুন
  const deleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(cat => {
      if (cat.id === categoryId) return false;
      if (cat.children) {
        cat.children = cat.children.filter(child => child.id !== categoryId);
      }
      return true;
    });
    
    setCategories(updatedCategories);
    
    toast({
      title: "ক্যাটাগরি মুছে ফেলা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।",
    });
  };
  
  // বাল্ক অপারেশন
  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete' | 'feature') => {
    if (selectedIds.length === 0) {
      toast({
        title: "কোন ক্যাটাগরি নির্বাচন করা হয়নি",
        description: "অনুগ্রহ করে প্রথমে কয়েকটি ক্যাটাগরি নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }
    
    let updatedCategories = [...categories];
    let message = "";
    
    switch (action) {
      case 'activate':
        // ক্যাটাগরি অ্যাকটিভেট করুন
        updatedCategories = updateCategoryProperty(updatedCategories, 'isActive', true);
        message = "নির্বাচিত ক্যাটাগরিগুলি সফলভাবে অ্যাকটিভেট করা হয়েছে।";
        break;
      case 'deactivate':
        // ক্যাটাগরি ডিঅ্যাকটিভেট করুন
        updatedCategories = updateCategoryProperty(updatedCategories, 'isActive', false);
        message = "নির্বাচিত ক্যাটাগরিগুলি সফলভাবে ডিঅ্যাকটিভেট করা হয়েছে।";
        break;
      case 'feature':
        // ক্যাটাগরি ফিচার করুন
        updatedCategories = updateCategoryProperty(updatedCategories, 'featured', true);
        message = "নির্বাচিত ক্যাটাগরিগুলি সফলভাবে ফিচার্ড করা হয়েছে।";
        break;
      case 'delete':
        // ক্যাটাগরি ডিলিট করুন
        updatedCategories = categories.filter(cat => !selectedIds.includes(cat.id))
          .map(cat => {
            if (cat.children) {
              return {
                ...cat,
                children: cat.children.filter(child => !selectedIds.includes(child.id))
              };
            }
            return cat;
          });
        message = "নির্বাচিত ক্যাটাগরিগুলি সফলভাবে মুছে ফেলা হয়েছে।";
        break;
    }
    
    setCategories(updatedCategories);
    setSelectedIds([]);
    
    toast({
      title: "বাল্ক অ্যাকশন সম্পন্ন হয়েছে",
      description: message,
    });
  };
  
  // ক্যাটাগরির বৈশিষ্ট্য আপডেট করুন
  const updateCategoryProperty = (cats: Category[], property: keyof Category, value: any): Category[] => {
    return cats.map(cat => {
      if (selectedIds.includes(cat.id)) {
        return { ...cat, [property]: value };
      }
      
      if (cat.children) {
        return {
          ...cat,
          children: updateCategoryProperty(cat.children, property, value)
        };
      }
      
      return cat;
    });
  };
  
  // চেকবক্স টগল করুন
  const toggleCategorySelection = (categoryId: string) => {
    if (selectedIds.includes(categoryId)) {
      setSelectedIds(selectedIds.filter(id => id !== categoryId));
    } else {
      setSelectedIds([...selectedIds, categoryId]);
    }
  };
  
  // ক্যাটাগরি লিস্টের রেন্ডারিং
  const renderCategoryTree = (categoryList: Category[], level = 0) => {
    return categoryList
      .filter(cat => {
        if (searchTerm) {
          return cat.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (activeTab === 'featured') return cat.featured;
        if (activeTab === 'active') return cat.isActive;
        if (activeTab === 'inactive') return !cat.isActive;
        return true;
      })
      .map(category => (
        <React.Fragment key={category.id}>
          <div 
            className={`flex items-center p-2 hover:bg-slate-50 rounded-md ${selectedCategory?.id === category.id ? 'bg-slate-100' : ''}`}
            style={{ paddingLeft: `${level * 24 + 8}px` }}
          >
            {bulkMode && (
              <Checkbox 
                checked={selectedIds.includes(category.id)}
                onCheckedChange={() => toggleCategorySelection(category.id)}
                className="mr-2"
              />
            )}
            
            {category.children && category.children.length > 0 ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleExpand(category.id)}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-6"></div>
            )}
            
            <div 
              className="flex flex-1 items-center cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <Folder className="h-4 w-4 mr-2 text-amber-500" />
              <span className="flex-1">{category.name}</span>
              
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 text-xs">
                  {category.productsCount}
                </Badge>
                
                {category.featured && (
                  <Badge className="mr-2 bg-amber-500 hover:bg-amber-600">ফিচার্ড</Badge>
                )}
                
                {!category.isActive && (
                  <Badge variant="outline" className="text-muted-foreground">নিষ্ক্রিয়</Badge>
                )}
              </div>
            </div>
            
            {!bulkMode && (
              <div className="flex">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive"
                  onClick={() => deleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {expandedCategories.includes(category.id) && category.children && (
            <div>{renderCategoryTree(category.children, level + 1)}</div>
          )}
        </React.Fragment>
      ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ক্যাটাগরি ম্যানেজমেন্ট</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setBulkMode(!bulkMode)}
            className={bulkMode ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {bulkMode ? 'বাল্ক মোড বন্ধ করুন' : 'বাল্ক মোড'}
          </Button>
          
          <Dialog open={newCategoryOpen} onOpenChange={setNewCategoryOpen}>
            <DialogTrigger asChild>
              <Button>
                <FolderPlus className="h-4 w-4 mr-2" />
                নতুন ক্যাটাগরি
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>নতুন ক্যাটাগরি যোগ করুন</DialogTitle>
                <DialogDescription>
                  নতুন ক্যাটাগরির বিবরণ দিন। সমস্ত তথ্য সাবমিট করার পর সেভ বাটনে ক্লিক করুন।
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    নাম
                  </Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">
                    স্লাগ
                  </Label>
                  <Input
                    id="slug"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                    placeholder={newCategory.name?.toLowerCase().replace(/\s+/g, '-')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parent" className="text-right">
                    প্যারেন্ট
                  </Label>
                  <Select 
                    value={newCategory.parent} 
                    onValueChange={(value) => setNewCategory({...newCategory, parent: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="প্যারেন্ট ক্যাটাগরি (অপশনাল)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">কোন প্যারেন্ট নেই</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    বিবরণ
                  </Label>
                  <Textarea
                    id="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    অ্যাকটিভ
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="active"
                      checked={newCategory.isActive}
                      onCheckedChange={(checked) => setNewCategory({...newCategory, isActive: checked})}
                    />
                    <Label htmlFor="active">এই ক্যাটাগরি অ্যাকটিভ রাখুন</Label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="featured" className="text-right">
                    ফিচার্ড
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="featured"
                      checked={newCategory.featured}
                      onCheckedChange={(checked) => setNewCategory({...newCategory, featured: checked})}
                    />
                    <Label htmlFor="featured">এই ক্যাটাগরি ফিচার্ড হিসেবে দেখান</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={createCategory}>ক্যাটাগরি তৈরি করুন</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-md flex items-center justify-between">
              <span>ক্যাটাগরি লিস্ট</span>
              
              {selectedIds.length > 0 && (
                <Badge variant="outline">{selectedIds.length} নির্বাচিত</Badge>
              )}
            </CardTitle>
            
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ক্যাটাগরি খুঁজুন"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {bulkMode && selectedIds.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedIds([])}
                >
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="all" className="pt-2" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">সব</TabsTrigger>
                <TabsTrigger value="featured">ফিচার্ড</TabsTrigger>
                <TabsTrigger value="active">অ্যাকটিভ</TabsTrigger>
                <TabsTrigger value="inactive">নিষ্ক্রিয়</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {renderCategoryTree(categories)}
            </div>
            
            {bulkMode && selectedIds.length > 0 && (
              <div className="border-t pt-4 mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600"
                  onClick={() => handleBulkAction('activate')}
                >
                  <Check className="h-4 w-4 mr-1" /> অ্যাকটিভেট
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-600"
                  onClick={() => handleBulkAction('deactivate')}
                >
                  <X className="h-4 w-4 mr-1" /> ডিঅ্যাকটিভেট
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => handleBulkAction('feature')}
                >
                  <Tag className="h-4 w-4 mr-1" /> ফিচার করুন
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => handleBulkAction('delete')}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> ডিলিট
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          {selectedCategory ? (
            <>
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-center">
                  <span>{selectedCategory.name}</span>
                  <div className="flex gap-2">
                    <Dialog open={editAttributesOpen} onOpenChange={setEditAttributesOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Tag className="h-4 w-4 mr-2" />
                          অ্যাট্রিবিউট ম্যানেজ
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>ক্যাটাগরি অ্যাট্রিবিউট ম্যানেজমেন্ট</DialogTitle>
                          <DialogDescription>
                            {selectedCategory.name} ক্যাটাগরির জন্য অ্যাট্রিবিউট ম্যানেজ করুন।
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">অ্যাট্রিবিউট লিস্ট</h3>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              নতুন অ্যাট্রিবিউট
                            </Button>
                          </div>
                          
                          {selectedCategory.attributes && selectedCategory.attributes.length > 0 ? (
                            <div className="space-y-4">
                              {selectedCategory.attributes.map(attr => (
                                <div key={attr.id} className="flex justify-between items-center p-3 border rounded-md">
                                  <div>
                                    <p className="font-medium">{attr.name}</p>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <span className="capitalize">{attr.type}</span>
                                      {attr.isRequired && (
                                        <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                                      )}
                                    </div>
                                    {attr.options && attr.options.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {attr.options.map((option, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">{option}</Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 border rounded-md bg-slate-50">
                              <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-muted-foreground">এই ক্যাটাগরির জন্য কোন অ্যাট্রিবিউট নেই</p>
                              <Button className="mt-4" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                অ্যাট্রিবিউট যোগ করুন
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      প্রিভিউ দেখুন
                    </Button>
                    <Button variant="default" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      এডিট করুন
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">ক্যাটাগরি আইডি</h3>
                      <p>{selectedCategory.id}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">স্লাগ</h3>
                      <p>{selectedCategory.slug}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">প্যারেন্ট ক্যাটাগরি</h3>
                      <p>{selectedCategory.parent ? 
                        categories.find(c => c.id === selectedCategory.parent)?.name || 'Unknown' : 
                        'কোন প্যারেন্ট নেই'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">স্ট্যাটাস</h3>
                      <div className="flex items-center">
                        <Badge 
                          variant={selectedCategory.isActive ? "default" : "secondary"}
                          className={selectedCategory.isActive ? "bg-green-500" : ""}
                        >
                          {selectedCategory.isActive ? 'অ্যাকটিভ' : 'নিষ্ক্রিয়'}
                        </Badge>
                        {selectedCategory.featured && (
                          <Badge className="ml-2 bg-amber-500">ফিচার্ড</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">বিবরণ</h3>
                      <p>{selectedCategory.description || 'কোন বিবরণ নেই'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">প্রোডাক্ট কাউন্ট</h3>
                      <p className="text-lg font-medium">{selectedCategory.productsCount}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">আইকন</h3>
                      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                        <Folder className="h-6 w-6 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-md font-medium mb-3">সাব-ক্যাটাগরি</h3>
                  
                  {selectedCategory.children && selectedCategory.children.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedCategory.children.map(child => (
                        <Card key={child.id} className="overflow-hidden">
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <Folder className="h-5 w-5 text-amber-500 mr-2" />
                              <span>{child.name}</span>
                            </div>
                            <Badge variant="outline">{child.productsCount}</Badge>
                          </div>
                          <div className="bg-slate-50 px-4 py-2 text-xs flex justify-between border-t">
                            <span className={child.isActive ? 'text-green-600' : 'text-muted-foreground'}>
                              {child.isActive ? 'অ্যাকটিভ' : 'নিষ্ক্রিয়'}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      
                      <Card className="border-dashed flex items-center justify-center p-4 cursor-pointer hover:bg-slate-50">
                        <Button variant="ghost" onClick={() => {
                          setNewCategory({...newCategory, parent: selectedCategory.id});
                          setNewCategoryOpen(true);
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          সাব-ক্যাটাগরি যোগ করুন
                        </Button>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-md bg-slate-50">
                      <FolderPlus className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">কোন সাব-ক্যাটাগরি নেই</p>
                      <Button className="mt-4" onClick={() => {
                        setNewCategory({...newCategory, parent: selectedCategory.id});
                        setNewCategoryOpen(true);
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        সাব-ক্যাটাগরি যোগ করুন
                      </Button>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-md font-medium mb-3">অতিরিক্ত সেটিংস</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <MoveUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>অর্ডার পজিশন</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <MoveDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Upload className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>ব্যানার ইমেজ</span>
                      </div>
                      <Button variant="outline" size="sm">আপলোড করুন</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>সর্টিং অপশন</span>
                      </div>
                      <Select defaultValue="manual">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="সর্টিং" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-asc">দাম (কম থেকে বেশি)</SelectItem>
                          <SelectItem value="price-desc">দাম (বেশি থেকে কম)</SelectItem>
                          <SelectItem value="name-asc">নাম (A-Z)</SelectItem>
                          <SelectItem value="name-desc">নাম (Z-A)</SelectItem>
                          <SelectItem value="manual">ম্যানুয়াল সর্টিং</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Palette className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>টেম্পলেট ডিজাইন</span>
                      </div>
                      <Select defaultValue="grid">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="ডিজাইন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">গ্রিড ভিউ</SelectItem>
                          <SelectItem value="list">লিস্ট ভিউ</SelectItem>
                          <SelectItem value="carousel">ক্যারোসেল ভিউ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Folder className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-xl font-medium">ক্যাটাগরি নির্বাচন করুন</h2>
              <p className="text-muted-foreground mt-2 text-center px-4">
                বিস্তারিত তথ্য দেখতে বাম পাশ থেকে একটি ক্যাটাগরি নির্বাচন করুন অথবা একটি নতুন ক্যাটাগরি তৈরি করুন।
              </p>
              <Button className="mt-6" onClick={() => setNewCategoryOpen(true)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                নতুন ক্যাটাগরি তৈরি করুন
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CategoryManagement;

