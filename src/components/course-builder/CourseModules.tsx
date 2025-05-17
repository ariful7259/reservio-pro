
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Trash, Settings, FileUp, Video, FileText, CheckSquare, Clock } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: string;
  duration: string;
  isComplete: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseModulesProps {
  modules: Module[];
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
}

export const CourseModules: React.FC<CourseModulesProps> = ({ modules, setModules }) => {
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

  return (
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
  );
};
