import { RouteObject } from 'react-router-dom';
import Profile from '@/pages/Profile';
import ProfileManagement from '@/pages/ProfileManagement';
import Settings from '@/pages/Settings';
import MyServices from '@/pages/MyServices';
import Notifications from '@/pages/Notifications';
import Favorites from '@/pages/Favorites';
import Orders from '@/pages/Orders';
import Rewards from '@/pages/Rewards';
import Reviews from '@/pages/Reviews';
import ReferralSystem from '@/pages/ReferralSystem';

export const userRoutes: RouteObject[] = [
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "profile-management",
    element: <ProfileManagement />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "my-services",
    element: <MyServices />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: "favorites",
    element: <Favorites />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "rewards",
    element: <Rewards />,
  },
  {
    path: "reviews",
    element: <Reviews />,
  },
  {
    path: "referral-system",
    element: <ReferralSystem />,
  },
];