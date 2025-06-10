import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import { useCart } from "../../context/CartContext"; // Contexto del carrito
import './PantsDetail.css';

function PantsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();  // Agrega al carrito

  const [pant, setPant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  // Cargar datos del pantalón
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch pant data');
        return res.json();
      })
      .then(data => setPant(data))
      .catch(err => console.error("Error fetching pant:", err));
  }, [id]);

  const handleBackClick = () => navigate(-1);

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (pant) {
      const productToAdd = {
        id: pant._id,
        title: pant.name,
        price: pant.price,
        image: pant.image,
        size: pant.size,
        color: pant.color,
        collection: pant.coleccion,
        quantity: quantity
      };

      addToCart(productToAdd);
      alert(`${quantity} piece(s) added to cart!`);
    }
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSendReview = () => {
    if (!reviewForm.comment || reviewForm.comment.trim() === "") {
      alert("Please complete the comment field");
      return;
    }

    fetch("http://localhost:3001/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        idProducts: pant._id,
        comment: reviewForm.comment,
        assessment: reviewForm.rating
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Review saved:", data);
        alert("Review saved!");
        setShowPopup(false);
        window.location.reload(); // Recarga para ver reseñas actualizadas
      })
      .catch(err => {
        console.error("Error saving review:", err);
        alert("There was an error saving your review.");
      });
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

          <button onClick={handleAddToCart} className="btn btn-back">
            ADD TO CART
          </button>

          <div className="quantity-selector">
            <button className="btn" onClick={handleDecrement}>-</button>
            <span className="quantity-display">{quantity}</span>
            <button className="btn" onClick={handleIncrement}>+</button>
          </div>
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

              <select
                value={reviewForm.rating}
                onChange={e => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(star => (
                  <option key={star} value={star}>{star} ★</option>
                ))}
              </select>

              <textarea
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: '100px',
                  maxHeight: '150px',
                  minHeight: '40px'
                }}
                placeholder="COMMENTS"
                value={reviewForm.comment}
                onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
              />

              <div className="popup-buttons">
                <button className="btn" onClick={handleSendReview}>SEND REVIEW</button>
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
