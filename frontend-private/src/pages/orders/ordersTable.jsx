import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders');
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
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
                  <tr key={order._id}>
                    <td data-label="ORDER">#{order._id}</td>
                    <td data-label="DATE">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                    <td data-label="STATUS">{order.status || '—'}</td>
                    <td data-label="TOTAL">${order.total ?? 0}</td>
                    <td data-label="ITEMS">{order.totalquantity ?? order.products?.reduce((sum, p) => sum + p.quantity, 0) ?? 0}</td>
                    <td data-label="">
                      <Link to={`/orders/${order._id}`} className="view-button">
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
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
