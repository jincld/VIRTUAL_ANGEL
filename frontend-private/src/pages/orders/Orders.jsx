import React from 'react';
import OrdersTable from './ordersTable';

const Orders = () => {
  console.log('Rendering Orders Component'); // Check if this is printed
  return (
    <div className="orders-page orders-view">
      <OrdersTable />
    </div>
  );
};

export default Orders;
