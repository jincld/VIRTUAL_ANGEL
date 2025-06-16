// ShirtsDetail.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import { useCart } from "../../context/CartContext";  // Accede al contexto de carrito
import toast from 'react-hot-toast';
import './ShirtsDetail.css';

function ShirtsDetail() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const { addToCart } = useCart();  // Accede a la función addToCart

  const [shirt, setShirt] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  

  // Cargar datos del producto
  useEffect(() => {
    fetch(`http://localhost:3001/api/product/${id}`, { credentials: 'include' })
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

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  

  const handleAddToCart = () => {
    if (shirt) {
      const productToAdd = {
        id: shirt._id,
        title: shirt.name,
        price: shirt.price,
        image: shirt.image,
        size: shirt.size,
        color: shirt.color,
        collection: shirt.coleccion,
        quantity: quantity,
      };
  
      addToCart(productToAdd);
      toast(`${quantity} Product(s) added to cart`);
    }
  };
  
  

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  // Función que maneja el envío de la reseña
  const handleSendReview = () => {
    if (!reviewForm.comment || reviewForm.comment.trim() === "") {
      toast.error("Please complete the comment field");
      return;
    }
  
    fetch("http://localhost:3001/api/assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idProducts: shirt._id,
        comment: reviewForm.comment,
        assessment: reviewForm.rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Reseña guardada:", data);
        toast.success("Review saved");
        setShowPopup(false);
        // Retrasar el reload 3 segundos (3000 ms)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error al guardar la reseña:", error);
        toast.error("There was an error saving your review");
      });
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

          {/* Botón para añadir al carrito */}
          <button onClick={handleAddToCart} className="btn btn-back">
            ADD TO CART
          </button>

          <div className="quantity-selector">
  <button className="btn" onClick={handleDecrement}>-</button>
  <span className="quantity-display">{quantity}</span>
  <button className="btn" onClick={handleIncrement}>+</button>
</div>

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
              <button className="btn" onClick={handleSendReview}>
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

