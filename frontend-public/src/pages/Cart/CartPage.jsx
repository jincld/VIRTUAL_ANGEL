import React from "react";
import { useCart } from "../../context/CartContext"; // Obtener el hook de carrito
import CartItem from "../../components/CartItems/CartItem";
import '../Cart/Cart.css';
import { useNavigate } from "react-router-dom";

// Componente para mostrar el total
function Total({ totalPrice, totalQuantity }) {
  return (
    <div className="total-text" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      TOTAL ({totalQuantity} {totalQuantity === 1 ? "PRODUCT" : "PRODUCTS"}):
      <span className="text-danger">${totalPrice.toFixed(2)}</span>
    </div>
  );
}

function CartPage() {
  const { cart } = useCart(); // Obtener el carrito desde el contexto
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Cálculo del total y cantidad
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalQuantity = cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <div className="position-relative min-vh-100 bg-white backcarts">
      <div className="container py-5 content-zone">
        <h1 className="text-start mb-4">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            {/* Contenedor de los productos con scroll */}
            <div className="col-12 cart-items-container">
              {cart.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>
            {/* Total y cantidad */}
            <div className="col-12 mt-4">
              <Total totalPrice={totalPrice} totalQuantity={totalQuantity} />
            </div>
            {/* Botón para proceder al checkout */}
            <div className="col-12 mt-3">
              <button
                className="btn btn-primary"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

