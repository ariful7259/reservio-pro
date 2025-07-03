
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import routes from "./RoutesConfig";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./hooks/useAuth";
import GlobalAIAssistant from "@/components/GlobalAIAssistant";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Navbar />
              <RouterProvider router={routes} />
              <GlobalAIAssistant />
            </div>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
