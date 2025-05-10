
import React, { useState } from 'react';
import { MapPin, Filter, BadgeCheck, Star, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface RoommateTabProps {
  language: 'bn' | 'en';
}

const RoommateTab: React.FC<RoommateTabProps> = ({ language }) => {
  const isMobile = useIsMobile();
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('all');
  const [gender, setGender] = useState('all');
  const [verified, setVerified] = useState(false);
  const [premium, setPremium] = useState(false);

  // Sample roommate data
  const roommates = [
    {
      id: '1',
      name: 'রাকিব হাসান',
      age: 28,
      occupation: 'সফটওয়্যার ইঞ্জিনিয়ার',
      location: 'মিরপুর, ঢাকা',
      budget: '৮,০০০-১০,০০০',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      verified: true,
      rating: 4.8,
      lifestyle: ['পেশাদার', 'নিরব', 'অধূমপায়ী'],
      availability: 'আগামী মাস থেকে',
      contacts: 15,
      premium: true
    },
    {
      id: '2',
      name: 'তানভীর আহমেদ',
      age: 24,
      occupation: 'ছাত্র',
      location: 'মোহাম্মদপুর, ঢাকা',
      budget: '৫,০০০-৮,০০০',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      verified: true,
      rating: 4.5,
      lifestyle: ['ছাত্র', 'সামাজিক', 'অধূমপায়ী'],
      availability: 'অবিলম্বে',
      contacts: 7,
      premium: false
    },
    {
      id: '3',
      name: 'সাবরিনা আক্তার',
      age: 26,
      occupation: 'বিজনেস অ্যানালিস্ট',
      location: 'গুলশান, ঢাকা',
      budget: '১০,০০০-১৫,০০০',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      verified: true,
      rating: 4.9,
      lifestyle: ['পেশাদার', 'নিয়মানুবর্তী', 'অধূমপায়ী'],
      availability: 'দুই সপ্তাহ পরে',
      contacts: 23,
      premium: true
    },
    {
      id: '4',
      name: 'কামরুল ইসলাম',
      age: 30,
      occupation: 'শিক্ষক',
      location: 'ধানমন্ডি, ঢাকা',
      budget: '৮,০০০-১২,০০০',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      verified: false,
      rating: 4.2,
      lifestyle: ['পেশাদার', 'শান্ত', 'অধূমপায়ী'],
      availability: 'আগামী মাস থেকে',
      contacts: 5,
      premium: false
    },
    {
      id: '5',
      name: 'নাফিসা হক',
      age: 22,
      occupation: 'ফ্রিল্যান্সার',
      location: 'উত্তরা, ঢাকা',
      budget: '৬,০০০-৯,০০০',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      verified: true,
      rating: 4.7,
      lifestyle: ['ক্রিয়েটিভ', 'সামাজিক', 'অধূমপায়ী'],
      availability: 'অবিলম্বে',
      contacts: 12,
      premium: true
    }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', { location, budget, gender, verified, premium });
    toast.info(
      language === 'bn'
        ? 'খোঁজার ফলাফল দেখানো হচ্ছে'
        : 'Showing search results'
    );
  };

  const handleContactClick = (roommate: any) => {
    if (roommate.premium) {
      toast.success(
        language === 'bn'
          ? 'যোগাযোগ তথ্য দেখানো হচ্ছে'
          : 'Showing contact information'
      );
    } else {
      toast.info(
        language === 'bn'
          ? 'পরীক্ষণ সংস্করণে যোগাযোগ সীমিত'
          : 'Contact limited in trial version'
      );
    }
  };

  return (
    <div>
      {/* Search Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder={language === 'bn' ? "অবস্থান" : "Location"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "বাজেট" : "Budget"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="0-5000">{language === 'bn' ? "৫,০০০ টাকা পর্যন্ত" : "Up to 5,000 BDT"}</SelectItem>
              <SelectItem value="5000-10000">{language === 'bn' ? "৫,০০০-১০,০০০ টাকা" : "5,000-10,000 BDT"}</SelectItem>
              <SelectItem value="10000+">{language === 'bn' ? "১০,০০০+ টাকা" : "10,000+ BDT"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "লিঙ্গ" : "Gender"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="male">{language === 'bn' ? "পুরুষ" : "Male"}</SelectItem>
              <SelectItem value="female">{language === 'bn' ? "মহিলা" : "Female"}</SelectItem>
              <SelectItem value="other">{language === 'bn' ? "অন্যান্য" : "Other"}</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-4 md:justify-end">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified" 
                checked={verified} 
                onCheckedChange={() => setVerified(!verified)} 
              />
              <label htmlFor="verified" className="text-sm cursor-pointer">
                {language === 'bn' ? "ভেরিফাইড" : "Verified"}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="premium" 
                checked={premium} 
                onCheckedChange={() => setPremium(!premium)} 
              />
              <label htmlFor="premium" className="text-sm cursor-pointer">
                {language === 'bn' ? "প্রিমিয়াম" : "Premium"}
              </label>
            </div>
            
            <Button onClick={handleSearch} size="icon" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roommate Profiles */}
        <div className="lg:col-span-9">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'bn' ? "উপলব্ধ রুমমেট" : "Available Roommates"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {roommates.map((roommate) => (
              <Card 
                key={roommate.id} 
                className={`hover:shadow-md transition-all ${roommate.premium ? 'border-primary/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center mb-3">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-2 border-background">
                        <AvatarImage src={roommate.image} alt={roommate.name} />
                        <AvatarFallback>{roommate.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {roommate.verified && (
                        <BadgeCheck className="h-5 w-5 text-primary absolute bottom-0 right-0 bg-white rounded-full" />
                      )}
                    </div>
                    <h3 className="font-semibold mt-2">{roommate.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {roommate.age} {language === 'bn' ? "বছর" : "years"}, {roommate.occupation}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{roommate.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                      <span>{roommate.rating}</span>
                    </div>
                    <p>
                      <span className="font-medium">{language === 'bn' ? "বাজেট:" : "Budget:"}</span> {roommate.budget} {language === 'bn' ? "টাকা" : "BDT"}
                    </p>
                    <p>
                      <span className="font-medium">{language === 'bn' ? "উপলব্ধতা:" : "Availability:"}</span> {roommate.availability}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 my-3">
                    {roommate.lifestyle.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {language === 'bn' ? "যোগাযোগ করুন" : "Contact"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {language === 'bn' ? "যোগাযোগ তথ্য" : "Contact Information"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        {roommate.premium ? (
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-1">{language === 'bn' ? "মোবাইল নম্বর" : "Mobile"}</p>
                              <p className="bg-muted p-2 rounded">+880 1712-345678</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">{language === 'bn' ? "ইমেইল" : "Email"}</p>
                              <p className="bg-muted p-2 rounded">user@example.com</p>
                            </div>
                            <Button className="w-full" onClick={() => handleContactClick(roommate)}>
                              {language === 'bn' ? "মেসেজ পাঠান" : "Send Message"}
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <p>
                              {language === 'bn' 
                                ? "যোগাযোগ তথ্য দেখতে প্রিমিয়াম সদস্য হন"
                                : "Become a premium member to view contact information"}
                            </p>
                            <Button onClick={() => handleContactClick(roommate)}>
                              {language === 'bn' ? "প্রিমিয়াম সদস্য হন" : "Get Premium"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Subscription Packages */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'bn' ? "সদস্যতা প্যাকেজ" : "Membership Plans"}
          </h2>
          <div className="space-y-4">
            {/* Basic Package */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold">{language === 'bn' ? "বেসিক" : "Basic"}</h3>
                <p className="text-2xl font-bold mb-2">{language === 'bn' ? "ফ্রি" : "Free"}</p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "সীমিত রুমমেট প্রোফাইল দেখা" : "Limited roommate profiles"}</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "সীমিত ফিল্টার" : "Limited filters"}</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  {language === 'bn' ? "অ্যাক্টিভ" : "Active"}
                </Button>
              </CardContent>
            </Card>
            
            {/* Premium Package */}
            <Card className="border-primary/30">
              <CardContent className="p-4 relative">
                <Badge className="absolute top-4 right-4">
                  {language === 'bn' ? "রেকমেন্ডেড" : "Recommended"}
                </Badge>
                <h3 className="font-bold">{language === 'bn' ? "প্রিমিয়াম" : "Premium"}</h3>
                <p className="text-2xl font-bold mb-2">
                  ৳499<span className="text-sm font-normal text-muted-foreground">/{language === 'bn' ? "মাস" : "month"}</span>
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "সব রুমমেট প্রোফাইল দেখা" : "All roommate profiles"}</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "সরাসরি যোগাযোগ তথ্য" : "Direct contact information"}</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "অগ্রাধিকার সমর্থন" : "Priority support"}</span>
                  </li>
                </ul>
                <Button className="w-full">
                  {language === 'bn' ? "সাবস্ক্রাইব করুন" : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
            
            {/* Business Package */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold">{language === 'bn' ? "বিজনেস" : "Business"}</h3>
                <p className="text-2xl font-bold mb-2">
                  ৳1299<span className="text-sm font-normal text-muted-foreground">/{language === 'bn' ? "মাস" : "month"}</span>
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "সব প্রিমিয়াম সুবিধা" : "All premium features"}</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "একাধিক সম্পত্তি লিস্টিং" : "Multiple property listings"}</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <BadgeCheck className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? "ব্র্যান্ডেড প্রোফাইল" : "Branded profile"}</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  {language === 'bn' ? "সাবস্ক্রাইব করুন" : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateTab;
