
import React, { useState } from 'react';
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
  Eye, 
  Edit, 
  Trash, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProductList = () => {
  const [products, setProducts] = useState([
    { 
      id: 'P1001', 
      name: 'স্মার্টফোন', 
      category: 'ইলেকট্রনিক্স', 
      price: '৳১২,৫০০', 
      stock: '১৫',
      status: 'active',
      createdAt: '২ দিন আগে'
    },
    { 
      id: 'P1002', 
      name: 'ওয়্যারলেস হেডফোন', 
      category: 'ইলেকট্রনিক্স', 
      price: '৳২,৫০০', 
      stock: '২৫',
      status: 'active',
      createdAt: '৩ দিন আগে'
    },
    { 
      id: 'P1003', 
      name: 'স্মার্ট ওয়াচ', 
      category: 'ইলেকট্রনিক্স', 
      price: '৳৫,৮০০', 
      stock: '১০',
      status: 'active',
      createdAt: '৫ দিন আগে'
    },
    { 
      id: 'P1004', 
      name: 'ল্যাপটপ ব্যাগ', 
      category: 'অ্যাকসেসরিজ', 
      price: '৳১,৮০০', 
      stock: '২০',
      status: 'paused',
      createdAt: '১ সপ্তাহ আগে'
    },
    { 
      id: 'P1005', 
      name: 'পাওয়ার ব্যাংক', 
      category: 'ইলেকট্রনিক্স', 
      price: '৳১,৫০০', 
      stock: '১২',
      status: 'paused',
      createdAt: '১০ দিন আগে'
    },
    { 
      id: 'P1006', 
      name: 'ব্লুটুথ স্পিকার', 
      category: 'ইলেকট্রনিক্স', 
      price: '৳৩,২০০', 
      stock: '০',
      status: 'draft',
      createdAt: '১২ দিন আগে'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            অ্যাক্টিভ
          </Badge>
        );
      case 'paused':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            পজ
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800 hover:bg-slate-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            ড্রাফট
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>প্রোডাক্ট আইডি</TableHead>
            <TableHead>নাম</TableHead>
            <TableHead>ক্যাটেগরি</TableHead>
            <TableHead>মূল্য</TableHead>
            <TableHead>স্টক</TableHead>
            <TableHead>স্ট্যাটাস</TableHead>
            <TableHead>যোগ করা হয়েছে</TableHead>
            <TableHead className="text-right">অ্যাকশন</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{getStatusBadge(product.status)}</TableCell>
              <TableCell>{product.createdAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>প্রিভিউ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      <span>এডিট</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      <span>ডিলিট</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
