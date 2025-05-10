import React, { useState } from 'react';
import ordersData from './ordersData';
import './Orders.css';

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = ordersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="backorders">
      <div className="orders-container">
        <div className="orders-header">
          <h2>ORDERS</h2>
          <div className="orders-buttons">
            <button className="icon-button">🖨️</button>
            <button className="icon-button">⋮</button>
            <button className="icon-button">⬇️</button>
          </div>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>TOTAL</th>
              <th>ITEMS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.fecha}</td>
                <td>{order.estado}</td>
                <td>${order.total}</td>
                <td>{order.items}</td>
                <td>
                  <button className="view-button">VIEW DETAILS →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
    </div>
  );
};

export default OrdersTable;

