import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Check, MapPin } from 'lucide-react';
import MapView from '@/components/MapView';
import RentalFeatures from '@/components/RentalFeatures';

export interface RentalDetailsTabsData {
  id?: string | number;
  description?: string;
  createdAt?: string | Date;
  period?: string;
  rentDeposit?: string;
  duration?: string;
  timeUnit?: string;
  price?: string;
  discountPrice?: string;
  category?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  /** Comma-separated list */
  tags?: string;
}

interface RentalDetailsTabsProps {
  data: RentalDetailsTabsData;
  kind?: 'rental' | 'service' | 'marketplace';
  compact?: boolean;
}

const formatCreatedAt = (value?: string | Date) => {
  if (!value) return '—';
  if (typeof value === 'string') return value;
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(value);
  } catch {
    return value.toISOString();
  }
};

const periodLabel = (period?: string) => {
  if (!period) return '—';
  // supports both internal and bn labels
  const p = period.toLowerCase();
  if (p.includes('day') || p.includes('দৈনিক')) return 'দৈনিক';
  if (p.includes('week') || p.includes('সাপ্তাহিক')) return 'সাপ্তাহিক';
  if (p.includes('month') || p.includes('মাস') || p.includes('মাসিক')) return 'মাসিক';
  if (p.includes('year') || p.includes('বার্ষিক')) return 'বার্ষিক';
  return period;
};

const RentalDetailsTabs: React.FC<RentalDetailsTabsProps> = ({ data, kind = 'rental', compact = false }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'location'>('details');

  const featureList = useMemo(() => {
    const raw = (data.tags || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    // Keep it short in compact contexts
    return compact ? raw.slice(0, 6) : raw;
  }, [data.tags, compact]);

  const hasCoords = Number.isFinite(data.latitude) && Number.isFinite(data.longitude);

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="details">বিবরণ</TabsTrigger>
        <TabsTrigger value="features">বৈশিষ্ট্য</TabsTrigger>
        <TabsTrigger value="location">অবস্থান</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className={compact ? 'mt-3' : 'mt-4'}>
        <Card>
          <CardContent className={compact ? 'p-3' : 'p-4'}>
            <h3 className={compact ? 'text-base font-medium mb-2' : 'text-lg font-medium mb-2'}>বিবরণ</h3>
            <p className="text-muted-foreground text-sm">{data.description || '—'}</p>

            <Separator className={compact ? 'my-3' : 'my-4'} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">অবস্থা</h4>
                <p className="text-sm text-muted-foreground">ভালো</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">পোস্ট করা হয়েছে</h4>
                <p className="text-sm text-muted-foreground">{formatCreatedAt(data.createdAt)}</p>
              </div>

              {kind === 'rental' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">ভাড়ার মেয়াদ</h4>
                    <p className="text-sm text-muted-foreground">{periodLabel(data.period)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">জামানত</h4>
                    <p className="text-sm text-muted-foreground">{data.rentDeposit || '—'}</p>
                  </div>
                </>
              )}

              {kind === 'service' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">সেবার সময়</h4>
                    <p className="text-sm text-muted-foreground">
                      {data.duration ? `${data.duration} ${data.timeUnit || ''}`.trim() : '—'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">মূল্য</h4>
                    <p className="text-sm text-muted-foreground">{data.price || '—'}</p>
                  </div>
                </>
              )}

              {kind === 'marketplace' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">মূল্য</h4>
                    <p className="text-sm text-muted-foreground">{data.price || '—'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">ছাড়ের মূল্য</h4>
                    <p className="text-sm text-muted-foreground">{data.discountPrice || '—'}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features" className={compact ? 'mt-3' : 'mt-4'}>
        <Card>
          <CardContent className={compact ? 'p-3' : 'p-4'}>
            <h3 className={compact ? 'text-base font-medium mb-3' : 'text-lg font-medium mb-4'}>বৈশিষ্ট্য</h3>
            {featureList.length > 0 ? (
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                {featureList.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                এখনও কোন বৈশিষ্ট্য যোগ করা হয়নি (ট্যাগ/ফিচার যোগ করলে এখানে দেখাবে)।
              </p>
            )}
          </CardContent>
        </Card>

        {featureList.length > 0 && data.category && (
          <div className={compact ? 'mt-3' : 'mt-4'}>
            <RentalFeatures category={data.category} featureList={featureList} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="location" className={compact ? 'mt-3' : 'mt-4'}>
        <Card>
          <CardContent className={compact ? 'p-3' : 'p-4'}>
            <h3 className={compact ? 'text-base font-medium mb-3' : 'text-lg font-medium mb-4'}>অবস্থান</h3>

            <div className={compact ? 'rounded-lg overflow-hidden border h-[180px]' : 'rounded-lg overflow-hidden border h-[300px]'}>
              {hasCoords ? (
                <MapView
                  listings={[
                    {
                      id: data.id ?? 'preview',
                      title: 'Location',
                      location: data.location || '',
                      latitude: data.latitude,
                      longitude: data.longitude,
                    },
                  ]}
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <div className="text-center text-sm text-muted-foreground px-4">
                    <MapPin className="h-4 w-4 inline-block mr-1" />
                    লোকেশন পিন করলে ম্যাপ দেখা যাবে
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">ঠিকানা</h4>
              <p className="text-sm text-muted-foreground">{data.location || '—'}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RentalDetailsTabs;
