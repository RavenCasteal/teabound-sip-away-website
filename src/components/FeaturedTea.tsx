import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeaItem, useCart } from './CartContext';
import { formatCurrency } from '@/lib/utils';

interface FeaturedTeaProps {
  tea: TeaItem;
}

const FeaturedTea = ({ tea }: FeaturedTeaProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(tea.sizes ? tea.sizes[0] : undefined);
  const [showSizeSelect, setShowSizeSelect] = useState(false);

  const handleAddToCart = () => {
    if (tea.sizes) {
      setShowSizeSelect(true);
    } else {
      addToCart(tea);
    }
  };

  const handleConfirmSize = () => {
    if (selectedSize) {
      addToCart(tea, selectedSize);
      setShowSizeSelect(false);
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={tea.image} 
          alt={tea.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-display font-semibold mb-1">{tea.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{tea.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium">{formatCurrency(selectedSize ? selectedSize.price : tea.price)}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddToCart}
            className="btn-hover"
          >
            Add to Cart
          </Button>
        </div>
        {showSizeSelect && tea.sizes && (
          <div className="mt-4">
            <label className="block mb-2 font-medium">Select Size:</label>
            <select
              className="w-full border rounded p-2 mb-2"
              value={selectedSize?.label}
              onChange={e => {
                const size = tea.sizes?.find(s => s.label === e.target.value);
                setSelectedSize(size);
              }}
            >
              {tea.sizes.map(size => (
                <option key={size.label} value={size.label}>
                  {size.label} ({size.oz}oz) - {formatCurrency(size.price)}
                </option>
              ))}
            </select>
            <Button size="sm" className="bg-primary hover:bg-primary/90 btn-hover w-full" onClick={handleConfirmSize}>
              Confirm
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedTea;
