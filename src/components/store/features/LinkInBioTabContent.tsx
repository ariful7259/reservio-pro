
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { linkInBioFeatures } from './featureData';

const LinkInBioTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {linkInBioFeatures.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">🔗 সকল লিংক এক জায়গায়!</h3>
          <p className="text-muted-foreground text-sm">
            আপনার সোশ্যাল মিডিয়া বায়োতে একটি লিংক দিয়ে সব কিছু শেয়ার করুন।
          </p>
        </div>
        <Link to="/create-linkinbio">
          <Button size="lg" className="px-8 py-3 text-base bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
            <Globe className="h-5 w-5 mr-2" />
            লিংক ইন বায়ো পেজ তৈরি করুন
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LinkInBioTabContent;
