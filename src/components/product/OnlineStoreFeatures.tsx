
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const OnlineStoreFeatures = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">আপনার অনলাইন স্টোর তৈরি করুন</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          সহজে ব্যবহারযোগ্য এবং পাওয়ারফুল ফিচার সহ আপনার ব্যবসা অনলাইনে নিয়ে আসুন
        </p>
      </div>
      
      <div className="text-center mt-10">
        <Link to="/create-store/new">
          <Button size="lg">আপনার স্টোর তৈরি করুন</Button>
        </Link>
      </div>
    </div>
  );
};

export default OnlineStoreFeatures;
