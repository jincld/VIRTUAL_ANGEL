import React, { useState } from 'react';
import salesData from "./SalesData.jsx"; // Asegúrate de tener datos de ventas
import './Sales.css';

const SalesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(salesData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = salesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="backsales">
      <div className="sales-container">
        <div className="sales-header">
          <h2>SALES</h2>
        </div>

        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>SALE ID</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>TOTAL</th>
                <th>ITEMS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((sale) => (
                <tr key={sale.id}>
                  <td data-label="SALE ID">#{sale.id}</td>
                  <td data-label="DATE">{sale.date}</td>
                  <td data-label="STATUS">{sale.status}</td>
                  <td data-label="TOTAL">${sale.total}</td>
                  <td data-label="ITEMS">{sale.items}</td>
                  <td data-label="">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sales-pagination">
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

export default SalesTable;
