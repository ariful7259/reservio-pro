import { RouteObject } from 'react-router-dom';
import Housing from '@/pages/Housing';
import BasaBari from '@/pages/BasaBari';

export const housingRoutes: RouteObject[] = [
  {
    path: "housing",
    element: <Housing />,
  },
  {
    path: "housing/:id",
    element: <BasaBari />,
  },
];