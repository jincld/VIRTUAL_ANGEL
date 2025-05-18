import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";  // Agrega Link aquí
import { useState } from 'react';
import Reviews from "../../components/Reviews/Reviews";  // Asegúrate de importar el componente Reviews

import shirtsData from "./ShirtsData";  // Asumimos que tienes este archivo
import './ShirtsDetail.css';  // O el archivo de estilos correspondiente

function ShirtsDetail() {
  const { id } = useParams();  // Aquí obtenemos el id de la URL
  const shirt = shirtsData.find(shirt => shirt.id === id);

  const navigate = useNavigate(); // Usamos el hook useNavigate

  if (!shirt) {
    return <h2>Shirt not found</h2>;
  }

  const handleBackClick = () => {
    navigate(-1);  // Esto te lleva a la última página visitada
  };


  const [isClosing, setIsClosing] = useState(false);

const handleClosePopup = () => {
  setIsClosing(true);
  setTimeout(() => {
    setShowPopup(false);
    setIsClosing(false);
  }, 300); // igual al tiempo del fade-out
};



const [showPopup, setShowPopup] = useState(false);
const [reviewForm, setReviewForm] = useState({
  user: '',
  rating: 5,
  comment: ''
});


  return (
    <div className="container-fluid margin-top-global">
      <div className="shirts-card">
        <div className="shirts-card__content">
          {/* Cambiar Link por un botón que use navigate */}
          <button onClick={handleBackClick} className="btn btn-back">← BACK</button>

          <div className="shirts-card__image-wrapper">
            <img className="img-item" src={shirt.imagen} alt={shirt.titulo} />
          </div>
          <h2 className="shirt-title">{shirt.titulo}</h2>

          <div className="shirt-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: shirt.colorcode }}></div>
              <p className="shirt-collection">Collection: {shirt.coleccion}</p>
            </div>
            <p className="shirt-price">${shirt.precio}</p>
          </div>

          <Link to="/" className="btn btn-back">ADD TO CART</Link>  {/* Asegúrate de mantener Link para otros enlaces */}
        </div>

        <div className="shirts-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
  MAKE YOUR REVIEW
</button>

          <Reviews /> {/* Aquí llamamos a Reviews, que ahora obtiene el id automáticamente */}
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
              productId: shirt.id,
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
