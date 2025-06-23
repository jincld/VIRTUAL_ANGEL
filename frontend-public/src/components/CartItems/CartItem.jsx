import React from "react";
import { useCart } from "../../context/CartContext"; // Importar el contexto
import './CartItem.css';

function CartItem({ product }) {
  const { removeFromCart } = useCart(); // Obtener la función para eliminar productos

  // Calcula el precio total por producto
  const unitPrice = Number(product.price) || 0;
  const quantity = Number(product.quantity) || 1;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div
      className="mb-4"
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div className="row g-0 align-items-center">
        
        {/* Imagen del producto */}
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              padding: "10px",
            }}
          />
        </div>

        {/* Info del producto */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title fw-bold">{product.title}</h5>
            <p className="card-text mb-1">
              COLLECTION: <span className="fw-semibold">{product.collection || "N/A"}</span>
            </p>
            <p className="card-text mb-1">
              COLOR: <span className="fw-semibold">{product.color || "N/A"}</span>
            </p>
            <p className="card-text">
              QUANTITY: <span className="fw-semibold">{quantity}</span>
            </p>
          </div>
        </div>

        {/* Precio total y botón de eliminación */}
        <div className="col-md-4 text-end pe-4">
          <h4 className="text-danger fw-bold subtotaltext">SUBTOTAL: ${totalPrice}</h4>
          <button 
            className="btn btn-danger mt-2 btn-remove"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
