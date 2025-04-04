
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';
import { Check } from 'lucide-react';

type FeedbackType = 'bug' | 'feature' | 'general';

interface FeedbackFormProps {
  className?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ className = '' }) => {
  const { language, isOnline } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast({
        title: language === 'bn' ? 'অফলাইন' : 'Offline',
        description: language === 'bn' ? 'ফিডব্যাক সাবমিট করতে ইন্টারনেট সংযোগ প্রয়োজন' : 'Internet connection required to submit feedback',
        variant: "destructive",
      });
      return;
    }
    
    if (!feedbackText.trim()) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'অনুগ্রহ করে আপনার ফিডব্যাক লিখুন' : 'Please write your feedback',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      
      toast({
        title: language === 'bn' ? 'ধন্যবাদ!' : 'Thank you!',
        description: language === 'bn' ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ' : 'Thanks for your valuable feedback',
      });
      
      // Reset the form after a delay
      setTimeout(() => {
        setName('');
        setEmail('');
        setFeedbackText('');
        setFeedbackType('general');
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: language === 'bn' ? 'ত্রুটি হয়েছে' : 'Error occurred',
        description: language === 'bn' ? 'ফিডব্যাক সাবমিট করতে ব্যর্থ হয়েছে' : 'Failed to submit feedback',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitted) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {language === 'bn' ? 'ফিডব্যাক সাবমিট হয়েছে!' : 'Feedback Submitted!'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ। আমরা দ্রুত এটি পর্যালোচনা করব।'
              : 'Thank you for your valuable feedback. We will review it shortly.'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>
          {language === 'bn' ? 'আমাদের আপনার মতামত জানান' : 'Send us your feedback'}
        </CardTitle>
        <CardDescription>
          {language === 'bn' 
            ? 'আপনার অভিজ্ঞতা আমাদের সেবা উন্নত করতে সাহায্য করে।'
            : 'Your experience helps us improve our services.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === 'bn' ? 'নাম (ঐচ্ছিক)' : 'Name (Optional)'}
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Your email address'}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              {language === 'bn' ? 'ফিডব্যাকের ধরন' : 'Feedback type'}
            </Label>
            <RadioGroup 
              value={feedbackType} 
              onValueChange={(value) => setFeedbackType(value as FeedbackType)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="font-normal cursor-pointer">
                  {language === 'bn' ? 'সাধারণ মতামত' : 'General feedback'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug" className="font-normal cursor-pointer">
                  {language === 'bn' ? 'সমস্যা/বাগ রিপোর্ট' : 'Bug report'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feature" id="feature" />
                <Label htmlFor="feature" className="font-normal cursor-pointer">
                  {language === 'bn' ? 'ফিচার অনুরোধ' : 'Feature request'}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">
              {language === 'bn' ? 'আপনার মতামত' : 'Your feedback'}
            </Label>
            <Textarea 
              id="feedback" 
              value={feedbackText} 
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার মতামত এখানে লিখুন...' : 'Write your feedback here...'}
              rows={5}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? (language === 'bn' ? 'সাবমিট করা হচ্ছে...' : 'Submitting...')
              : (language === 'bn' ? 'মতামত জমা দিন' : 'Submit feedback')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
