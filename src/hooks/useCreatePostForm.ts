
import { useState } from 'react';

export interface CreatePostFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  latitude?: number;
  longitude?: number;
  price: string;
  period: string; // for rental
  duration: string; // for service
  timeUnit: string; // for service
  discountPrice: string; // for marketplace
  tags: string; // for marketplace
}

export const useCreatePostForm = () => {
  const [formData, setFormData] = useState<CreatePostFormData>({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
    price: '',
    period: '',
    duration: '',
    timeUnit: 'ঘণ্টা',
    discountPrice: '',
    tags: ''
  });

  const updateFormData = (updates: Partial<CreatePostFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return { formData, updateFormData, setFormData };
};
