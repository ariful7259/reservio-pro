import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  // Mock contacts list
  const contacts = [
    { id: 1, name: 'আহমেদ ভাই', avatar: '/placeholder.svg' },
    { id: 2, name: 'সারা আপু', avatar: '/placeholder.svg' },
    { id: 3, name: 'করিম সাহেব', avatar: '/placeholder.svg' },
    { id: 4, name: 'রহিম উদ্দিন', avatar: '/placeholder.svg' },
    { id: 5, name: 'ফাতেমা খাতুন', avatar: '/placeholder.svg' },
  ];

  const handleMemberToggle = (memberId: number) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      // Handle group creation logic
      console.log('Creating group:', {
        name: groupName,
        description: groupDescription,
        members: selectedMembers,
      });
      onOpenChange(false);
      setGroupName('');
      setGroupDescription('');
      setSelectedMembers([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            নতুন গ্রুপ তৈরি করুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Group Name */}
          <div className="space-y-2">
            <Label htmlFor="groupName">গ্রুপের নাম *</Label>
            <Input
              id="groupName"
              placeholder="গ্রুপের নাম দিন..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Group Description */}
          <div className="space-y-2">
            <Label htmlFor="groupDescription">গ্রুপের বর্ণনা</Label>
            <Textarea
              id="groupDescription"
              placeholder="গ্রুপ সম্পর্কে লিখুন..."
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Member Selection */}
          <div className="space-y-2">
            <Label>সদস্য নির্বাচন করুন ({selectedMembers.length} জন)</Label>
            <ScrollArea className="h-[200px] border rounded-md p-2">
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <Checkbox
                      id={`member-${contact.id}`}
                      checked={selectedMembers.includes(contact.id)}
                      onCheckedChange={() => handleMemberToggle(contact.id)}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Label
                      htmlFor={`member-${contact.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      {contact.name}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              বাতিল
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedMembers.length === 0}
            >
              গ্রুপ তৈরি করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};