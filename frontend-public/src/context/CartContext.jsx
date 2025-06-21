import React, { createContext, useContext, useState, useEffect } from "react";

// Contexto de carrito
const CartContext = createContext();

// Hook personalizado para usar el carrito
export function useCart() {
  return useContext(CartContext);
}

// Proveedor del carrito
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const uniqueProductKey = `${product.id}-${product.size || "default"}-${product.color || "default"}`;
  
      const existingProduct = prevCart.find(
        (item) => `${item.id}-${item.size || "default"}-${item.color || "default"}` === uniqueProductKey
      );
  
      if (existingProduct) {
        return prevCart.map((item) =>
          `${item.id}-${item.size || "default"}-${item.color || "default"}` === uniqueProductKey
            ? { 
                ...item, 
                quantity: (Number(item.quantity) || 0) + (Number(product.quantity) || 1) 
              }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity: Number(product.quantity) > 0 ? Number(product.quantity) : 1, 
          price: Number(product.price) > 0 ? Number(product.price) : 0 
        }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
