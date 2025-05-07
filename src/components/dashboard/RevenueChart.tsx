
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// মক ডেটা
const data = [
  { name: 'জানু', মার্কেটপ্লেস: 4000, রেন্টাল: 2400, সার্ভিস: 2400, কন্টেন্ট: 1400 },
  { name: 'ফেব্রু', মার্কেটপ্লেস: 3000, রেন্টাল: 1398, সার্ভিস: 2210, কন্টেন্ট: 3800 },
  { name: 'মার্চ', মার্কেটপ্লেস: 2000, রেন্টাল: 9800, সার্ভিস: 2290, কন্টেন্ট: 3908 },
  { name: 'এপ্রিল', মার্কেটপ্লেস: 2780, রেন্টাল: 3908, সার্ভিস: 2000, কন্টেন্ট: 4800 },
  { name: 'মে', মার্কেটপ্লেস: 1890, রেন্টাল: 4800, সার্ভিস: 2181, কন্টেন্ট: 5000 },
  { name: 'জুন', মার্কেটপ্লেস: 2390, রেন্টাল: 3800, সার্ভিস: 2500, কন্টেন্ট: 4300 },
  { name: 'জুলাই', মার্কেটপ্লেস: 3490, রেন্টাল: 4300, সার্ভিস: 2100, কন্টেন্ট: 5300 },
];

const RevenueChart = () => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
};

export default RevenueChart;
