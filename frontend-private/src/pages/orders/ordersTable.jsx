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
    <>
      <div className="backorders"></div>
      <div className="orders-container">
<div className="orders-header">
  <div className="logo-print">
    <img src="/logo-dark.png" alt="Logo Print" />
  </div>
  <h2>ORDERS</h2>
  <div className="orders-buttons">
    <button className="icon-button" onClick={() => window.print()}>
      🖨️
    </button>
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
              {currentData.map((order) => (
                <tr key={order.id}>
                  <td data-label="ORDER">#{order.id}</td>
                  <td data-label="DATE">{order.fecha}</td>
                  <td data-label="STATUS">{order.estado}</td>
                  <td data-label="TOTAL">${order.total}</td>
                  <td data-label="ITEMS">{order.items}</td>
                  <td data-label="">
                    <button
                      className="view-button"
                      onClick={() => window.location.href = `/orders/${order.id}`}
                    >
                      VIEW DETAILS →
                    </button>
                  </td>
                </tr>
              ))}
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
