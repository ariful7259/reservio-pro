
import React from 'react';
import { Building, BedDouble, Users, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PropertyListingTabProps {
  language: 'bn' | 'en';
}

const PropertyListingTab: React.FC<PropertyListingTabProps> = ({ language }) => {
  const handleListClick = (type: string) => {
    toast.info(
      language === 'bn'
        ? `${type} লিস্টিং ফর্মে যাচ্ছেন`
        : `Navigating to ${type} listing form`
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <Building className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {language === 'bn' ? "আপনার সম্পত্তি লিস্ট করুন" : "List Your Property"}
        </h2>
        <p className="text-muted-foreground">
          {language === 'bn' 
            ? "আপনার খালি বাসাবাড়ি, মেস সীট বা রুম শেয়ারিং অফার অন্যদের সাথে শেয়ার করুন এবং খুব সহজেই ভাড়াটিয়া খুঁজুন।"
            : "Share your vacant houses, mess seats, or room sharing offers with others and easily find tenants."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* House Listing */}
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BedDouble className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              {language === 'bn' ? "বাসাবাড়ি লিস্টিং" : "House Listing"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              {language === 'bn'
                ? "আপনার বাসা, ফ্ল্যাট, অ্যাপার্টমেন্ট লিস্ট করুন এবং হাজার হাজার সম্ভাব্য ভাড়াটিয়াদের কাছে আপনার অফার পৌঁছে দিন।"
                : "List your house, flat, or apartment and reach thousands of potential tenants with your offer."}
            </p>
            <Button 
              onClick={() => handleListClick("বাসাবাড়ি")} 
              className="w-full"
            >
              {language === 'bn' ? "লিস্ট করুন" : "List Now"}
            </Button>
          </CardContent>
        </Card>

        {/* Mess Seat Listing */}
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-secondary/10">
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              {language === 'bn' ? "মেস সীট লিস্টিং" : "Mess Seat Listing"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              {language === 'bn'
                ? "আপনার মেসে খালি সীট লিস্ট করুন এবং দ্রুত উপযুক্ত মেসমেট খুঁজে নিন। ভেরিফিকেশন সিস্টেম আপনাকে নিরাপদ রাখবে।"
                : "List vacant seats in your mess and quickly find suitable messmates. Our verification system keeps you safe."}
            </p>
            <Button 
              onClick={() => handleListClick("মেস সীট")} 
              className="w-full"
              variant="secondary"
            >
              {language === 'bn' ? "লিস্ট করুন" : "List Now"}
            </Button>
          </CardContent>
        </Card>

        {/* Room Sharing */}
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-accent/10">
                <FileText className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              {language === 'bn' ? "রুম শেয়ারিং" : "Room Sharing"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              {language === 'bn'
                ? "আপনার রুমে শেয়ারিং অফার পোস্ট করুন এবং আপনার পছন্দমতো রুমমেট খুঁজুন। আপনার প্রিফারেন্স অনুযায়ী রুমমেট বাছাই করুন।"
                : "Post a room sharing offer and find roommates according to your preference. Choose roommates that match your lifestyle."}
            </p>
            <Button 
              onClick={() => handleListClick("রুম শেয়ারিং")} 
              className="w-full"
              variant="outline"
            >
              {language === 'bn' ? "লিস্ট করুন" : "List Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-secondary/10 p-6 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-semibold text-lg mb-3">
            {language === 'bn' ? "প্রিমিয়াম লিস্টিং সুবিধা" : "Premium Listing Benefits"}
          </h3>
          <p className="text-sm mb-4">
            {language === 'bn'
              ? "প্রিমিয়াম লিস্টিং সদস্যতা নিয়ে আপনার সম্পত্তি ফিচার্ড তালিকায় প্রদর্শন করুন, বেশি ইনকোয়ারি পান এবং আরও দ্রুত ভাড়া দিন।"
              : "Get a premium listing membership to feature your property, receive more inquiries, and rent out faster."}
          </p>
          <Button variant="secondary">
            {language === 'bn' ? "প্রিমিয়াম লিস্টিং সম্পর্কে জানুন" : "Learn About Premium Listings"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingTab;
