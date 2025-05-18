import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importamos useNavigate
import { useState } from 'react';
import Reviews from "../../components/Reviews/Reviews"; // Asegúrate de tener este componente
import JacketsData from "./JacketsData"; // Asegúrate de tener este archivo
import './JacketsDetail.css'; // El archivo de estilos correspondiente

function JacketsDetail() {
  const { id } = useParams(); // Obtenemos el id de la URL
  const jacket = JacketsData.find(jacket => jacket.id === id); // Encontramos la chaqueta con el id correspondiente
  const navigate = useNavigate(); // Usamos el hook useNavigate

  if (!jacket) {
    return <h2>Jacket not found</h2>; // Si no se encuentra la chaqueta, mostramos un mensaje
  }

  const handleBackClick = () => {
    navigate(-1); // Esto te lleva a la última página visitada
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
    <div className="container-fluid margin-top-global">
      <div className="jackets-card">
        <div className="jackets-card__content">
          {/* Botón que redirige a la última página visitada */}
          <button onClick={handleBackClick} className="btn btn-back">
            ← BACK
          </button>

          {/* Imagen de la chaqueta */}
          <div className="jackets-card__image-wrapper">
            <img className="img-item" src={jacket.imagen} alt={jacket.titulo} />
          </div>

          {/* Título de la chaqueta */}
          <h2 className="jacket-title">{jacket.titulo}</h2>

          {/* Información de la chaqueta (color, colección, precio) */}
          <div className="jacket-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: jacket.colorcode }}></div>
              <p className="jacket-collection">Collection: {jacket.coleccion}</p>
            </div>
            <p className="jacket-price">${jacket.precio}</p>
          </div>

          <button className="btn btn-back">ADD TO CART</button> {/* Botón de añadir al carrito */}
        </div>

        {/* Sección de reseñas */}
        <div className="jackets-card__image">
          <h2 className="review-title">REVIEWS</h2>
                              <button className="btn btn-review-popup" onClick={() => setShowPopup(true)}>
  MAKE YOUR REVIEW
</button>
          <Reviews id={jacket.id} /> {/* Pasa el id para que Reviews pueda obtener las reseñas correspondientes */}
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

export default JacketsDetail;
