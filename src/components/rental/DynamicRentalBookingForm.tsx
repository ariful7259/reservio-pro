
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface DynamicRentalBookingFormProps {
  categoryId: string;
  subcategory?: any;
  itemData?: any;
  onBookingSubmit: (values: any) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "নাম অবশ্যই কমপক্ষে ২ অক্ষরের হতে হবে।",
  }),
  phone: z.string().min(11, {
    message: "ফোন নম্বর ১১ ডিজিটের হতে হবে।",
  }),
  email: z.string().email({
    message: "অনুগ্রহ করে সঠিক ইমেইল প্রদান করুন।",
  }),
  address: z.string().min(5, {
    message: "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে।",
  }),
  startDate: z.date(),
  endDate: z.date(),
  paymentMethod: z.string().min(2, {
    message: "পেমেন্ট মেথড নির্বাচন করুন",
  }),
  notes: z.string().optional(),
})

const DynamicRentalBookingForm = ({ categoryId, subcategory, itemData, onBookingSubmit }: DynamicRentalBookingFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      startDate: undefined,
      endDate: undefined,
      paymentMethod: "",
      notes: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onBookingSubmit(values);
  }

  const paymentMethods = [
    { value: 'bkash', label: 'বিকাশ' },
    { value: 'nagad', label: 'নগদ' },
    { value: 'card', label: 'ডেবিট/ক্রেডিট কার্ড' },
    { value: 'bank', label: 'ব্যাংক ট্রান্সফার' },
    { value: 'cash', label: 'ক্যাশ অন ডেলিভারি' },
  ];

  // Fix the date picker disabled prop
  const getDisabledDates = () => {
    const today = new Date();
    return { before: today };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>নাম</FormLabel>
                <FormControl>
                  <Input placeholder="আপনার নাম লিখুন" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ফোন নম্বর</FormLabel>
                <FormControl>
                  <Input placeholder="আপনার ফোন নম্বর" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ইমেইল</FormLabel>
              <FormControl>
                <Input placeholder="আপনার ইমেইল" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পূর্ণ ঠিকানা</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="আপনার ঠিকানা লিখুন"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>শুরুর তারিখ</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: bn })
                        ) : (
                          <span>তারিখ নির্বাচন করুন</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={getDisabledDates()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>শেষের তারিখ</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: bn })
                        ) : (
                          <span>তারিখ নির্বাচন করুন</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={getDisabledDates()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Payment Method */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পেমেন্ট পদ্ধতি</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="পেমেন্ট পদ্ধতি নির্বাচন করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>নোট (যদি থাকে)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="বিশেষ কোন তথ্য থাকলে লিখুন"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">সাবমিট</Button>
        </div>
      </form>
    </Form>
  );
};

export default DynamicRentalBookingForm;
