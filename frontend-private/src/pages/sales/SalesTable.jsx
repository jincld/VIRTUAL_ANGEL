import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Sales.css";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/order");
        // Suponiendo que response.data es un array de ventas
        // Filtra solo ventas finalizadas (por ejemplo status === 'completed')
        const finishedSales = response.data.filter(
          (sale) => sale.status === "Finished"
        );
        setSales(finishedSales);
      } catch (error) {
        console.error("Error fetching sales:", error);
        setSales([]);
      }
    };

    fetchSales();
  }, []);

  const totalPages = Math.ceil(sales.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = sales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="backsales"></div>
      <div className="sales-container">
        <div className="sales-header">
          <div className="logo-print">
            <img src="/logo-dark.png" alt="Logo Print" />
          </div>
          <h2>SALES</h2>
          <div className="sales-buttons">
            <button className="icon-button" onClick={() => window.print()}>
              🖨️
            </button>
            <button className="icon-button">⬇️</button>
          </div>
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
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No completed sales found.
                  </td>
                </tr>
              ) : (
                currentData.map((sale) => (
                  <tr key={sale._id || sale.id}>
                    <td data-label="SALE ID">#{sale._id || sale.id}</td>
                    <td data-label="DATE">{sale.date || sale.fecha}</td>
                    <td data-label="STATUS">{sale.status || sale.estado}</td>
                    <td data-label="TOTAL">${sale.total ?? 0}</td>
                    <td data-label="ITEMS">{sale.items ?? 0}</td>
                    <td data-label="">
                      <Link
                        to={`/sales/${sale._id || sale.id}`}
                        className="view-button"
                      >
                        VIEW DETAILS →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="sales-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesTable;

