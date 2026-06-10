import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';

const projectImages = {
  'AI-Airport-Digital-Twin-System': { emoji: '✈️', gradient: 'from-blue-600 to-cyan-600', label: 'Airport Digital Twin' },
  'vulnerability-scan-ui': { emoji: '🔍', gradient: 'from-red-600 to-orange-600', label: 'Security Scanner' },
  'nutrivision': { emoji: '🥗', gradient: 'from-green-600 to-emerald-600', label: 'AI Nutrition' },
  'phishing-email-detection-': { emoji: '🛡️', gradient: 'from-purple-600 to-pink-600', label: 'Phishing Detection' },
  'KNN-Resume-job-matching': { emoji: '📄', gradient: 'from-indigo-600 to-blue-600', label: 'Resume Matcher' },
  'password-strength-analyzer': { emoji: '🔐', gradient: 'from-yellow-600 to-amber-600', label: 'Password Analyzer' },
  'secureloginsystem': { emoji: '🔑', gradient: 'from-teal-600 to-green-600', label: 'Auth System' },
};

const liveDemos = {
  'nutrivision': 'https://nutrivision-n1le.onrender.com/',
  'password-strength-analyzer': 'https://password-strength-analyzer-1-f7nx.onrender.com/',
  'vulnerability-scan-ui': 'https://vulnerability-scan-ui.onrender.com/',
  'phishing-email-detection-': 'https://phishing-email-detection-8sld.onrender.com/',
  'secureloginsystem': 'https://secureloginsystem11-wydq.onrender.com/',
  'AI-Airport-Digital-Twin-System': 'https://ai-airport-digital-twin-system-d18n.onrender.com/',
  'KNN-Resume-job-matching': 'https://knn-resume-job-matching.onrender.com/',
};

function ProjectThumbnail({ name }) {
  const info = projectImages[name] || { emoji: '📁', gradient: 'from-gray-600 to-slate-600', label: '' };
  const demo = liveDemos[name];
  return (
    <a
      href={demo || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { if (!demo) e.preventDefault(); }}
      className="relative block w-full h-44 rounded-xl overflow-hidden mb-4 group/thumb"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-90`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <span className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl transform group-hover/thumb:scale-110 transition-all duration-500 drop-shadow-2xl">
        {info.emoji}
      </span>
      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 bg-black/40 px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide uppercase">
        {info.label}
      </span>
      {demo && (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-green-500/25 text-green-300 border border-green-400/30 backdrop-blur-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      )}
    </a>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const projectOrder = [
    'AI-Airport-Digital-Twin-System',
    'vulnerability-scan-ui',
    'phishing-email-detection-',
    'secureloginsystem',
    'nutrivision',
    'password-strength-analyzer',
    'KNN-Resume-job-matching',
  ];

  useEffect(() => {
    api.projects.list()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => projectOrder.indexOf(a.name) - projectOrder.indexOf(b.name)
        );
        setProjects(sorted);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="relative max-w-6xl mx-auto px-4 pt-8 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full" />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-gray-900/50 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No projects to display yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const tech = [project.language, ...(project.topics || [])].filter(Boolean);
            const demo = liveDemos[project.name];
            return (
              <div
                key={project.id}
                className="group relative rounded-xl bg-gray-900/40 border border-gray-800/60 overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-blue-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <ProjectThumbnail name={project.name} />
                <div className="p-5 pt-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors truncate mb-1">
                    {project.name.replace(/-/g, ' ')}
                  </h3>
                  {project.stars > 0 && (
                    <p className="text-xs text-yellow-400/70 mb-2 flex items-center gap-1">
                      <span>★</span> {project.stars}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4 min-h-[2.5rem]">
                    {project.description || 'No description'}
                  </p>
                  {tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {t}
                        </span>
                      ))}
                      {tech.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-500 bg-gray-800/50">+{tech.length - 3}</span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 pt-3 border-t border-gray-800/50">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all border border-gray-700/50 hover:border-gray-600"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      Code
                    </a>
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-green-600/15 text-green-400 hover:bg-green-600/25 hover:text-green-300 transition-all border border-green-500/20 hover:border-green-400/40"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
