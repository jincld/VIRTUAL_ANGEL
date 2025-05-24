import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SaleDetail.css';

const SaleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/order/${id}`);
        setSale(response.data);
      } catch (error) {
        console.error("Error fetching sale detail:", error);
        setSale(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!sale) return <p>Sale not found</p>;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button className="back-button-sd margin-top-global" onClick={handleBack}>← BACK</button>
      <div className="back-saledetail"></div>
      <div className="heightfix-sale">
        <div className="detail-container">
          <h2>Sale Detail #{sale._id || sale.id}</h2>
          <form className="detail-form">
            <label>
              Date:
              <input type="date" value={sale.date || ''} readOnly />
            </label>
            <label>
              Status:
              <input type="text" value={sale.status} readOnly />
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
              <input type="text" value={sale.paymentMethod || ''} readOnly />
            </label>
            <label>
              User Email:
              <input type="email" value={sale.user || ''} readOnly />
            </label>
            <label>
              Address:
              <input type="text" value={sale.address || ''} readOnly />
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default SaleDetail;

