import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import salesData from './SalesData';
import './SaleDetail.css';

const SaleDetail = () => {
  const { id } = useParams();
  const sale = salesData.find(s => s.id === id);

  if (!sale) return <p>Sale not found</p>;

  const navigate = useNavigate();
const handleBack = () => {
  navigate(-1); // Esto te regresa a la página anterior
};


  return (
    <>
    <button className="back-button-sd margin-top-global" onClick={handleBack}>← BACK</button>

          <div className="back-saledetail"></div>
          <div className="heightfix-sale">
    <div className="detail-container">
      
      <h2>Sale Detail #{sale.id}</h2>
      <form className="detail-form">
        <label>
          Date:
          <input type="date" value={sale.date} readOnly />
        </label>
        <label>
          Status:
          <select defaultValue={sale.status}>
            <option>In progress</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Shipped</option>
            <option>Canceled</option>
          </select>
        </label>
        <label>
          Total:
          <input type="number" value={sale.total} readOnly />
        </label>
        <label>
          Items:
          <input type="number" value={sale.items} readOnly />
        </label>
        <label>
          Payment Method:
          <input type="text" value={sale.metodoPago} readOnly />
        </label>
        <label>
          User Email:
          <input type="email" value={sale.usuario} readOnly />
        </label>
        <label>
          Address:
          <input type="text" value={sale.direccion} readOnly />
        </label>
      </form>
    </div>
    </div>
    </>
  );
};

export default SaleDetail;
