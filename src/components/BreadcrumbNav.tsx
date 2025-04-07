
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const { language } = useApp();
  
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  const getBreadcrumbName = (segment: string): string => {
    // Map segment names to Bengali or English based on language setting
    const nameMap: Record<string, { bn: string, en: string }> = {
      'services': { bn: 'সার্ভিসেস', en: 'Services' },
      'category': { bn: 'ক্যাটাগরি', en: 'Category' },
      'appointments': { bn: 'অ্যাপয়েন্টমেন্ট', en: 'Appointments' },
      'wallet': { bn: 'ওয়ালেট', en: 'Wallet' },
      'profile': { bn: 'প্রোফাইল', en: 'Profile' },
      'shopping': { bn: 'শপিং', en: 'Shopping' },
      'rentals': { bn: 'রেন্টালস', en: 'Rentals' },
      'rent-anything': { bn: 'যেকোনো কিছু রেন্ট', en: 'Rent Anything' },
      'utilities': { bn: 'ইউটিলিটিজ', en: 'Utilities' },
      'analytics': { bn: 'অ্যানালিটিকস', en: 'Analytics' },
      'customized-home': { bn: 'কাস্টমাইজড হোম', en: 'Customized Home' },
    };

    // Handle IDs in segments (like category/:id)
    if (segment.match(/^[a-zA-Z0-9]+$/)) {
      // Check if it's a known route name
      if (nameMap[segment]) {
        return language === 'bn' ? nameMap[segment].bn : nameMap[segment].en;
      }
    }
    
    // Default to capitalized segment
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  // Don't show breadcrumbs on home page
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="px-4 py-2 text-sm">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            {language === 'bn' ? 'হোম' : 'Home'}
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          
          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {getBreadcrumbName(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path}>
                    {getBreadcrumbName(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
