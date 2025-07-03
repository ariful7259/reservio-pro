import { RouteObject } from 'react-router-dom';
import CreatePost from '@/pages/CreatePost';
import Stories from '@/pages/Stories';
import Forums from '@/pages/Forums';
import CreateStore from '@/pages/CreateStore';
import CreateStoreNew from '@/pages/CreateStoreNew';
import StoreDemo from '@/pages/StoreDemo';
import StoreDetails from '@/pages/StoreDetails';
import CreateDigitalProduct from '@/pages/CreateDigitalProduct';
import DigitalProductsMarketplace from '@/pages/DigitalProductsMarketplace';
import DigitalProductDetail from '@/pages/DigitalProductDetail';
import DigitalProduct from '@/pages/DigitalProduct';
import PaidCommunity from '@/pages/PaidCommunity';
import CourseBuilder from '@/pages/CourseBuilder';
import CreateLinkInBio from '@/pages/CreateLinkInBio';

export const contentRoutes: RouteObject[] = [
  {
    path: "create-post",
    element: <CreatePost />,
  },
  {
    path: "stories",
    element: <Stories />,
  },
  {
    path: "forums",
    element: <Forums />,
  },
  {
    path: "create-store",
    element: <CreateStore />,
  },
  {
    path: "create-store-new",
    element: <CreateStoreNew />,
  },
  {
    path: "store-demo",
    element: <StoreDemo />,
  },
  {
    path: "store/:storeId",
    element: <StoreDetails />,
  },
  {
    path: "create-digital-product",
    element: <CreateDigitalProduct />,
  },
  {
    path: "digital-products",
    element: <DigitalProductsMarketplace />,
  },
  {
    path: "digital-product/:productId",
    element: <DigitalProductDetail />,
  },
  {
    path: "digital-product",
    element: <DigitalProduct />,
  },
  {
    path: "paid-community",
    element: <PaidCommunity />,
  },
  {
    path: "course-builder",
    element: <CourseBuilder />,
  },
  {
    path: "create-link-in-bio",
    element: <CreateLinkInBio />,
  },
];