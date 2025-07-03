import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

// Import route collections
import { authRoutes } from "./routes/authRoutes";
import { marketplaceRoutes } from "./routes/marketplaceRoutes";
import { servicesRoutes } from "./routes/servicesRoutes";
import { rentalsRoutes } from "./routes/rentalsRoutes";
import { housingRoutes } from "./routes/housingRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { contentRoutes } from "./routes/contentRoutes";
import { utilityRoutes } from "./routes/utilityRoutes";
import { specialRoutes } from "./routes/specialRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      // Auth routes
      ...authRoutes,
      // Marketplace routes
      ...marketplaceRoutes,
      // Services routes
      ...servicesRoutes,
      // Rentals routes
      ...rentalsRoutes,
      // Housing routes
      ...housingRoutes,
      // Payment routes
      ...paymentRoutes,
      // User management routes
      ...userRoutes,
      // Admin routes
      ...adminRoutes,
      // Content routes
      ...contentRoutes,
      // Utility routes
      ...utilityRoutes,
      // Special functionality routes
      ...specialRoutes,
      // Dashboard routes
      ...dashboardRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;