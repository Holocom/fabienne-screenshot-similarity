
import React from 'react';

interface LinkItem {
  url: string;
  label: string;
}

interface SeligmannLinksSectionProps {
  seligmannLinks: LinkItem[];
}

export const SeligmannLinksSection: React.FC<SeligmannLinksSectionProps> = ({ seligmannLinks }) => {
  if (seligmannLinks.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="seligmann-title-bottom">PRIX SELIGMANN</h3>
      <ul className="space-y-2 list-none pl-0">
        {seligmannLinks.map((link, index) => (
          <li key={`seligmann-${index}`}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="seligmann-link-bottom">
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
