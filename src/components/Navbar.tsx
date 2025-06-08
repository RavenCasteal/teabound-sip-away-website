import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Delivery', path: '/delivery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className={`navbar-link ${isActive(item.path) ? 'text-primary font-semibold' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/delivery">
            <Button variant="default" className="bg-primary hover:bg-primary/90 btn-hover">
              Order Now
            </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 bg-background border-b animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 px-4 rounded-md ${isActive(item.path) ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-muted'}`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/delivery">
            <Button onClick={() => setIsMenuOpen(false)} className="w-full mt-2 bg-primary hover:bg-primary/90">
              Order Now
            </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
