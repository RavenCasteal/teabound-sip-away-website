
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-tea-800">404</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Oops! Looks like this page has spilled.
      </p>

      <div className="max-w-xs mx-auto mb-10">
        <img 
          src="https://images.unsplash.com/photo-1563562552726-3f094eb6430b?w=500&auto=format&fit=crop&q=80" 
          alt="Spilled Tea" 
          className="rounded-xl"
        />
      </div>

      <Button 
        asChild
        size="lg" 
        className="bg-primary hover:bg-primary/90"
      >
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
