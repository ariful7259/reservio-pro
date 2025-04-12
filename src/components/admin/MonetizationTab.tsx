
import React from 'react';
import MonetizationDashboard from './MonetizationDashboard';
import { adminTheme } from '@/themes/adminTheme';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/components/ThemeProvider';

// Container component for the monetization tab in the admin dashboard
const MonetizationTab = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div 
      className="p-6 rounded-lg transform transition-all duration-300 animate-fade-in"
      style={{ 
        backgroundColor: isDarkMode ? adminTheme.colors.dark.background : adminTheme.colors.background,
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Card 
        className="overflow-hidden transition-all duration-300"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, ${adminTheme.colors.dark.surface} 0%, rgba(55, 65, 81, 0.8) 100%)` 
            : adminTheme.gradients.card.light,
          boxShadow: adminTheme.shadows.card,
          borderRadius: adminTheme.borderRadius.xl,
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = adminTheme.shadows.hover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = adminTheme.shadows.card;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <CardContent className="p-0">
          <MonetizationDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonetizationTab;
