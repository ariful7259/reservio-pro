
import React from 'react';
import { 
  Wrench, 
  MoreHorizontal,
  Eye,
  Edit,
  Calendar,
  Copy,
  Trash2,
  Star 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  status: string;
  rating: string;
  bookings: string;
}

interface ServiceTableProps {
  services: Service[];
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services }) => {
  const isMobile = useIsMobile();
  
  if (services.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <Wrench className="h-8 w-8 mb-2" />
          <p>কোন সার্ভিস পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">অ্যাকটিভ</Badge>;
      case 'paused':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">পজ করা</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">ড্রাফট</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    // সিম্পলিসিটির জন্য সব ক্যাটেগরিতে Wrench আইকন ব্যবহার করছি
    return <Wrench className="h-5 w-5 text-primary" />;
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    {getCategoryIcon(service.category)}
                  </div>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">{service.category}</div>
                  </div>
                </div>
                <div>{getStatusBadge(service.status)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">মূল্য</span>
                  <span className="font-medium">৳{service.price}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">সময়কাল</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">রেটিং</span>
                  <span className="font-medium flex items-center">
                    {service.rating !== '-' ? (
                      <><Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" /> {service.rating}</>
                    ) : (
                      '-'
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">বুকিং</span>
                  <span className="font-medium">{service.bookings}</span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 border-t pt-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="h-4 w-4 mr-2" />
                      বিস্তারিত দেখুন
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      এডিট করুন
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Calendar className="h-4 w-4 mr-2" />
                      শিডিউল আপডেট
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Copy className="h-4 w-4 mr-2" />
                      ডুপ্লিকেট করুন
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                      <Trash2 className="h-4 w-4 mr-2" />
                      ডিলিট করুন
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>সার্ভিস</TableHead>
            <TableHead>ক্যাটেগরি</TableHead>
            <TableHead>মূল্য</TableHead>
            <TableHead>সময়কাল</TableHead>
            <TableHead>রেটিং</TableHead>
            <TableHead>বুকিং</TableHead>
            <TableHead>স্ট্যাটাস</TableHead>
            <TableHead className="text-right">অ্যাকশন</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    {getCategoryIcon(service.category)}
                  </div>
                  <div className="font-medium">{service.name}</div>
                </div>
              </TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>৳{service.price}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>
                {service.rating !== '-' ? (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                    <span>{service.rating}</span>
                  </div>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{service.bookings}</TableCell>
              <TableCell>{getStatusBadge(service.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="h-4 w-4 mr-2" />
                      বিস্তারিত দেখুন
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      এডিট করুন
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Calendar className="h-4 w-4 mr-2" />
                      শিডিউল আপডেট
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Copy className="h-4 w-4 mr-2" />
                      ডুপ্লিকেট করুন
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                      <Trash2 className="h-4 w-4 mr-2" />
                      ডিলিট করুন
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceTable;
