import { RouteObject } from 'react-router-dom';
import Marketplace from '@/pages/Marketplace';
import MarketplaceCategoryPage from '@/pages/MarketplaceCategoryPage';
import ProductDetail from '@/pages/ProductDetail';
import MarketplaceHub from '@/pages/MarketplaceHub';
import Shopping from '@/pages/Shopping';
import ShoppingCategory from '@/pages/ShoppingCategory';
import ProductOrder from '@/pages/ProductOrder';

export const marketplaceRoutes: RouteObject[] = [
  {
    path: "marketplace",
    element: <Marketplace />,
  },
  {
    path: "marketplace/category/:categoryId",
    element: <MarketplaceCategoryPage />,
  },
  {
    path: "marketplace/product/:productId", 
    element: <ProductDetail />,
  },
  {
    path: "marketplace-hub",
    element: <MarketplaceHub />,
  },
  {
    path: "shopping",
    element: <Shopping />,
  },
  {
    path: "shopping-category",
    element: <ShoppingCategory />,
  },
  {
    path: "product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "product-order",
    element: <ProductOrder />,
  },
];