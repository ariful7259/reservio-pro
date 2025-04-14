
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "অর্ডার সফল হয়েছে",
      description: "আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে",
    });
    navigate('/marketplace');
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        ফিরে যান
      </Button>

      <h1 className="text-2xl font-bold mb-6">প্রোডাক্ট অর্ডার</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">ডেলিভারি তথ্য</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">নাম</Label>
                <Input id="name" required />
              </div>
              <div>
                <Label htmlFor="phone">ফোন নাম্বার</Label>
                <Input id="phone" type="tel" required />
              </div>
              <div>
                <Label htmlFor="address">ঠিকানা</Label>
                <Input id="address" required />
              </div>
              <Button type="submit" className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                অর্ডার করুন
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductOrder;
