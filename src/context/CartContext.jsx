import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, quantity }]

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const increaseQty = (productId) => {
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (productId) => {
    setItems(prev =>
      prev
        .map(i =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
