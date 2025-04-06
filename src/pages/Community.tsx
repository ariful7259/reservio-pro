
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Calendar, Users, Share2, ChevronRight, Bell, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Community = () => {
  const navigate = useNavigate();
  
  const communityFeatures = [
    {
      title: 'ইভেন্ট ক্যালেন্ডার',
      description: 'কমিউনিটি ইভেন্টস দেখুন ও জয়েন করুন',
      icon: <Calendar className="h-6 w-6" />,
      path: '/community/events',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'ফোরাম/ডিসকাশন',
      description: 'কমিউনিটি সদস্যদের সাথে আলোচনা করুন',
      icon: <MessageSquare className="h-6 w-6" />,
      path: '/community/forum',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'গ্রুপ বুকিং',
      description: 'একসাথে সার্ভিস বুক করে ডিসকাউন্ট পান',
      icon: <Users className="h-6 w-6" />,
      path: '/community/group-booking',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'শেয়ারিং',
      description: 'সোশ্যাল মিডিয়াতে প্রোডাক্ট/সার্ভিস শেয়ার করুন',
      icon: <Share2 className="h-6 w-6" />,
      path: '/community/social-sharing',
      color: 'bg-amber-100 text-amber-600'
    },
    {
      title: 'রেফারেল সিস্টেম',
      description: 'বন্ধুদের রেফার করে রিওয়ার্ড পান',
      icon: <Award className="h-6 w-6" />,
      path: '/referral',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'সাবস্ক্রিপশন',
      description: 'নিয়মিত আপডেট পেতে সাবস্ক্রাইব করুন',
      icon: <Bell className="h-6 w-6" />,
      path: '/community/subscriptions',
      color: 'bg-rose-100 text-rose-600'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'টেক মিটআপ ২০২৫',
      date: '১৫ এপ্রিল',
      location: 'ঢাকা',
      category: 'টেকনোলজি',
      attendees: 45
    },
    {
      id: '2',
      title: 'আর্টস অ্যান্ড ক্রাফট ওয়ার্কশপ',
      date: '২২ এপ্রিল',
      location: 'ঢাকা',
      category: 'আর্ট',
      attendees: 18
    },
    {
      id: '3',
      title: 'কমিউনিটি গার্ডেনিং ডে',
      date: '৩০ এপ্রিল',
      location: 'গুলশান',
      category: 'কমিউনিটি',
      attendees: 28
    }
  ];

  const recentDiscussions = [
    {
      id: '1',
      title: 'ঢাকায় সেরা কোওয়ার্কিং স্পেস কোনগুলো?',
      author: 'আশরাফুল ইসলাম',
      replies: 12,
      category: 'পরামর্শ'
    },
    {
      id: '2',
      title: 'পরিবেশ বাঁচাতে প্লাস্টিক দূষণ কমানোর উপায়',
      author: 'সাবরিনা আহমেদ',
      replies: 28,
      category: 'পরিবেশ'
    },
    {
      id: '3',
      title: 'শহরে খাবারের জন্য বাগান করার টিপস',
      author: 'রিফাত হোসেন',
      replies: 15,
      category: 'গার্ডেনিং'
    }
  ];

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">কমিউনিটি</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {communityFeatures.map((feature, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => navigate(feature.path)}
          >
            <CardContent className="flex flex-col items-center text-center p-4">
              <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-3`}>
                {feature.icon}
              </div>
              <CardTitle className="text-base mb-1">{feature.title}</CardTitle>
              <CardDescription className="text-xs">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">আসন্ন ইভেন্টস</h2>
          <Button variant="ghost" size="sm" className="text-sm" onClick={() => navigate('/community/events')}>
            সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate(`/community/events`)}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-1">{event.category}</Badge>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.date} • {event.location}</span>
                      <div className="mx-2">•</div>
                      <Users className="h-3 w-3 mr-1" />
                      <span>{event.attendees} জন</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">সাম্প্রতিক আলোচনা</h2>
          <Button variant="ghost" size="sm" className="text-sm" onClick={() => navigate('/community/forum')}>
            সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentDiscussions.map((discussion) => (
            <Card key={discussion.id} className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate(`/community/forum`)}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-1">{discussion.category}</Badge>
                    <h3 className="font-medium">{discussion.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>by {discussion.author}</span>
                      <div className="mx-2">•</div>
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{discussion.replies} উত্তর</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/20">
        <CardContent className="p-5">
          <div className="flex flex-col items-center justify-center text-center">
            <Award className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="mb-2">বন্ধুদের আমন্ত্রণ জানান</CardTitle>
            <CardDescription className="mb-4">
              বন্ধুদের রেফার করে পয়েন্টস অর্জন করুন এবং আকর্ষণীয় পুরস্কার জিতুন
            </CardDescription>
            <Button className="w-full" onClick={() => navigate('/referral')}>
              রেফারেল পাঠান
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;
