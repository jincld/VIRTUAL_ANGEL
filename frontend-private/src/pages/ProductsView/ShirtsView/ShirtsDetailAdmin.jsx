import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../../components/Reviews/ReviewsAdmin";
import './ShirtsDetail.css';

function ShirtsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shirt, setShirt] = useState(null);

  useEffect(() => {
    const fetchShirt = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/product/${id}`, {
          withCredentials: true
        });
        setShirt(res.data);
      } catch (error) {
        console.error("Error fetching shirt:", error);
      }
    };

    fetchShirt();
  }, [id]);

  if (!shirt) return <h2>Loading shirt...</h2>;

  const handleBackClick = () => navigate(-1);

  return (
    <div className="container-fluid margin-top-global">
      <div className="shirts-card">
        <div className="shirts-card__content">
          <button onClick={handleBackClick} className="btn btn-back">← BACK</button>
          <div className="shirts-card__image-wrapper">
            <img className="img-item" src={shirt.image} alt={shirt.name} />
          </div>
          <h2 className="shirt-title">{shirt.name}</h2>
          <div className="shirt-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: shirt.colorcode }}></div>
              <p className="shirt-collection">Collection: {shirt.coleccion}</p>
            </div>
            <p className="shirt-price">${shirt.price}</p>
          </div>
        </div>
        <div className="shirts-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={shirt._id} />
        </div>
      </div>
    </div>
  );
}

export default ShirtsDetail;
