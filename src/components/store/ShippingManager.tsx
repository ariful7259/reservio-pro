
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  Truck, 
  Plus, 
  Trash2, 
  DollarSign, 
  MapPin,
  Loader2,
  Check
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ShippingZoneProps {
  id: string;
  name: string;
  regions: string[];
  rates: {
    id: string;
    method: string;
    baseRate: number;
    freeShippingThreshold?: number;
    estimatedDays: string;
  }[];
}

const ShippingManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('zones');
  const [isSaving, setIsSaving] = useState(false);
  const [showFreeShippingOptions, setShowFreeShippingOptions] = useState(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('1000');
  
  const [shippingZones, setShippingZones] = useState<ShippingZoneProps[]>([
    {
      id: '1',
      name: 'ঢাকা সিটি',
      regions: ['মিরপুর', 'উত্তরা', 'গুলশান', 'বনানী', 'মোহাম্মদপুর'],
      rates: [
        {
          id: '1',
          method: 'স্ট্যান্ডার্ড ডেলিভারি',
          baseRate: 60,
          freeShippingThreshold: 1000,
          estimatedDays: '১-২'
        },
        {
          id: '2',
          method: 'এক্সপ্রেস ডেলিভারি',
          baseRate: 120,
          estimatedDays: 'সেইম-ডে'
        }
      ]
    },
    {
      id: '2',
      name: 'ঢাকার বাইরে',
      regions: ['চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর'],
      rates: [
        {
          id: '1',
          method: 'রেগুলার শিপিং',
          baseRate: 100,
          freeShippingThreshold: 2000,
          estimatedDays: '২-৩'
        },
        {
          id: '2',
          method: 'কুরিয়ার সার্ভিস',
          baseRate: 150,
          estimatedDays: '১-২'
        }
      ]
    }
  ]);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "সেটিংস সংরক্ষিত হয়েছে",
        description: "শিপিং জোন এবং রেট সফলভাবে সংরক্ষণ করা হয়েছে।",
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleFreeShippingToggle = (checked: boolean) => {
    setShowFreeShippingOptions(checked);
    if (!checked) {
      toast({
        title: "ফ্রি শিপিং বন্ধ করা হয়েছে",
        description: "কোনো অর্ডারেই ফ্রি শিপিং প্রযোজ্য হবে না।",
      });
    }
  };

  const handleFreeShippingThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFreeShippingThreshold(value);
  };

  const handleSaveFreeShipping = () => {
    toast({
      title: "ফ্রি শিপিং সেটিংস সংরক্ষিত হয়েছে",
      description: `৳${freeShippingThreshold} বা তার বেশি অর্ডারে ফ্রি শিপিং প্রযোজ্য হবে।`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Truck className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">শিপিং জোন ও রেট ম্যানেজার</h3>
          <p className="text-sm text-muted-foreground">
            এলাকা অনুযায়ী ডেলিভারি চার্জ সেটআপ করুন। প্রতিটি জোনের জন্য আলাদা শিপিং রেট নির্ধারণ করতে পারেন।
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="zones">
            <MapPin className="h-4 w-4 mr-2" />
            শিপিং জোন
          </TabsTrigger>
          <TabsTrigger value="settings">
            <DollarSign className="h-4 w-4 mr-2" />
            ডেলিভারি সেটিংস
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="zones">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {shippingZones.map((zone) => (
                    <Accordion type="single" collapsible className="border rounded-md" key={zone.id}>
                      <AccordionItem value={zone.id}>
                        <AccordionTrigger className="px-4 py-2 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{zone.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({zone.regions.length} এলাকা)
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2">
                          <div className="space-y-4">
                            <div>
                              <Label>এলাকার নাম</Label>
                              <Input defaultValue={zone.name} className="mt-1" />
                            </div>
                            
                            <div>
                              <Label>অন্তর্ভুক্ত রিজিয়ন</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {zone.regions.map((region, index) => (
                                  <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                                    {region}
                                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 hover:bg-destructive/20 hover:text-destructive">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" size="sm" className="rounded-full">
                                  <Plus className="h-3 w-3 mr-1" /> নতুন রিজিয়ন
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label>শিপিং রেট</Label>
                                <Button variant="ghost" size="sm">
                                  <Plus className="h-3 w-3 mr-1" /> নতুন রেট
                                </Button>
                              </div>
                              
                              <div className="rounded-md border overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>ডেলিভারি মেথড</TableHead>
                                      <TableHead>বেস রেট (৳)</TableHead>
                                      <TableHead>ফ্রি শিপিং থ্রেশহোল্ড</TableHead>
                                      <TableHead>সময়সীমা (দিন)</TableHead>
                                      <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {zone.rates.map((rate) => (
                                      <TableRow key={rate.id}>
                                        <TableCell>
                                          <Input defaultValue={rate.method} />
                                        </TableCell>
                                        <TableCell>
                                          <Input type="number" defaultValue={rate.baseRate.toString()} />
                                        </TableCell>
                                        <TableCell>
                                          <Input 
                                            type="number" 
                                            defaultValue={rate.freeShippingThreshold?.toString() || ''}
                                            placeholder="ফ্রি শিপিং নেই"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Input defaultValue={rate.estimatedDays} />
                                        </TableCell>
                                        <TableCell>
                                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> নতুন শিপিং জোন তৈরি করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} className="px-6" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    সংরক্ষণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    সেটিংস সংরক্ষণ করুন
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="free-shipping">ফ্রি শিপিং অফার</Label>
                  <Switch
                    id="free-shipping"
                    checked={showFreeShippingOptions}
                    onCheckedChange={handleFreeShippingToggle}
                  />
                </div>
                
                {showFreeShippingOptions && (
                  <div className="p-4 bg-muted rounded-md space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="threshold">নির্দিষ্ট পরিমাণের উপরে ফ্রি শিপিং</Label>
                      <div className="flex items-center max-w-xs">
                        <span className="bg-muted-foreground/20 px-3 py-2 rounded-l-md">৳</span>
                        <Input
                          id="threshold"
                          value={freeShippingThreshold}
                          onChange={handleFreeShippingThresholdChange}
                          className="rounded-l-none"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ৳{freeShippingThreshold} বা তার বেশি অর্ডারে ফ্রি শিপিং প্রযোজ্য হবে
                      </p>
                    </div>
                    <Button onClick={handleSaveFreeShipping} size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      সেটিংস সংরক্ষণ করুন
                    </Button>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="cash-on-delivery">ক্যাশ অন ডেলিভারি</Label>
                    <Switch id="cash-on-delivery" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cod-charge">COD চার্জ (ঐচ্ছিক)</Label>
                  <div className="flex items-center max-w-xs">
                    <span className="bg-muted-foreground/20 px-3 py-2 rounded-l-md">৳</span>
                    <Input
                      id="cod-charge"
                      defaultValue="20"
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    COD পেমেন্ট পদ্ধতি নির্বাচনের সময় অতিরিক্ত চার্জ
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>ডেলিভারি ট্র্যাকিং</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="tracking" defaultChecked />
                    <Label htmlFor="tracking">কাস্টমারদের ডেলিভারি ট্র্যাকিং অপশন দেখান</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">ডেলিভারি স্পেশাল ইন্সট্রাকশন্স</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="instructions" defaultChecked />
                    <Label htmlFor="instructions">কাস্টমারদের ডেলিভারি সম্পর্কে নির্দেশনা দেয়ার অপশন দিন</Label>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <Button onClick={handleSaveSettings} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        সংরক্ষণ হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        সেটিংস সংরক্ষণ করুন
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShippingManager;
