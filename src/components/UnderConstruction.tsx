
import React from 'react';
import { Construction, Hammer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const UnderConstruction = ({ pageName }: { pageName: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center gap-4 text-amber-500 animate-pulse">
          <Construction size={48} />
          <Hammer size={48} />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-800">
          Page en construction
        </h1>
        
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTitle className="text-amber-800 text-lg font-medium">
            {pageName} 🚧
          </AlertTitle>
          <AlertDescription className="text-amber-700 mt-2">
            Cette page est en cours de construction. Merci de votre patience ! Nous travaillons pour vous offrir un contenu de qualité très prochainement.
          </AlertDescription>
        </Alert>
        
        <div className="pt-6">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
