import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Sip n Dip brings you authentic milk tea made with love and quality ingredients, 
              delivered right to your doorstep.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/delivery" className="hover:text-primary transition-colors">Delivery</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>23 Hawaii St. Ph 6 Carmona Estates, Brgy Lantic, Carmona Cavite</li>
              <li>Phone: (63) 0962-876-7279</li>
              <li>Email: sipndip.phl@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sip n Dip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
