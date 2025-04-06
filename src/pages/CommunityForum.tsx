
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MessageSquare, Heart, Share2, Plus, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  tags: string[];
};

const CommunityForum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'ঢাকায় সেরা কোওয়ার্কিং স্পেস কোনগুলো?',
      content: 'আমি একজন ফ্রিল্যান্সার, ঢাকায় নতুন এসেছি। ভাল কোওয়ার্কিং স্পেস খুঁজছি যেখানে ভাল ইন্টারনেট আছে এবং দাম সাশ্রয়ী। কারও কাছে কোন সুপারিশ আছে?',
      author: {
        name: 'আশরাফুল ইসলাম',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      date: '৩ ঘন্টা আগে',
      likes: 24,
      comments: 12,
      category: 'পরামর্শ',
      isLiked: false,
      tags: ['কোওয়ার্কিং', 'ফ্রিল্যান্সিং', 'ঢাকা']
    },
    {
      id: '2',
      title: 'পরিবেশ বাঁচাতে প্লাস্টিক দূষণ কমানোর উপায়',
      content: 'প্লাস্টিক দূষণ আমাদের পরিবেশের জন্য বিরাট হুমকি। আমরা কীভাবে প্লাস্টিক ব্যবহার কমাতে পারি এবং বিকল্প ব্যবহার করতে পারি সে বিষয়ে আপনাদের মতামত কী?',
      author: {
        name: 'সাবরিনা আহমেদ',
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      date: '১ দিন আগে',
      likes: 56,
      comments: 28,
      category: 'পরিবেশ',
      isLiked: true,
      tags: ['পরিবেশ', 'প্লাস্টিক দূষণ', 'সাস্টেইনেবিলিটি']
    },
    {
      id: '3',
      title: 'শহরে খাবারের জন্য বাগান করার টিপস',
      content: 'শহরের অ্যাপার্টমেন্টে নিজের খাবার উৎপাদন করার জন্য বাগান করতে চাই। সীমিত জায়গায় ভার্টিকাল গার্ডেনিং সম্পর্কে কেউ জানেন?',
      author: {
        name: 'রিফাত হোসেন',
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      date: '৩ দিন আগে',
      likes: 32,
      comments: 15,
      category: 'গার্ডেনিং',
      isLiked: false,
      tags: ['গার্ডেনিং', 'অ্যাপার্টমেন্ট লিভিং', 'খাদ্য উৎপাদন']
    },
    {
      id: '4',
      title: 'সস্তায় ট্রাভেল করার ট্রিকস শেয়ার করুন',
      content: 'আমি সীমিত বাজেটে বাংলাদেশের বিভিন্ন দর্শনীয় স্থান ঘুরতে চাই। সস্তায় ভ্রমণ করার জন্য আপনাদের টিপস অথবা ট্রিকস শেয়ার করলে উপকৃত হবো।',
      author: {
        name: 'তানিয়া রহমান',
        avatar: 'https://i.pravatar.cc/150?img=29'
      },
      date: '১ সপ্তাহ আগে',
      likes: 87,
      comments: 45,
      category: 'ট্রাভেল',
      isLiked: false,
      tags: ['ট্রাভেল', 'বাজেট ট্রাভেল', 'পর্যটন']
    }
  ]);

  const toggleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } 
          : post
      )
    );
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularPosts = [...filteredPosts].sort((a, b) => b.likes - a.likes);
  const recentPosts = [...filteredPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
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
        <h1 className="text-xl font-semibold">কমিউনিটি ফোরাম</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="পোস্ট সার্চ করুন..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="popular">জনপ্রিয়</TabsTrigger>
          <TabsTrigger value="recent">সাম্প্রতিক</TabsTrigger>
          <TabsTrigger value="my-posts">আমার পোস্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-4">
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">#{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={post.isLiked ? "text-primary" : ""}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/community/forum/post/${post.id}`)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    শেয়ার
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">কোন পোস্ট পাওয়া যায়নি</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">#{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={post.isLiked ? "text-primary" : ""}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/community/forum/post/${post.id}`)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    শেয়ার
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">কোন পোস্ট পাওয়া যায়নি</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-posts">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">আপনি এখনও কোন পোস্ট করেননি</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>নতুন পোস্ট করুন</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>নতুন আলোচনা শুরু করুন</DialogTitle>
                  <DialogDescription>
                    আপনার প্রশ্ন বা মতামত শেয়ার করুন, কমিউনিটির সদস্যরা সাহায্য করবে।
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">শিরোনাম</label>
                    <Input placeholder="আপনার পোস্টের শিরোনাম লিখুন" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">বিবরণ</label>
                    <Textarea placeholder="বিস্তারিত লিখুন..." className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ক্যাটাগরি</label>
                    <Input placeholder="ক্যাটাগরি (যেমন: টেকনোলজি, লাইফস্টাইল)" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ট্যাগস</label>
                    <Input placeholder="টপিক সম্পর্কিত ট্যাগস (কমা দিয়ে আলাদা করুন)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    toast({
                      title: "পোস্ট সফল",
                      description: "আপনার পোস্টটি সফলভাবে তৈরি করা হয়েছে",
                    });
                  }}>পোস্ট করুন</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        className="fixed bottom-20 right-4 rounded-full shadow-lg"
        onClick={() => {
          const dialogTrigger = document.querySelector('[data-state="closed"]') as HTMLButtonElement;
          if (dialogTrigger) dialogTrigger.click();
        }}
      >
        <Plus className="mr-2 h-4 w-4" /> নতুন পোস্ট
      </Button>
    </div>
  );
};

export default CommunityForum;
