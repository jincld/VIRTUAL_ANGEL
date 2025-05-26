// CardEmployee.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CardEmployee.css';

function CardEmployee({ id, imagen, name, age, gender, email, phone, rol }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editemployee/${id}`);
  };

  const handleView = () => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="card" style={{ width: '18rem', padding: '1.5rem' }}>
      <img src={imagen} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>Role:</strong> {rol}<br />
          <strong>Age:</strong> {age}<br />
          <strong>Gender:</strong> {gender}<br />
          <strong>Email:</strong> {email}<br />
          <strong>Phone number:</strong> {phone}
        </p>
        <button onClick={handleEdit} className="btn btn-editemployee" style={{ marginLeft: '0.5rem' }}>
          Edit details
        </button>
      </div>
    </div>
  );
}

export default CardEmployee;


