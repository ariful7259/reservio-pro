
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Home, Menu } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface AdminHeaderProps {
  notifications: Notification[];
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  notifications, 
  showNotifications, 
  setShowNotifications 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Menu className="h-4 w-4" />
        </SidebarTrigger>
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          <Home className="h-4 w-4 mr-1" /> হোম পেইজে ফিরুন
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {notifications.filter(n => !n.read).length}
            </span>
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold">নোটিফিকেশন</h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      notification.read ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <Button variant="link" className="text-primary text-sm">
                  সব নোটিফিকেশন দেখুন
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 text-white rounded-full flex items-center justify-center"
            style={{ backgroundImage: 'linear-gradient(to right, #4F46E5, #8B5CF6)' }}>
            A
          </div>
          <span className="ml-2 font-medium">অ্যাডমিন</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
