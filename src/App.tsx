
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import RoutesConfig from "./RoutesConfig";
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
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <div className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
                {/* Mobile optimized viewport */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <Navbar />
                <main className="pt-14 sm:pt-16 pb-16 sm:pb-4 safe-area-pt safe-area-pb">
                  <RoutesConfig />
                </main>
                <GlobalAIAssistant />
              </div>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
