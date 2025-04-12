
import React from 'react';
import MonetizationDashboard from './MonetizationDashboard';
import { adminTheme } from '@/themes/adminTheme';

// Container component for the monetization tab in the admin dashboard
const MonetizationTab = () => {
  return (
    <div style={{ backgroundColor: adminTheme.colors.background }}>
      <MonetizationDashboard />
    </div>
  );
};

export default MonetizationTab;
