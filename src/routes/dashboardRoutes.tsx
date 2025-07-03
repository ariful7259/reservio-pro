import { RouteObject, Navigate } from 'react-router-dom';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import ContentDashboard from '@/pages/dashboard/content/ContentDashboard';
import MarketplaceDashboard from '@/pages/dashboard/marketplace/MarketplaceDashboard';
import RentalDashboard from '@/pages/dashboard/rental/RentalDashboard';
import ServiceDashboard from '@/pages/dashboard/service/ServiceDashboard';

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard/content" replace />,
      },
      {
        path: "content",
        element: <ContentDashboard />,
      },
      {
        path: "marketplace",
        element: <MarketplaceDashboard />,
      },
      {
        path: "rental",
        element: <RentalDashboard />,
      },
      {
        path: "service",
        element: <ServiceDashboard />,
      },
    ],
  },
];