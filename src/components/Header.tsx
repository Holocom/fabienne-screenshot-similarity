
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center py-8 px-4">
      <div className="max-w-4xl w-full flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-10 mb-2">
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/7c3a8222-1e9a-49ae-85ed-36f658766ac2.png" 
                alt="Pile de livres à gauche" 
                className="w-24 h-auto"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif tracking-wide uppercase mb-1">Fabienne Jonca</h1>
              <p className="text-sm font-sans tracking-widest">Autrice</p>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/7c3a8222-1e9a-49ae-85ed-36f658766ac2.png" 
                alt="Pile de livres à droite" 
                className="w-24 h-auto"
              />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
