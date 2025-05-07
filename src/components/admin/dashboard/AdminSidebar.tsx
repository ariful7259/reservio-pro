
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, LogOut, Home } from 'lucide-react';
import { adminTheme } from '@/themes/adminTheme';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  sidebarItems: SidebarItem[];
  activeModule: string;
  handleModuleChange: (moduleId: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  sidebarItems, 
  activeModule, 
  handleModuleChange 
}) => {
  const navigate = useNavigate();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-xl font-bold flex items-center" style={{ color: adminTheme.colors.primary }}>
          <ShieldCheck className="mr-2" style={{ color: adminTheme.colors.primary }} /> অ্যাডমিন প্যানেল
        </h2>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="p-2">
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  tooltip={item.name}
                  isActive={activeModule === item.id}
                  onClick={() => handleModuleChange(item.id)}
                  className={`${activeModule === item.id ? '' : 'text-gray-600'}`}
                  style={activeModule === item.id ? {
                    backgroundImage: adminTheme.gradients.primary,
                    boxShadow: adminTheme.shadows.sm
                  } : {}}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          
          <Separator className="my-4" />
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-red-500"
              onClick={() => navigate('/')}
            >
              <LogOut size={18} />
              <span className="ml-2">লগআউট</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-blue-500 mt-2"
              onClick={() => navigate('/')}
            >
              <Home size={18} />
              <span className="ml-2">হোম পেইজ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
