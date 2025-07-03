import { RouteObject } from 'react-router-dom';
import Rentals from '@/pages/Rentals';
import RentalCategoryPage from '@/pages/RentalCategoryPage';
import RentDetail from '@/pages/RentDetail';
import RentAnything from '@/pages/RentAnything';
import RentalBooking from '@/pages/RentalBooking';
import RentalConfirmation from '@/pages/RentalConfirmation';

export const rentalsRoutes: RouteObject[] = [
  {
    path: "rentals",
    element: <Rentals />,
  },
  {
    path: "rentals/category/:categoryId",
    element: <RentalCategoryPage />,
  },
  {
    path: "rent/:id",
    element: <RentDetail />,
  },
  {
    path: "rent-anything",
    element: <RentAnything />,
  },
  {
    path: "rental-booking",
    element: <RentalBooking />,
  },
  {
    path: "rental-confirmation",
    element: <RentalConfirmation />,
  },
];