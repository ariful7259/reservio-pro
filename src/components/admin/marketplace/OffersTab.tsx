
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Upload
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock offers
const offers = [
  { id: 1, name: 'ঈদ মেগা অফার', discount: '৩০%', start: '১৫ মে, ২০২৩', end: '২৫ মে, ২০২৩', status: 'সক্রিয়', products: 120 },
  { id: 2, name: 'গ্রীষ্মকালীন সেল', discount: '২৫%', start: '১ জুন, ২০২৩', end: '১৫ জুন, ২০২৩', status: 'সমাপ্ত', products: 85 },
  { id: 3, name: 'শীতকালীন অফার', discount: '২০%', start: '১ ডিসেম্বর, ২০২৩', end: '১৫ ডিসেম্বর, ২০২৩', status: 'আসন্ন', products: 0 },
];

const OffersTab = () => {
  const { toast } = useToast();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const handleOfferAction = (action: string, offerId: number) => {
    // Handle offer actions (edit, delete, activate, deactivate)
    const offer = offers.find(o => o.id === offerId);
    
    if (action === 'edit') {
      setSelectedOffer(offer);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "অফার মুছে ফেলা হয়েছে",
        description: `${offer?.name} অফার সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    } else if (action === 'activate') {
      toast({
        title: "অফার সক্রিয় করা হয়েছে",
        description: `${offer?.name} অফার সক্রিয় করা হয়েছে।`,
      });
    } else if (action === 'deactivate') {
      toast({
        title: "অফার নিষ্ক্রিয় করা হয়েছে",
        description: `${offer?.name} অফার নিষ্ক্রিয় করা হয়েছে।`,
        variant: "warning",
      });
    }
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding offer would go here
    toast({
      title: "নতুন অফার যোগ করা হয়েছে",
      description: "অফার সফলভাবে যোগ করা হয়েছে।",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">স্পেশাল অফার</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              নতুন অফার
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন অফার যোগ করুন</DialogTitle>
              <DialogDescription>
                অফারের বিবরণ দিন। অফারের নাম, ডিসকাউন্ট এবং সময়সীমা নির্ধারণ করুন।
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddOffer}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-name" className="text-right">
                    অফারের নাম
                  </Label>
                  <Input
                    id="offer-name"
                    placeholder="অফারের নাম লিখুন"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-discount" className="text-right">
                    ডিসকাউন্ট (%)
                  </Label>
                  <Input
                    id="offer-discount"
                    type="number"
                    placeholder="ডিসকাউন্ট শতাংশ"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-banner" className="text-right">
                    ব্যানার
                  </Label>
                  <div className="col-span-3">
                    <Button variant="outline" className="w-full" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      ব্যানার আপলোড করুন
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-start" className="text-right">
                    শুরুর তারিখ
                  </Label>
                  <Input
                    id="offer-start"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-end" className="text-right">
                    শেষের তারিখ
                  </Label>
                  <Input
                    id="offer-end"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="offer-desc" className="text-right pt-2">
                    বিবরণ
                  </Label>
                  <Textarea
                    id="offer-desc"
                    placeholder="অফারের বিবরণ লিখুন"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    বাতিল
                  </Button>
                </DialogClose>
                <Button type="submit">সংরক্ষণ করুন</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>অফারের নাম</TableHead>
                <TableHead>ডিসকাউন্ট</TableHead>
                <TableHead>সময়সীমা</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead>প্রোডাক্ট</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.name}</TableCell>
                  <TableCell>{offer.discount}</TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground">
                      <div>শুরু: {offer.start}</div>
                      <div>শেষ: {offer.end}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      offer.status === 'সক্রিয়' ? 'default' : 
                      offer.status === 'আসন্ন' ? 'warning' : 
                      'outline'
                    }>
                      {offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{offer.products}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOfferAction('edit', offer.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {offer.status === 'সক্রিয়' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOfferAction('deactivate', offer.id)}
                          className="text-amber-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      ) : offer.status === 'আসন্ন' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOfferAction('activate', offer.id)}
                          className="text-green-600"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOfferAction('delete', offer.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersTab;
