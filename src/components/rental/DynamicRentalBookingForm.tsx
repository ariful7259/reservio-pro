
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Clock, MapPin, Shield, CreditCard, Info } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { bn } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { getRentalCategoryById, RentalCategory, RentalBookingField } from '@/utils/rentalCategoriesData';
import type { DateRange } from 'react-day-picker';

interface DynamicRentalBookingFormProps {
  categoryId: string;
  subcategory?: string;
  itemData?: {
    id: string;
    title: string;
    price: string;
    image: string;
    location: string;
    owner: string;
  };
  onBookingSubmit?: (bookingData: any) => void;
}

const DynamicRentalBookingForm: React.FC<DynamicRentalBookingFormProps> = ({
  categoryId,
  subcategory,
  itemData,
  onBookingSubmit
}) => {
  const { toast } = useToast();
  const [category, setCategory] = useState<RentalCategory | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const categoryData = getRentalCategoryById(categoryId);
    if (categoryData) {
      setCategory(categoryData);
      // Initialize form data with default values
      const initialData: Record<string, any> = {};
      categoryData.bookingFields.forEach(field => {
        if (field.type === 'checkbox') {
          initialData[field.id] = false;
        } else if (field.type === 'number') {
          initialData[field.id] = field.validation?.min || 0;
        } else {
          initialData[field.id] = '';
        }
      });
      setFormData(initialData);
    }
  }, [categoryId]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const calculateTotalPrice = () => {
    if (!category || !itemData) return 0;
    
    const basePrice = parseInt(itemData.price.replace(/[৳,]/g, '')) || 0;
    const commissionRate = category.monetization.commissionRate / 100;
    const commission = basePrice * commissionRate;
    
    return basePrice + commission;
  };

  const calculateDeposit = () => {
    if (!category || !category.pricingMethod.hasDeposit) return 0;
    
    const totalPrice = calculateTotalPrice();
    if (category.pricingMethod.depositType === 'percentage') {
      return totalPrice * 0.2; // 20% deposit
    } else {
      return category.pricingMethod.depositAmount || 5000;
    }
  };

  const renderFormField = (field: RentalBookingField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            rows={3}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value) || 0)}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id}>হ্যাঁ, আমি সম্মত</Label>
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value), 'PPP', { locale: bn }) : 'তারিখ নির্বাচন করুন'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => handleFieldChange(field.id, date?.toISOString())}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        );

      case 'daterange':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y', { locale: bn })} -{' '}
                      {format(dateRange.to, 'LLL dd, y', { locale: bn })}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y', { locale: bn })
                  )
                ) : (
                  'তারিখ নির্বাচন করুন'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  handleFieldChange(field.id, range);
                }}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return <Input placeholder={field.placeholder} />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const missingFields = category?.bookingFields
      .filter(field => field.required && !formData[field.id])
      .map(field => field.label);

    if (missingFields && missingFields.length > 0) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: `দয়া করে এই ক্ষেত্রগুলো পূরণ করুন: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      categoryId,
      subcategory,
      itemData,
      formData,
      dateRange,
      totalPrice: calculateTotalPrice(),
      deposit: calculateDeposit(),
      timestamp: new Date().toISOString()
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "বুকিং সফল",
        description: `${itemData?.title} সফলভাবে বুক করা হয়েছে`,
      });

      if (onBookingSubmit) {
        onBookingSubmit(bookingData);
      }
    } catch (error) {
      toast({
        title: "বুকিং ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!category) {
    return <div>ক্যাটাগরি লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            {category.name} - বুকিং ফর্ম
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{category.nameEn}</Badge>
            {subcategory && <Badge variant="secondary">{subcategory}</Badge>}
            {category.approvalRequired && <Badge className="bg-orange-100 text-orange-800">ম্যানুয়াল অনুমোদন</Badge>}
            {category.verificationRequired && <Badge className="bg-green-100 text-green-800">যাচাইকরণ প্রয়োজন</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          {itemData && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <img 
                  src={itemData.image} 
                  alt={itemData.title} 
                  className="w-20 h-20 object-cover rounded-lg" 
                />
                <div>
                  <h3 className="font-semibold">{itemData.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {itemData.location}
                  </div>
                  <p className="text-lg font-bold text-primary">{itemData.price}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {category.bookingFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderFormField(field)}
              </div>
            ))}

            <Separator />

            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Info className="h-4 w-4" />
                বুকিং সংক্ষেপ
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ভাড়ার ধরন:</span>
                  <span className="ml-2 font-medium">{category.pricingMethod.type}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">কমিশন রেট:</span>
                  <span className="ml-2 font-medium">{category.monetization.commissionRate}%</span>
                </div>
                {itemData && (
                  <>
                    <div>
                      <span className="text-muted-foreground">মূল মূল্য:</span>
                      <span className="ml-2 font-medium">{itemData.price}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">সর্বমোট:</span>
                      <span className="ml-2 font-bold text-primary">৳{calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </>
                )}
                {category.pricingMethod.hasDeposit && (
                  <div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      জামানত:
                    </span>
                    <span className="ml-2 font-medium text-green-600">৳{calculateDeposit().toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">ডেলিভারি অপশন:</h4>
              <div className="flex flex-wrap gap-2">
                {category.deliveryOptions.map((option) => (
                  <Badge key={option} variant="outline" className="bg-white">
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">বিশেষ সুবিধা:</h4>
              <div className="flex flex-wrap gap-2">
                {category.specialFeatures.map((feature) => (
                  <Badge key={feature} variant="outline" className="bg-white">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  প্রক্রিয়াকরণ হচ্ছে...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  বুকিং নিশ্চিত করুন
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicRentalBookingForm;
