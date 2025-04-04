
import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import { useApp } from '@/context/AppContext';

const Feedback = () => {
  const { language } = useApp();
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'bn' ? 'আপনার মতামত জানান' : 'Share your feedback'}
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Feedback;
