
import React from 'react';
import LinkInBioBuilder from '@/components/store/LinkInBio/LinkInBioBuilder';

const CreateLinkInBio = () => {
  console.log('CreateLinkInBio component is rendering');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">লিংক ইন বায়ো তৈরি করুন</h1>
          <p className="text-gray-600">
            একটি সুন্দর লিংক ইন বায়ো পেজ তৈরি করুন এবং আপনার সমস্ত লিংক একসাথে রাখুন
          </p>
        </div>
        
        <LinkInBioBuilder />
      </div>
    </div>
  );
};

export default CreateLinkInBio;
