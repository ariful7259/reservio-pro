
import React from 'react';
import MonetizationDashboard from './MonetizationDashboard';
import { adminTheme } from '@/themes/adminTheme';
import { Card, CardContent } from '@/components/ui/card';

// Container component for the monetization tab in the admin dashboard
const MonetizationTab = () => {
  return (
    <div 
      className="p-6 rounded-lg" 
      style={{ 
        backgroundColor: adminTheme.colors.background,
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-0">
          <MonetizationDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonetizationTab;
