
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, 
  Video, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Clock, 
  Award, 
  DollarSign,
  Plus,
  Trash,
  Save,
  Upload,
  Eye,
  Lock,
  Settings,
  FileUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const CourseBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'ইন্ট্রোডাকশন টু ডিজিটাল মার্কেটিং',
      lessons: [
        { id: 101, title: 'ডিজিটাল মার্কেটিং কি?', type: 'video', duration: '12:30', isComplete: false },
        { id: 102, title: 'ডিজিটাল মার্কেটিং এর সুবিধা', type: 'text', duration: '5:00', isComplete: false },
        { id: 103, title: 'কুইজ - ইন্ট্রোডাকশন', type: 'quiz', duration: '10:00', isComplete: false },
      ]
    },
    {
      id: 2,
      title: 'সোশ্যাল মিডিয়া মার্কেটিং',
      lessons: [
        { id: 201, title: 'ফেসবুক মার্কেটিং ফান্ডামেন্টালস', type: 'video', duration: '18:45', isComplete: false },
        { id: 202, title: 'ইনস্টাগ্রাম গ্রোথ স্ট্র্যাটেজি', type: 'video', duration: '22:10', isComplete: false },
      ]
    }
  ]);

  const templates = [
    { id: 'default', name: 'স্ট্যান্ডার্ড', description: 'বেসিক থিম সহ স্ট্যান্ডার্ড টেমপ্লেট', icon: <Book className="h-8 w-8 text-primary"/> },
    { id: 'premium', name: 'প্রিমিয়াম', description: 'অ্যাডভান্সড ফিচার সহ প্রিমিয়াম টেমপ্লেট', icon: <Award className="h-8 w-8 text-amber-500"/> },
    { id: 'minimal', name: 'মিনিমাল', description: 'সাধারণ ও সহজ ডিজাইন', icon: <FileText className="h-8 w-8 text-gray-500"/> },
    { id: 'interactive', name: 'ইন্টারেক্টিভ', description: 'বেশি ইন্টারেকশন সহ ইমারসিভ অভিজ্ঞতা', icon: <MessageSquare className="h-8 w-8 text-blue-500"/> },
  ];

  const pricingOptions = [
    { id: 'one-time', name: 'ওয়ান-টাইম পেমেন্ট', description: 'একবার পেমেন্ট, লাইফটাইম অ্যাকসেস' },
    { id: 'subscription', name: 'সাবস্ক্রিপশন', description: 'মাসিক বা বার্ষিক সাবস্ক্রিপশন' },
    { id: 'tiered', name: 'টিয়ার্ড প্রাইসিং', description: 'বিভিন্ন প্রাইস পয়েন্ট, বিভিন্ন ফিচার' },
    { id: 'free', name: 'ফ্রি কোর্স', description: 'বিনামূল্যে, ইমেইল সংগ্রহের জন্য' },
  ];

  const advancedOptions = [
    { id: 'drip-content', name: 'ড্রিপ কনটেন্ট', description: 'নির্দিষ্ট সময়ে কনটেন্ট আনলক করা', enabled: false },
    { id: 'certificates', name: 'সার্টিফিকেট', description: 'কোর্স শেষে সার্টিফিকেট প্রদান', enabled: true },
    { id: 'discussion', name: 'ডিসকাশন ফোরাম', description: 'শিক্ষার্থীদের আলোচনার জন্য ফোরাম', enabled: true },
    { id: 'assignments', name: 'অ্যাসাইনমেন্ট', description: 'হ্যান্ডস-অন প্র্যাকটিস এসাইনমেন্ট', enabled: false },
    { id: 'analytics', name: 'স্টুডেন্ট অ্যানালিটিক্স', description: 'শিক্ষার্থীদের প্রোগ্রেস ট্র্যাকিং', enabled: true },
    { id: 'ai-assist', name: 'AI অ্যাসিস্ট', description: 'AI-পাওয়ারড লার্নিং অ্যাসিস্ট্যান্ট', enabled: false },
  ];

  const addNewModule = () => {
    const newId = modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1;
    setModules([...modules, {
      id: newId,
      title: `নতুন মডিউল ${newId}`,
      lessons: []
    }]);
  };

  const addNewLesson = (moduleId: number) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const lessons = modules[moduleIndex].lessons;
    const newLessonId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push({
      id: newLessonId,
      title: `নতুন লেসন ${newLessonId}`,
      type: 'video',
      duration: '0:00',
      isComplete: false
    });
    
    setModules(updatedModules);
  };

  const removeModule = (moduleId: number) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const removeLesson = (moduleId: number, lessonId: number) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(l => l.id !== lessonId);
    
    setModules(updatedModules);
  };

  const updateModuleTitle = (moduleId: number, newTitle: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].title = newTitle;
    
    setModules(updatedModules);
  };

  const updateLessonDetails = (moduleId: number, lessonId: number, field: string, value: string) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    };
    
    setModules(updatedModules);
  };

  const handleSaveCourse = () => {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("কোর্স সফলভাবে সেভ হয়েছে!", {
        description: "আপনার কোর্স ড্যাশবোর্ডে প্রদর্শিত হবে।",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handlePublishCourse = () => {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("কোর্স সফলভাবে পাবলিশ হয়েছে!", {
        description: "আপনার কোর্স এখন পাবলিকলি উপলব্ধ।",
      });
      setIsSubmitting(false);
      navigate('/my-services');
    }, 1500);
  };

  const handleToggleAdvancedOption = (optionId: string) => {
    const updatedOptions = advancedOptions.map(option => 
      option.id === optionId ? { ...option, enabled: !option.enabled } : option
    );
    // In a real app, we would set the state here
    console.log(`Option ${optionId} toggled:`, updatedOptions);
  };

  return (
    <div className="container pt-20 pb-20">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">কোর্স বিল্ডার</h1>
          <p className="text-muted-foreground">আপনার নিজস্ব অনলাইন কোর্স তৈরি করুন এবং আপনার জ্ঞান বিক্রি করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveCourse} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            সেভ করুন
          </Button>
          <Button onClick={handlePublishCourse} disabled={isSubmitting}>
            <Eye className="h-4 w-4 mr-2" />
            পাবলিশ করুন
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="content">কোর্স কনটেন্ট</TabsTrigger>
          <TabsTrigger value="appearance">অ্যাপিয়ারেন্স</TabsTrigger>
          <TabsTrigger value="pricing">প্রাইসিং</TabsTrigger>
          <TabsTrigger value="students">শিক্ষার্থী ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-5 space-y-6">
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>কোর্স কনটেন্ট</CardTitle>
                    <CardDescription>আপনার কোর্সের মডিউল এবং লেসন যোগ করুন</CardDescription>
                  </div>
                  <Button onClick={addNewModule}>
                    <Plus className="h-4 w-4 mr-2" />
                    নতুন মডিউল
                  </Button>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {modules.map((module) => (
                      <AccordionItem key={module.id} value={`module-${module.id}`}>
                        <AccordionTrigger className="hover:no-underline group">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center">
                              <Input
                                value={module.title}
                                onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="border-0 focus-visible:ring-0 text-base font-medium"
                                aria-label="Module title"
                              />
                            </div>
                            <div className="flex items-center invisible group-hover:visible">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeModule(module.id);
                                }}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pl-6">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                                <div className="flex items-center gap-3">
                                  {lesson.type === 'video' && <Video className="h-4 w-4 text-blue-500" />}
                                  {lesson.type === 'text' && <FileText className="h-4 w-4 text-gray-500" />}
                                  {lesson.type === 'quiz' && <CheckSquare className="h-4 w-4 text-green-500" />}
                                  <div>
                                    <Input
                                      value={lesson.title}
                                      onChange={(e) => updateLessonDetails(module.id, lesson.id, 'title', e.target.value)}
                                      className="border-0 focus-visible:ring-0 text-sm bg-transparent"
                                      aria-label="Lesson title"
                                    />
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <Select 
                                        value={lesson.type}
                                        onValueChange={(value) => updateLessonDetails(module.id, lesson.id, 'type', value)}
                                      >
                                        <SelectTrigger className="h-7 w-24 text-xs">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="video">ভিডিও</SelectItem>
                                          <SelectItem value="text">টেক্সট</SelectItem>
                                          <SelectItem value="quiz">কুইজ</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <Input
                                          value={lesson.duration}
                                          onChange={(e) => updateLessonDetails(module.id, lesson.id, 'duration', e.target.value)}
                                          className="border-0 focus-visible:ring-0 text-xs w-16 p-0 h-auto bg-transparent"
                                          aria-label="Duration"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>{lesson.title} সেটিংস</DialogTitle>
                                        <DialogDescription>
                                          লেসনের বিস্তারিত সেটিংস কনফিগার করুন
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="grid gap-2">
                                          <Label>কনটেন্ট আপলোড</Label>
                                          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                                            <FileUp className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">{lesson.type === 'video' ? 'ভিডিও' : lesson.type === 'text' ? 'ফাইল' : 'কুইজ'} আপলোড করুন</p>
                                          </div>
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="preview">প্রিভিউ সেটিংস</Label>
                                          <div className="flex items-center space-x-2">
                                            <Switch id="preview" />
                                            <Label htmlFor="preview">ফ্রি প্রিভিউ হিসাবে উপলব্ধ করুন</Label>
                                          </div>
                                        </div>
                                        {lesson.type === 'quiz' && (
                                          <div className="grid gap-2">
                                            <Label>প্রশ্ন যোগ করুন</Label>
                                            <Button variant="outline" size="sm" className="w-full">
                                              <Plus className="h-4 w-4 mr-2" />
                                              নতুন প্রশ্ন যোগ করুন
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                      <DialogFooter>
                                        <Button type="submit">সেভ করুন</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => removeLesson(module.id, lesson.id)}
                                  >
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="ml-2"
                              onClick={() => addNewLesson(module.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              নতুন লেসন
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>কোর্স সামারি</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">মডিউল সংখ্যা</p>
                      <p className="text-2xl font-bold">{modules.length}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">লেসন সংখ্যা</p>
                      <p className="text-2xl font-bold">
                        {modules.reduce((acc, module) => acc + module.lessons.length, 0)}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">মোট সময়</p>
                      <p className="text-2xl font-bold">
                        2:15:30
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>টেমপ্লেট</CardTitle>
              <CardDescription>আপনার কোর্সের জন্য একটি টেমপ্লেট নির্বাচন করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer hover:border-primary transition-all h-full ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      toast.success(`${template.name} টেমপ্লেট সিলেক্ট করা হয়েছে!`);
                    }}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-primary/10 mb-3">
                        {template.icon}
                      </div>
                      <h3 className="font-medium text-base mb-1">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                      {selectedTemplate === template.id && (
                        <Badge className="mt-3 bg-primary">সিলেক্টেড</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>কালার স্কিম</CardTitle>
              <CardDescription>আপনার কোর্সের কালার থিম কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div 
                    className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
                    style={{ backgroundColor: '#7C3AED' }}
                    onClick={() => toast.success("প্রাইমারি কালার সিলেক্ট করা হয়েছে")}
                  >
                    প্রাইমারি
                  </div>
                  <div 
                    className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
                    style={{ backgroundColor: '#EC4899' }}
                    onClick={() => toast.success("সেকেন্ডারি কালার সিলেক্ট করা হয়েছে")}
                  >
                    সেকেন্ডারি
                  </div>
                  <div 
                    className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
                    style={{ backgroundColor: '#10B981' }}
                    onClick={() => toast.success("একসেন্ট কালার সিলেক্ট করা হয়েছে")}
                  >
                    একসেন্ট
                  </div>
                  <div 
                    className="rounded-md cursor-pointer h-16 flex justify-center items-center" 
                    style={{ backgroundColor: '#F3F4F6', color: '#1F2937' }}
                    onClick={() => toast.success("ব্যাকগ্রাউন্ড কালার সিলেক্ট করা হয়েছে")}
                  >
                    ব্যাকগ্রাউন্ড
                  </div>
                </div>
                <div className="pt-4">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    অ্যাডভান্সড কাস্টমাইজেশন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>প্রাইসিং মডেল</CardTitle>
              <CardDescription>আপনার কোর্সের প্রাইসিং মডেল নির্বাচন করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pricingOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className="cursor-pointer hover:border-primary transition-all"
                    onClick={() => toast.success(`${option.name} প্রাইসিং মডেল সিলেক্ট করা হয়েছে!`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col h-full">
                        <h3 className="font-medium text-base mb-1">{option.name}</h3>
                        <p className="text-xs text-muted-foreground mb-4">{option.description}</p>
                        <div className="mt-auto">
                          <Button variant="outline" size="sm" className="w-full">
                            সিলেক্ট করুন
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>মূল্য নির্ধারণ</CardTitle>
              <CardDescription>আপনার কোর্সের মূল্য নির্ধারণ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">কোর্স প্রাইস (টাকা)</Label>
                    <div className="relative">
                      <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="pl-9"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="discount">ডিসকাউন্টেড প্রাইস (টাকা)</Label>
                    <div className="relative">
                      <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="discount"
                        type="number"
                        placeholder="0.00"
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>ক্যানসেল পলিসি</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="ক্যানসেল পলিসি সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7-day">৭ দিনের রিফান্ড গ্যারান্টি</SelectItem>
                        <SelectItem value="30-day">৩০ দিনের রিফান্ড গ্যারান্টি</SelectItem>
                        <SelectItem value="no-refund">রিফান্ড নেই</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>কুপন সিস্টেম</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="coupon" />
                      <Label htmlFor="coupon">কুপন সিস্টেম এনাবল করুন</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>রিসেলার অপশন</CardTitle>
              <CardDescription>রিসেলার প্রোগ্রামের মাধ্যমে আপনার কোর্স বিক্রি করতে অন্যদেরকে অনুমতি দিন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="reseller" />
                  <Label htmlFor="reseller">রিসেলার প্রোগ্রাম এনাবল করুন</Label>
                </div>
                <div className="grid gap-4 pt-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="commission">রিসেলার কমিশন (%)</Label>
                    <Input id="commission" type="number" placeholder="30" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="reseller-limit">রিসেলার সংখ্যা (সর্বোচ্চ)</Label>
                    <Input id="reseller-limit" type="number" placeholder="Unlimited" className="mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>শিক্ষার্থী এনরোলমেন্ট</CardTitle>
              <CardDescription>
                শিক্ষার্থীদের এনরোলমেন্ট সেটিংস কনফিগার করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>এনরোলমেন্ট টাইপ</Label>
                    <Select defaultValue="open">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="এনরোলমেন্ট টাইপ সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">ওপেন এনরোলমেন্ট</SelectItem>
                        <SelectItem value="scheduled">শিডিউলড এনরোলমেন্ট</SelectItem>
                        <SelectItem value="application">অ্যাপ্লিকেশন বেসড</SelectItem>
                        <SelectItem value="invitation">শুধু আমন্ত্রণপত্র</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>শিক্ষার্থী সংখ্যা সীমা (সর্বোচ্চ)</Label>
                    <Input placeholder="Unlimited" className="mt-2" />
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="block mb-2">এনরোলমেন্ট অপশন</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="waitlist" />
                      <Label htmlFor="waitlist">ওয়েটলিস্ট এনাবল করুন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-approval" />
                      <Label htmlFor="auto-approval">অটো-অ্যাপ্রুভাল এনাবল করুন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="bulk-import" />
                      <Label htmlFor="bulk-import">বাল্ক ইম্পোর্ট এনাবল করুন</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>শিক্ষার্থী কমিউনিকেশন</CardTitle>
              <CardDescription>শিক্ষার্থীদের সাথে যোগাযোগের বিকল্প সেট করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>স্বাগত ইমেইল</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="স্বাগত ইমেইল সেটিংস" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">এনাবল করুন</SelectItem>
                        <SelectItem value="disabled">ডিসেবল করুন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>কোর্স রিমাইন্ডার</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="রিমাইন্ডার ফ্রিকোয়েন্সি" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">দৈনিক</SelectItem>
                        <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                        <SelectItem value="biweekly">দ্বিসাপ্তাহিক</SelectItem>
                        <SelectItem value="monthly">মাসিক</SelectItem>
                        <SelectItem value="disabled">ডিসেবল করুন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="block mb-2">কমিউনিকেশন চ্যানেল</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">ইমেইল নোটিফিকেশন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-notifications" />
                      <Label htmlFor="sms-notifications">এসএমএস নোটিফিকেশন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="discussion-forum" defaultChecked />
                      <Label htmlFor="discussion-forum">ডিসকাশন ফোরাম</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>সার্টিফিকেট সেটিংস</CardTitle>
              <CardDescription>কোর্স শেষে শিক্ষার্থীদের কি ধরনের সার্টিফিকেট দেয়া হবে</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="certificate-enabled" defaultChecked />
                  <Label htmlFor="certificate-enabled">সার্টিফিকেট এনাবল করুন</Label>
                </div>
                
                <div className="grid gap-4 pt-4 md:grid-cols-2">
                  <div>
                    <Label>সার্টিফিকেট টাইপ</Label>
                    <Select defaultValue="completion">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="সার্টিফিকেট টাইপ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completion">কমপ্লিশন সার্টিফিকেট</SelectItem>
                        <SelectItem value="participation">পার্টিসিপেশন সার্টিফিকেট</SelectItem>
                        <SelectItem value="achievement">অ্যাচিভমেন্ট সার্টিফিকেট</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>সার্টিফিকেট ফরম্যাট</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="সার্টিফিকেট ফরম্যাট" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="jpg">JPG/PNG</SelectItem>
                        <SelectItem value="both">PDF এবং JPG উভয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2 pt-4">
                  <Label>সার্টিফিকেট টেমপ্লেট</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                      <img src="https://via.placeholder.com/150x100?text=Template+1" alt="Certificate Template 1" className="w-full rounded" />
                      <p className="text-xs text-center mt-2">স্ট্যান্ডার্ড</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                      <img src="https://via.placeholder.com/150x100?text=Template+2" alt="Certificate Template 2" className="w-full rounded" />
                      <p className="text-xs text-center mt-2">প্রিমিয়াম</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                      <img src="https://via.placeholder.com/150x100?text=Template+3" alt="Certificate Template 3" className="w-full rounded" />
                      <p className="text-xs text-center mt-2">মিনিমাল</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                      <img src="https://via.placeholder.com/150x100?text=Custom" alt="Custom Certificate" className="w-full rounded" />
                      <p className="text-xs text-center mt-2">কাস্টম</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>অ্যাডভান্সড ফিচার</CardTitle>
              <CardDescription>অ্যাডভান্সড ফিচার এবং সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advancedOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <Switch 
                      id={option.id} 
                      checked={option.enabled} 
                      onCheckedChange={() => handleToggleAdvancedOption(option.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>কোর্স অ্যাকসেস</CardTitle>
              <CardDescription>শিক্ষার্থীদের অ্যাকসেস সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>অ্যাকসেস ডিউরেশন</Label>
                    <Select defaultValue="unlimited">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="অ্যাকসেস ডিউরেশন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30days">৩০ দিন</SelectItem>
                        <SelectItem value="90days">৯০ দিন</SelectItem>
                        <SelectItem value="180days">১৮০ দিন</SelectItem>
                        <SelectItem value="365days">১ বছর</SelectItem>
                        <SelectItem value="unlimited">আনলিমিটেড</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>কনটেন্ট ডাউনলোড</Label>
                    <Select defaultValue="allowed">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="ডাউনলোড সেটিংস" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allowed">অনুমোদিত</SelectItem>
                        <SelectItem value="disallowed">নিষিদ্ধ</SelectItem>
                        <SelectItem value="limited">সীমিত (শুধু নির্দিষ্ট ফাইল)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label className="block mb-2">অ্যাকসেস অপশন</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="drip-content" />
                      <Label htmlFor="drip-content">ড্রিপ কনটেন্ট (ধাপে ধাপে কনটেন্ট প্রকাশ)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sequential-progression" defaultChecked />
                      <Label htmlFor="sequential-progression">সিকোয়েনশিয়াল প্রোগ্রেশন (ক্রমানুসারে শেখা)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="mobile-access" defaultChecked />
                      <Label htmlFor="mobile-access">মোবাইল অ্যাকসেস</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO সেটিংস</CardTitle>
              <CardDescription>সার্চ ইঞ্জিন অপটিমাইজেশন সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="meta-title">মেটা টাইটেল</Label>
                  <Input id="meta-title" placeholder="আপনার কোর্সের মেটা টাইটেল" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meta-description">মেটা বিবরণ</Label>
                  <Textarea id="meta-description" placeholder="আপনার কোর্সের সার্চ ইঞ্জিন বিবরণ" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keywords">কিওয়ার্ড</Label>
                  <Input id="keywords" placeholder="কমা দিয়ে কিওয়ার্ড আলাদা করুন" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseBuilder;

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
