
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

const ProductList = () => {
  // Dummy data for now - will be replaced with real data later
  const products: Product[] = [
    {
      id: '1',
      name: 'স্মার্টফোন',
      price: 15000,
      stock: 10,
      category: 'ইলেকট্রনিক্স',
      status: 'active'
    },
    {
      id: '2',
      name: 'ল্যাপটপ',
      price: 50000,
      stock: 5,
      category: 'ইলেকট্রনিক্স',
      status: 'active'
    }
  ];

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>পণ্য তালিকা</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          নতুন পণ্য যোগ করুন
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>মোট {products.length}টি পণ্য</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>মূল্য</TableHead>
              <TableHead>স্টক</TableHead>
              <TableHead>ক্যাটাগরি</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>৳{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductList;
