
import React from 'react';
import { Award } from '@/integrations/supabase/schema';

interface AwardsProps {
  awards: Award[];
}

const Awards = ({ awards }: AwardsProps) => {
  if (awards.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="awards-title text-lg font-semibold uppercase mb-2">PRIX ET DISTINCTIONS</h3>
      <ul className="space-y-1 list-none pl-0">
        {awards.map((award, index) => (
          <li key={index} className="award-item">
            {award.name}{award.year ? ` (${award.year})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Awards;
