
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

const CartIcon = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <Button 
      onClick={toggleCart}
      variant="outline" 
      size="icon" 
      className="relative mr-2"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
