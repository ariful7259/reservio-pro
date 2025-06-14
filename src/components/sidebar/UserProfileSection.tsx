
import React from "react";
import { User, LogOut, ShoppingBag, Settings, CreditCard, Sun, Moon, Globe2, Home, ArrowUpRight, TrendingUp, Star, User2, Store, BadgeDollarSign } from "lucide-react";
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
  primary: "email", // or "phone"
};

const UserProfileSection = ({
  // Add your own props as needed!
}) => {
  const navigate = useNavigate();

  // (OPTIONAL) State for theme/language—replace with actual logic
  const [isDark, setIsDark] = React.useState(false);
  const [lang, setLang] = React.useState("bn");

  return (
    <div className="p-4 min-w-[230px] flex flex-col items-center animate-fade-in">
      {/* Avatar, Name, Contact */}
      <div className="flex flex-col items-center gap-2 mb-4 w-full">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary font-bold shadow-sm">
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
        <div className="font-semibold text-base leading-tight">{user.name}</div>
        <div className="text-xs text-gray-500">
          {user.primary === "phone" ? user.phone : user.email}
        </div>
        <Button
          onClick={() => navigate("/profile")}
          variant="outline"
          size="sm"
          className="mt-1 w-full"
        >
          <User2 className="h-4 w-4 mr-2" />
          প্রোফাইল দেখুন
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Seller button */}
      {!user.isSeller ? (
        <Button
          onClick={() => navigate("/become-seller")}
          size="sm"
          variant="secondary"
          className="w-full mb-2 flex items-center gap-2"
        >
          <Store className="h-4 w-4" />
          সেলার হোন
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/seller/dashboard")}
          size="sm"
          variant="secondary"
          className="w-full mb-2 flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Seller Dashboard
        </Button>
      )}

      {/* Main menu */}
      <div className="w-full flex flex-col gap-1 mt-1">
        <Button
          onClick={() => navigate("/orders")}
          variant="ghost"
          className="justify-start gap-2 w-full"
        >
          <ShoppingBag className="h-4 w-4" />
          অর্ডারসমূহ
        </Button>
        <Button
          onClick={() => navigate("/wallet")}
          variant="ghost"
          className="justify-start gap-2 w-full"
        >
          <BadgeDollarSign className="h-4 w-4" />
          ওয়ালেট
        </Button>
        <Button
          onClick={() => navigate("/settings")}
          variant="ghost"
          className="justify-start gap-2 w-full"
        >
          <Settings className="h-4 w-4" />
          সেটিংস
        </Button>
      </div>

      <Separator className="my-4" />

      <Button
        onClick={() => { /* insert logout logic here */ }}
        variant="outline"
        className="w-full mt-0 gap-2"
      >
        <LogOut className="h-4 w-4" />
        লগআউট
      </Button>

      {/* Language & Theme — bottom */}
      <div className="flex justify-between items-center w-full text-xs mt-6 space-x-2">
        {/* Language Switch (Demo only) */}
        <Button
          size="sm"
          variant={lang === "bn" ? "secondary" : "outline"}
          className="flex-1 flex items-center gap-1 px-1.5"
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
        >
          <Globe2 className="h-4 w-4" />
          {lang === "bn" ? "বাংলা" : "EN"}
        </Button>
        {/* Theme Switch (Demo only) */}
        <Button
          size="sm"
          variant={isDark ? "secondary" : "outline"}
          className="flex-1 flex items-center gap-1 px-1.5"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {isDark ? "ডার্ক" : "লাইট"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfileSection;
