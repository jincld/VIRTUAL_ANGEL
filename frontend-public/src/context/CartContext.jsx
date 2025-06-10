import React, { createContext, useContext, useState, useEffect } from "react";

// Contexto de carrito
const CartContext = createContext();

// Hook personalizado para usar el carrito
export function useCart() {
  return useContext(CartContext);
}

// Proveedor del carrito
export function CartProvider({ children }) {
  // Estado del carrito con recuperación desde localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
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
  

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

