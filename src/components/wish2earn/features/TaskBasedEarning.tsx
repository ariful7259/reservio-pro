
import React, { useState } from "react";
import { MapPin, Globe, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'location' | 'digital';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  location?: string;
}

export const TaskBasedEarning: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "খাবার ডেলিভারি",
      description: "আপনার এলাকায় একজনকে খাবার পৌঁছে দিন",
      reward: 100,
      type: 'location',
      difficulty: 'easy',
      timeEstimate: "৩০ মিনিট",
      location: "ধানমন্ডি"
    },
    {
      id: "2",
      title: "মোবাইল মেরামত সাহায্য",
      description: "একজনের মোবাইল সারাতে হবে",
      reward: 300,
      type: 'location',
      difficulty: 'medium',
      timeEstimate: "১ ঘন্টা",
      location: "গুলশান"
    },
    {
      id: "3",
      title: "রেফারেল বোনাস",
      description: "৩ জন বন্ধুকে অ্যাপে যোগ করান",
      reward: 500,
      type: 'digital',
      difficulty: 'easy',
      timeEstimate: "যেকোনো সময়"
    },
    {
      id: "4",
      title: "ভিডিও শেয়ার চ্যালেঞ্জ",
      description: "১০টি ভিডিও শেয়ার করুন",
      reward: 200,
      type: 'digital',
      difficulty: 'easy',
      timeEstimate: "২ ঘন্টা"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'সহজ';
      case 'medium': return 'মাঝারি';
      case 'hard': return 'কঠিন';
      default: return 'অজানা';
    }
  };

  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {task.type === 'location' ? (
              <MapPin className="h-5 w-5 text-orange-500" />
            ) : (
              <Globe className="h-5 w-5 text-blue-500" />
            )}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <Badge className="bg-green-100 text-green-700">
            ৳{task.reward}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-3">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
            <Star className="h-3 w-3 mr-1" />
            {getDifficultyText(task.difficulty)}
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            {task.timeEstimate}
          </Badge>
          {task.location && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <MapPin className="h-3 w-3 mr-1" />
              {task.location}
            </Badge>
          )}
        </div>

        <Button className="w-full" size="sm">
          Task গ্রহণ করুন
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-6 w-6 text-green-500" />
        <h2 className="text-xl font-bold text-green-700">Task Based Earning</h2>
      </div>

      <Tabs defaultValue="location" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location-Based
          </TabsTrigger>
          <TabsTrigger value="digital" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Digital Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-4 mt-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h3 className="font-semibold text-orange-800 mb-1">📍 আপনার এলাকার Task সমূহ</h3>
            <p className="text-sm text-orange-700">লোকেশন ভিত্তিক কাজ যা আপনার কাছাকাছি এলাকায়</p>
          </div>
          
          <div className="grid gap-4">
            {tasks
              .filter(task => task.type === 'location')
              .map(task => renderTaskCard(task))
            }
          </div>
        </TabsContent>

        <TabsContent value="digital" className="space-y-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h3 className="font-semibold text-blue-800 mb-1">🌍 Global Digital Tasks</h3>
            <p className="text-sm text-blue-700">ঘরে বসে যেকোনো সময় করতে পারবেন</p>
          </div>
          
          <div className="grid gap-4">
            {tasks
              .filter(task => task.type === 'digital')
              .map(task => renderTaskCard(task))
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
