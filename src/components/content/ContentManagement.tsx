
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Video, 
  Search, 
  Plus, 
  CheckCircle,
  Clock,
  FileText,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const contents = [
    { 
      id: 'C1001', 
      title: 'ফ্রি ওয়েব ডেভেলপমেন্ট কোর্স', 
      type: 'টিউটোরিয়াল', 
      duration: '৪৫ মিনিট', 
      views: '২,৫৬০',
      status: 'published',
      publishedAt: '২ দিন আগে'
    },
    { 
      id: 'C1002', 
      title: 'ডিজিটাল মার্কেটিং সেশন', 
      type: 'ওয়েবিনার', 
      duration: '৬০ মিনিট', 
      views: '১,২৩০',
      status: 'published',
      publishedAt: '৩ দিন আগে'
    },
    { 
      id: 'C1003', 
      title: 'মোবাইল অ্যাপ ডেভেলপমেন্ট', 
      type: 'টিউটোরিয়াল', 
      duration: '৩০ মিনিট', 
      views: '৮৯০',
      status: 'published',
      publishedAt: '৫ দিন আগে'
    },
    { 
      id: 'C1004', 
      title: 'গ্রাফিক ডিজাইন মাস্টারক্লাস', 
      type: 'কোর্স', 
      duration: '১২০ মিনিট', 
      views: '৩,২১০',
      status: 'scheduled',
      publishedAt: 'আগামীকাল'
    },
    { 
      id: 'C1005', 
      title: 'ইকমার্স বিজনেস টিপস', 
      type: 'পডকাস্ট', 
      duration: '২৫ মিনিট', 
      views: '৫৬০',
      status: 'scheduled',
      publishedAt: 'আগামী সপ্তাহে'
    },
    { 
      id: 'C1006', 
      title: 'সোশ্যাল মিডিয়া স্ট্র্যাটেজি', 
      type: 'ব্লগ', 
      duration: '৮ মিনিট পড়া', 
      views: '-',
      status: 'draft',
      publishedAt: 'প্রকাশিত হয়নি'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            প্রকাশিত
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            শিডিউলড
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800 hover:bg-slate-200">
            <FileText className="h-3 w-3 mr-1" />
            ড্রাফট
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">কন্টেন্ট ব্যবস্থাপনা</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          নতুন কন্টেন্ট যোগ করুন
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="কন্টেন্ট খুঁজুন..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 sm:flex gap-2 w-full sm:w-auto">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('all')}
            className="justify-start"
          >
            <FileText className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">সব</span>
            <span className="ml-1">(৬)</span>
          </Button>
          <Button 
            variant={activeTab === 'published' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('published')}
            className="justify-start"
          >
            <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">প্রকাশিত</span>
            <span className="ml-1">(৩)</span>
          </Button>
          <Button 
            variant={activeTab === 'draft' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('draft')}
            className="justify-start"
          >
            <Clock className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">ড্রাফট</span>
            <span className="ml-1">(৩)</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>কন্টেন্ট আইডি</TableHead>
              <TableHead>টাইটেল</TableHead>
              <TableHead>টাইপ</TableHead>
              <TableHead>দৈর্ঘ্য</TableHead>
              <TableHead>ভিউ</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead>প্রকাশিত</TableHead>
              <TableHead className="text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.id}</TableCell>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>{content.duration}</TableCell>
                <TableCell>{content.views}</TableCell>
                <TableCell>{getStatusBadge(content.status)}</TableCell>
                <TableCell>{content.publishedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <span>প্রিভিউ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        <span>এডিট</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        <span>ডিলিট</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContentManagement;
