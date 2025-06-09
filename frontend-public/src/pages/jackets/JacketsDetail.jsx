import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import './JacketsDetail.css';

function JacketsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jacket, setJacket] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: ''
  });

  // Cargar los datos del backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch jacket data');
        return res.json();
      })
      .then(data => setJacket(data))
      .catch(err => console.error("Error fetching jacket:", err));
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  if (!jacket) return <h2>Loading jacket...</h2>;

  return (
    <div className="container-fluid margin-top-global">
      <div className="jackets-card">
        <div className="jackets-card__content">
          <button onClick={handleBackClick} className="btn btn-back">
            ← BACK
          </button>

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

          <button className="btn btn-back">ADD TO CART</button>
        </div>

        <div className="jackets-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
            MAKE YOUR REVIEW
          </button>
          <Reviews id={jacket._id} />
        </div>

        {showPopup && (
          <div className={`review-popup ${isClosing ? 'fade-out-c' : 'fade-in-c'}`}>
            <div className="review-popup-content">
              <h3>MAKE YOUR REVIEW</h3>
              <input
                type="text"
                placeholder="YOUR NAME"
                value={reviewForm.user}
                onChange={e => setReviewForm({ ...reviewForm, user: e.target.value })}
              />
              <select
                value={reviewForm.rating}
                onChange={e => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(star => (
                  <option key={star} value={star}>{star} ★</option>
                ))}
              </select>
              <textarea
                placeholder="COMMENTS"
                value={reviewForm.comment}
                onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
              />
              <div className="popup-buttons">
                <button
                  className="btn"
                  onClick={() => {
                    console.log({
                      productId: jacket._id,
                      ...reviewForm
                    });
                    alert("REVIEW SAVED");
                    setShowPopup(false);
                  }}
                >
                  SEND REVIEW
                </button>
                <button className="btn" onClick={handleClosePopup}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JacketsDetail;
