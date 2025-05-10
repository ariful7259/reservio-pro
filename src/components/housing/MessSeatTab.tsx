
import React, { useState } from 'react';
import { MapPin, Search, BadgeCheck, Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Types
interface MessSeat {
  id: string;
  title: string;
  area: string;
  rent: number;
  availableSeats: number;
  totalSeats: number;
  image: string;
  facilities: string[];
  type: 'male' | 'female';
  rating: number;
  reviewCount: number;
  verified: boolean;
  premium: boolean;
  lastActive: string;
}

interface MessSeatTabProps {
  language: 'bn' | 'en';
}

const MessSeatTab: React.FC<MessSeatTabProps> = ({ language }) => {
  const isMobile = useIsMobile();
  const [location, setLocation] = useState('');
  const [messType, setMessType] = useState('all');
  const [rent, setRent] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedMess, setSelectedMess] = useState<MessSeat | null>(null);

  // Sample mess seat data
  const messSeats: MessSeat[] = [
    {
      id: '1',
      title: 'আদর্শ ছাত্র মেস',
      area: 'মোহাম্মদপুর, ঢাকা',
      rent: 4000,
      availableSeats: 2,
      totalSeats: 8,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'জেনারেটর', 'খাবার', 'সিকিউরিটি', 'লন্ড্রি'],
      type: 'male',
      rating: 4.6,
      reviewCount: 12,
      verified: true,
      premium: true,
      lastActive: '১ ঘন্টা আগে'
    },
    {
      id: '2',
      title: 'সেন্ট্রাল মহিলা হোস্টেল',
      area: 'শাহবাগ, ঢাকা',
      rent: 5000,
      availableSeats: 3,
      totalSeats: 10,
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'এসি', '৩ বেলা খাবার', 'সিকিউরিটি', 'স্টাডি রুম'],
      type: 'female',
      rating: 4.8,
      reviewCount: 18,
      verified: true,
      premium: true,
      lastActive: '৩০ মিনিট আগে'
    },
    {
      id: '3',
      title: 'গ্রিন ভিউ স্টুডেন্ট মেস',
      area: 'নিউ মার্কেট, ঢাকা',
      rent: 3500,
      availableSeats: 1,
      totalSeats: 6,
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'ফ্রিজ', 'পানি', 'বিদ্যুৎ'],
      type: 'male',
      rating: 4.2,
      reviewCount: 7,
      verified: false,
      premium: false,
      lastActive: '১ দিন আগে'
    },
    {
      id: '4',
      title: 'লেডিস হোস্টেল',
      area: 'ধানমন্ডি, ঢাকা',
      rent: 6000,
      availableSeats: 2,
      totalSeats: 12,
      image: 'https://images.unsplash.com/photo-1630699144339-420f59b4747a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      facilities: ['ওয়াইফাই', 'এসি', '৩ বেলা খাবার', 'লিফট', 'লাইব্রেরি', 'সিকিউরিটি'],
      type: 'female',
      rating: 4.7,
      reviewCount: 23,
      verified: true,
      premium: false,
      lastActive: '২ ঘন্টা আগে'
    }
  ];

  const handleSearch = () => {
    // Implement search logic
    console.log('Searching with filters:', { location, messType, rent, verifiedOnly });
  };

  const viewDetails = (mess: MessSeat) => {
    setSelectedMess(mess);
    setDetailsDialogOpen(true);
  };

  const bookSeat = () => {
    toast.success(language === 'bn' 
      ? 'সীট বুকিং অনুরোধ পাঠানো হয়েছে!' 
      : 'Seat booking request sent!');
    setDetailsDialogOpen(false);
  };

  // Filter mess seats based on selected filters
  const filteredMessSeats = messSeats.filter(mess => {
    if (verifiedOnly && !mess.verified) return false;
    if (messType !== 'all' && mess.type !== messType) return false;
    return true;
  });

  return (
    <div>
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              <SelectValue placeholder={language === 'bn' ? "মেসের ধরণ" : "Mess Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="male">{language === 'bn' ? "পুরুষ মেস" : "Male Mess"}</SelectItem>
              <SelectItem value="female">{language === 'bn' ? "মহিলা মেস" : "Female Mess"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={rent} onValueChange={setRent}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "মাসিক ভাড়া" : "Monthly Rent"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="0-3000">{language === 'bn' ? "৩,০০০ টাকা পর্যন্ত" : "Up to 3,000 BDT"}</SelectItem>
              <SelectItem value="3000-5000">{language === 'bn' ? "৩,০০০-৫,০০০ টাকা" : "3,000-5,000 BDT"}</SelectItem>
              <SelectItem value="5000-7000">{language === 'bn' ? "৫,০০০-৭,০০০ টাকা" : "5,000-7,000 BDT"}</SelectItem>
              <SelectItem value="7000+">{language === 'bn' ? "৭,০০০+ টাকা" : "7,000+ BDT"}</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="verified-mess" 
              checked={verifiedOnly}
              onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
            />
            <label htmlFor="verified-mess" className="text-sm cursor-pointer">
              {language === 'bn' ? "ভেরিফাইড মেস" : "Verified Mess"}
            </label>
          </div>
          
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            {language === 'bn' ? "খুঁজুন" : "Search"}
          </Button>
        </div>
      </div>

      {/* Mess Seats List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMessSeats.length > 0 ? (
          filteredMessSeats.map(mess => (
            <MessSeatCard 
              key={mess.id} 
              mess={mess} 
              language={language}
              onViewDetails={() => viewDetails(mess)}
            />
          ))
        ) : (
          <div className="col-span-2 text-center p-8 bg-white rounded-lg shadow">
            <p className="text-muted-foreground">
              {language === 'bn' 
                ? "এই ফিল্টারের সাথে কোন মেস সীট পাওয়া যায়নি।" 
                : "No mess seats found with these filters."}
            </p>
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedMess && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMess.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">
                      ৳{selectedMess.rent} {language === 'bn' ? "/মাস" : "/month"}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>{selectedMess.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({selectedMess.reviewCount} {language === 'bn' ? "রিভিউ" : "reviews"})
                      </span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <img 
                src={selectedMess.image} 
                alt={selectedMess.title} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    {language === 'bn' ? "সুবিধাসমূহ:" : "Facilities:"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMess.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="bg-secondary/10">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">{language === 'bn' ? "অবস্থান:" : "Location:"}</span> {selectedMess.area}
                  </div>
                  <div>
                    <span className="font-medium">{language === 'bn' ? "ধরণ:" : "Type:"}</span> {
                      selectedMess.type === 'male' 
                        ? (language === 'bn' ? "পুরুষ মেস" : "Male Mess")
                        : (language === 'bn' ? "মহিলা মেস" : "Female Mess")
                    }
                  </div>
                  <div>
                    <span className="font-medium">{language === 'bn' ? "মোট সীট:" : "Total Seats:"}</span> {selectedMess.totalSeats}
                  </div>
                  <div>
                    <span className="font-medium">{language === 'bn' ? "খালি সীট:" : "Available Seats:"}</span> {selectedMess.availableSeats}
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm mb-2">
                    {language === 'bn' 
                      ? "সীট বুকিং করার জন্য নিচের বাটনে ক্লিক করুন। আপনার যোগাযোগের তথ্য মেস কর্তৃপক্ষের কাছে পাঠানো হবে।" 
                      : "Click the button below to book a seat. Your contact information will be sent to the mess authority."}
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={bookSeat} className="w-full sm:w-auto">
                  {language === 'bn' ? "সীট বুক করুন" : "Book Seat"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MessSeatCardProps {
  mess: MessSeat;
  language: 'bn' | 'en';
  onViewDetails: () => void;
}

const MessSeatCard: React.FC<MessSeatCardProps> = ({ mess, language, onViewDetails }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
      <div className="relative">
        <img src={mess.image} alt={mess.title} className="w-full h-48 object-cover" />
        
        {mess.verified && (
          <Badge className="absolute top-2 left-2 flex items-center gap-1 bg-blue-500">
            <BadgeCheck className="h-3 w-3" />
            {language === 'bn' ? "ভেরিফাইড" : "Verified"}
          </Badge>
        )}
        
        {mess.premium && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {language === 'bn' ? "প্রিমিয়াম" : "Premium"}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{mess.title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="ml-1 text-sm font-medium">{mess.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-1 inline-block" /> {mess.area}
        </p>
        
        <div className="flex justify-between mb-3">
          <span className="text-primary font-bold">৳{mess.rent}/{language === 'bn' ? "মাস" : "month"}</span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {mess.lastActive}
          </span>
        </div>
        
        <div className="text-sm mb-3 flex justify-between">
          <span>
            {language === 'bn' ? "সীট:" : "Seats:"} <span className="font-medium">{mess.availableSeats}/{mess.totalSeats}</span>
          </span>
          <span className={mess.type === 'male' ? 'text-blue-600' : 'text-pink-600'}>
            {mess.type === 'male' 
              ? (language === 'bn' ? "পুরুষ মেস" : "Male Mess")
              : (language === 'bn' ? "মহিলা মেস" : "Female Mess")}
          </span>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-1">
          {mess.facilities.slice(0, 3).map((facility, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-secondary/10">
              {facility}
            </Badge>
          ))}
          {mess.facilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mess.facilities.length - 3}
            </Badge>
          )}
        </div>
        
        <Button onClick={onViewDetails} className="w-full">
          {language === 'bn' ? "বিস্তারিত দেখুন" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessSeatTab;
