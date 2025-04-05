
import React from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

const LeaderboardTab = () => {
  const { referralData, loading } = useReferralData();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
        <p>লিডারবোর্ড লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!referralData) return null;

  const { leaderboard } = referralData;
  
  // Function to get trophy icon and color
  const getRankDecoration = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: <Trophy className="h-6 w-6 text-amber-500" />,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-900',
          borderColor: 'border-amber-200'
        };
      case 2:
        return {
          icon: <Medal className="h-6 w-6 text-slate-400" />,
          bgColor: 'bg-slate-100',
          textColor: 'text-slate-900',
          borderColor: 'border-slate-200'
        };
      case 3:
        return {
          icon: <Award className="h-6 w-6 text-amber-700" />,
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-100'
        };
      default:
        return {
          icon: <span className="font-bold text-lg">{rank}</span>,
          bgColor: 'bg-secondary/20',
          textColor: 'text-foreground',
          borderColor: 'border-secondary/30'
        };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>টপ রেফারারস</CardTitle>
          <CardDescription>
            সর্বোচ্চ রেফারেল করা ব্যবহারকারীদের তালিকা
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.users.map((user, index) => {
              const decoration = getRankDecoration(user.rank);
              const isCurrentUser = user.id === ('1'); // For demo, we're assuming user with ID 1 is current user
              
              return (
                <div 
                  key={user.id} 
                  className={`p-4 rounded-lg border ${decoration.borderColor} ${decoration.bgColor} ${isCurrentUser ? 'animate-pulse-subtle' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border">
                        {decoration.icon}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{user.name}</h3>
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">আপনি</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          মোট রেফারেল: {user.referrals}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">{user.earnings} ৳</p>
                      <p className="text-xs text-muted-foreground">
                        মোট উপার্জন
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-muted-foreground text-sm">আপনার র‍্যাঙ্ক:</span>
              <span className="font-semibold ml-2">{leaderboard.currentUserRank}</span>
            </div>
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">টপ 100</Badge>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>ম্যাক্সিমাম উপার্জনকারী</CardTitle>
          <CardDescription>
            যারা সর্বাধিক অর্থ উপার্জন করেছেন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaderboard.users.slice(0, 4).map((user, index) => (
              <div key={user.id} className="flex items-center gap-4 p-4 rounded-lg border bg-secondary/10">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 10}`} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{user.name}</h3>
                    <span className="text-xs bg-secondary/20 px-2 py-0.5 rounded-full">#{user.rank}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">{user.referrals} রেফারেল</p>
                    <p className="font-semibold">{user.earnings} ৳</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-primary/5 to-purple-100 border border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1">লিডার ক্লাবে যোগদান করুন!</h3>
              <p className="text-sm">
                আপনার র‍্যাঙ্ক উন্নত করতে আরও বন্ধুদের আমন্ত্রণ জানান। টপ 10 রেফারারদের জন্য আছে বিশেষ পুরস্কার!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardTab;
