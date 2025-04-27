import React from "react";
import { Link } from "react-router-dom";
import './CardClothing.css';

function CardClothing({ id, imagen, titulo, precio, category }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imagen} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">${precio}</p>
        <Link to={`/${category}/${id}`} className="btn btn-dark">Purchase</Link>
      </div>
    </div>
  );
}

export default CardClothing;
