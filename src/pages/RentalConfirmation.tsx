
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar,
  CheckCircle,
  Clock,
  Download,
  MapPin,
  Phone,
  Receipt,
  Share2,
  User
} from 'lucide-react';
import { format } from 'date-fns';

const RentalConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const itemDetails = location.state?.itemDetails;

  // যদি সরাসরি এই পেইজে আসে কোন ডেটা ছাড়া
  if (!bookingData || !itemDetails) {
    return (
      <div className="container px-4 pt-20 pb-20 min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Receipt className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">বুকিং তথ্য পাওয়া যায়নি</h2>
              <p className="mb-4 text-gray-600">
                বুকিং সম্পর্কিত কোন তথ্য পাওয়া যায়নি। অনুগ্রহ করে আপনার রেন্টাল প্রক্রিয়া আবার শুরু করুন।
              </p>
              <Button onClick={() => navigate('/rentals')}>রেন্টাল সার্চ করুন</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startDate = new Date(bookingData.startDate);
  const endDate = new Date(bookingData.endDate);

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="max-w-lg mx-auto space-y-6">
        {/* সাকসেস কার্ড */}
        <Card className="bg-green-50 border border-green-200">
          <CardContent className="p-6 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-2">বুকিং সফল হয়েছে!</h1>
            <p className="text-green-700">
              আপনার রেন্টাল বুকিং সফলভাবে সম্পন্ন হয়েছে। বুকিং আইডি: #{id?.substring(0, 8).toUpperCase()}
            </p>
          </CardContent>
        </Card>
        
        {/* বুকিং তথ্য */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">বুকিং তথ্য</h2>
            
            <div className="flex items-start gap-4">
              <img 
                src={itemDetails.image} 
                alt={itemDetails.name}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold">{itemDetails.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{itemDetails.location}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>শুরুর তারিখ</span>
                </div>
                <span className="font-medium">{format(startDate, 'dd/MM/yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>শেষের তারিখ</span>
                </div>
                <span className="font-medium">{format(endDate, 'dd/MM/yyyy')}</span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>মোট দিন</span>
                </div>
                <span className="font-medium">{bookingData.totalDays} দিন</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-semibold mb-3">পেমেন্ট বিবরণ</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">দৈনিক রেট</span>
                  <span>৳{itemDetails.price}/{itemDetails.priceUnit}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">মোট দিন</span>
                  <span>{bookingData.totalDays} দিন</span>
                </div>
                
                {bookingData.depositAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ডিপোজিট ({itemDetails.depositRequired}%)</span>
                    <span>৳{bookingData.depositAmount}</span>
                  </div>
                )}
                
                <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                  <span>মোট প্রদেয়</span>
                  <span className="text-xl text-primary">
                    ৳{bookingData.depositAmount > 0 ? bookingData.depositAmount : bookingData.totalPrice}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>পেমেন্ট মেথড</span>
                  <span>{
                    bookingData.paymentMethod === 'bkash' ? 'বিকাশ' :
                    bookingData.paymentMethod === 'nagad' ? 'নগদ' :
                    bookingData.paymentMethod === 'card' ? 'কার্ড' : 'ক্যাশ'
                  }</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* কনট্যাক্ট ইনফরমেশন */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">প্রোভাইডার তথ্য</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{itemDetails.owner}</p>
                  <p className="text-sm text-muted-foreground">ভেরিফাইড রেন্টাল প্রোভাইডার</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{itemDetails.contact}</p>
                  <p className="text-sm text-muted-foreground">যেকোনো প্রয়োজনে কল করুন</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* অ্যাকশন বাটন */}
        <div className="flex flex-wrap gap-4">
          <Button className="flex-1" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            রসিদ ডাউনলোড
          </Button>
          
          <Button variant="outline" className="flex-1" onClick={() => navigate('/rentals')}>
            <Share2 className="mr-2 h-4 w-4" />
            আরও রেন্টাল দেখুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmation;
