
import React from 'react';
import OrdersTab from '@/components/dashboard/OrdersTab';

const Orders = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <OrdersTab businessType="marketplace" />
    </div>
  );
};

export default Orders;
