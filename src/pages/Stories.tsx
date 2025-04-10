
import React, { useState } from 'react';
import { PlusCircle, Heart, MessageSquare, Share2, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import StoryCard from '@/components/story/StoryCard';
import CreateStoryModal from '@/components/story/CreateStoryModal';
import { mockStories } from '@/data/mock-stories';

const Stories = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState(mockStories);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleLike = (storyId: string) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.isLiked ? story.likes - 1 : story.likes + 1, isLiked: !story.isLiked }
          : story
      )
    );
  };

  const handleCreateStory = (newStory: any) => {
    const storyWithId = {
      ...newStory,
      id: `story-${Date.now()}`,
      author: user?.name || 'আকাশ আহমেদ',
      authorAvatar: user?.avatar || 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setStories([storyWithId, ...stories]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "স্টোরি শেয়ার করা হয়েছে",
      description: "আপনার স্টোরি সফলভাবে পোস্ট করা হয়েছে।",
    });
  };

  const filteredStories = stories.filter(story => {
    if (activeTab === 'all') return true;
    if (activeTab === 'following') return story.isFollowing;
    if (activeTab === 'popular') return story.likes > 5;
    if (activeTab === 'mine' && user) return story.author === user.name;
    return true;
  });

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">অভিজ্ঞতা শেয়ার করুন</h1>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">সকল স্টোরি</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">ফলোয়িং</TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">জনপ্রিয়</TabsTrigger>
          {user && <TabsTrigger value="mine" className="flex-1">আমার স্টোরিস</TabsTrigger>}
        </TabsList>
      </Tabs>

      <Button 
        onClick={() => setIsCreateModalOpen(true)}
        className="w-full mb-6 gap-2"
      >
        <PlusCircle className="h-5 w-5" />
        নতুন স্টোরি শেয়ার করুন
      </Button>

      <div className="space-y-6">
        {filteredStories.length > 0 ? (
          filteredStories.map(story => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onLike={handleLike} 
            />
          ))
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">এই ক্যাটাগরিতে কোন স্টোরি নেই।</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsCreateModalOpen(true)}
            >
              প্রথম স্টোরি তৈরি করুন
            </Button>
          </div>
        )}
      </div>

      <CreateStoryModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateStory}
      />
    </div>
  );
};

export default Stories;
