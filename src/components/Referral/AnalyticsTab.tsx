
import React from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, BarChart3, PieChart as PieChartIcon, Medal } from 'lucide-react';

const AnalyticsTab = () => {
  const { referralData, loading } = useReferralData();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
        <p>অ্যানালিটিক্স লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!referralData) return null;

  const { analytics } = referralData;

  // Colors for the pie chart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">কনভার্শন রেট</p>
                <h3 className="text-2xl font-bold">{analytics.conversionRate}%</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">সেরা চ্যানেল</p>
                <h3 className="text-xl font-bold">{analytics.bestPerformingChannel}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Medal className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">সেরা দিন</p>
                <h3 className="text-xl font-bold">{analytics.bestPerformingDay}</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">গড় উপার্জন/রেফারেল</p>
                <h3 className="text-2xl font-bold">{referralData.referralRate} ৳</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Line Chart: Daily Performance */}
      <Card>
        <CardHeader>
          <CardTitle>দৈনিক রেফারেল ট্রেন্ড</CardTitle>
          <CardDescription>
            গত ১০ দিনের রেফারেল সংখ্যা এবং উপার্জন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics.dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'referrals') return [`${value} জন`, 'রেফারেল'];
                    if (name === 'earnings') return [`${value} ৳`, 'উপার্জন'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="referrals" stroke="#8884d8" name="রেফারেল" />
                <Line yAxisId="right" type="monotone" dataKey="earnings" stroke="#82ca9d" name="উপার্জন" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Pie Chart: Channel Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>চ্যানেল ডিস্ট্রিবিউশন</CardTitle>
          <CardDescription>
            বিভিন্ন চ্যানেল থেকে আসা রেফারেল
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="referrals"
                    nameKey="channel"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} জন`, 'রেফারেল']}
                    labelFormatter={(label) => `চ্যানেল: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                {analytics.channelData.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span>{channel.channel}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{channel.referrals} জন</span>
                      <span className="text-sm text-muted-foreground">({channel.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bar Chart: Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>রেফারেল পারফরম্যান্স</CardTitle>
          <CardDescription>
            মাসিক রেফারেল সংখ্যা এবং উপার্জন তুলনা
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { month: 'জানুয়ারি', referrals: 5, earnings: 2500 },
                  { month: 'ফেব্রুয়ারি', referrals: 8, earnings: 4000 },
                  { month: 'মার্চ', referrals: 12, earnings: 6000 },
                  { month: 'এপ্রিল', referrals: 10, earnings: 5000 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'referrals') return [`${value} জন`, 'রেফারেল'];
                    if (name === 'earnings') return [`${value} ৳`, 'উপার্জন'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar dataKey="referrals" name="রেফারেল" fill="#8884d8" />
                <Bar dataKey="earnings" name="উপার্জন" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
