
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const Navigation = () => {
  const mainNavItems = [
    { label: 'LIVRES', path: '/' },
    { label: 'À PARAÎTRE', path: '/a-paraitre' },
    { label: 'BIOGRAPHIE', path: '/biographie' },
    { label: 'ACTUS', path: '/actus' },
    { label: 'RENCONTRES', path: '/rencontres' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="w-full flex flex-col items-center mb-8">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-6 px-4">
        {mainNavItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="text-xs md:text-sm tracking-widest hover:underline"
          >
            {item.label}
          </Link>
        ))}
        
        <div className="flex items-center gap-4 ml-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
