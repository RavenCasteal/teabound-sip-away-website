import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">About Sip n Dip</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our story, mission, and the passion behind every cup we serve.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Sip N Dip was founded on October 19, 2024, by entrepreneur Jerry Duran and seasoned pastry expert Chef Ann Zamora, combining business savvy with culinary artistry. What began as a humble e-commerce venture quickly evolved into a go-to destination for anyone craving high-quality desserts and refreshing drinks.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Driven by their shared love for flavor, craftsmanship, and customer satisfaction, Jerry and Chef Ann set out to redefine online food delivery. Sip N Dip specializes in premium cold brew beverages and a delectable variety of cakes and pastries, thoughtfully curated to suit any celebration—birthdays, anniversaries, holidays, or simple everyday indulgence.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Every product is carefully crafted using only the finest ingredients, ensuring not just taste but also visual appeal. From rich, velvety coffee blends to intricately designed cakes and pastries, Sip N Dip blends creativity and quality in every order. The brand emphasizes made-to-order freshness, aesthetic packaging, and a personalized touch, making each treat feel like a gift.
              </p>
              
              <p className="text-muted-foreground">
                Sip N Dip continues to grow its loyal customer base by staying active on social media, responding to trends, and launching seasonal offerings that keep fans coming back for more. As a proudly homegrown business, it remains committed to bringing sweetness and joy to every table—one sip and bite at a time.
              </p>
            </div>
            
            <div>
              <img 
                src="/lovable-uploads/48c1a476-c39c-11e7-9f00-d8b0ccf89a9f_1280x720_103751.png" 
                alt="Tea preparation" 
                className="rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at Sip n Dip.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We source only premium tea leaves and ingredients, never compromising on the quality of what goes into our drinks."
              },
              {
                title: "Authenticity",
                description: "Our recipes honor traditional methods while adding our unique touch, ensuring an authentic experience with every sip."
              },
              {
                title: "Community",
                description: "We believe in creating connections through our shared love of tea, supporting local initiatives, and giving back to our community."
              }
            ].map((value, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-sm border">
                <h3 className="font-display font-semibold text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The passionate people behind your favorite milk tea.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center">
            {[
              {
                name: "Jerry Duran",
                role: "Founder & Entrepreneur"
              },
              {
                name: "Chef Ann Zamora",
                role: "Co-Founder & Pastry Chef"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <h3 className="font-display font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-tea-100 to-mint-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
            Ready to Experience Sip n Dip?
          </h2>
          
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Order now and discover why our customers keep coming back for more.
          </p>
          
          <Button 
            asChild
            size="lg" 
            className="bg-primary hover:bg-primary/90 btn-hover"
          >
            <Link to="/delivery">
              Order Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
