
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  Camera,
  Shield,
  Star,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const ProfileManagement = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: 'একজন সক্রিয় ব্যবহারকারী যিনি বিভিন্ন সেবা ও পণ্য কিনতে পছন্দ করেন।'
  });

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
    toast({
      title: "প্রোফাইল আপডেট সফল",
      description: "আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে"
    });
  };

  const stats = [
    { title: 'মোট অর্ডার', value: '২৪', icon: <Award className="h-5 w-5" /> },
    { title: 'রিভিউ স্কোর', value: '৪.৮', icon: <Star className="h-5 w-5" /> },
    { title: 'সদস্য হয়েছেন', value: '২ বছর', icon: <Calendar className="h-5 w-5" /> },
    { title: 'ভেরিফিকেশন', value: 'সম্পূর্ণ', icon: <Shield className="h-5 w-5" /> }
  ];

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">প্রোফাইল ম্যানেজমেন্ট</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex gap-2 mt-2">
                {user?.verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    ভেরিফাইড
                  </Badge>
                )}
                <Badge variant="secondary">{user?.role === 'seller' ? 'বিক্রেতা' : 'ক্রেতা'}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">নাম</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">ইমেইল</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">ফোন নম্বর</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="address">ঠিকানা</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">বায়ো</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>একাউন্ট অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              ইমেইল ভেরিফিকেশন
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600">
              <User className="h-4 w-4 mr-2" />
              একাউন্ট ডিলিট করুন
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileManagement;
