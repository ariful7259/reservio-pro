
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "স্বাগতম!",
    description: "আমাদের প্ল্যাটফর্মে আপনাকে স্বাগতম। আসুন আপনাকে গাইড করি।"
  },
  {
    title: "প্রোডাক্ট ব্রাউজ করুন",
    description: "বিভিন্ন ক্যাটাগরি থেকে আপনার পছন্দের প্রোডাক্ট খুঁজুন।"
  },
  {
    title: "কার্ট ব্যবহার",
    description: "পছন্দের প্রোডাক্ট কার্টে যোগ করুন এবং চেকআউট করুন।"
  }
];

export const OnboardingTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-4 right-4 p-4 w-80 shadow-lg animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="font-bold mb-2">{tutorialSteps[currentStep].title}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {tutorialSteps[currentStep].description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-6 rounded-full ${
                index === currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <Button onClick={handleNext}>
          {currentStep === tutorialSteps.length - 1 ? "শেষ করুন" : "পরবর্তী"}
        </Button>
      </div>
    </Card>
  );
};
