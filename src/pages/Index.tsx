import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FeaturedTea from '@/components/FeaturedTea';
import { featuredTeas } from '@/data/teas';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div>
      <HeroSection />
      
      {/* About section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Sip N Dip is an online dessert and drink shop founded on October 19, 2024, by Jerry Duran and Chef Ann Zamora. It offers handcrafted cold brew drinks, cakes, and pastries made to suit all kinds of celebrations, combining culinary passion with e-commerce convenience.
              </p>
              
              <Button 
                asChild 
                variant="outline" 
                className="btn-hover"
              >
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1546549095-5d8bc3c37ffa?w=600&auto=format&fit=crop&q=80" 
                  alt="Tea preparation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Teas */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured <span className="text-primary">Food & Drinks</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our most popular drinks and desserts, crafted with the finest ingredients and made with love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTeas.map(tea => (
              <FeaturedTea key={tea.id} tea={tea} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 btn-hover"
            >
              <Link to="/delivery">
                View All Items <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The brown sugar boba is absolutely delicious! Perfectly sweet and the tapioca pearls are always perfectly chewy.",
                name: "Sarah L."
              },
              {
                text: "Sip n Dip's delivery is always on time and the teas arrive at the perfect temperature. My go-to place for milk tea cravings!",
                name: "Mike T."
              },
              {
                text: "The jasmine green milk tea is the perfect balance of floral notes and creaminess. I order it at least twice a week!",
                name: "Emily K."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex-1">
                  <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-medium">— {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-tea-100 to-mint-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Try Our <span className="text-primary">Delicious Food & Drinks</span>?
          </h2>
          
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Experience the authentic taste of premium milk teas delivered right to your doorstep.
          </p>
          
          <Button 
            asChild
            size="lg" 
            className="bg-primary hover:bg-primary/90 btn-hover"
          >
            <Link to="/delivery">
              Order Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
