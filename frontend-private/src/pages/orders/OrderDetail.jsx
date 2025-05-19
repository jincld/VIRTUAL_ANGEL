import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import ordersData from './ordersData';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const order = ordersData.find(o => o.id === id);

  if (!order) return <p>Order not found</p>;

    const navigate = useNavigate();
const handleBack = () => {
  navigate(-1); // Esto te regresa a la página anterior
};

  return (
    <>

<button className="back-button-sd margin-top-global" onClick={handleBack}>← BACK</button>
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
              <select defaultValue={order.estado}>
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
              <input type="number" value={order.items} readOnly />
            </label>
            <label>
              User:
              <input type="text" value={order.usuario} readOnly />
            </label>
            <label>
              Address:
              <textarea value={order.direccion} readOnly />
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
