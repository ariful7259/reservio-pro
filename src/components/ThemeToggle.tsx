
import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();
  const { toast } = useToast();

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    
    const themeLabels = {
      light: "লাইট মোড",
      dark: "ডার্ক মোড",
      system: "সিস্টেম থিম"
    };
    
    toast({
      title: "থিম পরিবর্তন করা হয়েছে",
      description: `${themeLabels[theme]} সক্রিয় করা হয়েছে`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          {currentTheme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">থিম পরিবর্তন করুন</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          <span>লাইট মোড</span>
          {theme === "light" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          <span>ডার্ক মোড</span>
          {theme === "dark" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2"
        >
          <Monitor className="h-4 w-4" />
          <span>সিস্টেম থিম</span>
          {theme === "system" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
