import React from 'react';
import OrdersTable from './ordersTable';
import './Orders.css';

const Orders = () => {
  console.log('Rendering Orders Component');
  return (
    <div className="orders-page">
      <OrdersTable />
    </div>
  );
};

export default Orders;
