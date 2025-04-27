import React from "react";
import './ShirtsDetail.css';
import { Link, useParams } from "react-router-dom";
import ShirtsData from "./ShirtsData";

function ShirtsDetail() {
  const { id } = useParams();
  const shirt = ShirtsData.find(shirt => shirt.id === id);

  if (!shirt) {
    return <h2>Shirt not found</h2>;
  }

  return (
    <div className="container-fluid">
      <div className="shirts-card">
        <div className="shirts-card__content">
          <Link to="/shirts" className="btn btn-back">
            ← BACK
          </Link>
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
        </div>
      </div>
    </div>
  );
}

export default ShirtsDetail;
