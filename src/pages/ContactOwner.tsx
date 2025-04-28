
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, User, Phone, Mail, MessageSquare, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

const ContactOwner = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { ownerInfo, rentalInfo } = location.state || {};
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  if (!ownerInfo || !rentalInfo) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-2xl font-bold">তথ্য পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">মালিকের সম্পর্কিত তথ্য পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।</p>
          <Button onClick={() => navigate('/rentals')}>রেন্টাল পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message || !name || !phone) {
      toast({
        title: "সব ফিল্ড পূরণ করুন",
        description: "অনুগ্রহ করে প্রয়োজনীয় সব তথ্য দিন।",
        variant: "destructive"
      });
      return;
    }
    
    // বার্তা পাঠানো
    // সাধারণত এখানে API কল হবে বার্তা পাঠানোর জন্য
    toast({
      title: "বার্তা পাঠানো হয়েছে",
      description: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। মালিক শীঘ্রই যোগাযোগ করবেন।",
    });
    
    navigate(`/rent-details/${id}`);
  };

  return (
    <div className="container pt-20 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" /> পিছনে যান
        </Button>
        <h1 className="text-2xl font-bold">মালিকের সাথে যোগাযোগ করুন</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>বার্তা পাঠান</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">আপনার নাম</Label>
                  <Input 
                    id="name" 
                    placeholder="আপনার নাম লিখুন" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">ফোন নম্বর</Label>
                  <Input 
                    id="phone" 
                    placeholder="01XXXXXXXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="example@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">বার্তা</Label>
                  <Textarea 
                    id="message" 
                    placeholder="আপনার প্রশ্ন বা জিজ্ঞাসা লিখুন" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">বার্তা পাঠান</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>মালিকের তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{ownerInfo.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{ownerInfo.rating} ({ownerInfo.reviews} রিভিউ)</span>
                    {ownerInfo.verified && (
                      <Badge variant="outline" className="h-5 text-xs border-green-500 text-green-600">
                        <Check className="h-3 w-3 mr-1" /> যাচাইকৃত
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{ownerInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>সাধারণত ২ ঘন্টার মধ্যে উত্তর দেন</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="text-sm font-medium mb-3">সম্পত্তি সম্পর্কে</h4>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img 
                      src={rentalInfo.image} 
                      alt={rentalInfo.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{rentalInfo.title}</h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactOwner;
