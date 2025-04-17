
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HousingCard from './HousingCard';

interface HousingListProps {
  listings: Array<{
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: string;
    isAvailable: boolean;
  }>;
  handleToggleFavorite: (e: React.MouseEvent, listing: any) => void;
  isFavorite: (id: string) => boolean;
  language: 'bn' | 'en';
}

const HousingList: React.FC<HousingListProps> = ({ 
  listings,
  handleToggleFavorite,
  isFavorite,
  language
}) => {
  const navigate = useNavigate();

  if (listings.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {language === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি' : 'No results found'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <HousingCard 
          key={listing.id}
          listing={listing}
          isFavorite={isFavorite(listing.id)}
          onToggleFavorite={(e) => handleToggleFavorite(e, listing)}
          language={language}
        />
      ))}
    </div>
  );
};

export default HousingList;
