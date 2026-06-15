import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navLinks = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/', label: 'Projects', hash: 'projects' },
  { to: '/', label: 'About', hash: 'about' },
  { to: '/blog', label: 'Blog', hash: '' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    setActiveHash(window.location.hash);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  const handleClick = (e, hash) => {
    if (hash && pathname === '/') {
      e.preventDefault();
      setActiveHash(`#${hash}`);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (hash) => hash ? activeHash === `#${hash}` : pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/80 shadow-lg shadow-black/10' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all">
          Hasini Bondada
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label, hash }) => (
            hash ? (
              <Link
                key={label}
                to={`/#${hash}`}
                onClick={(e) => handleClick(e, hash)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(hash)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ) : (
              <Link
                key={label}
                to={to}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(hash)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
