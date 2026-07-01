export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="gradient-orb w-96 h-96 bg-blue-500/10 top-20 -left-20 animate-float" />
        <div className="gradient-orb w-80 h-80 bg-purple-500/10 bottom-20 -right-20 animate-float" style={{ animationDelay: '-3s' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4 backdrop-blur-sm">
          Aspiring Software Engineer &middot; Full Stack Developer &middot; AI/ML Enthusiast
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Hasini Bondada
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4 rounded-full" />
        <p className="text-base md:text-lg text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Aspiring Software Engineer skilled in <span className="text-blue-400 font-medium">Java</span>,{' '}
          <span className="text-blue-400 font-medium">Python</span>,{' '}
          <span className="text-blue-400 font-medium">Full Stack Development</span>, and{' '}
          <span className="text-blue-400 font-medium">Machine Learning</span>.
          Passionate about building AI-driven solutions and scalable web applications.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap text-sm text-gray-400 mb-2">
          <a href="mailto:hasinibondada25@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            hasinibondada25@gmail.com
          </a>
          <span className="text-gray-700 hidden sm:inline">|</span>
          <a href="https://www.linkedin.com/in/hasini-bondada" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
          <span className="text-gray-700 hidden sm:inline">|</span>
          <a href="https://github.com/hasinibondada" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            GitHub
          </a>
          <span className="text-gray-700 hidden sm:inline">|</span>
          <a href="https://leetcode.com/u/Hasini_Bondada/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.102 1.898L8.912 9.09a2.228 2.228 0 0 0 0 3.153l7.19 7.19a2.228 2.228 0 0 0 3.153 0l7.19-7.19a2.228 2.228 0 0 0 0-3.152l-7.19-7.19a2.228 2.228 0 0 0-3.153 0zm-7.19 10.336l-4.186 4.186a2.228 2.228 0 0 0 0 3.152l7.19 7.19a2.228 2.228 0 0 0 3.152 0l4.187-4.186-10.343-10.342z" /></svg>
            LeetCode
          </a>
        </div>


        <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
          <a href="/resume.pdf" download className="px-5 py-2.5 border border-gray-700 hover:border-blue-500/50 text-gray-300 hover:text-white rounded-lg font-medium transition-all text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Resume
          </a>

        </div>
      </div>
    </section>
  );
}
