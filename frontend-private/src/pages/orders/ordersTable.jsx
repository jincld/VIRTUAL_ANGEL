// OrdersTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './Orders.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/order');
      console.log('Orders API response:', response.data);

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        console.error("La respuesta no contiene un array de órdenes.");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log('Orders state:', orders);
  }, [orders]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="backorders"></div>
      
      <div className="orders-container">
<div className="orders-header">
  <h2>ORDERS</h2>
  <div className="orders-buttons">
    <button className="icon-button" onClick={() => window.print()}>🖨️</button>
    <button className="icon-button">⬇️</button>
  </div>
</div>

        <div className="orders-table-wrapper">
          
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>TOTAL</th>
                <th>ITEMS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No orders found.</td>
                </tr>
              ) : (
                currentData.map((order) => (
                  <tr key={order._id || order.id}>
                    <td data-label="ORDER">#{order._id || order.id}</td>
                    <td data-label="DATE">{order.fecha || order.date || '—'}</td>
                    <td data-label="STATUS">{order.estado || order.status || '—'}</td>
                    <td data-label="TOTAL">${order.total ?? 0}</td>
                    <td data-label="ITEMS">{order.items ?? 0}</td>
                    <td data-label="">
                      <Link to={`/orders/${order._id || order.id}`} className="view-button">
                        VIEW DETAILS →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



        <div className="orders-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;






