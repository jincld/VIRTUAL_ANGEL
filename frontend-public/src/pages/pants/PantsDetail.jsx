import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews"; // Asegúrate que reciba id como prop
import './PantsDetail.css';

function PantsDetail() {
  const { id } = useParams();  // Obtenemos el id desde la URL
  const navigate = useNavigate();

  const [pant, setPant] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: ''
  });

  // Cargar datos del pantalón desde el backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch pant data');
        return res.json();
      })
      .then(data => setPant(data))
      .catch(err => console.error("Error fetching pant:", err));
  }, [id]);

  const handleBackClick = () => navigate(-1);

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  if (!pant) return <h2>Loading pant...</h2>;

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

          <Link to="/" className="btn btn-back">ADD TO CART</Link>
        </div>

        <div className="pants-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
            MAKE YOUR REVIEW
          </button>

          <Reviews id={pant._id} />
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
                      productId: pant._id,
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

export default PantsDetail;
