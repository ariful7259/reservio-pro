
import React, { useState } from 'react';
import { Plus, Settings, ChevronRight, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';

interface Category {
  id: string;
  name: string;
  count: number;
  subCategories: Category[];
}

const ProductCategoryHierarchy: React.FC = () => {
  const { language } = useApp();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['electronics', 'fashion']);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Example category data with hierarchy
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'electronics',
      name: language === 'bn' ? 'ইলেকট্রনিকস' : 'Electronics',
      count: 120,
      subCategories: [
        {
          id: 'electronics-mobile',
          name: language === 'bn' ? 'মোবাইল' : 'Mobile',
          count: 45,
          subCategories: [
            {
              id: 'electronics-mobile-smartphone',
              name: language === 'bn' ? 'স্মার্টফোন' : 'Smartphone',
              count: 32,
              subCategories: []
            },
            {
              id: 'electronics-mobile-feature',
              name: language === 'bn' ? 'ফিচার ফোন' : 'Feature Phone',
              count: 13,
              subCategories: []
            }
          ]
        },
        {
          id: 'electronics-computer',
          name: language === 'bn' ? 'কম্পিউটার' : 'Computer',
          count: 75,
          subCategories: [
            {
              id: 'electronics-computer-laptop',
              name: language === 'bn' ? 'ল্যাপটপ' : 'Laptop',
              count: 42,
              subCategories: []
            },
            {
              id: 'electronics-computer-desktop',
              name: language === 'bn' ? 'ডেস্কটপ' : 'Desktop',
              count: 33,
              subCategories: []
            }
          ]
        }
      ]
    },
    {
      id: 'fashion',
      name: language === 'bn' ? 'ফ্যাশন' : 'Fashion',
      count: 85,
      subCategories: [
        {
          id: 'fashion-men',
          name: language === 'bn' ? 'পুরুষ' : 'Men',
          count: 45,
          subCategories: []
        },
        {
          id: 'fashion-women',
          name: language === 'bn' ? 'মহিলা' : 'Women',
          count: 40,
          subCategories: []
        }
      ]
    }
  ]);
  
  const toggleCategory = (id: string) => {
    if (expandedCategories.includes(id)) {
      setExpandedCategories(expandedCategories.filter(catId => catId !== id));
    } else {
      setExpandedCategories([...expandedCategories, id]);
    }
  };
  
  const openAddCategoryDialog = (parentId: string | null) => {
    setParentCategoryId(parentId);
    setNewCategoryName('');
    setShowAddDialog(true);
  };
  
  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      count: 0,
      subCategories: []
    };
    
    if (!parentCategoryId) {
      // Add as a top-level category
      setCategories([...categories, newCategory]);
    } else {
      // Add as a subcategory
      const addSubcategory = (cats: Category[]): Category[] => {
        return cats.map(cat => {
          if (cat.id === parentCategoryId) {
            return {
              ...cat,
              subCategories: [...cat.subCategories, newCategory]
            };
          }
          
          if (cat.subCategories.length > 0) {
            return {
              ...cat,
              subCategories: addSubcategory(cat.subCategories)
            };
          }
          
          return cat;
        });
      };
      
      setCategories(addSubcategory(categories));
      // Auto-expand the parent
      if (!expandedCategories.includes(parentCategoryId)) {
        setExpandedCategories([...expandedCategories, parentCategoryId]);
      }
    }
    
    setShowAddDialog(false);
  };
  
  const getParentCategoryName = (): string => {
    if (!parentCategoryId) return '';
    
    const findCategory = (cats: Category[]): string | null => {
      for (const cat of cats) {
        if (cat.id === parentCategoryId) {
          return cat.name;
        }
        
        if (cat.subCategories.length > 0) {
          const result = findCategory(cat.subCategories);
          if (result) return result;
        }
      }
      
      return null;
    };
    
    return findCategory(categories) || '';
  };
  
  const renderCategories = (categoryList: Category[], depth: number = 0) => {
    return (
      <ul className={`space-y-0.5 ${depth > 0 ? 'ml-4 mt-0.5 border-l pl-2' : ''}`}>
        {categoryList.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          const hasSubCategories = category.subCategories.length > 0;
          
          return (
            <li key={category.id}>
              <div className="flex items-center justify-between group py-1">
                <div className="flex items-center">
                  {hasSubCategories && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleCategory(category.id)}
                    >
                      {isExpanded ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  )}
                  
                  {!hasSubCategories && <div className="w-6" />}
                  
                  <span className="font-medium text-sm">
                    {category.name}
                  </span>
                  
                  <Badge variant="outline" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => openAddCategoryDialog(category.id)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {hasSubCategories && isExpanded && renderCategories(category.subCategories, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {language === 'bn' ? 'প্রোডাক্ট ক্যাটাগরি' : 'Product Categories'}
        </CardTitle>
        <Button size="sm" onClick={() => openAddCategoryDialog(null)}>
          <Plus className="h-4 w-4 mr-1" />
          {language === 'bn' ? 'নতুন' : 'New'}
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="mb-2 text-sm text-muted-foreground">
          {language === 'bn' 
            ? 'পণ্য ক্যাটাগরি সংগঠিত করুন এবং আপনার গ্রাহকদের পণ্য খুঁজে পেতে সাহায্য করুন।'
            : 'Organize product categories and help your customers find products.'
          }
        </div>
        
        <Separator className="my-4" />
        
        {renderCategories(categories)}
        
        {categories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {language === 'bn' ? 'কোন ক্যাটাগরি নেই' : 'No categories yet'}
          </div>
        )}
      </CardContent>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'bn' ? 'নতুন ক্যাটাগরি' : 'Add New Category'}
            </DialogTitle>
            <DialogDescription>
              {parentCategoryId ? (
                language === 'bn' 
                  ? `"${getParentCategoryName()}" এর অধীনে নতুন সাবক্যাটাগরি যোগ করুন।` 
                  : `Add a new subcategory under "${getParentCategoryName()}".`
              ) : (
                language === 'bn'
                  ? 'একটি নতুন মূল ক্যাটাগরি যোগ করুন।'
                  : 'Add a new top-level category.'
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder={language === 'bn' ? 'ক্যাটাগরি নাম' : 'Category name'}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={addCategory} disabled={!newCategoryName.trim()}>
              {language === 'bn' ? 'যোগ করুন' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductCategoryHierarchy;
