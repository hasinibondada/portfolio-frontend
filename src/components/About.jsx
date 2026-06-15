const skillCategories = [
  { title: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'C'], icon: '⚡' },
  { title: 'AI & Data Science', skills: ['Machine Learning', 'NLP', 'KNN', 'Pandas', 'NumPy', 'Jupyter'], icon: '🧠' },
  { title: 'Frontend', skills: ['HTML', 'CSS', 'React.js'], icon: '🎨' },
  { title: 'Backend', skills: ['Python', 'Node.js', 'Flask', 'Express.js'], icon: '⚙️' },
  { title: 'Database', skills: ['MySQL', 'MongoDB'], icon: '🗄️' },
  { title: 'Tools & Platforms', skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'MongoDB Atlas'], icon: '🛠️' },
  { title: 'Concepts', skills: ['OOP', 'REST APIs', 'Cybersecurity Basics'], icon: '🔒' },
];

const education = [
  {
    college: 'SRKR Engineering College, Bhimavaram',
    degree: 'Bachelor of Technology - Civil Engineering',
    year: '2023 - Present',
  },
];

const internships = [
  {
    company: 'Thiranex Platform',
    role: 'Cybersecurity Virtual Intern',
    icon: '🛡️',
    description: 'Gained practical knowledge in Cybersecurity concepts, vulnerability assessment, and secure application practices.',
  },
  {
    company: 'EduSkills',
    role: 'AWS Cloud Virtual Intern',
    icon: '☁️',
    description: 'Acquired foundational knowledge of cloud computing concepts and AWS cloud services.',
  },
];

const certifications = [
  { name: 'Cloud Architecting', issuer: 'AWS Academy' },
  { name: 'Cloud Foundations', issuer: 'AWS Academy' },
  { name: 'MERN Full Stack', issuer: 'Unstop' },
  { name: 'Java with AI', issuer: 'Unstop' },
  { name: 'Professional Networking for Career Growth', issuer: 'HP Foundation' },
  { name: 'Prompt Engineering for Everyone', issuer: 'IBM Skills Network' },
  { name: 'Communication Skills', issuer: 'IBM Skills Build' },
  { name: 'AI For Beginners', issuer: 'HP Foundation' },
  { name: 'Claude Code: The Coding Assistant', issuer: 'Analytics Vidya' },
  { name: 'Gen AI for Everyone', issuer: 'Analytics Vidya' },
  { name: 'Essential SQL Skills for Data Beginners', issuer: 'Analytics Vidya' },
  { name: 'Smart Cities', issuer: 'NPTEL' },
  { name: 'Crash Course: AWS Basics', issuer: 'KodeKloud' },
  { name: 'Generative AI Foundations', issuer: 'Infosys Springboard' },
  { name: 'Cybersecurity Analyst Job Simulation', issuer: 'Tata' },
  { name: 'Data Analytics Job Simulation', issuer: 'Deloitte' },
];

export default function About() {
  return (
    <section id="about" className="relative max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Me</span>
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm">🎓</span>
            Education
          </h3>
          {education.map((edu, i) => (
            <div key={i} className="glass-card p-5 border border-gray-800/50 rounded-xl bg-white/[0.02]">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-medium text-white">{edu.college}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2 bg-gray-800/60 px-2 py-0.5 rounded-full">{edu.year}</span>
              </div>
              <p className="text-sm text-blue-400/80">{edu.degree}</p>
            </div>
          ))}
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 mt-8">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm">💼</span>
            Experience
          </h3>
          {internships.map((int, i) => (
            <div key={i} className="glass-card p-5 border border-gray-800/50 rounded-xl bg-white/[0.02]">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{int.icon}</span>
                <div>
                  <h4 className="font-medium text-white">{int.role}</h4>
                  <p className="text-sm text-blue-400/80 mb-2">{int.company}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{int.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm">🔧</span>
            Skills
          </h3>
          <div className="space-y-4">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="glass-card p-4 border border-gray-800/50">
                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-md text-sm bg-gray-800/80 text-gray-300 border border-gray-700/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm">🏅</span>
          Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((cert, i) => (
            <div key={i} className="glass-card p-3.5 flex items-start gap-3 border border-gray-800/50 hover:border-blue-500/20 transition-all duration-200">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xs text-blue-400 shrink-0 mt-0.5">✓</span>
              <div>
                <span className="text-sm text-gray-300 leading-relaxed">{cert.name}</span>
                <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
