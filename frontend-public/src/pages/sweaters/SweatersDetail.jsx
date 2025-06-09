import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import './SweatersDetail.css';

function SweatersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweater, setSweater] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: ''
  });

  // Obtener los datos del sweater desde el backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch sweater data');
        return res.json();
      })
      .then(data => setSweater(data))
      .catch(err => console.error("Error fetching sweater:", err));
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

  if (!sweater) return <h2>Loading sweater...</h2>;

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

          <button className="btn btn-back">ADD TO CART</button>
        </div>

        <div className="sweaters-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
            MAKE YOUR REVIEW
          </button>

          <Reviews id={sweater._id} />
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
                      productId: sweater._id,
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

export default SweatersDetail;
