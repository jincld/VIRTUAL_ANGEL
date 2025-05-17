import React from "react";
import { useNavigate, useParams } from "react-router-dom";  // Importamos useNavigate
import Reviews from "../../components/Reviews/ReviewsAdmin";  // Asegúrate de tener este componente

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

  return (
    <div className="container-fluid margin-top-global">
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

        </div>

        {/* Sección de reseñas */}
        <div className="sweaters-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={sweater.id} /> {/* Pasa el id para que Reviews pueda obtener las reseñas correspondientes */}
        </div>
      </div>
    </div>
  );
}

export default SweatersDetail;
