
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  Star,
  Gift,
  Globe,
  Home,
  Search,
  Menu,
  Clock,
  MapPin,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Progress } from '@/components/ui/progress';

const Onboarding = () => {
  const navigate = useNavigate();
  const { language, completeOnboarding, hasCompletedOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    // If user has already completed onboarding, redirect to home
    if (hasCompletedOnboarding) {
      navigate('/');
    }
  }, [hasCompletedOnboarding, navigate]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/');
  };

  const steps = [
    {
      title: language === 'bn' ? 'স্বাগতম!' : 'Welcome!',
      description: language === 'bn' 
        ? 'আপনার সকল সার্ভিসের জন্য একটি অ্যাপ। বাড়ি ভাড়া থেকে শুরু করে ডাক্তারের অ্যাপয়েন্টমেন্ট পর্যন্ত, সবকিছু এখানেই পাবেন।'
        : 'One app for all your services. From renting a home to doctor appointments, everything is here.',
      icon: <Home className="h-16 w-16 text-primary" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    },
    {
      title: language === 'bn' ? 'সার্ভিসগুলি খুঁজুন' : 'Find Services',
      description: language === 'bn' 
        ? 'আপনার প্রয়োজনীয় সেবাগুলি সহজেই খুঁজুন, যেকোন সময়, যেকোন জায়গায়।'
        : 'Easily find the services you need, anytime, anywhere.',
      icon: <Search className="h-16 w-16 text-primary" />,
      image: 'https://images.unsplash.com/photo-1519242220831-09410926fbae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    },
    {
      title: language === 'bn' ? 'পছন্দগুলি সংরক্ষণ করুন' : 'Save Favorites',
      description: language === 'bn' 
        ? 'আপনার পছন্দের আইটেম, সেবা বা স্থানগুলি সংরক্ষণ করুন এবং পরে সহজে খুঁজে পান।'
        : 'Save your favorite items, services, or locations and find them easily later.',
      icon: <Heart className="h-16 w-16 text-primary" />,
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    },
    {
      title: language === 'bn' ? 'রিভিউ এবং রেটিং' : 'Reviews & Ratings',
      description: language === 'bn' 
        ? 'সেবার মান সম্পর্কে জানতে অন্যদের রিভিউ দেখুন এবং আপনার অভিজ্ঞতা শেয়ার করুন।'
        : 'Read others\' reviews to learn about service quality and share your experience.',
      icon: <Star className="h-16 w-16 text-primary" />,
      image: 'https://images.unsplash.com/photo-1590097456641-57c5c69a10e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    },
    {
      title: language === 'bn' ? 'রিওয়ার্ড অর্জন করুন' : 'Earn Rewards',
      description: language === 'bn' 
        ? 'অ্যাপ ব্যবহার করে পয়েন্ট অর্জন করুন এবং আকর্ষণীয় পুরস্কার দাবি করুন।'
        : 'Earn points by using the app and claim exciting rewards.',
      icon: <Gift className="h-16 w-16 text-primary" />,
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="relative h-1/3">
          <img
            src={currentStepData.image}
            alt={currentStepData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end p-6">
            <div className="text-white">
              <div className="mb-4 flex justify-center">
                {currentStepData.icon}
              </div>
              <h1 className="text-2xl font-bold">{currentStepData.title}</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <p className="text-lg mb-8">
            {currentStepData.description}
          </p>

          <div className="flex-1 mb-8">
            {currentStep === 1 && (
              <Card className="mb-4">
                <CardContent className="p-4 flex items-center">
                  <Search className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {language === 'bn' ? 'সার্ভিস খুঁজুন...' : 'Search for services...'}
                  </span>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                      <div>
                        <h3 className="font-medium">
                          {language === 'bn' ? 'ডাক্তার কনসাল্টেশন' : 'Doctor Consultation'}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka'}
                        </div>
                      </div>
                    </div>
                    <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-5 w-5 ${rating <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">4.0</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'bn' 
                      ? 'সেবাটি খুব ভালো ছিল, ডাক্তার খুব যত্ন সহকারে আমার সমস্যা শুনেছেন।'
                      : 'The service was very good, the doctor listened to my problem very carefully.'}
                  </p>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">
                        {language === 'bn' ? 'ডিসকাউন্ট কুপন' : 'Discount Coupon'}
                      </span>
                    </div>
                    <Badge variant="outline">100 {language === 'bn' ? 'পয়েন্ট' : 'points'}</Badge>
                  </div>
                  <Progress value={60} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>60/100</span>
                    <span>{language === 'bn' ? 'আরও 40 পয়েন্ট প্রয়োজন' : 'Need 40 more points'}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="space-x-1">
                {steps.map((_, index) => (
                  <span
                    key={index}
                    className={`inline-block h-2 w-2 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  ></span>
                ))}
              </div>
              <Button variant="link" onClick={handleSkip}>
                {language === 'bn' ? 'এড়িয়ে যান' : 'Skip'}
              </Button>
            </div>
            <Button className="w-full" onClick={handleNext}>
              {currentStep === totalSteps - 1 
                ? language === 'bn' ? 'শুরু করুন' : 'Get Started' 
                : language === 'bn' ? 'পরবর্তী' : 'Next'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the badge in the reward section
const Badge: React.FC<{children: React.ReactNode, variant?: string}> = ({ children, variant }) => {
  return (
    <div className={`px-2 py-1 text-xs rounded-full ${variant === 'outline' ? 'border border-primary text-primary' : 'bg-primary text-primary-foreground'}`}>
      {children}
    </div>
  );
};

export default Onboarding;
