import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/Reviews/ReviewsAdmin";
import './JacketsDetail.css';

function JacketsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jacket, setJacket] = useState(null);

  useEffect(() => {
    const fetchJacket = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/product/${id}`, {
          withCredentials: true
        });
        setJacket(res.data);
      } catch (error) {
        console.error("Error fetching jacket:", error);
      }
    };

    fetchJacket();
  }, [id]);

  if (!jacket) return <h2>Loading jacket...</h2>;

  const handleBackClick = () => navigate(-1);

  return (
    <div className="container-fluid margin-top-global">
      <div className="jackets-card">
        <div className="jackets-card__content">
          <button onClick={handleBackClick} className="btn btn-back">← BACK</button>
          <div className="jackets-card__image-wrapper">
            <img className="img-item" src={jacket.image} alt={jacket.name} />
          </div>
          <h2 className="jacket-title">{jacket.name}</h2>
          <div className="jacket-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: jacket.colorcode }}></div>
              <p className="jacket-collection">Collection: {jacket.coleccion}</p>
            </div>
            <p className="jacket-price">${jacket.price}</p>
          </div>
        </div>
        <div className="jackets-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={jacket._id} />
        </div>
      </div>
    </div>
  );
}

export default JacketsDetail;
