
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-6">ইমারজিং টেকনোলজি বাংলাদেশ</h1>
        <p className="text-xl mb-8">
          আধুনিক প্রযুক্তির মাধ্যমে সেবা ও পণ্যের সহজলভ্যতা নিশ্চিত করা আমাদের লক্ষ্য
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => navigate('/services')}
            size="lg"
            className="px-8"
          >
            সেবাসমূহ দেখুন
          </Button>
          <Button 
            onClick={() => navigate('/rentals')}
            variant="outline"
            size="lg"
            className="px-8"
          >
            রেন্টাল সার্ভিস
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-3">সেবা প্রদানকারী</h3>
          <p>বিশেষজ্ঞ সেবা প্রদানকারীদের সাথে সহজেই যোগাযোগ করুন</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-3">পণ্য ক্রয়</h3>
          <p>হাজার হাজার পণ্য এক জায়গায় সহজ মূল্যে কিনুন</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-3">রেন্টাল সার্ভিস</h3>
          <p>প্রয়োজনীয় যেকোনো জিনিস ভাড়া নিন সহজ শর্তে</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
