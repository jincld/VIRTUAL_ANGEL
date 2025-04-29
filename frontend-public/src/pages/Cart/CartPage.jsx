import React from "react";
import CartItem from "../../components/CartItems/CartItem";
import '../Cart/Cart.css';
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Leather motorcycle cropped jacket",
    collection: "ANGEL OR CRAZY",
    size: "M",
    color: "SPACE BLACK",
    price: 5.99,
    quantity: 1,
    image: "/jackets/2.png",
  },
  {
    id: 2,
    title: "Dark button-up cropped shirt + tie",
    collection: "THIS IS ECLIPSE",
    size: "S",
    color: "LUNAR BLACK",
    price: 10.99,
    quantity: 2,
    image: "/shirts/5.png",
  },
];

function Total({ totalPrice, totalQuantity }) {
  console.log("Total Component - totalPrice:", totalPrice, "totalQuantity:", totalQuantity); // Debugging line
  return (
    <div className="total-text" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      TOTAL ({totalQuantity} {totalQuantity === 1 ? "PRODUCT" : "PRODUCTS"}): 
      <span className="text-danger">${totalPrice.toFixed(2)}</span>
    </div>
  );
}

function CartPage() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Calculate total price and total quantity
  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Debugging the calculated total values
  console.log("CartPage - totalPrice:", totalPrice, "totalQuantity:", totalQuantity); // Debugging line

  return (
    <div className="position-relative min-vh-100 bg-white">
      {/* Fondo detrás */}
      <div className="backcarts"></div>

      {/* Contenido encima */}
      <div className="container py-5 content-zone">
        {/* Título principal del carrito */}
        <h1 className="text-start mb-5 fw-bold fs-1">CART</h1>

        {/* Productos */}
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12">
              <CartItem product={product} />
            </div>
          ))}
        </div>

        {/* Total y botón */}
        <div className="mt-5 d-flex justify-content-between align-items-center">
          {/* Debugging total quantity */}
          <Total totalPrice={totalPrice} totalQuantity={totalQuantity} />

          <button
            onClick={handleCheckout}
            className="btn"
            style={{
              background: "linear-gradient(90deg, #C51400 0%, #5F0900 100%)",
              color: "white",
              fontWeight: "bold",
              padding: "10px 30px",
              borderRadius: "8px",
              fontSize: "1.2rem",
              letterSpacing: "1px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            GO TO PAY →
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;




