import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const Rentals = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [rentals, setRentals] = useState([
    {
      id: '1',
      title: 'Apartment in Dhaka',
      location: 'Dhaka',
      price: 500,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1568605114967-8dd0199535d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: true,
    },
    {
      id: '2',
      title: 'House in Chittagong',
      location: 'Chittagong',
      price: 700,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: false,
    },
    {
      id: '3',
      title: 'Condo in Sylhet',
      location: 'Sylhet',
      price: 600,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1520250480474-6877f8ef18fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: true,
    },
    {
      id: '4',
      title: 'Villa in Cox\'s Bazar',
      location: 'Cox\'s Bazar',
      price: 1000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: false,
    },
    {
      id: '5',
      title: 'Apartment in Rajshahi',
      location: 'Rajshahi',
      price: 450,
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1522771739849-606ca6fa98c9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: false,
    },
    {
      id: '6',
      title: 'Duplex in Barisal',
      location: 'Barisal',
      price: 800,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: true,
    },
    {
      id: '7',
      title: 'Studio in Khulna',
      location: 'Khulna',
      price: 350,
      rating: 3.9,
      image: 'https://images.unsplash.com/photo-1494200426193-1c0349ec295f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: false,
    },
    {
      id: '8',
      title: 'Bungalow in Rangpur',
      location: 'Rangpur',
      price: 900,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1549294413-26f195200c1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: true,
    },
  ]);
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Apartments',
    },
    {
      id: '2',
      name: 'Houses',
    },
    {
      id: '3',
      name: 'Condos',
    },
    {
      id: '4',
      name: 'Villas',
    },
    {
      id: '5',
      name: 'Duplexes',
    },
    {
      id: '6',
      name: 'Studios',
    },
    {
      id: '7',
      name: 'Bungalows',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ফিল্টার করা আইটেম
  const filteredItems = rentals.filter(item => {
    const searchRegex = new RegExp(search, 'i');
    const categoryMatch = category ? item.location === category : true;
    const searchMatch = search ? searchRegex.test(item.title) || searchRegex.test(item.location) : true;
    return categoryMatch && searchMatch;
  });

  // পেজিনেশন
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filteredItems.slice(startIndex, endIndex);

  // ক্যাটাগরি পরিবর্তন
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  // সার্চ পরিবর্তন
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // পেজ পরিবর্তন
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ক্যাটাগরি খুঁজে বের করা
  const selectedCategory = categories.find(cat => cat.name === category);

  // যোগ করা রেন্টাল আইটেম রেন্ডারিং
  const renderRentalItem = (item: any) => (
    <Card 
      key={item.id} 
      className="overflow-hidden transition-all hover:shadow-md"
      onClick={() => navigate(`/rental/${item.id}`)}
    >
      <div className="relative h-48">
        <img 
          src={item.image} 
          alt={item.title || item.name} 
          className="w-full h-full object-cover"
        />
        {item.featured && (
          <Badge className="absolute top-2 right-2 bg-primary">
            ফিচারড
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {item.title || item.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="font-bold text-primary">
            ৳{item.price}/{item.priceUnit || 'দিন'}
          </div>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{item.rating || '4.5'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container px-4 pt-20 pb-20">
      {/* ফিল্টার সেকশন */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">রেন্টাল খুঁজুন</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">অনুসন্ধান</Label>
            <Input
              type="text"
              id="search"
              placeholder="অনুসন্ধান করুন"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <Label htmlFor="category">ক্যাটাগরি</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="সকল ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* ক্যাটাগরি আইটেম সেকশন */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{selectedCategory?.name || 'সকল রেন্টাল'}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map((item) => renderRentalItem(item))}
        </div>
        
        {/* পেজিনেশন */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        {/* যদি কোন আইটেম না থাকে */}
        {filteredItems.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">কোন রেন্টাল পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
      
      {/* ফিচারড রেন্টাল সেকশন */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">ফিচারড রেন্টাল</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rentals.filter(item => item.featured).map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary">
                  ফিচারড
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="font-bold text-primary">
                    ৳{item.price}/মাস
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
