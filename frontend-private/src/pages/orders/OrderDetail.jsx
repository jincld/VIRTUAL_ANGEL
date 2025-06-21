import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(undefined);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/orders/${id}`);
        if (response.status === 404) {
          console.warn("Orden no encontrada");
          setOrder(null);
          return;
        }

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setOrder(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setOrder(null);
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
      const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      alert("Order status updated successfully.");

      if (status === "Finished") {
        navigate('/sales');
      } else {
        navigate('/orders');
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    }
  };

  if (order === null) {
    return (
      <div className="detail-container">
        <h2>Order not found</h2>
        <p>The order you're trying to view does not exist.</p>
        <button className="back-button-ord" onClick={() => navigate('/orders')}>← Back to Orders</button>
      </div>
    );
  }

  if (order === undefined) {
    return (
      <div className="detail-container">
        <p>Loading...</p>
      </div>
    );
  }

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
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Finished">Finished</option>
 </select>
            </label>
            <label>
              Total:
              <input type="number" value={order.total ?? 0} readOnly />
            </label>
            <label>
              Items:
              <input type="number" value={order.totalquantity ?? (order.products?.reduce((sum, p) => sum + p.quantity, 0) ?? 0)} readOnly />
            </label>
            <label>
              User:
              <input
                type="text"
                value={
                  typeof order.idCustomer === 'object'
                    ? order.idCustomer.email
                    : order.idCustomer || '—'
                }
                readOnly
              />
            </label>
            <label>
              Address:
              <textarea value={order.address || ''} readOnly />
            </label>

            <button type="button" className="update-button" onClick={handleUpdate}>
              Update Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
