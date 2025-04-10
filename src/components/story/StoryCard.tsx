
import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    author: string;
    authorAvatar: string;
    createdAt: string;
    categories: string[];
    images?: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    isFollowing?: boolean;
  };
  onLike: (storyId: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onLike }) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  
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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.content.substring(0, 100) + '...',
        url: window.location.href
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      toast({
        title: "শেয়ারিং অপশন নেই",
        description: "আপনার ডিভাইসে শেয়ারিং অপশন সাপোর্ট করে না।",
      });
    }
  };
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const truncateContent = (content: string) => {
    if (content.length <= 150 || expanded) return content;
    return content.substring(0, 150) + '...';
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={story.authorAvatar} alt={story.author} />
              <AvatarFallback>{story.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{story.author}</div>
              <div className="text-xs text-muted-foreground">{formatDate(story.createdAt)}</div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>রিপোর্ট করুন</DropdownMenuItem>
              <DropdownMenuItem>সেভ করুন</DropdownMenuItem>
              <DropdownMenuItem>শেয়ার করুন</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-2">{story.title}</h3>
        <p className="mb-3">{truncateContent(story.content)}</p>
        
        {story.content.length > 150 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand} 
            className="flex items-center text-muted-foreground text-sm px-0 mb-2"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> কম দেখুন
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> আরো দেখুন
              </>
            )}
          </Button>
        )}
        
        {story.images && story.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {story.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Story image ${index}`} 
                className="rounded-lg w-full h-48 object-cover"
              />
            ))}
          </div>
        )}
        
        {story.categories && story.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {story.categories.map(category => (
              <Badge key={category} variant="outline">{category}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onLike(story.id)}
          >
            <Heart 
              className={`h-5 w-5 ${story.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span>{story.likes}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span>{story.comments}</span>
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          <span>শেয়ার</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
