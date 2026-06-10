import { useState, useEffect } from 'react';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const regex = /^(#{2,4})\s+(.+)$/gm;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      matches.push({ level, text, id });
    }
    setHeadings(matches);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-1">
      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        On this page
      </h4>
      {headings.map(({ level, text, id }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`block text-sm transition-colors ${
            activeId === id
              ? 'text-blue-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
          style={{ paddingLeft: `${(level - 2) * 12}px` }}
        >
          {text}
        </a>
      ))}
    </div>
  );
}
