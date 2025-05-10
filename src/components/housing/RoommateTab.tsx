
import React, { useState } from 'react';
import { MapPin, Search, Filter, BadgeCheck, Star, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Types
interface Roommate {
  id: string;
  name: string;
  age: number;
  occupation: string;
  area: string;
  budget: string;
  image: string;
  verified: boolean;
  rating: number;
  lifestyle: string[];
  availability: string;
  contacts: number;
  premium: boolean;
}

interface Package {
  id: string;
  title: string;
  price: number;
  duration?: string;
  features: string[];
  recommended: boolean;
  active?: boolean;
}

interface RoommateTabProps {
  language: 'bn' | 'en';
}

const RoommateTab: React.FC<RoommateTabProps> = ({ language }) => {
  const isMobile = useIsMobile();
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('all');
  const [gender, setGender] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // Mock premium status

  // Sample roommate data
  const roommates: Roommate[] = [
    {
      id: '1',
      name: 'রাকিব হাসান',
      age: 26,
      occupation: 'সফটওয়্যার ইঞ্জিনিয়ার',
      area: 'মিরপুর, ঢাকা',
      budget: '৮,০০০-১২,০০০',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true,
      rating: 4.8,
      lifestyle: ['পেশাদার', 'নিরব', 'পরিষ্কার'],
      availability: 'এখনই উপলব্ধ',
      contacts: 15,
      premium: true
    },
    {
      id: '2',
      name: 'সানজিদা আক্তার',
      age: 24,
      occupation: 'গ্রাফিক ডিজাইনার',
      area: 'ধানমন্ডি, ঢাকা',
      budget: '১০,০০০-১৫,০০০',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: true,
      rating: 4.5,
      lifestyle: ['পেশাদার', 'সৃজনশীল', 'সামাজিক'],
      availability: '১ মাস পরে উপলব্ধ',
      contacts: 8,
      premium: true
    },
    {
      id: '3',
      name: 'তানভীর আহমেদ',
      age: 23,
      occupation: 'ছাত্র',
      area: 'মোহাম্মদপুর, ঢাকা',
      budget: '৫,০০০-৮,০০০',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      verified: false,
      rating: 4.2,
      lifestyle: ['গেমার', 'সামাজিক', 'রাতজাগা'],
      availability: 'এখনই উপলব্ধ',
      contacts: 5,
      premium: false
    },
    {
      id: '4',
      name: 'লুবনা খান',
      age: 27,
      occupation: 'শিক্ষক',
      area: 'উত্তরা, ঢাকা',
      budget: '৭,০০০-১২,০০০',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      verified: true,
      rating: 4.7,
      lifestyle: ['নিরব', 'পেশাদার', 'সকাল সক্রিয়'],
      availability: 'এখনই উপলব্ধ',
      contacts: 10,
      premium: false
    }
  ];

  // Sample package data
  const packages: Package[] = [
    {
      id: '1',
      title: 'বেসিক',
      price: 0,
      features: [
        'সীমিত রুমমেট ফিল্টার',
        'দৈনিক ৩টি যোগাযোগ',
        'বেসিক প্রোফাইল',
      ],
      recommended: false,
      active: !isPremiumUser
    },
    {
      id: '2',
      title: 'প্রিমিয়াম',
      price: 499,
      duration: '১ মাস',
      features: [
        'সব ধরনের ফিল্টার',
        'অসীমিত যোগাযোগ',
        'ভেরিফাইড ব্যাজ',
        'অগ্রাধিকার তালিকায়',
        'যোগাযোগের নম্বর দেখুন',
        'সরাসরি মেসেজ সুবিধা',
      ],
      recommended: true,
      active: isPremiumUser
    },
    {
      id: '3',
      title: 'বিজনেস',
      price: 1299,
      duration: '৩ মাস',
      features: [
        'সব প্রিমিয়াম সুবিধা',
        '৩ মাসের সাবস্ক্রিপশন',
        'ফিচার্ড প্রোফাইল',
        'অগ্রাধিকার সাপোর্ট',
        '২০% ছাড় (৪৯৯×৩)',
      ],
      recommended: false,
      active: false
    }
  ];

  const handleFilter = () => {
    // Implement filtering logic
    console.log('Filtering with:', { location, budget, gender, verifiedOnly, premiumOnly });
  };

  const handleContactRequest = (roommate: Roommate) => {
    setSelectedRoommate(roommate);
    setContactDialogOpen(true);
  };

  const sendMessage = () => {
    toast.success(language === 'bn' 
      ? 'যোগাযোগ অনুরোধ পাঠানো হয়েছে!' 
      : 'Contact request sent!');
    setContactDialogOpen(false);
  };

  const handleSubscribe = (pkg: Package) => {
    if (pkg.price === 0) {
      toast.info(language === 'bn' 
        ? 'আপনি ইতিমধ্যে বেসিক প্যাকেজে আছেন!' 
        : 'You are already on the Basic package!');
    } else {
      toast.success(language === 'bn' 
        ? `${pkg.title} প্যাকেজে সাবস্ক্রাইব করা হয়েছে!` 
        : `Subscribed to ${pkg.title} package!`);
      // This would typically redirect to payment
      setIsPremiumUser(true);
    }
  };

  // Filter roommates based on selected filters
  const filteredRoommates = roommates.filter(roommate => {
    if (verifiedOnly && !roommate.verified) return false;
    if (premiumOnly && !roommate.premium) return false;
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
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="verified" 
              checked={verifiedOnly}
              onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
            />
            <label htmlFor="verified" className="text-sm cursor-pointer">
              {language === 'bn' ? "ভেরিফাইড" : "Verified"}
            </label>
            
            <Checkbox 
              id="premium" 
              checked={premiumOnly}
              onCheckedChange={(checked) => setPremiumOnly(checked as boolean)}
              className="ml-4"
            />
            <label htmlFor="premium" className="text-sm cursor-pointer">
              {language === 'bn' ? "প্রিমিয়াম" : "Premium"}
            </label>
          </div>
          
          <Button onClick={handleFilter} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {language === 'bn' ? "ফিল্টার" : "Filter"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roommate Cards */}
        <div className="lg:col-span-9 space-y-6">
          {filteredRoommates.length > 0 ? (
            filteredRoommates.map(roommate => (
              <RoommateCard 
                key={roommate.id} 
                roommate={roommate} 
                language={language}
                onContact={() => handleContactRequest(roommate)} 
              />
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-muted-foreground">
                {language === 'bn' 
                  ? "এই ফিল্টারের সাথে কোন রুমমেট পাওয়া যায়নি।" 
                  : "No roommates found with these filters."}
              </p>
            </div>
          )}
        </div>
        
        {/* Membership Packages */}
        <div className="lg:col-span-3 space-y-4">
          {packages.map(pkg => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              language={language} 
              onSubscribe={() => handleSubscribe(pkg)}
            />
          ))}
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{language === 'bn' ? "যোগাযোগের তথ্য" : "Contact Information"}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? "রুমমেটের সাথে যোগাযোগ করুন" 
                : "Connect with the roommate"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRoommate && isPremiumUser ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={selectedRoommate.image} alt={selectedRoommate.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{selectedRoommate.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRoommate.occupation}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p><span className="font-medium">{language === 'bn' ? "মোবাইল:" : "Mobile:"}</span> +880 1712 345678</p>
                <p><span className="font-medium">{language === 'bn' ? "ইমেইল:" : "Email:"}</span> {selectedRoommate.name.toLowerCase().replace(/\s/g, '')}@example.com</p>
              </div>
              
              <Button onClick={sendMessage} className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                {language === 'bn' ? "মেসেজ পাঠান" : "Send Message"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{language === 'bn' ? "প্রিমিয়াম সুবিধাসমূহ:" : "Premium Benefits:"}</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span> 
                    {language === 'bn' ? "যোগাযোগের নম্বর ও ইমেইল দেখুন" : "View contact numbers and email"}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span> 
                    {language === 'bn' ? "সরাসরি মেসেজ পাঠান" : "Send direct messages"}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span> 
                    {language === 'bn' ? "আনলিমিটেড যোগাযোগ" : "Unlimited contacts"}
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => {
                  setContactDialogOpen(false);
                  setIsPremiumUser(true);
                  toast.success(language === 'bn' 
                    ? "প্রিমিয়াম সদস্য হয়েছেন!" 
                    : "You're now a Premium Member!");
                }} 
                className="w-full"
              >
                {language === 'bn' ? "প্রিমিয়াম সদস্য হন" : "Become a Premium Member"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface RoommateCardProps {
  roommate: Roommate;
  language: 'bn' | 'en';
  onContact: () => void;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ roommate, language, onContact }) => {
  return (
    <Card className={`hover:shadow-md transition-all ${roommate.premium ? 'border-2 border-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <img 
              src={roommate.image} 
              alt={roommate.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
            />
            {roommate.verified && (
              <Badge className="absolute -right-2 -bottom-1 flex items-center gap-1 bg-blue-500">
                <BadgeCheck className="h-3 w-3" />
                {language === 'bn' ? "ভেরিফাইড" : "Verified"}
              </Badge>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{roommate.name}</h3>
                <p className="text-sm text-muted-foreground">{roommate.age} বছর • {roommate.occupation}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="ml-1 text-sm font-medium">{roommate.rating}</span>
              </div>
            </div>
            
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {roommate.area}
              </div>
              <div className="text-primary font-medium">
                {language === 'bn' ? "বাজেট:" : "Budget:"} {roommate.budget} {language === 'bn' ? "টাকা/মাস" : "BDT/month"}
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {roommate.lifestyle.map((trait, index) => (
                <Badge key={index} variant="outline" className="bg-secondary/10 text-xs">
                  {trait}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 font-medium">
                  {roommate.availability}
                </Badge>
              </div>
              
              <Button onClick={onContact} size="sm">
                {language === 'bn' ? "যোগাযোগ করুন" : "Contact"} 
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PackageCardProps {
  package: Package;
  language: 'bn' | 'en';
  onSubscribe: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, language, onSubscribe }) => {
  return (
    <Card className={`relative overflow-hidden ${
      pkg.recommended ? 'border-2 border-primary' : ''
    } ${
      pkg.active ? 'border-2 border-green-500' : ''
    }`}>
      {pkg.recommended && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-3 rounded-bl-lg">
          {language === 'bn' ? "রেকমেন্ডেড" : "Recommended"}
        </div>
      )}
      
      {pkg.active && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs py-1 px-3 rounded-bl-lg">
          {language === 'bn' ? "অ্যাক্টিভ" : "Active"}
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl">{pkg.title}</h3>
          <div className="mt-1">
            <span className="text-2xl font-bold">৳{pkg.price}</span>
            {pkg.duration && <span className="text-sm text-muted-foreground">/{pkg.duration}</span>}
          </div>
        </div>
        
        <ul className="space-y-2 mb-4">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-green-600 mr-2">✓</span> 
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSubscribe} 
          variant={pkg.active ? "outline" : "default"} 
          className="w-full"
          disabled={pkg.active}
        >
          {pkg.active 
            ? (language === 'bn' ? "অ্যাক্টিভ" : "Active") 
            : (language === 'bn' ? "সাবস্ক্রাইব করুন" : "Subscribe")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoommateTab;
