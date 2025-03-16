
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
                src="/lovable-uploads/81859790-6c17-415b-8bf1-48355c95672e.png" 
                alt="Pile de livres avec une pomme" 
                className="w-24 h-auto"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif tracking-wide uppercase mb-1">Fabienne Jonca</h1>
              <p className="text-sm font-sans tracking-widest">Autrice</p>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/81859790-6c17-415b-8bf1-48355c95672e.png" 
                alt="Pile de livres avec une pomme" 
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
