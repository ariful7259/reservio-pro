
import React from "react";
import { User, LogOut, ShoppingBag, Settings, CreditCard, Sun, Moon, Globe2, User2, Store, TrendingUp, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

// Demo user object (replace with props/context in integration)
const user = {
  avatar: "",
  name: "মো. রফিকুল ইসলাম",
  email: "rafik@example.com",
  phone: "+8801700000000",
  isSeller: false,
  isDark: false,
  primary: "email",
};

const UserProfileSection = () => {
  const navigate = useNavigate();

  // State for theme/language (demo)
  const [isDark, setIsDark] = React.useState(false);
  const [lang, setLang] = React.useState("bn");

  return (
    <div className="min-w-[210px] max-w-xs w-full bg-white dark:bg-gray-900 rounded-2xl shadow-card px-3 py-3 flex flex-col items-center border border-gray-100 dark:border-gray-800 animate-fade-in">
      {/* Avatar, Name, Contact */}
      <div className="flex flex-col items-center w-full gap-0.5">
        <div
          className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl text-primary font-bold shadow-sm border-2 border-primary/30 mb-1"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            user.name[0]
          )}
        </div>
        <span className="font-semibold text-sm leading-tight text-gray-900 dark:text-gray-200">{user.name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mb-0.5">
          {user.primary === "phone" ? user.phone : user.email}
        </span>
        <Button
          onClick={() => navigate("/profile")}
          variant="outline"
          size="xs"
          className="mt-0 w-[96px] border-primary text-primary h-7 rounded-md text-xs px-2 py-1"
        >
          <User2 className="h-3 w-3 mr-1" />
          প্রোফাইল দেখুন
        </Button>
      </div>

      {/* Become Seller/Seller Dashboard */}
      <div className="w-full mt-3 mb-1">
        {!user.isSeller ? (
          <Button
            onClick={() => navigate("/become-seller")}
            size="xs"
            variant="secondary"
            className="w-full text-xs h-8 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5 font-medium"
            style={{boxShadow: "none"}}
          >
            <Store className="h-4 w-4" />
            সেলার হোন
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/seller/dashboard")}
            size="xs"
            variant="secondary"
            className="w-full text-xs h-8 rounded-md bg-primary text-white flex items-center gap-1.5 font-medium"
            style={{boxShadow: "none"}}
          >
            <TrendingUp className="h-4 w-4" />
            Seller Dashboard
          </Button>
        )}
      </div>

      {/* Main menu- minimal, compact grouped buttons (vertical, but close) */}
      <div className="w-full mt-1 flex flex-col gap-1">
        <Button
          onClick={() => navigate("/orders")}
          variant="ghost"
          size="sm"
          className="justify-start gap-1.5 w-full h-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition"
        >
          <ShoppingBag className="h-4 w-4" />
          অর্ডারসমূহ
        </Button>
        <Button
          onClick={() => navigate("/wallet")}
          variant="ghost"
          size="sm"
          className="justify-start gap-1.5 w-full h-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition"
        >
          <BadgeDollarSign className="h-4 w-4" />
          ওয়ালেট
        </Button>
        <Button
          onClick={() => navigate("/settings")}
          variant="ghost"
          size="sm"
          className="justify-start gap-1.5 w-full h-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition"
        >
          <Settings className="h-4 w-4" />
          সেটিংস
        </Button>
        <Button
          onClick={() => {/* insert logout logic here */}}
          variant="ghost"
          size="sm"
          className="justify-start gap-1.5 w-full h-8 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut className="h-4 w-4" />
          লগআউট
        </Button>
      </div>

      {/* Language & Theme Switcher: compact under menu */}
      <div className="flex justify-between items-center w-full gap-2 mt-2">
        <Button
          size="xs"
          variant={lang === "bn" ? "secondary" : "outline"}
          className="flex-1 flex items-center justify-center gap-1 h-7 rounded bg-primary/10 text-primary border-primary/10 text-xs"
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
        >
          <Globe2 className="h-4 w-4" />
          {lang === "bn" ? "বাংলা" : "EN"}
        </Button>
        <Button
          size="xs"
          variant={isDark ? "secondary" : "outline"}
          className="flex-1 flex items-center justify-center gap-1 h-7 rounded text-xs"
          onClick={() => setIsDark((val) => !val)}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {isDark ? "ডার্ক" : "লাইট"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfileSection;

