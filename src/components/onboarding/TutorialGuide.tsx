
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle, 
  User, 
  Search, 
  ShoppingBag, 
  Calendar, 
  Wallet, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

export type TutorialStep = {
  id: number;
  title: string;
  description: string;
  imgSrc?: string;
  icon: React.ReactNode;
  route: string;
  isCompleted: boolean;
};

export const TutorialGuide = () => {
  const navigate = useNavigate();
  const { language, addPoints } = useApp();
  const { toast } = useToast();
  const [open, setOpen] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([
    {
      id: 1,
      title: language === 'bn' ? 'প্রোফাইল সেটআপ করুন' : 'Setup your profile',
      description: language === 'bn' 
        ? 'আপনার প্রোফাইল সম্পূর্ণ করুন ও ব্যক্তিগত তথ্য যোগ করুন।'
        : 'Complete your profile and add personal information.',
      icon: <User className="h-8 w-8 text-primary" />,
      route: '/profile',
      isCompleted: false
    },
    {
      id: 2,
      title: language === 'bn' ? 'সার্ভিস খুঁজুন' : 'Find services',
      description: language === 'bn'
        ? 'আপনার প্রয়োজনীয় সেবা খুঁজুন ও ব্রাউজ করুন।'
        : 'Search and browse for services you need.',
      icon: <Search className="h-8 w-8 text-primary" />,
      route: '/services',
      isCompleted: false
    },
    {
      id: 3,
      title: language === 'bn' ? 'পণ্য কিনুন' : 'Shop products',
      description: language === 'bn'
        ? 'মার্কেটপ্লেসে পণ্য ব্রাউজ করুন ও কার্টে যোগ করুন।'
        : 'Browse marketplace products and add to cart.',
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      route: '/shopping',
      isCompleted: false
    },
    {
      id: 4,
      title: language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book appointments',
      description: language === 'bn'
        ? 'সেবা প্রদানকারীর সাথে সাক্ষাতের সময় নির্ধারণ করুন।'
        : 'Schedule a meeting with service providers.',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      route: '/appointments',
      isCompleted: false
    },
    {
      id: 5,
      title: language === 'bn' ? 'ওয়ালেট সেটআপ করুন' : 'Setup wallet',
      description: language === 'bn'
        ? 'পেমেন্ট মেথড সেটআপ করুন ও ওয়ালেট ব্যালেন্স যোগ করুন।'
        : 'Set up payment methods and add wallet balance.',
      icon: <Wallet className="h-8 w-8 text-primary" />,
      route: '/wallet',
      isCompleted: false
    },
  ]);

  const currentStep = tutorialSteps[currentStepIndex];
  const totalSteps = tutorialSteps.length;
  const completedSteps = tutorialSteps.filter(step => step.isCompleted).length;
  const progress = (completedSteps / totalSteps) * 100;

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('tutorialProgress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        setTutorialSteps(parsedProgress);
        // Set currentStepIndex to the first uncompleted step
        const firstUncompletedIndex = parsedProgress.findIndex((step: TutorialStep) => !step.isCompleted);
        setCurrentStepIndex(firstUncompletedIndex >= 0 ? firstUncompletedIndex : 0);
      } catch (error) {
        console.error('Error loading tutorial progress:', error);
      }
    }
  }, []);

  const saveProgress = (updatedSteps: TutorialStep[]) => {
    localStorage.setItem('tutorialProgress', JSON.stringify(updatedSteps));
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeAllSteps();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleNavigate = () => {
    const updatedSteps = [...tutorialSteps];
    updatedSteps[currentStepIndex].isCompleted = true;
    setTutorialSteps(updatedSteps);
    saveProgress(updatedSteps);
    
    // Navigate to the current step's route
    navigate(currentStep.route);
    
    // Close the tutorial for now
    setOpen(false);
  };

  const completeAllSteps = () => {
    const allCompleted = tutorialSteps.map(step => ({...step, isCompleted: true}));
    setTutorialSteps(allCompleted);
    saveProgress(allCompleted);
    
    // Add points for completing tutorial
    addPoints(100);
    
    toast({
      title: language === 'bn' ? 'অভিনন্দন! 🎉' : 'Congratulations! 🎉',
      description: language === 'bn' 
        ? 'আপনি টিউটোরিয়াল সম্পূর্ণ করেছেন এবং ১০০ পয়েন্ট অর্জন করেছেন!'
        : 'You have completed the tutorial and earned 100 points!',
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {language === 'bn' ? 'অ্যাপ টিউটোরিয়াল' : 'App Tutorial'}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 space-y-2">
            {tutorialSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "w-full flex items-center p-2 rounded-md transition-colors",
                  currentStepIndex === index ? "bg-primary/10" : "hover:bg-secondary/50",
                  step.isCompleted && "text-green-600"
                )}
              >
                <div className="mr-2 flex-shrink-0">
                  {step.isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  )}
                </div>
                <span className="text-sm text-left">{step.title}</span>
              </button>
            ))}

            <div className="pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{completedSteps}/{totalSteps} {language === 'bn' ? 'সম্পূর্ণ' : 'completed'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <Card className="p-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {currentStep.icon}
                  </div>
                  <h3 className="text-lg font-medium">{currentStep.title}</h3>
                </div>

                <p className="text-muted-foreground mb-6">
                  {currentStep.description}
                </p>

                {currentStep.imgSrc && (
                  <div className="mb-6 rounded-md overflow-hidden">
                    <img 
                      src={currentStep.imgSrc} 
                      alt={currentStep.title} 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  {language === 'bn' ? 'আগের ধাপ' : 'Previous'}
                </Button>

                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    onClick={handleNavigate}
                  >
                    {language === 'bn' ? 'এই পেজে যান' : 'Go to page'}
                  </Button>
                  
                  <Button 
                    onClick={handleNext}
                    className="group"
                  >
                    {currentStepIndex === totalSteps - 1 
                      ? (language === 'bn' ? 'সমাপ্ত করুন' : 'Complete') 
                      : (language === 'bn' ? 'পরবর্তী' : 'Next')}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialGuide;
