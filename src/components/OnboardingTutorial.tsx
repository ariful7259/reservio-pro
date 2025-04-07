
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

const OnboardingTutorial: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      title: language === 'bn' ? 'স্বাগতম!' : 'Welcome!',
      content: language === 'bn' 
        ? 'আমাদের অ্যাপে আপনাকে স্বাগতম। এই অ্যাপ ব্যবহার করে আপনি সহজেই বিভিন্ন সার্ভিস পেতে পারেন।'
        : 'Welcome to our app. With this app, you can easily access various services.',
      image: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: language === 'bn' ? 'সার্ভিস খুঁজুন' : 'Find Services',
      content: language === 'bn'
        ? 'আপনার প্রয়োজনীয় সার্ভিস খুঁজতে সার্চ বার ব্যবহার করুন। ক্যাটাগরি অনুযায়ী সার্ভিস ফিল্টার করতে পারেন।'
        : 'Use the search bar to find the services you need. You can filter services by category.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointments',
      content: language === 'bn'
        ? 'আপনার পছন্দের সার্ভিস প্রোভাইডার সিলেক্ট করে অ্যাপয়েন্টমেন্ট বুক করুন। সময় ও তারিখ সিলেক্ট করতে পারেন।'
        : 'Select your preferred service provider and book an appointment. You can select the time and date.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: language === 'bn' ? 'পেমেন্ট করুন' : 'Make Payment',
      content: language === 'bn'
        ? 'বিভিন্ন পেমেন্ট মেথড ব্যবহার করে সহজেই পেমেন্ট করুন। ওয়ালেট ফিচার ব্যবহার করে বিকাশ, নগদ, রকেট ইত্যাদি পেমেন্ট অপশন ব্যবহার করতে পারেন।'
        : 'Make payments easily using various payment methods. You can use bKash, Nagad, Rocket, etc. using the wallet feature.',
      image: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: language === 'bn' ? 'শুরু করুন!' : 'Get Started!',
      content: language === 'bn'
        ? 'এখন আপনি আমাদের অ্যাপ ব্যবহার করতে প্রস্তুত। যেকোনো প্রশ্নের জন্য হেল্প সেকশন দেখুন।'
        : 'You are now ready to use our app. Check the help section for any questions.',
      image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative pb-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">{currentTutorial.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-4">
          {currentTutorial.image && (
            <div className="mb-4 rounded-md overflow-hidden">
              <img 
                src={currentTutorial.image} 
                alt={currentTutorial.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <p className="text-muted-foreground">{currentTutorial.content}</p>
          
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              {language === 'bn' ? 'প্রগ্রেস' : 'Progress'}: {Math.round(progress)}%
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {language === 'bn' ? 'আগের' : 'Previous'}
          </Button>
          
          {currentStep < tutorialSteps.length - 1 ? (
            <Button onClick={handleNext}>
              {language === 'bn' ? 'পরবর্তী' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={onClose}>
              {language === 'bn' ? 'সমাপ্ত করুন' : 'Finish'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
