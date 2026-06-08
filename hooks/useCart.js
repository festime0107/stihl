"use client";

import { useMemo, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item._id === product._id);
      if (existing) {
        return current.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(productId, type) {
    setCart((current) =>
      current.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item._id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return { cart, cartTotal, addToCart, changeQuantity, removeFromCart, clearCart };
}
