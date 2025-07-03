import { RouteObject } from 'react-router-dom';
import Services from '@/pages/Services';
import ServiceCategoryPage from '@/pages/ServiceCategoryPage';
import ServiceDetail from '@/pages/ServiceDetail';
import ServiceBooking from '@/pages/ServiceBooking';
import ServiceCategory from '@/pages/ServiceCategory';
import ServiceDetails from '@/pages/ServiceDetails';

export const servicesRoutes: RouteObject[] = [
  {
    path: "services",
    element: <Services />,
  },
  {
    path: "services/category/:categoryId",
    element: <ServiceCategoryPage />,
  },
  {
    path: "services/:serviceId",
    element: <ServiceDetail />,
  },
  {
    path: "services/:serviceId/book",
    element: <ServiceBooking />,
  },
  {
    path: "service-category",
    element: <ServiceCategory />,
  },
  {
    path: "service-details",
    element: <ServiceDetails />,
  },
];