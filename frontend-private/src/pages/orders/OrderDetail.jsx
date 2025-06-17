import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetail.css';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/order/${id}`);
        setOrder(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedOrder = { ...order, status };
      await axios.put(`http://localhost:3001/api/order/${id}`, updatedOrder);
      toast.success("Order status updated successfully.");
      
      // Redirige a /sales si el estado es "Finished", si no a /orders
      if (status === "Finished") {
        navigate('/sales');
      } else {
        navigate('/orders');
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <button className="back-button-ord margin-top-global" onClick={() => window.history.back()}>
        ← BACK
      </button>

      <div className="back-orderdetail"></div>
      <div className="heightfix-order">
        <div className="detail-container">
          <h2>Order Detail #{order._id}</h2>
          <form className="detail-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Date:
              <input type="date" value={order.date?.slice(0, 10) || ''} readOnly />
            </label>
            <label>
              Status:
              <select value={status} onChange={handleStatusChange}>
                <option>In progress</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Shipped</option>
                <option>Canceled</option>
                <option>Finished</option>
              </select>
            </label>
            <label>
              Total:
              <input type="number" value={order.total} readOnly />
            </label>
            <label>
              Items:
              <input type="number" value={order.items || 0} readOnly />
            </label>
            <label>
              User:
              <input type="text" value={order.user || ''} readOnly />
            </label>
            <label>
              Address:
              <textarea value={order.address} readOnly />
            </label>

            <button type="button" className="update-button-st" onClick={handleUpdate}>
              Update Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;

