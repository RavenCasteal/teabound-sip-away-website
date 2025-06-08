import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { X, ShoppingCart, Plus, Minus, Trash2, BadgePercent } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CartSidebar = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    isCartOpen, 
    toggleCart,
    applyDiscount
  } = useCart();
  
  const [discountCode, setDiscountCode] = useState('');
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ name: '', phone: '', address: '', notes: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a discount code",
        variant: "destructive"
      });
      return;
    }
    
    const success = applyDiscount(discountCode);
    
    if (success) {
      toast({
        title: "Success!",
        description: "Discount code applied successfully",
      });
      setDiscountCode('');
    } else {
      toast({
        title: "Invalid Code",
        description: "The discount code you entered is invalid",
        variant: "destructive"
      });
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={toggleCart}
      />
      
      {/* Cart sidebar */}
      <div className="bg-background w-full max-w-md overflow-auto relative animate-fade-in">
        <div className="sticky top-0 bg-background z-10 p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
            <h2 className="font-display font-semibold text-lg">Your Cart</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-center">Your cart is empty</p>
            <Button 
              onClick={toggleCart} 
              variant="outline" 
              className="mt-4"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="p-4">
            {/* Cart items */}
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div 
                  key={item.id}
                  className="flex items-start border rounded-lg p-3 gap-3"
                >
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    {item.size && (
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.size.label}
                        {typeof item.size.oz !== 'undefined' ? ` (${item.size.oz}oz)` : ''}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Discount Code */}
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <div className="flex items-center">
                    <BadgePercent className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Discount Code</span>
                  </div>
                  <Input 
                    type="text"
                    placeholder="Enter code (e.g., SENIOR, PWD)"
                    className="mt-1"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                </div>
                <Button onClick={handleApplyDiscount} className="self-end mt-1">
                  Apply
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Available codes: SENIOR, PWD, BUY2TAKE3</p>
              </div>
            </div>
            
            {/* Cart footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal:</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setShowCheckout(true)}>
                Checkout
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowCheckout(false)}>&times;</button>
            {!orderPlaced ? (
              <form onSubmit={e => {
                e.preventDefault();
                setOrderPlaced(true);
                clearCart();
              }} className="space-y-4">
                <h3 className="font-display font-semibold text-lg mb-2">Checkout</h3>
                <input
                  className="w-full border rounded p-2"
                  required
                  placeholder="Name"
                  value={checkoutData.name}
                  onChange={e => setCheckoutData({ ...checkoutData, name: e.target.value })}
                />
                <input
                  className="w-full border rounded p-2"
                  required
                  placeholder="Phone Number"
                  value={checkoutData.phone}
                  onChange={e => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                />
                <input
                  className="w-full border rounded p-2"
                  required
                  placeholder="Delivery Address"
                  value={checkoutData.address}
                  onChange={e => setCheckoutData({ ...checkoutData, address: e.target.value })}
                />
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Notes (optional)"
                  value={checkoutData.notes}
                  onChange={e => setCheckoutData({ ...checkoutData, notes: e.target.value })}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Place Order</Button>
              </form>
            ) : (
              <div className="text-center p-6">
                <h3 className="font-display font-semibold text-lg mb-2">Thank you for your order!</h3>
                <p className="mb-4">We'll contact you soon to confirm your order and delivery details.</p>
                <Button className="w-full" onClick={() => setShowCheckout(false)}>Close</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
