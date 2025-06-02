
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Plus,
  Package,
  Wrench,
  Building,
  FileText,
  Edit,
  Eye,
  Trash2,
  TrendingUp,
  TrendingDown,
  Star,
  MoreHorizontal
} from 'lucide-react';

interface ProductsTabProps {
  businessType: string | null;
}

const ProductsTab = ({ businessType }: ProductsTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeProductTab, setActiveProductTab] = useState('products');

  const products = [
    {
      id: 'PRD-001',
      name: 'বিজনেস স্টার্টাপ গাইড',
      category: 'ই-বুক',
      price: '৳৯৯৯',
      sales: 45,
      revenue: '৳৪৪,৯৫৫',
      status: 'active',
      rating: 4.8,
      reviews: 23,
      stock: 'unlimited',
      type: 'digital'
    },
    {
      id: 'PRD-002',
      name: 'প্রিমিয়াম ওয়েব টেমপ্লেট',
      category: 'ডিজাইন',
      price: '৳২,৫০০',
      sales: 18,
      revenue: '৳৪৫,০০০',
      status: 'active',
      rating: 4.6,
      reviews: 12,
      stock: 'unlimited',
      type: 'digital'
    },
    {
      id: 'PRD-003',
      name: 'মোবাইল অ্যাপ UI কিট',
      category: 'ডিজাইন',
      price: '৳১,৮০০',
      sales: 8,
      revenue: '৳১৪,৪০০',
      status: 'inactive',
      rating: 4.2,
      reviews: 5,
      stock: 'unlimited',
      type: 'digital'
    }
  ];

  const services = [
    {
      id: 'SRV-001',
      name: 'ওয়েব ডেভেলপমেন্ট কনসালটেশন',
      category: 'পরামর্শ',
      price: '৳৩,০০০/ঘন্টা',
      bookings: 25,
      revenue: '৳৭৫,০০০',
      status: 'active',
      rating: 4.9,
      reviews: 18,
      duration: '১-২ ঘন্টা'
    },
    {
      id: 'SRV-002',
      name: 'ডিজিটাল মার্কেটিং সার্ভিস',
      category: 'মার্কেটিং',
      price: '৳৫,০০০/মাস',
      bookings: 12,
      revenue: '৳৬০,০০০',
      status: 'active',
      rating: 4.7,
      reviews: 10,
      duration: '১ মাস'
    }
  ];

  const properties = [
    {
      id: 'PROP-001',
      name: 'গুলশান লাক্সারি অ্যাপার্টমেন্ট',
      category: 'আবাসিক',
      price: '৳১৫,০০০/মাস',
      bookings: 8,
      revenue: '৳১,২০,০০০',
      status: 'active',
      rating: 4.5,
      reviews: 6,
      location: 'গুলশান, ঢাকা'
    },
    {
      id: 'PROP-002',
      name: 'বনানী অফিস স্পেস',
      category: 'বাণিজ্যিক',
      price: '৳২৫,০০০/মাস',
      bookings: 3,
      revenue: '৭৫,০০০',
      status: 'active',
      rating: 4.3,
      reviews: 3,
      location: 'বনানী, ঢাকা'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'inactive':
        return 'নিষ্ক্রিয়';
      case 'draft':
        return 'খসড়া';
      default:
        return status;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">প্রোডাক্ট ও সার্ভিস ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">আপনার সকল প্রোডাক্ট, সার্ভিস এবং প্রপার্টি পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            নতুন যোগ করুন
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট প্রোডাক্ট</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট সার্ভিস</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <Wrench className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট প্রপার্টি</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Building className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">৳২,৫৯,৩৫৫</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="প্রোডাক্ট, সার্ভিস বা প্রপার্টির নাম খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                <SelectItem value="digital">ডিজিটাল</SelectItem>
                <SelectItem value="service">সার্ভিস</SelectItem>
                <SelectItem value="property">প্রপার্টি</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product tabs */}
      <Tabs value={activeProductTab} onValueChange={setActiveProductTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            প্রোডাক্ট ({products.length})
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            সার্ভিস ({services.length})
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            প্রপার্টি ({properties.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ডিজিটাল প্রোডাক্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge className={getStatusColor(product.status)}>
                            {getStatusText(product.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">মূল্য: </span>
                          <span className="font-medium">{product.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">বিক্রয়: </span>
                          <span className="font-medium">{product.sales} টি</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">আয়: </span>
                          <span className="font-medium text-green-600">{product.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-4 lg:mt-0">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সার্ভিস তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{service.category}</Badge>
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusText(service.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">মূল্য: </span>
                          <span className="font-medium">{service.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">বুকিং: </span>
                          <span className="font-medium">{service.bookings} টি</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">আয়: </span>
                          <span className="font-medium text-green-600">{service.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(service.rating)}</div>
                          <span className="text-sm">{service.rating}</span>
                          <span className="text-xs text-muted-foreground">({service.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-4 lg:mt-0">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>প্রপার্টি তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold">{property.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{property.category}</Badge>
                          <Badge className={getStatusColor(property.status)}>
                            {getStatusText(property.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">ভাড়া: </span>
                          <span className="font-medium">{property.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">বুকিং: </span>
                          <span className="font-medium">{property.bookings} টি</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">আয়: </span>
                          <span className="font-medium text-green-600">{property.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(property.rating)}</div>
                          <span className="text-sm">{property.rating}</span>
                          <span className="text-xs text-muted-foreground">({property.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <span>অবস্থান: {property.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-4 lg:mt-0">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTab;
