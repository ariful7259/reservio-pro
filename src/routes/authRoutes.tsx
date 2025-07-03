import { RouteObject } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
];