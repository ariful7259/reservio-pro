
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container pt-20 pb-10 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">আমাদের মার্কেটপ্লেসে স্বাগতম</h1>
        <p className="text-lg text-muted-foreground mb-6">
          আমাদের প্ল্যাটফর্মে আপনি পণ্য, সেবা এবং ভাড়া সম্পর্কিত সবকিছু পাবেন
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => navigate('/shopping')}>
            পণ্য দেখুন
          </Button>
          <Button onClick={() => navigate('/services')} variant="outline">
            সেবা দেখুন
          </Button>
          <Button onClick={() => navigate('/rentals')} variant="outline">
            ভাড়া দেখুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
