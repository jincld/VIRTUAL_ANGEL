import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/Reviews/ReviewsAdmin"; 
import './SweatersDetail.css';

function SweatersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sweater, setSweater] = useState(null);

  useEffect(() => {
    const fetchSweater = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/product/${id}`, {
          withCredentials: true
        });
        setSweater(res.data);
      } catch (error) {
        console.error("Error fetching sweater:", error);
      }
    };

    fetchSweater();
  }, [id]);

  if (!sweater) {
    return <h2>Loading sweater...</h2>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container-fluid margin-top-global">
      <div className="sweaters-card">
        <div className="sweaters-card__content">
          <button onClick={handleBackClick} className="btn btn-back">← BACK</button>

          <div className="sweaters-card__image-wrapper">
            <img className="img-item" src={sweater.image} alt={sweater.name} />
          </div>

          <h2 className="sweater-title">{sweater.name}</h2>

          <div className="sweater-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: sweater.colorcode }}></div>
              <p className="sweater-collection">Collection: {sweater.coleccion}</p>
            </div>
            <p className="sweater-price">${sweater.price}</p>
          </div>
        </div>

        <div className="sweaters-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={sweater._id} />
        </div>
      </div>
    </div>
  );
}

export default SweatersDetail;
