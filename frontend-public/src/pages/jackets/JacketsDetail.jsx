import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import { useCart } from "../../context/CartContext";  // Contexto del carrito
import toast from 'react-hot-toast';
import './JacketsDetail.css';

function JacketsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [jacket, setJacket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

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

  const handleBackClick = () => navigate(-1);

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (jacket) {
      const productToAdd = {
        id: jacket._id,
        title: jacket.name,
        price: jacket.price,
        image: jacket.image,
        size: jacket.size,
        color: jacket.color,
        collection: jacket.coleccion,
        quantity: quantity
      };

      addToCart(productToAdd);
      toast.success(`${quantity} Product(s) added to cart`);
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
      toast.error("Please complete the comment field");
      return;
    }

    fetch("http://localhost:3001/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        idProducts: jacket._id,
        comment: reviewForm.comment,
        assessment: reviewForm.rating
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Review saved:", data);
        toast.success("Review saved");
        setShowPopup(false);
        window.location.reload(); // Refresca para mostrar nuevas reseñas
      })
      .catch(err => {
        console.error("Error saving review:", err);
        toast.error("There was an error saving your review");
      });
  };

  if (!jacket) return <h2>Loading jacket...</h2>;

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

<div className="cart-controls">

  <button onClick={handleAddToCart} className="btn btn-back">
    ADD TO CART
  </button>

    <div className="quantity-selector">
    <button className="btn" onClick={handleDecrement}>-</button>
    <span className="quantity-display">{quantity}</span>
    <button className="btn" onClick={handleIncrement}>+</button>
  </div>
</div>
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

export default JacketsDetail;
