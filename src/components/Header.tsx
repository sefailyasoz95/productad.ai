
import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 fixed top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl gradient-text">Genfluence</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
