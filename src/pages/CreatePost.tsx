import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building,
  Upload,
  MapPin,
  Tag,
  Calendar,
  Clock,
  DollarSign,
  Info,
  Phone,
  Mail,
  Check,
  Zap
} from 'lucide-react';

const CreatePost = () => {
  const [selectedTab, setSelectedTab] = useState('rent');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic would go here
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="container px-4 pt-20 pb-24">
      <h1 className="text-2xl font-bold mb-6">পোস্ট করুন</h1>
      
      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="rent" className="flex-1">রেন্টাল পোস্ট</TabsTrigger>
          <TabsTrigger value="service" className="flex-1">সার্ভিস পোস্ট</TabsTrigger>
          <TabsTrigger value="product" className="flex-1">প্রোডাক্ট পোস্ট</TabsTrigger>
          <TabsTrigger value="creator" className="flex-1">
            <Zap className="mr-1 h-4 w-4" />
            ডিজিটাল ক্রিয়েটর
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rent">
          <Card>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Input id="title" placeholder="শিরোনাম" />
                  </div>
                  <div>
                    <Textarea id="description" placeholder="বর্ণনা" />
                  </div>
                  <div>
                    <Input id="location" placeholder="লোকেশন" />
                  </div>
                  <div className="flex gap-2">
                    <Input id="price" placeholder="দাম" type="number" />
                    <Input id="deposit" placeholder="সিকিউরিটি ডিপোজিট" type="number" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" disabled={formSubmitted}>
                      {formSubmitted ? "পোস্ট হচ্ছে..." : "পোস্ট করুন"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Input id="title" placeholder="সার্ভিসের নাম" />
                  </div>
                  <div>
                    <Textarea id="description" placeholder="সার্ভিসের বর্ণনা" />
                  </div>
                  <div>
                    <Input id="category" placeholder="ক্যাটাগরি" />
                  </div>
                  <div>
                    <Input id="price" placeholder="দাম" type="number" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" disabled={formSubmitted}>
                      {formSubmitted ? "পোস্ট হচ্ছে..." : "পোস্ট করুন"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product">
          <Card>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Input id="title" placeholder="প্রোডাক্টের নাম" />
                  </div>
                  <div>
                    <Textarea id="description" placeholder="প্রোডাক্টের বর্ণনা" />
                  </div>
                  <div>
                    <Input id="price" placeholder="দাম" type="number" />
                  </div>
                  <div>
                    <Input id="stock" placeholder="স্টক" type="number" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" disabled={formSubmitted}>
                      {formSubmitted ? "পোস্ট হচ্ছে..." : "পোস্ট করুন"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creator">
          <Card>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Input id="title" placeholder="কোর্সের নাম" />
                  </div>
                  <div>
                    <Textarea id="description" placeholder="কোর্সের বর্ণনা" />
                  </div>
                  <div>
                    <Input id="price" placeholder="দাম" type="number" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" disabled={formSubmitted}>
                      {formSubmitted ? "পোস্ট হচ্ছে..." : "পোস্ট করুন"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatePost;
