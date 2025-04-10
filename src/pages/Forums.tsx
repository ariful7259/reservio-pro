
import React, { useState } from 'react';
import { MessageSquare, Users, Star, Filter, Search, PlusCircle, ChevronUp, ChevronDown, Heart, Reply, Share2, Flag, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { mockDiscussions } from '@/data/mock-discussions';

const Forums = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedDiscussions, setExpandedDiscussions] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category: ''
  });
  
  const filteredDiscussions = discussions.filter(discussion => {
    if (searchQuery) {
      return (
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab === 'all') return true;
    if (activeTab === 'popular') return discussion.likes > 5;
    if (activeTab === 'unanswered') return discussion.replies.length === 0;
    if (activeTab === 'mine' && user) return discussion.author.id === user.id;
    return true;
  });
  
  const handleExpandDiscussion = (id: string) => {
    if (expandedDiscussions.includes(id)) {
      setExpandedDiscussions(expandedDiscussions.filter(discId => discId !== id));
    } else {
      setExpandedDiscussions([...expandedDiscussions, id]);
    }
  };
  
  const handleReply = (discussionId: string) => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "মন্তব্য করতে লগইন করুন।",
      });
      return;
    }
    
    if (!replyText.trim()) {
      toast({
        title: "খালি মন্তব্য",
        description: "দয়া করে মন্তব্য লিখুন।",
      });
      return;
    }
    
    const newReply = {
      id: `reply-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://i.pravatar.cc/150?img=1'
      },
      content: replyText,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, replies: [...discussion.replies, newReply] }
          : discussion
      )
    );
    
    setReplyingTo(null);
    setReplyText('');
    
    toast({
      title: "মন্তব্য করা হয়েছে",
      description: "আপনার মন্তব্য সফলভাবে পোস্ট করা হয়েছে।",
    });
  };
  
  const handleLike = (discussionId: string) => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "লাইক করতে লগইন করুন।",
      });
      return;
    }
    
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId 
          ? { 
              ...discussion, 
              likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
              isLiked: !discussion.isLiked
            }
          : discussion
      )
    );
  };
  
  const handleLikeReply = (discussionId: string, replyId: string) => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "লাইক করতে লগইন করুন।",
      });
      return;
    }
    
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId 
          ? { 
              ...discussion, 
              replies: discussion.replies.map(reply => 
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked
                    }
                  : reply
              )
            }
          : discussion
      )
    );
  };
  
  const handleCreateTopic = () => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "টপিক তৈরি করতে লগইন করুন।",
      });
      return;
    }
    
    if (!newTopic.title.trim() || !newTopic.content.trim() || !newTopic.category) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "সব তথ্য পূরণ করুন।",
      });
      return;
    }
    
    const discussion = {
      id: `discussion-${Date.now()}`,
      title: newTopic.title,
      content: newTopic.content,
      category: newTopic.category,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://i.pravatar.cc/150?img=1'
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
      views: 0,
      isLiked: false,
      isStarred: false
    };
    
    setDiscussions([discussion, ...discussions]);
    
    toast({
      title: "টপিক তৈরি হয়েছে",
      description: "আপনার টপিক সফলভাবে তৈরি হয়েছে।",
    });
    
    setIsCreateModalOpen(false);
    setNewTopic({
      title: '',
      content: '',
      category: ''
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bn-BD', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">কমিউনিটি ফোরাম</h1>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">সকল আলোচনা</TabsTrigger>
                <TabsTrigger value="popular" className="flex-1">জনপ্রিয়</TabsTrigger>
                <TabsTrigger value="unanswered" className="flex-1">উত্তরহীন</TabsTrigger>
                {user && <TabsTrigger value="mine" className="flex-1">আমার টপিক</TabsTrigger>}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center mb-6 gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="টপিক খুঁজুন..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              নতুন টপিক
            </Button>
          </div>
          
          {isFiltersOpen && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ক্যাটাগরি</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সব ক্যাটাগরি" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                        <SelectItem value="general">সাধারণ আলোচনা</SelectItem>
                        <SelectItem value="tech">টেকনোলজি</SelectItem>
                        <SelectItem value="lifestyle">লাইফস্টাইল</SelectItem>
                        <SelectItem value="career">ক্যারিয়ার</SelectItem>
                        <SelectItem value="education">শিক্ষা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">সর্ট করুন</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="নতুন থেকে পুরানো" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">নতুন থেকে পুরানো</SelectItem>
                        <SelectItem value="old">পুরানো থেকে নতুন</SelectItem>
                        <SelectItem value="popular">সবচেয়ে জনপ্রিয়</SelectItem>
                        <SelectItem value="replies">সর্বাধিক উত্তর</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">সময়কাল</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সব সময়" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব সময়</SelectItem>
                        <SelectItem value="today">আজ</SelectItem>
                        <SelectItem value="week">এই সপ্তাহ</SelectItem>
                        <SelectItem value="month">এই মাস</SelectItem>
                        <SelectItem value="year">এই বছর</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map(discussion => (
                <Card key={discussion.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <Badge className="mb-2">{discussion.category}</Badge>
                        <h3 className="text-lg font-semibold">{discussion.title}</h3>
                      </div>
                      <div className="flex flex-col gap-1 sm:items-end">
                        <div className="text-sm text-muted-foreground">
                          {formatDate(discussion.timestamp)}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{discussion.author.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Author
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-4">{discussion.content}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant={discussion.isLiked ? "default" : "outline"} 
                        size="sm"
                        className="gap-2"
                        onClick={() => handleLike(discussion.id)}
                      >
                        <Heart className={`h-4 w-4 ${discussion.isLiked ? 'fill-white' : ''}`} />
                        <span>{discussion.isLiked ? 'লাইক করা হয়েছে' : 'লাইক'}</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          handleExpandDiscussion(discussion.id);
                          setReplyingTo(replyingTo === discussion.id ? null : discussion.id);
                        }}
                      >
                        <Reply className="h-4 w-4" />
                        <span>উত্তর দিন</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          setDiscussions(prevDiscussions => 
                            prevDiscussions.map(d => 
                              d.id === discussion.id 
                                ? { ...d, isStarred: !d.isStarred } 
                                : d
                            )
                          );
                        }}
                      >
                        <BookmarkPlus className={`h-4 w-4 ${discussion.isStarred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        <span>{discussion.isStarred ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>শেয়ার</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="gap-2 ml-auto"
                      >
                        <Flag className="h-4 w-4" />
                        <span>রিপোর্ট</span>
                      </Button>
                    </div>
                    
                    {replyingTo === discussion.id && (
                      <div className="mt-4 border p-3 rounded-md">
                        <Textarea 
                          placeholder="আপনার উত্তর লিখুন..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="mb-3"
                        />
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                          >
                            বাতিল
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleReply(discussion.id)}
                          >
                            জমা দিন
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {discussion.replies.length > 0 && (
                      <div className="mt-4">
                        <Button 
                          variant="ghost" 
                          className="w-full flex items-center justify-center gap-2 text-muted-foreground"
                          onClick={() => handleExpandDiscussion(discussion.id)}
                        >
                          {expandedDiscussions.includes(discussion.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              <span>উত্তর সংকুচিত করুন</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              <span>{discussion.replies.length} উত্তর দেখুন</span>
                            </>
                          )}
                        </Button>
                        
                        {expandedDiscussions.includes(discussion.id) && (
                          <div className="mt-2 space-y-4 pl-10 border-l-2 border-muted">
                            {discussion.replies.map(reply => (
                              <div key={reply.id} className="pt-2">
                                <div className="flex items-start gap-3 mb-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                    <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{reply.author.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(reply.timestamp)}
                                      </span>
                                    </div>
                                    <p className="mt-1">{reply.content}</p>
                                    <div className="flex gap-3 mt-2">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-7 px-2 text-xs gap-1"
                                        onClick={() => handleLikeReply(discussion.id, reply.id)}
                                      >
                                        <Heart className={`h-3 w-3 ${reply.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                        <span>{reply.likes}</span>
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-7 px-2 text-xs gap-1"
                                        onClick={() => {
                                          setReplyingTo(discussion.id);
                                          setReplyText(`@${reply.author.name} `);
                                        }}
                                      >
                                        <Reply className="h-3 w-3" />
                                        <span>উত্তর দিন</span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">কোন আলোচনা পাওয়া যায়নি।</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  প্রথম টপিক তৈরি করুন
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card className="mb-6">
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold">জনপ্রিয় ক্যাটাগরি</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  সাধারণ আলোচনা
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  টেকনোলজি
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  লাইফস্টাইল
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  ক্যারিয়ার
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  শিক্ষা
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  ভ্রমণ
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  স্বাস্থ্য
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  ব্যবসা
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold">জনপ্রিয় টপিক</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {discussions
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 5)
                  .map(discussion => (
                    <div 
                      key={discussion.id} 
                      className="flex items-start gap-2 pb-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 p-1 rounded-sm"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{discussion.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{discussion.replies.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold">সক্রিয় ব্যবহারকারী</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {[...new Set(discussions.map(d => d.author.id))]
                  .slice(0, 5)
                  .map(userId => {
                    const author = discussions.find(d => d.author.id === userId)?.author;
                    if (!author) return null;
                    
                    return (
                      <div 
                        key={userId} 
                        className="flex items-center gap-2 pb-2 border-b last:border-0"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={author.avatar} alt={author.name} />
                          <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{author.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {discussions.filter(d => d.author.id === userId).length} টপিক
                          </div>
                        </div>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>নতুন টপিক তৈরি করুন</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium mb-2">শিরোনাম</label>
              <Input 
                value={newTopic.title}
                onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                placeholder="আপনার আলোচনার একটি সংক্ষিপ্ত ও স্পষ্ট শিরোনাম দিন"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">ক্যাটাগরি</label>
              <Select 
                onValueChange={(value) => setNewTopic({...newTopic, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সাধারণ আলোচনা">সাধারণ আলোচনা</SelectItem>
                  <SelectItem value="টেকনোলজি">টেকনোলজি</SelectItem>
                  <SelectItem value="লাইফস্টাইল">লাইফস্টাইল</SelectItem>
                  <SelectItem value="ক্যারিয়ার">ক্যারিয়ার</SelectItem>
                  <SelectItem value="শিক্ষা">শিক্ষা</SelectItem>
                  <SelectItem value="ভ্রমণ">ভ্রমণ</SelectItem>
                  <SelectItem value="স্বাস্থ্য">স্বাস্থ্য</SelectItem>
                  <SelectItem value="ব্যবসা">ব্যবসা</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">বিবরণ</label>
              <Textarea 
                value={newTopic.content}
                onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                placeholder="আপনার আলোচনার বিস্তারিত লিখুন..."
                rows={8}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              বাতিল
            </Button>
            <Button onClick={handleCreateTopic}>
              টপিক তৈরি করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forums;
