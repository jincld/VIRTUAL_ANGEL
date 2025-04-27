import React from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews"; // Asegúrate de tener este componente

import JacketsData from "./JacketsData"; // Asegúrate de tener este archivo
import './JacketsDetail.css'; // El archivo de estilos correspondiente

function JacketsDetail() {
  const { id } = useParams(); // Obtenemos el id de la URL
  const jacket = JacketsData.find(jacket => jacket.id === id);

  if (!jacket) {
    return <h2>Jacket not found</h2>;
  }

  return (
    <div className="container-fluid">
      <div className="jackets-card">
        <div className="jackets-card__content">
          <Link to="/jackets" className="btn btn-back">← BACK</Link>

          <div className="jackets-card__image-wrapper">
            <img className="img-item" src={jacket.imagen} alt={jacket.titulo} />
          </div>

          <h2 className="jacket-title">{jacket.titulo}</h2>

          <div className="jacket-info-row">
            <div className="left-meta">
              <div className="color-box" style={{ backgroundColor: jacket.colorcode }}></div>
              <p className="jacket-collection">Collection: {jacket.coleccion}</p>
            </div>
            <p className="jacket-price">${jacket.precio}</p>
          </div>

          <Link to="/" className="btn btn-back">ADD TO CART</Link>
        </div>

        <div className="jackets-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews id={jacket.id} /> {/* Pasa el id para que Reviews pueda obtener las reseñas correspondientes */}
        </div>
      </div>
    </div>
  );
}

export default JacketsDetail;
