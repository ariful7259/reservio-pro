
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Shield, 
  LogOut, 
  Settings, 
  Store,
  Wallet,
  History
} from "lucide-react";

const Profile = () => {
  const { user, logout, isAdmin, isSeller } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন"
    });
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container px-4 pt-24 pb-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </CardDescription>
            <div className="flex justify-center gap-2 mt-2">
              {user.verified && (
                <Badge variant="success">ভেরিফাইড</Badge>
              )}
              {isAdmin && (
                <Badge variant="destructive">
                  <Shield className="h-3 w-3 mr-1" />
                  অ্যাডমিন
                </Badge>
              )}
              {isSeller && (
                <Badge variant="secondary">
                  <Store className="h-3 w-3 mr-1" />
                  বিক্রেতা
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Settings className="h-4 w-4 mr-2" />
                প্রোফাইল সেটিংস
              </Button>
              <Button variant="outline" className="justify-start">
                <Wallet className="h-4 w-4 mr-2" />
                ওয়ালেট
              </Button>
              <Button variant="outline" className="justify-start">
                <History className="h-4 w-4 mr-2" />
                লেনদেনের ইতিহাস
              </Button>
              {isSeller && (
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/seller-dashboard")}
                >
                  <Store className="h-4 w-4 mr-2" />
                  বিক্রেতা ড্যাশবোর্ড
                </Button>
              )}
              {isAdmin && (
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  অ্যাডমিন প্যানেল
                </Button>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                লগআউট
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
