import { RouteObject } from 'react-router-dom';
import AdminDashboard from '@/pages/AdminDashboard';
import SellerDashboard from '@/pages/SellerDashboard';
import BecomeSeller from '@/pages/BecomeSeller';

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminDashboard />,
  },
  {
    path: "seller-dashboard",
    element: <SellerDashboard />,
  },
  {
    path: "become-seller",
    element: <BecomeSeller />,
  },
];