
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // ব্যবহারকারী লগইন না থাকলে লগইন পৃষ্ঠায় রিডাইরেক্ট করুন
    React.useEffect(() => {
      navigate("/login");
    }, [navigate]);
    
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container px-4 pt-24 pb-16">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="mt-2 text-sm bg-primary/10 text-primary rounded-full px-2 py-1 inline-block">
                {user.role === "admin" ? "অ্যাডমিন" : user.role === "seller" ? "বিক্রেতা" : "ব্যবহারকারী"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ফোন</span>
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ঠিকানা</span>
                    <span>{user.address}</span>
                  </div>
                )}
                {user.joinDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">যোগদান</span>
                    <span>{new Date(user.joinDate).toLocaleDateString("bn-BD")}</span>
                  </div>
                )}
                <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>
                  লগআউট
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="info">
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">ব্যবহারকারী তথ্য</TabsTrigger>
              <TabsTrigger value="activities" className="flex-1">কার্যক্রম</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">সেটিংস</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>ব্যবহারকারী তথ্য</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.bio && (
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">পরিচিতি</h3>
                      <p className="text-muted-foreground">{user.bio}</p>
                    </div>
                  )}
                  
                  {user.stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-muted rounded-md p-4 text-center">
                        <p className="text-2xl font-bold">{user.stats.postsCount}</p>
                        <p className="text-sm text-muted-foreground">পোস্ট</p>
                      </div>
                      <div className="bg-muted rounded-md p-4 text-center">
                        <p className="text-2xl font-bold">{user.stats.reviewsCount}</p>
                        <p className="text-sm text-muted-foreground">রিভিউ</p>
                      </div>
                      <div className="bg-muted rounded-md p-4 text-center">
                        <p className="text-2xl font-bold">{user.stats.commentsCount}</p>
                        <p className="text-sm text-muted-foreground">কমেন্ট</p>
                      </div>
                      <div className="bg-muted rounded-md p-4 text-center">
                        <p className="text-2xl font-bold">{user.stats.bookingsCount}</p>
                        <p className="text-sm text-muted-foreground">বুকিং</p>
                      </div>
                    </div>
                  )}
                  
                  {user.socialProfiles && Object.values(user.socialProfiles).some(Boolean) && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">সোশ্যাল মিডিয়া</h3>
                      <div className="flex gap-2">
                        {user.socialProfiles.facebook && (
                          <a 
                            href={user.socialProfiles.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            ফেসবুক
                          </a>
                        )}
                        {user.socialProfiles.twitter && (
                          <a 
                            href={user.socialProfiles.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm"
                          >
                            টুইটার
                          </a>
                        )}
                        {user.socialProfiles.instagram && (
                          <a 
                            href={user.socialProfiles.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                          >
                            ইনস্টাগ্রাম
                          </a>
                        )}
                        {user.socialProfiles.linkedin && (
                          <a 
                            href={user.socialProfiles.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            লিংকডইন
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    কোন সাম্প্রতিক কার্যক্রম নেই
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>অ্যাকাউন্ট সেটিংস</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.preferences && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="font-medium">নোটিফিকেশন</h3>
                          <p className="text-sm text-muted-foreground">নোটিফিকেশন সক্রিয়/নিষ্ক্রিয় করুন</p>
                        </div>
                        <Button variant="outline" disabled>
                          {user.preferences.notifications ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="font-medium">নিউজলেটার</h3>
                          <p className="text-sm text-muted-foreground">নিউজলেটার সাবস্ক্রিপশন</p>
                        </div>
                        <Button variant="outline" disabled>
                          {user.preferences.newsletter ? "সাবস্ক্রাইবড" : "আনসাবস্ক্রাইবড"}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="font-medium">ডার্ক মোড</h3>
                          <p className="text-sm text-muted-foreground">অ্যাপের থিম পরিবর্তন করুন</p>
                        </div>
                        <Button variant="outline" disabled>
                          {user.preferences.darkMode ? "ডার্ক" : "লাইট"}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="font-medium">ভাষা</h3>
                          <p className="text-sm text-muted-foreground">অ্যাপের ভাষা পরিবর্তন করুন</p>
                        </div>
                        <Button variant="outline" disabled>
                          {user.preferences.language === "bn" ? "বাংলা" : "English"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
