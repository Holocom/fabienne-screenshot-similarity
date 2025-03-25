
import React from 'react';
import { PressLink } from '@/integrations/supabase/schema';

interface PressLinksProps {
  pressLinks: PressLink[];
}

const PressLinks = ({ pressLinks }: PressLinksProps) => {
  if (pressLinks.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="press-title text-lg font-semibold uppercase mb-2">PRESSE</h3>
      <ul className="space-y-2 list-none pl-0">
        {pressLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="press-link text-blue-600 hover:underline"
            >
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PressLinks;
