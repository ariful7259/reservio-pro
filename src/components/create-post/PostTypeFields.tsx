
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Calendar, Tag } from 'lucide-react';
import { CreatePostFormData } from '@/hooks/useCreatePostForm';

interface PostTypeFieldsProps {
  postType: string;
  formData: CreatePostFormData;
  onFieldChange: (field: string, value: string) => void;
}

export const PostTypeFields: React.FC<PostTypeFieldsProps> = ({
  postType,
  formData,
  onFieldChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            <DollarSign className="h-4 w-4 inline mr-1" />
            মূল্য <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="৳ ১,০০০"
            value={formData.price}
            onChange={(e) => onFieldChange('price', e.target.value)}
            required
          />
        </div>

        {postType === 'rental' && (
          <div>
            <label className="text-sm font-medium mb-2 block">
              <Calendar className="h-4 w-4 inline mr-1" />
              সময়কাল
            </label>
            <Select
              value={formData.period}
              onValueChange={(value) => onFieldChange('period', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="দৈনিক">দৈনিক</SelectItem>
                <SelectItem value="সাপ্তাহিক">সাপ্তাহিক</SelectItem>
                <SelectItem value="মাসিক">মাসিক</SelectItem>
                <SelectItem value="বার্ষিক">বার্ষিক</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {postType === 'service' && (
          <div>
            <label className="text-sm font-medium mb-2 block">
              সেবার সময়
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="২"
                value={formData.duration}
                onChange={(e) => onFieldChange('duration', e.target.value)}
                className="flex-1"
              />
              <Select
                value={formData.timeUnit}
                onValueChange={(value) => onFieldChange('timeUnit', value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ঘণ্টা">ঘণ্টা</SelectItem>
                  <SelectItem value="দিন">দিন</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {postType === 'marketplace' && (
          <div>
            <label className="text-sm font-medium mb-2 block">
              ছাড়ের মূল্য
            </label>
            <Input
              placeholder="৳ ৮০০"
              value={formData.discountPrice}
              onChange={(e) => onFieldChange('discountPrice', e.target.value)}
            />
          </div>
        )}
      </div>

      {postType === 'marketplace' && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            <Tag className="h-4 w-4 inline mr-1" />
            ট্যাগ
          </label>
          <Input
            placeholder="নতুন, ভাল অবস্থা, দ্রুত ডেলিভারি"
            value={formData.tags}
            onChange={(e) => onFieldChange('tags', e.target.value)}
          />
        </div>
      )}
    </>
  );
};
