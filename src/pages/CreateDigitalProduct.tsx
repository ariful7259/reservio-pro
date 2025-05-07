
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CreateDigitalProductForm from '@/components/product/CreateDigitalProductForm';

const CreateDigitalProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="container pt-20 pb-16">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={() => navigate('/digital-products')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> ফিরে যান
      </Button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">নতুন ডিজিটাল প্রোডাক্ট তৈরি করুন</h1>
        <p className="text-muted-foreground mt-1">
          আপনার ডিজিটাল কন্টেন্ট আপলোড করে বিক্রি করতে পারেন যেমন কোর্স, ইবুক, টেমপ্লেট
        </p>
      </div>
      
      <CreateDigitalProductForm />
    </div>
  );
};

export default CreateDigitalProduct;
