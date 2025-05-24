import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CardClothing.css';

function CardClothing({
  id, imagen, titulo, precio, categoria, stock, coleccion, color, colorcode
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/editproduct', {
      state: { 
        id, 
        imagen, 
        titulo, 
        precio, 
        categoria, 
        stock, 
        coleccion, 
        color, 
        colorcode 
      }
    });
  };

  const handleView = () => {
    navigate(`/${categoria.toLowerCase()}/${id}`);
  };
  

  return (
    <div className="card">
      <img src={imagen} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">${precio}</p>

        <Link to={`/${categoria.toLowerCase()}/${id}`} className="btn btn-dark">View</Link>


        <button onClick={handleEdit} className="btn btn-editclothing">Edit</button>
      </div>
    </div>
  );
}

export default CardClothing;
