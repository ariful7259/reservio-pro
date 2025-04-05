
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Star,
  Tag,
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ServiceCard from '@/components/ServiceCard';
import { productCategories, productAttributes } from '@/utils/categoryData';
import CategoryCard from '@/components/categories/CategoryCard';
import SubCategoryList from '@/components/categories/SubCategoryList';
import ProductFilterSidebar from '@/components/product/ProductFilterSidebar';
import { useCart, CartProduct } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

const Shopping = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000] as [number, number],
    attributes: {},
    rating: null as number | null
  });

  // Mock products data
  const products = [
    {
      id: '1',
      title: language === 'bn' ? 'স্মার্টফোন রেডমি নোট ১০' : 'Smartphone Redmi Note 10',
      description: language === 'bn' ? 'অ্যান্ড্রয়েড স্মার্টফোন, ৮জিবি র‍্যাম, ১২৮জিবি স্টোরেজ' : 'Android smartphone, 8GB RAM, 128GB Storage',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      rating: 4.5,
      price: 22999,
      discount: 15,
      tags: ['smartphone', 'electronics', 'xiaomi'],
      attributes: {
        brand: 'Xiaomi',
        color: 'Blue',
        storage: '128GB'
      }
    },
    {
      id: '2',
      title: language === 'bn' ? 'মেনস কটন টি-শার্ট' : "Men's Cotton T-Shirt",
      description: language === 'bn' ? '১০০% কটন, আরামদায়ক ফিট, সকল মওসুমের জন্য উপযুক্ত' : '100% cotton, comfortable fit, suitable for all seasons',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      rating: 4.2,
      price: 799,
      discount: 20,
      tags: ['clothing', 'tshirt', 'men'],
      attributes: {
        size: 'M',
        color: 'Black',
        material: 'Cotton'
      }
    },
    {
      id: '3',
      title: language === 'bn' ? 'ওয়াইফাই রাউটার' : 'WiFi Router',
      description: language === 'bn' ? 'ডুয়াল ব্যান্ড, হাই স্পিড, বড় কভারেজ এরিয়া' : 'Dual band, high speed, large coverage area',
      image: 'https://images.unsplash.com/photo-1544896478-d5b709d413c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      rating: 4.3,
      price: 3499,
      discount: 10,
      tags: ['networking', 'electronics', 'router'],
      attributes: {
        brand: 'TP-Link',
        color: 'White'
      }
    },
    {
      id: '4',
      title: language === 'bn' ? 'লেদার ওয়ালেট' : 'Leather Wallet',
      description: language === 'bn' ? 'আসল চামড়া, অনেক পকেট, দীর্ঘস্থায়ী' : 'Genuine leather, multiple pockets, durable',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      rating: 4.7,
      price: 1299,
      discount: 5,
      tags: ['accessories', 'wallet', 'leather'],
      attributes: {
        color: 'Brown',
        material: 'Leather'
      }
    },
  ];

  const handleCategoryClick = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
      navigate(`/shopping/category/${id}`);
    }
  };

  const handleProductClick = (id: string) => {
    navigate(`/shopping/product/${id}`);
  };

  const handleAddToCart = (product: any) => {
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      discount: product.discount,
      quantity: 1,
      image: product.image,
      attributes: product.attributes
    };
    
    addToCart(cartProduct);
    
    toast({
      title: language === 'bn' ? 'কার্টে যোগ করা হয়েছে' : 'Added to cart',
      description: product.title
    });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would filter the products based on these filters
    console.log('Filters applied:', newFilters);
  };

  const displayedCategories = showMoreCategories 
    ? productCategories 
    : productCategories.slice(0, 4);
    
  const selectedCategoryData = selectedCategory 
    ? productCategories.find(cat => cat.id === selectedCategory) 
    : null;

  // Get attributes for the selected category
  const categoryAttributes = selectedCategory 
    ? productAttributes[selectedCategory] || [] 
    : [];

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with title and cart button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? 'শপিং' : 'Shopping'}
        </h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{language === 'bn' ? 'কার্ট' : 'Cart'}</span>
          </Button>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')} className="w-[160px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> {language === 'bn' ? 'গ্রিড' : 'Grid'}
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="h-4 w-4" /> {language === 'bn' ? 'লিস্ট' : 'List'}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={language === 'bn' ? 'পণ্য খুঁজুন' : 'Search products'} className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1"
          >
            {language === 'bn' ? 'খুঁজুন' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">
          {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {displayedCategories.slice(0, 4).map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.nameEN}
              nameBN={category.nameBN}
              icon={category.icon}
              count={category.count}
              slug={category.slug}
              type="product"
              subCategories={category.subCategories}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {showMoreCategories && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {productCategories.slice(4).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.nameEN}
                nameBN={category.nameBN}
                icon={category.icon}
                count={category.count}
                slug={category.slug}
                type="product"
                subCategories={category.subCategories}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        )}

        {productCategories.length > 4 && (
          <div className="w-full flex justify-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowMoreCategories(!showMoreCategories)}
            >
              {showMoreCategories ? (
                <>
                  <ChevronDown className="h-4 w-4 rotate-180" />
                  {language === 'bn' ? 'কম দেখুন' : 'Show less'}
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  {language === 'bn' ? 'আরও দেখুন' : 'Show more'}
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Show subcategories if a category is selected */}
      {selectedCategoryData && (
        <SubCategoryList
          categoryId={selectedCategoryData.id}
          subCategories={selectedCategoryData.subCategories}
          type="product"
        />
      )}

      <Separator className="my-6" />

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {selectedCategoryData 
              ? (language === 'bn' ? selectedCategoryData.nameBN : selectedCategoryData.nameEN)
              : (language === 'bn' ? 'জনপ্রিয় পণ্য' : 'Popular Products')}
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <Filter className="h-4 w-4" />
            {language === 'bn' ? 'ফিল্টার' : 'Filter'}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Filter Sidebar */}
          {filterVisible && (
            <div className="col-span-12 md:col-span-3">
              <ProductFilterSidebar
                attributes={categoryAttributes}
                priceRange={[0, 50000]}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
          
          {/* Products Grid/List */}
          <div className={`col-span-12 ${filterVisible ? 'md:col-span-9' : 'md:col-span-12'}`}>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base line-clamp-2">{product.title}</h3>
                        <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700 whitespace-nowrap ml-2">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-primary font-bold text-lg">
                            ৳{product.discount ? 
                              (product.price - (product.price * product.discount / 100)).toFixed(0) : 
                              product.price.toFixed(0)}
                          </span>
                          {product.discount && (
                            <span className="text-muted-foreground text-sm line-through">
                              ৳{product.price}
                            </span>
                          )}
                          {product.discount && (
                            <Badge variant="secondary" className="ml-auto">
                              {product.discount}% {language === 'bn' ? 'ছাড়' : 'off'}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleProductClick(product.id)}
                          >
                            {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={() => handleAddToCart(product)}
                          >
                            {language === 'bn' ? 'কার্টে রাখুন' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md cursor-pointer transition-all">
                    <div className="flex">
                      <div className="w-1/4 h-40">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover object-center" />
                      </div>
                      <CardContent className="w-3/4 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-primary font-bold text-lg">
                              ৳{product.discount ? 
                                (product.price - (product.price * product.discount / 100)).toFixed(0) : 
                                product.price}
                            </span>
                            {product.discount && (
                              <span className="text-muted-foreground text-sm line-through">
                                ৳{product.price}
                              </span>
                            )}
                            {product.discount && (
                              <Badge variant="secondary">
                                {product.discount}% {language === 'bn' ? 'ছাড়' : 'off'}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleProductClick(product.id)}
                            >
                              {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                            </Button>
                            <Button onClick={() => handleAddToCart(product)}>
                              {language === 'bn' ? 'কার্টে রাখুন' : 'Add to Cart'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination placeholder */}
            {products.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="sm" className="mx-1">1</Button>
                <Button variant="outline" size="sm" className="mx-1">2</Button>
                <Button variant="outline" size="sm" className="mx-1">3</Button>
                <Button variant="ghost" size="sm" disabled className="mx-1">...</Button>
                <Button variant="outline" size="sm" className="mx-1">10</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Shopping;
