import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TeaItem, useCart } from './CartContext';
import { formatCurrency } from '@/lib/utils';

interface TeaCardProps {
  tea: TeaItem;
}

const TeaCard = ({ tea }: TeaCardProps) => {
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
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="aspect-square w-full overflow-hidden relative">
        <img 
          src={tea.image} 
          alt={tea.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          {tea.category}
        </Badge>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-display font-semibold text-lg">{tea.name}</h3>
        <p className="text-muted-foreground mt-1">{tea.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center justify-between">
        <span className="font-semibold text-lg">{formatCurrency(selectedSize ? selectedSize.price : tea.price)}</span>
        <Button 
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary/90 btn-hover"
        >
          Add to Cart
        </Button>
      </CardFooter>
      {showSizeSelect && tea.sizes && (
        <div className="p-4 pt-0">
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
    </Card>
  );
};

export default TeaCard;
