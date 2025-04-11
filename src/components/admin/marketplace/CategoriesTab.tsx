
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock categories
const categories = [
  { id: 1, name: 'ইলেকট্রনিক্স', subcategories: 25, products: 450 },
  { id: 2, name: 'ফ্যাশন', subcategories: 18, products: 380 },
  { id: 3, name: 'হোম অ্যাপ্লায়েন্স', subcategories: 12, products: 245 },
  { id: 4, name: 'শিশুদের', subcategories: 8, products: 120 },
  { id: 5, name: 'স্পোর্টস', subcategories: 10, products: 95 },
];

// Mock subcategories
const subcategories = [
  { id: 1, name: 'মোবাইল', category: 'ইলেকট্রনিক্স', products: 120 },
  { id: 2, name: 'ল্যাপটপ', category: 'ইলেকট্রনিক্স', products: 85 },
  { id: 3, name: 'অডিও', category: 'ইলেকট্রনিক্স', products: 65 },
  { id: 4, name: 'পুরুষদের পোশাক', category: 'ফ্যাশন', products: 110 },
  { id: 5, name: 'মহিলাদের পোশাক', category: 'ফ্যাশন', products: 145 },
];

const CategoriesTab = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCategoryAction = (action: string, categoryId: number) => {
    // Handle category actions (edit, delete)
    const category = categories.find(c => c.id === categoryId);
    
    if (action === 'edit') {
      setSelectedCategory(category);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "ক্যাটাগরি মুছে ফেলা হয়েছে",
        description: `${category?.name} ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleSubcategoryAction = (action: string, subcategoryId: number) => {
    // Handle subcategory actions (edit, delete)
    const subcategory = subcategories.find(sc => sc.id === subcategoryId);
    
    if (action === 'edit') {
      setSelectedSubcategory(subcategory);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "সাবক্যাটাগরি মুছে ফেলা হয়েছে",
        description: `${subcategory?.name} সাবক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding category would go here
    toast({
      title: "নতুন ক্যাটাগরি যোগ করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding subcategory would go here
    toast({
      title: "নতুন সাবক্যাটাগরি যোগ করা হয়েছে",
      description: "সাবক্যাটাগরি সফলভাবে যোগ করা হয়েছে।",
    });
  };

  return (
    <Tabs defaultValue="main-categories">
      <TabsList>
        <TabsTrigger value="main-categories">মূল ক্যাটাগরি</TabsTrigger>
        <TabsTrigger value="subcategories">সাবক্যাটাগরি</TabsTrigger>
      </TabsList>
      
      {/* মূল ক্যাটাগরি ট্যাব */}
      <TabsContent value="main-categories">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">ক্যাটাগরি সমূহ</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  নতুন ক্যাটাগরি
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>নতুন ক্যাটাগরি যোগ করুন</DialogTitle>
                  <DialogDescription>
                    ক্যাটাগরির বিবরণ দিন। ক্যাটাগরি নাম অবশ্যই অনন্য হতে হবে।
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCategory}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category-name" className="text-right">
                        ক্যাটাগরি নাম
                      </Label>
                      <Input
                        id="category-name"
                        placeholder="ক্যাটাগরি নাম লিখুন"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category-icon" className="text-right">
                        আইকন
                      </Label>
                      <div className="col-span-3">
                        <Button variant="outline" className="w-full" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          আইকন আপলোড করুন
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="category-desc" className="text-right pt-2">
                        বিবরণ
                      </Label>
                      <Textarea
                        id="category-desc"
                        placeholder="ক্যাটাগরির বিবরণ লিখুন"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        অ্যাকটিভ
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="category-active" defaultChecked />
                        <Label htmlFor="category-active" className="text-sm font-normal">
                          এই ক্যাটাগরি অ্যাকটিভ রাখুন
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        বাতিল
                      </Button>
                    </DialogClose>
                    <Button type="submit">সংরক্ষণ করুন</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ক্যাটাগরি নাম</TableHead>
                    <TableHead>সাবক্যাটাগরি</TableHead>
                    <TableHead>প্রোডাক্ট</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.subcategories}</TableCell>
                      <TableCell>{category.products}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCategoryAction('edit', category.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCategoryAction('delete', category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* সাবক্যাটাগরি ট্যাব */}
      <TabsContent value="subcategories">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">সাবক্যাটাগরি সমূহ</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  নতুন সাবক্যাটাগরি
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>নতুন সাবক্যাটাগরি যোগ করুন</DialogTitle>
                  <DialogDescription>
                    সাবক্যাটাগরির বিবরণ দিন। প্রথমে পেরেন্ট ক্যাটাগরি নির্বাচন করুন।
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSubcategory}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="parent-category" className="text-right">
                        পেরেন্ট ক্যাটাগরি
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="পেরেন্ট ক্যাটাগরি নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategory-name" className="text-right">
                        সাবক্যাটাগরি নাম
                      </Label>
                      <Input
                        id="subcategory-name"
                        placeholder="সাবক্যাটাগরি নাম লিখুন"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategory-icon" className="text-right">
                        আইকন
                      </Label>
                      <div className="col-span-3">
                        <Button variant="outline" className="w-full" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          আইকন আপলোড করুন
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="subcategory-desc" className="text-right pt-2">
                        বিবরণ
                      </Label>
                      <Textarea
                        id="subcategory-desc"
                        placeholder="সাবক্যাটাগরির বিবরণ লিখুন"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        অ্যাকটিভ
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="subcategory-active" defaultChecked />
                        <Label htmlFor="subcategory-active" className="text-sm font-normal">
                          এই সাবক্যাটাগরি অ্যাকটিভ রাখুন
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        বাতিল
                      </Button>
                    </DialogClose>
                    <Button type="submit">সংরক্ষণ করুন</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>সাবক্যাটাগরি নাম</TableHead>
                    <TableHead>পেরেন্ট ক্যাটাগরি</TableHead>
                    <TableHead>প্রোডাক্ট</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subcategories.map((subcategory) => (
                    <TableRow key={subcategory.id}>
                      <TableCell className="font-medium">{subcategory.name}</TableCell>
                      <TableCell>{subcategory.category}</TableCell>
                      <TableCell>{subcategory.products}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSubcategoryAction('edit', subcategory.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSubcategoryAction('delete', subcategory.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CategoriesTab;
