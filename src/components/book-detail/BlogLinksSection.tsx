
import React from 'react';

interface LinkItem {
  url: string;
  label: string;
}

interface BlogLinksSectionProps {
  blogLinks: LinkItem[];
}

export const BlogLinksSection: React.FC<BlogLinksSectionProps> = ({ blogLinks }) => {
  if (blogLinks.length === 0) return null;

  return (
    <div>
      <h3 className="blog-title">BLOG</h3>
      <ul className="space-y-2 list-none pl-0">
        {blogLinks.map((link, index) => (
          <li key={`blog-${index}`}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="blog-link">
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
