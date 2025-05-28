
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import { LinkInBioData } from './types';

interface LinkInBioFormProps {
  linkInBioData: LinkInBioData;
  setLinkInBioData: React.Dispatch<React.SetStateAction<LinkInBioData>>;
  addLink: () => void;
  updateLink: (index: number, field: 'title' | 'url', value: string) => void;
  removeLink: (index: number) => void;
}

const LinkInBioForm: React.FC<LinkInBioFormProps> = ({
  linkInBioData,
  setLinkInBioData,
  addLink,
  updateLink,
  removeLink
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="displayName">প্রদর্শনের নাম *</Label>
          <Input
            id="displayName"
            placeholder="যেমন: রহিম আহমেদ"
            value={linkInBioData.displayName}
            onChange={(e) => setLinkInBioData(prev => ({ ...prev, displayName: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="profileImage">প্রোফাইল ইমেজ URL (ঐচ্ছিক)</Label>
          <Input
            id="profileImage"
            placeholder="https://example.com/image.jpg"
            value={linkInBioData.profileImage}
            onChange={(e) => setLinkInBioData(prev => ({ ...prev, profileImage: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">বায়ো/পরিচয় *</Label>
        <Textarea
          id="bio"
          placeholder="আপনার সম্পর্কে কিছু লিখুন..."
          value={linkInBioData.bio}
          onChange={(e) => setLinkInBioData(prev => ({ ...prev, bio: e.target.value }))}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>আপনার লিংকসমূহ</Label>
          <Button onClick={addLink} size="sm" variant="outline">
            <Link className="h-4 w-4 mr-2" />
            লিংক যোগ করুন
          </Button>
        </div>
        
        {linkInBioData.links.map((link, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 border rounded-lg">
            <Input
              placeholder="লিংকের নাম (যেমন: ইনস্টাগ্রাম)"
              value={link.title}
              onChange={(e) => updateLink(index, 'title', e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
              />
              <Button
                onClick={() => removeLink(index)}
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                ✕
              </Button>
            </div>
          </div>
        ))}
        
        {linkInBioData.links.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Link className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>এখনো কোন লিংক যোগ করা হয়নি</p>
            <p className="text-sm">উপরের বাটনে ক্লিক করে লিংক যোগ করুন</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LinkInBioForm;
