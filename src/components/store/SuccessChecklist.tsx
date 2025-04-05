
import React, { useState } from 'react';
import { CheckCircle, CircleX, Circle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessChecklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'স্টোর সেটআপ', description: 'বেসিক ইনফরমেশন যোগ করুন', completed: true },
    { id: 2, name: 'থিম সিলেক্ট', description: 'আপনার পছন্দের মতো থিম বাছাই করুন', completed: true },
    { id: 3, name: 'ডোমেইন সেটআপ', description: 'কাস্টম ডোমেইন কনফিগার করুন', completed: false },
    { id: 4, name: 'লোগো আপলোড', description: 'স্টোরের লোগো আপলোড করুন', completed: false },
    { id: 5, name: 'প্রোডাক্ট যোগ', description: 'কমপক্ষে ১০টি প্রোডাক্ট যোগ করুন', completed: false },
    { id: 6, name: 'পেমেন্ট গেটওয়ে', description: 'পেমেন্ট মেথড সেটআপ করুন', completed: false },
    { id: 7, name: 'শিপিং মেথড', description: 'ডেলিভারির নিয়ম যোগ করুন', completed: false },
    { id: 8, name: 'সোশ্যাল লিঙ্ক', description: 'সোশ্যাল মিডিয়া লিঙ্ক যোগ করুন', completed: false },
    { id: 9, name: 'SEO সেটিংস', description: 'সার্চ ইঞ্জিন অপটিমাইজেশন', completed: false },
    { id: 10, name: 'কন্টাক্ট পেজ', description: 'যোগাযোগের তথ্য যোগ করুন', completed: false },
    { id: 11, name: 'টেস্ট অর্ডার', description: 'টেস্ট অর্ডার কমপ্লিট করুন', completed: false },
    { id: 12, name: 'লাইভ স্টোর', description: 'সাইট পাবলিশ করুন', completed: false },
  ]);
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">চেকলিস্ট প্রগতি</h3>
        <span className="text-sm font-medium">{progress}% সম্পন্ন</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="space-y-3 mt-6">
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
              task.completed ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="mt-0.5">
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${task.completed ? 'text-green-700' : ''}`}>
                {task.name}
              </h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">টিপস</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <span className="min-w-4">•</span>
            <span>আপনার স্টোরে পর্যাপ্ত প্রোডাক্ট যোগ করুন (৮-১০টি)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="min-w-4">•</span>
            <span>উন্নতমানের প্রোডাক্ট ইমেজ ব্যবহার করুন</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="min-w-4">•</span>
            <span>বিস্তারিত প্রোডাক্ট বিবরণ লিখুন</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="min-w-4">•</span>
            <span>অর্ডার প্রসেস সহজ ও স্পষ্ট করুন</span>
          </li>
        </ul>
      </div>
      
      {progress === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-green-800 mb-2">অভিনন্দন!</h3>
          <p className="text-green-700 mb-4">আপনার স্টোর লঞ্চ করার জন্য প্রস্তুত!</p>
          <Button className="bg-green-600 hover:bg-green-700">স্টোর লাইভ করুন</Button>
        </div>
      )}
    </div>
  );
};

export default SuccessChecklist;
