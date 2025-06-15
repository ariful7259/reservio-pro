
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Home } from 'lucide-react';

interface SectionToggleProps {
  activeSection: 'categories' | 'housing';
  setActiveSection: (s: 'categories' | 'housing') => void;
}

const SectionToggle: React.FC<SectionToggleProps> = ({ activeSection, setActiveSection }) => (
  <div className="flex gap-2 mb-6">
    <Button 
      variant={activeSection === 'categories' ? 'default' : 'outline'}
      onClick={() => setActiveSection('categories')}
      className="flex items-center gap-2"
    >
      <LayoutGrid className="h-4 w-4" />
      সব ক্যাটাগরি
    </Button>
    <Button 
      variant={activeSection === 'housing' ? 'default' : 'outline'}
      onClick={() => setActiveSection('housing')}
      className="flex items-center gap-2"
    >
      <Home className="h-4 w-4" />
      বাসা বাড়ি
    </Button>
  </div>
);

export default SectionToggle;
