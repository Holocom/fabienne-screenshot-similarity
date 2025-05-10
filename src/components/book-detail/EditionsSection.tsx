
import React from 'react';
import { Edition } from '@/integrations/supabase/schema';

interface EditionsSectionProps {
  editions: Edition[];
}

export const EditionsSection: React.FC<EditionsSectionProps> = ({ editions }) => {
  // Always return null to hide the editions section
  return null;
}
