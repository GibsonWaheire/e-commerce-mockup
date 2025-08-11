import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'ttots_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to read cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to write cart to localStorage", error);
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
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

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    setItems(prev =>
      prev
        .map(i =>
          i.product.id === productId ? { ...i, quantity: newQuantity } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = items.reduce((acc, i) => acc + (i.product.salePrice || i.product.price) * i.quantity, 0);
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    console.error('useCart must be used within CartProvider');
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateItemQuantity: () => {},
      clearCart: () => {},
      totals: { count: 0, subtotal: 0 }
    };
  }
  return ctx;
}
