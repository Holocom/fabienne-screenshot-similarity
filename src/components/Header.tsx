
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 bg-gradient-to-r from-[#f5f2e9] via-white to-[#f5f2e9] shadow-md relative z-10 mb-6">
      <div className="max-w-4xl w-full mx-auto flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center group">
          <div className="flex items-center justify-center gap-8 md:gap-10 relative">
            <div className="hidden md:block transition-transform duration-300 group-hover:transform group-hover:-translate-y-1">
              <img 
                src="/lovable-uploads/81859790-6c17-415b-8bf1-48355c95672e.png" 
                alt="Pile de livres avec une pomme" 
                className="w-20 h-auto drop-shadow-lg"
              />
            </div>
            
            <div className="text-center relative">
              <div className="absolute -inset-1 bg-[#f8f5ef] blur-md opacity-80 -z-10 rounded-lg"></div>
              <h1 className="text-2xl md:text-3xl font-serif tracking-wide uppercase mb-0 text-[#403E43] transition-all duration-300 group-hover:tracking-wider relative">
                Fabienne Jonca
              </h1>
              <div className="h-0.5 w-0 bg-[#9b87f5] mx-auto group-hover:w-full transition-all duration-500"></div>
              <p className="text-xs font-sans tracking-widest text-[#8E9196] mt-1 group-hover:text-[#7E69AB] transition-colors duration-300">
                Autrice
              </p>
            </div>
            
            <div className="hidden md:block transition-transform duration-300 group-hover:transform group-hover:-translate-y-1">
              <img 
                src="/lovable-uploads/81859790-6c17-415b-8bf1-48355c95672e.png" 
                alt="Pile de livres avec une pomme" 
                className="w-20 h-auto transform scale-x-[-1] drop-shadow-lg"
              />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
