
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
  isLinkInBio: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, isLinkInBio }) => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            <div className="ml-3 text-left">
              <div className="text-sm font-medium">
                {step === 1 && (isLinkInBio ? 'ধরন নির্বাচন' : 'টেমপ্লেট নির্বাচন')}
                {step === 2 && (isLinkInBio ? 'প্রোফাইল তথ্য' : 'ব্যবসার তথ্য')}
                {step === 3 && 'সেটআপ সম্পন্ন'}
              </div>
              <div className="text-xs text-muted-foreground">
                {step === 1 && (isLinkInBio ? 'লিংক ইন বায়ো নির্বাচন' : 'ব্যবসার ধরন বেছে নিন')}
                {step === 2 && (isLinkInBio ? 'প্রোফাইল ও লিংক' : 'প্রয়োজনীয় তথ্য দিন')}
                {step === 3 && (isLinkInBio ? 'পেজ লাইভ করুন' : 'স্টোর লাইভ করুন')}
              </div>
            </div>
            {step < 3 && (
              <ArrowRight className="h-4 w-4 text-gray-400 mx-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
