import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import './ShirtsDetail.css';

function ShirtsDetail() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  const [shirt, setShirt] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: ''
  });

  // Cargar datos desde el backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch shirt data');
        return res.json();
      })
      .then(data => setShirt(data))
      .catch(err => console.error("Error fetching shirt:", err));
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Volver atrás
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  if (!shirt) return <h2>Loading shirt...</h2>;

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

          <Link to="/" className="btn btn-back">ADD TO CART</Link>
        </div>

        <div className="shirts-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
            MAKE YOUR REVIEW
          </button>

          <Reviews id={shirt._id} />
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
                      productId: shirt._id,
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

export default ShirtsDetail;
