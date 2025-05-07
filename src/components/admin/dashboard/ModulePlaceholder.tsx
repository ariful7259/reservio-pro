
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { adminTheme } from '@/themes/adminTheme';

interface ModulePlaceholderProps {
  moduleName: string;
  icon: React.ReactNode;
  setActiveModule: (module: string) => void;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ 
  moduleName, 
  icon, 
  setActiveModule 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-24 w-24 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: adminTheme.colors.primaryLight }}>
        {icon || <HelpCircle size={32} style={{ color: adminTheme.colors.primary }} />}
      </div>
      <h2 className="text-2xl font-bold">{moduleName} মডিউল</h2>
      <p className="mt-2 text-muted-foreground text-center max-w-md">
        এই মডিউলটি বর্তমানে বিকাশাধীন আছে। শীঘ্রই এটি ব্যবহার করতে পারবেন।
      </p>
      <Button 
        className="mt-6"
        style={{ 
          backgroundImage: adminTheme.gradients.primary,
          boxShadow: adminTheme.shadows.sm
        }}
        onClick={() => setActiveModule('dashboard')}
      >
        ড্যাশবোর্ডে ফিরে যান
      </Button>
    </div>
  );
};

export default ModulePlaceholder;
