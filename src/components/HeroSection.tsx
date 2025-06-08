import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              Sip & Dip
              <span className="block text-primary mt-2">Where Every Sip Tells a Story</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience the perfect blend of premium milk teas and delightful desserts in a cozy atmosphere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/delivery" className="btn-hover">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Order Now
                </Button>
              </Link>
              <Link to="/about" className="btn-hover">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto md:ml-auto relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Milk Tea Collection" 
                className="rounded-full object-cover h-full w-full shadow-xl img-hover"
              />
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute top-1/4 -left-12 h-24 w-24 bg-mint-400 rounded-full opacity-40 animate-float" style={{animationDelay: "0s"}}></div>
            <div className="absolute bottom-10 -right-6 h-16 w-16 bg-tea-300 rounded-full opacity-60 animate-float" style={{animationDelay: "1s"}}></div>
            <div className="absolute -bottom-6 left-1/4 h-12 w-12 bg-mint-300 rounded-full opacity-50 animate-float" style={{animationDelay: "0.5s"}}></div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-1/2 -right-8 h-8 w-8 bg-primary/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 -left-4 h-6 w-6 bg-tea-400/30 rounded-full animate-pulse-slow" style={{animationDelay: "1.5s"}}></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,42.7C960,32,1056,32,1152,42.7C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="animate-pulse-slow"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
