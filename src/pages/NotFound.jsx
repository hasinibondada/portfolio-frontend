import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect to home after 10 seconds
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Hasini Bondada</title>
        <meta name="description" content="Page not found. The blog post or page you're looking for may have been moved or deleted." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Animated 404 number */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[10rem] md:text-[14rem] font-extrabold leading-none"
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 40%, #60a5fa 70%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.3))',
            }}
          >
            404
          </span>
          {/* Glowing underline */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          PAGE_NOT_FOUND
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          This page doesn't exist
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-2">
          The blog post or page you're looking for may have been moved,
          deleted, or was never published.
        </p>
        <p className="text-gray-600 text-sm mb-10">
          Redirecting to home in{' '}
          <span className="text-blue-400 font-mono font-semibold tabular-nums">
            {countdown}s
          </span>
          …
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            id="go-home-btn"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Portfolio
          </Link>

          <Link
            to="/blog"
            id="go-blog-btn"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            Browse All Blogs
          </Link>
        </div>

        {/* Decorative bottom line */}
        <div className="mt-16 flex items-center justify-center gap-3 text-gray-700 text-xs font-mono">
          <span>error</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <span>404</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <span>not_found</span>
        </div>
      </div>
    </div>
    </>
  );
}
