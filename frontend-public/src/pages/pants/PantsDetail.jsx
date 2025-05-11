import React from "react";
import './PantsDetail.css';
import { Link, useParams, useNavigate } from "react-router-dom";  // Importamos useNavigate
import { useState } from 'react';
import PantsData from "./PantsData";  // Asegúrate de tener los datos de los pantalones
import Reviews from "../../components/Reviews/Reviews";  // Importa Reviews para mostrar las reseñas

function PantsDetail() {
  const { id } = useParams();  // Obtenemos el id de la URL
  const pant = PantsData.find(pant => pant.id === id);  // Encontramos el pantalón con el id correspondiente
  const navigate = useNavigate();  // Usamos el hook useNavigate

  if (!pant) {
    return <h2>Pants not found</h2>;  // Si no se encuentra el pantalón, mostramos un mensaje
  }

  const handleBackClick = () => {
    navigate(-1);  // Esto te lleva a la última página visitada
  };

  const [showPopup, setShowPopup] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: ''
  });

    const [isClosing, setIsClosing] = useState(false);
  
  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300); // igual al tiempo del fade-out
  };

  return (
    <div className="container-fluid">
      <div className="pants-card">
        <div className="pants-card__content">
          {/* Botón que redirige a la última página visitada */}
          <button onClick={handleBackClick} className="btn btn-back">
            ← BACK
          </button>

          {/* Imagen del pantalón */}
          <div className="pants-card__image-wrapper">
            <img className="img-item" src={pant.imagen} alt={pant.titulo} />
          </div>

          {/* Título del pantalón */}
          <h2 className="pant-title">{pant.titulo}</h2>

          {/* Información del pantalón (color, colección, precio) */}
          <div className="pant-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: pant.colorcode }}></div>
              <div className="pant-meta-row">
                <p className="pant-collection">Collection: {pant.coleccion}</p>
                <p className="pant-price">${pant.precio}</p>
              </div>
            </div>
          </div>

          <Link to="/" className="btn btn-back">
            ADD TO CART
          </Link>
        </div>

        {/* Sección de reseñas */}
        <div className="pants-card__image">
          <h2 className="review-title">REVIEWS</h2>
                    <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
  MAKE YOUR REVIEW
</button>
          <Reviews /> {/* Aquí llamamos al componente de reseñas que ya toma el id automáticamente */}
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

export default PantsDetail;
