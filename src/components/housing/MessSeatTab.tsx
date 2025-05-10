
import React, { useState } from 'react';
import { MapPin, Filter, BadgeCheck, Star, Users, Home, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface MessSeatTabProps {
  language: 'bn' | 'en';
}

const MessSeatTab: React.FC<MessSeatTabProps> = ({ language }) => {
  const [location, setLocation] = useState('');
  const [messType, setMessType] = useState('all');
  const [rent, setRent] = useState('all');
  const [verified, setVerified] = useState(false);

  // Sample mess seat data
  const messSeats = [
    {
      id: '1',
      title: 'স্টুডেন্ট মেস - ফার্মগেট',
      area: 'ফার্মগেট, ঢাকা',
      rent: 6500,
      availableSeats: 2,
      totalSeats: 8,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'জেনারেটর', 'ডাইনিং', 'খাবার', 'লন্ড্রি'],
      type: 'পুরুষ',
      rating: 4.5,
      reviewCount: 18,
      verified: true,
      premium: true,
      lastActive: '১ ঘন্টা আগে'
    },
    {
      id: '2',
      title: 'মহিলা মেস - নিউমার্কেট',
      area: 'নিউমার্কেট, ঢাকা',
      rent: 5500,
      availableSeats: 3,
      totalSeats: 10,
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'ডাইনিং', 'খাবার', 'লিফট'],
      type: 'মহিলা',
      rating: 4.7,
      reviewCount: 23,
      verified: true,
      premium: false,
      lastActive: '৩০ মিনিট আগে'
    },
    {
      id: '3',
      title: 'শেয়ার্ড মেস - মিরপুর',
      area: 'মিরপুর, ঢাকা',
      rent: 4500,
      availableSeats: 1,
      totalSeats: 6,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'খাবার', 'ব্যালকনি'],
      type: 'পুরুষ',
      rating: 4.2,
      reviewCount: 9,
      verified: false,
      premium: false,
      lastActive: '২ ঘন্টা আগে'
    },
    {
      id: '4',
      title: 'কর্মজীবী মেস - উত্তরা',
      area: 'উত্তরা, ঢাকা',
      rent: 7500,
      availableSeats: 2,
      totalSeats: 8,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'জেনারেটর', 'এসি', 'খাবার', 'লন্ড্রি', 'সিকিউরিটি'],
      type: 'পুরুষ',
      rating: 4.8,
      reviewCount: 32,
      verified: true,
      premium: true,
      lastActive: '১৫ মিনিট আগে'
    },
    {
      id: '5',
      title: 'মেডিক্যাল ছাত্রী মেস',
      area: 'শাহবাগ, ঢাকা',
      rent: 8000,
      availableSeats: 1,
      totalSeats: 6,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'জেনারেটর', 'ডাইনিং', 'খাবার', 'লাইব্রেরি', 'লিফট', 'সিকিউরিটি'],
      type: 'মহিলা',
      rating: 4.9,
      reviewCount: 27,
      verified: true,
      premium: true,
      lastActive: '১ ঘন্টা আগে'
    },
    {
      id: '6',
      title: 'ইউনিভার্সিটি মেস',
      area: 'মোহাম্মদপুর, ঢাকা',
      rent: 5000,
      availableSeats: 4,
      totalSeats: 12,
      image: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'ডাইনিং', 'খাবার'],
      type: 'পুরুষ',
      rating: 4.3,
      reviewCount: 15,
      verified: false,
      premium: false,
      lastActive: '১২ ঘন্টা আগে'
    }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', { location, messType, rent, verified });
    toast.info(
      language === 'bn'
        ? 'খোঁজার ফলাফল দেখানো হচ্ছে'
        : 'Showing search results'
    );
  };

  const handleBookSeat = (mess: any) => {
    toast.success(
      language === 'bn'
        ? `"${mess.title}" এ সীট বুকিংয়ের অনুরোধ পাঠানো হয়েছে`
        : `Seat booking request sent for "${mess.title}"`
    );
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
          
          <Select value={messType} onValueChange={setMessType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "মেস ধরণ" : "Mess Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="male">{language === 'bn' ? "পুরুষ মেস" : "Male Mess"}</SelectItem>
              <SelectItem value="female">{language === 'bn' ? "মহিলা মেস" : "Female Mess"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={rent} onValueChange={setRent}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "ভাড়া" : "Rent"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="0-5000">{language === 'bn' ? "৫,০০০ টাকা পর্যন্ত" : "Up to 5,000 BDT"}</SelectItem>
              <SelectItem value="5000-7000">{language === 'bn' ? "৫,০০০-৭,০০০ টাকা" : "5,000-7,000 BDT"}</SelectItem>
              <SelectItem value="7000+">{language === 'bn' ? "৭,০০০+ টাকা" : "7,000+ BDT"}</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center justify-between md:justify-end">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified" 
                checked={verified} 
                onCheckedChange={() => setVerified(!verified)} 
              />
              <label htmlFor="verified" className="text-sm cursor-pointer">
                {language === 'bn' ? "ভেরিফাইড মেস" : "Verified Mess"}
              </label>
            </div>
            
            <Button onClick={handleSearch} className="ml-4">
              <Filter className="h-4 w-4 mr-2" />
              {language === 'bn' ? "খুঁজুন" : "Search"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mess Seats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messSeats.map((mess) => (
          <Card 
            key={mess.id} 
            className={`hover:shadow-md transition-all hover:-translate-y-1 duration-300 ${mess.premium ? 'border-primary/50' : ''}`}
          >
            <div className="relative">
              <img 
                src={mess.image} 
                alt={mess.title} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
              {mess.verified && (
                <Badge className="absolute top-2 left-2 bg-primary">
                  <BadgeCheck className="h-4 w-4 mr-1" /> 
                  {language === 'bn' ? "ভেরিফাইড" : "Verified"}
                </Badge>
              )}
              {mess.premium && (
                <Badge className="absolute top-2 right-2 bg-secondary">
                  {language === 'bn' ? "প্রিমিয়াম" : "Premium"}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg">{mess.title}</h3>
                <p className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {mess.area}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? "সর্বশেষ সক্রিয়:" : "Last active:"} {mess.lastActive}
                </p>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-primary font-bold text-lg">৳ {mess.rent}/{language === 'bn' ? "মাস" : "month"}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{mess.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({mess.reviewCount})</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{mess.availableSeats}/{mess.totalSeats} {language === 'bn' ? "সীট" : "seats"}</span>
                </div>
                <Badge variant="outline">
                  {mess.type} {language === 'bn' ? "মেস" : "Mess"}
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {mess.facilities.slice(0, 3).map((facility, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                  {mess.facilities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{mess.facilities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    {language === 'bn' ? "বিস্তারিত দেখুন" : "View Details"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{mess.title}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <img 
                        src={mess.image} 
                        alt={mess.title} 
                        className="w-full h-48 object-cover rounded-lg" 
                      />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{mess.area}</span>
                        </div>
                        <Badge variant="outline">{mess.type} {language === 'bn' ? "মেস" : "Mess"}</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-xl">
                          ৳ {mess.rent}/{language === 'bn' ? "মাস" : "month"}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{mess.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({mess.reviewCount})</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">{language === 'bn' ? "সীট" : "Seats"}</p>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>
                            {language === 'bn' ? "উপলব্ধ সীট:" : "Available seats:"} {mess.availableSeats}/{mess.totalSeats}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">{language === 'bn' ? "সুবিধাসমূহ" : "Facilities"}</p>
                        <div className="flex flex-wrap gap-1">
                          {mess.facilities.map((facility, idx) => (
                            <Badge key={idx} variant="secondary">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => handleBookSeat(mess)}>
                          {language === 'bn' ? "সীট বুক করুন" : "Book Seat"}
                        </Button>
                        <Button variant="outline" className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {language === 'bn' ? "কল করুন" : "Call"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessSeatTab;
