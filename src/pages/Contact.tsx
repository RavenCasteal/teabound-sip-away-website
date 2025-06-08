import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" required placeholder="Your email" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" required placeholder="Subject of your message" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Type your message here" 
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 btn-hover">
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground">23 Hawaii St. Ph 6 Carmona Estates, Brgy Lantic, Carmona Cavite </p>
                </div>
                
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 10am - 8pm</p>
                  <p className="text-muted-foreground">Saturday - Sunday: 11am - 9pm</p>
                </div>
                
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Contact</h3>
                  <p className="text-muted-foreground">Phone: (63) 0962-876-7279</p>
                  <p className="text-muted-foreground">Email: sipndip.phl@gmail.com</p>
                </div>
                
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/sipndip.ph" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61567353923897" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      {/* (Map placeholder section removed) */}
      
      {/* FAQ */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "What delivery areas do you cover?",
                answer: "We currently deliver within a 10-mile radius of our store. Enter your address at checkout to see if you're in our delivery zone."
              },
              {
                question: "How long does delivery take?",
                answer: "Typical delivery times are 30-45 minutes, depending on your location and current order volume."
              },
              {
                question: "Can I customize the sweetness level of my drink?",
                answer: "Yes! You can select your preferred sweetness level (0%, 30%, 50%, 70%, 100%) during checkout."
              },
              {
                question: "Do you offer catering for events?",
                answer: "Yes, we offer catering services for events of all sizes. Please contact us at least 48 hours in advance with your requirements."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-sm">
                <h3 className="font-display font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
