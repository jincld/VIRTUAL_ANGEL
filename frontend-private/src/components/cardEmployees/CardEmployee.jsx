// CardEmployee.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CardEmployee.css';

function CardEmployee({ id, imagen, name, age, gender, email, phone, rol }) {
  const navigate = useNavigate();

const handleEdit = () => {
  navigate(`/editemployee`, {
    state: { 
      id, 
      imagen, 
      name, 
      age, 
      gender, 
      email, 
      phone, 
      rol 
    }
  });
};


  return (
    <div className="card" style={{ width: '18rem', padding: '1.5rem' }}>
      <img src={imagen} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>Rol:</strong> {rol}<br />
          <strong>Edad:</strong> {age}<br />
          <strong>Género:</strong> {gender}<br />
          <strong>Email:</strong> {email}<br />
          <strong>Teléfono:</strong> {phone}
        </p>
        <button onClick={handleEdit} className="btn btn-editemployee">
          Edit
        </button>
      </div>
    </div>
  );
}

export default CardEmployee;

