
import React, { useState } from 'react';
import { 
  Building,
  Plus,
  Calendar,
  MapPin,
  Home,
  DollarSign,
  Users,
  Star,
  Edit,
  Trash,
  ChevronRight,
  Search,
  Filter,
  Check,
  X,
  EyeIcon,
  BedDouble,
  Bath
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// মক ডেটা - বাস্তব অ্যাপ্লিকেশনে এটি API থেকে আসবে
const propertyData = [
  { 
    id: 1, 
    name: 'মডার্ন ২ বেড অ্যাপার্টমেন্ট', 
    type: 'অ্যাপার্টমেন্ট', 
    location: 'গুলশান, ঢাকা', 
    price: '৳ ৩৫,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '৩১ আগস্ট, ২০২৫', 
    rating: 4.8,
    bedrooms: 2,
    bathrooms: 2,
    size: '১,২০০ বর্গফুট'
  },
  { 
    id: 2, 
    name: 'ফার্নিশড ১ বেড অ্যাপার্টমেন্ট', 
    type: 'অ্যাপার্টমেন্ট', 
    location: 'ধানমন্ডি, ঢাকা', 
    price: '৳ ২২,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '১৫ জুলাই, ২০২৫', 
    rating: 4.5,
    bedrooms: 1,
    bathrooms: 1,
    size: '৮৫০ বর্গফুট'
  },
  { 
    id: 3, 
    name: '৩ বেড ফ্যামিলি হাউস', 
    type: 'হাউস', 
    location: 'উত্তরা, ঢাকা', 
    price: '৳ ৪৫,০০০/মাস', 
    status: 'এভেইলেবল', 
    occupiedTill: null, 
    rating: 4.9,
    bedrooms: 3,
    bathrooms: 3,
    size: '১,৮০০ বর্গফুট'
  },
  { 
    id: 4, 
    name: 'অফিস স্পেস', 
    type: 'কমার্শিয়াল', 
    location: 'বনানী, ঢাকা', 
    price: '৳ ৮০,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '৩১ ডিসেম্বর, ২০২৫', 
    rating: 4.7,
    bedrooms: 0,
    bathrooms: 2,
    size: '২,৫০০ বর্গফুট'
  },
  { 
    id: 5, 
    name: 'ইভেন্ট স্পেস', 
    type: 'অন্যান্য', 
    location: 'বসুন্ধরা, ঢাকা', 
    price: '৳ ১৫,০০০/দিন', 
    status: 'এভেইলেবল', 
    occupiedTill: null, 
    rating: 4.6,
    bedrooms: 0,
    bathrooms: 2,
    size: '৩,০০০ বর্গফুট'
  },
];

// প্রপার্টি স্ট্যাটাস বেজ
const PropertyStatusBadge = ({ status }: { status: string }) => {
  return status === 'অকুপাইড' ? (
    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
      অকুপাইড
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
      এভেইলেবল
    </Badge>
  );
};

// প্রপার্টি আইটেম কম্পোনেন্ট
const PropertyItem = ({ property }: { property: typeof propertyData[0] }) => {
  return (
    <div className="border rounded-md p-4 mb-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{property.name}</h3>
            <PropertyStatusBadge status={property.status} />
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Building className="h-3 w-3" />
              {property.type}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {property.location}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <BedDouble className="h-3 w-3" />
              {property.bedrooms} বেড
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {property.bathrooms} বাথ
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Home className="h-3 w-3" />
              {property.size}
            </span>
          </div>
          {property.status === 'অকুপাইড' && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>লিজ শেষ: {property.occupiedTill}</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="font-medium text-primary">{property.price}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {property.rating}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <Button size="sm" variant="outline">
          <EyeIcon className="h-4 w-4 mr-1" />
          বিস্তারিত
        </Button>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-1" />
          এডিট
        </Button>
      </div>
    </div>
  );
};

// প্রপার্টি ফিল্টার কম্পোনেন্ট
const PropertyFilters = ({ 
  onFilterChange, 
  onTypeChange 
}: { 
  onFilterChange: (filter: string) => void;
  onTypeChange: (type: string) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="সম্পত্তির নাম বা ঠিকানা" 
          className="pl-8"
        />
      </div>
      <Select defaultValue="all" onValueChange={onFilterChange}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="স্ট্যাটাস" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
          <SelectItem value="অকুপাইড">অকুপাইড</SelectItem>
          <SelectItem value="এভেইলেবল">এভেইলেবল</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all" onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="ধরন" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">সব ধরন</SelectItem>
          <SelectItem value="অ্যাপার্টমেন্ট">অ্যাপার্টমেন্ট</SelectItem>
          <SelectItem value="হাউস">হাউস</SelectItem>
          <SelectItem value="কমার্শিয়াল">কমার্শিয়াল</SelectItem>
          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const PropertyManagement = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // ফিল্টার করা প্রপার্টি
  const filteredProperties = propertyData.filter(property => {
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    return matchesStatus && matchesType;
  });
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>সম্পত্তি ব্যবস্থাপনা</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          নতুন সম্পত্তি
        </Button>
      </CardHeader>
      <CardContent>
        <PropertyFilters 
          onFilterChange={setStatusFilter} 
          onTypeChange={setTypeFilter}
        />
        
        <div className="space-y-1">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyItem key={property.id} property={property} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <X className="mx-auto h-8 w-8 mb-2" />
              <p>কোন সম্পত্তি পাওয়া যায়নি</p>
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          সব সম্পত্তি দেখুন
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyManagement;
