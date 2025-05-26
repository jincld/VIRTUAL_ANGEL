import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/Reviews/ReviewsAdmin";
import './PantsDetail.css';

function PantsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pant, setPant] = useState(null);

  useEffect(() => {
    const fetchPant = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/product/${id}`, {
          withCredentials: true
        });
        setPant(res.data);
      } catch (error) {
        console.error("Error fetching pant:", error);
      }
    };

    fetchPant();
  }, [id]);

  if (!pant) return <h2>Loading pant...</h2>;

  const handleBackClick = () => navigate(-1);

  return (
    <div className="container-fluid margin-top-global">
      <div className="pants-card">
        <div className="pants-card__content">
          <button onClick={handleBackClick} className="btn btn-back">← BACK</button>
          <div className="pants-card__image-wrapper">
            <img className="img-item" src={pant.image} alt={pant.name} />
          </div>
          <h2 className="pant-title">{pant.name}</h2>
          <div className="pant-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: pant.colorcode }}></div>
              <div className="pant-meta-row">
                <p className="pant-collection">Collection: {pant.coleccion}</p>
                <p className="pant-price">${pant.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pants-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={pant._id} />
        </div>
      </div>
    </div>
  );
}

export default PantsDetail;
