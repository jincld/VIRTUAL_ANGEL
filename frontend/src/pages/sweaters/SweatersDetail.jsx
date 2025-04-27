import React from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";  // Asegúrate de importar el componente Reviews

import SweatersData from "./SweatersData";  // Asegúrate de tener este archivo
import './SweatersDetail.css';  // El archivo de estilos correspondiente

function SweatersDetail() {
  const { id } = useParams();  // Aquí obtenemos el id de la URL
  const sweater = SweatersData.find(sweater => sweater.id === id);

  if (!sweater) {
    return <h2>Sweater not found</h2>;
  }

  return (
    <div className="container-fluid">
      <div className="sweaters-card">
        <div className="sweaters-card__content">
          <Link to="/sweaters" className="btn btn-back">← BACK</Link>

          <div className="sweaters-card__image-wrapper">
            <img className="img-item" src={sweater.imagen} alt={sweater.titulo} />
          </div>
          <h2 className="sweater-title">{sweater.titulo}</h2>

          <div className="sweater-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: sweater.colorcode }}></div>
              <p className="sweater-collection">Collection: {sweater.coleccion}</p>
            </div>
            <p className="sweater-price">${sweater.precio}</p>
          </div>

          <Link to="/" className="btn btn-back">ADD TO CART</Link>
        </div>

        <div className="sweaters-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={sweater.id} /> {/* Pasamos el id para que Reviews pueda cargar las reseñas específicas */}
        </div>
      </div>
    </div>
  );
}

export default SweatersDetail;
