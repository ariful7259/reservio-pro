
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ProductCatalogTemplate = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">প্রোডাক্ট ক্যাটালগ</h3>
        <Button size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          নতুন প্রোডাক্ট
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productName">প্রোডাক্টের নাম</Label>
            <Input id="productName" placeholder="প্রোডাক্টের নাম লিখুন" />
          </div>

          <div>
            <Label htmlFor="productPrice">মূল্য (৳)</Label>
            <Input id="productPrice" type="number" placeholder="0.00" />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="productDescription">প্রোডাক্টের বিবরণ</Label>
            <Textarea id="productDescription" placeholder="প্রোডাক্টের বিবরণ লিখুন" rows={3} />
          </div>

          <div>
            <Label htmlFor="productQuantity">স্টক পরিমাণ</Label>
            <Input id="productQuantity" type="number" placeholder="0" />
          </div>

          <div>
            <Label htmlFor="productCategory">প্রোডাক্টের ক্যাটাগরি</Label>
            <Input id="productCategory" placeholder="ক্যাটাগরি নির্বাচন করুন" />
          </div>

          <div className="md:col-span-2">
            <Label className="block mb-2">প্রোডাক্টের ছবি</Label>
            <div className="border-2 border-dashed p-8 text-center rounded-lg hover:bg-gray-50 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</p>
              <p className="text-xs text-gray-400">সুপারিশকৃত আকার: 800x800px</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-end gap-2">
          <Button variant="outline">বাতিল করুন</Button>
          <Button>সংরক্ষণ করুন</Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
        <p className="text-sm text-amber-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          আপনার স্টোর লাইভ করার আগেই অন্তত ৫টি প্রোডাক্ট যোগ করার পরামর্শ দেওয়া হচ্ছে
        </p>
      </div>
    </div>
  );
};

export default ProductCatalogTemplate;
