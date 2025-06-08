import React, { useState } from 'react';

interface TeaOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface TeaCustomization {
  base: TeaOption;
  sweetness: number;
  ice: number;
  toppings: TeaOption[];
  size: 'small' | 'medium' | 'large';
  specialInstructions: string;
}

const defaultCustomization: TeaCustomization = {
  base: {
    id: '',
    name: '',
    price: 0,
    description: ''
  },
  sweetness: 100,
  ice: 100,
  toppings: [],
  size: 'medium',
  specialInstructions: ''
};

export const TeaBuilder: React.FC = () => {
  const [customization, setCustomization] = useState<TeaCustomization>(defaultCustomization);
  const [totalPrice, setTotalPrice] = useState(0);

  const baseTeas: TeaOption[] = [
    {
      id: 'milk-tea',
      name: 'Classic Milk Tea',
      price: 4.99,
      description: 'Our signature black tea with creamy milk'
    },
    {
      id: 'jasmine-tea',
      name: 'Jasmine Green Tea',
      price: 4.49,
      description: 'Fragrant jasmine green tea'
    },
    {
      id: 'oolong-tea',
      name: 'Oolong Tea',
      price: 4.49,
      description: 'Semi-oxidized tea with rich flavor'
    }
  ];

  const toppings: TeaOption[] = [
    {
      id: 'boba',
      name: 'Boba Pearls',
      price: 0.75,
      description: 'Classic chewy tapioca pearls'
    },
    {
      id: 'pudding',
      name: 'Egg Pudding',
      price: 0.75,
      description: 'Creamy egg pudding'
    },
    {
      id: 'grass-jelly',
      name: 'Grass Jelly',
      price: 0.75,
      description: 'Refreshing grass jelly'
    }
  ];

  const calculateTotal = () => {
    let total = customization.base.price;
    customization.toppings.forEach(topping => {
      total += topping.price;
    });
    
    // Size multiplier
    switch (customization.size) {
      case 'small':
        total *= 0.8;
        break;
      case 'large':
        total *= 1.2;
        break;
    }
    
    return total.toFixed(2);
  };

  const handleBaseChange = (base: TeaOption) => {
    setCustomization(prev => ({
      ...prev,
      base
    }));
  };

  const handleToppingToggle = (topping: TeaOption) => {
    setCustomization(prev => {
      const isSelected = prev.toppings.some(t => t.id === topping.id);
      const newToppings = isSelected
        ? prev.toppings.filter(t => t.id !== topping.id)
        : [...prev.toppings, topping];
      
      return {
        ...prev,
        toppings: newToppings
      };
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Build Your Tea</h2>

      {/* Base Tea Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choose Your Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {baseTeas.map(tea => (
            <button
              key={tea.id}
              onClick={() => handleBaseChange(tea)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                customization.base.id === tea.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <h4 className="font-medium">{tea.name}</h4>
              <p className="text-sm text-muted-foreground">{tea.description}</p>
              <p className="text-primary font-medium mt-2">${tea.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Customization Options */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Customize Your Drink</h3>
        
        {/* Size Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="flex gap-4">
            {(['small', 'medium', 'large'] as const).map(size => (
              <button
                key={size}
                onClick={() => setCustomization(prev => ({ ...prev, size }))}
                className={`px-4 py-2 rounded-md capitalize ${
                  customization.size === size
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sweetness Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Sweetness Level: {customization.sweetness}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={customization.sweetness}
            onChange={(e) => setCustomization(prev => ({
              ...prev,
              sweetness: parseInt(e.target.value)
            }))}
            className="w-full"
          />
        </div>

        {/* Ice Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Ice Level: {customization.ice}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={customization.ice}
            onChange={(e) => setCustomization(prev => ({
              ...prev,
              ice: parseInt(e.target.value)
            }))}
            className="w-full"
          />
        </div>

        {/* Toppings */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Toppings</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {toppings.map(topping => (
              <button
                key={topping.id}
                onClick={() => handleToppingToggle(topping)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  customization.toppings.some(t => t.id === topping.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <h4 className="font-medium">{topping.name}</h4>
                <p className="text-sm text-muted-foreground">{topping.description}</p>
                <p className="text-primary font-medium mt-2">+${topping.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Special Instructions</label>
          <textarea
            value={customization.specialInstructions}
            onChange={(e) => setCustomization(prev => ({
              ...prev,
              specialInstructions: e.target.value
            }))}
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="Any special requests or allergies?"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Tea:</span>
            <span>{customization.base.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span className="capitalize">{customization.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Sweetness:</span>
            <span>{customization.sweetness}%</span>
          </div>
          <div className="flex justify-between">
            <span>Ice:</span>
            <span>{customization.ice}%</span>
          </div>
          {customization.toppings.length > 0 && (
            <div>
              <span>Toppings:</span>
              <ul className="list-disc list-inside">
                {customization.toppings.map(topping => (
                  <li key={topping.id} className="flex justify-between">
                    <span>{topping.name}</span>
                    <span>+${topping.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => {
            // Implement add to cart logic
            console.log('Adding to cart:', customization);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}; 