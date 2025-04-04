
import { Moon, Sun } from "lucide-react";

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
  const { setTheme } = useTheme();
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
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          লাইট মোড
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          ডার্ক মোড
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          সিস্টেম থিম
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
