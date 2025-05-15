import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importamos useNavigate
import Reviews from "../../components/Reviews/ReviewsAdmin"; // Asegúrate de tener este componente

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

        </div>

        {/* Sección de reseñas */}
        <div className="jackets-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={jacket.id} /> {/* Pasa el id para que Reviews pueda obtener las reseñas correspondientes */}
        </div>
      </div>
    </div>
  );
}

export default JacketsDetail;
