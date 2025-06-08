
import React, { useState } from 'react';
import TeaCard from '@/components/TeaCard';
import CartIcon from '@/components/CartIcon';
import { Button } from '@/components/ui/button';
import { teas, categories } from '@/data/teas';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import DiscountBanner from '@/components/DiscountBanner';

const Delivery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredTeas = teas.filter(tea => {
    const matchesCategory = activeCategory === "All" || tea.category === activeCategory;
    const matchesSearch = tea.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tea.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Order Your <span className="text-primary">Favorites</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our selection of authentic milk teas and find your perfect refreshment.
            All orders come with the option to adjust sweetness and toppings.
          </p>
        </div>
      </section>
      
      {/* Discounts Section */}
      <section className="py-4 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DiscountBanner 
            title="Special Discount!"
            description="20% discount for senior citizens and PWDs!"
          />
          <DiscountBanner 
            title="Limited Time Offer!"
            description="Buy Two, Take Three!"
          />
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-auto min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search drinks..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Cart Button (Mobile Only) */}
            <div className="md:hidden flex w-full justify-end">
              <CartIcon />
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredTeas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeas.map(tea => (
                <TeaCard key={tea.id} tea={tea} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No drinks found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Show all drinks
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Fixed Cart Button (Desktop) */}
      <div className="fixed bottom-6 right-6 z-10 hidden md:block">
        <div className="bg-card shadow-lg rounded-full p-2">
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
