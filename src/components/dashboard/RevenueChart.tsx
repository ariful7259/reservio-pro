
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// সকল ব্যবসার ডেটা
const allBusinessData = [
  { name: 'জানু', মার্কেটপ্লেস: 4000, রেন্টাল: 2400, সার্ভিস: 2400, কন্টেন্ট: 1400 },
  { name: 'ফেব্রু', মার্কেটপ্লেস: 3000, রেন্টাল: 1398, সার্ভিস: 2210, কন্টেন্ট: 3800 },
  { name: 'মার্চ', মার্কেটপ্লেস: 2000, রেন্টাল: 9800, সার্ভিস: 2290, কন্টেন্ট: 3908 },
  { name: 'এপ্রিল', মার্কেটপ্লেস: 2780, রেন্টাল: 3908, সার্ভিস: 2000, কন্টেন্ট: 4800 },
  { name: 'মে', মার্কেটপ্লেস: 1890, রেন্টাল: 4800, সার্ভিস: 2181, কন্টেন্ট: 5000 },
  { name: 'জুন', মার্কেটপ্লেস: 2390, রেন্টাল: 3800, সার্ভিস: 2500, কন্টেন্ট: 4300 },
  { name: 'জুলাই', মার্কেটপ্লেস: 3490, রেন্টাল: 4300, সার্ভিস: 2100, কন্টেন্ট: 5300 },
];

// ব্যবসা-ভিত্তিক ডেটা ম্যাপিং
const businessDataMapping = {
  marketplace: {
    dataKey: 'মার্কেটপ্লেস',
    color: '#8884d8',
    name: 'মার্কেটপ্লেস বিক্রয়',
    data: allBusinessData.map(item => ({
      name: item.name,
      আয়: item.মার্কেটপ্লেস,
      অর্ডার: Math.floor(item.মার্কেটপ্লেস / 100),
      গ্রাহক: Math.floor(item.মার্কেটপ্লেস / 150)
    }))
  },
  rental: {
    dataKey: 'রেন্টাল',
    color: '#82ca9d',
    name: 'রেন্টাল আয়',
    data: allBusinessData.map(item => ({
      name: item.name,
      আয়: item.রেন্টাল,
      বুকিং: Math.floor(item.রেন্টাল / 200),
      প্রপার্টি: Math.floor(item.রেন্টাল / 800)
    }))
  },
  service: {
    dataKey: 'সার্ভিস',
    color: '#ffc658',
    name: 'সার্ভিস আয়',
    data: allBusinessData.map(item => ({
      name: item.name,
      আয়: item.সার্ভিস,
      সার্ভিস: Math.floor(item.সার্ভিস / 120),
      ক্লায়েন্ট: Math.floor(item.সার্ভিস / 180)
    }))
  },
  content: {
    dataKey: 'কন্টেন্ট',
    color: '#ff8042',
    name: 'ডিজিটাল কন্টেন্ট আয়',
    data: allBusinessData.map(item => ({
      name: item.name,
      আয়: item.কন্টেন্ট,
      কন্টেন্ট: Math.floor(item.কন্টেন্ট / 300),
      ক্রেতা: Math.floor(item.কন্টেন্ট / 250)
    }))
  }
};

interface RevenueChartProps {
  selectedBusinessType?: string | null;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ selectedBusinessType }) => {
  // যদি কোনো ব্যবসার ধরন সিলেক্ট না করা হয়, সকল ডেটা দেখানো হবে
  if (!selectedBusinessType) {
    return (
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={allBusinessData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `৳${value.toLocaleString()}`}
              labelFormatter={(label) => `মাস: ${label}`}
            />
            <Legend />
            <Bar dataKey="মার্কেটপ্লেস" fill="#8884d8" />
            <Bar dataKey="রেন্টাল" fill="#82ca9d" />
            <Bar dataKey="সার্ভিস" fill="#ffc658" />
            <Bar dataKey="কন্টেন্ট" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // নির্দিষ্ট ব্যবসার ধরনের ডেটা
  const businessData = businessDataMapping[selectedBusinessType as keyof typeof businessDataMapping];
  
  if (!businessData) {
    return <div className="h-[350px] w-full flex items-center justify-center">কোনো ডেটা পাওয়া যায়নি</div>;
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={businessData.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'আয়') {
                return [`৳${value.toLocaleString()}`, name];
              }
              return [value.toLocaleString(), name];
            }}
            labelFormatter={(label) => `মাস: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="আয়" 
            stroke={businessData.color} 
            strokeWidth={3}
            dot={{ fill: businessData.color, strokeWidth: 2, r: 6 }}
          />
          {selectedBusinessType === 'marketplace' && (
            <>
              <Line type="monotone" dataKey="অর্ডার" stroke="#8dd1e1" strokeWidth={2} />
              <Line type="monotone" dataKey="গ্রাহক" stroke="#d084d0" strokeWidth={2} />
            </>
          )}
          {selectedBusinessType === 'rental' && (
            <>
              <Line type="monotone" dataKey="বুকিং" stroke="#ffb347" strokeWidth={2} />
              <Line type="monotone" dataKey="প্রপার্টি" stroke="#98fb98" strokeWidth={2} />
            </>
          )}
          {selectedBusinessType === 'service' && (
            <>
              <Line type="monotone" dataKey="সার্ভিস" stroke="#ffa07a" strokeWidth={2} />
              <Line type="monotone" dataKey="ক্লায়েন্ট" stroke="#20b2aa" strokeWidth={2} />
            </>
          )}
          {selectedBusinessType === 'content' && (
            <>
              <Line type="monotone" dataKey="কন্টেন্ট" stroke="#dda0dd" strokeWidth={2} />
              <Line type="monotone" dataKey="ক্রেতা" stroke="#f0e68c" strokeWidth={2} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
