import React from 'react';
import OrdersTable from './ordersTable';
import { useNavigate, Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  console.log('Rendering Orders Component');
  return (
    <div className="orders-page margin-top-global">
      <OrdersTable />
    </div>
  );
};

export default Orders;
