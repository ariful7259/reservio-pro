
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AnimatedCard, StaggeredCardGrid } from '@/components/ui/animated-cards';
import CarouselCard from '@/components/ui/carousel-card';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  category: string;
  path: string;
}

interface FeaturedListingsGridProps {
  listings: Listing[];
}

const FeaturedListingsGrid = ({ listings }: FeaturedListingsGridProps) => {
  const navigate = useNavigate();
  
  const getListings = (cat: string) => {
    return listings.filter(item => {
      if (cat === "all") return true;
      if (cat === "rent") return item.category === "রেন্ট";
      if (cat === "services") return item.category === "সার্ভিস";
      if (cat === "marketplace") return item.category === "মার্কেটপ্লেস";
      return false;
    });
  };

  const handleListingClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">ফিচার্ড লিস্টিং</h2>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full bg-background border border-border/50 rounded-xl">
          <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">সব</TabsTrigger>
          <TabsTrigger value="rent" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">রেন্ট</TabsTrigger>
          <TabsTrigger value="services" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">সার্ভিস</TabsTrigger>
          <TabsTrigger value="marketplace" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">মার্কেটপ্লেস</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <StaggeredCardGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getListings('all').map((listing, index) => (
              <AnimatedCard 
                key={`all-${listing.id}-${listing.category}`} 
                delay={index} 
                hoverEffect="lift" 
                onClick={() => handleListingClick(listing.path)}
              >
                <CarouselCard
                  image={listing.image}
                  title={listing.title}
                  location={listing.location}
                  price={listing.price}
                  category={listing.category}
                  index={index}
                />
              </AnimatedCard>
            ))}
          </StaggeredCardGrid>
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-1 rounded-xl hover:bg-background hover:text-foreground transition-all" 
              onClick={() => navigate('/shopping')}
            >
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {["rent", "services", "marketplace"].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue}>
            <StaggeredCardGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getListings(tabValue).map((listing, index) => (
                <AnimatedCard 
                  key={`${tabValue}-${listing.id}`} 
                  delay={index} 
                  hoverEffect="lift" 
                  onClick={() => handleListingClick(listing.path)}
                >
                  <CarouselCard
                    image={listing.image}
                    title={listing.title}
                    location={listing.location}
                    price={listing.price}
                    category={listing.category}
                    index={index}
                  />
                </AnimatedCard>
              ))}
            </StaggeredCardGrid>
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 rounded-xl hover:bg-background hover:text-foreground transition-all" 
                onClick={() => navigate(tabValue === 'rent' ? '/rentals' : tabValue === 'services' ? '/services' : '/marketplace')}
              >
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeaturedListingsGrid;
