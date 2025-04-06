
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Laptop, LogOut, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type SessionType = {
  id: string;
  device: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  ip: string;
  location: string;
  time: string;
  isActive: boolean;
  isCurrent: boolean;
};

const LoginSessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<SessionType[]>([
    {
      id: '1',
      device: 'Samsung Galaxy S21',
      deviceType: 'mobile',
      browser: 'Chrome',
      ip: '103.204.XX.XX',
      location: 'ঢাকা, বাংলাদেশ',
      time: 'বর্তমান সেশন',
      isActive: true,
      isCurrent: true,
    },
    {
      id: '2',
      device: 'MacBook Pro',
      deviceType: 'desktop',
      browser: 'Safari',
      ip: '103.204.XX.XX',
      location: 'ঢাকা, বাংলাদেশ',
      time: '২ ঘন্টা আগে',
      isActive: true,
      isCurrent: false,
    },
    {
      id: '3',
      device: 'iPhone 13',
      deviceType: 'mobile',
      browser: 'Safari',
      ip: '103.198.XX.XX',
      location: 'চট্টগ্রাম, বাংলাদেশ',
      time: '১ দিন আগে',
      isActive: true,
      isCurrent: false,
    },
    {
      id: '4',
      device: 'HP Laptop',
      deviceType: 'desktop',
      browser: 'Firefox',
      ip: '103.204.XX.XX',
      location: 'ঢাকা, বাংলাদেশ',
      time: '৫ দিন আগে',
      isActive: false,
      isCurrent: false,
    }
  ]);

  const endSession = (sessionId: string) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, isActive: false } 
          : session
      )
    );
    
    toast({
      title: "সেশন শেষ করা হয়েছে",
      description: "লগইন সেশনটি সফলভাবে শেষ করা হয়েছে",
    });
  };

  const endAllSessions = () => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.isCurrent 
          ? session 
          : { ...session, isActive: false }
      )
    );
    
    toast({
      title: "সকল সেশন শেষ করা হয়েছে",
      description: "বর্তমান সেশন ছাড়া অন্যান্য সকল সেশন সফলভাবে শেষ করা হয়েছে",
    });
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'desktop':
      case 'tablet':
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  const activeSessions = sessions.filter(session => session.isActive);
  const inactiveSessions = sessions.filter(session => !session.isActive);

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
        <h1 className="text-xl font-semibold">লগইন সেশন</h1>
      </div>

      <div className="space-y-6">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-600">সতর্কতা</AlertTitle>
          <AlertDescription className="text-amber-600">
            আপনি যদি কোনো অচেনা ডিভাইস থেকে লগইন দেখতে পান, তাহলে সেশনটি শেষ করুন এবং পাসওয়ার্ড পরিবর্তন করুন।
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>সক্রিয় সেশন</CardTitle>
                <CardDescription>বর্তমানে লগইন করা ডিভাইস</CardDescription>
              </div>
              {activeSessions.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={endAllSessions}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  সব লগআউট করুন
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSessions.length > 0 ? (
              activeSessions.map(session => (
                <div 
                  key={session.id}
                  className="flex justify-between items-start border p-4 rounded-lg"
                >
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div>
                      <p className="font-medium flex items-center">
                        {session.device} / {session.browser}
                        {session.isCurrent && (
                          <Badge variant="secondary" className="ml-2 text-xs">বর্তমান</Badge>
                        )}
                      </p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{session.time}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                        </p>
                        <p className="text-xs">IP: {session.ip}</p>
                      </div>
                    </div>
                  </div>
                  
                  {!session.isCurrent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => endSession(session.id)}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">কোন সক্রিয় সেশন নেই</p>
              </div>
            )}
          </CardContent>
        </Card>

        {inactiveSessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক সেশন</CardTitle>
              <CardDescription>আপনার সাম্প্রতিক লগইন ইতিহাস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {inactiveSessions.map(session => (
                <div 
                  key={session.id}
                  className="flex justify-between items-start border p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div>
                      <p className="font-medium">{session.device} / {session.browser}</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{session.time}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                        </p>
                        <p className="text-xs">IP: {session.ip}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-muted-foreground border-muted">সেশন শেষ</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginSessions;
