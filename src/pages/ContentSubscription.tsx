
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Book, 
  Music, 
  Video, 
  Star, 
  Users, 
  Clock,
  Download,
  CheckCircle
} from 'lucide-react';

const ContentSubscription = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'ওয়েব ডেভেলপমেন্ট কোর্স',
      instructor: 'জাহিদ হাসান',
      price: '৩,৫০০',
      originalPrice: '৫,০০০',
      rating: 4.8,
      students: 1234,
      duration: '৮ সপ্তাহ',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300',
      category: 'প্রযুক্তি'
    },
    {
      id: 2,
      title: 'ডিজিটাল মার্কেটিং',
      instructor: 'সাবিনা আক্তার',
      price: '২,৮০০',
      originalPrice: '৪,০০০',
      rating: 4.6,
      students: 892,
      duration: '৬ সপ্তাহ',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
      category: 'ব্যবসা'
    }
  ];

  const ebooks = [
    {
      id: 1,
      title: 'প্রোগ্রামিং শেখার গাইড',
      author: 'আহমেদ করিম',
      price: '৫০০',
      rating: 4.7,
      pages: 250,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300'
    },
    {
      id: 2,
      title: 'ব্যবসায়িক কৌশল',
      author: 'ফারহানা বেগম',
      price: '৭০০',
      rating: 4.5,
      pages: 180,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300'
    }
  ];

  const audiobooks = [
    {
      id: 1,
      title: 'সফলতার রহস্য',
      narrator: 'রফিক উদ্দিন',
      price: '৩০০',
      rating: 4.4,
      duration: '৪ ঘন্টা',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'ফটোগ্রাফি টিউটোরিয়াল',
      creator: 'সাইফুল ইসলাম',
      price: '১,২০০',
      rating: 4.9,
      duration: '৩ ঘন্টা',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">কনটেন্ট সাবস্ক্রিপশন</h1>
          <p className="text-muted-foreground">
            কোর্স, ই-বুক, অডিওবুক এবং ভিডিও কনটেন্ট কিনুন ও শিখুন
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              কোর্স
            </TabsTrigger>
            <TabsTrigger value="ebooks" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              ই-বুক
            </TabsTrigger>
            <TabsTrigger value="audiobooks" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              অডিওবুক
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              ভিডিও
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{course.category}</Badge>
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      শিক্ষক: {course.instructor}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">৳{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ৳{course.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      এনরোল করুন
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ebooks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ebooks.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-100">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      লেখক: {book.author}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {book.rating}
                      </div>
                      <span>{book.pages} পৃষ্ঠা</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-green-600">৳{book.price}</span>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      কিনুন
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audiobooks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiobooks.map((audiobook) => (
                <Card key={audiobook.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src={audiobook.image} 
                      alt={audiobook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{audiobook.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      কণ্ঠদাতা: {audiobook.narrator}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {audiobook.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {audiobook.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-green-600">৳{audiobook.price}</span>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      কিনুন
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img 
                      src={video.image} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      নির্মাতা: {video.creator}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {video.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-green-600">৳{video.price}</span>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      কিনুন
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentSubscription;
