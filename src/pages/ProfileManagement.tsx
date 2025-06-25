
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Edit,
  Save,
  Upload,
  Camera
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const ProfileManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    bio: '',
    dateOfBirth: '',
    gender: '',
    occupation: ''
  });

  const handleSave = () => {
    toast({
      title: "প্রোফাইল আপডেট",
      description: "আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে"
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">প্রোফাইল ম্যানেজমেন্ট</h1>
            <p className="text-muted-foreground">আপনার ব্যক্তিগত তথ্য পরিচালনা করুন</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                সেভ করুন
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                এডিট করুন
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">ব্যক্তিগত তথ্য</TabsTrigger>
            <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
            <TabsTrigger value="preferences">পছন্দসই</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  প্রোফাইল ছবি
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      ছবি পরিবর্তন করুন
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ফর্ম্যাট। সর্বোচ্চ ২ MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>মৌলিক তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">নাম</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">ইমেইল</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupation">পেশা</Label>
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">ঠিকানা</Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">সংক্ষিপ্ত পরিচয়</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  নিরাপত্তা সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    পাসওয়ার্ড পরিবর্তন করুন
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    টু-ফ্যাক্টর অথেনটিকেশন
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    লগইন ইতিহাস দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>পছন্দসই সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>ইমেইল নোটিফিকেশন</span>
                    <Badge variant="outline">চালু</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS নোটিফিকেশন</span>
                    <Badge variant="outline">বন্ধ</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>মার্কেটিং ইমেইল</span>
                    <Badge variant="outline">চালু</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileManagement;
