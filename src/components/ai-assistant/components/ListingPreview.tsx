
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Edit } from 'lucide-react';

interface ListingData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: string;
  features: string[];
  location?: string;
  images: string[];
  type: 'product' | 'service' | 'rental';
}

interface ListingPreviewProps {
  listingData: ListingData;
  onConfirm: (data: ListingData) => void;
  onEdit: (data: ListingData) => void;
  onCancel: () => void;
}

export const ListingPreview: React.FC<ListingPreviewProps> = ({
  listingData,
  onConfirm,
  onEdit,
  onCancel
}) => {
  return (
    <div className="p-3 border-t bg-white">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            AI দ্বারা তৈরি লিস্টিং প্রিভিউ
            <Badge variant="secondary">{listingData.type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Images */}
          {listingData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {listingData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-16 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="font-medium text-sm mb-1">{listingData.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{listingData.description}</p>
          </div>

          {/* Category and Price */}
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="outline" className="text-xs mr-1">{listingData.category}</Badge>
              {listingData.subcategory && (
                <Badge variant="outline" className="text-xs">{listingData.subcategory}</Badge>
              )}
            </div>
            <span className="font-bold text-primary text-sm">{listingData.price}</span>
          </div>

          {/* Features */}
          {listingData.features.length > 0 && (
            <div>
              <h4 className="text-xs font-medium mb-1">বৈশিষ্ট্য:</h4>
              <div className="flex flex-wrap gap-1">
                {listingData.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {listingData.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{listingData.features.length - 3} আরও
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {listingData.location && (
            <p className="text-xs text-gray-500">📍 {listingData.location}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={() => onConfirm(listingData)} className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              পোস্ট করুন
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(listingData)}>
              <Edit className="h-3 w-3 mr-1" />
              এডিট
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-3 w-3 mr-1" />
              বাতিল
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
