import { useParams, useNavigate, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import ordersData from './ordersData';

import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = fetch(`http://localhost:3001/api/order`); 
        console.log(response) // Asegúrate de tener la URL correcta
        alert("en fetch")
        setOrder(response);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <>

      <button className="back-button-ord margin-top-global" onClick={() => window.history.back()}>← BACK</button>

      <div className="back-orderdetail"></div>
      <div className="heightfix-order">
        <div className="detail-container">
          <h2>Order Detail #{order.id}</h2>
          <form className="detail-form">
            <label>
              Date:
              <input type="date" value={order.fecha} readOnly />
            </label>
            <label>
              Status:
              <select value={order.estado}>
                <option>In progress</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Shipped</option>
                <option>Canceled</option>
              </select>
            </label>
            <label>
              Total:
              <input type="number" value={order.total} readOnly />
            </label>
            <label>
              Items:
              <input type="number" value={order.idProducts.length} readOnly />
              </label>
        <label>
          User:
          <input type="text" value={order.idCustomer?.email || ''} readOnly />
        </label>
        <label>
          Address:
          <textarea value={order.address} readOnly />
        </label>
      </form>
    </div>
  </div>
</>
);
};
export default OrderDetail;

 

