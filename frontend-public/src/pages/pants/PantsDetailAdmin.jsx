import React from "react";
import './PantsDetail.css';
import { Link, useParams, useNavigate } from "react-router-dom";  // Importamos useNavigate
import PantsData from "./PantsData";  // Asegúrate de tener los datos de los pantalones
import Reviews from "../../components/Reviews/ReviewsAdmin";  // Importa Reviews para mostrar las reseñas

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

        </div>

        {/* Sección de reseñas */}
        <div className="pants-card__image">
          <h2 className="review-title">REVIEWS</h2>
          <Reviews /> {/* Aquí llamamos al componente de reseñas que ya toma el id automáticamente */}
        </div>
      </div>
    </div>
  );
}

export default PantsDetail;
