
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Wrench, Construction, HomeIcon } from 'lucide-react';

interface UnderConstructionProps {
  pageName: string;
}

const UnderConstruction = ({ pageName }: UnderConstructionProps) => {
  return (
    <div className="min-h-screen bg-beige flex flex-col">
      <Header />
      <Navigation />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="animate-bounce mb-4 flex gap-4">
          <Construction size={48} className="text-amber-500" />
          <Wrench size={48} className="text-amber-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center">
          Page en construction
        </h1>
        
        <p className="text-xl mb-8 text-center max-w-md">
          La page <span className="font-semibold">{pageName}</span> est actuellement 
          en cours de développement. Merci de votre patience ! 🙏
        </p>
        
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
        >
          <HomeIcon size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
