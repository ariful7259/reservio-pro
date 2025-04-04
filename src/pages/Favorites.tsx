
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2, Star, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, t, language } = useApp();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const filteredFavorites = favorites.filter((fav) => {
    // Filter by type if a specific tab is selected
    const typeMatch = selectedTab === 'all' || fav.type === selectedTab;
    
    // Filter by search term
    const searchMatch = fav.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (fav.location && fav.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return typeMatch && searchMatch;
  });

  const handleItemClick = (type: string, id: string) => {
    switch (type) {
      case 'service':
        navigate(`/services/${id}`);
        break;
      case 'product':
        navigate(`/product/${id}`);
        break;
      case 'rental':
        navigate(`/rentals/${id}`);
        break;
      case 'housing':
        navigate(`/rent/${id}`);
        break;
      default:
        navigate(`/${type}/${id}`);
    }
  };

  const handleRemove = (id: string) => {
    setSelectedItem(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmRemove = () => {
    if (selectedItem) {
      removeFromFavorites(selectedItem);
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="container pt-16 pb-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t('favorites')}</h1>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={language === 'bn' ? "খুঁজুন..." : "Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Heart className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">
            {language === 'bn' ? 'সব' : 'All'}
          </TabsTrigger>
          <TabsTrigger value="service" className="flex-1">
            {language === 'bn' ? 'সেবা' : 'Services'}
          </TabsTrigger>
          <TabsTrigger value="product" className="flex-1">
            {language === 'bn' ? 'পণ্য' : 'Products'}
          </TabsTrigger>
          <TabsTrigger value="rental" className="flex-1">
            {language === 'bn' ? 'ভাড়া' : 'Rentals'}
          </TabsTrigger>
          <TabsTrigger value="housing" className="flex-1">
            {language === 'bn' ? 'আবাসন' : 'Housing'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <FavoriteList items={filteredFavorites} onItemClick={handleItemClick} onRemove={handleRemove} />
        </TabsContent>
        
        <TabsContent value="service" className="mt-0">
          <FavoriteList 
            items={filteredFavorites.filter(item => item.type === 'service')} 
            onItemClick={handleItemClick} 
            onRemove={handleRemove} 
          />
        </TabsContent>
        
        <TabsContent value="product" className="mt-0">
          <FavoriteList 
            items={filteredFavorites.filter(item => item.type === 'product')} 
            onItemClick={handleItemClick} 
            onRemove={handleRemove} 
          />
        </TabsContent>
        
        <TabsContent value="rental" className="mt-0">
          <FavoriteList 
            items={filteredFavorites.filter(item => item.type === 'rental')} 
            onItemClick={handleItemClick} 
            onRemove={handleRemove} 
          />
        </TabsContent>
        
        <TabsContent value="housing" className="mt-0">
          <FavoriteList 
            items={filteredFavorites.filter(item => item.type === 'housing')} 
            onItemClick={handleItemClick} 
            onRemove={handleRemove} 
          />
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'bn' ? 'পছন্দ থেকে সরাতে চান?' : 'Remove from favorites?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'bn' 
                ? 'আপনি কি নিশ্চিত যে আপনি এটিকে পছন্দের তালিকা থেকে সরাতে চান?' 
                : 'Are you sure you want to remove this item from your favorites?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove}>
              {language === 'bn' ? 'সরান' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface FavoriteListProps {
  items: Array<{
    id: string;
    type: string;
    title: string;
    image: string;
    price: string | number;
    location?: string;
  }>;
  onItemClick: (type: string, id: string) => void;
  onRemove: (id: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ items, onItemClick, onRemove }) => {
  const { language } = useApp();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {language === 'bn' ? 'কোন পছন্দসই আইটেম নেই' : 'No favorites yet'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {language === 'bn'
            ? 'আপনার পছন্দের আইটেমগুলি এখানে দেখা যাবে'
            : 'Items you like will appear here'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-1/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover aspect-square"
                onClick={() => onItemClick(item.type, item.id)}
              />
            </div>
            <CardContent className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {item.type === 'service'
                      ? language === 'bn' ? 'সেবা' : 'Service'
                      : item.type === 'product'
                      ? language === 'bn' ? 'পণ্য' : 'Product'
                      : item.type === 'rental'
                      ? language === 'bn' ? 'ভাড়া' : 'Rental'
                      : language === 'bn' ? 'আবাসন' : 'Housing'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <h3
                  className="font-medium text-lg mt-1 cursor-pointer"
                  onClick={() => onItemClick(item.type, item.id)}
                >
                  {item.title}
                </h3>
                {item.location && (
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm">4.5</span>
                </div>
                <span className="font-bold text-primary">
                  {typeof item.price === 'number'
                    ? `৳${item.price.toLocaleString()}`
                    : item.price}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Favorites;
