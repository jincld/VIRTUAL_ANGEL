import React from "react";
import { useNavigate, useParams } from "react-router-dom";  // Importamos useNavigate
import { useState } from 'react';
import Reviews from "../../components/Reviews/Reviews";  // Asegúrate de tener este componente
import SweatersData from "./SweatersData";  // Asegúrate de tener este archivo
import './SweatersDetail.css';  // El archivo de estilos correspondiente

function SweatersDetail() {
  const { id } = useParams();  // Aquí obtenemos el id de la URL
  const sweater = SweatersData.find(sweater => sweater.id === id);  // Encontramos el suéter con el id correspondiente
  const navigate = useNavigate();  // Usamos el hook useNavigate para navegar

  if (!sweater) {
    return <h2>Sweater not found</h2>;  // Si no se encuentra el suéter, mostramos un mensaje
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
      <div className="sweaters-card">
        <div className="sweaters-card__content">
          {/* Botón para regresar a la última página visitada */}
          <button onClick={handleBackClick} className="btn btn-back">
            ← BACK
          </button>

          {/* Imagen del suéter */}
          <div className="sweaters-card__image-wrapper">
            <img className="img-item" src={sweater.imagen} alt={sweater.titulo} />
          </div>

          {/* Título del suéter */}
          <h2 className="sweater-title">{sweater.titulo}</h2>

          {/* Información del suéter (color, colección, precio) */}
          <div className="sweater-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: sweater.colorcode }}></div>
              <p className="sweater-collection">Collection: {sweater.coleccion}</p>
            </div>
            <p className="sweater-price">${sweater.precio}</p>
          </div>

          <button className="btn btn-back">ADD TO CART</button> {/* Botón de añadir al carrito */}
        </div>

        {/* Sección de reseñas */}
        <div className="sweaters-card__image">
          <h2 className="review-title">REVIEWS</h2>
                                        <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
  MAKE YOUR REVIEW
</button>
          <Reviews id={sweater.id} /> {/* Pasa el id para que Reviews pueda obtener las reseñas correspondientes */}
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

export default SweatersDetail;
