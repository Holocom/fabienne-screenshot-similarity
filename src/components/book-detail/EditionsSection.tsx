
import React from 'react';
import { Edition } from '@/integrations/supabase/schema';

interface EditionsSectionProps {
  editions: Edition[];
}

export const EditionsSection: React.FC<EditionsSectionProps> = ({ editions }) => {
  if (editions.length === 0) return null;

  return (
    <div>
      <h3 className="editions-title">ÉDITIONS</h3>
      <ul className="space-y-1 list-none pl-0">
        {editions.map((edition, index) => (
          <li key={`edition-${index}`} className="edition-item">
            {edition.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
