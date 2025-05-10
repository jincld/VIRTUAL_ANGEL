import React from 'react';
import OrdersTable from './ordersTable';

const Orders = () => {
  console.log('Rendering Orders Component'); // Check if this is printed
  return (
    <div className="orders-page">
      <h1>Orders Page</h1>
      <OrdersTable />
    </div>
  );
};

export default Orders;
