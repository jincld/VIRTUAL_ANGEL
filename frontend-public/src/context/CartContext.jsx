// CartContext.js

import React, { createContext, useContext, useState } from "react";

// Contexto de carrito
const CartContext = createContext();

// Hook personalizado para usar el carrito
export function useCart() {
  return useContext(CartContext);
}

// Proveedor del carrito
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Crear una clave única para el producto
      const uniqueProductKey = `${product.id}-${product.size}-${product.color}`;

      // Verificamos si el producto con la combinación de ID, tamaño y color ya está en el carrito
      const existingProduct = prevCart.find(
        (item) => `${item.id}-${item.size}-${item.color}` === uniqueProductKey
      );

      if (existingProduct) {
        // Si el producto ya existe, actualizamos la cantidad
        return prevCart.map((item) =>
          `${item.id}-${item.size}-${item.color}` === uniqueProductKey
            ? { ...item, quantity: item.quantity + 1 }  // Aumenta la cantidad
            : item
        );
      } else {
        // Si no existe, agregamos el producto con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
