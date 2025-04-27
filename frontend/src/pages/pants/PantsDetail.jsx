import React from "react";
import { useParams } from "react-router";
import PantsData from './PantsData'; 

function PantsDetail() {
  const { id } = useParams();

  const pant = PantsData.find((p) => p.id === parseInt(id));

  if (!pant) {
    return <h2 className="text-center text-danger mt-5">Pantalón no encontrado</h2>;
  }

  return (
    
    <div className="container text-center my-5">
        
      <h1>{pant.titulo}</h1>
      <img src={pant.imagen} alt={pant.titulo} style={{ width: '300px' }} />
      <p className="fs-4">Precio: ${pant.precio}</p>
      
    </div>
  );
}

export default PantsDetail;

