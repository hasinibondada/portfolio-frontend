import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://hasinibondada25.vercel.app';

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#030712" />
        <meta name="author" content="Hasini Bondada" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="gradient-orb w-[500px] h-[500px] bg-blue-500/5 top-[-10%] left-[-10%] animate-float" />
        <div className="gradient-orb w-[400px] h-[400px] bg-purple-500/5 bottom-[-10%] right-[-10%] animate-float" style={{ animationDelay: '-4s' }} />
        <div className="gradient-orb w-[300px] h-[300px] bg-pink-500/5 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  );
}
