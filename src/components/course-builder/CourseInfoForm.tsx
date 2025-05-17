
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface CourseInfoFormProps {
  courseName: string;
  setCourseName: (name: string) => void;
  courseDescription: string;
  setCourseDescription: (description: string) => void;
}

export const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>কোর্স ইনফরমেশন</CardTitle>
        <CardDescription>
          আপনার কোর্সের মূল তথ্য যোগ করুন
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="course-name">কোর্সের নাম</Label>
            <Input
              id="course-name"
              placeholder="আপনার কোর্সের নাম লিখুন"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course-description">কোর্সের বিবরণ</Label>
            <Textarea
              id="course-description"
              placeholder="আপনার কোর্সের বিস্তারিত বর্ণনা লিখুন"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label>কোর্স কভার ইমেজ</Label>
            <div className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">ছবি আপলোড করতে ক্লিক করুন (অনুপাত 16:9)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
