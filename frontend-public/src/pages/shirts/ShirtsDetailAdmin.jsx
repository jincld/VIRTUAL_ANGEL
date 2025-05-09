import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";  // Agrega Link aquí
import Reviews from "../../components/Reviews/ReviewsAdmin";  // Asegúrate de importar el componente Reviews

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

  return (
    <div className="container-fluid">
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

        </div>

        <div className="shirts-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews /> {/* Aquí llamamos a Reviews, que ahora obtiene el id automáticamente */}
        </div>
      </div>
    </div>
  );
}

export default ShirtsDetail;
