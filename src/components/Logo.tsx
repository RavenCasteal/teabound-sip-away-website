import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl'
  };

  return (
    <Link to="/" className="flex items-center">
      <div className="relative">
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-tea-400 flex items-center justify-center">
          <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-mint-100 flex items-center justify-center">
            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-tea-100"></div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-3 w-3 md:h-4 md:w-4 bg-mint-400 rounded-full"></div>
      </div>
      <span className={`font-display font-semibold ml-2 text-tea-800 ${sizeClasses[size]}`}>
        Sip n Dip
      </span>
    </Link>
  );
};

export default Logo;
