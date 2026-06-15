import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="block w-full p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        {blog.category && (
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {blog.category.name}
          </span>
        )}
        <span>{blog.readingTime} min read</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {blog.title}
      </h3>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{blog.excerpt}</p>
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {blog.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
