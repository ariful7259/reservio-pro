
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Video, Users } from 'lucide-react';
import { toast } from "sonner";

interface CourseTypeSelectorProps {
  selectedTemplate: string;
}

export const CourseTypeSelector: React.FC<CourseTypeSelectorProps> = ({ selectedTemplate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>কোর্স টাইপ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={selectedTemplate === 'self-paced' ? 'default' : 'outline'} 
              className="justify-start"
              onClick={() => toast.success("সেলফ-পেসড কোর্স সিলেক্ট করা হয়েছে")}
            >
              <Clock className="h-4 w-4 mr-2" />
              সেলফ-পেসড
            </Button>
            <Button 
              variant={selectedTemplate === 'live' ? 'default' : 'outline'} 
              className="justify-start"
              onClick={() => toast.success("লাইভ কোর্স সিলেক্ট করা হয়েছে")}
            >
              <Video className="h-4 w-4 mr-2" />
              লাইভ
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={selectedTemplate === 'hybrid' ? 'default' : 'outline'} 
              className="justify-start"
              onClick={() => toast.success("হাইব্রিড কোর্স সিলেক্ট করা হয়েছে")}
            >
              <Video className="h-4 w-4 mr-2" />
              হাইব্রিড
            </Button>
            <Button 
              variant={selectedTemplate === 'cohort' ? 'default' : 'outline'} 
              className="justify-start"
              onClick={() => toast.success("কোহর্ট বেসড কোর্স সিলেক্ট করা হয়েছে")}
            >
              <Users className="h-4 w-4 mr-2" />
              কোহর্ট
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
