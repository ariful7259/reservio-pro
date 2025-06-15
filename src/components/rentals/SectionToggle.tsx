import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Home } from 'lucide-react';
interface SectionToggleProps {
  activeSection: 'categories' | 'housing';
  setActiveSection: (s: 'categories' | 'housing') => void;
}
const SectionToggle: React.FC<SectionToggleProps> = ({
  activeSection,
  setActiveSection
}) => <div className="flex gap-2 mb-6">
    
    
  </div>;
export default SectionToggle;