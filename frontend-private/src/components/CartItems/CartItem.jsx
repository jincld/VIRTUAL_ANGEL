import React from "react";

 function CartItem({ product }) {
  return (
    <div
      className="card mb-4"
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
              width: "180px",   /* AUMENTAMOS tamaño */
              height: "180px",  /* AUMENTAMOS tamaño */
              objectFit: "cover",
              padding: "10px",
            }}
          />
        </div>

        {/* Info del producto */}
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title fw-bold">{product.title}</h5>
            <p className="card-text mb-1">
              COLLECTION: <span className="fw-semibold">{product.collection}</span>
            </p>
            <p className="card-text mb-1">
              SIZE: <span className="fw-semibold">{product.size}</span>
            </p>
            <p className="card-text mb-1">
              COLOR: <span className="fw-semibold">{product.color}</span>
            </p>
            <p className="card-text">
              QUANTITY: <span className="fw-semibold">{product.quantity}</span>
            </p>
          </div>
        </div>

        {/* Precio del producto */}
        <div className="col-md-3 text-end pe-4">
          <h4 className="text-danger fw-bold">${product.price.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}

export default CartItem
