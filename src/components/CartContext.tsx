import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TeaItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: { label: string; oz?: number; price: number }[];
}

interface CartItem extends TeaItem {
  quantity: number;
  size?: { label: string; oz: number; price: number };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: TeaItem, size?: { label: string; oz: number; price: number }) => void;
  removeFromCart: (itemId: number, sizeLabel?: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number, sizeLabel?: string) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  applyDiscount: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [discountApplied, setDiscountApplied] = useState<string | null>(null);

  useEffect(() => {
    // Calculate cart total and count whenever cart changes
    const total = calculateTotal();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart, discountApplied]);

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Apply discounts based on codes or conditions
    if (discountApplied === 'SENIOR' || discountApplied === 'PWD') {
      return subtotal * 0.8; // 20% discount
    } else if (discountApplied === 'BUY2TAKE3' && cart.length >= 2) {
      // This is a simplified implementation of Buy 2, Take 3
      // In a real application, you'd want more sophisticated logic
      return subtotal;
    }
    
    return subtotal;
  };

  const addToCart = (item: TeaItem, size?: { label: string; oz: number; price: number }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id && (!size || (cartItem.size && cartItem.size.label === size.label)));
      const itemPrice = size ? size.price : item.price;
      if (existingItem) {
        // Increase quantity if item already exists (with same size)
        return prevCart.map(cartItem => 
          cartItem.id === item.id && (!size || (cartItem.size && cartItem.size.label === size.label))
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item with quantity 1 and selected size
        return [...prevCart, { ...item, price: itemPrice, quantity: 1, size }];
      }
    });

    // Automatically open cart when adding items
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId: number, sizeLabel?: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId || (sizeLabel && item.size && item.size.label === sizeLabel)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (itemId: number, quantity: number, sizeLabel?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, sizeLabel);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId && (!sizeLabel || (item.size && item.size.label === sizeLabel))
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const applyDiscount = (code: string) => {
    const normalizedCode = code.toUpperCase();
    
    if (normalizedCode === 'SENIOR' || normalizedCode === 'PWD' || normalizedCode === 'BUY2TAKE3') {
      setDiscountApplied(normalizedCode);
      return true;
    }
    
    return false;
  };

  const cartContextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    toggleCart,
    applyDiscount
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
