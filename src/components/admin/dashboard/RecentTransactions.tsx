
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adminTheme } from '@/themes/adminTheme';

interface Transaction {
  id: string;
  amount: string;
  type: string;
  user: string;
  status: string;
  time: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Card className="overflow-hidden shadow-md border border-gray-100">
      <CardHeader className="pb-2 bg-white">
        <CardTitle className="text-lg">সাম্প্রতিক ট্রানজেকশন</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">আইডি</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">পরিমাণ</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ধরন</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ব্যবহারকারী</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">স্ট্যাটাস</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">সময়</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.id} className={index < transactions.length - 1 ? "border-b hover:bg-gray-50" : "hover:bg-gray-50"}>
                  <td className="py-3 px-4">{tx.id}</td>
                  <td className="py-3 px-4 font-medium">{tx.amount}</td>
                  <td className="py-3 px-4">{tx.type}</td>
                  <td className="py-3 px-4">{tx.user}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.status === 'সম্পন্ন' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 mb-4 flex justify-center">
          <Button 
            variant="outline"
            style={{ borderColor: adminTheme.colors.primary, color: adminTheme.colors.primary }}
          >
            সব ট্রানজেকশন দেখুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
