
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoreData } from './types';
import ProductImageGallery from './ProductImageGallery';
import ProductDragDropList from './ProductDragDropList';
import WishlistButton from './WishlistButton';

interface StoreInfoFormProps {
  storeData: StoreData;
  setStoreData: React.Dispatch<React.SetStateAction<StoreData>>;
}

interface Product {
  id: string;
  name: string;
  images: string[];
}

const StoreInfoForm: React.FC<StoreInfoFormProps> = ({
  storeData,
  setStoreData
}) => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "টেস্ট পণ্য ১", images: [] },
    { id: "2", name: "টেস্ট পণ্য ২", images: [] }
  ]);

  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set());

  const handleGalleryChange = (images: string[], productIdx: number) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === productIdx ? { ...p, images } : p))
    );
  };

  const handleProductReorder = (reorderedProducts: Product[]) => {
    setProducts(reorderedProducts);
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: `${Date.now()}`,
      name: `নতুন পণ্য ${products.length + 1}`,
      images: []
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProductName = (productId: string, newName: string) => {
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, name: newName } : p)
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlistedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="businessName">দোকানের নাম *</Label>
          <Input
            id="businessName"
            placeholder="যেমন: রহিম ফ্যাশন হাউস"
            value={storeData.businessName}
            onChange={(e) => setStoreData(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="ownerName">মালিকের নাম *</Label>
          <Input
            id="ownerName"
            placeholder="আপনার নাম"
            value={storeData.ownerName}
            onChange={(e) => setStoreData(prev => ({ ...prev, ownerName: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">মোবাইল নাম্বর *</Label>
          <Input
            id="phone"
            placeholder="01XXXXXXXXX"
            value={storeData.phone}
            onChange={(e) => setStoreData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={storeData.email}
            onChange={(e) => setStoreData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">দোকানের ঠিকানা *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            placeholder="সম্পূর্ণ ঠিকানা লিখুন"
            className="pl-10"
            value={storeData.address}
            onChange={(e) => setStoreData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">ব্যবসার বিবরণ (ঐচ্ছিক)</Label>
        <Textarea
          id="description"
          placeholder="আপনার ব্যবসা সম্পর্কে কিছু লিখুন..."
          value={storeData.description}
          onChange={(e) => setStoreData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="text-base font-bold">পণ্যের তালিকা</div>
          <Button onClick={addNewProduct} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            নতুন পণ্য যোগ করুন
          </Button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">পণ্যের ক্রম পরিবর্তন করতে drag & drop করুন:</p>
          <ProductDragDropList 
            items={products} 
            onReorder={handleProductReorder}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((product, idx) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Input
                  value={product.name}
                  onChange={(e) => updateProductName(product.id, e.target.value)}
                  className="font-semibold border-0 px-0 focus-visible:ring-0"
                />
                <WishlistButton
                  productId={product.id}
                  productTitle={product.name}
                  productPrice="0"
                  productImage={product.images?.[0]}
                />
              </div>
              <ProductImageGallery 
                images={product.images} 
                onChange={(imgs) => handleGalleryChange(imgs, idx)} 
                editable 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreInfoForm;
