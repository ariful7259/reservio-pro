
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, "সার্ভিসের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  category: z.string().min(1, "ক্যাটেগরি সিলেক্ট করুন"),
  price: z.string().min(1, "মূল্য দিন"),
  duration: z.string().min(1, "সময়কাল দিন"),
  description: z.string().min(10, "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে"),
  status: z.string().min(1, "স্ট্যাটাস সিলেক্ট করুন"),
});

interface ServiceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      status: "active",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>সার্ভিসের নাম</FormLabel>
              <FormControl>
                <Input placeholder="সার্ভিসের নাম লিখুন" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ক্যাটেগরি</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটেগরি সিলেক্ট করুন" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="রিপেয়ার">রিপেয়ার</SelectItem>
                    <SelectItem value="ক্লিনিং">ক্লিনিং</SelectItem>
                    <SelectItem value="গার্ডেনিং">গার্ডেনিং</SelectItem>
                    <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                    <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>স্ট্যাটাস</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="স্ট্যাটাস সিলেক্ট করুন" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">অ্যাকটিভ</SelectItem>
                    <SelectItem value="paused">পজ করা</SelectItem>
                    <SelectItem value="draft">ড্রাফট</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>মূল্য (৳)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="১৫০০" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>সময়কাল (ঘন্টা)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="২" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিবরণ</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="সার্ভিসের বিস্তারিত বিবরণ লিখুন"
                  className="min-h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="border rounded-md p-4">
          <FormLabel>সার্ভিসের ছবি</FormLabel>
          <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-md p-6">
            <div className="text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF সাপোর্টেড (মাক্স. ১০MB)</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="order-2 sm:order-1"
          >
            বাতিল
          </Button>
          <Button 
            type="submit"
            className="order-1 sm:order-2"
          >
            সেভ করুন
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
