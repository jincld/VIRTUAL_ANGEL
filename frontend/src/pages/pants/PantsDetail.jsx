import React from "react";
import { useParams } from "react-router-dom";
import PantsData from "./PantsData"; // O desde donde estés importando los datos de los pantalones

function PantsDetail() {
  const { id } = useParams();  // Obtener el 'id' de la URL

  // Buscar el pantalón correspondiente por 'id'
  const pant = PantsData.find(pant => pant.id === id);

  if (!pant) {
    return <h2>Pants not found</h2>;
  }

  return (
    <div className="container text-center my-5">
      <img src={pant.imagen} alt={pant.titulo} />
      <h2>{pant.titulo}</h2>
      <p>Price: ${pant.precio}</p>
      <p>Collection: {pant.coleccion}</p>
      <p>Color: {pant.color}</p>
    </div>
  );
}

export default PantsDetail;
