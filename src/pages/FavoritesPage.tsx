
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FavoritesPage = () => {
  return (
    <div className="container mx-auto pt-20 pb-10">
      <Card>
        <CardHeader>
          <CardTitle>পছন্দের পেজ</CardTitle>
        </CardHeader>
        <CardContent>
          <p>পছন্দের সেকশন শীঘ্রই আসছে...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesPage;
