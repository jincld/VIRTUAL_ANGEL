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
      console.log("API Response:", response.data);
      // Asegúrate de que response.data sea un array, si no lo es, ajusta el acceso
      setOrders(Array.isArray(response.data) ? response.data : response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

  const currentData = Array.isArray(orders)
    ? orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <>
    <div className="backorders"></div>
      <div className="orders-container">
        <h2>ORDERS</h2>

        <div className="orders-buttons">
          <button className="icon-button" onClick={() => window.print()}>
            🖨️
          </button>
          <button className="icon-button">
            ⬇️ {/* Puedes conectar este botón a una función para descargar CSV si lo deseas */}
          </button>
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
                <tr key={order._id || order.id}>
                  <td data-label="ORDER">#{order._id || order.id}</td>
                  <td data-label="DATE">{order.date || order.fecha}</td>
                  <td data-label="STATUS">{order.status || order.estado}</td>
                  <td data-label="TOTAL">${order.total}</td>
                  <td data-label="ITEMS">{order.items}</td>
                  <td data-label="">
                    <Link to={`/orders/${order._id || order.id}`} className="view-button">
                      VIEW DETAILS →
                    </Link>
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



